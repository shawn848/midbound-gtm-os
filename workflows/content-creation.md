# Content Creation Workflow

## Overview

The content pipeline flows from blog to LinkedIn to X to Reddit. The blog is the source of truth. Social content is derived from the blog, not written independently.

## Step-by-Step Pipeline

### Step 1: Check the Calendar

Open `calendar/content-calendar.md` and identify:
- Which founder is writing today
- Which content pillar is assigned
- Which platform(s) are due

### Step 2: Load Context

Before writing anything, load these files:
1. The founder's voice DNA (`skills/tier-1-voice-dna/sebastian-voice.md` or `eli-voice.md`)
2. The anti-slop patterns (`skills/tier-1-voice-dna/anti-slop.md`)
3. The relevant content pillar (`skills/tier-3-content-ops/pillars/`)
4. The relevant knowledge base files (`knowledge/`)
5. The platform playbook (`skills/tier-2-context-playbooks/`)

### Step 3: Write the Blog Post

The blog post is always written first.

1. Open the blog playbook (`skills/tier-2-context-playbooks/blog.md`)
2. Write the blog post following the structure: hook, problem, insight, solution, evidence, close, CTA
3. Include frontmatter (title, slug, author, date, pillar, SEO fields, tags, status)
4. Target 800-1500 words
5. Run anti-slop check. If 3+ patterns flagged, rewrite from scratch.
6. Run substance check against `skills/tier-3-content-ops/substance-requirements.md`
7. Run pre-publish checklist (`skills/tier-3-content-ops/pre-publish-checklist.md`)

### Step 4: Derive LinkedIn Post

From the published blog post:

1. Open the LinkedIn playbook (`skills/tier-2-context-playbooks/linkedin.md`)
2. Extract the hook and core insight from the blog
3. Rewrite for LinkedIn format:
   - Sebastian: 600-1200 characters, punchy paragraphs, aggressive hook
   - Eli: 800-1800 characters, structured paragraphs, analogy or thesis hook
4. Add the founder's CTA style
5. Run anti-slop check
6. Run pre-publish checklist (LinkedIn section)

### Step 5: Derive X Thread

From the published blog post:

1. Open the X playbook (`skills/tier-2-context-playbooks/x-twitter.md`)
2. Identify the key points from the blog (4-7 points max)
3. Write one tweet per key point (each under 280 characters)
4. Ensure the first tweet stands alone as a hook
5. Separate tweets with `---` in the draft
6. Run anti-slop check
7. Run pre-publish checklist (X section)

### Step 6: Adapt for Reddit (Following Monday)

From the published blog post:

1. Open the Reddit playbook (`skills/tier-2-context-playbooks/reddit.md`)
2. Choose the target subreddit
3. Rewrite the content for Reddit norms:
   - Lead with genuine value, not promotion
   - MidBound mentioned once, naturally
   - No MidBound link in the post body
   - Title is specific and non-clickbait
4. Run pre-publish checklist (Reddit section)

## Publishing Schedule

| Step | When | Platform |
|------|------|----------|
| Write blog | Day before or morning of | Blog |
| Post LinkedIn | Same day as blog | LinkedIn |
| Post X thread | Friday of the same week | X |
| Post Reddit | Following Monday | Reddit |

## Quality Gates

Content does not publish if any of these fail:
1. Anti-slop check (fewer than 3 patterns)
2. Substance requirements (2+ of 5 criteria per claim)
3. Safety filters (no competitor customer names, no compliance claims, no guaranteed results)
4. Voice match (sounds like the right founder)
5. Platform format (correct length, structure, formatting for the target platform)

## Output Locations

- Blog posts: TBD (website/blog directory once Phase 2 site is built)
- LinkedIn drafts: Copy to clipboard or paste into LinkedIn composer
- X drafts: Copy to clipboard or paste into X composer
- Reddit drafts: Copy to clipboard or paste into Reddit post editor

## Revision Process

If the founder requests changes after reviewing a draft:
1. Identify what needs to change (tone, substance, structure, specific claims)
2. Make targeted edits. Do not rewrite the entire piece unless the tone is fundamentally wrong.
3. Re-run anti-slop check on the revised sections
4. Re-run the pre-publish checklist
