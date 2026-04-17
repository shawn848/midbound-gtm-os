import type { Metadata } from 'next';
import { getAllPlaybooks } from '../lib/playbooks';
import PlaybookGrid from '../components/PlaybookGrid';
import { Badge } from '@/components/ui/badge';

export const metadata: Metadata = {
  title: 'Playbooks — Midbound',
  description: 'Step-by-step playbooks for turning identified website visitors into pipeline. LinkedIn, email, and Clay-powered personalization workflows.',
};

export default function PlaybooksIndexPage() {
  const playbooks = getAllPlaybooks();

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
      <div className="mb-12">
        <Badge variant="outline" className="text-primary border-primary/30 mb-3">
          {playbooks.length} playbook{playbooks.length === 1 ? '' : 's'}
        </Badge>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-4">
          Playbooks
        </h1>
        <p className="text-muted-foreground max-w-2xl">
          Step-by-step guides for turning identified website visitors into pipeline. Wired for the tools your team already uses.
        </p>
      </div>

      <PlaybookGrid playbooks={playbooks} />
    </div>
  );
}
