import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { getAllHelpArticles, getHelpArticleBySlug, getCategoryLabel } from '../../lib/helpCenter';
import { markdownToHtml } from '../../lib/markdown';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const articles = getAllHelpArticles();
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getHelpArticleBySlug(slug);

  if (!article) return { title: 'Article Not Found' };

  return {
    title: article.seo_title,
    description: article.seo_description,
    keywords: article.keywords,
  };
}

export default async function HelpArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = getHelpArticleBySlug(slug);

  if (!article) notFound();

  const htmlContent = await markdownToHtml(article.content);

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://blog.midbound.ai/' },
      { '@type': 'ListItem', position: 2, name: 'Help Center', item: 'https://blog.midbound.ai/help-center' },
      { '@type': 'ListItem', position: 3, name: article.title, item: `https://blog.midbound.ai/help-center/${article.slug}` },
    ],
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: article.title,
        acceptedAnswer: {
          '@type': 'Answer',
          text: article.short_answer,
        },
      },
    ],
  };

  const allArticles = getAllHelpArticles();
  const relatedArticles = article.related_articles?.length > 0
    ? article.related_articles
        .map((s: string) => allArticles.find((a) => a.slug === s))
        .filter(Boolean)
    : allArticles
        .filter((a) => a.category === article.category && a.slug !== article.slug)
        .slice(0, 3);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <article className="mx-auto max-w-3xl px-4 sm:px-6 py-12 sm:py-20">
        <Link
          href="/help-center"
          className="inline-flex items-center gap-1 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors mb-8"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          Help Center
        </Link>

        <header className="mb-10">
          <span className="inline-block rounded-md bg-[var(--color-accent)]/10 px-2.5 py-0.5 text-xs font-medium text-[var(--color-accent)] mb-4">
            {getCategoryLabel(article.category)}
          </span>

          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--color-text-primary)] mb-4">
            {article.title}
          </h1>

          {article.short_answer && (
            <p className="text-lg text-[var(--color-text-secondary)] border-l-2 border-[var(--color-accent)] pl-4">
              {article.short_answer}
            </p>
          )}
        </header>

        <div className="prose" dangerouslySetInnerHTML={{ __html: htmlContent }} />

        {relatedArticles.length > 0 && (
          <section className="mt-16 pt-8 border-t border-[var(--color-border)]">
            <h2 className="text-xl font-semibold text-[var(--color-text-primary)] mb-6">Related Articles</h2>
            <div className="grid gap-3">
              {relatedArticles.map((related: any) => (
                <Link
                  key={related.slug}
                  href={`/help-center/${related.slug}`}
                  className="block rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-4 hover:border-[var(--color-accent)] transition-colors"
                >
                  <p className="font-medium text-[var(--color-text-primary)] mb-1">{related.title}</p>
                  <p className="text-sm text-[var(--color-text-secondary)]">{related.short_answer}</p>
                </Link>
              ))}
            </div>
          </section>
        )}

        <section className="mt-12 rounded-xl border border-[var(--color-accent)]/30 bg-[var(--color-accent)]/5 p-6 text-center">
          <p className="text-lg font-semibold text-[var(--color-text-primary)] mb-2">Still have questions?</p>
          <p className="text-sm text-[var(--color-text-secondary)] mb-4">Start a free trial and see MidBound in action.</p>
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
