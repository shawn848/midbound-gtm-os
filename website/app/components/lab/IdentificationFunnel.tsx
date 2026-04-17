'use client';

import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useMemo, useRef, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { buildFunnel } from '@/lib/labData';

type Mode = 'with' | 'without';

function formatCount(n: number) {
  return n.toLocaleString('en-US');
}

function formatPct(n: number) {
  if (n >= 0.1) return `${(n * 100).toFixed(0)}%`;
  return `${(n * 100).toFixed(1)}%`;
}

export default function IdentificationFunnel() {
  const [mode, setMode] = useState<Mode>('with');
  const stages = useMemo(() => buildFunnel(15_000), []);
  const max = stages[0].withCount;
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -15% 0px' });
  const reduced = useReducedMotion();

  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <CardTitle className="text-xl sm:text-2xl font-bold">
              Identification funnel
            </CardTitle>
            <CardDescription className="mt-1 max-w-xl text-sm">
              15,000 monthly visitors. Every row below is pipeline &mdash; or pipeline you never see.
            </CardDescription>
          </div>
          <div
            role="tablist"
            aria-label="Toggle MidBound on or off"
            className="inline-flex items-center gap-1 rounded-lg border border-border bg-secondary/40 p-1"
          >
            <button
              type="button"
              role="tab"
              aria-selected={mode === 'with'}
              onClick={() => setMode('with')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition ${
                mode === 'with'
                  ? 'bg-primary text-primary-foreground shadow-[0_0_14px_rgba(232,119,46,0.35)]'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              With MidBound
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={mode === 'without'}
              onClick={() => setMode('without')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition ${
                mode === 'without'
                  ? 'bg-foreground/90 text-background'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Without MidBound
            </button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div ref={ref} className="space-y-4">
          {stages.map((stage, i) => {
            const activeCount = mode === 'with' ? stage.withCount : stage.withoutCount;
            const isMissing = mode === 'without' && i > 0;
            const barPct = (stage.withCount / max) * 100;
            return (
              <div key={stage.key} className="relative">
                <div className="flex items-baseline justify-between gap-3 mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground tabular-nums w-5">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span
                      className={`text-sm font-medium ${
                        isMissing ? 'text-muted-foreground' : 'text-foreground'
                      }`}
                    >
                      {stage.label}
                    </span>
                    {stage.conversionFromPrev !== null && mode === 'with' && (
                      <span className="text-[10px] uppercase tracking-wider text-primary/80 bg-primary/10 border border-primary/20 rounded-full px-1.5 py-0.5">
                        {formatPct(stage.conversionFromPrev)} of prev
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-sm tabular-nums">
                    <span
                      className={
                        isMissing
                          ? 'text-muted-foreground/60 line-through'
                          : 'text-foreground font-semibold'
                      }
                    >
                      {formatCount(isMissing ? stage.withCount : activeCount)}
                    </span>
                    {isMissing && (
                      <span className="text-[10px] uppercase tracking-wider text-primary">
                        missing
                      </span>
                    )}
                  </div>
                </div>
                <div className="h-7 w-full rounded-md bg-background/60 border border-border/60 overflow-hidden">
                  <motion.div
                    className={`h-full rounded-md ${
                      isMissing
                        ? 'bg-muted-foreground/15'
                        : i === 0
                        ? 'bg-foreground/70'
                        : 'bg-gradient-to-r from-primary/80 to-primary'
                    }`}
                    initial={{ width: reduced ? `${barPct}%` : 0 }}
                    animate={
                      inView
                        ? { width: isMissing && i > 0 ? '0%' : `${barPct}%` }
                        : { width: 0 }
                    }
                    transition={{
                      delay: reduced ? 0 : 0.1 + i * 0.08,
                      duration: reduced ? 0 : 0.8,
                      ease: 'easeOut',
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
        {mode === 'without' && (
          <motion.p
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-5 text-sm text-primary/90"
          >
            Without MidBound, stages 2&ndash;5 stay invisible. That traffic converts nowhere.
          </motion.p>
        )}
      </CardContent>
    </Card>
  );
}
