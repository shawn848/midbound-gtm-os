---
title: "How ICP Scoring Works"
slug: "icp-scoring"
category: "features"
order: 1
short_answer: "Every identified visitor is scored 1-10 against your custom ideal customer profile criteria."
seo_title: "How ICP Scoring Works in MidBound | MidBound Help Center"
seo_description: "Learn how MidBound's ICP scoring system rates identified website visitors from 1-10 and how to use scores to prioritize sales outreach."
keywords: ["ICP scoring", "lead scoring", "visitor scoring", "ideal customer profile", "lead prioritization"]
related_articles: ["setup-icp-criteria", "confidence-scores", "slack-setup"]
---

# How ICP Scoring Works

Every visitor MidBound identifies gets an ICP score from 1 to 10. The score tells you how closely that person matches your ideal customer profile.

## What Goes Into the Score

MidBound evaluates each identified visitor against the criteria you define:

- **Job title and seniority** -- Does the person hold a role you sell to? A VP of Marketing scores higher than a Marketing Intern if you are targeting senior buyers.
- **Company size** -- Is the company within your target range? If you sell to 50-500 employee companies, a 200-person company scores higher than a 10,000-person enterprise.
- **Industry** -- Is the company in a vertical you serve? B2B SaaS scores higher than consumer retail if SaaS is your target.
- **Geography** -- Is the person in a region you sell to? US-based visitors score higher if your sales team only covers North America.
- **Department** -- Is the person in a department you sell to? Marketing and Sales leaders score higher than Engineering if your buyer is the revenue team.

You control the weights. If seniority matters more than geography for your business, weight it accordingly.

## How Scores Are Calculated

MidBound checks each identified visitor's enriched profile against your criteria. Each matching attribute adds to the score based on its weight. The total is normalized to a 1-10 scale.

Example: If your ICP is "VP or Director in Marketing at a 50-500 person B2B SaaS company in the US," a visitor who matches all five attributes scores a 10. A visitor who matches three of five might score a 6 or 7, depending on which attributes matched and their weights.

## What Each Tier Means

| Score Range | Label | What It Means |
|-------------|-------|---------------|
| 8-10 | Strong fit | Matches most or all of your ICP criteria. Highest-priority for outreach. |
| 6-7 | Close fit | Matches several criteria but not all. Worth reviewing manually. |
| 4-5 | Partial fit | Some overlap with your ICP. Better suited for nurture sequences. |
| 1-3 | Low fit | Does not match your target profile. Monitor but do not prioritize. |

## Using Scores to Prioritize Outreach

- **Route 8-10 scores to Slack** for immediate sales follow-up
- **Enroll 8+ in sequences** for automated outreach within hours
- **Add 6-7 to a review queue** so a rep can decide whether to engage
- **Send 4-5 to nurture campaigns** (newsletter, content drip)
- **Ignore 1-3** unless volume is low and you want to cast a wider net

The score is a starting point, not a final decision. A visitor with a 7 who spent 4 minutes on your pricing page may be more valuable than a 9 who bounced after 10 seconds. Combine ICP score with page behavior for the best results.
