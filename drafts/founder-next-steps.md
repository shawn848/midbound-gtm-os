# Midbound — Where We Are & What's Next

Prepared for Sebastian and Eli. Short on purpose. Comments and pushback welcome.

---

## Two apps, both live

**Recon (intel dashboard)** — `https://midbound-nexus-production.up.railway.app/nexus`
Auth: `midbound-intel` / `ef75662859168596c219a7a34f4094c2`.
This is the visitor-intel graph. 8,300+ engagers across 76 sources, geo-tagged, scored against the Midbound ICP. v2.5 shipped with density + Israeli weighting + de-ranked consultants/agency/fractional. Currently paused pending Apify quota top-up (would unlock ~5,000 more geo-tagged engagers + the first 5-star IL/US VPs).

**Website** — `https://build-midbound-growth-engine-blush.vercel.app`
This is the blog + playbook surface. Two sections only: **Blog** and **Playbooks**, toggle via the pill nav in the header. No Help Center (you already have one), no Glossary. 6 founder blogs live at launch. 3 outreach playbooks live.

HubSpot deal 320589245169 (portal 245728800) tracks the engagement.

---

## What just shipped — blog launch set

All 6 live at `/blog`. Each has the full `.md` on GitHub + rendered page on Vercel.

**Sebastian:**
- Person-Level Intent: The ABM Upgrade Nobody's Talking About
- What Success Actually Means as a Founder
- Stop Boxing Your ICP So Tight You Kill Your Own Pipeline

**Eli:**
- Which Product Are They Evaluating? Page-Level Visitor Intelligence
- Sales is Diagnosis, Not Control
- 8 Best Website Visitor Identification Tools in 2026

Each one rendered with the new clean React grid (no overengineered search/filter/pagination UI — we'll add those back if the post count grows). Midbound orange glow on the active nav pill.

---

## What just shipped — 3 new playbooks

All 3 live at `/playbooks`. Category: Outreach Workflows.

- **Automate LinkedIn Outreach to Website Visitors with HeyReach** — trigger a connection request with page context the same day they visit. Reply routes to SDR.
- **Automate Email Outreach to Website Visitors with Lemlist** — 3-step sequence with liquid variables that reference the page. Deliverability + CAN-SPAM guardrails included.
- **Personalize Visitor Engagement with Clay** — Clay enrichment waterfall + AI-generated context line + branch to HeyReach / Lemlist / SDR task. The advanced play.

These are drafted to be actionable, not teasers. Each walks through the actual webhook setup, the liquid variables, the compliance notes.

---

## What's drafted, awaiting your review (not live)

Hidden behind `draft: true` in the repo. Will go live when you greenlight.

**Flagship blog draft (1 ready):**
- Deterministic vs Probabilistic: What GTM Teams Actually Need to Know (Eli) — plain-language explainer with the math on why "90% match rate" probabilistic kills SDR trust.

**Blog topic backlog (6 left from the spec):**
- The New Buyer Journey: Search Everywhere, Visit Quietly, Convert Late
- When Visitor Identification Fails and Why (credibility piece)
- The Metrics That Actually Matter in Visitor Identification
- What to Do in the First 7 Days After Installing Visitor Identification
- How to Use Website Visitor Data for Outbound That Doesn't Feel Cold
- Visitor Identification and Compliance: The Practical Rules GTM Teams Need to Know

Your original 15-topic spec also listed the 6 blogs above as approved. The 6 backlog blogs haven't been drafted yet — next batch.

---

## Decisions we need from you

1. **Approve or edit the 6 live blogs.** They're public on the Vercel URL today. If any need a copy pass, we'll revise and republish.
2. **Approve or edit the 3 playbooks.** Same deal — live now, easy to revise.
3. **Publishing cadence.** Do we stagger the 6 blogs over Sebastian + Eli's LinkedIn feeds (1/week? 2/week?), or ship them in one founder-wave? We have matching LinkedIn / X / Reddit variants ready for each in the repo.
4. **Backlog batching.** Want the 6 remaining blog topics drafted in one batch for review, or staged two at a time?
5. **Integration into the main Midbound site.** The Vercel app needs to eventually fold into `midbound.ai` as the blog + playbook section. Open questions: subdomain (`blog.midbound.ai`) vs. same-domain (`/blog`, `/playbooks`)? Who's repo owns it? When do we want to cut over?

---

## What's intentionally not here

- **Help Center** — you already have one. Dropped from the nav + routes.
- **Glossary** — out of scope for the launch surface. Source content still in the repo; we can resurrect it if you want a separate resource hub later.
- **The existing 12 non-launch blog drafts** — all kept in the repo (`content/blog/`) under `draft: true`. Zero effort to un-hide any of them when you want to expand.
- **HomepageCharts + knowledge-engine grid** — removed from the homepage to keep launch-day scannable.

---

## Operational notes (useful but skippable)

- **Vercel project:** `build-midbound-growth-engine` (team: midbound).
- **Branch:** `feature/content-intel-nexus` (origin on GitHub). Main is still the initial commit.
- **Static export:** `website/out/`, served via Vercel with cleanUrls enabled.
- **Public production alias:** `build-midbound-growth-engine-blush.vercel.app`. (Raw deployment URLs are SSO-gated by team setting — that's why only the alias works from outside.)
- **Recon commits:** v2.5 code now committed to `~/midbound-intel`. Railway is already running this exact state.
