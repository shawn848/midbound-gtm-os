'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import GithubSlugger from 'github-slugger';

interface PostTOCProps {
  sections: string[];
}

function slugifySections(labels: string[]): string[] {
  const slugger = new GithubSlugger();
  return labels.map((label) => slugger.slug(label));
}

export default function PostTOC({ sections }: PostTOCProps) {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    if (sections.length === 0) return;
    const ids = slugifySections(sections);
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visible) setActiveId(visible.target.id);
      },
      { rootMargin: '-30% 0px -60% 0px', threshold: [0, 0.25, 0.5, 1] }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [sections]);

  if (sections.length === 0) return null;
  const slugs = slugifySections(sections);

  return (
    <aside className="hidden xl:flex fixed right-6 top-1/2 -translate-y-1/2 z-40 flex-col gap-2 max-w-[180px]">
      {sections.map((label, i) => {
        const id = slugs[i];
        const isActive = activeId === id;
        return (
          <motion.a
            key={`${id}-${i}`}
            href={`#${id}`}
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05, duration: 0.4, ease: 'easeOut' }}
            whileHover={{
              x: -4,
              scale: 1.04,
              boxShadow: '0 0 14px rgba(255,255,255,0.3), 0 0 22px rgba(232,119,46,0.5)',
            }}
            className={`inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-medium transition-colors ${
              isActive
                ? 'border-primary bg-primary text-primary-foreground shadow-[0_0_16px_rgba(232,119,46,0.55)]'
                : 'border-primary/30 bg-background/80 backdrop-blur text-primary hover:border-primary/60'
            }`}
          >
            <span className="truncate">{label}</span>
          </motion.a>
        );
      })}
    </aside>
  );
}
