---
title: "IP-to-Company Resolution"
slug: "ip-to-company"
category: "visitor-identification"
short_description: "The technique of matching a website visitor's IP address to the company they work for using reverse IP lookup databases."
seo_title: "What is IP-to-Company Resolution? | MidBound Glossary"
seo_description: "Learn what IP-to-company resolution is, how reverse IP lookup works, its limitations in the remote work era, and how person-level identification goes further."
keywords: ["IP-to-company", "reverse IP lookup", "IP matching", "company identification", "IP resolution"]
related_terms: ["company-level-identification", "deanonymization", "person-level-identification", "website-visitor-tracking"]
---

IP-to-company resolution is the technique of matching a website visitor's IP address to the company they work for by looking up the IP against databases that map corporate IP ranges to business entities.

## How It Works

Every device connected to the internet has an IP address. Large organizations typically own or lease dedicated IP ranges that are registered in public WHOIS databases and maintained by Regional Internet Registries (RIRs). IP-to-company databases aggregate this information along with proprietary data to create mappings between IP addresses and businesses.

When a visitor arrives at a website, their IP address is captured and checked against these databases. If a match is found, the system returns the company name and available firmographic data (industry, size, location).

The process:

1. **Visitor hits the website.** The web server or tracking script captures the visitor's IP address.
2. **Database lookup.** The IP is queried against the vendor's IP-to-company database.
3. **Match or miss.** If the IP maps to a known corporate range, the company is identified. If not, the visitor remains anonymous.

Key limitations:

- **Remote and hybrid work.** When employees work from home, they use residential ISP IPs that do not map to their employer. This has drastically reduced IP-to-company match rates since 2020.
- **Mobile and cellular traffic.** Visitors on cellular networks get carrier IPs that do not map to any specific company.
- **VPNs and proxies.** Corporate VPNs may route traffic through a central IP (improving match rates) or consumer VPNs may mask the IP entirely (preventing matches).
- **Co-working spaces.** Shared office IPs resolve to the building operator or ISP, not the individual companies inside.
- **Company only.** Even successful matches only identify the company, not the individual person.

## Why It Matters for B2B Teams

IP-to-company resolution was the foundation of first-generation visitor identification tools. It provided a way for B2B teams to know which companies were showing interest. However, the shift to remote work has significantly degraded match rates, and the inherent limitation of company-only data means reps still must guess who at the company actually visited.

## How It Relates to MidBound

MidBound's approach to identification goes beyond IP-to-company resolution. Rather than relying on reverse IP lookup to match visitors to companies, MidBound uses AI matching to resolve visitors to individual LinkedIn profiles -- providing the specific person's name, title, email, and LinkedIn URL. This works regardless of whether the visitor is on a corporate network, home WiFi, or mobile device.
