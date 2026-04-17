import PlaybookCard from './PlaybookCard';
import type { Playbook } from '@/lib/playbooks';

interface PlaybookGridProps {
  playbooks: Playbook[];
}

export default function PlaybookGrid({ playbooks }: PlaybookGridProps) {
  if (playbooks.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No playbooks yet.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {playbooks.map((playbook, i) => (
        <div
          key={playbook.slug}
          className="animate-in fade-in slide-in-from-bottom-4"
          style={{
            animationDelay: `${i * 60}ms`,
            animationFillMode: 'both',
            animationDuration: '420ms',
          }}
        >
          <PlaybookCard playbook={playbook} />
        </div>
      ))}
    </div>
  );
}
