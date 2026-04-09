---
title: "Setting Up Webhooks"
slug: "webhooks-setup"
category: "integrations"
order: 3
short_answer: "Send raw visitor identification data as JSON to any endpoint via HTTP POST."
seo_title: "Setting Up MidBound Webhooks | MidBound Help Center"
seo_description: "Configure MidBound webhooks to send visitor identification data as JSON to Clay, Zapier, Make, n8n, or any custom endpoint."
keywords: ["webhooks", "API integration", "JSON payload", "Clay", "Zapier", "Make", "automation"]
related_articles: ["slack-setup", "hubspot-setup", "sequences-cooldown"]
---

# Setting Up Webhooks

Webhooks let you send raw MidBound identification data to any system that accepts HTTP POST requests. This is the most flexible integration option.

## How to Configure

1. Go to **Settings > Integrations > Webhooks** in your MidBound dashboard
2. Click **Add Webhook**
3. Enter your endpoint URL
4. Optionally set a filter (ICP score minimum, specific pages)
5. Save and test

MidBound sends a test payload to your endpoint when you save. Verify it arrives before relying on it for production workflows.

## Payload Format

Every identification event sends a JSON payload via HTTP POST:

```json
{
  "event": "visitor_identified",
  "timestamp": "2026-04-08T14:32:00Z",
  "visitor": {
    "first_name": "Sarah",
    "last_name": "Chen",
    "email": "sarah.chen@acmesoftware.com",
    "title": "VP of Marketing",
    "company": "Acme Software",
    "company_size": 250,
    "industry": "B2B SaaS",
    "linkedin_url": "https://www.linkedin.com/in/sarachen",
    "location": "San Francisco, CA"
  },
  "scoring": {
    "icp_score": 9,
    "confidence": "high"
  },
  "session": {
    "pages": [
      {"url": "/pricing", "time_seconds": 252},
      {"url": "/case-studies", "time_seconds": 150},
      {"url": "/integrations", "time_seconds": 65}
    ],
    "total_time_seconds": 467,
    "referrer": "https://www.linkedin.com",
    "utm": {
      "source": "linkedin",
      "medium": "paid",
      "campaign": "q1-demand-gen",
      "content": "ad-variant-a",
      "term": null
    }
  },
  "multi_stakeholder": {
    "detected": true,
    "company_visitor_count": 3,
    "time_window_days": 7
  }
}
```

## Connecting to Common Tools

### Clay

1. Create a new Clay table with a webhook trigger
2. Copy the Clay webhook URL
3. Paste it as your MidBound webhook endpoint
4. Clay will auto-detect the payload fields as columns

### Zapier

1. Create a new Zap with the "Webhooks by Zapier" trigger
2. Select "Catch Hook"
3. Copy the Zapier webhook URL
4. Paste it in MidBound and send a test
5. Zapier will parse the payload and let you map fields to downstream actions

### Make (formerly Integromat)

1. Create a new scenario with the "Webhooks" module
2. Select "Custom webhook"
3. Copy the URL and paste it in MidBound
4. Send a test to define the data structure

### n8n

1. Add a Webhook node as the trigger
2. Set the HTTP method to POST
3. Copy the webhook URL and paste it in MidBound

### Custom Backend

Point the webhook to any endpoint that accepts POST requests with a JSON body. Return a 200 status code to acknowledge receipt.

## Retry Behavior

If your endpoint returns a non-200 status code or times out, MidBound retries the delivery:

- **First retry:** 30 seconds after failure
- **Second retry:** 5 minutes after first retry
- **Third retry:** 30 minutes after second retry

After three failed attempts, the event is marked as failed. You can view and manually retry failed deliveries in your dashboard under **Settings > Integrations > Webhooks > Delivery Log**.
