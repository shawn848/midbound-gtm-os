'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { HelpArticle } from '@/lib/helpCenter';

interface HelpCenterGridProps {
  articles: HelpArticle[];
  categories: { key: string; label: string }[];
}

export default function HelpCenterGrid({ articles, categories }: HelpCenterGridProps) {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filtered = articles.filter((a) => {
    const matchSearch = search === '' || a.title.toLowerCase().includes(search.toLowerCase()) || a.short_answer.toLowerCase().includes(search.toLowerCase());
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
      <div className="mb-8">
        <input
          type="text"
          placeholder="Search help articles..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-md rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-2.5 text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-secondary)] focus:border-[var(--color-accent)] focus:outline-none"
        />
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
        <button
          onClick={() => setActiveCategory(null)}
          className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
            activeCategory === null
              ? 'bg-[var(--color-accent)] text-white'
              : 'bg-[var(--color-surface)] text-[var(--color-text-secondary)] border border-[var(--color-border)] hover:text-[var(--color-text-primary)]'
          }`}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setActiveCategory(cat.key)}
            className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
              activeCategory === cat.key
                ? 'bg-[var(--color-accent)] text-white'
                : 'bg-[var(--color-surface)] text-[var(--color-text-secondary)] border border-[var(--color-border)] hover:text-[var(--color-text-primary)]'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {orderedCategories.map((cat) => (
        <section key={cat.key} className="mb-10">
          <h2 className="text-lg font-semibold text-[var(--color-text-primary)] mb-4">
            {cat.label}
          </h2>
          <div className="grid gap-3">
            {grouped[cat.key].map((article) => (
              <Link
                key={article.slug}
                href={`/help-center/${article.slug}`}
                className="block rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-4 hover:border-[var(--color-accent)] transition-colors"
              >
                <p className="font-medium text-[var(--color-text-primary)] mb-1">
                  {article.title}
                </p>
                <p className="text-sm text-[var(--color-text-secondary)] line-clamp-2">
                  {article.short_answer}
                </p>
              </Link>
            ))}
          </div>
        </section>
      ))}

      {filtered.length === 0 && (
        <p className="text-[var(--color-text-secondary)] text-center py-12">
          No articles found. Try a different search term.
        </p>
      )}
    </div>
  );
}
