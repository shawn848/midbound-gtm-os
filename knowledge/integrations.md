# Integrations

> **Source of truth:** `knowledge/integrations-docs-snapshot-2026-04-24.md`. That file is pulled directly from `https://midbound.ai/docs/integrations/*`. Always read it before writing anything that names an integration. The summary below is shorthand — the snapshot is the contract.

## What MidBound integrates with (9 native, all unidirectional outbound)

MidBound writes identified-visitor data out to your GTM stack. Every native integration is one-way: MidBound → tool. None pull data back. None bidirectionally sync. Workflows are audience-based — when an identified visitor matches your audience filter, the integration fires.

| Integration | What it does | Required field | Dedup |
|---|---|---|---|
| **HubSpot** | Creates a contact. **Does not update existing contacts.** No companies, no deals, no custom objects. | Email | Yes (silent skip if exists) |
| **Slack** | Posts a Block Kit notification to a channel. Not threads, not DMs. | — | n/a |
| **Clay** | Pushes the full visitor JSON to a Clay webhook. | — | None on MidBound's side |
| **Lemlist** | Adds the lead to a Lemlist campaign. | Email | Yes (existing campaign members skipped) |
| **HeyReach** | Adds the lead to a HeyReach campaign or list for LinkedIn outreach. **Does not send LinkedIn messages itself.** | LinkedIn URL (warning if missing) | None on MidBound's side |
| **Pipedrive** | Creates Person + Organization + Lead. Updates Organizations only. **No deals, no activities.** | Email | Yes (email lookup, plus org-name match) |
| **Constant Contact** | Creates a contact. Does not update. | Email | Yes (silent skip if exists) |
| **Google Sheets** | Appends one row of visitor data per workflow firing. **Append-only — never updates rows.** | — | None |
| **Webhook** | POSTs the full visitor JSON to any URL. URL-based auth only. | — | None |

## What MidBound does NOT integrate with directly

- **Salesforce, Marketo, Outreach, Salesloft, Apollo, 6sense.** None of these are native integrations. They can be reached as Webhook destinations via Zapier / Make / n8n. When the blog or a playbook mentions one of these tools, it must say "route via Webhook + Zapier/Make to [tool]" — never "MidBound integrates with [tool]."

## Things people commonly assume MidBound does that it doesn't

- ❌ Update existing HubSpot contacts (it doesn't — existing = skipped)
- ❌ Create HubSpot deals or companies (only contacts)
- ❌ Push custom MidBound properties (ICP Score, Visit Count, Last Page Viewed, etc.) into HubSpot or any other CRM (it doesn't — only the documented identity fields flow)
- ❌ Trigger native HubSpot workflows from MidBound (workflows are HubSpot-side; the trigger is HubSpot's "contact created," not anything MidBound exposes)
- ❌ Send LinkedIn messages directly (HeyReach handles outreach; MidBound only routes leads)
- ❌ Sync data bidirectionally with any tool (all native integrations are unidirectional)
- ❌ Provide a CLI or public API as of 2026-04-24 (per Eli: API is roadmapped pending customer feedback; CLI is not prioritized)

## Activation flow (architectural)

```
Website visitor
    |
    v
MidBound — identification + audience filter + workflow
    |
    +---> Slack channel notification (real-time alert)
    +---> HubSpot / Pipedrive / Constant Contact (contact create only)
    +---> Lemlist / HeyReach (lead added to campaign)
    +---> Clay / Webhook (raw JSON to downstream tooling)
    +---> Google Sheets (one row appended)
```

All firings are event-driven on workflow trigger. No batch mode is documented.

## When updating this file

- If the docs change → re-pull the snapshot (new dated file), then update this digest.
- If a new integration ships → add a row to the table; update the architectural flow.
- Never edit this file in a way that contradicts the snapshot. The snapshot is the contract.
