# MidBound Content Intelligence Data

## Structure

```
data/
  content-intel.db          # SQLite database (canonical store)
  scrapes/                  # Raw Apify scrape dumps
    x/                      # Twitter/X scrapes
    linkedin/               # LinkedIn scrapes
    reddit/                 # Reddit scrapes
```

## Database Schema

### Tables
- `sources` — Who/where we scraped from (platform, handle, relevance)
- `content_items` — Individual posts/articles/comments
- `topics` — Taxonomy of 29 content themes across 12 categories
- `content_topics` — Many-to-many content-topic mapping
- `content_ideas` — Derived content ideas with priority/status
- `signals` — Competitive intelligence observations

### Views
- `v_content_with_topics` — Content + author + topics joined
- `v_signals_active` — Open signals by urgency
- `v_content_ideas_pipeline` — Ideas not yet published/killed
- `v_topic_coverage` — Which topics have how much scraped content

### Topic Categories
| Category | Description |
|----------|-------------|
| gtm-strategy | Founder-led growth, inbound-led outbound, CBM |
| visitor-id | Person-level ID, company-level ID, ICP scoring |
| abm-pbm | ABM evolution, buying committees, intent data |
| content-marketing | Thought leadership, LinkedIn strategy, distribution |
| seo-aeo-geo | GEO, AEO, traditional SEO |
| sales-strategy | Speed to lead, consultative selling |
| founder-lessons | Bootstrapping, revenue transparency |
| product-led-growth | PLG, free tier strategy |
| b2b-marketing | Demand generation |
| competitive-intel | RB2B, Vector competitive moves |
| privacy-compliance | Privacy-forward positioning |
| data-enrichment | Enrichment tools and strategies |

## Query Examples

```sql
-- Top engaged content about visitor identification
SELECT * FROM v_content_with_topics 
WHERE topics LIKE '%visitor%' 
ORDER BY engagement_likes DESC LIMIT 10;

-- Active competitive signals
SELECT * FROM v_signals_active;

-- Content idea pipeline
SELECT * FROM v_content_ideas_pipeline;

-- Topics we haven't covered yet
SELECT * FROM v_topic_coverage WHERE item_count = 0;
```
