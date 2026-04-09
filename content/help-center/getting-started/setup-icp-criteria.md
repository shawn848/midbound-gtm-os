---
title: "Setting Up Your ICP Criteria"
slug: "setup-icp-criteria"
category: "getting-started"
order: 3
short_answer: "Define the attributes of your ideal buyer so MidBound can score every identified visitor automatically."
seo_title: "Setting Up ICP Criteria in MidBound | MidBound Help Center"
seo_description: "Learn how to configure your Ideal Customer Profile criteria in MidBound to automatically score and prioritize identified website visitors."
keywords: ["ICP criteria", "ideal customer profile", "visitor scoring", "lead scoring", "ICP setup"]
related_articles: ["icp-scoring", "what-happens-after-install", "slack-setup"]
---

# Setting Up Your ICP Criteria

ICP scoring lets MidBound rank every identified visitor by how well they match your ideal buyer profile. This means your team focuses on the highest-value visitors first.

## What ICP Scoring Uses

MidBound scores visitors based on these attributes:

- **Job title and seniority** (e.g., VP, Director, Manager, IC)
- **Company size** (employee count ranges)
- **Industry** (SaaS, fintech, healthcare, etc.)
- **Geography** (country, region)
- **Department** (Marketing, Sales, Engineering, etc.)

Each attribute carries a weight toward the final score.

## How to Set Criteria in the Dashboard

1. Go to **Settings > ICP Configuration**
2. Define your target attributes:

| Attribute | Example Value |
|-----------|--------------|
| Seniority | VP, Director, C-Suite |
| Company Size | 50-500 employees |
| Industry | B2B SaaS, Fintech |
| Geography | United States, Canada |
| Department | Marketing, Sales, Revenue Ops |

3. Assign priority weights to each attribute (which ones matter most to your team)
4. Save your configuration

Changes take effect immediately on all new identifications. Existing visitors in your dashboard will be re-scored.

## The ICP Score Scale

Scores range from 1 to 10:

| Score | Meaning | Suggested Action |
|-------|---------|-----------------|
| 8-10 | Strong ICP fit | Prioritize for same-day outreach |
| 6-7 | Partial fit | Review manually, consider outreach |
| 4-5 | Weak fit | Add to nurture or low-priority queue |
| 1-3 | Poor fit | Monitor but do not pursue actively |

## Recommended Starting Thresholds

If you are setting up ICP criteria for the first time:

- **Start broad.** Set your criteria to match a wide range of visitors so you can see what your traffic looks like.
- **Set your Slack notification threshold to 6+** so you see most relevant visitors without noise.
- **Set your sequence enrollment threshold to 8+** so only strong-fit visitors get automated outreach.

## How to Refine Over Time

After your first two weeks:

1. Review visitors who scored 8-10. Are they truly your ideal buyers?
2. Check visitors who scored 5-7. Are you missing good prospects because a criterion is too narrow?
3. Look at your conversion data. Which ICP scores are converting to meetings?
4. Adjust weights and criteria based on what you learn.

The goal is a scoring model where high scores reliably predict good conversations. Expect to adjust 2-3 times in the first month before it stabilizes.
