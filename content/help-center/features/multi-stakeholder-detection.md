---
title: "Multi-Stakeholder Detection Explained"
slug: "multi-stakeholder-detection"
category: "features"
order: 3
short_answer: "MidBound automatically flags when multiple people from the same company visit your site within a defined time window."
seo_title: "Multi-Stakeholder Detection | MidBound Help Center"
seo_description: "Learn how MidBound detects when multiple people from the same company visit your site, signaling active buying committee engagement."
keywords: ["multi-stakeholder", "buying committee", "account signals", "buying intent", "committee detection"]
related_articles: ["icp-scoring", "slack-setup", "hubspot-setup"]
---

# Multi-Stakeholder Detection Explained

When multiple people from the same company visit your website within a short window, it usually means that company is actively evaluating your product. MidBound detects this pattern and surfaces it automatically.

## Why This Matters

B2B purchases involve multiple decision makers. Research from Gartner shows the average B2B buying committee includes 6-10 people. When you see three people from the same company on your site in the same week, that is a stronger buying signal than a single visit from one person.

A single visitor might be doing casual research. Three visitors from the same company who each look at pricing and case studies are running an evaluation.

## What Triggers Detection

MidBound flags a multi-stakeholder signal when:

- **Two or more identified visitors** from the same company
- Visit your site within a **rolling time window** (configurable, default is 7 days)
- Each visitor is a separate individual (not the same person returning)

The detection is automatic. No configuration required beyond having the script installed and identifications running.

## How It Surfaces

### In Slack

When a multi-stakeholder pattern is detected, you receive an alert like this:

```
Multi-Stakeholder Alert: Acme Software

3 people identified in the last 5 days:

1. Sarah Chen — VP of Marketing
   Visited: /pricing (4 min), /case-studies (2 min)
   ICP Score: 9/10

2. James Park — Director of Demand Gen
   Visited: /pricing (3 min), /integrations (1 min)
   ICP Score: 8/10

3. Maria Lopez — Marketing Ops Manager
   Visited: /case-studies (5 min), /pricing (2 min)
   ICP Score: 7/10
```

### In HubSpot

Each individual is created as a separate contact. The company record is updated with a multi-stakeholder flag and the number of identified visitors.

## What to Do When You See It

A multi-stakeholder signal means the account is in active evaluation. Here is how to respond:

1. **Review all identified visitors** and their roles. Understand who on the buying committee you can see.
2. **Map the committee.** A VP, a Director, and an Ops Manager suggest you are dealing with the decision maker, the champion, and the implementer.
3. **Personalize outreach to each person.** The VP cares about ROI. The Director cares about capability. The Ops Manager cares about integration and workflow.
4. **Reference their specific behavior** in outreach. "I noticed your team has been looking at our pricing and case studies" is a natural opening.
5. **Move fast.** Multi-stakeholder engagement means a decision may be coming soon. Same-day outreach is ideal.
