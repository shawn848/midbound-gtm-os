# AI Slop Filter Check

Run this workflow on any content file or batch of files before publishing. It systematically checks against the anti-slop patterns in `skills/tier-1-voice-dna/anti-slop.md`.

## How to Run

Tell Claude Code:
```
Run the slop filter on content/blog/sebastian/company-level-id-is-dead.md
```

Or batch:
```
Run the slop filter on all files in content/blog/
```

## The Process

### Step 1: Load Anti-Slop Patterns
Read `skills/tier-1-voice-dna/anti-slop.md` in full. Load all 15 critical patterns and 4 context-dependent patterns.

### Step 2: Load the Author's Voice DNA
Based on the `author` field in frontmatter:
- Sebastian: read `skills/tier-1-voice-dna/sebastian-voice.md`
- Eli: read `skills/tier-1-voice-dna/eli-voice.md`

This matters because some patterns are natural for one founder but slop for the other.

### Step 3: Scan Each File

For each content file, check for:

**Critical patterns (auto-flag):**
1. Em-dashes (search for the literal character)
2. Authority signaling phrases (search for exact phrases from the list)
3. Narrator setup lines
4. Dramatic rhetorical framing
5. Three parallel dramatic sentences (same structure repeated 3x)
6. Bookend summaries (compare opening thesis to closing paragraph)
7. Self-branded concepts ("This is what I call...")
8. Artificial drama ("The shift sounds simple. It's not.")
9. Colon-listed everything (exception: Eli's "Here's the math:")
10. Humble brag disclaimers
11. Hype words (game changer, unleash, supercharge, next-level, revolutionary, paradigm shift, disruptive)
12. "No fluff" disclaimers
13. Transition padding (with that being said, that said, now let's talk about)
14. Generic value propositions (save time and money, scale your business)
15. Engagement bait closers (what do you think? drop your thoughts below)

**Context-dependent (flag for review, not auto-fail):**
16. "You" + accusation (OK for Sebastian, check if it's his voice)
17. Bullet lists for arguments (OK for features/comparisons, not for reasoning)
18. Bold for emphasis (OK in blog, not in social)
19. Generic rhetorical questions (OK if specific, not if "Ever wonder why...")

### Step 4: Score and Report

Output a report for each file:

```
## Slop Filter Report: {filename}

**Author:** {author}
**Critical flags:** {count}
**Context flags:** {count}
**Verdict:** PASS / REVIEW / REWRITE

### Critical Flags
- Line {n}: Em-dash found: "word -- word"
- Line {n}: Authority signaling: "Let me be clear"
...

### Context Flags (manual review)
- Line {n}: "You" + accusation. Check: is this Sebastian's natural voice?
...

### Recommendation
{PASS: 0 critical flags}
{REVIEW: 1-2 critical flags, fix specific lines}
{REWRITE: 3+ critical flags, rewrite from scratch per anti-slop rules}
```

### Step 5: Fix or Rewrite

If REVIEW: Fix the flagged lines. Re-run the check.
If REWRITE: Do NOT patch. Rewrite the entire piece from scratch, loading voice DNA fresh.

## Batch Mode

When running on a directory, output a summary table:

```
| File | Author | Critical | Context | Verdict |
|------|--------|----------|---------|---------|
| company-level-id-is-dead.md | sebastian | 0 | 1 | PASS |
| your-website-is-a-party.md | eli | 2 | 0 | REVIEW |
...
```

Then show details only for files that need REVIEW or REWRITE.
