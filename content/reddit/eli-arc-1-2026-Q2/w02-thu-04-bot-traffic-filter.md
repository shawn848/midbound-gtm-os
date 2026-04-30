---
arc: "eli-arc-1-2026-Q2"
week: 2
day: "thu"
post_number: 4
title: "we filter bot traffic before it hits the counter"
author: "eli"
platform: "reddit"
home_subreddit: "r/Midbound"
cross_post: []
publish_date: "TBD"
status: "drafted"
angle: "companion piece to #3. transparency on billing practice."
hook: "the cleanest way to inflate a match rate is to count bots as people. we chose not to. here's what that actually costs us."
cta: "pull your visitor id reports and filter for data center asns, aws ranges, googlebot. tell me what percentage of your 'identified visitors' disappear. happy to help interpret."
blog_repurposed: false
linkedin_repurposed: false
x_repurposed: false
---

quick follow-up to the deterministic post. worth its own thread because this is the piece of the model thats never discussed publicly and it affects literally every customer in the category.

most of your website traffic isnt human. somewhere between 30% and 50% of b2b site traffic in 2026 is bots, scrapers, ai crawlers, data center requests, and monitoring services. some of it is benign (googlebot, uptime monitors). a lot of it is scrapers feeding ai training runs. a chunk of it is competitors running their own fingerprinting on your site.

a lot of vendors count a meaningful portion of this as 'resolved visitors.' not because they're trying to scam you. because their matching logic is probabilistic and the incentive structure of usage-based billing rewards inclusivity over accuracy. more resolved visitors means a bigger number on the dashboard means a bigger bill.

we filter this out. aggressively. data center asns, known scraper fingerprints, headless browser signatures, cloud provider ip ranges, suspicious session behavior — all filtered before a session is counted. our number is lower because of it.

im writing this post because every customer we close eventually runs this audit themselves. they pull their previous vendor's resolved-visitor report, filter by asn, and find that 20-40% of what they were paying for was data center traffic they could never have emailed. it shakes their faith in the category for a month. then they find us or rb2b or whoever and start over.

you can audit yours today. pull the last 30 days of resolved visitors from whatever tool you're running. filter for aws, gcp, azure, digital ocean, cloudflare worker, and known scraper asns. see what percentage vanishes.

not naming names because this isnt a takedown, its an industry-wide problem. but if youve done this audit and the number was ugly, youre not alone. its a structural issue with how the category has been sold.

we made a different call. it costs us on the demo. it pays us back when the customer actually tries to action the data.
