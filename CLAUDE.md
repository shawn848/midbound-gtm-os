# Claude Code Instructions -- MidBound GTM

## Before Writing Any Content

Load the voice system in this order. Do not skip steps.

1. **Voice DNA** -- Load the founder's voice profile first:
   - Sebastian: `skills/tier-1-voice-dna/sebastian-voice.md`
   - Eli: `skills/tier-1-voice-dna/eli-voice.md`

2. **Anti-Slop** -- Load `skills/tier-1-voice-dna/anti-slop.md` and check every draft against it. If 3+ patterns flagged, rewrite from scratch -- do not patch.

3. **Safety Filters** -- Load `skills/tier-1-voice-dna/safety-filters.md`. Never name competitor customers. Never make compliance claims. Never guarantee results.

4. **Product Knowledge** -- Load relevant files from `knowledge/` so you never fabricate product details:
   - `knowledge/what-is-midbound.md` -- What MidBound is, founding story
   - `knowledge/how-deanonymization-works.md` -- Technical overview
   - `knowledge/person-vs-company-level.md` -- Core differentiator
   - `knowledge/competitor-landscape.md` -- Competitive positioning
   - `knowledge/integrations.md` -- Quick-reference for the 9 native integrations
   - `knowledge/use-cases.md` -- Target segments and applications

4b. **Integrations Source-of-Truth** -- Before making ANY claim about HubSpot / Slack / Clay / HeyReach / Lemlist / Pipedrive / Constant Contact / Google Sheets / Webhook, load `knowledge/integrations-docs-snapshot-2026-04-24.md` (or the latest dated snapshot in that folder). The snapshot is pulled directly from `https://midbound.ai/docs/integrations/*`. If a capability isn't documented there, drop the claim or mark it as future capability — never write it as current product. Common overclaims to avoid: "MidBound updates HubSpot contacts," "MidBound pushes custom properties (ICP score, visit count) to HubSpot," "MidBound triggers HubSpot workflows," "MidBound integrates with Salesforce / Marketo / Outreach / Salesloft / Apollo / 6sense" — none of those are accurate as of 2026-04-24.

5. **Platform Playbook** -- Load the relevant context playbook:
   - LinkedIn: `skills/tier-2-context-playbooks/linkedin.md`
   - X/Twitter: `skills/tier-2-context-playbooks/x-twitter.md`
   - Reddit: `skills/tier-2-context-playbooks/reddit.md`
   - Blog: `skills/tier-2-context-playbooks/blog.md`

6. **Content Pillar** -- Load the relevant pillar template from `skills/tier-3-content-ops/pillars/`

7. **Pre-Publish Checklist** -- Run `skills/tier-3-content-ops/pre-publish-checklist.md` on every draft before presenting it as final.

8. **Substance Check** -- Verify against `skills/tier-3-content-ops/substance-requirements.md`. Every substantive claim needs specifics.

## Skill Tier Hierarchy

| Tier | What It Controls | Files |
|------|-----------------|-------|
| Tier 1: Voice DNA | How each founder sounds, anti-slop, safety | `skills/tier-1-voice-dna/` |
| Tier 2: Context Playbooks | Platform-specific formatting and norms | `skills/tier-2-context-playbooks/` |
| Tier 3: Content Ops | Pillar templates, checklist, substance rules | `skills/tier-3-content-ops/` |

Tier 1 overrides everything. If a platform playbook conflicts with voice DNA, voice DNA wins.

## Content Calendar

The active calendar is at `calendar/content-calendar.md`. Reference it when asked about upcoming content or what to write next.

## Workflows

- Blog → social pipeline: `workflows/content-creation.md`
- **Reddit → blog pipeline (active daily flow):** `workflows/reddit-to-blog.md` — take a Reddit post (drafted or live) and turn it into a long-form blog post + LinkedIn + X derivatives. Reddit body is the source of truth for voice and claims; do not invent numbers or customers not in the source.
- Self-critique loop: `workflows/self-critique.md` -- run after writing, before slop filter
- AI slop filter: `workflows/slop-filter-check.md` -- systematic anti-slop scan
- Call recording to blog: `workflows/transcript-to-blog.md` (Phase 2)

## Active content arcs

- **Eli — Reddit Arc 1 (2026 Q2):** 12 posts, Tue + Thu, drafted at `content/reddit/eli-arc-1-2026-Q2/`. INDEX.md has the schedule and ground rules. The cross-platform calendar is `calendar/content-calendar.md`.
- **Sebastian — Arc 1:** TBD.

When asked to repurpose a Reddit arc post, follow `workflows/reddit-to-blog.md`.

## Content Quality Pipeline (run in order)

1. Write content (load voice DNA + knowledge base first)
2. Self-critique loop (`workflows/self-critique.md`)
3. Slop filter check (`workflows/slop-filter-check.md`)
4. Pre-publish checklist (`skills/tier-3-content-ops/pre-publish-checklist.md`)
5. Publish / commit

## GTM Operations

The GTM-OS skeleton lives at `gtm-os/`. This contains ICP definitions, positioning, competitive matrix, messaging angles, and integration notes. Reference these when writing content that involves positioning, competitive claims, or target audience specifics.

## Core Rules

1. **Never fabricate product details.** If you are unsure about a MidBound feature, integration, or metric, say so. Load the knowledge base files first.

2. **Never sound like AI.** Run anti-slop on every draft. The founders' voices are specific and documented -- match them, do not default to generic B2B tone.

3. **Sebastian and Eli sound different.** They are not interchangeable. Sebastian is aggressive, punchy, and provocative. Eli is structured, analytical, and uses extended analogies. Never blend them.

4. **Specifics over generalities.** Every post needs concrete details -- numbers, product features, real scenarios. See `skills/tier-3-content-ops/substance-requirements.md`.

5. **Check the calendar.** When asked to write content, check `calendar/content-calendar.md` to see if there is a scheduled topic for the current week.

6. **No competitor customer names.** You can name competitors (Snitcher, Factors, Clearbit, 6sense, Demandbase). You cannot name their customers or claim to know their internal metrics.

7. **Handle the privacy objection thoughtfully.** MidBound identifies website visitors. Some people find this uncomfortable. Follow Eli's framing: "It's not invasive; it's responsive. It's not cold; it's warm." Never be dismissive about privacy concerns.

8. **No CLI, no API, no Salesforce/Marketo/Outreach/Salesloft/Apollo/6sense as native integrations.** Per Eli (2026-04-24): MidBound is not prioritizing a CLI; an API is on the roadmap but pending customer feedback. The CRMs and sequencers in this rule are NOT supported as native integrations. They are reachable only as Webhook destinations via Zapier / Make / n8n — content must always frame them that way ("route via webhook to [tool]"), never as a direct MidBound integration. Same applies to any other tool not in `knowledge/integrations-docs-snapshot-*.md`.

## Product Quick Reference

- **What:** Person-level website visitor identification
- **How:** AI matches visitors to LinkedIn profiles in real-time
- **Output:** Name, title, company, validated email, LinkedIn profile, pages visited, time on site
- **Integrations (9 native, all unidirectional outbound):** HubSpot, Slack, Clay, Lemlist, HeyReach, Pipedrive, Constant Contact, Google Sheets, Webhook. NOT native: Salesforce / Marketo / Outreach / Salesloft / Apollo / 6sense (webhook-routable only via Zapier/Make).
- **Key features:** ICP matching, UTM re-engagement, multi-stakeholder detection
- **No CLI, no API yet** (2026-04-24) — API on roadmap pending customer feedback.
- **Differentiator:** Competitors (Snitcher, Factors, Clearbit) only do company-level ID. MidBound does person-level.
- **Traction:** 6 figures in under 5 months, $0 CAC, team of 3
- **Trial:** 14-day free trial, no CC required, midbound.ai/register
- **Target:** B2B SaaS, demand gen agencies, 1000+ US monthly visitors, $3K+ ACV
