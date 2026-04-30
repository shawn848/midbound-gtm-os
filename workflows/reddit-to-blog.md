# Reddit → Blog Workflow

> Take a Reddit post (drafted or already published) and turn it into a long-form blog post on midbound.ai/blog. Then derive LinkedIn + X from the blog. This is the **primary daily workflow** for the active Reddit arc.

The reverse direction — blog-first, then derive Reddit — is documented at [`content-creation.md`](content-creation.md). Use whichever direction matches the source material.

---

## When to use this workflow

You have a Reddit post that:

- **You already drafted** in `content/reddit/<arc>/` and want the long-form version on the blog before (or after) it goes live on Reddit, OR
- **Is already live on Reddit** and earning engagement worth amplifying with a deeper take on midbound.ai/blog, OR
- **Eli or Sebastian wrote in a comment thread** that should become a standalone blog post

The Reddit post is the **source of truth for voice and claims.** Don't add numbers, customers, or product capabilities not in the Reddit version unless you've checked them against `knowledge/`.

---

## What Claude does (when you ask)

1. **Reads the Reddit post** at the path you give it
2. **Loads voice DNA** for the matching author (`skills/tier-1-voice-dna/{eli,sebastian}-voice.md`)
3. **Loads anti-slop + safety filters** (`skills/tier-1-voice-dna/anti-slop.md`, `safety-filters.md`)
4. **Loads relevant knowledge files** based on the Reddit post's claims (e.g., post #5 mentions HeyReach → load `knowledge/integrations.md` + the latest integrations snapshot)
5. **Loads the blog playbook** (`skills/tier-2-context-playbooks/blog.md`) for structure and frontmatter schema
6. **Picks a pillar** that matches the Reddit post's angle (contrarian-takes / origin-stories / product-education / abm-evolution / founder-lessons)
7. **Rewrites for blog format** — 800-1500 words, hook → problem → insight → solution → evidence → close → CTA, full SEO frontmatter
8. **Runs self-critique + slop-filter + pre-publish checklist**
9. **Saves to `content/blog/{author}/<slug>.md`** with `draft: true` so it doesn't go live until you flip it

---

## What you do

1. **Pick a Reddit post.** Open the arc's `INDEX.md` (e.g., `content/reddit/eli-arc-1-2026-Q2/INDEX.md`) and choose one.
2. **Tell Claude.** Use the prompt template below.
3. **Read the draft.** Does it sound like Eli (or Sebastian)? Does the structure work? Is anything fabricated?
4. **Iterate.** Tell Claude what to change in plain English ("the hook is too soft", "you added a number that isn't in the Reddit version", "tighten paragraph 4"). Repeat until it lands.
5. **Flip to live.** Change `draft: true` → `draft: false` in the frontmatter, commit, deploy.
6. **Tick the box** in the arc's INDEX (`blog_repurposed: true` in the post's frontmatter).
7. **Optionally derive LinkedIn + X** in the same session — see "Derivatives" below.

---

## The exact prompt to use

Open Claude Code in `~/midbound/blog/` (so it loads `CLAUDE.md` automatically), then:

```
Take the Reddit post at content/reddit/eli-arc-1-2026-Q2/w03-tue-05-heyreach-3-month-case-study.md
and turn it into a blog post for midbound.ai/blog.

- Author is Eli, voice = eli-voice.md
- Pillar = product-education (case study with numbers)
- Length: 1000-1500 words
- Keep every claim and number that's in the Reddit post; don't invent new ones
- Frontmatter: draft: true, slug = heyreach-3-month-case-study, full SEO fields
- Run self-critique + slop-filter + pre-publish checklist before showing me the draft
- Save to content/blog/eli/heyreach-3-month-case-study.md

When done, summarize what changed in tone vs the Reddit version and flag anything I should fact-check.
```

You can paste that verbatim. Adjust the file path, author, pillar, and slug per the post you're converting.

**Dictation tip:** ramble it through WhisperFlow/dictation — Claude understands "make a blog from the heyreach post in eli's reddit arc, save it as draft, run the checks." You don't have to be precise.

---

## Worked example: Eli post #5 (HeyReach)

Source: `content/reddit/eli-arc-1-2026-Q2/w03-tue-05-heyreach-3-month-case-study.md`

**Reddit version anchors (must survive into the blog):**
- HeyReach is named (integration partner — public consent via their own posting)
- 23% LinkedIn reply rate
- 14.5% email reply rate
- $12K ARR closed from one agency deal
- Cold-outbound benchmarks: 5–10% LI, 1–3% email
- Credit to Umer and Nadja
- Setup pattern: visitor lands → MidBound resolves to person → contact lands in HeyReach sequence within minutes

**What changes in the blog version:**

| Aspect | Reddit | Blog |
|---|---|---|
| Voice | lowercase, casual, "im eli" | still Eli — analogy-driven, structured paragraphs, "Here's the math:" transitions |
| Length | ~430 words | 1000-1500 words |
| Hook | "heyreach is one of the bigger linkedin sequencing platforms..." | Restructured — open with the 3–5x lift number or the "outbound wasn't cold, it was contextual" line |
| Structure | continuous prose | hook → problem (cold outbound is dying) → insight (timing × data quality) → solution (the integration mechanics) → evidence (the numbers) → close (the pattern is replicable) → CTA |
| CTA | "happy to walk through it in the comments" | "Start your 14-day free trial" linking midbound.ai/register |
| Frontmatter | arc metadata only | full SEO + pillar + tags |
| Backlinks | none in body (Reddit rule) | optional: link to the Reddit thread once it's live |

**Output path:** `content/blog/eli/heyreach-3-month-case-study.md`

After ship, the blog can be linked back from a Reddit comment when someone asks "where's the full breakdown?" — that's the safe way to drive traffic without violating the no-in-body-links rule.

---

## Backlinking discipline

| Surface | What you can link to | Where |
|---|---|---|
| Reddit post body | nothing external | — |
| Reddit comment (your reply) | midbound.ai/blog/<slug> if someone asks | only when invited |
| Reddit bio | midbound.ai | always |
| Blog post body | the Reddit thread, related blog posts, integration partner pages | natural links |
| LinkedIn / X | midbound.ai/blog/<slug> | always |

The blog is where backlinks live. Reddit is where the conversation happens.

---

## Derivatives (LinkedIn + X)

Once the blog is locked in, ask Claude:

```
Now derive a LinkedIn post for Eli from the blog post you just wrote.
Then a 5-7 tweet X thread.
Save LinkedIn to content/linkedin/eli/<slug>.md and X to content/x/eli/<slug>.md.
Each must follow eli-voice.md and the platform playbook in skills/tier-2-context-playbooks/.
```

Claude already knows the source — no need to re-explain. The derivatives stay in the same author folder so they're easy to track.

---

## When to NOT use this workflow

- The Reddit post is short / single-thought (< 200 words). Save it as a Reddit-only piece; not every post needs a long-form version.
- The Reddit post mentions a customer or claim that hasn't been verified against `knowledge/`. Stop and verify first.
- The Reddit post is in a comment thread that's still active. Wait for the conversation to settle — better material often emerges from replies.

---

## Quality gates (Claude runs all three; you read the output)

1. **Self-critique** — `workflows/self-critique.md`. Voice authenticity, substance, structure.
2. **Slop filter** — `workflows/slop-filter-check.md`. The 19 anti-slop patterns. If 3+ flagged, Claude rewrites; doesn't patch.
3. **Pre-publish checklist** — `skills/tier-3-content-ops/pre-publish-checklist.md`. Final gate before `draft: false`.

If any of these fail, the draft does not ship. You will see the failure flagged in Claude's response.

---

## File output convention

```
content/
├── reddit/
│   └── eli-arc-1-2026-Q2/
│       ├── INDEX.md
│       └── w03-tue-05-heyreach-3-month-case-study.md   ← source
├── blog/
│   └── eli/
│       └── heyreach-3-month-case-study.md              ← derived (this workflow)
├── linkedin/
│   └── eli/
│       └── heyreach-3-month-case-study.md              ← derived (Derivatives step)
└── x/
    └── eli/
        └── heyreach-3-month-case-study.md              ← derived (Derivatives step)
```

The slug stays consistent across all four files. That's how you trace a single idea through every surface.
