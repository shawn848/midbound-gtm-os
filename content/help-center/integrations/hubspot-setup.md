---
title: "Connecting MidBound to HubSpot"
slug: "hubspot-setup"
category: "integrations"
order: 2
short_answer: "Connect MidBound to HubSpot in three steps. Identified visitors that match your audience land as new contacts; HubSpot's own workflow engine handles the rest."
seo_title: "Connect MidBound to HubSpot | MidBound Help Center"
seo_description: "Step-by-step guide to connecting MidBound to HubSpot. Identified visitors land as contacts, then HubSpot workflows handle follow-up automation."
keywords: ["hubspot integration", "CRM integration", "contact creation", "hubspot setup"]
related_articles: ["slack-setup", "webhooks-setup", "duplicate-contacts-hubspot"]
---

# Connecting MidBound to HubSpot

The HubSpot integration creates contacts in your CRM the moment MidBound identifies a visitor that matches your audience. From there, HubSpot's workflow engine drives the rest of the journey — tasks, lifecycle stages, deal creation, sequence enrollment.

## How to Connect

1. Go to **Settings > Integrations > HubSpot** in your MidBound dashboard
2. Click **Connect to HubSpot**
3. Authorize MidBound to access your HubSpot account
4. Build the audience and workflow in MidBound that should push to HubSpot

## What Happens on Identification

When an identified visitor matches your MidBound audience, a new contact is created in HubSpot with:

- First name, last name
- Validated business email (or personal as fallback)
- Job title
- Company name
- Address fields when available

MidBound checks for an existing contact by email before each push, so the same person doesn't land twice. New visitors get the full create. The contact source is tagged so you can filter MidBound-sourced contacts in HubSpot reporting.

## Activating With HubSpot Workflows

Once a contact lands, build the rest of the journey in HubSpot's workflow engine. The standard pattern:

1. MidBound creates the contact in HubSpot.
2. A HubSpot workflow uses **"Contact created"** as its enrollment trigger, filtered to contacts where the lead source matches MidBound.
3. Subsequent actions — task creation, lifecycle changes, sequence enrollment, deal creation — run inside HubSpot.

Common workflow patterns:

- **High-intent task assignment:** When the contact is created and the lead source is MidBound, create a same-day task for the assigned rep.
- **Lifecycle update:** Move the contact to Marketing Qualified Lead automatically.
- **Multi-stakeholder deal creation:** When a company has 2+ MidBound-sourced contacts and no open deal, create a new deal record.

## Custom Properties for Behavioral Data

For richer per-visit context on the contact record — visit count, last page viewed, ICP score, audience tags, UTM source — pair the HubSpot integration with MidBound's **Webhook** integration.

Point a webhook at a Zapier or Make scenario. The scenario receives the full visitor payload on every workflow firing, then writes whatever custom properties you want onto the matching HubSpot contact. This is the path most teams use to populate `midbound_visit_count`, `midbound_icp_score`, `midbound_last_page`, etc., and to drive HubSpot workflows that key off those values.

## Deduplication

MidBound checks each push against existing HubSpot contacts by email. If a match is found, the duplicate create is skipped automatically. If you're seeing duplicates anyway, see [Duplicate Contacts in HubSpot](/help-center/troubleshooting/duplicate-contacts-hubspot).
