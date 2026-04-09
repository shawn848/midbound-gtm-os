---
title: "Sequence Enrollment and Cool-Down Rules"
slug: "sequences-cooldown"
category: "integrations"
order: 4
short_answer: "Automatically enroll identified visitors into outreach sequences based on ICP score and behavior, with cool-down rules to prevent over-contacting."
seo_title: "Sequence Enrollment and Cool-Down Rules | MidBound Help Center"
seo_description: "Learn how MidBound automatically enrolls identified visitors into outreach sequences and uses cool-down rules to prevent over-contacting."
keywords: ["sequence enrollment", "cool-down rules", "outreach automation", "automated sequences", "contact frequency"]
related_articles: ["icp-scoring", "hubspot-setup", "slack-setup"]
---

# Sequence Enrollment and Cool-Down Rules

MidBound can automatically enroll identified visitors into outreach sequences when they meet specific criteria. Cool-down rules prevent the same person from being contacted too frequently.

## How Sequence Enrollment Works

You define trigger criteria. When a visitor matches, they are enrolled in a sequence through your connected tools (HubSpot workflows, webhook-triggered sequences, etc.).

### Setting Trigger Criteria

Triggers combine ICP data with behavioral signals:

| Criteria Type | Examples |
|--------------|---------|
| **ICP Score** | Score >= 8 |
| **Page visited** | Viewed /pricing or /demo |
| **Time on site** | Spent more than 2 minutes on key pages |
| **Confidence level** | High confidence match only |
| **Visit count** | First visit or returning visitor |

You can combine criteria. A typical high-intent trigger:

- ICP score >= 8
- Visited the pricing page
- Spent at least 90 seconds on site
- High confidence match

This ensures only genuinely interested, well-matched visitors enter your outreach.

## Cool-Down Rules

Cool-down rules prevent a visitor from being enrolled in a new sequence if they have been contacted recently. This protects against:

- **Double-touching** someone who is already in an active sequence
- **Over-contacting** a returning visitor who triggers the enrollment criteria on every visit
- **Burning warm leads** by being too aggressive with follow-up

### How Cool-Down Windows Work

When a visitor is enrolled in a sequence, a cool-down timer starts. During the cool-down period, that visitor will not be enrolled in another sequence, even if they trigger the criteria again.

### Recommended Cool-Down Periods

| Scenario | Cool-Down Period |
|----------|-----------------|
| Standard outreach sequence | 30 days |
| High-intent pricing page trigger | 14 days |
| General nurture enrollment | 60 days |
| Re-engagement for returning visitors | 21 days |

These are starting points. Adjust based on your sales cycle length and outreach cadence.

## Preventing Double-Touches

Beyond cool-down windows, use these practices:

1. **Check CRM status before enrollment.** If a contact already has an open deal in HubSpot, skip sequence enrollment.
2. **Respect existing ownership.** If a contact is already assigned to a rep, route the alert to that rep rather than enrolling in a generic sequence.
3. **Use HubSpot enrollment rules.** HubSpot workflows can check whether a contact is already in an active sequence before enrolling.

## Setup Steps

1. Go to **Settings > Sequences** in your MidBound dashboard
2. Define your trigger criteria
3. Set the cool-down period
4. Connect the enrollment action (HubSpot workflow, webhook, etc.)
5. Enable the rule

Test with a low-volume trigger first (e.g., ICP 9+ only) to validate the flow before broadening criteria.
