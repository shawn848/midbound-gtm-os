'use client';

import { Suspense } from 'react';
import FilterURLSync from '../components/charts/FilterURLSync';
import FilterBar from '../components/charts/FilterBar';
import KpiCards from '../components/charts/KpiCards';
import TitlePageMatrix from '../components/charts/TitlePageMatrix';
import RegionRoleBars from '../components/charts/RegionRoleBars';
import TopCompaniesBar from '../components/charts/TopCompaniesBar';
import BehaviorHeatmap from '../components/charts/BehaviorHeatmap';
import VisitorTrend from '../components/charts/VisitorTrend';
import VisitorTable from '../components/charts/VisitorTable';
import { Card, CardContent } from '@/components/ui/card';
import { buttonVariants } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export default function ChartsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      <Suspense fallback={null}>
        <FilterURLSync />
      </Suspense>

      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-2">
          Visitor analytics
        </h1>
        <p className="text-muted-foreground max-w-2xl">
          Every visit, who they are, which pages they hit. Filter by role, region, or company
          &mdash; every chart below redraws from the same set.
        </p>
      </div>

      <FilterBar />

      <div className="mt-8 space-y-8">
        <KpiCards />

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <TitlePageMatrix />
          </div>
          <div className="lg:col-span-1">
            <RegionRoleBars />
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <BehaviorHeatmap />
          </div>
          <div className="lg:col-span-1">
            <VisitorTrend />
          </div>
        </div>

        <TopCompaniesBar />
        <VisitorTable />
      </div>

      <section className="mt-16">
        <Card className="bg-primary/5 border-primary/20 glow-card">
          <CardContent className="p-8 sm:p-10 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
              Want this dashboard on your own traffic?
            </h2>
            <p className="text-sm text-muted-foreground max-w-lg mx-auto mb-6">
              14-day free trial. No credit card. Install the script, start identifying
              visitors by name within minutes.
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
