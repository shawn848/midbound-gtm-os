'use client';

import { useState } from 'react';
import Link from 'next/link';

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
      <div className="mb-8 max-w-md mx-auto">
        <input
          type="text"
          placeholder="Search terms..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-2.5 text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-secondary)]/50 focus:border-[var(--color-accent)] focus:outline-none transition-colors"
        />
      </div>

      {/* Category filter */}
      <nav className="mb-12 flex flex-wrap justify-center gap-2">
        <button
          onClick={() => setActiveCategory(null)}
          className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer ${
            activeCategory === null
              ? 'bg-[var(--color-accent)] border-[var(--color-accent)] text-white'
              : 'border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-secondary)] hover:border-[var(--color-accent)]'
          }`}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() =>
              setActiveCategory(activeCategory === cat ? null : cat)
            }
            className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer ${
              activeCategory === cat
                ? 'bg-[var(--color-accent)] border-[var(--color-accent)] text-white'
                : 'border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-secondary)] hover:border-[var(--color-accent)]'
            }`}
          >
            {categoryLabels[cat] || cat}
          </button>
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
            <h2 className="text-xl font-semibold text-[var(--color-text-primary)] mb-6 flex items-center gap-3">
              <span className="inline-block w-1 h-6 rounded-full bg-[var(--color-accent)]" />
              {categoryLabels[cat] || cat}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {terms.map((term) => (
                <Link
                  key={term.slug}
                  href={`/glossary/${term.slug}`}
                  className="group block rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 shadow-sm transition-all hover:border-[var(--color-accent)] hover:shadow-md"
                >
                  <h3 className="text-base font-semibold text-[var(--color-text-primary)] mb-1.5 group-hover:text-[var(--color-accent)] transition-colors">
                    {term.title}
                  </h3>
                  <p className="text-sm text-[var(--color-text-secondary)] line-clamp-2">
                    {term.short_description}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        );
      })}
    </>
  );
}
