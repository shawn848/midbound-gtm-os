'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { useBehaviorMatrix, useFilterStore } from '@/lib/filterStore';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import type { Seniority } from '@/lib/mockVisitors';

const PAGE_BUCKETS = ['1 page', '2-3', '4-6', '7+'];

function intensityColor(share: number): string {
  const alpha = Math.min(0.92, 0.06 + share * 1.6);
  return `rgba(232, 119, 46, ${alpha.toFixed(3)})`;
}

export default function BehaviorHeatmap() {
  const matrix = useBehaviorMatrix();
  const toggleSeniority = useFilterStore((s) => s.toggleSeniority);
  const activeSeniorities = useFilterStore((s) => s.seniorities);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' });

  const maxValue = matrix.reduce(
    (m, row) => Math.max(m, ...row.data.map((c) => c.y)),
    0
  );

  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-semibold">
          Behavior heatmap: seniority × session depth
        </CardTitle>
        <CardDescription className="text-xs">
          Where your real buyers are reading. Darker orange = more visits. Click a row to filter.
        </CardDescription>
      </CardHeader>
      <CardContent ref={ref} className="pt-4 overflow-x-auto">
        <div className="min-w-[560px]">
          <div className="grid" style={{ gridTemplateColumns: '110px repeat(4, 1fr)' }}>
            <div />
            {PAGE_BUCKETS.map((col) => (
              <div
                key={col}
                className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold text-center pb-2"
              >
                {col}
              </div>
            ))}
            {matrix.map((row, ri) => (
              <div key={row.id} className="contents">
                <button
                  type="button"
                  onClick={() => toggleSeniority(row.id as Seniority)}
                  className={`text-[11px] uppercase tracking-wider font-semibold pr-3 py-2 text-right transition-colors ${
                    activeSeniorities.includes(row.id as Seniority)
                      ? 'text-primary'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {row.id}
                </button>
                {row.data.map((cell, ci) => {
                  const share = maxValue === 0 ? 0 : cell.y / maxValue;
                  return (
                    <motion.div
                      key={`${row.id}-${cell.x}`}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                      transition={{
                        delay: (ri + ci) * 0.04,
                        duration: 0.35,
                        ease: 'easeOut',
                      }}
                      whileHover={{
                        scale: 1.03,
                        boxShadow:
                          '0 0 14px rgba(232, 119, 46, 0.55), 0 0 22px rgba(255,255,255,0.18)',
                      }}
                      className="m-1 rounded-lg border border-primary/20 flex items-center justify-center text-sm font-semibold text-foreground cursor-default min-h-[52px]"
                      style={{ backgroundColor: intensityColor(share) }}
                      title={`${cell.y} ${row.id} visits · ${cell.x} pages`}
                    >
                      {cell.y || ''}
                    </motion.div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
