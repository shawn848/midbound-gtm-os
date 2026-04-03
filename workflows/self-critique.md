# Content Self-Critique Loop

Run this after writing any content and before the slop filter. The self-critique checks for voice authenticity, substance, and structural quality.

## How to Run

Tell Claude Code:
```
Run self-critique on content/blog/eli/your-website-is-a-party.md
```

Or batch:
```
Run self-critique on all new content in content/blog/
```

## The Process

### Step 1: Load Context
1. Read the content file
2. Read the author's voice DNA (`skills/tier-1-voice-dna/{author}-voice.md`)
3. Read `skills/tier-3-content-ops/substance-requirements.md`
4. Read the relevant pillar template from `skills/tier-3-content-ops/pillars/{pillar}.md`

### Step 2: Voice Authenticity Check

Read the content as if you've never seen it before. For each paragraph, ask:

**For Sebastian content:**
- Does this sound confrontational enough? Sebastian doesn't hedge.
- Is the paragraph too long? Sebastian writes 1-2 sentences max per block.
- Would Sebastian actually say this, or does it sound like a marketing team wrote it?
- Are there enough single-line punches between the longer blocks?
- Does it use "you" aggressively enough?

**For Eli content:**
- Is there a sustained analogy? Eli doesn't abandon analogies halfway.
- Does the structure flow: setup, build, payoff?
- Is there revenue math or concrete numbers?
- Does it handle nuance? Eli acknowledges complexity before making his point.
- Would a CEO write this, or does it sound like a content marketer?

**Output format:**
```
### Voice Authenticity: {STRONG / ADEQUATE / WEAK}

Paragraph-by-paragraph assessment:
- P1: [Strong] Hooks immediately. This is {author}'s actual energy.
- P2: [Weak] This paragraph reads generic. {Author} would say it like: "..."
- P3: [Strong] Good use of specific numbers.
...

Overall: {assessment}
Suggested rewrites for weak paragraphs: {specific rewrites in the author's voice}
```

### Step 3: Substance Check

From `substance-requirements.md`, every substantive claim needs at least 2 of:
- Specific example with concrete details (numbers, tools, timeframes)
- Technical implementation or product specifics
- Reasoning shown (not just conclusions)
- Consequences or results (what happened?)
- Gotchas or lessons learned

**Scan each claim in the post:**
```
### Substance Check: {PASS / NEEDS WORK}

Claims found: {count}
Claims with 2+ substance signals: {count}
Claims that are sugar-rush (generic, no specifics): {count}

Sugar-rush claims to fix:
- "{quote from the post}" -- needs: specific example OR numbers OR result
...
```

### Step 4: Structure Check

**For blog posts:**
- [ ] Title is specific, not generic
- [ ] Opening hook grabs in first 2 lines (no preamble)
- [ ] Has clear sections/progression (not a wall of text)
- [ ] 800-1500 words (check word count)
- [ ] Ends strong (command for Sebastian, "Prove me wrong" energy for Eli)
- [ ] No repetitive section structures (same pattern used 3+ times)
- [ ] Internal product mentions feel natural, not forced

**For LinkedIn variants:**
- [ ] Under 1500 characters
- [ ] First line is a scroll-stopper
- [ ] Short paragraphs with whitespace
- [ ] Not a summary of the blog post
- [ ] Standalone value without reading the blog

**For X threads:**
- [ ] Each tweet under 280 characters
- [ ] Tweet 1 is the hook
- [ ] Each tweet stands alone
- [ ] Thread has progression (not just a list)
- [ ] 5 tweets total

**For Reddit posts:**
- [ ] No promotional language
- [ ] Adds genuine value
- [ ] MidBound mentioned at most once, naturally
- [ ] Would survive community scrutiny

### Step 5: Produce Final Report

```
## Self-Critique Report: {filename}

**Author:** {author}
**Pillar:** {pillar}
**Word count:** {count}

### Voice: {STRONG / ADEQUATE / WEAK}
{summary + specific paragraph rewrites if needed}

### Substance: {PASS / NEEDS WORK}
{summary + sugar-rush claims to fix}

### Structure: {PASS / NEEDS WORK}
{checklist results}

### Overall Verdict: {PUBLISH READY / REVISE / REWRITE}
{If REVISE: list specific fixes. If REWRITE: explain why.}
```

### Step 6: Apply Fixes

If REVISE: Make the specific edits listed in the report. Then run the slop filter.
If REWRITE: Start over with voice DNA loaded fresh. Then run self-critique again.
If PUBLISH READY: Proceed to slop filter as final gate.

## Full Quality Pipeline

The complete content quality pipeline is:

1. Write content (load voice DNA + knowledge base first)
2. **Self-critique loop** (this workflow)
3. **Slop filter check** (`workflows/slop-filter-check.md`)
4. **Pre-publish checklist** (`skills/tier-3-content-ops/pre-publish-checklist.md`)
5. Publish / commit
