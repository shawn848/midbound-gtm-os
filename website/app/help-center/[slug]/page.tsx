import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { getAllHelpArticles, getHelpArticleBySlug, getCategoryLabel } from '../../lib/helpCenter';
import { markdownToHtml } from '../../lib/markdown';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { buttonVariants } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, ChevronRight } from 'lucide-react';

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
    mainEntity: [{
      '@type': 'Question',
      name: article.title,
      acceptedAnswer: { '@type': 'Answer', text: article.short_answer },
    }],
  };

  const allArticles = getAllHelpArticles();
  const relatedArticles = article.related_articles?.length > 0
    ? article.related_articles.map((s: string) => allArticles.find((a) => a.slug === s)).filter(Boolean)
    : allArticles.filter((a) => a.category === article.category && a.slug !== article.slug).slice(0, 3);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <article className="mx-auto max-w-3xl px-4 sm:px-6 py-12 sm:py-20">
        <Link href="/help-center" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8">
          <ArrowLeft className="h-4 w-4" />
          Help Center
        </Link>

        <header className="mb-10">
          <Badge variant="secondary" className="text-primary bg-primary/10 border-0 mb-4">
            {getCategoryLabel(article.category)}
          </Badge>

          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-4">
            {article.title}
          </h1>

          {article.short_answer && (
            <p className="text-lg text-muted-foreground border-l-2 border-primary pl-4">
              {article.short_answer}
            </p>
          )}
        </header>

        <div className="prose" dangerouslySetInnerHTML={{ __html: htmlContent }} />

        {relatedArticles.length > 0 && (
          <section className="mt-16">
            <Separator className="mb-8" />
            <h2 className="text-xl font-semibold text-foreground mb-6">Related Articles</h2>
            <div className="grid gap-3">
              {relatedArticles.map((related: any) => (
                <Link key={related.slug} href={`/help-center/${related.slug}`}>
                  <Card className="bg-card border-border hover:border-primary/50 transition-all group">
                    <CardContent className="p-4 flex items-center justify-between">
                      <div>
                        <p className="font-medium text-foreground mb-0.5 group-hover:text-primary transition-colors">{related.title}</p>
                        <p className="text-sm text-muted-foreground">{related.short_answer}</p>
                      </div>
                      <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary shrink-0 ml-3" />
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        )}

        <section className="mt-12">
          <Card className="bg-primary/5 border-primary/20 glow-card">
            <CardContent className="p-6 text-center">
              <p className="text-lg font-semibold text-foreground mb-2">Still have questions?</p>
              <p className="text-sm text-muted-foreground mb-4">Start a free trial and see MidBound in action.</p>
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
