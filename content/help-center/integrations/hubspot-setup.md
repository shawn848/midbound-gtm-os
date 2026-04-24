---
title: "Connecting MidBound to HubSpot"
slug: "hubspot-setup"
category: "integrations"
order: 2
short_answer: "MidBound creates HubSpot contacts when identified visitors match your audience. Existing contacts are left untouched."
seo_title: "Connect MidBound to HubSpot | MidBound Help Center"
seo_description: "Step-by-step guide to connecting MidBound to HubSpot for automatic contact creation when website visitors are identified."
keywords: ["hubspot integration", "CRM integration", "contact creation", "hubspot setup"]
related_articles: ["slack-setup", "webhooks-setup", "duplicate-contacts-hubspot"]
---

# Connecting MidBound to HubSpot

The HubSpot integration creates contacts in your CRM when MidBound identifies a visitor that matches your audience filter. The integration is one-way (MidBound → HubSpot) and create-only.

## How to Connect

1. Go to **Settings > Integrations > HubSpot** in your MidBound dashboard
2. Click **Connect to HubSpot**
3. Authorize MidBound to access your HubSpot account
4. Build the audience and workflow inside MidBound that should push to HubSpot

## What Happens on Identification

### New Visitor (No Existing Contact)

MidBound creates a new contact with:

- First name, last name
- Validated business email (or personal as fallback)
- Job title
- Company name
- Address fields (when available)

Email is required. Visitors without an email are silently skipped — the action is not retried.

### Returning Visitor (Existing Contact in HubSpot)

If a contact with the same email address already exists in HubSpot, **the existing contact is left untouched.** MidBound does not update existing records — no new visit data is appended, no properties are overwritten, no enrichment is performed. The deduplication is for skip-create only.

If you need to enrich existing HubSpot contacts on every visit (visit count, last page visited, score, etc.), use the **Webhook integration** with Zapier or Make as the intermediary, and write the upsert logic there.

## Custom MidBound Properties

The native HubSpot integration does **not** create or populate custom MidBound properties (`midbound_visit_count`, `midbound_icp_score`, `midbound_last_page`, etc.). The integration writes only the standard identity fields listed above.

To get behavioral fields like visit count or ICP score into HubSpot, you have two options:

1. **Webhook + Zapier/Make.** Point MidBound's Webhook integration at a Zapier or Make scenario. The scenario calls HubSpot's API to create or update the contact and populate any custom property you want.
2. **HubSpot-side computation.** Use HubSpot's own logic (lifecycle stages, lead source counting, deal association rules) to derive what you need from the contacts MidBound creates, without depending on properties MidBound doesn't push.

## Triggering Workflows

The MidBound integration does not trigger HubSpot workflows directly. Instead, the standard pattern is:

1. MidBound creates a contact in HubSpot.
2. A HubSpot workflow uses **"Contact created"** as its enrollment trigger (filtered to contacts where `Original source` or your custom `MidBound Lead Source` property matches).
3. Subsequent actions — task creation, lifecycle changes, sequence enrollment, deal creation — all run inside HubSpot's automation.

This means everything past contact-create is configured in HubSpot, not in MidBound. Common workflow patterns:

- **High-intent task assignment:** When the contact is created and the lead source is MidBound, create a task for the assigned rep within the same day.
- **Lifecycle update:** Move the contact to Marketing Qualified Lead automatically.
- **Multi-stakeholder deal creation:** When a company has 2+ MidBound-sourced contacts and no open deal, create a new deal record.

## Deduplication Logic

Before creating a new contact, MidBound checks for an existing HubSpot contact with the same email address. If a match is found, the create action is **skipped silently** — the existing record is not modified. If no match is found, a new contact is created.

If you are seeing duplicates anyway, see [Duplicate Contacts in HubSpot](/help-center/troubleshooting/duplicate-contacts-hubspot).
