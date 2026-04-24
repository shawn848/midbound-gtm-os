# HubSpot Integration -- Phase 2 Skeleton

> This file is a placeholder for Phase 2 (Lead Gen Pipeline). It will be fleshed out when we build the HubSpot integration layer.

## Current State

MidBound integrates with HubSpot natively. When a visitor is identified and matches an audience filter, a contact is **created** in HubSpot with the standard identity fields (name, email, title, company, phone, address). The native integration is **create-only** — existing contacts are skipped; no updates, no companies/deals, no custom property mapping. See `knowledge/integrations-docs-snapshot-*.md` for the canonical capability list.

The custom-property + lifecycle + workflow Phase 2 plan below is implemented today by routing MidBound's **Webhook integration** through Zapier or Make. The Webhook receives the full visitor payload; the intermediary writes the custom HubSpot properties and triggers the downstream workflows. The native HubSpot integration alone does not push these properties or fire HubSpot workflows.

## Phase 2 Plan

### Custom Properties to Create
- `midbound_first_seen`: Date of first identified visit
- `midbound_last_seen`: Date of most recent visit
- `midbound_visit_count`: Total number of identified visits
- `midbound_last_page`: Last page visited
- `midbound_icp_score`: ICP fit score from MidBound
- `midbound_source`: "midbound_identified" (for filtering and reporting)
- `midbound_pages_visited`: Comma-separated list of pages

### Lifecycle Stage Mapping
- **New identified visitor (ICP 8-10):** Subscriber -> MQL (auto)
- **New identified visitor (ICP 6-7):** Subscriber (nurture)
- **New identified visitor (ICP 5 or below):** Subscriber (low priority)
- **Return visitor + pricing page:** MQL -> SQL (flag for sales)
- **Multi-stakeholder signal:** SQL (flag as active opportunity)

### Workflow Triggers
- When `midbound_icp_score` >= 8 AND `midbound_last_page` = "/pricing" -> Enroll in high-intent sequence
- When `midbound_visit_count` >= 3 -> Flag as returning visitor, priority outreach
- When 2+ contacts from same company created within 7 days -> Multi-stakeholder alert

### Reporting Dashboards
- Identified visitors by week (trend)
- Identified visitors by ICP score distribution
- Conversion: identified visitor -> MQL -> SQL -> Opportunity -> Closed Won
- Top pages visited by identified visitors
- Multi-stakeholder accounts detected

## Dependencies
- HubSpot API access (already available via MidBound integration)
- Custom property creation permissions
- Workflow creation permissions
- Reporting access

## Notes
- Do not overwrite manually entered data in HubSpot
- Respect existing contact ownership and routing rules
- Deduplicate against existing contacts before creating new ones
