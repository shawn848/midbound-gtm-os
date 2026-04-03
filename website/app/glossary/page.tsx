import Link from 'next/link';
import type { Metadata } from 'next';
import {
  getTermsByCategory,
  getCategoryLabel,
  getSortedCategories,
} from '../lib/glossary';

export const metadata: Metadata = {
  title: 'Glossary — MidBound Blog',
  description:
    'Everything B2B teams need to know about website visitor identification, AEO, GEO, person-level marketing, and modern revenue operations. 30+ terms defined.',
};

export default function GlossaryPage() {
  const grouped = getTermsByCategory();
  const categories = getSortedCategories(grouped);

  const totalTerms = Object.values(grouped).reduce(
    (sum, terms) => sum + terms.length,
    0,
  );

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

      {/* Category jump links */}
      <nav className="mb-12 flex flex-wrap justify-center gap-2">
        {categories.map((cat) => (
          <a
            key={cat}
            href={`#${cat}`}
            className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-1.5 text-xs font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:border-[var(--color-accent)] transition-colors"
          >
            {getCategoryLabel(cat)}
          </a>
        ))}
      </nav>

      {/* Terms by category */}
      {categories.map((cat) => (
        <section key={cat} id={cat} className="mb-12 scroll-mt-20">
          <h2 className="text-xl font-semibold text-[var(--color-text-primary)] mb-6 flex items-center gap-3">
            <span className="inline-block w-1 h-6 rounded-full bg-[var(--color-accent)]" />
            {getCategoryLabel(cat)}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {grouped[cat].map((term) => (
              <Link
                key={term.slug}
                href={`/glossary/${term.slug}`}
                className="group block rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 shadow-sm transition-all hover:border-[var(--color-accent)] hover:shadow-md"
              >
                <h3 className="text-base font-semibold text-[var(--color-text-primary)] mb-1.5 group-hover:text-[var(--color-accent)] transition-colors">
                  {term.title}
                </h3>
                <p className="text-sm text-[var(--color-text-secondary)] line-clamp-2">
                  {term.short_description}
                </p>
              </Link>
            ))}
          </div>
        </section>
      ))}

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
