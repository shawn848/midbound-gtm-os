'use client';

import { useState, useMemo } from 'react';
import PlaybookCard from './PlaybookCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, ChevronDown } from 'lucide-react';
import type { Playbook } from '@/lib/playbooks';

interface PlaybookGridProps {
  playbooks: Playbook[];
  categories: { key: string; label: string }[];
}

const BATCH_SIZE = 6;

export default function PlaybookGrid({ playbooks, categories }: PlaybookGridProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [visibleCount, setVisibleCount] = useState(BATCH_SIZE);

  const filtered = useMemo(() => {
    let result = playbooks;
    if (activeCategory) {
      result = result.filter((p) => p.category === activeCategory);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.excerpt.toLowerCase().includes(q)
      );
    }
    return result;
  }, [playbooks, activeCategory, search]);

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  return (
    <div>
      {/* Search */}
      <div className="mb-6 max-w-md relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search playbooks..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setVisibleCount(BATCH_SIZE);
          }}
          className="pl-9"
        />
      </div>

      {/* Category filters */}
      <div className="flex flex-wrap gap-2 mb-8">
        <Button
          variant={activeCategory === null ? 'default' : 'outline'}
          size="sm"
          onClick={() => {
            setActiveCategory(null);
            setVisibleCount(BATCH_SIZE);
          }}
        >
          All ({playbooks.length})
        </Button>
        {categories.map((cat) => {
          const count = playbooks.filter((p) => p.category === cat.key).length;
          return (
            <Button
              key={cat.key}
              variant={activeCategory === cat.key ? 'default' : 'outline'}
              size="sm"
              onClick={() => {
                setActiveCategory(cat.key);
                setVisibleCount(BATCH_SIZE);
              }}
            >
              {cat.label} ({count})
            </Button>
          );
        })}
      </div>

      {/* Results */}
      {search.trim() && (
        <p className="text-sm text-muted-foreground mb-6">
          {filtered.length} result{filtered.length !== 1 ? 's' : ''}
        </p>
      )}

      {visible.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((playbook, i) => (
            <div
              key={playbook.slug}
              className="animate-in fade-in slide-in-from-bottom-4"
              style={{
                animationDelay: `${(i % BATCH_SIZE) * 80}ms`,
                animationFillMode: 'both',
                animationDuration: '400ms',
              }}
            >
              <PlaybookCard playbook={playbook} />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No playbooks match your search.</p>
        </div>
      )}

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
    </div>
  );
}
