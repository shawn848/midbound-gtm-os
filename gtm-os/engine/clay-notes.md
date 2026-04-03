# Clay Enrichment -- Phase 2 Skeleton

> This file is a placeholder for Phase 2 (Lead Gen Pipeline). It will be fleshed out when we build the Clay enrichment layer.

## Concept

Clay can enrich MidBound-identified visitors with additional data points beyond what MidBound natively provides. The pipeline: MidBound identifies the visitor -> data flows via webhook to Clay -> Clay enriches with firmographic, technographic, and social data -> enriched record syncs to HubSpot.

## Phase 2 Plan

### Clay Table Structure

**Input columns (from MidBound webhook):**
- `full_name`
- `job_title`
- `company_name`
- `email`
- `linkedin_url`
- `pages_visited`
- `time_on_site`
- `icp_score`
- `visit_timestamp`

**Enrichment columns (Clay adds):**
- `company_size` (employee count)
- `company_revenue` (estimated ARR)
- `company_industry`
- `company_tech_stack` (relevant tools detected)
- `company_funding` (last round, total raised)
- `person_seniority_level`
- `person_department`
- `company_linkedin_url`
- `company_website`

### Enrichment Sources
- LinkedIn (via Clay's LinkedIn enrichment)
- Clearbit or similar for company firmographics
- BuiltWith or similar for technographics
- Crunchbase or similar for funding data

### Scoring Enhancement
MidBound provides an ICP score based on its own criteria. Clay can add a secondary enrichment score based on:
- Company size fit (50-500 employees = highest score)
- Revenue fit ($5M-$100M = highest score)
- Tech stack match (using HubSpot, running paid marketing = bonus)
- Funding recency (recently funded = higher likelihood of buying)

### Output
Enriched records flow to HubSpot via Clay's native HubSpot integration:
- All enrichment columns mapped to HubSpot custom properties
- Enrichment score added alongside MidBound ICP score
- Records tagged with `clay_enriched: true` for filtering

## Webhook Setup

MidBound sends identified visitor data to a Clay webhook URL. Clay table auto-populates and runs enrichment.

```
MidBound (visitor identified)
    |
    v
Clay webhook (receives visitor data)
    |
    v
Clay enrichment (firmographics, tech stack, funding)
    |
    v
HubSpot (enriched contact created/updated)
```

## Dependencies
- Clay account with API access
- Clay webhook URL configured in MidBound
- Clay-to-HubSpot integration configured
- Enrichment credit budget (Clay charges per enrichment)

## Notes
- Start with a small batch to validate enrichment quality before running at scale
- Monitor Clay credit usage to stay within budget
- Not all visitors need full enrichment. Consider only enriching ICP 7+ visitors to conserve credits.
- This is Phase 2. Content engine (Phase 1) ships first.
