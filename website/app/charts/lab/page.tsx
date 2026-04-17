'use client';

import Link from 'next/link';
import { Suspense } from 'react';
import { ArrowLeft } from 'lucide-react';
import FilterURLSync from '../../components/charts/FilterURLSync';
import VisitorGlobe from '../../components/charts/VisitorGlobe';
import IdentificationFunnel from '../../components/lab/IdentificationFunnel';
import LiveIdFeed from '../../components/lab/LiveIdFeed';
import VisitToDealFlow from '../../components/lab/VisitToDealFlow';
import RoiCalculator from '../../components/lab/RoiCalculator';
import PipelineImpactBars from '../../components/lab/PipelineImpactBars';

export default function ChartsLabPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      <Suspense fallback={null}>
        <FilterURLSync />
      </Suspense>

      <header className="mb-10 flex items-start justify-between gap-4 flex-wrap">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-[11px] uppercase tracking-wider mb-3">
            Pitch demo
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-2">
            See a pitch, not a dashboard.
          </h1>
          <p className="text-muted-foreground max-w-2xl text-sm sm:text-base">
            A story in six scrolls &mdash; traffic in, pipeline out. Same mock pool as /charts,
            reframed around the question anyone actually pays to answer: &ldquo;what is
            MidBound worth to me?&rdquo;
          </p>
        </div>
        <Link
          href="/charts"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to /charts
        </Link>
      </header>

      <div className="space-y-8 sm:space-y-10">
        <section id="funnel" className="scroll-mt-20">
          <IdentificationFunnel />
        </section>

        <section id="feed" className="scroll-mt-20">
          <LiveIdFeed />
        </section>

        <section id="workflow" className="scroll-mt-20">
          <VisitToDealFlow />
        </section>

        <section id="roi" className="scroll-mt-20">
          <RoiCalculator />
        </section>

        <section id="impact" className="scroll-mt-20">
          <PipelineImpactBars />
        </section>

        <section id="globe" className="scroll-mt-20">
          <div className="mb-3">
            <h2 className="text-xl sm:text-2xl font-bold text-foreground">
              Where your next meeting is coming from
            </h2>
            <p className="text-sm text-muted-foreground max-w-2xl">
              Geography layer over the same pool &mdash; every dot is a session you&rsquo;d see
              on the live feed. Garnish, not the point.
            </p>
          </div>
          <VisitorGlobe />
        </section>
      </div>
    </div>
  );
}
