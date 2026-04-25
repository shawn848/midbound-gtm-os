---
title: "Automate LinkedIn Outreach to Website Visitors with HeyReach"
slug: "automate-website-visitor-outreach-heyreach"
category: "outreach-workflows"
excerpt: "Send a connection request on LinkedIn the same day a visitor hits your pricing page. Warm context, automated cadence, SDR handoff on reply."
difficulty: "intermediate"
time_to_complete: "45 minutes"
tools_needed: ["MidBound", "HeyReach", "Zapier or Make"]
seo_title: "HeyReach + MidBound: Auto-LinkedIn Outreach to Website Visitors"
seo_description: "Step-by-step playbook to trigger HeyReach LinkedIn outreach when an identified visitor hits your site. Page-aware messaging, daily-send compliance, SDR reply handoff."
keywords: ["heyreach automation", "linkedin outreach website visitors", "abm linkedin", "visitor identification outreach", "midbound heyreach"]
related_playbooks: ["slack-high-intent-alerts", "multi-stakeholder-play", "measure-visitor-pipeline"]
---

# Automate LinkedIn Outreach to Website Visitors with HeyReach

Someone from your ICP hits your pricing page. MidBound identifies them. HeyReach sends a connection request with a note that references the page they viewed. Your SDR gets pinged only when they reply. That's the play.

This is the "responsive not invasive" version of outbound. The prospect visited you first. You're answering, not interrupting.

## What You'll Have When Done

A live workflow that takes an identified website visitor, checks ICP fit, and enrolls them into a HeyReach LinkedIn campaign within minutes. Page context flows into the connection message. Replies route to your SDR in Slack.

---

## Step 1: Build Your HeyReach Campaign

In HeyReach, create a new campaign. Name it something obvious like "MidBound Visitor Intent - LinkedIn."

Campaign type: **Connection Request + Follow-ups**.

Set a daily send cap. HeyReach enforces LinkedIn's natural limits. Keep connection requests at 15-20/day per sender account to stay out of LinkedIn's spam flags. If you have a team, rotate across 3-5 sender accounts.

## Step 2: Write the Connection Message

Keep it under 300 characters. The structure that converts for visitor-intent outreach:

```
Hey {{firstName}}, saw you were looking at {{page}} earlier today.
Most people checking that page are thinking about {{topic}}. Happy to
share what we're seeing work for {{companyType}} teams your size.
```

Use HeyReach's variable syntax. The `{{page}}` and `{{topic}}` variables will be populated from MidBound data in Step 4.

Do not write "I noticed you visited our website." That reads as creepy. "Saw you were looking at [specific page]" reads as attentive.

## Step 3: Configure the Follow-Up Sequence

Three follow-up messages, spaced out:

- **Day 3**: Reference the page again. Offer a specific resource. "That pricing page is the one that trips most [role]s up. I wrote up how we handle [specific problem] in a 2-minute loom, want me to send it?"
- **Day 7**: Proof-based. "We're seeing [specific pattern] for [industry] teams. Curious if you're seeing the same."
- **Day 14**: Clean close. "Last note from me. If the timing's off, no worries. Here's the Loom anyway: [link]. Reach out whenever."

Exit the sequence on reply. Always.

## Step 4: Wire Up the MidBound Webhook

In MidBound, go to **Integrations > Webhooks**. Create a new webhook with these filters:

- Visitor matches your high-intent audience (ICP filters in the MidBound UI)
- Visited page includes `/pricing`, `/demo`, or `/compare`
- Session duration >= 30 seconds
- Has a LinkedIn URL on file (HeyReach uses the LinkedIn profile to match the lead to a campaign)

Set the webhook destination to a Zapier or Make scenario that takes the MidBound payload and calls HeyReach's "Add Lead to Campaign" API.

The payload you need to forward to HeyReach:
- LinkedIn URL (from MidBound)
- First name
- Company name
- `page`: the path they visited (e.g., "your pricing page")
- `topic`: a mapped topic based on page (pricing -> "what MidBound costs", compare -> "how MidBound stacks up to alternatives")

## Step 5: Route Replies to Slack

When a prospect replies to the HeyReach message, you want your SDR to take over, not the automation.

In HeyReach, set the "Reply Detected" webhook to post to a Slack channel (e.g., `#sdr-visitor-replies`). Include the reply text, LinkedIn URL, and the original page context from MidBound.

Your SDR sees the reply, the context, and can jump in with a tailored response. No automation in the SDR conversation. HeyReach's job ends at "got a reply."

## Step 6: Add Guardrails

A few things to set up before going live:

- **Exclusion list**: Upload existing customers and active pipeline contacts to HeyReach. You do not want to connection-request your own accounts.
- **Geography filter**: Restrict to US + whatever geos match your go-to-market. MidBound data includes country inference.
- **Team-member filter**: Exclude visitors whose company domain matches your own. Your coworkers will visit the site.
- **Rate-limit fallback**: If MidBound fires more triggers than HeyReach's daily cap, queue the overflow. Do not drop it.

## Step 7: Measure What Matters

Track three numbers weekly:

- **Connection acceptance rate**: Healthy range is 35-55% for visitor-intent outreach. Below 30% means the message is off.
- **Reply rate on accepted**: 15-30% is strong. Lower means the follow-ups are weak.
- **Meetings booked from reply**: This is the ground truth.

Do not track "sent" volume. It's a vanity number. Volume is capped by LinkedIn's limits anyway.

---

## Privacy and Compliance Notes

This workflow identifies business visitors in a business context and reaches out on a business platform. That's the use case LinkedIn is built for.

Keep messages business-focused. Reference their company, role, and public interest signals (the page they visited). Do not reference personal data, location, or anything that reads as surveillance.

If someone asks how you got their info, answer plainly: "You visited our website. We identify business visitors and reach out when there's fit."

---

## Next Steps

- [Set up Slack alerts](/playbooks/slack-high-intent-alerts) for a real-time SDR view of every identified visitor
- [Run the multi-stakeholder play](/playbooks/multi-stakeholder-play) when two or more people from the same company visit
- [Measure visitor-sourced pipeline](/playbooks/measure-visitor-pipeline) to tie HeyReach replies back to closed revenue
