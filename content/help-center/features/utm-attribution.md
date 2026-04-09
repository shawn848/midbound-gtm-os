---
title: "UTM Campaign Attribution"
slug: "utm-attribution"
category: "features"
order: 4
short_answer: "MidBound captures UTM parameters on identified visitors, connecting your ad spend to specific people."
seo_title: "UTM Campaign Attribution in MidBound | MidBound Help Center"
seo_description: "Learn how MidBound captures UTM parameters on identified visitors to tie ad spend to specific people, not just anonymous clicks."
keywords: ["UTM tracking", "campaign attribution", "ad spend ROI", "UTM parameters", "campaign reporting"]
related_articles: ["match-rates", "icp-scoring", "hubspot-setup"]
---

# UTM Campaign Attribution

MidBound captures UTM parameters on every identified visitor. This connects your marketing campaigns directly to the people they bring to your site.

## How It Works

When a visitor arrives on your site through a UTM-tagged link, MidBound captures the parameters alongside the visitor's identity:

- `utm_source` (e.g., linkedin, google, newsletter)
- `utm_medium` (e.g., paid, organic, email)
- `utm_campaign` (e.g., q1-demand-gen, pricing-launch)
- `utm_content` (e.g., ad-variant-a, cta-button)
- `utm_term` (e.g., visitor-identification, website-analytics)

These parameters are stored on the visitor record and pushed to all connected integrations.

## What Data Is Captured

For each identified visitor with UTM parameters, you see:

- **Who they are** (name, title, company, email, LinkedIn)
- **What campaign brought them** (full UTM string)
- **What they did on your site** (pages visited, time spent)
- **How they score against your ICP** (1-10)

This combination answers a question most analytics tools cannot: "Which specific people did this campaign bring to our site, and are they the right people?"

## Using UTM Data for Campaign ROI

### Before MidBound (typical reporting)

"Our LinkedIn campaign drove 247 clicks and 8 form fills. CPC was $12. CPL was $370."

You know the volume. You do not know who those 247 people were or whether they were worth targeting.

### After MidBound

"Our LinkedIn campaign drove 247 clicks. MidBound identified 89 of those visitors. 34 matched our ICP at 7+. 12 were Director-level or above at companies with 100+ employees. 4 visited the pricing page."

Now you know exactly who the campaign reached and whether the targeting worked.

## Practical Applications

- **Compare campaign quality.** Campaign A drove 500 clicks with 15 ICP-matched visitors. Campaign B drove 200 clicks with 40 ICP-matched visitors. Campaign B has better targeting.
- **Justify ad spend.** Show leadership that the $30K LinkedIn budget brought 120 identified ICP-fit visitors, not just 3,000 anonymous sessions.
- **Optimize targeting.** If a campaign brings high traffic but low ICP match rates, the audience targeting needs adjustment.
- **Re-engage campaign visitors.** Identify high-ICP visitors from a specific campaign and trigger personalized follow-up that references their entry point.

## UTM Data in Integrations

- **Slack alerts** include the UTM source and campaign name
- **HubSpot contacts** get UTM values as custom properties for segmentation and reporting
- **Webhook payloads** include the full UTM parameter set
