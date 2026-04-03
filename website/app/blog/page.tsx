import Link from 'next/link';
import { getAllPosts } from '../lib/posts';
import PostCard from '../components/PostCard';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'All Posts — MidBound Blog',
  description: 'Browse all MidBound blog posts on person-level identification, ABM evolution, GEO, AEO, B2B sales strategy, and startup growth.',
};

const clusterLabels: Record<string, string> = {
  'visitor-identification': 'Visitor Identification',
  'abm-evolution': 'ABM Evolution',
  'founder-insights': 'Founder Insights',
  'sales-strategy': 'Sales Strategy',
};

export default function BlogIndexPage() {
  const posts = getAllPosts();
  const clusters = [...new Set(posts.map((p) => p.keyword_cluster).filter(Boolean))];

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
      <div className="mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4">
          All Posts
        </h1>
        <p className="text-[var(--color-text-secondary)] mb-6">
          Insights on person-level GTM, B2B sales, AEO, GEO, and startup growth.
        </p>

        {/* Topic clusters */}
        {clusters.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {clusters.map((cluster) => (
              <span
                key={cluster}
                className="rounded-md bg-[var(--color-surface)] border border-[var(--color-border)] px-3 py-1 text-xs font-medium text-[var(--color-text-secondary)]"
              >
                {clusterLabels[cluster] || cluster}
              </span>
            ))}
            <Link
              href="/glossary"
              className="rounded-md bg-[var(--color-accent)]/10 border border-[var(--color-accent)]/30 px-3 py-1 text-xs font-medium text-[var(--color-accent)]"
            >
              Glossary
            </Link>
          </div>
        )}
      </div>

      {posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <p className="text-[var(--color-text-secondary)]">
          No posts yet. Check back soon.
        </p>
      )}
    </div>
  );
}
