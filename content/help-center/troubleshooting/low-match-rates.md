---
title: "Why Are My Match Rates Low?"
slug: "low-match-rates"
category: "troubleshooting"
order: 1
short_answer: "Low match rates are usually caused by high international traffic, non-business visitors, or heavy VPN/private browsing usage."
seo_title: "Why Are My Match Rates Low? | MidBound Help Center"
seo_description: "Diagnose and fix low MidBound match rates. Common causes include international traffic, consumer visitors, VPN usage, and bot traffic."
keywords: ["low match rates", "identification rate", "troubleshooting", "match rate optimization", "traffic quality"]
related_articles: ["match-rates", "confidence-scores", "install-script"]
---

# Why Are My Match Rates Low?

If your match rate is below what you expected, the cause is almost always related to your traffic profile, not a product issue. Here are the most common reasons and how to fix them.

## Common Causes

### High International Traffic

MidBound's identification dataset has the strongest coverage in the United States. If a large percentage of your traffic comes from outside the US, your overall match rate will be lower.

**Diagnostic step:** Check your Google Analytics (or equivalent) geographic report. What percentage of your traffic is US-based?

**Fix:** If your target market is the US, adjust your paid campaigns to target US traffic specifically. Your match rate on US traffic alone may be strong, but international traffic dilutes the overall number.

### Consumer or Non-Business Traffic

Person-level identification works best with B2B, business-intent traffic. If your site attracts a significant number of consumers, students, or general web browsers (common with broad blog content or viral social posts), those visitors will match at very low rates.

**Diagnostic step:** Look at your traffic by page. Are your highest-traffic pages blog posts with broad appeal, or product/pricing pages with business intent?

**Fix:** Focus on driving business-intent traffic to high-value pages. Separate your content strategy so business-focused pages get the most qualified traffic.

### VPN and Private Browsing

Visitors using VPNs, Tor, or incognito/private browsing are significantly harder to identify. Some industries have higher VPN adoption rates (security, IT, developers).

**Diagnostic step:** This is hard to measure directly. If your audience skews heavily technical, VPN usage is likely a factor.

**Fix:** There is no direct fix for VPN usage. Focus on optimizing other traffic sources where VPN adoption is lower.

### Bot Traffic

Bots do not match. If your site receives significant bot traffic (common with certain ad networks, social platforms, or sites without bot protection), the denominator in your match rate calculation is inflated.

**Diagnostic step:** Check your analytics for suspicious patterns: very short sessions (under 1 second), 100% bounce rates from certain referrers, traffic spikes at unusual hours.

**Fix:** Implement bot filtering on your site. Use your CDN's bot protection features. Exclude known bot traffic from your analytics to get an accurate match rate.

## Quick Checklist

1. What percentage of your traffic is US-based? (Target: 60%+ for best rates)
2. What percentage comes from business-intent sources (LinkedIn, Google search, direct)?
3. Are your paid campaigns targeting business professionals specifically?
4. Have you checked for bot traffic inflation?
5. Is your script installed on all pages you want to track?

If your US, business-intent traffic matches at 10%+ but your overall rate is 5%, the issue is traffic mix, not product performance. Focus on driving more of the right traffic.
