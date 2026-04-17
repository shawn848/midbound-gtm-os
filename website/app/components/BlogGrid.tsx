'use client';

import { useState, useMemo } from 'react';
import PostCard from './PostCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, ChevronDown } from 'lucide-react';
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

const BATCH_SIZE = 6;

export default function BlogGrid({ posts }: BlogGridProps) {
  const [activeCluster, setActiveCluster] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [visibleCount, setVisibleCount] = useState(BATCH_SIZE);

  const clusters = [...new Set(posts.map((p) => p.keyword_cluster).filter(Boolean))];

  const filtered = useMemo(() => {
    let result = posts;
    if (activeCluster) {
      result = result.filter((p) => p.keyword_cluster === activeCluster);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.excerpt.toLowerCase().includes(q) ||
          p.pillar.toLowerCase().includes(q)
      );
    }
    return result;
  }, [posts, activeCluster, search]);

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  const handleFilterChange = (cluster: string | null) => {
    setActiveCluster(cluster);
    setVisibleCount(BATCH_SIZE);
  };

  return (
    <>
      {/* Search bar */}
      <div className="mb-6 max-w-md relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search posts..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setVisibleCount(BATCH_SIZE);
          }}
          className="pl-9"
        />
      </div>

      {/* Cluster filters */}
      {clusters.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-10">
          <Button
            variant={activeCluster === null ? 'default' : 'outline'}
            size="sm"
            onClick={() => handleFilterChange(null)}
          >
            All ({posts.length})
          </Button>
          {clusters.map((cluster) => {
            const count = posts.filter((p) => p.keyword_cluster === cluster).length;
            return (
              <Button
                key={cluster}
                variant={activeCluster === cluster ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleFilterChange(activeCluster === cluster ? null : cluster)}
              >
                {clusterLabels[cluster] || cluster} ({count})
              </Button>
            );
          })}
        </div>
      )}

      {/* Results count */}
      {search.trim() && (
        <p className="text-sm text-muted-foreground mb-6">
          {filtered.length} result{filtered.length !== 1 ? 's' : ''} for &ldquo;{search}&rdquo;
        </p>
      )}

      {/* Cards with stagger animation */}
      {visible.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visible.map((post, i) => (
            <div
              key={post.slug}
              className="animate-in fade-in slide-in-from-bottom-4"
              style={{
                animationDelay: `${(i % BATCH_SIZE) * 80}ms`,
                animationFillMode: 'both',
                animationDuration: '400ms',
              }}
            >
              <PostCard post={post} />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            {search.trim() ? 'No posts match your search.' : 'No posts in this cluster yet.'}
          </p>
        </div>
      )}

      {/* Load more */}
      {hasMore && (
        <div className="mt-10 text-center">
          <Button
            variant="outline"
            size="lg"
            onClick={() => setVisibleCount((c) => c + BATCH_SIZE)}
            className="gap-2"
          >
            <ChevronDown className="h-4 w-4" />
            Show more ({filtered.length - visibleCount} remaining)
          </Button>
        </div>
      )}
    </>
  );
}
