---
draft: false
title: "Measure Visitor-to-Pipeline Conversion"
slug: "measure-visitor-pipeline"
category: "analytics"
excerpt: "Track ROI from identified visitor to closed revenue using MidBound's dashboard for the visitor side and HubSpot's lead-source attribution for the pipeline side."
difficulty: "intermediate"
time_to_complete: "45 minutes"
tools_needed: ["MidBound", "HubSpot"]
seo_title: "Measure Visitor-to-Pipeline Conversion with MidBound + HubSpot"
seo_description: "Track MidBound ROI: use MidBound's dashboard for visitor-side metrics and HubSpot's lead-source attribution for pipeline-side metrics. Step-by-step setup."
keywords: ["visitor conversion rate", "pipeline metrics", "midbound ROI", "visitor identification analytics", "lead source attribution"]
related_playbooks: ["hubspot-visitor-workflow", "slack-high-intent-alerts", "multi-stakeholder-play"]
---

# Measure Visitor-to-Pipeline Conversion

The visitor side of the funnel lives in MidBound. The pipeline side lives in HubSpot. This playbook shows you how to read each surface for what it's good at and tie the two together with clean lead-source attribution.

## What You'll Have When Done

A measurement setup that splits the funnel cleanly. MidBound's dashboard shows everything from visitor identified through outreach handoff. HubSpot reports show everything from lead-source-tagged contact through closed-won. You'll know your visitor-to-meeting rate, your meeting-to-opportunity rate, and your cost-per-identified-visitor.

---

## Step 1: Use Each Tool for What It's Good At

Visitor-side metrics live in MidBound's dashboard:

- **Visitors identified** — total count
- **ICP-fit visitors** — how many matched your audience filters
- **High-intent visitors** — how many hit pricing / demo / integration pages
- **Multi-stakeholder accounts** — companies that sent 2+ visitors

Pipeline-side metrics live in HubSpot:

- **Contacts created from MidBound** — counted by lead source
- **MQLs / SQLs** — using HubSpot's lifecycle stage
- **Opportunities** — deals where the primary contact's lead source = MidBound
- **Closed-won revenue attributed to MidBound**

Build the connection point — clean lead-source tagging — and the rest reads cleanly off the two surfaces.

## Step 2: Tag MidBound-Sourced Contacts with a Lead Source

In your HubSpot workflow that fires on MidBound contact creation (see the [HubSpot Workflow playbook](/playbooks/hubspot-visitor-workflow)), include this action:

- Set **Original Source** or a custom property called **MidBound Lead Source** to `"MidBound Identified Visitor"`.

A dedicated "MidBound Lead Source" property is sticky — it persists no matter what other touches happen later. HubSpot's built-in Original Source can get rewritten by later form fills, so a custom property is more reliable for MidBound-specific reporting.

## Step 3: Build Three Reports in HubSpot

**Report 1 — MidBound Funnel.** Custom report builder. Filter: contacts where MidBound Lead Source = "MidBound Identified Visitor." Group by lifecycle stage. Show counts at each stage and the conversion rate between stages. End-to-end pipeline view.

**Report 2 — Deals by MidBound Source.** Filter deals where the primary contact's MidBound Lead Source matches. Show count, amount, and stage. This is your revenue view.

**Report 3 — Top Converting Pages.** For richer page-level reporting, route MidBound's Webhook through Zapier or Make to write the page visited into a HubSpot custom property on every visit. Then build a table grouped by that property with contact count, deal count, and deal amount. If `/case-studies` visitors convert at 3x the rate of `/blog` visitors, that's actionable for both sales and marketing.

## Step 4: Calculate Cost-Per-Identified-Visitor

```
Cost per identified visitor = Monthly MidBound cost / Total identified visitors
Cost per ICP-fit visitor    = Monthly MidBound cost / ICP-fit visitors
Cost per meeting            = Monthly MidBound cost / Meetings booked from MidBound contacts
```

Compare against your other channels — paid, content, outbound SDR, events. The interesting number is usually cost-per-meeting, because warmth varies wildly across channels and that flattens out by the time you're in a calendar invite.

## Step 5: Calculate Visitor-to-Meeting Rate

```
Visitor-to-meeting rate = Meetings booked / ICP-fit visitors contacted
```

If the rate is below 5%, look at speed and relevance:

- **Speed.** Same-day outreach beats next-day by a wide margin. If your team is reaching out 24+ hours after the visit, that's the first lever.
- **Relevance.** The outreach should reference the page they viewed. The whole point of identification is the context.

If the rate is above 15%, you can probably loosen your audience filter and pick up more volume without diluting quality.

## Step 6: Review on a Cadence That Matches Your Volume

For most teams: monthly. Pull the funnel, check rates, adjust the audience filter or page targeting if the numbers warrant it. Don't change too much at once. Move one knob, see what happens, then move the next.

For higher-volume teams (200+ identified visitors a week): bi-weekly is fine. Anything more frequent is noise.

---

## Next Steps

- [Wire up the HubSpot workflow](/playbooks/hubspot-visitor-workflow) — that's where the lead-source tagging lives
- [Tighten the Slack alert thresholds](/playbooks/slack-high-intent-alerts) once you see which audience filters actually convert
- [Run the multi-stakeholder play](/playbooks/multi-stakeholder-play) on the accounts that matter most
