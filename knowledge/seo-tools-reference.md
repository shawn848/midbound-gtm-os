# SEO Tools Reference

## Overview

This is a reference guide for the SEO, AEO, and GEO tools relevant to MidBound's audience. These are the tools B2B marketers and demand gen teams use to measure, optimize, and report on web traffic. Understanding them is critical for writing content that resonates.

The key framing: most of these tools tell you WHAT happened on your site. MidBound tells you WHO did it.

---

## Google Analytics 4 (GA4)

### What It Is
Google's web analytics platform. The successor to Universal Analytics. Free for most use cases. The default analytics tool for virtually every website.

### What It Measures
- Page views, sessions, and users
- Traffic sources (organic, paid, referral, social, direct)
- User behavior (pages per session, session duration, bounce rate)
- Conversion events (form fills, button clicks, sign-ups)
- Audience demographics (age, location, device, interests)
- E-commerce tracking (revenue, transactions, product performance)

### How It Works
A JavaScript snippet (gtag.js) on the website sends event data to Google's servers. GA4 uses an event-based model (every interaction is an event) rather than the session-based model of Universal Analytics.

### What It Shows About Anonymous Traffic
GA4 provides aggregate behavioral data. It can tell you:
- 500 people visited your pricing page today
- 60% came from Google Ads
- Average session duration was 2 minutes 15 seconds
- 3% converted to a form fill

### What It Misses
GA4 does not tell you WHO those 500 people were. It provides anonymous, aggregate data. The 97% who did not convert are invisible at the individual level. You know what happened. You do not know who did it.

### MidBound Connection
"GA4 tells you what happened on your site. MidBound tells you who did it."

GA4 and MidBound are complementary. GA4 provides the behavioral analytics layer. MidBound provides the identity layer. Together, they give you both the what and the who.

---

## Google Search Console

### What It Is
Google's free tool for monitoring how your site appears in Google Search. Shows search performance data, indexing status, and technical health.

### Key Capabilities
- **Search performance:** Queries, clicks, impressions, average position, CTR for every keyword your site ranks for
- **AI Overview tracking:** Limited data on when your content appears in Google AI Overviews
- **Index coverage:** Which pages are indexed, which are excluded, and why
- **Core Web Vitals:** Page speed and performance metrics from real users
- **Manual actions:** Notifications if Google penalizes your site
- **Crawl stats:** How frequently Googlebot crawls your pages

### Why It Matters for MidBound Content
- Track which "website visitor identification" queries the blog ranks for
- Monitor position changes for competitive keywords
- Identify which pages are appearing in AI Overviews
- Ensure all blog posts are properly indexed
- Diagnose crawl issues that could hurt AEO performance

### AEO-Specific Use
Search Console is beginning to show data on AI Overview appearances. This is currently limited but growing. Monitoring which queries trigger AI Overviews and whether MidBound content is cited is a key AEO metric.

---

## SEMrush

### What It Is
An all-in-one SEO and digital marketing platform. Used for keyword research, competitive analysis, site audits, backlink analysis, and content optimization. Paid tool, widely used by B2B marketing teams.

### Key Capabilities
- **Keyword research:** Search volume, keyword difficulty, CPC data, question-based queries, related keywords
- **Competitive analysis:** Which keywords competitors rank for, their traffic estimates, their top pages, content gaps
- **Site audit:** Technical SEO issues (broken links, missing meta tags, crawl errors, duplicate content, page speed)
- **Position tracking:** Daily rank monitoring for target keywords across devices and locations
- **Content optimization:** SEO Writing Assistant with real-time recommendations
- **Backlink analysis:** Referring domains, link quality, anchor text distribution

### AEO/GEO Capabilities
SEMrush is expanding into AEO/GEO tracking:
- SERP feature tracking (which queries trigger AI Overviews, featured snippets, FAQ boxes)
- Question-based keyword discovery (finding the queries people ask AI systems)
- Content gap analysis focused on AI citation opportunities

### Why It Matters for MidBound Content
- Identify high-value keywords in the "website visitor identification" space
- Track competitive positioning against Snitcher, RB2B, Factors, etc.
- Find question-based queries to target with AEO-optimized content
- Monitor site health and technical SEO

---

## Ahrefs

### What It Is
An SEO toolset focused on backlink analysis, keyword research, content research, and rank tracking. Known for having the largest backlink index. Paid tool, similar market position to SEMrush.

### Key Capabilities
- **Site Explorer:** Full backlink profile, organic keywords, traffic estimates for any domain
- **Keywords Explorer:** Search volume, keyword difficulty, click data, parent topics, SERP analysis
- **Content Explorer:** Find top-performing content by topic (most shared, most linked)
- **Rank Tracker:** Daily position monitoring with SERP feature tracking
- **Site Audit:** Technical SEO crawler

### AEO/GEO-Specific Features
- **Brand Radar:** Monitors when your brand is mentioned in AI-generated answers across platforms. This is the most direct AEO measurement tool currently available.
- **AI citation tracking:** Emerging capability to track which content gets cited by AI systems
- **SERP analysis:** Shows which queries trigger AI Overviews and what sources are cited

### Why It Matters for MidBound Content
- Track backlink growth to the blog (authority building for AEO)
- Monitor brand mentions in AI-generated answers via Brand Radar
- Research competitor content strategies in the visitor identification space
- Identify content opportunities where competitors are cited and MidBound is not

---

## Google Tag Manager (GTM)

### What It Is
A tag management system that lets you deploy and manage tracking scripts (tags) on your website without modifying code directly. Free tool.

### Key Capabilities
- **Tag deployment:** Install GA4, Facebook Pixel, LinkedIn Insight Tag, and other tracking scripts through a single interface
- **Event tracking:** Configure custom events (button clicks, form submissions, scroll depth, video plays) without developer involvement
- **Conversion tracking:** Set up and manage conversion events for ad platforms
- **Trigger management:** Define when tags fire (page load, click, scroll, timer, custom event)
- **Variable management:** Capture and pass data between tags (UTM parameters, page URL, element attributes)

### Why It Matters for MidBound Content
- GTM is how most companies deploy MidBound's tracking script
- Understanding GTM helps write content about setup and implementation
- Event tracking via GTM captures the behavioral data that complements MidBound's identity data
- UTM parameter capture through GTM connects ad campaigns to MidBound-identified visitors

---

## HubSpot CRM

### What It Is
A CRM platform used by sales, marketing, and customer success teams. Offers free CRM with paid marketing, sales, and service hubs. One of the most popular CRMs for SMB and mid-market B2B companies.

### Key Capabilities
- **Contact management:** Store and organize contacts with properties, lifecycle stages, and activity timelines
- **Pipeline tracking:** Visual deal pipeline with stages, amounts, and close dates
- **Email tracking:** Open, click, and reply tracking on sales emails
- **Marketing automation:** Workflows triggered by contact properties, behaviors, or events
- **Reporting:** Dashboards for pipeline, marketing performance, and sales activity
- **Forms and landing pages:** Lead capture integrated with the CRM

### MidBound Integration
MidBound integrates directly with HubSpot:
- **Contact creation:** When MidBound identifies a visitor, a new contact is created in HubSpot with name, title, company, email, LinkedIn profile, and visit data
- **Contact updates:** Returning visitors update the existing contact record with new visit data
- **Custom properties:** MidBound-specific fields (ICP score, identification source, visit count, last page visited)
- **Workflow triggers:** MidBound data can trigger HubSpot workflows (e.g., enroll in a sequence when ICP score > 8 and pricing page visited)
- **No duplicate contacts:** MidBound checks for existing records before creating new ones

### Why It Matters for MidBound Content
- HubSpot is the CRM MidBound integrates with most directly
- Most of MidBound's target audience uses HubSpot
- Content about HubSpot + MidBound workflows resonates with the target buyer
- Understanding HubSpot's limitations (no anonymous visitor identification) highlights MidBound's value

---

## Hotjar / FullStory

### What They Are
Session recording and heatmap tools. They show you how visitors interact with your website -- where they click, how far they scroll, where they get stuck.

### Hotjar Key Capabilities
- **Session recordings:** Video playback of individual user sessions
- **Heatmaps:** Click maps, scroll maps, and move maps showing aggregate behavior
- **Surveys:** On-site polls and feedback widgets
- **Funnels:** Conversion funnel analysis showing drop-off points

### FullStory Key Capabilities
- **Session replay:** High-fidelity recordings of user sessions
- **Frustration signals:** Automatic detection of rage clicks, dead clicks, error clicks
- **Product analytics:** Funnels, journeys, and retention analysis
- **Search:** Find sessions by user behavior, page, or event

### What They Miss
Both tools show you what visitors do on your site. Neither tells you who those visitors are. You can watch a recording of someone spending 5 minutes on your pricing page, but you do not know their name, title, company, or how to reach them.

### MidBound Connection
"Hotjar shows you the behavior. MidBound shows you the person behind it."

Hotjar/FullStory and MidBound are complementary. With both, you can see that David Rodriguez from Microsoft spent 3 minutes on your pricing page AND watch the session recording of exactly how he interacted with it.

---

## Core Web Vitals Tools

### What They Measure
Core Web Vitals are Google's page experience metrics that affect search rankings and AI crawl priority:
- **LCP (Largest Contentful Paint):** How fast the main content loads. Target: < 2.5 seconds.
- **FID (First Input Delay) / INP (Interaction to Next Paint):** How quickly the page responds to user input. Target: < 100ms (FID) / < 200ms (INP).
- **CLS (Cumulative Layout Shift):** How much the page layout shifts during loading. Target: < 0.1.

### PageSpeed Insights
Google's free tool for measuring Core Web Vitals. Provides both lab data (simulated) and field data (real user measurements from Chrome UX Report). Gives a performance score and specific recommendations for improvement.

### Lighthouse
Google's open-source auditing tool built into Chrome DevTools. Runs performance, accessibility, best practices, and SEO audits. Provides actionable recommendations with estimated impact.

### Chrome UX Report (CrUX)
Real user experience data collected from Chrome users who have opted in. Provides field data for Core Web Vitals at the origin and page level. This is the data Google uses for ranking signals.

### Why Web Vitals Matter for MidBound Content
- Fast pages rank higher in search and get cited more by AI systems
- The MidBound blog should meet all Core Web Vitals thresholds
- Content about web performance resonates with the technical audience
- MidBound's tracking script is lightweight by design -- it does not degrade page performance

---

## How These Tools Relate to MidBound

The fundamental gap across all these tools:

| Tool | What It Tells You | What It Does NOT Tell You |
|------|-------------------|--------------------------|
| GA4 | What happened on your site | Who did it |
| Search Console | How people find you in search | Who those people are |
| SEMrush | What keywords to target | Who visits from those keywords |
| Ahrefs | Who links to you | Who visits from those links |
| GTM | What events fired | Who triggered those events |
| HubSpot | Known contacts and deals | Anonymous visitors (until MidBound) |
| Hotjar/FullStory | How visitors behave | Who those visitors are |
| Web Vitals tools | Page performance metrics | The humans behind the metrics |

Every tool in this stack measures anonymous, aggregate behavior. MidBound adds the identity layer that turns anonymous sessions into actionable contacts.

The pitch: "You already use GA4, Search Console, and HubSpot. They tell you everything about your traffic except the most important thing -- who it is. MidBound fills that gap."
