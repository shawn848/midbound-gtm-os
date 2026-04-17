'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { useByCompany, useFilterStore } from '@/lib/filterStore';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function TopCompaniesBar() {
  const rows = useByCompany(8);
  const selectedCompany = useFilterStore((s) => s.selectedCompany);
  const setSelectedCompany = useFilterStore((s) => s.setSelectedCompany);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' });

  const max = rows[0]?.count ?? 1;

  return (
    <Card className="bg-card border-border h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-semibold">Top companies</CardTitle>
        <CardDescription className="text-xs">Click a bar to filter everything below.</CardDescription>
      </CardHeader>
      <CardContent className="pt-2">
        <div ref={ref} className="space-y-2">
          {rows.length === 0 && (
            <p className="text-sm text-muted-foreground py-8 text-center">
              No visitors match the current filters.
            </p>
          )}
          {rows.map((row, i) => {
            const pct = (row.count / max) * 100;
            const isSelected = selectedCompany === row.company;
            return (
              <motion.button
                key={row.company}
                type="button"
                onClick={() =>
                  setSelectedCompany(isSelected ? null : row.company)
                }
                initial={{ opacity: 0, x: -8 }}
                animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -8 }}
                transition={{ delay: i * 0.05, duration: 0.4, ease: 'easeOut' }}
                className={`group relative block w-full rounded-md border px-3 py-2 text-left transition-all ${
                  isSelected
                    ? 'border-primary bg-primary/15 shadow-[0_0_14px_rgba(232,119,46,0.35)]'
                    : 'border-border bg-secondary/30 hover:border-primary/40'
                }`}
              >
                <div className="flex items-center justify-between text-xs mb-1">
                  <span
                    className={`font-medium ${
                      isSelected ? 'text-primary' : 'text-foreground'
                    }`}
                  >
                    {row.company}
                  </span>
                  <span className="text-muted-foreground">{row.count}</span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-background/60 overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-primary"
                    initial={{ width: 0 }}
                    animate={inView ? { width: `${pct}%` } : { width: 0 }}
                    transition={{ delay: i * 0.05 + 0.1, duration: 0.6, ease: 'easeOut' }}
                  />
                </div>
              </motion.button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
