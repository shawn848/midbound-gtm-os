---
title: "What Happens After You Install MidBound"
slug: "what-happens-after-install"
category: "getting-started"
order: 2
short_answer: "MidBound begins identifying visitors in real-time. You'll see results within minutes of your first traffic."
seo_title: "What Happens After Installing MidBound | MidBound Help Center"
seo_description: "Learn what to expect after installing MidBound: the identification flow, timeline for first results, and what real-time Slack alerts look like."
keywords: ["midbound setup", "visitor identification", "first results", "real-time alerts", "identification flow"]
related_articles: ["install-script", "setup-icp-criteria", "slack-setup"]
---

# What Happens After You Install MidBound

Once the script is live, identification starts automatically. No manual action required.

## The Identification Flow

Here is what happens for each visitor:

1. **Visitor arrives** on your website
2. **Script fires** and captures the session (pages viewed, time on site, referral source, UTMs)
3. **AI matching** processes visitor signals against a proprietary dataset in real-time
4. **Profile enrichment** adds full name, job title, company, validated email, and LinkedIn profile URL
5. **ICP scoring** rates the visitor against your defined criteria (1-10 scale)
6. **Delivery** pushes the identified visitor to your connected tools (Slack, HubSpot, webhooks)

This entire flow happens in real-time. There is no batch processing or overnight delay.

## Timeline Expectations

| Milestone | When |
|-----------|------|
| Script active and tracking sessions | Immediately after installation |
| First identified visitors appear | Within minutes of receiving traffic |
| Enough data to evaluate match rates | 48-72 hours with normal traffic |
| ICP scoring tuned to your needs | After 1-2 weeks of reviewing results |

If your site receives steady traffic, you should see identified visitors in your dashboard within the first hour.

## What a Slack Alert Looks Like

If you have the Slack integration connected, you will see notifications like this:

```
New Visitor Identified
Name: Sarah Chen
Title: VP of Marketing
Company: Acme Software (250 employees)
Email: sarah.chen@acmesoftware.com
LinkedIn: linkedin.com/in/sarachen
ICP Score: 9/10

Pages Visited:
  /pricing — 4 min 12 sec
  /case-studies — 2 min 30 sec
  /integrations — 1 min 05 sec

Source: LinkedIn Ad (utm_campaign=q1-demand-gen)
```

## What to Do Next

- **Set up ICP criteria** to score visitors automatically. See [Setting Up Your ICP Criteria](/help-center/getting-started/setup-icp-criteria).
- **Connect Slack** for real-time alerts. See [Connecting MidBound to Slack](/help-center/integrations/slack-setup).
- **Connect HubSpot** to create contacts automatically. See [Connecting MidBound to HubSpot](/help-center/integrations/hubspot-setup).
- **Review your first 50 identified visitors** to validate match quality and tune your ICP thresholds.

## Not Seeing Results?

If visitors are not appearing after installation, check:

1. The script is loading correctly (see [How to Install the MidBound Script](/help-center/getting-started/install-script) for verification steps)
2. Your site is receiving live traffic (not just your own test visits)
3. Your Slack or HubSpot integration filters are not too restrictive
