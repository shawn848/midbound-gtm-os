#!/usr/bin/env python3
"""Ingest Apify scrape results into content-intel.db"""

import json
import sqlite3
import os
import re
import hashlib
from pathlib import Path

DB_PATH = Path(__file__).parent.parent / "data" / "content-intel.db"
SCRAPES_DIR = Path(__file__).parent.parent / "data" / "scrapes"

# Topic keyword mapping for auto-tagging
TOPIC_KEYWORDS = {
    'founder-led-growth': ['build in public', 'founder brand', 'founder-led', 'personal brand', 'linkedin growth'],
    'inbound-led-outbound': ['inbound-led outbound', 'inbound led', 'warm outbound', 'signal-based'],
    'contact-based-marketing': ['contact-based', 'cbm', 'contact based marketing'],
    'person-level-identification': ['person-level', 'person level', 'deanonymiz', 'de-anonymiz', 'visitor identif'],
    'company-level-identification': ['company-level', 'ip lookup', 'reverse ip', 'company identification'],
    'icp-scoring': ['icp scor', 'ideal customer profile', 'lead scor'],
    'multi-stakeholder-detection': ['buying committee', 'multi-stakeholder', 'multiple stakeholder'],
    'abm-evolution': ['abm', 'account-based', 'account based marketing'],
    'buying-committee-mapping': ['buying committee', 'decision maker', 'champion', 'economic buyer'],
    'intent-data-strategy': ['intent data', 'intent signal', 'buyer intent', 'purchase intent'],
    'thought-leadership-content': ['thought leadership', 'authority', 'category creation', 'category creator'],
    'linkedin-strategy': ['linkedin', 'linkedin post', 'linkedin content'],
    'content-distribution': ['distribution', 'content repurpos', 'multi-channel', 'omnichannel'],
    'geo-optimization': ['geo ', 'generative engine', 'ai search', 'ai citation'],
    'aeo-optimization': ['aeo', 'answer engine', 'featured snippet'],
    'seo-strategy': ['seo', 'search engine optim', 'keyword', 'backlink', 'domain authority'],
    'speed-to-lead': ['speed to lead', 'response time', 'first to respond'],
    'consultative-selling': ['consultative', 'diagnosis', 'discovery call', 'qualification'],
    'bootstrapping': ['bootstrap', 'self-funded', 'no vc', 'profitable'],
    'revenue-transparency': ['arr', 'revenue', 'mrr', 'churn rate', 'growth rate'],
    'anti-vc-movement': ['anti-vc', 'vc is', 'venture capital', 'fundrais'],
    'product-led-growth': ['plg', 'product-led', 'self-serve', 'freemium'],
    'free-tier-strategy': ['free tier', 'free plan', 'free trial', 'freemium'],
    'b2b-demand-gen': ['demand gen', 'demand generation', 'pipeline', 'lead gen'],
    'visitor-id-competitive': ['rb2b', 'vector.co', 'snitcher', 'factors.ai', 'clearbit', '6sense', 'demandbase'],
    'rb2b-moves': ['rb2b', 'retention.com', 'adam robinson'],
    'vector-moves': ['vector.co', 'joshua perk'],
    'privacy-first-positioning': ['privacy', 'gdpr', 'ccpa', 'consent', 'complian'],
    'data-enrichment-tools': ['enrichment', 'data append', 'zoominfo', 'apollo', 'clearbit'],
}


def get_source_id(conn, platform, handle):
    """Find or create source by platform+handle."""
    cur = conn.execute(
        "SELECT id FROM sources WHERE platform=? AND author_handle=?",
        (platform, handle)
    )
    row = cur.fetchone()
    if row:
        return row[0]
    conn.execute(
        "INSERT INTO sources (platform, author_handle, relevance) VALUES (?, ?, 'thought-leader')",
        (platform, handle)
    )
    conn.commit()
    return conn.execute("SELECT last_insert_rowid()").fetchone()[0]


def auto_tag(text, conn):
    """Return list of topic IDs that match the text."""
    if not text:
        return []
    text_lower = text.lower()
    matched = []
    for topic_name, keywords in TOPIC_KEYWORDS.items():
        for kw in keywords:
            if kw in text_lower:
                cur = conn.execute("SELECT id FROM topics WHERE name=?", (topic_name,))
                row = cur.fetchone()
                if row:
                    matched.append(row[0])
                break
    return matched


def ingest_x_tweets(conn, filepath):
    """Ingest X/Twitter scrape results."""
    with open(filepath) as f:
        tweets = json.load(f)

    count = 0
    for t in tweets:
        author = t.get('author', {})
        username = author.get('userName', 'unknown')
        handle = f"@{username}"

        source_id = get_source_id(conn, 'x', handle)

        # Update source info if missing
        conn.execute("""
            UPDATE sources SET
                author_name = COALESCE(NULLIF(author_name,''), ?),
                author_followers = COALESCE(author_followers, ?)
            WHERE id = ?
        """, (author.get('name', ''), author.get('followers', 0), source_id))

        tweet_id = t.get('id', hashlib.md5(str(t).encode()).hexdigest()[:16])
        text = t.get('text', '')
        url = t.get('url', f"https://x.com/{username}/status/{tweet_id}")

        # Determine content type
        is_reply = t.get('isReply', False)
        is_retweet = t.get('isRetweet', False)
        content_type = 'reply' if is_reply else ('post' if not is_retweet else 'post')

        try:
            conn.execute("""
                INSERT OR IGNORE INTO content_items
                (source_id, platform, external_id, url, content_type, body, published_at,
                 engagement_likes, engagement_comments, engagement_shares, engagement_views)
                VALUES (?, 'x', ?, ?, ?, ?, ?, ?, ?, ?, ?)
            """, (
                source_id, tweet_id, url, content_type, text,
                t.get('createdAt', ''),
                t.get('likeCount', 0), t.get('replyCount', 0),
                t.get('retweetCount', 0), t.get('viewCount', 0)
            ))

            # Auto-tag
            cur = conn.execute("SELECT last_insert_rowid()")
            content_id = cur.fetchone()[0]
            if content_id:
                for topic_id in auto_tag(text, conn):
                    conn.execute(
                        "INSERT OR IGNORE INTO content_topics (content_id, topic_id) VALUES (?, ?)",
                        (content_id, topic_id)
                    )
            count += 1
        except sqlite3.IntegrityError:
            pass

    conn.commit()
    print(f"  X/Twitter: ingested {count} tweets from {filepath.name}")


def ingest_linkedin_posts(conn, filepath):
    """Ingest LinkedIn post scrape results."""
    with open(filepath) as f:
        posts = json.load(f)

    count = 0
    for p in posts:
        if p.get('error'):
            continue

        author_name = p.get('authorName', p.get('author', ''))
        # Try to figure out the handle from the URL
        url = p.get('url', '')
        handle = ''
        if '/in/' in url:
            m = re.search(r'/in/([^/]+)', url)
            if m:
                handle = m.group(1)
        if not handle:
            handle = author_name.lower().replace(' ', '-')

        source_id = get_source_id(conn, 'linkedin', handle)
        conn.execute("""
            UPDATE sources SET
                author_name = COALESCE(NULLIF(author_name,''), ?)
            WHERE id = ?
        """, (author_name, source_id))

        post_urn = p.get('urn', p.get('shareUrn', ''))
        external_id = post_urn or hashlib.md5(str(p.get('text', '')[:100]).encode()).hexdigest()[:16]
        text = p.get('text', '')

        try:
            conn.execute("""
                INSERT OR IGNORE INTO content_items
                (source_id, platform, external_id, url, content_type, body, published_at,
                 engagement_likes, engagement_comments, engagement_shares)
                VALUES (?, 'linkedin', ?, ?, 'post', ?, ?, ?, ?, ?)
            """, (
                source_id, external_id, url, text,
                p.get('timeSincePosted', ''),
                p.get('numLikes', 0), p.get('numComments', 0), p.get('numShares', 0)
            ))

            cur = conn.execute("SELECT last_insert_rowid()")
            content_id = cur.fetchone()[0]
            if content_id:
                for topic_id in auto_tag(text, conn):
                    conn.execute(
                        "INSERT OR IGNORE INTO content_topics (content_id, topic_id) VALUES (?, ?)",
                        (content_id, topic_id)
                    )
            count += 1
        except sqlite3.IntegrityError:
            pass

    conn.commit()
    print(f"  LinkedIn: ingested {count} posts from {filepath.name}")


def ingest_reddit_posts(conn, filepath):
    """Ingest Reddit scrape results."""
    with open(filepath) as f:
        posts = json.load(f)

    count = 0
    for p in posts:
        if not isinstance(p, dict):
            continue

        subreddit = p.get('parsedSubreddit', p.get('subreddit', p.get('communityName', '')))
        if not subreddit:
            continue

        handle = f"r/{subreddit}" if not subreddit.startswith('r/') else subreddit
        source_id = get_source_id(conn, 'reddit', handle)

        post_id = p.get('id', p.get('postId', hashlib.md5(str(p).encode()).hexdigest()[:16]))
        title = p.get('title', '')
        body = p.get('body', p.get('text', p.get('selftext', '')))
        url = p.get('url', p.get('postUrl', ''))

        is_comment = p.get('dataType') == 'comment' or not title
        content_type = 'comment' if is_comment else 'post'

        full_text = f"{title}\n\n{body}" if title and body else (title or body)

        try:
            conn.execute("""
                INSERT OR IGNORE INTO content_items
                (source_id, platform, external_id, url, content_type, title, body, published_at,
                 engagement_likes, engagement_comments)
                VALUES (?, 'reddit', ?, ?, ?, ?, ?, ?, ?, ?)
            """, (
                source_id, post_id, url, content_type, title, body,
                p.get('createdAt', p.get('postedAt', '')),
                p.get('numberOfUpvotes', p.get('ups', p.get('score', 0))),
                p.get('numberOfComments', p.get('numComments', 0))
            ))

            cur = conn.execute("SELECT last_insert_rowid()")
            content_id = cur.fetchone()[0]
            if content_id:
                for topic_id in auto_tag(full_text, conn):
                    conn.execute(
                        "INSERT OR IGNORE INTO content_topics (content_id, topic_id) VALUES (?, ?)",
                        (content_id, topic_id)
                    )
            count += 1
        except sqlite3.IntegrityError:
            pass

    conn.commit()
    print(f"  Reddit: ingested {count} posts from {filepath.name}")


def main():
    conn = sqlite3.connect(DB_PATH)
    print(f"Connected to {DB_PATH}")

    # Ingest X/Twitter
    x_dir = SCRAPES_DIR / "x"
    for f in sorted(x_dir.glob("*.json")):
        ingest_x_tweets(conn, f)

    # Ingest LinkedIn
    li_dir = SCRAPES_DIR / "linkedin"
    for f in sorted(li_dir.glob("*.json")):
        ingest_linkedin_posts(conn, f)

    # Ingest Reddit
    reddit_dir = SCRAPES_DIR / "reddit"
    for f in sorted(reddit_dir.glob("*.json")):
        ingest_reddit_posts(conn, f)

    # Summary
    print("\n--- Database Summary ---")
    for table in ['sources', 'content_items', 'content_topics', 'topics']:
        cur = conn.execute(f"SELECT COUNT(*) FROM {table}")
        print(f"  {table}: {cur.fetchone()[0]}")

    print("\nContent by platform:")
    cur = conn.execute("SELECT platform, COUNT(*) FROM content_items GROUP BY platform ORDER BY COUNT(*) DESC")
    for row in cur:
        print(f"  {row[0]}: {row[1]}")

    print("\nTop topics by content count:")
    cur = conn.execute("""
        SELECT t.name, t.category, COUNT(ct.content_id) as cnt
        FROM topics t
        LEFT JOIN content_topics ct ON t.id = ct.topic_id
        GROUP BY t.id
        HAVING cnt > 0
        ORDER BY cnt DESC
        LIMIT 15
    """)
    for row in cur:
        print(f"  {row[0]} ({row[1]}): {row[2]} items")

    conn.close()


if __name__ == "__main__":
    main()
