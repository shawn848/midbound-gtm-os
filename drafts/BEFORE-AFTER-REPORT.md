# MidBound Blog Overhaul: Before/After Report

**Date:** April 8, 2026
**Build status:** Passing (all routes rendering)

---

## Summary of Changes

| Category | Before | After |
|----------|--------|-------|
| Blog articles | 14 | 17 (3 killed, 6 added) |
| Playbooks | 0 | 6 (new section) |
| Help center articles | 0 | 15 (new section) |
| Glossary terms | 45+ | 45+ (unchanged) |
| Site sections | 2 (Blog, Glossary) | 4 (Blog, Playbooks, Help Center, Glossary) |
| Knowledge base errors | 12+ critical | 0 |
| Unverifiable claims | 6 | 0 |
| Missing citations | 8+ | 0 |

---

## 1. KNOWLEDGE BASE FIXES

### `knowledge/midbound-vs-competitors-detailed.md`

**Before:** Vector section titled "Vector (formerly Clearbit Reveal)" describing it as company-level only.

**After:** Two separate sections:
- **Vector (vector.co):** YC-backed, contact-level identification + advertising, $399/mo+, Joshua Perk + Nick, 15-30% match rate
- **Clearbit / Breeze Intelligence:** HubSpot-acquired, company-level only, $75/mo+

**Before:** RB2B described with "no ICP scoring", basic features.

**After:** RB2B section includes Hot Leads filtering, 50+ integrations, $79-199/mo pricing, Demandbase partnership, realistic match rate caveats.

**Before:** Comparison table listed Vector as "Company-level" with "No" for most features.

**After:** Corrected table with 8 tools. Vector = Person/Contact level. RB2B = Hot Leads filtering. Breeze = separate company-level entry. Added confidence scoring row (MidBound's differentiator).

### `knowledge/competitor-landscape.md`

**Before:** Only listed company-level competitors. No mention of RB2B or Vector as person-level tools. One-liner: "Every other tool tells you which company visited. We tell you which person."

**After:** Two sections: Person-Level competitors (RB2B, Vector, Warmly) and Company-Level tools (Breeze, Snitcher, Factors, 6sense, Demandbase). Updated one-liner: "Person-level identification is the category. MidBound is the one that tells you which visitors to prioritize, which buying committees are forming, and exactly how confident the match is."

### `knowledge/person-vs-company-level.md`

**Before:** Sebastian framing: "Company-level ID is a scam."
**After:** "Company-level ID is broken."

### `skills/tier-1-voice-dna/sebastian-voice.md`

**Before:** Key phrases included "scam" as Sebastian's natural language pattern.
**After:** Replaced with "broken" throughout.

---

## 2. ARTICLES KILLED (Moved to `content/archive/`)

| Article | Reason |
|---------|--------|
| `midbound-vs-vector.md` (Sebastian) | Built on completely false premise (Vector = Clearbit). Every feature claim in the comparison table was wrong. |
| `midbound-vs-rb2b.md` (Sebastian) | 6+ stale/incorrect feature claims about RB2B. "Only two person-level tools" claim was wrong. |
| `midbound-vs-obviously-ai.md` (Sebastian) | Different product category entirely. Low SEO value. |

---

## 3. ARTICLES FIXED

### `company-level-id-is-dead.md` (Sebastian)

| Line | Before | After |
|------|--------|-------|
| Excerpt | "Company-level identification is a scam" | "Company-level identification is broken" |
| Line 20 | "Company-level ID is a scam." | "Company-level ID is broken." |
| Line 22 | "Snitcher. Factors. Clearbit. 6sense. Demandbase. All of them." | (unchanged, the naming is fine; the "scam" label was the issue) |

### `person-level-intent-abm-upgrade.md` (Sebastian)

| Change | Before | After |
|--------|--------|-------|
| Case study 1 | "The agency's retention rate doubled" | Directional: "That shift in reporting quality changes the client conversation entirely" |
| Case study 2 | "Sales cycle dropped to 22 days" | Directional: "conversations start faster and cycles compress" |
| Case study 3 | "Average deal size went up 40%" | Directional: "your enterprise sales team knows exactly who to prioritize" |
| Line 66 | "wins the conversation 70% of the time" | "has a significant advantage over everyone who follows" |
| Line 138 (FAQ) | Same "70%" claim | "has a meaningful advantage over everyone else" |
| Line 72 | "buying committees have 6-10 people" | Added "(according to Gartner research)" |
| Line 48 | "97% of those visitors leave" | Added "(InsideSales research)" |

### `best-visitor-identification-tools-2026.md` (Eli)

| Change | Before | After |
|--------|--------|-------|
| Title | "7 Best..." | "8 Best..." |
| Vector section | Listed as "Company-Level", described as Clearbit Reveal | Rewritten as "Contact-Level + Advertising", separate company, $399/mo+, YC-backed |
| New section | N/A | Added "Clearbit / Breeze Intelligence (Company-Level)" as section 6 |
| RB2B section | "No built-in ICP scoring", basic features | Updated with Hot Leads, 50+ integrations, $79-199/mo pricing, Demandbase partnership |
| Comparison table | Vector = Company, RB2B = "No" ICP | Vector = Person/Contact, RB2B = Hot Leads filtering, Breeze = separate entry |
| Header | No disclaimer | Added "Features verified as of April 2026" note |
| 97% stat | No citation | Added "(InsideSales research)" |

### `stop-boxing-your-icp.md` (Sebastian)

| Change | Before | After |
|--------|--------|-------|
| 97% stat | No citation | Added "(InsideSales research)" |
| 6-10 stat | No citation | Added "(Gartner research)" |

### `your-website-is-a-party.md` (Eli)

| Change | Before | After |
|--------|--------|-------|
| 97% stat | "97% of them. Just gone." | "97% of them (InsideSales research). Just gone." |

### `person-based-marketing.md` (Eli)

| Change | Before | After |
|--------|--------|-------|
| 6-10 stat | "B2B buying committees have 6 to 10 people. That's not a theory. That's the consistent data point from every major B2B research firm." | "B2B buying committees have 6 to 10 people, according to Gartner research. That's not a theory. That's the consistent data point across multiple studies." |

### `go-vertical-win-deeply.md` (Eli)

| Change | Before | After |
|--------|--------|-------|
| VC question | "What stops Clearbit from adding person-level identification?" | "What stops a bigger company from adding person-level identification?" |

---

## 4. NEW BLOG ARTICLES (6)

| # | Title | Author | Words | Focus |
|---|-------|--------|-------|-------|
| 1 | From Anonymous Visitor to Closed Deal | Sebastian | 1,901 | Complete identification-to-pipeline workflow |
| 2 | Qualifying De-Anonymized Visitors | Sebastian | 1,847 | ICP + signal priority matrix |
| 3 | Repeat Visitors Are Buying Signals | Eli | 1,901 | Repeat visitor intelligence with grocery store analogy |
| 4 | Role-Based Visitor Intelligence | Sebastian | 1,761 | Developer vs VP vs analyst visit signals |
| 5 | Page-Level Visitor Intelligence | Eli | 1,881 | Pages visited map to evaluation stages |
| 6 | CRM Visitor Intelligence Database | Eli | 2,088 | HubSpot setup with 30/60/90 value curve |

All articles: zero competitor feature claims, zero unverifiable stats, proper citations, anti-slop checked.

---

## 5. NEW PLAYBOOKS SECTION (6 Playbooks)

| # | Title | Category | Difficulty | Time |
|---|-------|----------|------------|------|
| 1 | Set Up MidBound in 10 Minutes | Getting Started | Beginner | 10 min |
| 2 | Configure ICP Scoring Criteria | Getting Started | Beginner | 15 min |
| 3 | Build a High-Intent Visitor Slack Alert | Outreach Workflows | Beginner | 15 min |
| 4 | Create a HubSpot Workflow for Identified Visitors | CRM Setup | Intermediate | 30 min |
| 5 | Multi-Stakeholder Account Play | Outreach Workflows | Intermediate | 30 min |
| 6 | Measure Visitor-to-Pipeline Conversion Rate | Analytics | Intermediate | 1 hour |

Website features: HowTo schema markup, difficulty badges, tool tags, category filtering, related playbooks.

---

## 6. NEW HELP CENTER SECTION (15 Articles)

**Getting Started (3):**
1. How to Install the MidBound Script
2. What Happens After You Install MidBound
3. Setting Up Your ICP Criteria

**Features (5):**
4. How ICP Scoring Works
5. Understanding Confidence Scores
6. Multi-Stakeholder Detection Explained
7. UTM Campaign Attribution
8. How Match Rates Work (And What Affects Them)

**Integrations (4):**
9. Connecting MidBound to Slack
10. Connecting MidBound to HubSpot
11. Setting Up Webhooks
12. Sequence Enrollment and Cool-Down Rules

**Troubleshooting (3):**
13. Why Are My Match Rates Low?
14. Visitors Not Showing Up in Slack
15. Duplicate Contacts in HubSpot

Website features: FAQ schema on each article, category grouping, search, short answer previews, related articles.

---

## 7. SITE STRUCTURE CHANGES

### Navigation (Before → After)
- Before: Blog, Glossary, About, Start Free Trial
- After: Blog, Playbooks, Help Center, Glossary, About, Start Free Trial

### Homepage Grid (Before → After)
- Before: Blog, Glossary, Comparisons (linked to killed article), Get Started
- After: Blog, Glossary, Playbooks, Help Center, Get Started

### Footer (Before → After)
- Before: Blog, Glossary, midbound.ai
- After: Blog, Playbooks, Help Center, Glossary, midbound.ai

### Sitemap
- Before: Homepage, blog index, blog posts, glossary index, glossary terms
- After: All above + playbooks index, individual playbooks, help center index, individual help articles

---

## 8. COMPETITIVE POSITIONING UPDATE

### Before:
"Every other tool in the space tells you which company visited your site. We tell you which person."

**Problem:** False. RB2B, Vector, and others also identify the person.

### After:
"Person-level identification is the category. MidBound is the one that tells you which visitors to prioritize, which buying committees are forming, and exactly how confident the match is."

**MidBound's corrected differentiators:**
1. Confidence scoring on every match
2. Automated ICP scoring (not just filtering)
3. Multi-stakeholder buying committee detection
4. Workflow automation depth (sequences + cool-down rules)
5. Pricing accessibility (vs Vector at $399/mo+, vs enterprise at $50K+)

---

## 9. SIGNAL REPOSITORY (New)

Created `gtm-os/demand/signal-repository-rb2b-vector.md` (496 lines):
- Adam Robinson (RB2B): 125K+ LinkedIn followers, ~$7.8M ARR, "contact-based marketing" positioning, Demandbase partnership, free tier gutted Jan 2026
- Joshua Perk (Vector): YC W23, $399/mo+, "contact-level advertising" positioning, $12K influencer pilot → $1.1M pipeline
- 10 content gaps neither competitor fills
- SEO keyword opportunities
- Category terminology war analysis
