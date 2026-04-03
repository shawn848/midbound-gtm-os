---
title: "Company-Level Identification"
slug: "company-level-identification"
category: "visitor-identification"
short_description: "Identifying the company a website visitor belongs to using reverse IP lookup, without resolving to a specific individual."
seo_title: "What is Company-Level Identification? | MidBound Glossary"
seo_description: "Learn what company-level website visitor identification is, how reverse IP lookup works, and why B2B teams are moving beyond company-level to person-level data."
keywords: ["company-level identification", "company-level ID", "reverse IP lookup", "account identification", "visitor company"]
related_terms: ["person-level-identification", "deanonymization", "ip-to-company", "abm"]
---

Company-level identification is the process of matching an anonymous website visitor to the company they work for -- typically using reverse IP lookup -- providing the company name, industry, and size, but not the identity of the specific individual who visited.

## How It Works

Company-level identification relies primarily on reverse IP lookup. When someone visits a website from a corporate network, their IP address can be matched against databases that map IP ranges to company names.

The process:

1. **IP capture.** The visitor's IP address is recorded during their website session.
2. **Database lookup.** The IP is matched against a database of corporate IP ranges (maintained by the identification vendor).
3. **Company resolution.** The matching company's firmographic data is returned -- company name, industry, size, location.
4. **Delivery.** Results are pushed to the customer's analytics dashboard or CRM.

Limitations of the approach:

- **Remote work.** Employees working from home use residential IPs that cannot be matched to their employer. With remote work now standard, this significantly reduces match rates.
- **No individual identity.** Even when a match succeeds, you know the company but not the person. A "visit from Microsoft" could be any of 200,000+ employees.
- **Shared IPs.** Co-working spaces, mobile networks, and VPNs result in IP addresses that map to the ISP, not the visitor's employer.
- **Small companies.** Smaller businesses are less likely to have dedicated corporate IP ranges in identification databases.

## Why It Matters for B2B Teams

Company-level identification was the first generation of visitor identification technology and remains widely used. It is useful for ABM teams who want to know which target accounts are visiting their site. However, it creates a workflow gap: after identifying the company, sales reps must manually research who at that company might have been the visitor -- a process that is slow and often inaccurate.

## How It Relates to MidBound

Company-level identification represents the baseline that most visitor identification tools provide (Snitcher, Factors, Clearbit Reveal, 6sense, Demandbase). MidBound goes beyond company-level by using AI matching to identify the specific individual -- providing the name, title, email, and LinkedIn profile. This eliminates the guesswork inherent in company-level data and enables same-day personalized outreach.
