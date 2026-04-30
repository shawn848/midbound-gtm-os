# Eli Arc 1 — r/Midbound 6-Week Content Arc (2026 Q2)

**Author:** Eli (founder voice)
**Cadence:** 2 posts/week, Tue + Thu, 8–10am ET
**Voice:** lowercase-leaning, casual, a few intentional typos for authenticity. Disclosure upfront on every post.
**Status:** All 12 drafts saved. Publish dates TBD.

---

## Ground rules (apply to every post in the arc)

1. **Disclosure on every post.** First line or bio — "co-founder at midbound, writing in my own voice." Reddit will forgive almost anything except hidden affiliation.
2. **No external links in post body.** Put links in comments if someone asks, or in bio. External links in-body cut reach significantly, including on subreddits where you technically can include them.
3. **Comment daily on 3–4 external subs between posts** — r/GTMbuilders, r/sales, r/SaaS, r/marketing. 90/10 rule: 90% genuine help, 10% product mention. This is what keeps the sub's growth compounding between essay posts.
4. **Pin a "what are you building this week" thread every Monday.** Takes 10 seconds to post and gives the sub a pulse between essays.
5. **Don't post daily.** 2/week is sustainable. 3/week is risky. Daily posting on your own sub reads as desperate even when the content is good.

---

## Schedule

| Week | Day | Post # | Title | Angle / Goal | Cross-post |
|---|---|---|---|---|---|
| 1 | Tue | 1 | why we called it midbound | origin story + name as thesis. plant the flag. | r/GTMbuilders |
| 1 | Thu | 2 | pure intent, defined | introduce the category + the 3 tests. vocabulary. | r/SaaS, r/sales |
| 2 | Tue | 3 | deterministic vs probabilistic (the match rate lie) | strongest technical differentiation as industry call-out. | r/GTMbuilders, r/sales |
| 2 | Thu | 4 | we filter bot traffic before it hits the counter | companion piece to #3. transparency on billing practice. | none — own sub only |
| 3 | Tue | 5 | heyreach ran us on their own site for 3 months | customer proof. real numbers, real names. | r/GTMbuilders, r/sales |
| 3 | Thu | 6 | the improvado cross-reference (anonymized) | hidden pipeline story. $700k visible in hindsight. | r/SaaS, r/startups |
| 4 | Tue | 7 | this isn't the right tool for everyone | qualifying post. when to use us vs rb2b vs vector. | r/GTMbuilders |
| 4 | Thu | 8 | what happens after identification | the stack that works. we're input, not orchestration. | r/sales, r/SaaS |
| 5 | Tue | 9 | we built the wrong thing first | pivot story. AI SDR → person-level ID. | r/startups, r/SaaS |
| 5 | Thu | 10 | what we don't have yet | radical transparency. the gaps list. | r/startups |
| 6 | Tue | 11 | pure intent consolidates into the CRM | strategic thesis. CPQ/MA/CDP pattern. | r/SaaS, r/GTMbuilders |
| 6 | Thu | 12 | where midbound goes next | roadmap + invitation. arc close. | r/GTMbuilders |

> Cross-post column is advisory — skip any cross-post that feels off for a given week. The arc works without them; they just extend reach.

---

## Drafts (one file per post)

| # | File | Status | Blog | LinkedIn | X |
|---|---|---|---|---|---|
| 1 | [w01-tue-01-why-we-called-it-midbound.md](w01-tue-01-why-we-called-it-midbound.md) | drafted | ☐ | ☐ | ☐ |
| 2 | [w01-thu-02-pure-intent-defined.md](w01-thu-02-pure-intent-defined.md) | drafted | ☐ | ☐ | ☐ |
| 3 | [w02-tue-03-deterministic-vs-probabilistic.md](w02-tue-03-deterministic-vs-probabilistic.md) | drafted | ☐ | ☐ | ☐ |
| 4 | [w02-thu-04-bot-traffic-filter.md](w02-thu-04-bot-traffic-filter.md) | drafted | ☐ | ☐ | ☐ |
| 5 | [w03-tue-05-heyreach-3-month-case-study.md](w03-tue-05-heyreach-3-month-case-study.md) | drafted | ☐ | ☐ | ☐ |
| 6 | [w03-thu-06-hidden-pipeline-story.md](w03-thu-06-hidden-pipeline-story.md) | drafted | ☐ | ☐ | ☐ |
| 7 | [w04-tue-07-not-the-right-tool-for-everyone.md](w04-tue-07-not-the-right-tool-for-everyone.md) | drafted | ☐ | ☐ | ☐ |
| 8 | [w04-thu-08-stack-after-identification.md](w04-thu-08-stack-after-identification.md) | drafted | ☐ | ☐ | ☐ |
| 9 | [w05-tue-09-we-built-the-wrong-thing-first.md](w05-tue-09-we-built-the-wrong-thing-first.md) | drafted | ☐ | ☐ | ☐ |
| 10 | [w05-thu-10-what-we-dont-have-yet.md](w05-thu-10-what-we-dont-have-yet.md) | drafted | ☐ | ☐ | ☐ |
| 11 | [w06-tue-11-pure-intent-consolidates-into-crm.md](w06-tue-11-pure-intent-consolidates-into-crm.md) | drafted | ☐ | ☐ | ☐ |
| 12 | [w06-thu-12-where-midbound-goes-next.md](w06-thu-12-where-midbound-goes-next.md) | drafted | ☐ | ☐ | ☐ |

When a post gets repurposed (blog / LinkedIn / X), tick the box and update `blog_repurposed`, `linkedin_repurposed`, or `x_repurposed` in that post's frontmatter. The Reddit-to-blog pipeline lives at [`workflows/reddit-to-blog.md`](../../../workflows/reddit-to-blog.md).

---

## How this arc relates to the rest of the engine

- **Voice DNA:** Each post is in Eli's voice. When repurposing, Claude must load `skills/tier-1-voice-dna/eli-voice.md` first.
- **Knowledge base:** Claims in these posts (HeyReach numbers, $700k pipeline story, August 2024 founding date, December 2025 v3 ship, etc.) should match `knowledge/` files. If a claim isn't in the knowledge base yet but is in this arc, the arc is the source of truth — extract it into a knowledge file when you encounter it.
- **Reddit playbook:** The arc-specific operating rules are appended to `skills/tier-2-context-playbooks/reddit.md`.
- **Calendar:** `calendar/content-calendar.md` is the cross-platform schedule; this arc is its current backbone.
