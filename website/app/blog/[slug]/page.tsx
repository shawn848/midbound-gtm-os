import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { getAllPosts, getPostBySlug } from '../../lib/posts';
import { markdownToHtml } from '../../lib/markdown';
import AuthorBadge from '../../components/AuthorBadge';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return { title: 'Post Not Found' };
  }

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

  if (!post) {
    notFound();
  }

  const htmlContent = await markdownToHtml(post.content);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.seo_description,
    datePublished: post.date,
    author: {
      '@type': 'Person',
      name: post.author_name,
      jobTitle: post.author_role,
    },
    publisher: {
      '@type': 'Organization',
      name: 'MidBound',
      url: 'https://midbound.ai',
    },
    keywords: post.keywords.join(', '),
  };

  // Extract FAQ section from HTML content for FAQ schema
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
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  } : null;

  // Get related posts
  const allPosts = getAllPosts();
  const relatedPosts = post.related_posts?.length > 0
    ? post.related_posts
        .map((s: string) => allPosts.find((p) => p.slug === s))
        .filter(Boolean)
    : allPosts
        .filter((p) => p.keyword_cluster === post.keyword_cluster && p.slug !== post.slug)
        .slice(0, 3);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}
      <article className="mx-auto max-w-3xl px-4 sm:px-6 py-12 sm:py-20">
        {/* Back link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-1 text-sm text-[var(--color-text-secondary)] hover:text-white transition-colors mb-8"
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
          All Posts
        </Link>

        {/* Header */}
        <header className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="inline-block rounded-md bg-[var(--color-accent)]/10 px-2.5 py-0.5 text-xs font-medium text-[var(--color-accent)]">
              {post.pillar}
            </span>
            {post.keyword_cluster && (
              <span className="inline-block rounded-md bg-[var(--color-surface)] px-2.5 py-0.5 text-xs font-medium text-[var(--color-text-secondary)] border border-[var(--color-border)]">
                {post.keyword_cluster}
              </span>
            )}
            <span className="text-sm text-[var(--color-text-secondary)]">
              {post.reading_time} min read
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4">
            {post.title}
          </h1>

          <div className="flex items-center justify-between flex-wrap gap-4">
            <AuthorBadge name={post.author_name} role={post.author_role} />
            <time
              dateTime={post.date}
              className="text-sm text-[var(--color-text-secondary)]"
            >
              {new Date(post.date).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </time>
          </div>
        </header>

        {/* Content */}
        <div
          className="prose"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="mt-16 pt-8 border-t border-[var(--color-border)]">
            <h2 className="text-xl font-semibold text-white mb-6">Related Posts</h2>
            <div className="grid gap-4">
              {relatedPosts.map((related: any) => (
                <Link
                  key={related.slug}
                  href={`/blog/${related.slug}`}
                  className="block rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-4 hover:border-[var(--color-accent)] transition-colors"
                >
                  <p className="font-medium text-white mb-1">{related.title}</p>
                  <p className="text-sm text-[var(--color-text-secondary)] line-clamp-2">{related.excerpt}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-xs text-[var(--color-accent)]">{related.author_name}</span>
                    <span className="text-xs text-[var(--color-text-secondary)]">&middot; {related.reading_time} min read</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="mt-12 rounded-xl border border-[var(--color-accent)]/30 bg-[var(--color-accent)]/5 p-6 text-center">
          <p className="text-lg font-semibold text-white mb-2">See who&apos;s visiting your website</p>
          <p className="text-sm text-[var(--color-text-secondary)] mb-4">Person-level identification. 14-day free trial. No credit card.</p>
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
