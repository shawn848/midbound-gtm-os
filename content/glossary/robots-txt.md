---
title: "Robots.txt"
slug: "robots-txt"
category: "search-optimization"
short_description: "A text file that tells search engine and AI crawlers which pages they can and cannot access."
seo_title: "What is Robots.txt? | MidBound Glossary"
seo_description: "Learn what robots.txt is, how it controls crawler access, and how AI crawler directives work for B2B websites."
keywords: ["robots.txt", "crawler directives", "GPTBot", "AI crawlers", "web crawling"]
related_terms: ["seo", "geo", "sitemap"]
---

Robots.txt is a plain text file placed at the root of a website (e.g., `example.com/robots.txt`) that instructs search engine crawlers and AI bots which pages or directories they are allowed to access. It follows the Robots Exclusion Protocol, a standard that has governed crawler behavior since 1994.

## How It Works

When a crawler visits your site, it checks `/robots.txt` first. The file contains `User-agent` directives that target specific crawlers and `Disallow` rules that block access to certain paths. You can also use `Allow` rules to override broader blocks for specific pages.

The file has become more complex with the rise of AI crawlers. In addition to traditional bots like Googlebot and Bingbot, B2B sites now need to consider directives for:

- **GPTBot** (OpenAI). Controls whether your content is used for ChatGPT responses.
- **ClaudeBot** (Anthropic). Controls access for Claude's training and retrieval.
- **PerplexityBot** (Perplexity). Controls whether Perplexity can cite your pages.
- **Google-Extended**. Controls whether Google uses your content for AI Overviews and Gemini.

Blocking all AI crawlers means your content will not appear in AI-generated answers. For B2B companies investing in AEO and GEO, this is a critical decision. You want AI crawlers to access your highest-value pages (product pages, glossary terms, comparison content) while potentially restricting internal or gated content.

A well-structured robots.txt also references your XML sitemap, giving crawlers a direct path to your most important pages.

## How It Relates to MidBound

For B2B companies using MidBound, robots.txt is part of a broader visibility strategy. Your website needs to be discoverable both by traditional search engines and AI answer engines so that buyers researching visitor identification tools can find you. MidBound identifies the people who arrive on your site after discovering it through search or AI citations. Without proper crawler access, those visitors never arrive in the first place. Ensuring GPTBot and PerplexityBot can access your key pages means your content is eligible for AI citations, which drives the traffic that MidBound then identifies at the person level.
