---
title: "Visitors Not Showing Up in Slack"
slug: "visitors-not-in-slack"
category: "troubleshooting"
order: 2
short_answer: "Check your ICP score threshold, page filters, and Slack channel permissions."
seo_title: "Visitors Not Showing Up in Slack | MidBound Help Center"
seo_description: "Fix MidBound Slack notifications that aren't appearing. Troubleshoot ICP thresholds, page filters, channel permissions, and script installation."
keywords: ["slack not working", "no notifications", "slack troubleshooting", "missing alerts", "slack integration"]
related_articles: ["slack-setup", "install-script", "low-match-rates"]
---

# Visitors Not Showing Up in Slack

If MidBound is identifying visitors but they are not appearing in your Slack channel, the issue is usually a filter or permission setting. Here is how to diagnose and fix it.

## Step 1: Confirm MidBound Is Identifying Visitors

Before troubleshooting Slack, verify that identifications are happening:

1. Log into your MidBound dashboard
2. Check the **Visitors** tab
3. Are identified visitors showing up there?

If yes, the issue is between MidBound and Slack. Continue below.

If no visitors appear in the dashboard either, the problem is upstream. Check your [script installation](/help-center/getting-started/install-script) and [match rates](/help-center/troubleshooting/low-match-rates).

## Step 2: Check Your ICP Score Threshold

This is the most common cause. If your threshold is set to 8+ and most of your visitors score 5-7, nothing will reach Slack.

**Fix:**
1. Go to **Settings > Integrations > Slack**
2. Check the ICP score threshold
3. Try lowering it to 5 or 6 temporarily
4. See if visitors start appearing

You can always raise it again once you confirm the integration is working.

## Step 3: Check Your Page Filters

If you set page filters (e.g., "only notify when someone visits /pricing"), visitors on other pages will not trigger notifications.

**Fix:**
1. Go to **Settings > Integrations > Slack**
2. Check if page filters are enabled
3. Remove or broaden the filter temporarily
4. See if visitors start appearing

## Step 4: Check Slack Channel Permissions

MidBound needs permission to post to your selected channel.

**Common issues:**
- The channel was made private after MidBound was connected
- The MidBound bot was removed from the channel
- The Slack workspace admin restricted third-party app permissions

**Fix:**
1. Open the Slack channel settings
2. Check the **Integrations** tab
3. Verify MidBound is listed as an app in the channel
4. If not, re-add the MidBound app to the channel or reconnect the integration

## Step 5: Verify the Script Is Installed Correctly

If no identifications are happening at all:

1. Visit your website in a normal browser (not incognito)
2. Open developer tools (F12)
3. Check the **Network** tab for `midbound` requests
4. Verify the request returns a 200 status

If the script is not loading, see [How to Install the MidBound Script](/help-center/getting-started/install-script).

## Still Not Working?

If all of the above check out and visitors still are not appearing in Slack:

1. Disconnect and reconnect the Slack integration in **Settings > Integrations > Slack**
2. Select the channel again
3. Send a test notification from the integration settings page

If the test notification arrives but real visitors do not, the issue is likely your filter combination. Broaden all filters temporarily to confirm.
