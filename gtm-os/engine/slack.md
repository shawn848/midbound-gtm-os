# Slack Integration -- Phase 2 Skeleton

> This file is a placeholder for Phase 2 (Lead Gen Pipeline). It will be fleshed out when we build the Slack notification layer.

## Current State

MidBound sends real-time notifications to Slack when identified visitors match criteria. Basic alerts are functional.

## Phase 2 Plan

### Channel Structure
- `#midbound-all`: All identified visitors (for monitoring volume and data quality)
- `#midbound-high-intent`: Tier 1 signals only (pricing page, multi-stakeholder, return visitors)
- `#midbound-target-accounts`: Visitors from named target account list
- `#midbound-weekly-digest`: Weekly summary of identified visitors, top accounts, trends

### Notification Format

```
New visitor identified

David Rodriguez
Director of Growth @ Microsoft
ICP Score: 9/10

Pages visited: /pricing, /integrations
Time on site: 4 min 32 sec
Session: First visit

Email: david.rodriguez@microsoft.com
LinkedIn: linkedin.com/in/davidrodriguez

[View in HubSpot] [View LinkedIn]
```

### Alert Rules
- **Tier 1 signal + ICP 8-10:** Post to `#midbound-high-intent` immediately
- **Target account match:** Post to `#midbound-target-accounts` immediately
- **Multi-stakeholder (2+ from same company in 7 days):** Post to `#midbound-high-intent` with "Multi-stakeholder alert" prefix
- **All other identified visitors:** Post to `#midbound-all`

### Weekly Digest Content
- Total visitors identified this week
- Top 10 visitors by ICP score
- Multi-stakeholder accounts detected
- Pages most visited by identified visitors
- Comparison to previous week

## Dependencies
- Slack workspace admin access for channel creation
- Slack webhook or bot token for posting
- MidBound Slack integration configured

## Notes
- Keep `#midbound-high-intent` low volume and high signal. If reps get too many alerts they'll mute the channel.
- Consider DM notifications to assigned reps for their specific target accounts
- Test notification frequency before going live. Adjust ICP threshold if too noisy.
