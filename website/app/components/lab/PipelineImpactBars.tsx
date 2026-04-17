'use client';

import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useMemo, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  FIXED_ID_RATE,
  ROI_LIMITS,
  buildMonthlySeries,
  computePipelineMonthly,
} from '@/lib/labData';

function formatCompact(n: number) {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `$${Math.round(n / 1_000)}k`;
  return `$${n}`;
}

export default function PipelineImpactBars() {
  const pipelineMonthly = computePipelineMonthly(
    ROI_LIMITS.visitors.default,
    ROI_LIMITS.dealSize.default,
    ROI_LIMITS.closeRate.default,
    FIXED_ID_RATE
  );
  const series = useMemo(() => buildMonthlySeries(pipelineMonthly, 12), [pipelineMonthly]);
  const max = Math.max(...series.map((s) => s.identified));
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -15% 0px' });
  const reduced = useReducedMotion();

  const annualTotal = series.reduce((s, r) => s + r.identified, 0);

  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <CardTitle className="text-xl sm:text-2xl font-bold">
              12-month pipeline impact
            </CardTitle>
            <CardDescription className="mt-1 text-sm">
              With MidBound on, every month compounds. Anonymous traffic stays at $0.
            </CardDescription>
          </div>
          <div className="text-right">
            <div className="text-[11px] uppercase tracking-wider text-muted-foreground">
              Annualized
            </div>
            <div className="text-lg font-bold text-primary tabular-nums">
              {formatCompact(annualTotal)}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div ref={ref} className="h-56 flex items-end gap-1.5 sm:gap-2">
          {series.map((row, i) => {
            const heightPct = (row.identified / max) * 100;
            return (
              <div key={row.label} className="flex-1 flex flex-col items-center gap-2 min-w-0">
                <div className="relative flex-1 w-full flex items-end">
                  <motion.div
                    initial={{ height: reduced ? `${heightPct}%` : 0 }}
                    animate={inView ? { height: `${heightPct}%` } : { height: 0 }}
                    transition={{
                      delay: reduced ? 0 : i * 0.06,
                      duration: reduced ? 0 : 0.7,
                      ease: 'easeOut',
                    }}
                    className="w-full rounded-t-md bg-gradient-to-t from-primary/60 to-primary relative group"
                  >
                    <div className="absolute inset-x-0 -top-6 text-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-[10px] text-foreground font-semibold tabular-nums bg-card border border-border/60 rounded px-1 py-0.5">
                        {formatCompact(row.identified)}
                      </span>
                    </div>
                  </motion.div>
                </div>
                <span className="text-[10px] text-muted-foreground uppercase tracking-wider">
                  {row.label}
                </span>
              </div>
            );
          })}
        </div>
        <div className="mt-4 flex items-center gap-4 text-[11px] text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <span className="inline-block h-2 w-2 rounded-sm bg-primary" />
            Identified-visitor pipeline
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="inline-block h-2 w-2 rounded-sm bg-muted-foreground/30" />
            Anonymous ($0, always)
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
