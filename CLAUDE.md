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
   - `knowledge/integrations.md` -- HubSpot, Slack, webhooks
   - `knowledge/use-cases.md` -- Target segments and applications

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

- Blog to social pipeline: `workflows/content-creation.md`
- Call recording to blog: `workflows/transcript-to-blog.md` (Phase 2)

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

## Product Quick Reference

- **What:** Person-level website visitor identification
- **How:** AI matches visitors to LinkedIn profiles in real-time
- **Output:** Name, title, company, validated email, LinkedIn profile, pages visited, time on site
- **Integrations:** Slack, HubSpot, webhooks, sequences
- **Key features:** ICP matching, UTM re-engagement, multi-stakeholder detection
- **Differentiator:** Competitors (Snitcher, Factors, Clearbit) only do company-level ID. MidBound does person-level.
- **Traction:** 6 figures in under 5 months, $0 CAC, team of 3
- **Trial:** 14-day free trial, no CC required, midbound.ai/register
- **Target:** B2B SaaS, demand gen agencies, 1000+ US monthly visitors, $3K+ ACV
