---
title: "Understanding Confidence Scores"
slug: "confidence-scores"
category: "features"
order: 2
short_answer: "Confidence scores indicate how certain MidBound is about the identity match for each visitor."
seo_title: "Understanding Confidence Scores | MidBound Help Center"
seo_description: "Learn what MidBound's confidence scores mean, how to interpret them, and how to use them to decide when to act on an identified visitor."
keywords: ["confidence score", "match confidence", "identification accuracy", "visitor identity", "match quality"]
related_articles: ["icp-scoring", "match-rates", "low-match-rates"]
---

# Understanding Confidence Scores

When MidBound identifies a website visitor, the match comes with a confidence score. This score tells you how certain MidBound is that the identified person is the actual visitor.

## What Confidence Scoring Means

The AI matching engine evaluates multiple signals when resolving a visitor to a LinkedIn profile. Some matches have strong, overlapping signals. Others rely on fewer data points. The confidence score reflects this.

Think of it this way: a match with five corroborating signals is more reliable than a match with two. The confidence score quantifies that difference.

## How to Interpret Scores

| Confidence Level | What It Means | Recommended Action |
|-----------------|---------------|-------------------|
| High | Strong signal overlap. MidBound is very certain this is the right person. | Act on it. Reach out, enroll in sequences, push to CRM. |
| Medium | Good signal match with some ambiguity. The match is likely correct. | Use for outreach but personalize carefully. Review before high-stakes actions. |
| Low | Limited signals available. The match may be correct but certainty is lower. | Use with caution. Better suited for enrichment and research than direct outreach. |

## Why Confidence Scores Matter

Not all identifications are equal. A high-confidence match on a VP of Marketing who spent 3 minutes on your pricing page is a warm lead you can act on immediately. A low-confidence match on the same profile warrants a second look before reaching out.

Confidence scores help you:

- **Prioritize outreach** by combining ICP score with confidence level
- **Avoid awkward misfires** where you reference a visit that may not have been that person
- **Set automation thresholds** so only high-confidence matches trigger sequences
- **Build trust in the data** by being transparent about certainty levels

## Using Confidence Scores in Your Workflow

**For Slack notifications:** Filter to show only high and medium confidence matches. This keeps your alert channel signal-rich.

**For sequence enrollment:** Require high confidence before automatically enrolling someone in outreach. Medium and low confidence visitors can go to a review queue.

**For HubSpot:** All confidence levels can create contacts, but tag the confidence level as a custom property. Your reps can filter and prioritize accordingly.

## How This Differs From Match Rates

Confidence scores and match rates measure different things:

- **Match rate** is the percentage of total visitors that MidBound identifies (how many)
- **Confidence score** is the certainty of each individual identification (how sure)

A site can have a 15% match rate where every match is high confidence. Or a 20% match rate where some matches are high and others are medium. Both numbers matter.
