'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Search, ChevronRight } from 'lucide-react';
import type { HelpArticle } from '@/lib/helpCenter';

interface HelpCenterGridProps {
  articles: HelpArticle[];
  categories: { key: string; label: string }[];
}

export default function HelpCenterGrid({ articles, categories }: HelpCenterGridProps) {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

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
          All
        </Button>
        {categories.map((cat) => (
          <Button
            key={cat.key}
            variant={activeCategory === cat.key ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveCategory(cat.key)}
          >
            {cat.label}
          </Button>
        ))}
      </div>

      {/* Grouped articles */}
      {orderedCategories.map((cat) => (
        <section key={cat.key} className="mb-10">
          <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <span className="h-5 w-1 rounded-full bg-primary" />
            {cat.label}
          </h2>
          <div className="grid gap-3">
            {grouped[cat.key].map((article) => (
              <Link key={article.slug} href={`/help-center/${article.slug}`}>
                <Card className="bg-card border-border hover:border-primary/50 transition-all group">
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
          <Separator className="mt-8" />
        </section>
      ))}

      {filtered.length === 0 && (
        <div className="text-center py-16">
          <p className="text-muted-foreground">No articles found. Try a different search term.</p>
        </div>
      )}
    </div>
  );
}
