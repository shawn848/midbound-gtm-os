'use client';

import { useState } from 'react';
import PlaybookCard from './PlaybookCard';
import { Button } from '@/components/ui/button';
import type { Playbook } from '@/lib/playbooks';

interface PlaybookGridProps {
  playbooks: Playbook[];
  categories: { key: string; label: string }[];
}

export default function PlaybookGrid({ playbooks, categories }: PlaybookGridProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filtered = activeCategory
    ? playbooks.filter((p) => p.category === activeCategory)
    : playbooks;

  return (
    <div>
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

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((playbook) => (
          <PlaybookCard key={playbook.slug} playbook={playbook} />
        ))}
      </div>
    </div>
  );
}
