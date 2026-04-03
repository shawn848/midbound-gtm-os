# How Deanonymization Works

## What Person-Level Identification Means

Traditional web analytics tell you that 500 people visited your pricing page. Company-level tools tell you that 12 companies visited your site. MidBound tells you exactly which individuals visited, what they looked at, and how to reach them.

## The Technical Flow

### 1. Visitor Detection
A lightweight script on the customer's website detects visitor sessions. This captures:
- Pages viewed
- Time spent per page
- Session duration
- Referral source
- UTM parameters (if present)

### 2. AI Matching
MidBound's AI matching engine processes visitor signals and matches them against a proprietary dataset to identify the individual. The matching resolves to a LinkedIn profile with high confidence.

Key matching capabilities:
- Real-time processing (not batch -- results appear as visits happen)
- LinkedIn profile resolution
- Email validation against the matched identity
- Confidence scoring on each match

### 3. Profile Enrichment
Once a visitor is matched, MidBound enriches the profile with:
- Full name
- Job title
- Company name
- Validated email address
- LinkedIn profile URL
- Company size and industry (where available)

### 4. ICP Scoring
Visitors are scored against the customer's Ideal Customer Profile criteria. This means high-value visitors surface first. Criteria can include:
- Job title / seniority
- Company size
- Industry
- Geography
- Technology stack

### 5. Delivery
Identified visitors are pushed to the customer's tools in real-time:
- **Slack**: Instant notification when a high-ICP visitor lands on a key page
- **HubSpot**: Contact created or updated with visit data
- **Webhooks**: Raw data sent to any system
- **Sequences**: Visitor behavior triggers automated follow-up

## Multi-Stakeholder Detection

When multiple people from the same company visit, MidBound flags this as a multi-stakeholder signal. This is a strong buying intent indicator -- it means the company is actively evaluating, not just one person browsing.

Example: If a VP of Marketing, a Director of Demand Gen, and a Marketing Ops Manager from the same company all visit your pricing page within a week, MidBound surfaces that pattern. This is a deal in motion.

## UTM Re-Engagement

MidBound tracks UTM parameters on identified visitors. This means you can:
- See which campaigns drove which identified visitors
- Re-engage visitors who came from specific campaigns
- Tie ad spend directly to identified people (not just anonymous clicks)
- Build retargeting audiences based on identified visitor segments

## What MidBound Does NOT Do

- Does not scrape personal data from websites
- Does not install tracking cookies beyond standard session detection
- Does not identify visitors outside the B2B context
- Does not guarantee 100% identification rate (no tool can)
- Does not access private browsing sessions or VPN-masked traffic

## Accuracy

Identification rates vary by traffic profile. B2B websites with US-heavy traffic and business-intent visitors see the highest match rates. MidBound validates email addresses before surfacing them to ensure deliverability.
