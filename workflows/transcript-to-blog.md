# Transcript to Blog Workflow -- Phase 2 Skeleton

> This workflow will be fully built in Phase 2. Below is the planned approach.

## Concept

Sebastian and Eli talk about MidBound, the market, and their journey on sales calls, podcast appearances, and internal discussions. These conversations contain raw material for blog posts. This workflow turns recorded conversations into published content.

## Planned Pipeline

### Step 1: Transcription
- Source: Call recordings (Gong, Loom, Zoom), podcast recordings, internal discussions
- Tool: Transcription service (TBD -- options: Otter.ai, Rev, Whisper)
- Output: Raw text transcript with speaker labels

### Step 2: Extract Key Insights
- Read the transcript
- Identify 3-5 key insights, stories, or arguments worth writing about
- Tag each insight with:
  - Which founder said it
  - Which content pillar it maps to
  - How strong the insight is (standalone blog post vs. supporting detail)

### Step 3: Map to Content Pillar
- Match each extracted insight to a content pillar:
  - Contrarian takes (strong opinion, industry challenge)
  - Origin stories (personal narrative, founding journey)
  - Product education (how MidBound works, feature explanation)
  - ABM evolution (industry thesis, ABM to PBM)
  - Founder lessons (personal growth, startup learnings)

### Step 4: Draft the Blog Post
- Load the founder's voice DNA
- Use the extracted insight as the core thesis
- Fill in structure from the blog playbook:
  - Hook (derived from the strongest quote or claim)
  - Problem (context from the conversation)
  - Insight (the key argument or story)
  - Solution (how it connects to MidBound)
  - Evidence (numbers or examples from the conversation)
  - Close + CTA
- Maintain the founder's voice throughout. The transcript provides the raw ideas. The blog should sound like the founder wrote it, not like a transcript was formatted.

### Step 5: Quality Check
- Run anti-slop check
- Run substance requirements check
- Run pre-publish checklist
- Verify all product claims against `knowledge/` files
- Flag anything that might be confidential (customer names, pricing discussions, unreleased features)

### Step 6: Founder Review
- Present the draft to the founder for tone and accuracy check
- Incorporate feedback
- Publish through the standard content creation workflow (blog -> LinkedIn -> X -> Reddit)

## Transcript Quality Notes

- Speaker labels are critical. Without them, it's hard to attribute insights to the right founder.
- Conversation flow is not blog flow. The transcript provides ideas, not structure.
- Direct quotes can be used if they're strong, but most of the blog will be rewritten in the founder's voice.
- Confidential content (customer names, pricing discussions, deal terms) must be stripped before the blog draft.

## Dependencies
- Access to call recordings or podcast audio
- Transcription tool selected and configured
- Founder available for review within 24-48 hours of draft

## Status
Phase 2. Not yet implemented. Content creation workflow (Phase 1) should be running consistently before adding this input source.
