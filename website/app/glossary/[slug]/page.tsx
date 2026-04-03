import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { getAllTerms, getTermBySlug, getCategoryLabel, type GlossaryTerm } from '../../lib/glossary';
import { markdownToHtml } from '../../lib/markdown';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const terms = getAllTerms();
  return terms.map((term) => ({
    slug: term.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const term = getTermBySlug(slug);

  if (!term) {
    return { title: 'Term Not Found' };
  }

  return {
    title: term.seo_title,
    description: term.seo_description,
    keywords: term.keywords,
    openGraph: {
      title: term.seo_title,
      description: term.seo_description,
      type: 'article',
    },
  };
}

export default async function GlossaryTermPage({ params }: PageProps) {
  const { slug } = await params;
  const term = getTermBySlug(slug);

  if (!term) {
    notFound();
  }

  const htmlContent = await markdownToHtml(term.content);

  // Get related terms
  const allTerms = getAllTerms();
  const relatedTerms = term.related_terms
    .map((s) => allTerms.find((t) => t.slug === s))
    .filter((t): t is GlossaryTerm => t !== undefined);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'DefinedTerm',
    name: term.title,
    description: term.seo_description,
    url: `https://blog.midbound.ai/glossary/${term.slug}`,
    inDefinedTermSet: {
      '@type': 'DefinedTermSet',
      name: 'MidBound Glossary',
      url: 'https://blog.midbound.ai/glossary',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className="mx-auto max-w-3xl px-4 sm:px-6 py-12 sm:py-20">
        {/* Back link */}
        <Link
          href="/glossary"
          className="inline-flex items-center gap-1 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors mb-8"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          Glossary
        </Link>

        {/* Header */}
        <header className="mb-10">
          <span className="inline-block rounded-md bg-[var(--color-accent)]/10 px-2.5 py-0.5 text-xs font-medium text-[var(--color-accent)] mb-4">
            {getCategoryLabel(term.category)}
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--color-text-primary)] mb-3">
            {term.title}
          </h1>
          <p className="text-lg text-[var(--color-text-secondary)]">
            {term.short_description}
          </p>
        </header>

        {/* Content */}
        <div
          className="prose"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />

        {/* Related Terms */}
        {relatedTerms.length > 0 && (
          <section className="mt-12 pt-8 border-t border-[var(--color-border)]">
            <h2 className="text-lg font-semibold text-[var(--color-text-primary)] mb-4">Related Terms</h2>
            <div className="flex flex-wrap gap-2">
              {relatedTerms.map((related) => (
                <Link
                  key={related.slug}
                  href={`/glossary/${related.slug}`}
                  className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:border-[var(--color-accent)] transition-colors"
                >
                  {related.title}
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="mt-12 rounded-xl border border-[var(--color-accent)]/30 bg-[var(--color-accent)]/5 p-6 text-center">
          <p className="text-lg font-semibold text-[var(--color-text-primary)] mb-2">
            See who&apos;s visiting your website
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
      </article>
    </>
  );
}
