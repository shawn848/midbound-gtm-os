'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { useActivityMatrix, useFilterStore } from '@/lib/filterStore';
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
  const alpha = [0.18, 0.32, 0.5, 0.7, 0.95][bucket];
  return `rgba(232, 119, 46, ${alpha.toFixed(2)})`;
}

function formatShort(d: Date): string {
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

export default function BehaviorHeatmap() {
  const { companies, days, counts, max } = useActivityMatrix(8);
  const selectedCompany = useFilterStore((s) => s.selectedCompany);
  const setSelectedCompany = useFilterStore((s) => s.setSelectedCompany);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' });

  const CELL = 13;
  const GAP = 3;

  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-2 flex flex-row items-start justify-between gap-3">
        <div>
          <CardTitle className="text-sm font-semibold">Visit density by company &times; day</CardTitle>
          <CardDescription className="text-xs">
            Each square is one day. Darker orange = more visits. Click a company name to focus the
            dashboard on them.
          </CardDescription>
        </div>
        {max > 0 && (
          <div className="flex items-center gap-1.5 pt-1 shrink-0">
            <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Less</span>
            {[0.0, 0.25, 0.5, 0.75, 1.0].map((r, i) => (
              <span
                key={i}
                className="inline-block rounded-sm"
                style={{
                  width: 10,
                  height: 10,
                  backgroundColor: intensityColor(r === 0 ? 0 : r),
                  border: '1px solid rgba(255,255,255,0.06)',
                }}
              />
            ))}
            <span className="text-[10px] uppercase tracking-wider text-muted-foreground">More</span>
          </div>
        )}
      </CardHeader>
      <CardContent ref={ref} className="pt-3 overflow-x-auto">
        {companies.length === 0 ? (
          <p className="text-sm text-muted-foreground py-6 text-center">
            No visits match the current filters.
          </p>
        ) : (
          <div className="min-w-max">
            <div
              className="grid mb-2 text-[10px] text-muted-foreground"
              style={{
                gridTemplateColumns: `120px repeat(${days.length}, ${CELL}px)`,
                columnGap: GAP,
              }}
            >
              <div />
              {days.map((day, i) => (
                <div
                  key={day.toISOString()}
                  className="text-center"
                  style={{ width: CELL }}
                >
                  {i % 7 === 0 ? (
                    <span className="whitespace-nowrap text-[9px]">{formatShort(day)}</span>
                  ) : (
                    ''
                  )}
                </div>
              ))}
            </div>

            {companies.map((company, rowIdx) => {
              const isSelected = selectedCompany === company;
              return (
                <div
                  key={company}
                  className="grid items-center mb-1"
                  style={{
                    gridTemplateColumns: `120px repeat(${days.length}, ${CELL}px)`,
                    columnGap: GAP,
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setSelectedCompany(isSelected ? null : company)}
                    className={`text-left text-xs font-medium pr-2 py-0.5 truncate transition-colors ${
                      isSelected ? 'text-primary' : 'text-foreground hover:text-primary'
                    }`}
                  >
                    {company}
                  </button>
                  {counts[rowIdx].map((c, colIdx) => {
                    const ratio = max === 0 ? 0 : c / max;
                    return (
                      <motion.div
                        key={`${company}-${colIdx}`}
                        initial={{ opacity: 0, scale: 0.7 }}
                        animate={
                          inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.7 }
                        }
                        transition={{
                          delay: (rowIdx * days.length + colIdx) * 0.002 + rowIdx * 0.03,
                          duration: 0.25,
                          ease: 'easeOut',
                        }}
                        whileHover={{ scale: 1.6, zIndex: 10 }}
                        title={`${company} · ${formatShort(days[colIdx])} · ${c} visit${c === 1 ? '' : 's'}`}
                        className="rounded-[3px] cursor-default"
                        style={{
                          width: CELL,
                          height: CELL,
                          backgroundColor: intensityColor(ratio),
                          border: '1px solid rgba(255,255,255,0.05)',
                        }}
                      />
                    );
                  })}
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
