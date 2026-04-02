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

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className="mx-auto max-w-3xl px-4 sm:px-6 py-12 sm:py-20">
        {/* Back link */}
        <Link
          href="/blog"
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
          All Posts
        </Link>

        {/* Header */}
        <header className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="inline-block rounded-md bg-[var(--color-accent)]/10 px-2.5 py-0.5 text-xs font-medium text-[var(--color-accent)]">
              {post.pillar}
            </span>
            <span className="text-sm text-[var(--color-text-secondary)]">
              {post.reading_time} min read
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--color-text-primary)] mb-4">
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
      </article>
    </>
  );
}
