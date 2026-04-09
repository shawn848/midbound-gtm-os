import type { Metadata } from 'next';
import { getAllHelpArticles, getHelpByCategory, getSortedCategories, getCategoryLabel } from '../lib/helpCenter';
import HelpCenterGrid from '../components/HelpCenterGrid';
import { Badge } from '@/components/ui/badge';

export const metadata: Metadata = {
  title: 'Help Center — MidBound',
  description: 'Get help with MidBound. Setup guides, feature explanations, integration docs, and troubleshooting.',
};

export default function HelpCenterIndexPage() {
  const articles = getAllHelpArticles();
  const grouped = getHelpByCategory();
  const sortedKeys = getSortedCategories(grouped);
  const categories = sortedKeys.map((key) => ({
    key,
    label: getCategoryLabel(key),
  }));

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
      <div className="mb-12">
        <Badge variant="outline" className="text-primary border-primary/30 mb-3">
          {articles.length} articles
        </Badge>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-4">
          Help Center
        </h1>
        <p className="text-muted-foreground">
          Everything you need to get started, set up integrations, and get the most from MidBound.
        </p>
      </div>

      <HelpCenterGrid articles={articles} categories={categories} />
    </div>
  );
}
