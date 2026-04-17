---
draft: true
title: "Configure ICP Scoring Criteria"
slug: "configure-icp-scoring"
category: "getting-started"
excerpt: "Define what a high-value visitor looks like so MidBound surfaces the right people first."
difficulty: "beginner"
time_to_complete: "15 minutes"
tools_needed: ["MidBound"]
seo_title: "Configure ICP Scoring in MidBound | Step-by-Step Setup"
seo_description: "Set up your Ideal Customer Profile scoring in MidBound. Define title, seniority, company size, industry, and geography criteria to prioritize the visitors that matter most."
keywords: ["ICP scoring", "ideal customer profile", "visitor scoring", "lead scoring", "midbound ICP", "visitor prioritization"]
related_playbooks: ["setup-midbound", "slack-high-intent-alerts", "hubspot-visitor-workflow"]
---

# Configure ICP Scoring Criteria

MidBound scores every identified visitor against your Ideal Customer Profile. A visitor with an ICP score of 9 is someone your sales team should contact today. A visitor with a score of 3 is probably not worth the outreach. This playbook walks you through setting those criteria.

## What You'll Have When Done

A scoring system that automatically ranks every identified visitor from 1-10 based on how closely they match your best-fit customer profile.

---

## Step 1: Identify Your Best Customer Attributes

Before touching the dashboard, answer these questions about your best existing customers:

- **What titles do your buyers hold?** (VP Marketing, Director of Demand Gen, Head of Growth)
- **What seniority level are they?** (Director and above? Manager and above?)
- **How large are their companies?** (50-500 employees? 200-2000?)
- **What industries?** (B2B SaaS, fintech, martech)
- **Where are they located?** (US only? US + UK + Canada?)

Write these down. You'll enter them in the next steps.

## Step 2: Set Title and Seniority Criteria

In the MidBound dashboard, go to **Settings > ICP Scoring**.

Under **Title/Seniority**, configure:

- **High-value titles** (weight: heavy): Add the exact titles your buyers hold. Example: "VP Marketing", "Director of Demand Gen", "Head of Growth", "CMO".
- **Seniority threshold**: Set the minimum level. If you sell to Directors and above, set the threshold there. Managers and ICs will score lower but still appear in your feed.

Practical example: If your last 10 closed deals were all with Director-level or above in marketing functions, make that your baseline. A "VP of Marketing" should score significantly higher than a "Marketing Coordinator."

## Step 3: Set Company Size Criteria

Under **Company Size**, define your sweet spot:

- **Ideal range**: The employee count range where you win most deals. Example: 200-2,000 employees.
- **Acceptable range**: Companies outside your sweet spot but still worth pursuing. Example: 50-5,000 employees.

Visitors from companies in your ideal range get the highest scores. Those in the acceptable range get moderate scores. Those outside both ranges score low.

## Step 4: Set Industry Criteria

Under **Industry**, add the industries you sell into:

- **Primary industries**: Where you have the most traction. Example: "SaaS", "Fintech", "Martech".
- **Secondary industries**: Adjacent verticals you're expanding into.

If you sell across all B2B industries, you can leave this broad. If you're focused on specific verticals, narrow it down.

## Step 5: Set Geography Criteria

Under **Geography**, define your target regions:

- **Primary markets**: Where your sales team can sell effectively. Example: United States, Canada.
- **Secondary markets**: Markets you serve but don't actively target. Example: United Kingdom, Australia.

This matters most if your sales team is regionally focused. A perfect-title visitor from a region you don't serve shouldn't crowd out one from your core market.

## Step 6: Test with Sample Visitors

After saving your criteria, check the MidBound dashboard and look at recently identified visitors. Each one now has an ICP score.

Review 10-20 scored visitors and ask:

- Do the 8-10 scores match people you'd actually want to talk to?
- Do the 1-3 scores match people you'd skip?
- Are any obvious misfits scoring high? (Interns at the right company, executives at tiny companies outside your market)

If the scores feel off, adjust. Common fixes:

- **Too many high scores**: Tighten your seniority threshold or narrow your industry list.
- **Too few high scores**: Broaden your title list or expand your company size range.
- **Right company, wrong person scoring high**: Add more weight to the seniority criteria.

## Step 7: Save and Monitor

Save your ICP configuration. Going forward, every identified visitor gets scored automatically. The scoring recalculates if you change criteria later, so you can always refine.

Check your scoring weekly for the first month. As you see which scored visitors actually convert to meetings and pipeline, you'll know whether to adjust up or down.

---

## Next Steps

- [Build Slack alerts](/playbooks/slack-high-intent-alerts) filtered by ICP score so only high-value visitors ping your team
- [Create a HubSpot workflow](/playbooks/hubspot-visitor-workflow) that triggers when high-ICP visitors hit key pages
