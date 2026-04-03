# MidBound Hermes Agent

Agentic communication layer for MidBound's GTM operations. Powered by [Hermes Agent](https://github.com/hermes-agent).

## Architecture

Hermes runs as a Discord bot inside MidBound's workspace. It has read access to the full knowledge base, glossary, blog content, and GTM-OS configuration. Team members interact with it via Discord channels to:

- Surface product knowledge instantly ("What's our positioning vs 6sense?")
- Check content calendar and pipeline status
- Draft content following the voice DNA system
- Get competitive intelligence summaries
- Trigger content creation workflows

## Discord Channels

| Channel | Purpose |
|---------|---------|
| `#gtm-updates` | Content pipeline status, new posts published, calendar reminders |
| `#visitor-alerts` | High-ICP visitor notifications (via MidBound webhook integration) |
| `#content-pipeline` | Draft reviews, voice DNA checks, publish approvals |
| `#ask-hermes` | General questions about MidBound product, positioning, competitors |

## Knowledge Sources

The agent loads context from:

- `knowledge/` -- Product facts, competitor data, technical docs
- `content/glossary/` -- 45+ defined terms for instant lookups
- `content/blog/` -- All published blog content
- `skills/tier-1-voice-dna/` -- Sebastian and Eli voice profiles
- `gtm-os/` -- ICP, positioning, messaging angles
- `calendar/content-calendar.md` -- Upcoming content schedule

## Voice Mapping

Hermes adapts its response style based on context:

- **Product questions** -- Uses Eli's analytical, structured voice
- **Competitive responses** -- Uses Sebastian's direct, aggressive voice
- **Educational content** -- Uses Eli's analogy-driven teaching voice
- **Quick answers** -- Neutral, concise, data-forward

## Client Deployment

Each MidBound client can deploy their own Hermes instance:

1. Client purchases Claude Code subscription (or provides API key)
2. Hermes config is forked with client-specific knowledge base
3. Client connects their Discord workspace
4. Agent has access to client's MidBound data and visitor alerts

This creates a scalable, agentic GTM layer that grows with each client deployment.

## Setup

See `config.yaml` for the full configuration. Requires:

- Discord bot token (from Discord Developer Portal)
- LLM provider (Claude Code subscription or Anthropic API key)
- Channel IDs for the target Discord server
