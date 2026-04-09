import type { Metadata } from 'next';
import { getAllPlaybooks, getPlaybooksByCategory, getSortedCategories, getCategoryLabel } from '../lib/playbooks';
import PlaybookGrid from '../components/PlaybookGrid';

export const metadata: Metadata = {
  title: 'Playbooks — MidBound',
  description: 'Step-by-step playbooks for setting up MidBound, building outreach workflows, configuring your CRM, and measuring results.',
};

export default function PlaybooksIndexPage() {
  const playbooks = getAllPlaybooks();
  const grouped = getPlaybooksByCategory();
  const sortedKeys = getSortedCategories(grouped);
  const categories = sortedKeys.map((key) => ({
    key,
    label: getCategoryLabel(key),
  }));

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
      <div className="mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--color-text-primary)] mb-4">
          Playbooks
        </h1>
        <p className="text-[var(--color-text-secondary)] mb-2">
          Actionable, step-by-step guides. Set up your tools, build workflows, and start closing deals from identified visitors.
        </p>
        <p className="text-sm text-[var(--color-text-secondary)]">
          {playbooks.length} playbooks
        </p>
      </div>

      <PlaybookGrid playbooks={playbooks} categories={categories} />
    </div>
  );
}
