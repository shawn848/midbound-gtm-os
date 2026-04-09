'use client';

import { useState } from 'react';
import PostCard from './PostCard';
import { Button } from '@/components/ui/button';
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
          <Button
            variant={activeCluster === null ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveCluster(null)}
          >
            All
          </Button>
          {clusters.map((cluster) => (
            <Button
              key={cluster}
              variant={activeCluster === cluster ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveCluster(activeCluster === cluster ? null : cluster)}
            >
              {clusterLabels[cluster] || cluster}
            </Button>
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
        <p className="text-muted-foreground">
          No posts in this cluster yet.
        </p>
      )}
    </>
  );
}
