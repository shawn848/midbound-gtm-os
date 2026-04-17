import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { getAllPlaybooks, getPlaybookBySlug, getCategoryLabel } from '../../lib/playbooks';
import { markdownToHtml } from '../../lib/markdown';
import ChartAwareContent from '../../components/ChartAwareContent';
import PostTOC from '../../components/PostTOC';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { buttonVariants } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';

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
    ? playbook.related_playbooks.map((s: string) => allPlaybooks.find((p) => p.slug === s)).filter(Boolean)
    : allPlaybooks.filter((p) => p.category === playbook.category && p.slug !== playbook.slug).slice(0, 3);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <article className="mx-auto max-w-3xl px-4 sm:px-6 py-12 sm:py-20">
        <Link href="/playbooks" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8">
          <ArrowLeft className="h-4 w-4" />
          All Playbooks
        </Link>

        <header className="mb-10">
          <div className="flex items-center gap-3 mb-4 flex-wrap">
            <Badge variant="secondary" className="text-primary bg-primary/10 border-0">
              {getCategoryLabel(playbook.category)}
            </Badge>
            <span className="text-sm text-muted-foreground">{playbook.time_to_complete}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-4">
            {playbook.title}
          </h1>

          <div className="flex flex-wrap gap-1.5">
            {playbook.tools_needed.map((tool) => (
              <Badge key={tool} variant="secondary" className="font-normal">{tool}</Badge>
            ))}
          </div>
        </header>

        <ChartAwareContent html={htmlContent} />

        <PostTOC sections={playbook.section_titles || []} />

        {relatedPlaybooks.length > 0 && (
          <section className="mt-16">
            <Separator className="mb-8" />
            <h2 className="text-xl font-semibold text-foreground mb-6">Related Playbooks</h2>
            <div className="grid gap-4">
              {relatedPlaybooks.map((related: any) => (
                <Link key={related.slug} href={`/playbooks/${related.slug}`}>
                  <Card className="bg-card border-border hover:border-primary/50 transition-all">
                    <CardContent className="p-4">
                      <p className="font-medium text-foreground mb-1">{related.title}</p>
                      <p className="text-sm text-muted-foreground line-clamp-2">{related.excerpt}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-xs text-muted-foreground">{related.time_to_complete}</span>
                      </div>
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
              <p className="text-lg font-semibold text-foreground mb-2">Ready to try it?</p>
              <p className="text-sm text-muted-foreground mb-4">14-day free trial. No credit card required.</p>
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
