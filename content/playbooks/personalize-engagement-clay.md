---
title: "Personalize Visitor Engagement with Clay"
slug: "personalize-engagement-clay"
category: "outreach-workflows"
excerpt: "Route MidBound visitor data into Clay for enrichment, AI-generated context, and per-visitor branching into your outbound stack. The context-driven version of outreach."
difficulty: "advanced"
time_to_complete: "60 minutes"
tools_needed: ["MidBound", "Clay", "HeyReach or Lemlist", "HubSpot"]
seo_title: "Clay + MidBound Playbook: Personalized Outreach to Website Visitors"
seo_description: "End-to-end Clay workflow for enriching MidBound visitors, generating AI personalization, and branching into the right outbound channel. For advanced RevOps teams."
keywords: ["clay automation", "visitor enrichment", "clay ai personalization", "midbound clay workflow", "abm personalization"]
related_playbooks: ["automate-website-visitor-outreach-heyreach", "automate-website-visitor-outreach-lemlist", "multi-stakeholder-play"]
---

# Personalize Visitor Engagement with Clay

Clay is where visitor data stops being raw and starts being outbound-ready. MidBound identifies who showed up. Clay enriches them with everything public, generates a single sentence of personalization, and drops them into the outbound channel that fits.

This is outbound with context. Not "cold" because the prospect was already on your site. Not "warm" because you have no relationship yet. Context-driven is the right word. Clay is what makes it work at scale.

## What You'll Have When Done

A Clay table that pulls MidBound visitors in real time, runs them through a 6-step enrichment waterfall, produces one line of AI-generated context per visitor, and routes them to HeyReach (LinkedIn), Lemlist (email), or HubSpot (SDR task) based on fit and channel preference.

---

## Step 1: Set Up the Clay Table

In Clay, create a new table named "MidBound Visitors." Columns:

- `linkedin_url` (from MidBound)
- `first_name`, `last_name`, `title`, `company_name`, `company_domain` (from MidBound)
- `email` (from MidBound, validated)
- `page_visited`, `visit_count`, `session_duration`, `icp_score` (from MidBound)
- Empty columns for the enrichment waterfall in Step 3

Set the table to auto-add rows via webhook (Clay's built-in "Webhook as Source" feature).

## Step 2: Point MidBound's Webhook at Clay

In MidBound, go to **Integrations > Webhooks**. Create a webhook with the standard filters:

- ICP score >= 6 (lower than HeyReach/Lemlist direct-send because Clay will further filter)
- Visited key pages or returned 2+ times
- Has a LinkedIn URL or validated email

Set the destination to Clay's table webhook URL. Every qualified visit creates a row.

## Step 3: Build the Enrichment Waterfall

This is the core of the play. Each column adds a layer of context.

**Column A: Verify the LinkedIn profile**
Use Clay's "Find LinkedIn Profile" enrichment. MidBound gives you a URL but Clay re-verifies it's current and fetches the full profile.

**Column B: Pull recent LinkedIn activity**
Fetch the last 3 posts the person engaged with. This tells you what's on their mind. Use Clay's LinkedIn post-scraper enrichment.

**Column C: Company funding and headcount**
Clay's built-in Crunchbase / Apollo / Ocean.io enrichments. Pull funding round, last funding date, current headcount, growth rate.

**Column D: Tech stack**
BuiltWith or Wappalyzer enrichment. Does the company use tools that signal readiness (HubSpot, Segment, Mixpanel, demand-gen tools)?

**Column E: Role seniority + buying power**
Map title to a seniority tier (IC, Manager, Director, VP, C-level). Clay has a pre-built title classifier.

**Column F: Competitor footprint**
Does their company already use a competitor? Check with a tech-stack lookup or a LinkedIn profile text search. If they're on Factors or Snitcher, the angle changes. You're not selling visitor ID as a concept. You're selling person-level over company-level.

Every column in the waterfall has a different fill rate. LinkedIn verification almost always returns. Tech stack hits a little over half the time. Funding data only lands on companies that are VC-backed and reasonably public. The chart below is a representative spread.

<!-- chart:clay-waterfall -->

Use this to set expectations. If your enrichment prompt demands a "funding round" to generate context, 60% of your rows will return SKIP. If your prompt is flexible about which column it uses, the fill rate approaches 95%.

## Step 4: Generate One Line of Context

Add a Claude or OpenAI column in Clay. This is the AI step, but heavily constrained.

Prompt (paste exactly):

```
Write ONE sentence that a sales rep could open an email with,
referencing something specific about {{first_name}} at {{company_name}}.

Use these facts:
- Title: {{title}}
- Visited our {{page_visited}} page
- Recently engaged with: {{recent_linkedin_posts}}
- Company recently: {{company_funding_or_news}}
- Tech stack includes: {{tech_stack}}

Rules:
- No greeting, no "hi Sarah" -- just the sentence.
- No hype words. No "noticed you" or "saw that you."
- Reference one specific thing. Not two, not three.
- Under 30 words.
- If nothing specific stands out, return "SKIP" and nothing else.
```

The "SKIP" fallback is critical. If Clay does not have enough context to write something specific, it returns SKIP and the row gets flagged for manual review, not auto-sent.

## Step 5: Branch Into the Right Channel

Add a decision column based on what Clay found.

| Condition | Route to |
|---|---|
| Has LinkedIn URL + seniority >= Director + no validated email | HeyReach (LinkedIn-first) |
| Has validated email + company uses HubSpot | Lemlist (email-first) |
| Multi-stakeholder visit (2+ people from same company in last 7 days) | HubSpot task for SDR (manual play) |
| Clay returned SKIP | HubSpot task for SDR manual review |
| Competitor on tech stack | HubSpot task, competitive angle flag |

Clay's conditional routing handles this natively. Each row fires one output based on the decision column.

## Step 6: Push to the Outbound Tool

For the HeyReach and Lemlist branches, Clay's API integration pushes the enriched lead plus the AI-generated context line into the right campaign.

The context line becomes the first sentence of the outreach message. Everything else in the sequence stays consistent. One line of personalization, everything else standardized.

For the HubSpot branch, Clay creates a task assigned to the account owner with the full enrichment summary pasted in the task description.

## Step 7: Feedback Loop

Every week, export two views from Clay:

1. **Conversion by channel**: HeyReach vs. Lemlist vs. SDR-manual. Which channel produced meetings? Reassign ambiguous-fit rows to the winner.
2. **SKIP rate**: How often did Clay return SKIP? If it's over 25%, the enrichment waterfall is missing signal. Add columns. If it's under 5%, the prompt might be too loose. Tighten it.

This is not set-it-and-forget-it. The waterfall needs quarterly tuning as your ICP and signal quality evolve.

---

## Why Clay Instead of Direct Integration

MidBound connects directly to HeyReach, Lemlist, and HubSpot. You can skip Clay for most teams. Clay earns its place when:

- You need enrichment beyond what MidBound provides (competitor signals, recent company news, tech stack)
- You want AI-generated personalization at volume
- You route visitors to different channels based on fit, not a single "one size fits all" sequence
- You run multiple outbound plays in parallel and need a central decision layer

For a team doing under 50 identified visitors a week, Clay is overkill. For a team doing 200+ with multiple SDR pods, it's the only sane way to scale context-driven outreach.

---

## Next Steps

- [HeyReach LinkedIn playbook](/playbooks/automate-website-visitor-outreach-heyreach) for the LinkedIn branch
- [Lemlist email playbook](/playbooks/automate-website-visitor-outreach-lemlist) for the email branch
- [Run the multi-stakeholder play](/playbooks/multi-stakeholder-play) when Clay surfaces 2+ visitors from one company
