import Link from 'next/link';
import { getAllPosts } from '../lib/posts';
import BlogGrid from '../components/BlogGrid';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'All Posts — MidBound Blog',
  description: 'Browse all MidBound blog posts on person-level identification, ABM evolution, GEO, AEO, B2B sales strategy, and startup growth.',
};

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
      <div className="mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4">
          All Posts
        </h1>
        <p className="text-[var(--color-text-secondary)] mb-6">
          Insights on person-level GTM, B2B sales, AEO, GEO, and startup growth.
        </p>
      </div>

      <BlogGrid posts={posts} />

      <div className="mt-12 text-center">
        <Link
          href="/glossary"
          className="inline-block rounded-lg border border-[var(--color-accent)]/30 bg-[var(--color-accent)]/5 px-5 py-2.5 text-sm font-medium text-[var(--color-accent)] hover:bg-[var(--color-accent)]/10 transition-colors"
        >
          Browse Glossary (45+ terms)
        </Link>
      </div>
    </div>
  );
}
