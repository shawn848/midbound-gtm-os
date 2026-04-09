import type { Metadata } from 'next';
import {
  getTermsByCategory,
  getSortedCategories,
} from '../lib/glossary';
import GlossaryGrid from '../components/GlossaryGrid';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { buttonVariants } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Glossary — MidBound Blog',
  description:
    'Everything B2B teams need to know about website visitor identification, AEO, GEO, person-level marketing, and modern revenue operations. 45+ terms defined.',
};

const categoryLabelMap: Record<string, string> = {
  'search-optimization': 'Search & AI Optimization',
  'analytics-tools': 'Analytics & SEO Tools',
  'visitor-identification': 'Website Visitor Identification',
  'b2b-marketing': 'B2B Marketing',
  'crm-integrations': 'CRM & Integrations',
  'metrics': 'Metrics & KPIs',
};

export default function GlossaryPage() {
  const grouped = getTermsByCategory();
  const categories = getSortedCategories(grouped);

  const totalTerms = Object.values(grouped).reduce(
    (sum, terms) => sum + terms.length,
    0,
  );

  const serializedGrouped: Record<string, { title: string; slug: string; category: string; short_description: string }[]> = {};
  for (const cat of categories) {
    serializedGrouped[cat] = grouped[cat].map((t) => ({
      title: t.title,
      slug: t.slug,
      category: t.category,
      short_description: t.short_description,
    }));
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
      {/* Hero */}
      <section className="mb-16 text-center">
        <Badge variant="outline" className="text-primary border-primary/30 mb-4">
          {totalTerms} terms
        </Badge>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground mb-4">
          MidBound Glossary
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Everything B2B teams need to know about visitor identification, AEO,
          GEO, and modern marketing.
        </p>
      </section>

      <GlossaryGrid
        grouped={serializedGrouped}
        categories={categories}
        categoryLabels={categoryLabelMap}
      />

      {/* Bottom CTA */}
      <section className="mt-16">
        <Card className="bg-primary/5 border-primary/20 glow-card">
          <CardContent className="p-8 text-center">
            <p className="text-lg font-semibold text-foreground mb-2">
              Ready to see who visits your website?
            </p>
            <p className="text-sm text-muted-foreground mb-4">
              Person-level identification. 14-day free trial. No credit card.
            </p>
            <a
              href="https://midbound.ai/register"
              target="_blank"
              rel="noopener noreferrer"
              className={buttonVariants({ size: 'lg', className: 'cta-glow' })}
            >
              Start Free Trial
              <ArrowRight className="h-4 w-4 ml-1" />
            </a>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
