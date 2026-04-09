import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { getAllPosts, getPostBySlug } from '../../lib/posts';
import { markdownToHtml } from '../../lib/markdown';
import AuthorBadge from '../../components/AuthorBadge';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { buttonVariants } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: 'Post Not Found' };

  return {
    title: post.seo_title,
    description: post.seo_description,
    keywords: post.keywords,
    openGraph: {
      title: post.seo_title,
      description: post.seo_description,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author_name],
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const htmlContent = await markdownToHtml(post.content);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.seo_description,
    datePublished: post.date,
    author: { '@type': 'Person', name: post.author_name, jobTitle: post.author_role },
    publisher: { '@type': 'Organization', name: 'MidBound', url: 'https://midbound.ai' },
    keywords: post.keywords.join(', '),
    mainEntityOfPage: `https://blog.midbound.ai/blog/${post.slug}`,
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://blog.midbound.ai/' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://blog.midbound.ai/blog' },
      { '@type': 'ListItem', position: 3, name: post.title, item: `https://blog.midbound.ai/blog/${post.slug}` },
    ],
  };

  const faqRegex = /<h3>(.*?)<\/h3>\s*<p>(.*?)<\/p>/g;
  const faqEntries: { question: string; answer: string }[] = [];
  const faqSectionStart = htmlContent.indexOf('Frequently Asked Questions');
  if (faqSectionStart !== -1) {
    const faqHtml = htmlContent.slice(faqSectionStart);
    let match;
    while ((match = faqRegex.exec(faqHtml)) !== null) {
      faqEntries.push({
        question: match[1].replace(/<[^>]*>/g, ''),
        answer: match[2].replace(/<[^>]*>/g, ''),
      });
    }
  }

  const faqJsonLd = faqEntries.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqEntries.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  } : null;

  const allPosts = getAllPosts();
  const relatedPosts = post.related_posts?.length > 0
    ? post.related_posts.map((s: string) => allPosts.find((p) => p.slug === s)).filter(Boolean)
    : allPosts.filter((p) => p.keyword_cluster === post.keyword_cluster && p.slug !== post.slug).slice(0, 3);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      {faqJsonLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />}

      <article className="mx-auto max-w-3xl px-4 sm:px-6 py-12 sm:py-20">
        <Link href="/blog" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8">
          <ArrowLeft className="h-4 w-4" />
          All Posts
        </Link>

        <header className="mb-10">
          <div className="flex items-center gap-3 mb-4 flex-wrap">
            <Badge variant="secondary" className="text-primary bg-primary/10 border-0">
              {post.pillar}
            </Badge>
            {post.keyword_cluster && (
              <Badge variant="outline">{post.keyword_cluster}</Badge>
            )}
            <span className="text-sm text-muted-foreground">{post.reading_time} min read</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-4">
            {post.title}
          </h1>

          <div className="flex items-center justify-between flex-wrap gap-4">
            <AuthorBadge name={post.author_name} role={post.author_role} />
            <time dateTime={post.date} className="text-sm text-muted-foreground">
              {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </time>
          </div>
        </header>

        <div className="prose" dangerouslySetInnerHTML={{ __html: htmlContent }} />

        {relatedPosts.length > 0 && (
          <section className="mt-16">
            <Separator className="mb-8" />
            <h2 className="text-xl font-semibold text-foreground mb-6">Related Posts</h2>
            <div className="grid gap-4">
              {relatedPosts.map((related: any) => (
                <Link key={related.slug} href={`/blog/${related.slug}`}>
                  <Card className="bg-card border-border hover:border-primary/50 transition-all">
                    <CardContent className="p-4">
                      <p className="font-medium text-foreground mb-1">{related.title}</p>
                      <p className="text-sm text-muted-foreground line-clamp-2">{related.excerpt}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-xs text-primary">{related.author_name}</span>
                        <span className="text-xs text-muted-foreground">&middot; {related.reading_time} min read</span>
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
              <p className="text-lg font-semibold text-foreground mb-2">See who&apos;s visiting your website</p>
              <p className="text-sm text-muted-foreground mb-4">Person-level identification. 14-day free trial. No credit card.</p>
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
