---
draft: false
title: "Multi-Stakeholder Account Play: Step by Step"
slug: "multi-stakeholder-play"
category: "outreach-workflows"
excerpt: "Detect when multiple people from the same company visit your site and run a coordinated outreach play across the buying committee."
difficulty: "intermediate"
time_to_complete: "30 minutes"
tools_needed: ["MidBound", "Slack", "HubSpot"]
seo_title: "Multi-Stakeholder Account Play with MidBound | Buying Committee Outreach"
seo_description: "Step-by-step guide to detecting and acting on multi-stakeholder buying signals. Coordinate outreach across the full buying committee when multiple people from one company visit your site."
keywords: ["multi-stakeholder detection", "buying committee", "account-based outreach", "multi-threading sales", "buying signals", "account play"]
related_playbooks: ["slack-high-intent-alerts", "hubspot-visitor-workflow", "measure-visitor-pipeline"]
---

# Multi-Stakeholder Account Play: Step by Step

When two or more people from the same company visit your website, something is happening. They're evaluating. They're sharing links internally. A deal might already be forming before anyone fills out a form. This playbook sets up the detection and outreach strategy.

## What You'll Have When Done

A system that detects multi-stakeholder visits, alerts your team in Slack with full context on each person, and a repeatable outreach framework for engaging the full buying committee.

---

## Step 1: Understand Multi-Stakeholder Detection

MidBound flags when 2+ identified visitors from the same company visit your site within a time window (typically 7 days). Example:

- **Rachel Torres**, VP of Marketing at Brightpath (visited /pricing, /case-studies)
- **James Park**, Director of Demand Gen at Brightpath (visited /integrations/hubspot, /pricing)
- **Mia Santos**, Marketing Ops Manager at Brightpath (visited /integrations, /pricing)

Three people from Brightpath. Different roles. All on evaluation pages. A single visitor might be casually browsing. Multiple visitors from one company is intentional research.

## Step 2: Build a Multi-Stakeholder Audience and Route It to Slack

In MidBound, build an audience that filters for company-level engagement: visitors from companies that already have one or more other identified visitors in a recent window. The audience surface is where this lives, not a separate "alert" toggle.

Then build a workflow on that audience that pushes to Slack. Send those notifications to a dedicated channel like `#midbound-accounts` or fold them into your existing `#midbound-high-intent` channel.

A typical multi-stakeholder notification ends up looking like a sequence of individual visitor notifications from the same company arriving close together. If you want them visually grouped, do that in Slack with a thread or pinned summary message — the integration itself posts one channel notification per workflow firing, not a grouped digest:

> **Multi-Stakeholder Signal: Brightpath (3 visitors this week)**
>
> Rachel Torres - VP of Marketing | ICP 9 | /pricing, /case-studies
> James Park - Director of Demand Gen | ICP 8 | /integrations/hubspot, /pricing
> Mia Santos - Marketing Ops Manager | ICP 7 | /integrations, /pricing
>
> [View Account in MidBound]

## Step 3: Create Role-Specific Outreach Messages

Different roles on a buying committee care about different things. Prepare message templates for each persona:

**VP/Executive** (Rachel): Lead with business outcomes. "Noticed your team has been evaluating us. Happy to share how marketing leaders in your space use visitor identification to tie ad spend to pipeline."

**Director/Practitioner** (James): Lead with implementation. He visited the HubSpot page, so: "Saw you were checking out our HubSpot integration. Takes about 15 minutes to set up — identified visitors land as new contacts in HubSpot, then your existing workflows take over."

**Ops/Technical** (Mia): Lead with specifics. "The integration creates a contact in HubSpot for every identified visitor that matches your audience. No manual CSV imports — your HubSpot side handles enrichment, lifecycle, and routing."

## Step 4: Run the Account-Level Play

When a multi-stakeholder alert fires, your rep should:

1. **Check HubSpot.** Is Brightpath in your CRM already? Existing deal? Old conversation?
2. **Pick the entry point.** Start with the most senior person or strongest intent signal. Here, Rachel (VP, pricing + case studies) is the best first touch.
3. **Multi-thread within 48 hours.** Don't contact all three the same day. Rachel first, James two days later, Mia as a third touch.
4. **Reference team activity, not individuals.** Say: "I noticed some interest from your team." Do NOT say: "I can see that you, James, and Mia all visited our pricing page."
5. **Aim for a group meeting.** "Would it make sense to get your team on a quick call so everyone can ask questions?"

## Step 5: Set Up a HubSpot Deal Creation Trigger

In HubSpot, create a workflow that triggers when:

- **Company has 2+ contacts** whose Lead Source = "MidBound Identified Visitor" (the property you set in the [HubSpot workflow playbook](/playbooks/hubspot-visitor-workflow))
- **No existing open deal** for this company

When triggered:
1. Create a new deal in the pipeline (stage: "Prospect" or your equivalent).
2. Associate all MidBound-sourced contacts from that company with the deal.
3. Assign the deal to the rep who owns the territory or the rep who received the first Slack alert.
4. Add a deal note: "Created from multi-stakeholder signal. [X] MidBound contacts identified this week."

A note on what the MidBound integration pushes vs. doesn't: the native HubSpot integration creates the contact with standard identity fields. It does not push an ICP score, a "MidBound Identification Source" property, or a "visit count" property into HubSpot. If your trigger needs any of those, route via the Webhook integration + Zapier/Make to write them yourself, or use HubSpot's own logic (lead-source counting, lifecycle stage thresholds) as the trigger condition. The Lead-Source-based trigger above works without any custom property setup beyond the one you'd already add as part of the HubSpot workflow playbook.

This ensures multi-stakeholder signals get tracked as pipeline from day one.

## Step 6: Track the Account Through Pipeline

Once the deal exists, watch for weekly signals:

- **New stakeholders**: More people from the company visiting means momentum.
- **Return visits**: Someone comes back to pricing after your outreach? Follow up immediately.
- **Page progression**: Blog to case studies to pricing is a healthy evaluation pattern.

Build a HubSpot report comparing multi-stakeholder deals vs. single-contact deals. Multi-stakeholder deals typically close at higher rates because you're engaging the full decision-making group.

---

## Next Steps

- [Measure your full visitor-to-pipeline conversion](/playbooks/measure-visitor-pipeline) to quantify the ROI of your multi-stakeholder plays
- Tune your scoring thresholds if multi-stakeholder alerts are too noisy or too quiet
