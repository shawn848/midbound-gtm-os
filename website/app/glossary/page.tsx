import type { Metadata } from 'next';
import {
  getTermsByCategory,
  getCategoryLabel,
  getSortedCategories,
} from '../lib/glossary';
import GlossaryGrid from '../components/GlossaryGrid';

export const metadata: Metadata = {
  title: 'Glossary — MidBound Blog',
  description:
    'Everything B2B teams need to know about website visitor identification, AEO, GEO, person-level marketing, and modern revenue operations. 45+ terms defined.',
};

const categoryLabelMap: Record<string, string> = {
  'search-optimization': 'Search & AI Optimization',
  'analytics-tools': 'Analytics & SEO Tools',
  'visitor-identification': 'Website Visitor Identification',
  'b2b-marketing': 'B2B Marketing',
  'crm-integrations': 'CRM & Integrations',
  'metrics': 'Metrics & KPIs',
};

export default function GlossaryPage() {
  const grouped = getTermsByCategory();
  const categories = getSortedCategories(grouped);

  const totalTerms = Object.values(grouped).reduce(
    (sum, terms) => sum + terms.length,
    0,
  );

  // Serialize for client component
  const serializedGrouped: Record<string, { title: string; slug: string; category: string; short_description: string }[]> = {};
  for (const cat of categories) {
    serializedGrouped[cat] = grouped[cat].map((t) => ({
      title: t.title,
      slug: t.slug,
      category: t.category,
      short_description: t.short_description,
    }));
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
      {/* Hero */}
      <section className="mb-16 text-center">
        <p className="text-sm font-mono tracking-widest uppercase text-[var(--color-accent)] mb-4">
          {totalTerms} terms
        </p>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-[var(--color-text-primary)] mb-4">
          MidBound Glossary
        </h1>
        <p className="text-lg text-[var(--color-text-secondary)] max-w-2xl mx-auto">
          Everything B2B teams need to know about visitor identification, AEO,
          GEO, and modern marketing.
        </p>
      </section>

      <GlossaryGrid
        grouped={serializedGrouped}
        categories={categories}
        categoryLabels={categoryLabelMap}
      />

      {/* Bottom CTA */}
      <section className="mt-16 rounded-xl border border-[var(--color-accent)]/30 bg-[var(--color-accent)]/5 p-8 text-center">
        <p className="text-lg font-semibold text-[var(--color-text-primary)] mb-2">
          Ready to see who visits your website?
        </p>
        <p className="text-sm text-[var(--color-text-secondary)] mb-4">
          Person-level identification. 14-day free trial. No credit card.
        </p>
        <a
          href="https://midbound.ai/register"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block rounded-lg bg-[var(--color-accent)] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90 transition-opacity"
        >
          Start Free Trial
        </a>
      </section>
    </div>
  );
}
