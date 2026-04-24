---
draft: false
title: "Wire MidBound-Identified Visitors Into HubSpot"
slug: "hubspot-visitor-workflow"
category: "crm-setup"
excerpt: "Pipe identified visitors from MidBound into HubSpot as contacts, then build the rest of the follow-up workflow on the HubSpot side where it belongs."
difficulty: "intermediate"
time_to_complete: "30 minutes"
tools_needed: ["MidBound", "HubSpot"]
seo_title: "MidBound + HubSpot: Identified Visitors Into the CRM"
seo_description: "How to push MidBound-identified visitors into HubSpot as contacts and use HubSpot's native workflow tools to handle follow-up, tasks, and lifecycle stages."
keywords: ["hubspot workflow", "midbound hubspot", "crm automation", "visitor follow-up workflow", "contact creation automation"]
related_playbooks: ["slack-high-intent-alerts", "multi-stakeholder-play", "personalize-engagement-clay"]
---

# Wire MidBound-Identified Visitors Into HubSpot

The MidBound-HubSpot integration does one thing: it creates contacts in HubSpot when an identified visitor matches your audience filter. That's the whole job. Everything you want to happen next — tasks, lifecycle changes, sequences, deal creation — is built on the HubSpot side using HubSpot's own automation. This playbook walks through both halves: the MidBound side that pushes the contact in, and the HubSpot-side workflow that takes over.

## What You'll Have When Done

A live setup where any identified visitor that matches your ICP audience lands as a HubSpot contact within minutes. A HubSpot workflow that uses "contact created" as its trigger then assigns a task, sets the lead source, and routes the contact to the right rep — all using HubSpot's native automation, not anything MidBound is doing.

---

## Step 1: Connect MidBound to HubSpot

In the MidBound dashboard, go to **Integrations > HubSpot** and authorize the connection.

What this gives you: MidBound can create contacts in your HubSpot portal, and it checks for an existing contact by email before each create — so duplicates get skipped silently.

Two important things this does *not* give you, even though the integration page might suggest otherwise:

1. **No updates to existing contacts.** If MidBound identifies a returning visitor whose email already exists in HubSpot, it leaves that contact untouched. No new visit data appended. No property updates. The integration's lookup is for deduplication, not enrichment.
2. **No custom MidBound properties.** The integration writes the standard identity fields it has (name, email, phone, title, company, address). It does not push an "ICP Score" property, a "Last Page Viewed" property, a "Visit Count" property, or any of the other MidBound-specific fields you might want in HubSpot.

If you want those fields in HubSpot, the only path today is the **Webhook integration** — point a webhook at Zapier or Make, and have that intermediary write whatever properties you want. That's a separate playbook.

## Step 2: Build the MidBound-Side Audience

In MidBound, create the audience that should land in HubSpot. Filter on whatever signals matter:

- Job title or seniority
- Pages visited (e.g., `/pricing`, `/demo`, `/integrations`)
- Session duration
- Visitor count from the same company (multi-stakeholder)
- Has a validated business email (required — visitors without an email are silently skipped by the HubSpot action)

Then build a workflow with the HubSpot action attached. Every visitor that enters the audience triggers a contact create.

A reasonable filter for most B2B teams: "ICP-fit visitors who hit a high-intent page and have a business email." Keep it tight in week one. You can broaden once you see what's landing.

## Step 3: Set Up the HubSpot-Side Workflow

This is where the actual automation lives. In HubSpot, go to **Automation > Workflows** and create a contact-based workflow.

**Enrollment trigger:**
- Contact source = your MidBound source (HubSpot auto-tags contacts created via integrations; verify your contact source value by inspecting one of the contacts MidBound creates).

That's the only enrollment criterion you need. MidBound's audience filter already qualified the visitor; the HubSpot workflow's job is to act on the result, not re-filter.

**Actions:**

- **Set Lead Source** to "MidBound Identified Visitor" (create this as a lead source option if it doesn't exist). This is what makes downstream reporting possible.
- **Set Lifecycle Stage** to Marketing Qualified Lead (or whatever stage matches your funnel).
- **Create a Task** for the assigned rep:
  - Title: "Follow up: {{contact.firstname}} from {{contact.company}}"
  - Type: To-do
  - Priority: High
  - Due: same day
  - Assigned to: rep by territory, round-robin, or account ownership rule.
- **Send a Slack notification** (optional) — if you've already wired the Slack alert from MidBound directly, skip this. Two notifications for the same visitor is noise.

If you want pages-visited or session-duration context in the task, you'll need to capture that via the Webhook integration into a separate property, since MidBound's HubSpot integration doesn't push those fields. For now, the rep can pull that detail from the MidBound dashboard.

## Step 4: Test End-to-End

1. Set the HubSpot workflow to **draft mode**.
2. From outside your network, visit a page that matches your audience filter.
3. Wait a minute. Verify a new contact lands in HubSpot.
4. Verify the workflow enrolls and the task gets created.
5. Switch the HubSpot workflow to **live**.

If the contact doesn't land in HubSpot:
- Check that MidBound captured an email (no email = no HubSpot push).
- Check that the visitor matched your audience filter.
- Check that the contact didn't already exist in HubSpot (the integration silently skips dupes).

## Step 5: Don't Try to Build the Whole Customer Journey Inside the Integration

This is where teams over-invest. The MidBound-HubSpot integration is a one-way pipe: visitor → contact. Everything else — sequence enrollment, deal creation, multi-step automations, sales-rep handoff rules — belongs in HubSpot's own workflow tools, not in MidBound configuration.

When in doubt: if the question is "should MidBound do X to HubSpot?", the answer is almost certainly no. MidBound creates the contact. HubSpot does the rest.

---

## What This Playbook Does Not Cover

- **Custom MidBound properties in HubSpot.** Use the Webhook integration + Zapier/Make if you need this.
- **Pushing visitor data to existing HubSpot contacts.** The native integration doesn't update; if you need to enrich existing records, route via Webhook + a downstream tool that handles upserts.
- **Salesforce, Pipedrive, or other CRMs.** Pipedrive has its own native integration with slightly different behavior (it does update Organizations); Salesforce is webhook-only.

---

## Next Steps

- [Set up the Slack alert](/playbooks/slack-high-intent-alerts) so reps see qualified visitors before the contact even hits HubSpot
- [Run the multi-stakeholder play](/playbooks/multi-stakeholder-play) when several visitors from the same company show up
- [Use Clay for context-rich outreach](/playbooks/personalize-engagement-clay) when basic CRM creation isn't enough
