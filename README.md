# MidBound GTM Content Engine

A content operations system for MidBound's go-to-market. Built for Sebastian Obadia and Eli Freedman to produce high-quality, on-voice content using Claude Code.

## What This Repo Does

This repo gives Claude the context it needs to write content that sounds like Sebastian and Eli -- not like a generic AI. It contains:

- **Voice DNA profiles** for each founder (how they write, what they avoid, their natural patterns)
- **Product knowledge** so Claude never makes things up about MidBound
- **Content playbooks** for LinkedIn, X, Reddit, and blog
- **Content pillars** that define the 5 types of posts you publish
- **A pre-publish checklist** to catch AI-sounding language before it goes live
- **A live cross-platform calendar** plus the active 6-week r/Midbound arc (Eli)
- **A reddit-to-blog workflow** for repurposing Reddit drafts into long-form blog posts + LinkedIn + X
- **The live Next.js blog** (`website/`) that renders `content/blog/{eli,sebastian}/` to midbound.ai/blog
- **GTM-OS skeleton** for demand gen, messaging, and engine integration (Phase 2)

## Repo Map

```
knowledge/              Product truth -- Claude reads these for context
  what-is-midbound.md
  how-deanonymization-works.md
  person-vs-company-level.md
  competitor-landscape.md
  integrations.md
  use-cases.md

skills/
  tier-1-voice-dna/     Voice profiles and guardrails
    sebastian-voice.md
    eli-voice.md
    anti-slop.md
    safety-filters.md
  tier-2-context-playbooks/   Platform-specific formatting
    linkedin.md
    x-twitter.md
    reddit.md
    blog.md
  tier-3-content-ops/   Content pillars, checklist, substance rules
    pillars/
      contrarian-takes.md
      origin-stories.md
      product-education.md
      abm-evolution.md
      founder-lessons.md
    pre-publish-checklist.md
    substance-requirements.md

calendar/
  content-calendar.md   5-week rollout schedule

gtm-os/                 GTM operations skeleton
  demand/               ICP, positioning, competitors, signals, objections
  messaging/            Messaging angles
  engine/               HubSpot, Slack, Clay integration notes

content/                Authored content, by surface
  reddit/<arc>/         Reddit arcs (e.g., eli-arc-1-2026-Q2/) — see INDEX.md inside
  blog/{eli,sebastian}/ Blog posts that the Next.js site renders
  linkedin/, x/         Per-platform derivatives
  archive/, _deprecated/ Older material kept for reference

workflows/              Content production pipelines
  content-creation.md   blog → social
  reddit-to-blog.md     reddit → blog → social (active daily flow)
  self-critique.md
  slop-filter-check.md
  transcript-to-blog.md (Phase 2)

website/                The Next.js site that renders midbound.ai/blog

CLAUDE.md               AI operating instructions (Claude reads this first)
ROADMAP.md              Three-phase plan
```

## Quick Start

### 1. Open This Repo in Claude Code

```bash
cd midbound
claude
```

Claude will automatically read `CLAUDE.md` and know how to behave.

### 2. Generate Content

Ask Claude to write a post. Examples:

- "Write a LinkedIn post for Sebastian about why company-level ID is dead"
- "Draft a blog post for Eli about the ABM to PBM evolution"
- "Create an X thread for Sebastian about the founding story"

Claude will:
1. Load the founder's voice DNA
2. Load product knowledge
3. Write in the founder's natural style
4. Run the anti-slop check
5. Follow the pre-publish checklist

### 3. Review Before Publishing

Claude will flag anything that sounds AI-generated. You make the final call on tone and substance. The system catches the obvious stuff -- you handle the nuance.

### 4. Follow the Calendar

Open `calendar/content-calendar.md` for the active arcs and ground rules. The current backbone is Eli's 6-week r/Midbound arc — drafts and schedule at `content/reddit/eli-arc-1-2026-Q2/INDEX.md`.

### 5. Repurpose a Reddit post into a blog post

Once a Reddit post is drafted (or live), follow `workflows/reddit-to-blog.md` to turn it into a long-form blog post + LinkedIn + X derivatives. The exact prompt template is in that file.

## How It Works (For Non-Technical Founders)

Think of this repo as Claude's instruction manual for writing as you. When you open Claude Code in this folder, it reads the instructions automatically. You talk to Claude like a writing partner, and it produces content that matches your voice -- not generic AI output.

The files in this repo are plain Markdown (just text with formatting). You can read and edit any of them. If your voice evolves or you want to adjust the tone, edit the voice DNA files and Claude adapts immediately.

### Two directions content flows

- **Blog → social** (`workflows/content-creation.md`) — write a blog post, then derive LinkedIn, X, and Reddit versions.
- **Reddit → blog** (`workflows/reddit-to-blog.md`) — start with a Reddit draft (or a live thread you want to amplify), then turn it into a long-form blog post + LinkedIn + X. This is the active daily flow for Eli's r/Midbound arc.

Both directions use the same voice DNA, knowledge base, and quality gates.

## Phases

- **Phase 1 (Now):** Content Engine -- voice DNA, knowledge base, content ops, calendar
- **Phase 2 (Next):** Lead Gen Pipeline -- HubSpot, Clay, Slack integration, automated sequences
- **Phase 3 (Later):** Full GTM Automation -- signal-based routing, multi-channel orchestration

See `ROADMAP.md` for the full plan.

## Built By

Shawn Tenam (GTM Advisor) for Sebastian Obadia and Eli Freedman at MidBound.
