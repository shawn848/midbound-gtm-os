# MidBound Blog Overhaul: Review Document for Sebastian & Eli

**Prepared by:** Shawn Tenam
**Date:** April 8, 2026
**Status:** Awaiting founder review before any changes go live

---

## What This Document Covers

We did a full audit of every blog article, the knowledge base, and the competitive positioning. We found critical factual errors, created 6 new value-add articles, and built a competitive intelligence repository. Nothing has been changed on the live site. Everything here is for your review and approval.

---

## PART 1: WHAT WE FOUND (Fact-Check Results)

### CRITICAL: Vector Is NOT Clearbit

This was the biggest finding. The entire blog and knowledge base treats Vector (vector.co) as "formerly Clearbit Reveal, now owned by HubSpot." This is completely wrong.

**Vector** = Separate YC-backed company (W23 batch). Founded by Joshua Perk (ex-Air Force, ex-Drift). Does contact-level (person-level) identification AND contact-level advertising. Pricing starts at ~$399/mo. Integrates with HubSpot, Salesforce, Clay, Apollo, Outreach, Slack. 15-30% contact-level match rate.

**Clearbit** = Acquired by HubSpot in late 2023. Rebranded as Breeze Intelligence. Does company-level visitor ID + data enrichment. HubSpot-only. ~$75/mo+.

The "MidBound vs Vector" article claims Vector is company-level only, has no Slack alerts, no ICP scoring, and is locked to HubSpot. All of these claims are wrong. Anyone who visits vector.co after reading our article would immediately see we got it wrong.

**Files affected:** `midbound-vs-vector.md` (entire article), `best-visitor-identification-tools-2026.md` (comparison table), `knowledge/midbound-vs-competitors-detailed.md`, `knowledge/competitor-landscape.md`, all derived LinkedIn/X/Reddit content.

**Recommendation:** Kill the `midbound-vs-vector.md` article entirely. It cannot be salvaged because the premise is false.

---

### CRITICAL: RB2B Has More Features Than We Claimed

Our articles say RB2B has "no ICP scoring," "limited webhook support," and "no sequence enrollment." This is outdated.

**What RB2B actually has (verified April 2026):**
- **Hot Leads** = ICP-like filtering by company revenue, size, seniority, department, category, geography
- **50+ integrations** including Salesforce, HubSpot, Slack, Clay, Zapier, Apollo, webhooks
- **Hot Pages** tagging for custom segmentation
- **Demandbase partnership** (May 2025) giving them company-level + person-level combined (70-80% total identification)
- **Pricing:** Free (150 company credits/mo), Starter $79/mo, Pro $149/mo, Pro+ $199/mo

**Recommendation:** Kill the `midbound-vs-rb2b.md` article. The feature claims are stale and the "only two person-level tools" claim is also wrong (Vector, Warmly, Leadpipe, Instantly Pixel are all in the space now).

---

### HIGH: Unverifiable Customer Stories

The article "Person-Level Intent: The ABM Upgrade" (Sebastian) contains 3 customer stories with specific numbers but no attribution:

1. "A demand gen agency...retention rate doubled"
2. "A mid-market SaaS company with a 45-day sales cycle...dropped to 22 days"
3. "A PLG company...average deal size went up 40%"

**Question for founders:** Are these real customer stories? If yes, can we attribute them (even anonymously like "a MidBound customer")? If not confirmable, we need to remove the specific numbers.

---

### HIGH: The $30K Analyst Deal

This story appears in 3+ articles across both authors. It's a great story and it's used consistently. But it's never attributed to a named customer.

**Question for founders:** Is this a real customer story from a POC? Can we confirm it for the record? If yes, we keep it everywhere. If not confirmable, we soften the language.

---

### MEDIUM: "Scam" Language

The "Company-Level ID is Dead" article (Sebastian) opens with:

> "Company-level ID is a scam. Snitcher. Factors. Clearbit. 6sense. Demandbase. All of them."

Calling named companies "scams" implies deliberate fraud. Our own safety filters say to critique the approach, not the product.

**Recommendation:** Replace "scam" with "broken" or "dead end." Keeps Sebastian's punch without legal risk. Example: "Company-level ID is broken. You know it. Your SDRs know it."

**Question for founders:** Are you comfortable with "broken" as the replacement? Or do you want different language?

---

### MEDIUM: Statistics Missing Sources

| Statistic | Used In | Source Status | Action Needed |
|-----------|---------|---------------|---------------|
| "97% of visitors leave without converting" | 10+ articles | InsideSales research (documented in our knowledge base but never cited in articles) | Add inline citation |
| "First vendor wins 70% of conversations" | 1 article | No source found anywhere | Remove or soften to "significant advantage" |
| "Buying committees have 6-10 people" | 8+ articles | Gartner (attributed sometimes, never cited) | Add "according to Gartner research" |

---

### LOW: One-Line Competitive Pitch Is Outdated

Current pitch: "Every other tool tells you which company visited. We tell you which person."

This is now false. Vector and RB2B also tell you which person. Person-level identification is a category, not a unique feature.

**Needs update** to focus on MidBound's actual differentiators: confidence scoring, automated ICP scoring, multi-stakeholder detection, workflow automation depth.

---

## PART 2: WHAT WE RECOMMEND FOR EXISTING ARTICLES

### Articles to KEEP (minor fixes only)

| Article | Author | What Needs Fixing |
|---------|--------|-------------------|
| Your Website is a Party | Eli | Add 97% source citation |
| How We Built MidBound from Zero | Sebastian | Nothing. Clean origin story. |
| Go Vertical, Win Deeply | Eli | Minor: mentions "What stops Clearbit from adding person-level?" -- reframe since they're separate from Vector |
| Stop Boxing Your ICP | Sebastian | $30K deal pending founder confirmation |
| What Success Actually Means | Sebastian | Nothing. Clean philosophy piece. |
| Sales is Diagnosis Not Control | Eli | Nothing. Clean philosophy piece. |
| Person-Based Marketing | Eli | Add Gartner citation for buying committee stat |

### Articles to KILL (cannot be salvaged)

| Article | Author | Why |
|---------|--------|-----|
| MidBound vs Vector | Sebastian | Built on completely false premise (Vector = Clearbit). Every claim in the comparison table is wrong. |
| MidBound vs RB2B | Sebastian | 6+ stale/wrong feature claims. Features change daily. |
| MidBound vs Obviously.ai | Sebastian | Different product category entirely. Low SEO value. |

### Articles to REWRITE

| Article | Author | What's Wrong | What to Fix |
|---------|--------|-------------|-------------|
| Best Visitor ID Tools 2026 | Eli | Vector listed as "Company-level" (wrong). RB2B features outdated. | Correct the landscape. Add Vector as person-level. Update RB2B. Add Breeze Intelligence. Add "verified as of" date. |
| Company-Level ID is Dead | Sebastian | "Scam" language naming 5 companies | Replace "scam" with "broken." Keep the energy. |
| Person-Level Intent: ABM Upgrade | Sebastian | 3 unverifiable case studies + unsourced "70%" stat | Remove specific numbers if unconfirmed. Remove "70%" claim (no source). |
| ABM Without Person-Level Data is Blind | Eli | $30K deal needs verification. Overlaps heavily with other ABM articles. | Pending your feedback on the deal story. |

---

## PART 3: WHAT WE CREATED (6 New Articles)

These focus on what MidBound DOES and the VALUE it creates. No competitor bashing. No feature comparisons that go stale. Pure workflow and intelligence content.

All drafts are in the `drafts/` folder, ready for your review.

### Article 1: "From Anonymous Visitor to Closed Deal: The Complete Workflow"
**Author voice:** Sebastian (Product Flex)
**Word count:** ~1,900
**What it covers:** The complete step-by-step workflow from script install to closed deal. Visitor identification, ICP scoring, signal hierarchy (Tier 1/2/3), Slack/HubSpot routing, contextual outreach examples, buying committee detection, pipeline recovery from return visits.
**Why it matters:** Nobody in the space publishes the actual workflow. Competitors stop at "we identify visitors." This article shows what happens next.

### Article 2: "Qualifying De-Anonymized Visitors: From Name to Pipeline"
**Author voice:** Sebastian (Product Flex)
**Word count:** ~1,850
**What it covers:** How to go from 400 identified visitors to 12 priorities. ICP score tiers (8-10, 6-7, 5 and below), behavioral signal tiers, the priority matrix that combines both. Outreach examples for each tier. Common mistakes (emailing everyone, ignoring behavior, waiting too long).
**Why it matters:** Addresses the #1 failure mode with visitor identification: treating it as a bigger email list instead of an intelligence layer.

### Article 3: "Repeat Visitors Are Buying Signals You're Ignoring"
**Author voice:** Eli (Analogy Teacher + Thesis Builder)
**Word count:** ~1,900
**What it covers:** Extended grocery store analogy. First visit = curiosity, second = intent, third = deal forming. What repeat visits to specific pages mean (pricing returns, integrations returns, case study returns). Multi-stakeholder repeat patterns. Pipeline recovery from stalled deals returning.
**Why it matters:** Repeat visitors are the strongest buying signal most teams can't see. Neither RB2B nor Vector publishes content about this.

### Article 4: "What a Developer Visiting Your Site Tells You (That a VP Visit Doesn't)"
**Author voice:** Sebastian (Contrarian Attack)
**Word count:** ~1,760
**What it covers:** Why title-based filtering kills pipeline. What different roles are telling you by the pages they visit (developer = technical validation, ops = business case building, analyst = vendor evaluation, VP = awareness or budget approval). Role diversity as a buying committee signal. Why behavior beats title.
**Why it matters:** Contrarian angle that challenges the "only talk to VP+" mentality. Directly ties to the "stop boxing your ICP" thesis.

### Article 5: "Which Product Are They Evaluating? Page-Level Visitor Intelligence"
**Author voice:** Eli (Revenue Realist)
**Word count:** ~1,880
**What it covers:** The page-intent map (each page answers a specific buyer question). Single-page vs multi-page session analysis. The progression patterns (blog-to-pricing, pricing-to-integrations, full evaluation arc). How to tailor outreach based on pages viewed. Multi-product intelligence.
**Why it matters:** Pages visited are the most underused data point in visitor identification. This article turns raw page data into actionable intelligence.

### Article 6: "Building a Visitor Intelligence Database in Your CRM"
**Author voice:** Eli (Analogy Teacher + Revenue Realist)
**Word count:** ~2,090
**What it covers:** Filing cabinet analogy. Custom HubSpot properties to set up (visit count, pages, ICP score, source, multi-stakeholder flag). The compounding effect over 30/60/90 days. HubSpot workflows (high-ICP alert, return visitor, multi-stakeholder, stalled deal reactivation, campaign attribution). What your CRM should NOT do.
**Why it matters:** Turns MidBound from a point tool into infrastructure. Shows how visitor data compounds over time into a strategic asset.

---

## PART 4: COMPETITIVE INTELLIGENCE (Signal Repository)

We built a full competitive intelligence document from recent LinkedIn/X activity by Adam Robinson (RB2B) and Joshua Perk (Vector). Key highlights:

### Adam Robinson (RB2B CEO)
- 125K+ LinkedIn followers, ~36 posts/month
- RB2B at ~$7.8M ARR, bootstrapped, small team
- **Gutted the free tier in Jan 2026** (removed person-level from free plan) -- created user frustration. This is an opportunity.
- **Partnered with Demandbase** (May 2025) for company-level ID -- now claims 70-80% total identification
- Pushing "contact-based marketing" as the category name
- Match rate claims of 40-45% are disputed by independent testing (realistic: 5-20% person-level)

### Joshua Perk (Vector CEO)
- YC W23, $2.6M seed raised
- Pricing starts at $399/mo (2.7x RB2B's entry price)
- Positions as "contact-level advertising" -- an ad platform, not just identification
- $12K influencer pilot generated $1.1M in pipeline
- Key differentiator: off-site intent detection (OffsiteID) + ad audience pushing to LinkedIn/Google/Meta

### 10 Content Gaps Neither Competitor Fills
1. Honest match rate education
2. Post-identification playbooks (what to do AFTER identification)
3. Technical depth on how de-anonymization works
4. Multi-stakeholder buying committee detection
5. Privacy-forward positioning
6. Agency/consultant multi-client use cases
7. Cost-per-identified-visitor unit economics
8. Non-US market guidance
9. Integration workflow depth (not just "we integrate with X")
10. Match rate optimization strategies

**Our new articles directly fill gaps #2, #3, #4, and #9.**

---

## PART 5: WHAT WE NEED FROM YOU

### Decisions needed:

1. **$30K analyst deal:** Real story? Can we keep using it?
2. **3 case studies in person-level-intent article:** Real customers? Keep the numbers or remove them?
3. **"Scam" to "broken" language swap:** Approved?
4. **Kill 3 comparison articles** (vs Vector, vs RB2B, vs Obviously.ai): Approved?
5. **Review the 6 new articles:** Any factual issues, voice mismatches, or things you'd change?
6. **Competitive positioning update:** The one-liner needs to change since person-level is now a category. Ideas?

### What we'll do after your review:

1. Fix the knowledge base files (correct Vector/Clearbit distinction, update RB2B features)
2. Kill or archive the 3 comparison articles
3. Rewrite the "Best Tools 2026" article with corrected landscape
4. Fix "scam" language and add statistical citations across all articles
5. Run full anti-slop pass on all remaining published content
6. Publish the 6 new articles (once you've approved them)
7. Update all derived LinkedIn/X/Reddit content that carries forward errors

---

## FILE LOCATIONS

All new content is in the `drafts/` folder:

```
drafts/
  FACT-CHECK-AUDIT.md          -- Full audit with every error documented
  REVIEW-FOR-FOUNDERS.md       -- This document
  article-01-anonymous-visitor-to-closed-deal.md
  article-02-qualifying-deanonymized-visitors.md
  article-03-repeat-visitors-buying-signals.md
  article-04-role-based-visitor-intelligence.md
  article-05-page-level-visitor-intelligence.md
  article-06-visitor-intelligence-database-crm.md
```

Signal repository:
```
gtm-os/demand/signal-repository-rb2b-vector.md
```
