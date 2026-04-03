# Scripts

## geo-weekly-digest.ts

Weekly GEO (Generative Engine Optimization) and AEO (Answer Engine Optimization) research digest pulled from Reddit discussions.

### What it does

1. Searches 5 subreddits (r/SEO, r/bigseo, r/digital_marketing, r/marketing, r/SaaS) for posts about GEO and AEO
2. Filters to posts from the last 7 days
3. Deduplicates and ranks by upvotes
4. Fetches top comments for the best posts
5. Outputs a markdown digest to `content/geo-weekly/YYYY-MM-DD.md`

### How to run

```bash
npx tsx scripts/geo-weekly-digest.ts
```

Or via the npm script:

```bash
npm run geo-digest
```

### Output

Digests are saved to `content/geo-weekly/` with the date as the filename (e.g., `2026-04-02.md`).

Each digest includes:
- Top discussions with upvotes, comment counts, and links
- Top-voted comments per post
- Placeholder sections for Key Themes, Actionable Takeaways, and Search Queries to Monitor (fill in manually after reviewing)

### Recommended schedule

Run weekly on **Mondays**. The script looks back 7 days, so Monday runs capture the prior week's discussions.

### Requirements

- Node.js 18+ (needs native `fetch`)
- `tsx` — install globally with `npm i -g tsx` or use `npx tsx`
- No API keys needed. Uses Reddit's public JSON endpoints (append `.json` to any Reddit URL).

### Rate limiting

The script inserts a 2-second delay between Reddit API calls and handles 429 responses with a 10-second backoff. Typical run time is 2-3 minutes depending on how many search combinations return results.

### Troubleshooting

- **No posts found**: Reddit may be rate-limiting. Wait a few minutes and try again.
- **Digest already exists**: The script won't overwrite an existing digest for the same date. Delete the existing file first if you want to regenerate.
- **Network errors**: Check your internet connection. Reddit's public JSON API can occasionally be slow or unresponsive.
