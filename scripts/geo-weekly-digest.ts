/**
 * GEO & AEO Weekly Digest Generator
 *
 * Searches Reddit for recent discussions about Generative Engine Optimization
 * and Answer Engine Optimization, then compiles a weekly digest.
 *
 * Usage: npx tsx scripts/geo-weekly-digest.ts
 *
 * No API keys required — uses Reddit's public JSON endpoints.
 */

import * as fs from "fs";
import * as path from "path";

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------

const SUBREDDITS = ["SEO", "bigseo", "digital_marketing", "marketing", "SaaS", "sales"];

const SEARCH_TERMS = [
  "generative engine optimization",
  "answer engine optimization",
  "GEO SEO",
  "AEO SEO",
  "AI search optimization",
  "AI overviews",
  "perplexity SEO",
  "website visitor identification",
  "person-level ID",
  "B2B deanonymization",
  "visitor tracking tools",
];

const MAX_POSTS = 20; // top N posts by upvotes across all searches
const DIGEST_POST_COUNT = 10; // how many posts make it into the final digest
const COMMENT_LIMIT = 3; // top comments per post
const POST_BODY_CHARS = 500;
const COMMENT_CHARS = 300;
const RATE_LIMIT_MS = 2_000;
const LOOKBACK_DAYS = 7;

const USER_AGENT =
  "MidBound-GEO-Digest/1.0 (research script; no auth; respectful rate limiting)";

const OUTPUT_DIR = path.resolve(__dirname, "..", "content", "geo-weekly");

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface RedditPost {
  id: string;
  title: string;
  subreddit: string;
  score: number;
  numComments: number;
  url: string;
  permalink: string;
  selftext: string;
  created: number; // epoch seconds
}

interface RedditComment {
  author: string;
  body: string;
  score: number;
}

interface EnrichedPost extends RedditPost {
  topComments: RedditComment[];
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function truncate(text: string, maxLen: number): string {
  if (!text) return "";
  const cleaned = text.replace(/\n+/g, " ").trim();
  if (cleaned.length <= maxLen) return cleaned;
  return cleaned.slice(0, maxLen).trimEnd() + "...";
}

function epochSecondsToDate(epoch: number): Date {
  return new Date(epoch * 1000);
}

function formatDate(d: Date): string {
  return d.toISOString().slice(0, 10);
}

function sevenDaysAgo(): number {
  return Math.floor(Date.now() / 1000) - LOOKBACK_DAYS * 86400;
}

async function fetchJSON(url: string): Promise<any> {
  const resp = await fetch(url, {
    headers: { "User-Agent": USER_AGENT },
  });

  if (resp.status === 429) {
    console.warn("  [rate-limited] Reddit returned 429 — waiting 10s and retrying...");
    await sleep(10_000);
    const retry = await fetch(url, {
      headers: { "User-Agent": USER_AGENT },
    });
    if (!retry.ok) {
      throw new Error(`Reddit returned ${retry.status} for ${url}`);
    }
    return retry.json();
  }

  if (!resp.ok) {
    throw new Error(`Reddit returned ${resp.status} for ${url}`);
  }

  return resp.json();
}

// ---------------------------------------------------------------------------
// Reddit API helpers (public JSON, no auth)
// ---------------------------------------------------------------------------

async function searchSubreddit(
  subreddit: string,
  query: string
): Promise<RedditPost[]> {
  const encoded = encodeURIComponent(query);
  const url = `https://www.reddit.com/r/${subreddit}/search.json?q=${encoded}&restrict_sr=1&sort=top&t=week&limit=25`;

  try {
    const data = await fetchJSON(url);
    const cutoff = sevenDaysAgo();

    const posts: RedditPost[] = (data?.data?.children ?? [])
      .map((child: any) => child.data)
      .filter((d: any) => d.created_utc >= cutoff)
      .map((d: any) => ({
        id: d.id,
        title: d.title,
        subreddit: d.subreddit,
        score: d.score,
        numComments: d.num_comments,
        url: d.url,
        permalink: `https://www.reddit.com${d.permalink}`,
        selftext: d.selftext ?? "",
        created: d.created_utc,
      }));

    return posts;
  } catch (err: any) {
    console.warn(`  [warn] Failed to search r/${subreddit} for "${query}": ${err.message}`);
    return [];
  }
}

async function fetchTopComments(
  permalink: string
): Promise<RedditComment[]> {
  // permalink looks like https://www.reddit.com/r/SEO/comments/abc123/...
  // We need the JSON endpoint
  const url = permalink.replace(/\/$/, "") + ".json?sort=top&limit=10";

  try {
    const data = await fetchJSON(url);

    // Reddit returns [post, comments] array
    const commentListing = data?.[1]?.data?.children ?? [];

    const comments: RedditComment[] = commentListing
      .filter((c: any) => c.kind === "t1" && c.data?.body)
      .map((c: any) => ({
        author: c.data.author,
        body: c.data.body,
        score: c.data.score ?? 0,
      }))
      .sort((a: RedditComment, b: RedditComment) => b.score - a.score)
      .slice(0, COMMENT_LIMIT);

    return comments;
  } catch (err: any) {
    console.warn(`  [warn] Failed to fetch comments for ${permalink}: ${err.message}`);
    return [];
  }
}

// ---------------------------------------------------------------------------
// Deduplication and ranking
// ---------------------------------------------------------------------------

function deduplicateAndRank(allPosts: RedditPost[]): RedditPost[] {
  const seen = new Map<string, RedditPost>();

  for (const post of allPosts) {
    const existing = seen.get(post.id);
    if (!existing || post.score > existing.score) {
      seen.set(post.id, post);
    }
  }

  return Array.from(seen.values())
    .sort((a, b) => b.score - a.score)
    .slice(0, MAX_POSTS);
}

// ---------------------------------------------------------------------------
// Digest generation
// ---------------------------------------------------------------------------

function generateDigest(posts: EnrichedPost[], today: Date): string {
  const dateStr = formatDate(today);
  const weekAgo = new Date(today.getTime() - LOOKBACK_DAYS * 86400 * 1000);
  const periodStart = formatDate(weekAgo);

  const displayPosts = posts.slice(0, DIGEST_POST_COUNT);

  let md = `---
title: "GEO & AEO Weekly Digest"
date: "${dateStr}"
period: "${periodStart} to ${dateStr}"
---

# GEO & AEO Weekly Digest — Week of ${dateStr}

## Key Themes This Week

`;

  // Extract rough themes from titles
  md += `_Themes are auto-detected from post titles and bodies. Review and edit as needed._\n\n`;
  md += `1. _(Review posts below and summarize recurring theme 1)_\n`;
  md += `2. _(Review posts below and summarize recurring theme 2)_\n`;
  md += `3. _(Review posts below and summarize recurring theme 3)_\n`;
  md += `4. _(Review posts below and summarize recurring theme 4)_\n`;
  md += `5. _(Review posts below and summarize recurring theme 5)_\n`;

  md += `\n## Top Discussions\n\n`;

  displayPosts.forEach((post, i) => {
    md += `### ${i + 1}. ${post.title}\n`;
    md += `**r/${post.subreddit}** · ${post.score} upvotes · ${post.numComments} comments\n\n`;

    if (post.selftext) {
      md += `${truncate(post.selftext, POST_BODY_CHARS)}\n\n`;
    }

    if (post.topComments.length > 0) {
      md += `**Top Insights from Comments:**\n`;
      for (const comment of post.topComments) {
        md += `- ${truncate(comment.body, COMMENT_CHARS)}\n`;
      }
      md += `\n`;
    }

    md += `[Original post](${post.permalink})\n\n---\n\n`;
  });

  md += `## Actionable Takeaways for MidBound

- _(Review the discussions above and note takeaways relevant to MidBound's content and positioning)_
- _(Look for language real practitioners use — mirror it in MidBound's content)_
- _(Identify pain points that MidBound's person-level identification solves)_

## Search Queries to Monitor

- _(List emerging queries, topics, or questions that appeared frequently this week)_
- _(Note any new tools, frameworks, or approaches being discussed)_
`;

  return md;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  console.log("=== GEO & AEO Weekly Digest Generator ===\n");

  const today = new Date();
  const dateStr = formatDate(today);

  // Ensure output directory exists
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  const outputPath = path.join(OUTPUT_DIR, `${dateStr}.md`);

  // Check if digest already exists for today
  if (fs.existsSync(outputPath)) {
    console.log(`Digest already exists at ${outputPath}`);
    console.log("Delete it first if you want to regenerate.\n");
    process.exit(0);
  }

  // Phase 1: Search Reddit
  console.log("Phase 1: Searching Reddit for GEO/AEO discussions...\n");

  const allPosts: RedditPost[] = [];
  let requestCount = 0;

  for (const subreddit of SUBREDDITS) {
    for (const term of SEARCH_TERMS) {
      requestCount++;
      process.stdout.write(
        `  [${requestCount}/${SUBREDDITS.length * SEARCH_TERMS.length}] r/${subreddit} — "${term}"...`
      );

      const posts = await searchSubreddit(subreddit, term);
      allPosts.push(...posts);

      console.log(` ${posts.length} posts`);

      // Rate limiting
      await sleep(RATE_LIMIT_MS);
    }
  }

  console.log(`\nTotal raw results: ${allPosts.length}`);

  // Phase 2: Deduplicate and rank
  console.log("\nPhase 2: Deduplicating and ranking...\n");

  const topPosts = deduplicateAndRank(allPosts);
  console.log(`  Unique posts after dedup: ${topPosts.length}`);

  if (topPosts.length === 0) {
    console.log("\nNo posts found for this week. This can happen if:");
    console.log("  - Reddit rate-limited all requests");
    console.log("  - No posts matched the search terms in the last 7 days");
    console.log("  - Network issues prevented fetching\n");
    console.log("Try running again in a few minutes.\n");
    process.exit(1);
  }

  // Phase 3: Fetch top comments for the top posts
  const postsToEnrich = topPosts.slice(0, DIGEST_POST_COUNT);
  console.log(`\nPhase 3: Fetching comments for top ${postsToEnrich.length} posts...\n`);

  const enrichedPosts: EnrichedPost[] = [];

  for (let i = 0; i < postsToEnrich.length; i++) {
    const post = postsToEnrich[i];
    process.stdout.write(
      `  [${i + 1}/${postsToEnrich.length}] Fetching comments for "${truncate(post.title, 60)}"...`
    );

    const comments = await fetchTopComments(post.permalink);
    enrichedPosts.push({ ...post, topComments: comments });

    console.log(` ${comments.length} comments`);

    // Rate limiting
    if (i < postsToEnrich.length - 1) {
      await sleep(RATE_LIMIT_MS);
    }
  }

  // Phase 4: Generate digest
  console.log("\nPhase 4: Generating digest...\n");

  const digest = generateDigest(enrichedPosts, today);

  fs.writeFileSync(outputPath, digest, "utf-8");

  console.log(`Digest saved to: ${outputPath}`);
  console.log(`Contains ${enrichedPosts.length} posts.\n`);
  console.log("Next steps:");
  console.log("  1. Open the digest and fill in the Key Themes section");
  console.log("  2. Edit the Actionable Takeaways for MidBound relevance");
  console.log("  3. Update Search Queries to Monitor with emerging topics\n");
}

main().catch((err) => {
  console.error("\n[error] Script failed:", err.message);
  console.error("\nCommon causes:");
  console.error("  - Reddit is rate-limiting (wait a few minutes)");
  console.error("  - Network connectivity issues");
  console.error("  - Reddit API changes\n");
  process.exit(1);
});
