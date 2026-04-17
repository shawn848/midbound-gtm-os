'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Search, ChevronDown, ChevronUp } from 'lucide-react';

interface Term {
  title: string;
  slug: string;
  category: string;
  short_description: string;
}

interface GlossaryGridProps {
  grouped: Record<string, Term[]>;
  categories: string[];
  categoryLabels: Record<string, string>;
}

export default function GlossaryGrid({
  grouped,
  categories,
  categoryLabels,
}: GlossaryGridProps) {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    () => new Set(categories.slice(0, 1))
  );

  const query = search.toLowerCase();

  const filteredCategories = activeCategory
    ? categories.filter((c) => c === activeCategory)
    : categories;

  const isExpanded = (cat: string) => {
    if (search.trim()) return true; // expand all when searching
    return expandedSections.has(cat);
  };

  const toggleSection = (cat: string) => {
    setExpandedSections((prev) => {
      const next = new Set(prev);
      if (next.has(cat)) {
        next.delete(cat);
      } else {
        next.add(cat);
      }
      return next;
    });
  };

  const totalAll = Object.values(grouped).reduce((s, t) => s + t.length, 0);

  return (
    <>
      {/* Search */}
      <div className="mb-8 max-w-md mx-auto relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search terms..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9"
        />
      </div>

      {/* Category filter */}
      <nav className="mb-12 flex flex-wrap justify-center gap-2">
        <Button
          variant={activeCategory === null ? 'default' : 'outline'}
          size="sm"
          onClick={() => setActiveCategory(null)}
        >
          All ({totalAll})
        </Button>
        {categories.map((cat) => (
          <Button
            key={cat}
            variant={activeCategory === cat ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
          >
            {categoryLabels[cat] || cat} ({(grouped[cat] || []).length})
          </Button>
        ))}
      </nav>

      {/* Collapsible category sections */}
      <div className="space-y-3">
        {filteredCategories.map((cat) => {
          const terms = (grouped[cat] || []).filter(
            (term) =>
              !query ||
              term.title.toLowerCase().includes(query) ||
              term.short_description.toLowerCase().includes(query)
          );

          if (terms.length === 0) return null;

          const expanded = isExpanded(cat);

          return (
            <div
              key={cat}
              id={cat}
              className="rounded-xl border border-border overflow-hidden bg-card/50 scroll-mt-20"
            >
              {/* Section header */}
              <button
                onClick={() => toggleSection(cat)}
                className="w-full flex items-center justify-between p-4 hover:bg-secondary/50 transition-colors text-left"
              >
                <div className="flex items-center gap-3">
                  <span className="inline-block w-1 h-6 rounded-full bg-primary shrink-0" />
                  <span className="font-semibold text-foreground">
                    {categoryLabels[cat] || cat}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {terms.length} term{terms.length !== 1 ? 's' : ''}
                  </span>
                </div>
                {expanded ? (
                  <ChevronUp className="h-4 w-4 text-muted-foreground shrink-0" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0" />
                )}
              </button>

              {/* Expandable grid */}
              {expanded && (
                <div className="px-4 pb-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {terms.map((term, i) => (
                      <Link
                        key={term.slug}
                        href={`/glossary/${term.slug}`}
                        className="group block animate-in fade-in slide-in-from-bottom-2"
                        style={{
                          animationDelay: `${i * 40}ms`,
                          animationFillMode: 'both',
                          animationDuration: '300ms',
                        }}
                      >
                        <Card className="h-full bg-card border-border/50 hover:border-primary/50 transition-all glow-card">
                          <CardContent className="p-4">
                            <h3 className="text-sm font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                              {term.title}
                            </h3>
                            <p className="text-xs text-muted-foreground line-clamp-2">
                              {term.short_description}
                            </p>
                          </CardContent>
                        </Card>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Empty state */}
      {filteredCategories.every((cat) => {
        const terms = (grouped[cat] || []).filter(
          (term) =>
            !query ||
            term.title.toLowerCase().includes(query) ||
            term.short_description.toLowerCase().includes(query)
        );
        return terms.length === 0;
      }) && (
        <div className="text-center py-16">
          <p className="text-muted-foreground">No terms found. Try a different search.</p>
        </div>
      )}
    </>
  );
}
