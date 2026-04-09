import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { getAllTerms, getTermBySlug, getCategoryLabel, type GlossaryTerm } from '../../lib/glossary';
import { markdownToHtml } from '../../lib/markdown';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { buttonVariants } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const terms = getAllTerms();
  return terms.map((term) => ({ slug: term.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const term = getTermBySlug(slug);
  if (!term) return { title: 'Term Not Found' };

  return {
    title: term.seo_title,
    description: term.seo_description,
    keywords: term.keywords,
    openGraph: { title: term.seo_title, description: term.seo_description, type: 'article' },
  };
}

export default async function GlossaryTermPage({ params }: PageProps) {
  const { slug } = await params;
  const term = getTermBySlug(slug);
  if (!term) notFound();

  const htmlContent = await markdownToHtml(term.content);

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
    inDefinedTermSet: { '@type': 'DefinedTermSet', name: 'MidBound Glossary', url: 'https://blog.midbound.ai/glossary' },
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://blog.midbound.ai/' },
      { '@type': 'ListItem', position: 2, name: 'Glossary', item: 'https://blog.midbound.ai/glossary' },
      { '@type': 'ListItem', position: 3, name: term.title, item: `https://blog.midbound.ai/glossary/${term.slug}` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <article className="mx-auto max-w-3xl px-4 sm:px-6 py-12 sm:py-20">
        <Link href="/glossary" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8">
          <ArrowLeft className="h-4 w-4" />
          Glossary
        </Link>

        <header className="mb-10">
          <Badge variant="secondary" className="text-primary bg-primary/10 border-0 mb-4">
            {getCategoryLabel(term.category)}
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-3">
            {term.title}
          </h1>
          <p className="text-lg text-muted-foreground">
            {term.short_description}
          </p>
        </header>

        <div className="prose" dangerouslySetInnerHTML={{ __html: htmlContent }} />

        {relatedTerms.length > 0 && (
          <section className="mt-12">
            <Separator className="mb-8" />
            <h2 className="text-lg font-semibold text-foreground mb-4">Related Terms</h2>
            <div className="flex flex-wrap gap-2">
              {relatedTerms.map((related) => (
                <Link
                  key={related.slug}
                  href={`/glossary/${related.slug}`}
                  className={buttonVariants({ variant: 'outline', size: 'sm' })}
                >
                  {related.title}
                </Link>
              ))}
            </div>
          </section>
        )}

        <section className="mt-12">
          <Card className="bg-primary/5 border-primary/20 glow-card">
            <CardContent className="p-6 text-center">
              <p className="text-lg font-semibold text-foreground mb-2">
                See who&apos;s visiting your website
              </p>
              <p className="text-sm text-muted-foreground mb-4">
                Person-level identification. 14-day free trial. No credit card.
              </p>
              <a
                href="https://midbound.ai/register"
                target="_blank"
                rel="noopener noreferrer"
                className={buttonVariants({ size: 'lg', className: 'cta-glow' })}
              >
                Start Free Trial
                <ArrowRight className="h-4 w-4 ml-1" />
              </a>
            </CardContent>
          </Card>
        </section>
      </article>
    </>
  );
}
