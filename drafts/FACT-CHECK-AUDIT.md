# MidBound Blog Fact-Check Audit

**Date:** 2026-04-08
**Audited by:** Shawn (with Claude Code)
**Status:** Awaiting founder review

---

## SEVERITY: CRITICAL

### 1. Vector Is NOT Clearbit

**What the content says everywhere:**
> "Vector (formerly Clearbit Reveal, now owned by HubSpot)"

**What is actually true:**

- **Vector** (vector.co) is a SEPARATE YC-backed company. Founded by Joshua Perk (CEO, ex-Air Force, ex-Drift) + Nick (co-founder, ex-Air Force, ex-Drift). Does **contact-level (person-level) identification + contact-level advertising**. Pricing ~$1,500/mo+ (quarterly billing). 15-30% match rate. US-focused.

- **Clearbit** was acquired by HubSpot in late 2023 and rebranded as **Breeze Intelligence**. Does **company-level visitor ID** (formerly "Clearbit Reveal") + data enrichment + form shortening. HubSpot-only. ~$75/mo+.

These are completely different companies solving different problems at different price points.

**Source:** vector.co, vector.co/company, vector.co/compare/can-clearbit-identify-anonymous-website-visitors, Crunchbase (Joshua Perk profile), Y Combinator company page

**Files containing this error:**

| File | Line(s) | Error |
|------|---------|-------|
| `knowledge/midbound-vs-competitors-detailed.md` | 9, 12 | "Vector (formerly Clearbit Reveal)" -- completely wrong |
| `knowledge/midbound-vs-competitors-detailed.md` | 200-211 | Comparison table lists Vector as "Company-level" -- wrong |
| `knowledge/competitor-landscape.md` | 21-25 | Clearbit section doesn't distinguish Vector. Vector absent as separate entity. |
| `knowledge/competitor-landscape.md` | 41-50 | Comparison table has no Vector row |
| `content/blog/sebastian/midbound-vs-vector.md` | ALL | Entire article premise is false. Claims Vector is company-level only. |
| `content/blog/eli/best-visitor-identification-tools-2026.md` | 110-128, 174-182 | Lists Vector as "Company-level" in text and comparison table |
| All derived LinkedIn/X/Reddit content from above articles | Various | Error propagated to all social content |

**The `midbound-vs-vector.md` comparison table is INVERTED:**

| What Article Claims | What's Actually True |
|--------------------|---------------------|
| "Identification level: Company" | Contact/Person-level |
| "Visitor name and title: No" | Yes |
| "Validated email: Enrichment only (known contacts)" | Yes (for identified visitors) |
| "ICP scoring: No" | Has ICP persona matching |
| "Real-time Slack alerts: No" | Yes |
| "CRM independence: No (HubSpot ecosystem)" | Works with HubSpot, Salesforce, Outreach, Clay, Apollo, etc. |

**Impact:** Every reader who checked Vector's website after reading our article would immediately see we don't know what we're talking about. This undermines ALL competitive credibility.

**Recommended action:** Kill `midbound-vs-vector.md` entirely. Rewrite knowledge base files. Add Vector as a person-level competitor.

---

### 2. RB2B Features Are Understated

**What the content claims:**

| Our Claim | Reality (verified rb2b.com, April 2026) |
|-----------|----------------------------------------|
| "No ICP scoring" | **Hot Leads** feature filters by company revenue, size, seniority, department, category, geography |
| "Limited webhook support" | 50+ integrations: Salesforce, HubSpot, Slack, Clay, Zapier, Apollo, webhook, CSV |
| "No sequence enrollment" | Integrates with sequence tools via Zapier, Apollo, Instantly, HeyReach |
| "No UTM re-engagement" | Has query parameter tracking on signup links |
| "Limited multi-stakeholder detection" | Not verified either way -- fair to keep as potential differentiator |

**RB2B Current Pricing (verified):**
- Free: 150 company credits/mo (company-level only after 7-day trial)
- Starter: $79/mo -- 300 resolutions, LinkedIn to Slack, no email
- Pro: $149/mo -- 600 resolutions, business emails, all integrations
- Pro+: $199/mo -- premium resolution (35-45% coverage), all features

**Files containing stale RB2B claims:**

| File | Line(s) | Stale Claim |
|------|---------|-------------|
| `content/blog/sebastian/midbound-vs-rb2b.md` | 43 | "ICP scoring: No" |
| `content/blog/sebastian/midbound-vs-rb2b.md` | 48 | "Webhook support: Limited" |
| `content/blog/sebastian/midbound-vs-rb2b.md` | 49 | "Sequence enrollment: No" |
| `content/blog/eli/best-visitor-identification-tools-2026.md` | 68 | "No built-in ICP scoring" |
| `knowledge/midbound-vs-competitors-detailed.md` | 205 | "ICP scoring: No" for RB2B |

**MidBound's ACTUAL differentiators vs RB2B (what's still true):**
- AI confidence scoring on every match (RB2B doesn't emphasize this)
- Multi-stakeholder detection with buying committee signals
- Deeper CRM automation (auto-create contacts, trigger HubSpot workflows)
- Sequence enrollment with cool-down rules (native, not via Zapier)

**Recommended action:** Kill `midbound-vs-rb2b.md`. Update knowledge base with current RB2B features. Reposition differentiators around what's actually unique.

---

### 3. "Only Two Person-Level Tools" Is Wrong

**What we say:**
> `midbound-vs-rb2b.md` line 105: "RB2B and MidBound are both person-level website visitor identification tools. They are the only two major tools in the person-level category."

**Reality:** The person-level space in 2026 includes:

| Tool | Type | Pricing |
|------|------|---------|
| MidBound | Person-level ID | SMB-Mid |
| RB2B | Person-level ID | $79-199/mo |
| Vector | Contact-level ID + ads | ~$1,500/mo+ |
| Warmly | Person + company ID + chat | $700/mo+ |
| Leadpipe | Person-level ID | Varies |
| Instantly Pixel | Person-level ID | Varies |
| Common Room (enhanced) | Person-level via Vector integration | Enterprise |

Person-level identification is a **growing category**, not a two-player market.

**Recommended action:** Remove the "only two" claim. Position MidBound within the category by differentiators, not by claiming exclusivity.

---

## SEVERITY: HIGH

### 4. Unverifiable Customer Case Studies

**In `person-level-intent-abm-upgrade.md` (lines 86-91), three stories are presented as real customer results:**

1. "A demand gen agency running $200K in monthly ad spend for clients...The agency's retention rate doubled"
2. "A mid-market SaaS company with a 45-day sales cycle...Sales cycle dropped to 22 days"
3. "A PLG company with a freemium product...Average deal size went up 40%"

**Problem:** No customer names, no citations, no verification. The safety filters explicitly prohibit "Specific customer revenue impact numbers (unless provided by the customer for public use)."

**Action needed:** Founders must confirm these are real customer stories OR they get removed/softened to directional language.

---

### 5. The $30K Analyst Deal

Used in 3+ articles:
- `company-level-id-is-dead.md` (line 94): "That analyst turned into a $30K deal."
- `stop-boxing-your-icp.md` (line 38): "That deal closed at $30K."
- `abm-without-person-level-data-is-blind.md` (line 52-66): Extended retelling

**Status:** Plausible and consistent, but never attributed to a named customer or confirmed in writing.

**Action needed:** Founder confirmation that this is a real story. If yes, keep it. If not confirmable, soften to "we've seen deals in this range from visitors teams would never have prospected."

---

### 6. "Scam" Language

**`company-level-id-is-dead.md` lines 20-22:**
> "Company-level ID is a scam. Snitcher. Factors. Clearbit. 6sense. Demandbase. All of them."

**Also embedded in:**
- `knowledge/person-vs-company-level.md` (the "Sebastian Framing" section)
- `skills/tier-1-voice-dna/sebastian-voice.md` (line 68, key phrases)

**Problem:** Calling named companies "scams" implies deliberate fraud. The safety filters say "critique the approach, not the product quality."

**Proposed replacement:** "Company-level ID is broken." or "Company-level ID is a dead end." -- keeps Sebastian's aggression without the legal risk.

---

## SEVERITY: MEDIUM

### 7. Uncited Statistics

| Statistic | Used In | Source | Action |
|-----------|---------|--------|--------|
| "97% of visitors leave without converting" | 10+ articles, glossary | InsideSales (documented in knowledge base) | Add citation in every article |
| "First vendor wins 70% of conversations" | `person-level-intent-abm-upgrade.md` | **NO SOURCE FOUND** | **REMOVE** or replace with "significant advantage" |
| "Buying committees have 6-10 people" | 8+ articles | Gartner (attributed sometimes, never cited) | Add "according to Gartner research" inline |
| "Companies responding within 5 min are 100x more likely to connect" | Knowledge base (not in articles yet) | InsideSales / Lead Response Management study | Cite source if used |

---

### 8. One-Line Competitive Pitch Is Now False

**Current:**
> "Every other tool in the space tells you which company visited your site. We tell you which person."

**Problem:** Vector and RB2B also tell you which person. This pitch is outdated.

**Needs update to reflect MidBound's actual differentiators** (confidence scoring, ICP automation, multi-stakeholder detection, workflow depth).

---

## ARTICLES ASSESSMENT SUMMARY

### STRONG -- Keep with minor fixes:
| Article | Author | Issues | Fix Level |
|---------|--------|--------|-----------|
| Your Website is a Party | Eli | Add 97% citation | Minor |
| How We Built MidBound from Zero | Sebastian | Clean, authentic origin story | None |
| Go Vertical, Win Deeply | Eli | Mentions Clearbit/6sense/ZoomInfo as threats -- reframe | Minor |
| Stop Boxing Your ICP | Sebastian | $30K deal needs verification | Minor |
| What Success Actually Means | Sebastian | No fact issues | None |
| Sales is Diagnosis Not Control | Eli | No fact issues | None |
| Person-Based Marketing | Eli | Add citations for stats, clean | Minor |

### KILL -- Cannot be salvaged:
| Article | Author | Reason |
|---------|--------|--------|
| MidBound vs Vector | Sebastian | Built on completely false premise |
| MidBound vs RB2B | Sebastian | 6+ stale/wrong feature claims |
| MidBound vs Obviously.ai | Sebastian | Low value, different category |

### REWRITE -- Needs major revision:
| Article | Author | Reason |
|---------|--------|--------|
| Best Visitor ID Tools 2026 | Eli | Vector listed as company-level (wrong). Entire comparison table needs correction. |
| Company-Level ID is Dead | Sebastian | "Scam" language + naming 5 companies |
| Person-Level Intent: ABM Upgrade | Sebastian | 3 unverifiable case studies + unsourced "70%" claim |
| ABM Without Person-Level Data is Blind | Eli | $30K deal verification needed + overlaps with other ABM articles |

---

## KNOWLEDGE BASE FILES NEEDING CORRECTION

| File | What's Wrong |
|------|-------------|
| `knowledge/midbound-vs-competitors-detailed.md` | Vector=Clearbit error throughout. RB2B features stale. Comparison table wrong. |
| `knowledge/competitor-landscape.md` | Vector missing as separate entity. Clearbit not updated to Breeze Intelligence. Comparison table wrong. One-line pitch is false. |
| `knowledge/person-vs-company-level.md` | "Scam" language embedded in Sebastian framing section |

**These files poison all future content generation.** Fixing them is the highest-priority item once founder feedback arrives.

---

## NEXT STEPS

1. **Founders review this document** and confirm/deny:
   - Is the $30K analyst deal real?
   - Are the 3 case studies in person-level-intent article real?
   - Approve "scam" → "broken" language change?
   - Approve killing 3 comparison articles?
   - Approve the corrected competitive landscape?

2. **New articles being drafted** (6 value-add articles focusing on workflows/intelligence, not competitor comparison)

3. **Signal repository** being built from Adam Robinson + Joshua Perk post research

4. **Knowledge base correction** ready to execute once founders approve
