# Integrations capability snapshot — 2026-04-24

**Source of truth.** Every claim about Midbound integrations in the blog or playbooks must trace back to this file. If a claim isn't here, it isn't supported — drop it or mark it as future capability, never write it as current product.

**Pulled from:** `https://midbound.ai/docs/integrations/*` and the "What You Can Do with Midbound" Google Doc (`1AYnp0PSYBPMuGY-DGu_9uRHd2u4CK54NlIJISPl-NYI`, accessed 2026-04-24).

**Refresh cadence:** re-pull at least quarterly, or whenever the docs site updates. New snapshot = new dated file. Don't overwrite this one.

---

## TL;DR — what Midbound is and isn't

**Is:** A person-level website visitor identification + segmentation + activation platform. De-anonymizes traffic, enriches with LinkedIn / verified email / company data, exposes filters + AI-driven audiences, then pushes matched visitors out to GTM tooling on a workflow trigger.

**Isn't (as of this date):**
- A CLI tool. No `midbound` command-line interface ships. Per Eli (2026-04-24): "we're not prioritizing CLI."
- A public API. Roadmap, but pending customer feedback. Per Eli (2026-04-24): "we need to create an api and before that we need customer feedback this will take some time."
- A bidirectional sync layer. All native integrations are unidirectional outbound (Midbound → tool).
- A direct integrator with Salesforce, Marketo, Outreach, Salesloft, Apollo, 6sense. These are NOT in the docs' supported list. They are reachable as webhook destinations via Zapier/Make/n8n — that's it. Always frame them that way; never as "Midbound integrates with Salesforce."

---

## The 9 native integrations

Order: as listed in `https://midbound.ai/docs/integrations`. Each entry: what it does → trigger → required fields → dedup behavior → out of scope.

### 1. HubSpot

- **What:** Creates contacts in HubSpot. That's it.
- **Trigger:** Audience-based workflow (e.g., "Enterprise visitors who viewed pricing"). Workflow fires on audience entry → contact gets created.
- **Required fields:** Email is **mandatory**. No email = silently skipped.
- **Dedup:** Reads HubSpot by email before insert. If contact already exists, "**it is left untouched**" — no updates, no enrichment of existing records.
- **Object scope:** Contacts only. **No companies, no deals, no custom objects.**
- **Out of scope:** Updating existing contacts; creating/updating companies or deals; bulk operations; HubSpot → Midbound data flow; triggering native HubSpot workflows directly (use HubSpot's "contact created" trigger inside HubSpot itself, not from Midbound).

> **Common content overclaim to avoid:** Saying Midbound "maps custom MidBound properties to HubSpot" or "triggers HubSpot workflows" or "updates lifecycle stage" or "creates tasks." None of those are Midbound capabilities. Anything beyond contact-create is built on the HubSpot side, with HubSpot's contact-created trigger.

### 2. Slack

- **What:** Posts a Block Kit-formatted notification to a Slack **channel** when a workflow fires.
- **Trigger:** Audience-entry / visitor-identification workflow.
- **Message contents:** Visitor profile (name, LinkedIn, photo, company), company details (title, industry, headcount, revenue range), engagement stats (sessions, pageviews, time-on-site, last seen), recent pages (last 5 + overflow count), attribution (UTM, entry page), audience tags, contact info (work/personal email, phones).
- **Out of scope:** Threads, DMs, multi-channel posting, custom message templates, scheduling delays, conditional field display.

### 3. Clay

- **What:** Pushes the full visitor JSON object to a Clay webhook endpoint.
- **Trigger:** Workflow fires on audience entry / visitor activity → POST to Clay's webhook.
- **Payload:** All available visitor fields, flat JSON, with nulls for missing values.
- **Dedup:** None on Midbound side ("Clay handles deduplication on their end. Every workflow trigger sends a request").
- **Out of scope:** Reverse data flow (Clay → Midbound); custom field mapping; transformation.

### 4. Lemlist

- **What:** Adds leads to Lemlist email campaigns.
- **Trigger:** Audience-entry / visitor-identification workflow.
- **Required fields:** Email is mandatory (work email, falls back to personal). No email = action fails with error (not silent skip — different from HubSpot).
- **Field mapping:** First/last name, company, job title, LinkedIn URL, work phone (or personal fallback), domain extracted from email.
- **Dedup:** Built-in. Existing campaign members are skipped, no error.
- **Out of scope:** Bidirectional sync; updating existing leads; managing campaigns themselves; webhook callbacks from Lemlist.

### 5. HeyReach

- **What:** Pushes leads to HeyReach for LinkedIn outreach. Two routing modes:
  - **Campaign mode:** Adds leads directly to a specific HeyReach campaign.
  - **List mode:** Adds leads to a HeyReach list for later use.
- **Critical field:** LinkedIn URL. If absent, "HeyReach may not be able to match the lead." Action proceeds with a warning logged.
- **Trigger:** Audience-based workflow.
- **Out of scope:** Midbound does **not** send LinkedIn messages itself. HeyReach handles all outreach. No Midbound-side dedup. No message scheduling control. No message composition.

### 6. Pipedrive

- **What:** Creates People + Organizations + Leads in Pipedrive. Updates Organizations only.
- **Required fields:** Email mandatory. No email = silent skip.
- **Dedup:** Email lookup for People; company-name match for Organizations (which then get **updated with enrichment data** — this is the only documented update on any native integration).
- **Object scope:** People, Organizations, Leads. **No deals, no activities.**
- **Out of scope:** Deals, activities, custom fields beyond documented set; bidirectional sync.

### 7. Constant Contact

- **What:** Creates contacts.
- **Required fields:** Email mandatory.
- **Field mapping:** Email, first/last name, job title, company, phone, address.
- **Dedup:** Email lookup; existing contacts left untouched.
- **Trigger:** Workflow / audience entry.
- **Out of scope:** Updating existing contacts; managing lists or segments; retrieving data from Constant Contact; deleting contacts; custom field mapping.
- **Auth:** OAuth2 with `contact_data` scope.

### 8. Google Sheets

- **What:** Appends a row of visitor data to a Google Sheet on each workflow firing.
- **Schema:** 24 columns (identity, company, session metrics, UTM).
- **Append-only.** "Existing rows are never modified."
- **Setup:** Standard Google Sheets URL, with sheet auto-created. Visited-pages list capped at first 10.
- **Required fields:** None strictly required (handles missing data gracefully).
- **Out of scope:** Updating rows, deleting rows, multi-sheet/tab targeting, custom column mapping, conditional row writing.

### 9. Webhook (generic)

- **What:** POST visitor data as raw JSON (`Content-Type: application/json`) to any URL on workflow firing.
- **Auth:** **URL-based only.** No API keys, no signatures, no other auth methods documented.
- **Trigger:** Workflow / audience entry.
- **Dedup:** None. Each trigger sends a fresh request.
- **Use case:** Bridge to platforms not on the native list — Zapier, Make, n8n, custom backends. Through these intermediaries, customers can route Midbound visitor data to almost anywhere (including Salesforce, Marketo, Outreach, Salesloft, Apollo, 6sense — but always frame it as "via webhook + Zapier/Make," never as a direct Midbound integration).
- **Out of scope:** Documented retry behavior (none mentioned); response handling; payload schema customization.

---

## Product capabilities (from Eli's Google Doc)

These are the categories of work Midbound supports. Every capability claim in the blog or playbooks should map to one of these:

1. **Identify anonymous visitors** at the person level — verified LinkedIn, business email, personal email when available, company info (industry, headcount, revenue). Deterministic identification combining multiple data sources, not just IP-based.
2. **Understand buying behavior** — pages visited, time on site, sessions, scroll depth, click activity, timestamped journeys.
3. **Filter and segment** with multi-layer logic — title, page, UTM, time, industry, headcount, revenue, etc.
4. **Buying-group / account-level visibility** — multiple visitors from same company, filter by visitor count, see full account engagement.
5. **AI-powered audiences** — dynamic segmentation based on titles, LinkedIn keywords, industry, behavior.
6. **Activation through automations** — push enriched visitors via the 9 native integrations above.

Two named **use cases** in Eli's doc:
- **Speed to Lead** — real-time outbound on warm visitors. Workflow: identify → Slack alert → CRM/outreach push → engage.
- **Intelligent Retargeting** — re-engage real visitors (not cold lists). Multi-thread accounts via repeat visitor data.

---

## What the docs say but the blog should NOT echo as native integration

Eli's Google Doc lists these as "common destinations" or "ABM platforms":
- Salesforce
- Marketo
- 6sense

**These are NOT native Midbound integrations.** They are reachable only via the Webhook integration plus a third-party intermediary (Zapier, Make, n8n). When the blog or a playbook references them, it must say "route via webhook to Salesforce/Marketo/6sense using Zapier or Make" — never "Midbound integrates with [tool]."

Same applies to: Outreach, Salesloft, Apollo. They're not in Eli's doc, but they appeared in past blog drafts. Same rule: webhook destination only.

---

## Hard constraints for content writers

Before writing any content that mentions integrations or product capability:

1. **Read this file.** If a claim isn't documented here, drop it.
2. **Direction matters.** All native integrations are unidirectional Midbound → tool. Don't write "Midbound enriches HubSpot with bidirectional sync" or similar.
3. **Email is the dominant required field.** HubSpot / Lemlist / Pipedrive / Constant Contact all require email. Write playbooks that reflect this.
4. **HubSpot = create-only.** No updates to existing records. Any playbook that maps "MidBound custom properties" or "lifecycle stages updated by MidBound" is wrong.
5. **Slack is channel notifications only.** Not threads, not DMs, not alerts elsewhere.
6. **"MidBound triggers a workflow in [external tool]" is rarely true.** What's true: external tool's own triggers (e.g., HubSpot's "contact created" trigger) fire when Midbound writes to it. The trigger is the tool's, not Midbound's.
7. **CLI / API / SDK / developer tools** — none ship today. Don't tease them as current.
8. **Salesforce / Marketo / Outreach / Salesloft / Apollo / 6sense** are NOT native. Webhook-routable via Zapier/Make only.
9. **No competitor customer names.** Preexisting rule from `~/midbound/blog/CLAUDE.md`.
10. **No fabricated metrics.** If a claim like "67% increase" or "3x improvement" isn't from a documented Midbound case study, don't write it.

---

## When to update this file

- A new native integration ships → fetch its docs page, add a section.
- An existing integration's docs change (capability added or scope expanded) → fetch fresh, write a new dated snapshot file (`integrations-docs-snapshot-YYYY-MM-DD.md`), don't edit this one.
- The CLI or API actually ships → add a new section, remove the "isn't" line above.
