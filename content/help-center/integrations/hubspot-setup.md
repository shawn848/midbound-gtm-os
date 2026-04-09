---
title: "Connecting MidBound to HubSpot"
slug: "hubspot-setup"
category: "integrations"
order: 2
short_answer: "MidBound creates or updates HubSpot contacts automatically when visitors are identified."
seo_title: "Connect MidBound to HubSpot | MidBound Help Center"
seo_description: "Step-by-step guide to connecting MidBound to HubSpot for automatic contact creation, visit tracking, and workflow triggers."
keywords: ["hubspot integration", "CRM integration", "contact creation", "hubspot setup", "hubspot workflows"]
related_articles: ["slack-setup", "webhooks-setup", "duplicate-contacts-hubspot"]
---

# Connecting MidBound to HubSpot

The HubSpot integration creates or updates contacts in your CRM whenever MidBound identifies a website visitor. Visit data, ICP scores, and behavioral context flow directly into HubSpot.

## How to Connect

1. Go to **Settings > Integrations > HubSpot** in your MidBound dashboard
2. Click **Connect to HubSpot**
3. Authorize MidBound to access your HubSpot account
4. Select which HubSpot properties to map (or use the default mapping)

## What Happens on Identification

### New Visitor (No Existing Contact)

MidBound creates a new contact with:

- First name, last name
- Email address (validated)
- Job title
- Company name
- LinkedIn profile URL
- Lead source set to "MidBound"

### Returning Visitor (Existing Contact)

MidBound updates the existing contact with:

- Latest visit data (pages, timestamps)
- Updated visit count
- Most recent ICP score (if criteria changed)

MidBound does not overwrite manually entered data. It appends visit data and updates MidBound-specific properties only.

## Custom MidBound Properties

The integration creates custom properties in HubSpot:

| Property | Description |
|----------|-------------|
| `midbound_visit_count` | Total number of identified visits |
| `midbound_last_page` | Last page the visitor viewed |
| `midbound_icp_score` | Current ICP score (1-10) |
| `midbound_confidence` | Match confidence level |
| `midbound_source` | How MidBound identified them |
| `midbound_first_seen` | Date of first identified visit |
| `midbound_last_seen` | Date of most recent visit |
| `midbound_utm_source` | UTM source from their visit |
| `midbound_utm_campaign` | UTM campaign from their visit |

## Triggering HubSpot Workflows

Use MidBound properties to trigger HubSpot workflows. Common examples:

- **High-intent sequence:** When `midbound_icp_score` >= 8 AND `midbound_last_page` contains "pricing", enroll in a sales outreach workflow
- **Re-engagement:** When `midbound_visit_count` >= 3 AND contact has no open deal, trigger a re-engagement sequence
- **Routing:** When `midbound_icp_score` >= 7, assign to a sales rep based on territory or account ownership

## Deduplication Logic

Before creating a new contact, MidBound checks for an existing contact by email address. If a match is found, the existing record is updated instead. This prevents duplicate contacts in most cases.

If you are seeing duplicates, see [Duplicate Contacts in HubSpot](/help-center/troubleshooting/duplicate-contacts-hubspot).
