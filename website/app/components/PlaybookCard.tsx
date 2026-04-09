import Link from 'next/link';
import type { Playbook } from '@/lib/playbooks';

interface PlaybookCardProps {
  playbook: Playbook;
}

const difficultyColors: Record<string, string> = {
  beginner: 'bg-green-500/10 text-green-400',
  intermediate: 'bg-yellow-500/10 text-yellow-400',
  advanced: 'bg-red-500/10 text-red-400',
};

export default function PlaybookCard({ playbook }: PlaybookCardProps) {
  return (
    <Link href={`/playbooks/${playbook.slug}`} className="group block">
      <article className="h-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-sm transition-all hover:border-[var(--color-text-secondary)] hover:shadow-md">
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          <span
            className={`inline-block rounded-md px-2.5 py-0.5 text-xs font-medium ${
              difficultyColors[playbook.difficulty] || 'bg-[var(--color-accent)]/10 text-[var(--color-accent)]'
            }`}
          >
            {playbook.difficulty}
          </span>
          <span className="text-xs text-[var(--color-text-secondary)]">
            {playbook.time_to_complete}
          </span>
        </div>

        <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-2 group-hover:text-[var(--color-accent)] transition-colors line-clamp-2">
          {playbook.title}
        </h3>

        <p className="text-sm text-[var(--color-text-secondary)] mb-4 line-clamp-3">
          {playbook.excerpt}
        </p>

        <div className="flex flex-wrap gap-1.5 mt-auto">
          {playbook.tools_needed.map((tool) => (
            <span
              key={tool}
              className="inline-block rounded-full bg-[var(--color-canvas)] px-2 py-0.5 text-xs text-[var(--color-text-secondary)] border border-[var(--color-border)]"
            >
              {tool}
            </span>
          ))}
        </div>
      </article>
    </Link>
  );
}
