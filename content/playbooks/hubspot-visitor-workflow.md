---
draft: false
title: "Wire MidBound-Identified Visitors Into HubSpot"
slug: "hubspot-visitor-workflow"
category: "crm-setup"
excerpt: "Pipe identified visitors from MidBound into HubSpot as contacts, then build follow-up automation on the HubSpot side using contact-created as your trigger."
difficulty: "intermediate"
time_to_complete: "30 minutes"
tools_needed: ["MidBound", "HubSpot"]
seo_title: "MidBound + HubSpot: Identified Visitors Into the CRM"
seo_description: "How to push MidBound-identified visitors into HubSpot as contacts and use HubSpot's native workflow tools to handle follow-up, tasks, and lifecycle stages."
keywords: ["hubspot workflow", "midbound hubspot", "crm automation", "visitor follow-up workflow", "contact creation automation"]
related_playbooks: ["slack-high-intent-alerts", "multi-stakeholder-play", "personalize-engagement-clay"]
---

# Wire MidBound-Identified Visitors Into HubSpot

Identified visitors land as new contacts in your CRM. From there, HubSpot's own workflow engine takes over — task creation, lifecycle stages, deal automation, sequence enrollment, all of it. This playbook covers both halves: the MidBound audience that pushes the contact in, and the HubSpot workflow that picks it up.

## What You'll Have When Done

A live setup where any identified visitor matching your ICP audience lands as a HubSpot contact within minutes. A HubSpot workflow keyed on "contact created" then assigns a task, sets the lead source, and routes the contact to the right rep.

---

## Step 1: Connect MidBound to HubSpot

In the MidBound dashboard, go to **Integrations > HubSpot** and authorize the connection. MidBound checks for an existing contact by email before each push, so duplicates are handled cleanly.

For richer data flow — visit count, last page viewed, ICP score, custom audience tags landing on the HubSpot record — use MidBound's **Webhook** integration alongside HubSpot. The webhook fires on every workflow trigger with the full visitor JSON; route it through Zapier or Make and write whatever HubSpot properties you want, on every visit. This is the path most teams use once they're past the basic "contact gets created" stage.

## Step 2: Build the MidBound-Side Audience

In MidBound, create the audience that should land in HubSpot. Filter on whatever signals matter:

- Job title or seniority
- Pages visited (e.g., `/pricing`, `/demo`, `/integrations`)
- Session duration
- Visitor count from the same company (multi-stakeholder)
- Has a validated business email

Then build a workflow with the HubSpot action attached. Every visitor that enters the audience triggers a contact create.

A reasonable filter for most B2B teams: "ICP-fit visitors who hit a high-intent page and have a business email." Keep it tight in week one. You can broaden once you see what's landing.

## Step 3: Set Up the HubSpot-Side Workflow

This is where the actual automation lives. In HubSpot, go to **Automation > Workflows** and create a contact-based workflow.

**Enrollment trigger:**
- Contact source = your MidBound source. HubSpot tags contacts created via integrations; verify the value by inspecting one of the contacts MidBound creates.

That's the only enrollment criterion you need. MidBound's audience filter already qualified the visitor; the HubSpot workflow's job is to act on the result.

**Actions:**

- **Set Lead Source** to "MidBound Identified Visitor" (create this lead-source option if it doesn't exist). This unlocks downstream reporting.
- **Set Lifecycle Stage** to Marketing Qualified Lead, or whatever stage matches your funnel.
- **Create a Task** for the assigned rep:
  - Title: "Follow up: {{contact.firstname}} from {{contact.company}}"
  - Type: To-do
  - Priority: High
  - Due: same day
  - Assigned to: rep by territory, round-robin, or account ownership rule.
- **Send a Slack notification** if you haven't already wired the Slack alert directly from MidBound. Two notifications for the same visitor is noise.

If you want pages-visited or session-duration in the task description, capture those properties via the Webhook path described in Step 1. The custom properties land on the HubSpot record on every visit, and your workflow can reference them.

## Step 4: Test End-to-End

1. Set the HubSpot workflow to **draft mode**.
2. From outside your network, visit a page that matches your audience filter.
3. Wait a minute. Verify a new contact lands in HubSpot.
4. Verify the workflow enrolls and the task gets created.
5. Switch the HubSpot workflow to **live**.

## Step 5: Let HubSpot Run the Customer Journey

The MidBound integration handles the visitor-to-contact handoff. Everything past that — sequence enrollment, deal creation, multi-step automations, sales-rep routing rules — runs in HubSpot's own workflow engine where it's already powerful and well understood. Build the journey once, in the system your team already operates in.

---

## Next Steps

- [Set up the Slack alert](/playbooks/slack-high-intent-alerts) so reps see qualified visitors before the contact even hits HubSpot
- [Run the multi-stakeholder play](/playbooks/multi-stakeholder-play) when several visitors from the same company show up
- [Use Clay for context-rich outreach](/playbooks/personalize-engagement-clay) when basic CRM creation isn't enough
