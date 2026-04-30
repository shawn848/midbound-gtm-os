# Content Calendar

> Single active source of truth for what's being posted, where, and when. Updated when an arc is added, retired, or rescheduled.

---

## Active arcs

### Eli — Reddit Arc 1 (2026 Q2)

**6-week r/Midbound essay arc.** Tue + Thu, 8–10am ET. Full drafts and ground rules at [`content/reddit/eli-arc-1-2026-Q2/INDEX.md`](../content/reddit/eli-arc-1-2026-Q2/INDEX.md).

**Ground rules (apply to every post):**
1. Disclosure on every post — first line or bio
2. No external links in post body (comments or bio only)
3. 90/10 comment cadence on r/GTMbuilders, r/sales, r/SaaS, r/marketing between posts
4. Pin a "what are you building this week" Monday thread
5. Cap at 2 posts/week — daily reads as desperate

| Wk | Day | # | Title | Cross-post | Status |
|---|---|---|---|---|---|
| 1 | Tue | 1 | why we called it midbound | r/GTMbuilders | drafted |
| 1 | Thu | 2 | pure intent, defined | r/SaaS, r/sales | drafted |
| 2 | Tue | 3 | deterministic vs probabilistic (the match rate lie) | r/GTMbuilders, r/sales | drafted |
| 2 | Thu | 4 | we filter bot traffic before it hits the counter | own sub only | drafted |
| 3 | Tue | 5 | heyreach ran us on their own site for 3 months | r/GTMbuilders, r/sales | drafted |
| 3 | Thu | 6 | the improvado cross-reference (anonymized) | r/SaaS, r/startups | drafted |
| 4 | Tue | 7 | this isn't the right tool for everyone | r/GTMbuilders | drafted |
| 4 | Thu | 8 | what happens after identification | r/sales, r/SaaS | drafted |
| 5 | Tue | 9 | we built the wrong thing first | r/startups, r/SaaS | drafted |
| 5 | Thu | 10 | what we don't have yet | r/startups | drafted |
| 6 | Tue | 11 | pure intent consolidates into the CRM | r/SaaS, r/GTMbuilders | drafted |
| 6 | Thu | 12 | where midbound goes next | r/GTMbuilders | drafted |

**Repurposing:** every Reddit post can become a blog (long-form) + LinkedIn (short-form) + X (thread). The pipeline is documented at [`workflows/reddit-to-blog.md`](../workflows/reddit-to-blog.md). Reddit body stays clean (no in-body links); the blog post is where backlinks live.

### Sebastian — Arc 1

**Status:** TBD. Sebastian's first formal arc is unwritten. When ready, mirror Eli's structure: drafts in `content/reddit/sebastian-arc-1-YYYY-QN/` with an INDEX, then add a row block here.

---

## How content flows through the engine

```
   pick a Reddit post                  pick a blog idea
        │                                    │
        ▼                                    ▼
   write Reddit (Eli)                   write blog post
        │                                    │
        ├─ post to r/Midbound + cross-post   ├─ ship to content/blog/{author}/
        │                                    │   (basePath /blog → midbound.ai/blog)
        ▼                                    │
   repurpose                                 ▼
        │                              derive social
        ├─ blog (long-form)                  │
        ├─ LinkedIn (short-form)             ├─ LinkedIn
        └─ X (thread)                        ├─ X thread
                                             └─ Reddit (separate angle, not a copy)
```

The backbone today is Reddit → blog → LinkedIn/X (Eli's arc). Blog-first → social is still supported (the older flow at [`workflows/content-creation.md`](../workflows/content-creation.md)) — use whichever direction matches the source material.

---

## Already-shipped (reference, not scheduled)

These were authored on the previous calendar and are live or staged on midbound.ai/blog:

- Eli — `abm-without-person-level-data-is-blind`, `your-website-is-a-party`, `person-based-marketing`, `sales-is-diagnosis-not-control`, `go-vertical-win-deeply`, `repeat-visitors-buying-signals`, `how-visitor-analytics-actually-work`, `page-level-visitor-intelligence`, `visitor-intelligence-database-crm`, `best-visitor-identification-tools-2026`, `deterministic-vs-probabilistic-visitor-data`
- Sebastian — `company-level-id-is-dead`, `how-we-built-midbound-from-zero`, `stop-boxing-your-icp`, `person-level-intent-abm-upgrade`, `what-success-actually-means`

To find current state of any post: `ls ~/midbound/blog/content/blog/{eli,sebastian}/` and check the `draft:` field in frontmatter (`draft: true` = staged, not yet live).

---

## When to update this file

- New arc starts → add a section, link the INDEX
- Arc post publishes → tick `status` in this table and in the arc's INDEX (and update `blog_repurposed`/`linkedin_repurposed`/`x_repurposed` in the post's frontmatter when derivatives ship)
- Arc retires → move its block to the bottom under an "Archived arcs" header and date the retirement
