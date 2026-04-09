---
title: "Connecting MidBound to Slack"
slug: "slack-setup"
category: "integrations"
order: 1
short_answer: "Send real-time visitor identification alerts to any Slack channel with ICP score and page filtering."
seo_title: "Connect MidBound to Slack | MidBound Help Center"
seo_description: "Step-by-step guide to connecting MidBound to Slack for real-time website visitor identification alerts with ICP score filtering."
keywords: ["slack integration", "slack alerts", "real-time notifications", "visitor alerts", "slack setup"]
related_articles: ["hubspot-setup", "webhooks-setup", "icp-scoring"]
---

# Connecting MidBound to Slack

The Slack integration sends real-time notifications to a channel whenever MidBound identifies a visitor that meets your criteria.

## How to Connect

1. Go to **Settings > Integrations > Slack** in your MidBound dashboard
2. Click **Connect to Slack**
3. Authorize MidBound to post to your workspace
4. Select the channel where notifications should go

## Setting Up a Dedicated Channel

Create a dedicated Slack channel before connecting. Recommended names:

- `#midbound-visitors` for all identified visitors
- `#high-intent-visitors` for filtered, high-score visitors only
- `#midbound-[team-name]` if different teams need separate feeds

A dedicated channel keeps visitor alerts organized and prevents them from getting buried in general conversation.

## Configuring Filters

You do not want every identified visitor flooding your channel. Set filters to control what gets posted:

### ICP Score Threshold

Set a minimum ICP score for notifications. Common starting points:

- **Score 6+** for broad visibility (see most relevant visitors)
- **Score 8+** for high-signal only (fewer alerts, higher quality)

### Page Filters

Limit alerts to visitors who viewed specific pages:

- **Pricing page** visitors are often furthest in their evaluation
- **Case studies** suggest someone comparing solutions
- **Integration pages** indicate a buyer checking compatibility

You can combine filters. For example: "Notify when ICP score is 7+ AND the visitor viewed the pricing page."

## What an Alert Looks Like

```
New Visitor Identified
Name: David Rodriguez
Title: Director of Growth
Company: TechCorp (180 employees)
Email: d.rodriguez@techcorp.com
LinkedIn: linkedin.com/in/davidrodriguez
ICP Score: 8/10
Confidence: High

Pages Visited:
  /pricing — 3 min 20 sec
  /case-studies/saas-company — 2 min 15 sec

Source: Google Organic
```

Each alert includes a direct link to the full visitor profile in your MidBound dashboard.

## Tips for Getting Value from Slack Alerts

- **Assign channel ownership.** Someone on the team should be responsible for reviewing and acting on alerts daily.
- **Set up Slack notification preferences.** Use Slack's per-channel notification settings to avoid alert fatigue.
- **Start with a lower threshold** and tighten over time. It is easier to raise the bar than to worry you are missing visitors.
- **Use thread replies** to note when a rep has followed up on a visitor. This keeps the team coordinated.
