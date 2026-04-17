'use client';

import Link from 'next/link';
import { Suspense } from 'react';
import FilterURLSync from '../../components/charts/FilterURLSync';
import FilterBar from '../../components/charts/FilterBar';
import VisitorGlobe from '../../components/charts/VisitorGlobe';
import { ArrowLeft } from 'lucide-react';

export default function ChartsLabPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      <Suspense fallback={null}>
        <FilterURLSync />
      </Suspense>

      <div className="mb-6 flex items-start justify-between gap-4 flex-wrap">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-[11px] uppercase tracking-wider mb-3">
            Experimental
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-2">
            Visitor globe &mdash; lab
          </h1>
          <p className="text-muted-foreground max-w-2xl text-sm">
            Proof-of-concept geo visualization. Not part of the main dashboard &mdash; pins don&apos;t
            pin cleanly to country geometry on rotate, and clustering doesn&apos;t always tell the
            story. Iterating here instead.
          </p>
        </div>
        <Link
          href="/charts"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to /charts
        </Link>
      </div>

      <FilterBar />

      <div className="mt-8">
        <VisitorGlobe />
      </div>
    </div>
  );
}
