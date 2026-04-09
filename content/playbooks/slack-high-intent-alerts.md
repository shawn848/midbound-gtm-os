---
title: "Build a High-Intent Visitor Slack Alert"
slug: "slack-high-intent-alerts"
category: "outreach-workflows"
excerpt: "Set up filtered Slack notifications so your team only sees visitors worth reaching out to."
difficulty: "beginner"
time_to_complete: "15 minutes"
tools_needed: ["MidBound", "Slack"]
seo_title: "Set Up High-Intent Visitor Slack Alerts with MidBound"
seo_description: "Step-by-step guide to building filtered Slack notifications for high-ICP website visitors. Get real-time alerts when decision makers visit your pricing page."
keywords: ["slack visitor alerts", "high intent alerts", "real-time visitor notifications", "midbound slack", "sales alerts", "buyer intent signals"]
related_playbooks: ["setup-midbound", "configure-icp-scoring", "multi-stakeholder-play"]
---

# Build a High-Intent Visitor Slack Alert

Your sales team lives in Slack. This playbook sets up real-time notifications so they see high-value visitors the moment they land on key pages. No dashboard-checking required.

## What You'll Have When Done

A dedicated Slack channel that fires alerts only when visitors matching your ICP criteria visit high-intent pages. Your team can act on these within minutes.

---

## Step 1: Create a Dedicated Slack Channel

In Slack, create a new channel. Name it something clear:

- `#midbound-high-intent` for your core sales alerts
- `#midbound-visitors` if you want a broader feed

Keep this channel focused. If you send every identified visitor to Slack, your team will start ignoring it. Filtered alerts are the goal.

## Step 2: Connect MidBound to Slack

In the MidBound dashboard, go to **Integrations > Slack**.

Click **Connect to Slack** and authorize MidBound in your workspace. Select the channel you just created as the destination.

Once connected, MidBound will confirm with a test message in the channel.

## Step 3: Set Your ICP Score Threshold

Under the Slack integration settings, set the **minimum ICP score** for alerts.

Recommended starting point: **7 or above**.

This means only visitors who closely match your Ideal Customer Profile will trigger a notification. Scores below the threshold still appear in the MidBound dashboard but won't ping your team.

If you're getting too many alerts, raise it to 8. Too few, drop it to 6. Calibrate over your first week.

## Step 4: Set Page Filters

Under **Page Filters**, add the URLs that signal buying intent:

- `/pricing` or `/plans` (actively evaluating cost)
- `/integrations` or `/integrations/hubspot` (checking technical fit)
- `/demo` or `/book-a-demo` (close to converting)
- `/case-studies` (building internal business case)

When a high-ICP visitor hits one of these pages, that's a strong signal. Someone with the right title at the right company is looking at your pricing. Your team should know about it immediately.

You can also exclude pages. If your blog drives lots of traffic but blog-only visitors rarely convert, exclude `/blog/*` from alerts.

## Step 5: Test the Alert

Visit your own website's pricing page from outside your network (use your phone on cellular, or have a colleague visit). If you excluded your company domain in your MidBound settings, ask someone outside your org.

Within minutes, you should see a Slack notification like:

> **Sarah Chen** - VP of Marketing at Acme Corp
> ICP Score: 9 | Pages: /pricing, /integrations
> Time on site: 4 min | Email: sarah@acmecorp.com
> [View in MidBound] [LinkedIn Profile]

If the alert doesn't fire, check:
- The ICP score threshold isn't too high for the test visitor
- The page filter matches the exact URL path
- The Slack channel is still connected (check Integrations page)

## Step 6: Train Your Team on the Response

The alert is only useful if your team acts on it. Set clear expectations:

**When an alert fires, the assigned rep should:**

1. Click the LinkedIn profile link. Spend 60 seconds reviewing the person's role and recent activity.
2. Check if they're already a contact in your CRM. If yes, check deal history and last touchpoint.
3. If they're new: send a personalized outreach within 2 hours. Reference what they looked at. Example: "Hey Sarah, saw you were checking out our integrations page. Happy to walk you through how our HubSpot integration works for marketing teams like yours."
4. If they're an existing contact in an active deal: ping the deal owner. A pricing page visit from an active opportunity is a buying signal.

**Response time matters.** Reaching out the same day a prospect visits your pricing page converts at a significantly higher rate than waiting days. The Slack alert gives your team the speed advantage.

---

## Next Steps

- [Create a HubSpot workflow](/playbooks/hubspot-visitor-workflow) to automate contact creation and task assignment
- [Set up the multi-stakeholder play](/playbooks/multi-stakeholder-play) for when multiple people from the same company visit
