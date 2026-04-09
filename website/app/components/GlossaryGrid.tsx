'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

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

  const query = search.toLowerCase();

  const filteredCategories = activeCategory
    ? categories.filter((c) => c === activeCategory)
    : categories;

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
          All
        </Button>
        {categories.map((cat) => (
          <Button
            key={cat}
            variant={activeCategory === cat ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
          >
            {categoryLabels[cat] || cat}
          </Button>
        ))}
      </nav>

      {/* Terms by category */}
      {filteredCategories.map((cat) => {
        const terms = (grouped[cat] || []).filter(
          (term) =>
            !query ||
            term.title.toLowerCase().includes(query) ||
            term.short_description.toLowerCase().includes(query)
        );

        if (terms.length === 0) return null;

        return (
          <section key={cat} id={cat} className="mb-12 scroll-mt-20">
            <h2 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-3">
              <span className="inline-block w-1 h-6 rounded-full bg-primary" />
              {categoryLabels[cat] || cat}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {terms.map((term) => (
                <Link key={term.slug} href={`/glossary/${term.slug}`} className="group block">
                  <Card className="h-full bg-card border-border hover:border-primary/50 transition-all glow-card">
                    <CardContent className="p-5">
                      <h3 className="text-base font-semibold text-foreground mb-1.5 group-hover:text-primary transition-colors">
                        {term.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {term.short_description}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        );
      })}
    </>
  );
}
