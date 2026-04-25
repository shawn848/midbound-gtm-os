---
title: "Duplicate Contacts in HubSpot"
slug: "duplicate-contacts-hubspot"
category: "troubleshooting"
order: 3
short_answer: "MidBound checks for existing contacts by email before creating new ones. Duplicates usually mean the same person has multiple email addresses."
seo_title: "Duplicate Contacts in HubSpot from MidBound | MidBound Help Center"
seo_description: "Understand why duplicate contacts appear in HubSpot from MidBound and how to resolve them using deduplication tools and workflows."
keywords: ["duplicate contacts", "hubspot duplicates", "deduplication", "contact merge", "CRM cleanup"]
related_articles: ["hubspot-setup", "confidence-scores", "sequences-cooldown"]
---

# Duplicate Contacts in HubSpot

MidBound is designed to prevent duplicates by checking for existing contacts before creating new ones. But duplicates can still occur in specific situations. Here is how to understand, resolve, and prevent them.

## How Deduplication Works

Before creating a new HubSpot contact, MidBound checks whether a contact with the same email address already exists.

- **If a match is found:** MidBound skips the create action so the same person doesn't land twice.
- **If no match is found:** MidBound creates a new contact.

This email-based check prevents duplicate creates in most cases. To enrich existing HubSpot contacts with new visit data (visit count, last page, score), pair the HubSpot integration with the Webhook integration + a Zapier or Make scenario.

## Common Causes of Duplicates

### Multiple Email Addresses

The same person may have more than one email address (e.g., a work email and a personal email, or an old email and a new one after switching companies). MidBound may identify them with one email on one visit and a different email on another.

### Pre-Existing Contact with Different Email

If a contact already exists in HubSpot with an email address that MidBound does not have (e.g., a manual entry or import), MidBound will not find the match and will create a new contact with the email it identified.

### Contact Imported from Another Source

If another tool or manual import created a contact without an email (company and name only), MidBound's email-based lookup will not find it. A new contact is created with the MidBound-identified email.

## How to Resolve Duplicates

### HubSpot Merge Tool

1. Go to **Contacts** in HubSpot
2. Click **Actions > Manage duplicates** (or navigate to Settings > Data Management > Duplicates)
3. HubSpot will show suspected duplicate pairs
4. Review and merge, selecting which record's values to keep

When merging, keep the record with the most complete data as the primary. Visit history from both records is preserved after the merge.

### Deduplication Workflow

Set up a HubSpot workflow to automatically flag potential duplicates:

1. Trigger: Contact created with `midbound_source` property
2. Condition: Check if another contact exists with the same `company` AND `last name`
3. Action: Add to a "Review Duplicates" list for manual review

This does not auto-merge (which can be risky), but it flags cases for your team to review.

## Prevention Tips

1. **Keep HubSpot emails current.** When contacts change roles or companies, update their email. This ensures MidBound's lookup finds the right record.
2. **Use HubSpot's duplicate management regularly.** Run the built-in duplicate check weekly or monthly.
3. **Standardize contact creation.** Ensure other tools and manual imports always include email addresses so MidBound can match against them.
4. **Review low-confidence matches.** Lower confidence identifications are more likely to produce mismatches. Filtering sequence enrollment to high-confidence matches reduces duplicate risk.
