---
draft: false
title: "Set Up MidBound in 10 Minutes"
slug: "setup-midbound"
category: "getting-started"
excerpt: "Go from zero to seeing your first identified website visitor. Account creation, script installation, verification."
difficulty: "beginner"
time_to_complete: "10 minutes"
tools_needed: ["MidBound"]
seo_title: "Set Up MidBound in 10 Minutes | Quick Start Guide"
seo_description: "Step-by-step guide to installing MidBound on your website. Create your account, add the tracking script, and identify your first visitor in under 10 minutes."
keywords: ["midbound setup", "website visitor identification setup", "install midbound", "person-level identification", "visitor tracking script"]
related_playbooks: ["configure-icp-scoring", "slack-high-intent-alerts"]
---

# Set Up MidBound in 10 Minutes

Get from zero to your first identified visitor. No engineering team required.

## What You'll Have When Done

A working MidBound installation that identifies website visitors by name, title, company, and email. Visitor data flowing in real-time.

---

## Step 1: Create Your Account

Go to [midbound.ai/register](https://midbound.ai/register) and sign up for the 14-day free trial. No credit card required.

Fill in your company name, website URL, and work email. You'll get access to the dashboard immediately after confirming your email.

## Step 2: Copy Your Tracking Script

In the MidBound dashboard, navigate to **Settings > Installation**. You'll see a lightweight JavaScript snippet that looks like this:

```html
<script src="https://cdn.midbound.ai/tracker.js" data-site="YOUR_SITE_ID"></script>
```

Copy the full snippet. Your unique site ID is already embedded.

## Step 3: Add the Script to Your Website

Paste the snippet into your website's `<head>` tag. Where you do this depends on your setup:

- **Next.js**: Add it to your root `layout.tsx` inside the `<head>` tag, or use the `Script` component from `next/script`.
- **WordPress**: Go to Appearance > Theme Editor > header.php and paste before the closing `</head>` tag. Or use a plugin like Insert Headers and Footers.
- **Webflow**: Go to Project Settings > Custom Code > Head Code.
- **Static HTML**: Open your main HTML file and paste inside `<head>`.

Deploy or publish the changes.

## Step 4: Verify the Installation

Back in the MidBound dashboard, go to **Settings > Installation** and click **Verify**. MidBound will check that the script is loading correctly on your site.

You can also verify manually: open your website in a browser, open Developer Tools (F12), go to the Network tab, and filter for `midbound`. You should see the tracker script loading.

If verification fails, check:
- The script is inside `<head>`, not `<body>`
- There are no ad blockers or script blockers active
- The deployment is live (not just saved locally)

## Step 5: Configure Basic Settings

In the dashboard, set your core preferences:

1. **Time zone**: Set to your team's primary time zone so timestamps make sense.
2. **Notification email**: Where you want daily summary emails sent.
3. **Excluded domains**: Add your own company's domain so your team's visits don't pollute the data.

## Step 6: See Your First Identified Visitor

Visit your own website from outside your office network (use your phone's cellular connection, or ask a colleague to visit from home). Within minutes, check the MidBound dashboard.

You'll see identified visitors appearing with:
- Full name
- Job title and company
- Validated email address
- LinkedIn profile URL
- Pages visited and time on site

For production traffic, identified visitors will start appearing as soon as real visitors hit your site. B2B websites with US-heavy traffic see the highest identification rates.

---

## Next Steps

- [Configure ICP Scoring](/playbooks/configure-icp-scoring) to prioritize high-value visitors
- [Set up Slack alerts](/playbooks/slack-high-intent-alerts) so your team sees high-intent visitors in real-time
