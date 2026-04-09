import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { getAllPlaybooks, getPlaybookBySlug, getCategoryLabel } from '../../lib/playbooks';
import { markdownToHtml } from '../../lib/markdown';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const playbooks = getAllPlaybooks();
  return playbooks.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const playbook = getPlaybookBySlug(slug);

  if (!playbook) return { title: 'Playbook Not Found' };

  return {
    title: playbook.seo_title,
    description: playbook.seo_description,
    keywords: playbook.keywords,
  };
}

export default async function PlaybookPage({ params }: PageProps) {
  const { slug } = await params;
  const playbook = getPlaybookBySlug(slug);

  if (!playbook) notFound();

  const htmlContent = await markdownToHtml(playbook.content);

  const howToJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: playbook.title,
    description: playbook.seo_description,
    totalTime: `PT${playbook.time_to_complete.replace(/\s+/g, '').toUpperCase()}`,
    tool: playbook.tools_needed.map((t) => ({ '@type': 'HowToTool', name: t })),
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://blog.midbound.ai/' },
      { '@type': 'ListItem', position: 2, name: 'Playbooks', item: 'https://blog.midbound.ai/playbooks' },
      { '@type': 'ListItem', position: 3, name: playbook.title, item: `https://blog.midbound.ai/playbooks/${playbook.slug}` },
    ],
  };

  const allPlaybooks = getAllPlaybooks();
  const relatedPlaybooks = playbook.related_playbooks?.length > 0
    ? playbook.related_playbooks
        .map((s: string) => allPlaybooks.find((p) => p.slug === s))
        .filter(Boolean)
    : allPlaybooks
        .filter((p) => p.category === playbook.category && p.slug !== playbook.slug)
        .slice(0, 3);

  const difficultyColors: Record<string, string> = {
    beginner: 'bg-green-500/10 text-green-400',
    intermediate: 'bg-yellow-500/10 text-yellow-400',
    advanced: 'bg-red-500/10 text-red-400',
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <article className="mx-auto max-w-3xl px-4 sm:px-6 py-12 sm:py-20">
        <Link
          href="/playbooks"
          className="inline-flex items-center gap-1 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors mb-8"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          All Playbooks
        </Link>

        <header className="mb-10">
          <div className="flex items-center gap-3 mb-4 flex-wrap">
            <span className="inline-block rounded-md bg-[var(--color-accent)]/10 px-2.5 py-0.5 text-xs font-medium text-[var(--color-accent)]">
              {getCategoryLabel(playbook.category)}
            </span>
            <span className={`inline-block rounded-md px-2.5 py-0.5 text-xs font-medium ${difficultyColors[playbook.difficulty] || ''}`}>
              {playbook.difficulty}
            </span>
            <span className="text-sm text-[var(--color-text-secondary)]">
              {playbook.time_to_complete}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--color-text-primary)] mb-4">
            {playbook.title}
          </h1>

          <div className="flex flex-wrap gap-1.5">
            {playbook.tools_needed.map((tool) => (
              <span
                key={tool}
                className="inline-block rounded-full bg-[var(--color-surface)] px-3 py-1 text-xs text-[var(--color-text-secondary)] border border-[var(--color-border)]"
              >
                {tool}
              </span>
            ))}
          </div>
        </header>

        <div className="prose" dangerouslySetInnerHTML={{ __html: htmlContent }} />

        {relatedPlaybooks.length > 0 && (
          <section className="mt-16 pt-8 border-t border-[var(--color-border)]">
            <h2 className="text-xl font-semibold text-[var(--color-text-primary)] mb-6">Related Playbooks</h2>
            <div className="grid gap-4">
              {relatedPlaybooks.map((related: any) => (
                <Link
                  key={related.slug}
                  href={`/playbooks/${related.slug}`}
                  className="block rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-4 hover:border-[var(--color-accent)] transition-colors"
                >
                  <p className="font-medium text-[var(--color-text-primary)] mb-1">{related.title}</p>
                  <p className="text-sm text-[var(--color-text-secondary)] line-clamp-2">{related.excerpt}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className={`text-xs font-medium ${difficultyColors[related.difficulty] || ''}`}>{related.difficulty}</span>
                    <span className="text-xs text-[var(--color-text-secondary)]">{related.time_to_complete}</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        <section className="mt-12 rounded-xl border border-[var(--color-accent)]/30 bg-[var(--color-accent)]/5 p-6 text-center">
          <p className="text-lg font-semibold text-[var(--color-text-primary)] mb-2">Ready to try it?</p>
          <p className="text-sm text-[var(--color-text-secondary)] mb-4">14-day free trial. No credit card required.</p>
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
