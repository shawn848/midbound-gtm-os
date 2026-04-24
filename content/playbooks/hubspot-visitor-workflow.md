---
draft: false
title: "Create a HubSpot Workflow for Identified Visitors"
slug: "hubspot-visitor-workflow"
category: "crm-setup"
excerpt: "Automate contact creation, property mapping, and task assignment when MidBound identifies a high-value visitor."
difficulty: "intermediate"
time_to_complete: "30 minutes"
tools_needed: ["MidBound", "HubSpot"]
seo_title: "MidBound + HubSpot Workflow: Automate Identified Visitor Follow-Up"
seo_description: "Step-by-step guide to building a HubSpot workflow that creates contacts, assigns tasks, and updates lifecycle stages when MidBound identifies high-ICP website visitors."
keywords: ["hubspot workflow", "midbound hubspot", "crm automation", "visitor follow-up workflow", "contact creation automation", "sales task automation"]
related_playbooks: ["configure-icp-scoring", "slack-high-intent-alerts", "measure-visitor-pipeline"]
---

# Create a HubSpot Workflow for Identified Visitors

This playbook builds a HubSpot workflow that automatically creates contacts, maps MidBound data to custom properties, and assigns follow-up tasks to reps when high-value visitors are identified.

## What You'll Have When Done

A workflow that fires when MidBound identifies a high-ICP visitor on a key page. The contact gets created in HubSpot with full visitor data, a task gets assigned to the right rep, and return visitors get handled differently from first-time visitors.

---

## Step 1: Connect MidBound to HubSpot

In the MidBound dashboard, go to **Integrations > HubSpot**.

Click **Connect** and authorize MidBound to access your HubSpot portal. MidBound needs permission to create contacts, update properties, and trigger workflows.

Once connected, MidBound will automatically check for existing contacts before creating new ones, so you won't get duplicates.

## Step 2: Create Custom MidBound Properties in HubSpot

In HubSpot, go to **Settings > Properties > Contact Properties**. Create these custom properties:

| Property Name | Field Type | Description |
|--------------|------------|-------------|
| MidBound ICP Score | Number | Visitor's ICP fit score (1-10) |
| MidBound Visit Count | Number | Total number of identified visits |
| MidBound Last Page Viewed | Single-line text | Last page the visitor viewed |
| MidBound Identification Source | Dropdown | How the visitor was identified (direct, paid, organic, referral) |
| MidBound First Seen | Date | Date of first identified visit |
| MidBound Last Seen | Date | Date of most recent visit |
| MidBound Pages Viewed | Multi-line text | List of pages viewed across sessions |

Group these under a custom property group called "MidBound Visitor Data" so they're easy to find on contact records.

Back in MidBound's HubSpot integration settings, map each MidBound data field to the corresponding HubSpot property.

## Step 3: Build the Workflow Trigger

In HubSpot, go to **Automation > Workflows** and create a new contact-based workflow.

Set the enrollment trigger with these conditions (AND logic):

- **MidBound ICP Score** is greater than **8**
- **MidBound Last Page Viewed** contains **/pricing** OR **/demo** OR **/integrations**

This means the workflow only fires for high-fit visitors who looked at pages that signal buying intent. An ICP 9 visitor who only read a blog post won't trigger it. An ICP 9 visitor who hit the pricing page will.

## Step 4: Set Workflow Actions

Add these actions in sequence:

**Action 1: Update Lifecycle Stage**
Set the contact's lifecycle stage to **Marketing Qualified Lead**. This distinguishes MidBound-identified visitors from other lead sources in your reporting.

**Action 2: Set Lead Source**
Set the contact's lead source property to "MidBound Identified Visitor" (create this as a lead source option if it doesn't exist).

**Action 3: Create a Task for the Rep**
Create a task with:
- **Title**: "Follow up: [Contact Name] visited pricing page"
- **Type**: To-do
- **Priority**: High
- **Due date**: Same day
- **Assigned to**: The rep who owns the territory or account. Use HubSpot's round-robin assignment if you don't have territory rules.
- **Notes**: "Identified by MidBound. ICP Score: [score]. Visited: [pages]. Check their LinkedIn profile and reach out today."

## Step 5: Add a Return Visitor Branch

After the trigger, add an **if/then branch**:

**If MidBound Visit Count > 1:** Return visitor. Add a task note: "Return visitor, visit #[Visit Count]." If there's an existing deal, update the deal's last activity. Upgrade to **Sales Qualified Lead** if they've visited 3+ times.

**If MidBound Visit Count = 1:** First-time visitor. Standard actions from Step 4.

Return visitors on your pricing page are a stronger signal than first-time visitors. Your team should know the difference.

## Step 6: Test End-to-End

1. Set the workflow to **draft/test mode**.
2. Create a test contact with ICP score 9 and last page "/pricing".
3. Enroll and verify: lifecycle stage updated, task created, branch logic works.
4. Delete test contact and switch to **live**.

Monitor the first week. Adjust the ICP score threshold based on volume and conversion.

---

## Next Steps

- [Set up the multi-stakeholder play](/playbooks/multi-stakeholder-play) to handle buying committee signals
- [Measure your visitor-to-pipeline conversion](/playbooks/measure-visitor-pipeline) to track ROI
