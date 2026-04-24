---
title: "Automate Email Outreach to Website Visitors with Lemlist"
slug: "automate-website-visitor-outreach-lemlist"
category: "outreach-workflows"
excerpt: "Turn an identified website visit into a page-aware email sequence the same day. Lemlist handles the send, MidBound handles the who, your SDR handles the reply."
difficulty: "intermediate"
time_to_complete: "40 minutes"
tools_needed: ["MidBound", "Lemlist", "Zapier or Make"]
seo_title: "Lemlist + MidBound: Automated Email Outreach to Identified Visitors"
seo_description: "Playbook for routing MidBound visitor data into Lemlist email campaigns. Page-context liquid variables, deliverability guardrails, reply-handoff to SDR."
keywords: ["lemlist automation", "email outreach website visitors", "warm outbound email", "visitor identification email", "midbound lemlist"]
related_playbooks: ["automate-website-visitor-outreach-heyreach", "hubspot-visitor-workflow", "slack-high-intent-alerts"]
---

# Automate Email Outreach to Website Visitors with Lemlist

Someone from your ICP hits your demo page. MidBound gives you a validated work email. Lemlist sends a 3-step sequence that references what they looked at. Your SDR steps in only when they reply.

This is email outbound that has context instead of guesses. The person already raised their hand by visiting. You're following up, not cold-calling.

## What You'll Have When Done

A working pipeline: MidBound fires a webhook on qualified visits, a router drops the lead into a Lemlist campaign with page-specific liquid variables, the sequence runs, and replies hand off to your SDR via Slack and HubSpot.

---

## Step 1: Create the Lemlist Campaign

In Lemlist, create a new campaign called "MidBound Visitor Intent - Email."

Campaign type: **Multi-step sequence**. Enable "stop on reply" for every step. You do not want a reply followed by another automated message.

Set sending hours to match the prospect's timezone, not yours. Lemlist handles this automatically if the lead record includes a timezone field. MidBound's payload includes country, so you can map country to a default timezone in the router step.

## Step 2: Build the 3-Step Sequence

Lemlist sequences work best when they feel like a human wrote one email and kept thinking about the conversation.

**Email 1 (day 0)**: Short. Reference the page.

```
Subject: {{firstName}}, quick question about {{companyName}}

Hey {{firstName}},

Saw {{companyName}} was looking at {{pageTopic}} earlier today.

Most folks checking that page are sizing up {{problem}} for their team.
Is that where you're at, or something different?

{{senderFirstName}}
```

**Email 2 (day 3)**: Offer a resource tied to the page. Not a deck. Not a calendar link. A specific thing that earns the meeting.

**Email 3 (day 7)**: Clean close. Acknowledge they're busy, leave the door open.

Do not write "just circling back." Do not write "did my last email get buried?" Both read as performative.

## Step 3: Set Up the Webhook Router

In MidBound, go to **Integrations > Webhooks** and create a new webhook:

- Visitor matches your high-intent audience (ICP filters in the MidBound UI)
- Visited page includes `/demo`, `/pricing`, `/solutions`, or high-intent content
- Has a validated business email on file. Email is the required field for the Lemlist push — visitors without one are skipped on Lemlist's side.
- Excludes anyone in an active Lemlist campaign (Lemlist's API can check this; the native integration also dedupes against existing campaign members)

Route to a Zapier or Make scenario that calls Lemlist's "Add Lead to Campaign" endpoint.

## Step 4: Map Liquid Variables

This is where the magic lives. MidBound sends raw data. You map it to liquid variables Lemlist uses in the sequence.

| MidBound field | Lemlist variable | Example |
|---|---|---|
| first_name | `{{firstName}}` | "Sarah" |
| company_name | `{{companyName}}` | "Acme Corp" |
| pages_visited[0] | `{{pageTopic}}` (via mapping) | "/pricing" -> "pricing" |
| pages_visited[0] | `{{problem}}` (via mapping) | "/pricing" -> "what this costs" |
| company_size | `{{segment}}` | "51-200" -> "mid-market" |

The mapping step matters. Raw URLs read weird in email. A small lookup table in your router turns `/pricing` into "pricing" and "what this costs." That's what makes the email feel written, not generated.

## Step 5: Lock In Deliverability

Email outbound at any scale lives or dies on deliverability. A few non-negotiables:

- **Domain warm-up**: Only send from a domain that is warmed up. Lemlist's warm-up tool is built in. Minimum 3-4 weeks of warm-up before real sending.
- **SPF, DKIM, DMARC**: All three configured on your sending domain. Lemlist checks these on setup.
- **Send volume**: Start at 20-30 sends/day per inbox. Ramp slowly.
- **Custom tracking domain**: Use your own, not Lemlist's default. Sent-from-a-sequence is easier to flag.
- **Plain text**: Skip images, heavy HTML, and signatures with logos. Plain text inboxes better.

## Step 6: Consent and US Geography

This workflow is built for US B2B. CAN-SPAM governs it. The rules:

- Every email must have a valid physical business address
- Every email must include a one-click unsubscribe that actually works
- Honor unsubscribes within 10 business days (Lemlist does this automatically, verify it)
- Do not use deceptive subject lines or "from" names

For non-US geographies (EU, UK, Canada), the rules change. MidBound's country field lets you filter those out of the Lemlist audience and route them to a manual review list or a different workflow entirely.

## Step 7: Reply Handoff

Replies route two places:

1. **Slack**: Post to `#sdr-visitor-replies` with the reply text, original page, and a link to the HubSpot contact. Your SDR picks it up from there.
2. **HubSpot**: Lemlist creates or updates the contact and logs the full email thread. Every reply triggers a task assigned to the account owner.

Exit the Lemlist sequence on reply. Your SDR's response is not automated. Lemlist is the first move, not the whole conversation.

---

## Privacy and Compliance Notes

MidBound identifies business visitors in a business context. The Lemlist sequence sends business emails to business addresses. That's what this stack is designed for.

If someone asks where you got their email: answer plainly. "You visited our website, we identify business visitors, I reached out because it looked like a fit."

Respect unsubscribes. Immediately. If someone opts out of Lemlist, suppress them at the audience level in MidBound so they don't re-enter the workflow on a later visit.

---

## Next Steps

- [Set up Slack alerts](/playbooks/slack-high-intent-alerts) so SDRs see qualified visitors before the sequence even starts
- [Connect the HubSpot workflow](/playbooks/hubspot-visitor-workflow) so every reply lands on the CRM record
- [Measure visitor-sourced pipeline](/playbooks/measure-visitor-pipeline) to tie Lemlist replies to revenue
