'use client';

import { useState } from 'react';
import PostCard from './PostCard';
import type { Post } from '@/lib/posts';

interface BlogGridProps {
  posts: Post[];
}

const clusterLabels: Record<string, string> = {
  'visitor-identification': 'Visitor Identification',
  'abm-evolution': 'ABM Evolution',
  'founder-insights': 'Founder Insights',
  'sales-strategy': 'Sales Strategy',
};

export default function BlogGrid({ posts }: BlogGridProps) {
  const [activeCluster, setActiveCluster] = useState<string | null>(null);
  const clusters = [...new Set(posts.map((p) => p.keyword_cluster).filter(Boolean))];

  const filtered = activeCluster
    ? posts.filter((p) => p.keyword_cluster === activeCluster)
    : posts;

  return (
    <>
      {clusters.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-10">
          <button
            onClick={() => setActiveCluster(null)}
            className={`rounded-md border px-3 py-1 text-xs font-medium transition-colors cursor-pointer ${
              activeCluster === null
                ? 'bg-[var(--color-accent)] border-[var(--color-accent)] text-white'
                : 'bg-[var(--color-surface)] border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-accent)]'
            }`}
          >
            All
          </button>
          {clusters.map((cluster) => (
            <button
              key={cluster}
              onClick={() =>
                setActiveCluster(activeCluster === cluster ? null : cluster)
              }
              className={`rounded-md border px-3 py-1 text-xs font-medium transition-colors cursor-pointer ${
                activeCluster === cluster
                  ? 'bg-[var(--color-accent)] border-[var(--color-accent)] text-white'
                  : 'bg-[var(--color-surface)] border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-accent)]'
              }`}
            >
              {clusterLabels[cluster] || cluster}
            </button>
          ))}
        </div>
      )}

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <p className="text-[var(--color-text-secondary)]">
          No posts in this cluster yet.
        </p>
      )}
    </>
  );
}
