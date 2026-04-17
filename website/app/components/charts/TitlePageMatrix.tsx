'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { useTitlePageMatrix, useFilterStore } from '@/lib/filterStore';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';

function intensityColor(ratio: number): string {
  if (ratio === 0) return 'rgba(255,255,255,0.04)';
  const bucket = Math.min(4, Math.floor(ratio * 5));
  const alpha = [0.18, 0.35, 0.55, 0.75, 0.95][bucket];
  return `rgba(232, 119, 46, ${alpha.toFixed(2)})`;
}

function textShade(ratio: number): string {
  return ratio > 0.5 ? '#fff' : ratio > 0.2 ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.55)';
}

export default function TitlePageMatrix() {
  const { rows, cols, counts, max, total } = useTitlePageMatrix();
  const seniorities = useFilterStore((s) => s.seniorities);
  const toggleSeniority = useFilterStore((s) => s.toggleSeniority);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' });

  return (
    <Card className="bg-card border-border h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-semibold">
          Who&apos;s looking at what
        </CardTitle>
        <CardDescription className="text-xs">
          {total.toLocaleString()} pageviews in the current filter, broken down by seniority
          &times; page type. Darker cell = stronger interest. Click a role to focus the dashboard.
        </CardDescription>
      </CardHeader>
      <CardContent ref={ref} className="pt-3 overflow-x-auto">
        <div className="min-w-max">
          <div
            className="grid text-[10px] uppercase tracking-wider text-muted-foreground mb-1"
            style={{
              gridTemplateColumns: `110px repeat(${cols.length}, 88px)`,
              columnGap: 4,
            }}
          >
            <div />
            {cols.map((col) => (
              <div key={col} className="text-center py-1.5 whitespace-nowrap">
                {col}
              </div>
            ))}
          </div>
          {rows.map((row, rowIdx) => {
            const isFocused = seniorities.includes(row);
            const anyFocused = seniorities.length > 0;
            return (
              <div
                key={row}
                className="grid items-center mb-1"
                style={{
                  gridTemplateColumns: `110px repeat(${cols.length}, 88px)`,
                  columnGap: 4,
                }}
              >
                <button
                  type="button"
                  onClick={() => toggleSeniority(row)}
                  className={`text-left text-sm font-medium py-1 pr-3 transition ${
                    isFocused
                      ? 'text-primary'
                      : anyFocused
                        ? 'text-muted-foreground/60 hover:text-primary'
                        : 'text-foreground hover:text-primary'
                  }`}
                >
                  {row}
                </button>
                {counts[rowIdx].map((c, colIdx) => {
                  const ratio = max === 0 ? 0 : c / max;
                  return (
                    <motion.div
                      key={`${row}-${cols[colIdx]}`}
                      initial={{ opacity: 0, scale: 0.85 }}
                      animate={
                        inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.85 }
                      }
                      transition={{
                        delay: (rowIdx * cols.length + colIdx) * 0.01,
                        duration: 0.25,
                        ease: 'easeOut',
                      }}
                      title={`${row} × ${cols[colIdx]} — ${c.toLocaleString()} pageview${c === 1 ? '' : 's'}`}
                      className="h-10 rounded-md flex items-center justify-center text-xs font-semibold tabular-nums"
                      style={{
                        backgroundColor: intensityColor(ratio),
                        border: '1px solid rgba(255,255,255,0.05)',
                        color: textShade(ratio),
                      }}
                    >
                      {c > 0 ? c.toLocaleString() : ''}
                    </motion.div>
                  );
                })}
              </div>
            );
          })}
        </div>
        <div className="mt-4 flex items-center gap-1.5 text-[11px] text-muted-foreground">
          <span className="uppercase tracking-wider text-[10px]">Less</span>
          {[0.0, 0.25, 0.5, 0.75, 1.0].map((r, i) => (
            <span
              key={i}
              className="inline-block rounded-sm"
              style={{
                width: 14,
                height: 10,
                backgroundColor: intensityColor(r === 0 ? 0 : r),
                border: '1px solid rgba(255,255,255,0.06)',
              }}
            />
          ))}
          <span className="uppercase tracking-wider text-[10px]">More</span>
        </div>
      </CardContent>
    </Card>
  );
}
