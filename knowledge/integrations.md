# Integrations

## Overview

MidBound pushes identified visitor data to the tools sales and marketing teams already use. The goal is zero context-switching -- visitor intelligence shows up where teams already work.

## Slack Integration

**What it does:** Sends real-time notifications to a Slack channel when identified visitors match ICP criteria.

**Typical setup:**
- Dedicated channel (e.g., #midbound-visitors or #high-intent-visitors)
- Notifications include: visitor name, title, company, pages visited, time on site, ICP score
- Can filter by ICP score threshold (e.g., only notify on 7+ score)
- Can filter by page (e.g., only notify when someone hits the pricing page)

**Why it matters:** Sales teams live in Slack. When a high-ICP visitor hits the pricing page, the rep sees it immediately and can reach out the same day.

## HubSpot Integration

**What it does:** Creates or updates contacts in HubSpot when visitors are identified.

**Typical setup:**
- New visitors create a new contact with all available data
- Returning visitors update the existing contact with new visit data
- Custom properties for MidBound-specific fields: visit count, last page visited, ICP score, identification source
- Can trigger HubSpot workflows based on MidBound data (e.g., enroll in sequence when ICP score > 8 and pricing page visited)

**Why it matters:** The CRM becomes the single source of truth. Sales reps see visitor behavior alongside deal history, email engagement, and everything else already in HubSpot.

## Webhooks

**What it does:** Sends raw visitor identification data to any endpoint via HTTP POST.

**Typical setup:**
- Configure a webhook URL
- MidBound sends a JSON payload on each identification event
- Payload includes all available visitor data
- Can be routed to Clay, Zapier, Make, n8n, or custom backends

**Why it matters:** Maximum flexibility. Any team with a technical resource can pipe MidBound data into any workflow.

## Sequences

**What it does:** Automatically enrolls identified visitors into outreach sequences based on behavior and ICP fit.

**Typical setup:**
- Define trigger criteria (ICP score threshold + page visited + time on site)
- Map to a specific sequence or outreach cadence
- Sequences run through existing email tooling
- Cool-down rules to prevent over-contacting

**Why it matters:** Speed to lead. The highest-intent visitors get outreach within hours, not days.

## CRM Sync

**What it does:** Bidirectional sync with CRM systems to avoid duplicate outreach and keep records current.

**Key behaviors:**
- Checks for existing contacts before creating new ones
- Appends visit data to existing records
- Respects existing ownership and routing rules
- Does not overwrite manually entered data

## Integration Architecture

```
Website Visitor
    |
    v
MidBound (identifies person)
    |
    +---> Slack (real-time alert)
    +---> HubSpot (contact created/updated)
    +---> Webhooks (raw data to any system)
    +---> Sequences (automated outreach)
```

All integrations fire in real-time. There is no batch processing delay.
