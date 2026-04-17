'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Search, ChevronRight, ChevronDown, ChevronUp } from 'lucide-react';
import type { HelpArticle } from '@/lib/helpCenter';

interface HelpCenterGridProps {
  articles: HelpArticle[];
  categories: { key: string; label: string }[];
}

export default function HelpCenterGrid({ articles, categories }: HelpCenterGridProps) {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());

  const filtered = articles.filter((a) => {
    const matchSearch =
      search === '' ||
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.short_answer.toLowerCase().includes(search.toLowerCase());
    const matchCat = activeCategory === null || a.category === activeCategory;
    return matchSearch && matchCat;
  });

  const grouped: Record<string, HelpArticle[]> = {};
  for (const article of filtered) {
    if (!grouped[article.category]) grouped[article.category] = [];
    grouped[article.category].push(article);
  }

  const orderedCategories = categories.filter((c) => grouped[c.key]);

  // When searching, expand all sections. Otherwise use toggle state.
  const isExpanded = (key: string) => {
    if (search.trim()) return true;
    // Default: first section expanded
    if (expandedSections.size === 0 && orderedCategories[0]?.key === key) return true;
    return expandedSections.has(key);
  };

  const toggleSection = (key: string) => {
    setExpandedSections((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  };

  return (
    <div>
      {/* Search */}
      <div className="mb-8 relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search help articles..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9"
        />
      </div>

      {/* Category filters */}
      <div className="flex flex-wrap gap-2 mb-8">
        <Button
          variant={activeCategory === null ? 'default' : 'outline'}
          size="sm"
          onClick={() => setActiveCategory(null)}
        >
          All ({articles.length})
        </Button>
        {categories.map((cat) => {
          const count = articles.filter((a) => a.category === cat.key).length;
          return (
            <Button
              key={cat.key}
              variant={activeCategory === cat.key ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveCategory(activeCategory === cat.key ? null : cat.key)}
            >
              {cat.label} ({count})
            </Button>
          );
        })}
      </div>

      {/* Collapsible category sections */}
      <div className="space-y-3">
        {orderedCategories.map((cat) => {
          const expanded = isExpanded(cat.key);
          const sectionArticles = grouped[cat.key];
          return (
            <div
              key={cat.key}
              className="rounded-xl border border-border overflow-hidden bg-card/50"
            >
              {/* Category header — clickable to expand/collapse */}
              <button
                onClick={() => toggleSection(cat.key)}
                className="w-full flex items-center justify-between p-4 hover:bg-secondary/50 transition-colors text-left"
              >
                <div className="flex items-center gap-3">
                  <span className="h-5 w-1 rounded-full bg-primary shrink-0" />
                  <span className="font-semibold text-foreground">{cat.label}</span>
                  <span className="text-xs text-muted-foreground">
                    {sectionArticles.length} article{sectionArticles.length !== 1 ? 's' : ''}
                  </span>
                </div>
                {expanded ? (
                  <ChevronUp className="h-4 w-4 text-muted-foreground shrink-0" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0" />
                )}
              </button>

              {/* Expandable content */}
              {expanded && (
                <div className="px-4 pb-4 space-y-2">
                  {sectionArticles.map((article, i) => (
                    <Link
                      key={article.slug}
                      href={`/help-center/${article.slug}`}
                      className="animate-in fade-in slide-in-from-bottom-2"
                      style={{
                        animationDelay: `${i * 50}ms`,
                        animationFillMode: 'both',
                        animationDuration: '300ms',
                        display: 'block',
                      }}
                    >
                      <Card className="bg-card border-border/50 hover:border-primary/50 transition-all group">
                        <CardContent className="p-4 flex items-center justify-between">
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-foreground mb-0.5 group-hover:text-primary transition-colors">
                              {article.title}
                            </p>
                            <p className="text-sm text-muted-foreground line-clamp-1">
                              {article.short_answer}
                            </p>
                          </div>
                          <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary shrink-0 ml-3 transition-colors" />
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16">
          <p className="text-muted-foreground">No articles found. Try a different search term.</p>
        </div>
      )}
    </div>
  );
}
