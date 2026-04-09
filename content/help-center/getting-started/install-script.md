---
title: "How to Install the MidBound Script"
slug: "install-script"
category: "getting-started"
order: 1
short_answer: "Add a lightweight JavaScript snippet to your website's header. Takes under 5 minutes."
seo_title: "How to Install the MidBound Tracking Script | MidBound Help Center"
seo_description: "Step-by-step guide to installing the MidBound JavaScript snippet on your website via direct HTML, Google Tag Manager, or Next.js/React."
keywords: ["install midbound", "tracking script", "javascript snippet", "website setup", "google tag manager"]
related_articles: ["what-happens-after-install", "setup-icp-criteria"]
---

# How to Install the MidBound Script

## Find Your Script

1. Log into your MidBound dashboard at **midbound.ai**
2. Navigate to **Settings > Script Installation**
3. Copy the unique script snippet. It includes your account ID.

Your snippet looks like this:

```html
<script src="https://cdn.midbound.ai/tracker.js" data-account="YOUR_ACCOUNT_ID" async></script>
```

## Installation Methods

### Direct HTML

Paste the script tag inside the `<head>` section of every page you want to track. If your site uses a shared header template or layout file, add it there once.

```html
<head>
  <!-- your other head tags -->
  <script src="https://cdn.midbound.ai/tracker.js" data-account="YOUR_ACCOUNT_ID" async></script>
</head>
```

### Google Tag Manager

1. Open your GTM container
2. Create a new **Custom HTML** tag
3. Paste the script snippet
4. Set the trigger to **All Pages**
5. Publish the container

### Next.js / React

Add the script to your root layout or `_document` file:

```tsx
// app/layout.tsx (Next.js App Router)
import Script from 'next/script'

export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        <Script
          src="https://cdn.midbound.ai/tracker.js"
          data-account="YOUR_ACCOUNT_ID"
          strategy="afterInteractive"
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
```

## Verify Installation

1. Visit your own website in a normal browser window (not incognito)
2. Open the browser developer tools (F12 or Cmd+Shift+I)
3. Go to the **Network** tab and filter for `midbound`
4. You should see a request to `cdn.midbound.ai/tracker.js` returning a 200 status
5. Check your MidBound dashboard. Active sessions should appear within seconds.

## What the Script Captures

The script records:

- **Pages viewed** and navigation path
- **Time spent** on each page
- **Referral source** (where the visitor came from)
- **UTM parameters** (utm_source, utm_medium, utm_campaign, utm_content, utm_term)
- **Session duration** and page count

The script is lightweight and loads asynchronously, so it does not affect page load speed. It does not collect form inputs, passwords, or keystrokes.
