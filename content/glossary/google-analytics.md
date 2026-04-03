---
title: "Google Analytics 4 (GA4)"
slug: "google-analytics"
category: "analytics-tools"
short_description: "Google's web analytics platform that tracks website traffic, user behavior, and conversion events using an event-based data model."
seo_title: "What is Google Analytics 4 (GA4)? | MidBound Glossary"
seo_description: "Learn what Google Analytics 4 is, how its event-based model works, and how B2B teams use GA4 alongside visitor identification tools for complete funnel visibility."
keywords: ["Google Analytics 4", "GA4", "web analytics", "event tracking", "website traffic", "conversion tracking"]
related_terms: ["google-search-console", "utm-parameters", "website-visitor-tracking", "hotjar"]
---

Google Analytics 4 (GA4) is Google's web analytics platform that tracks website traffic, user behavior, and conversion events using an event-based data model -- replacing the previous session-based Universal Analytics.

## How It Works

GA4 collects data through a JavaScript tracking snippet installed on your website. Every user interaction is captured as an event -- page views, clicks, form submissions, scroll depth, video plays, and custom events you define.

Key concepts in GA4:

**Event-based model.** Unlike Universal Analytics (which organized data around sessions and pageviews), GA4 treats everything as an event. This gives more flexibility in what you track but requires more intentional configuration.

**Users and sessions.** GA4 tracks users across sessions and devices (when logged in) and provides metrics like engaged sessions, engagement rate, and average engagement time -- replacing the old bounce rate metric.

**Conversions.** Any event can be marked as a conversion (e.g., form submission, demo request, pricing page visit). GA4 uses data-driven attribution to distribute conversion credit across touchpoints.

**Explorations.** GA4's analysis hub lets you build custom reports -- funnel analysis, path analysis, segment overlaps -- that go beyond the standard reports.

**BigQuery integration.** GA4 offers free BigQuery export, giving teams access to raw, hit-level data for advanced analysis.

## Why It Matters for B2B Teams

GA4 tells B2B teams what is happening on their website: which pages get traffic, where visitors drop off, which channels drive conversions, and how users navigate through the site. It is the foundation of web analytics for most B2B companies.

However, GA4 has a fundamental limitation for B2B: it tracks anonymous sessions, not identified people. It can tell you that 500 people visited your pricing page. It cannot tell you who they were.

## How It Relates to MidBound

GA4 and MidBound serve complementary roles. GA4 provides aggregate behavioral analytics -- traffic volumes, conversion rates, channel performance. MidBound provides individual identity resolution -- who specifically visited, their name, title, company, and contact information. Together, they give B2B teams both the macro view (GA4) and the micro view (MidBound) of their website traffic.
