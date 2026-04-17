'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { useRegionRoleBreakdown, useFilterStore } from '@/lib/filterStore';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';

const ROLE_COLORS = {
  execs: '#E8772E',
  mid: 'rgba(232, 119, 46, 0.5)',
  ic: 'rgba(100, 116, 139, 0.75)',
};

export default function RegionRoleBars() {
  const data = useRegionRoleBreakdown();
  const setCountries = useFilterStore((s) => s.setCountries);
  const countries = useFilterStore((s) => s.countries);
  const max = Math.max(1, ...data.map((d) => d.total));
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' });

  return (
    <Card className="bg-card border-border h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-semibold">
          Where visitors are, by role
        </CardTitle>
        <CardDescription className="text-xs">
          Regions split by seniority mix. Execs (C + VP), Mid (Director + Manager), IC.
          Click a region to focus on its countries.
        </CardDescription>
      </CardHeader>
      <CardContent ref={ref} className="pt-3 space-y-3">
        {data.length === 0 ? (
          <p className="text-sm text-muted-foreground py-6 text-center">
            No visits match the current filters.
          </p>
        ) : (
          data.map((row, i) => {
            const widthPct = (row.total / max) * 100;
            const execsPct = row.total === 0 ? 0 : (row.execs / row.total) * 100;
            const midPct = row.total === 0 ? 0 : (row.mid / row.total) * 100;
            const icPct = row.total === 0 ? 0 : (row.ic / row.total) * 100;
            const isFocused =
              row.countryCodes.length > 0 &&
              row.countryCodes.some((c) => countries.includes(c));
            const canFilter = row.countryCodes.length > 0;
            return (
              <div key={row.region}>
                <div className="flex items-center justify-between mb-1 text-xs">
                  <button
                    type="button"
                    disabled={!canFilter}
                    onClick={() => {
                      if (!canFilter) return;
                      if (isFocused) setCountries([]);
                      else setCountries(row.countryCodes);
                    }}
                    className={`font-medium transition text-left ${
                      isFocused
                        ? 'text-primary'
                        : canFilter
                          ? 'text-foreground hover:text-primary'
                          : 'text-muted-foreground cursor-default'
                    }`}
                  >
                    {row.region}
                  </button>
                  <span className="text-muted-foreground tabular-nums">
                    {row.total.toLocaleString()}
                  </span>
                </div>
                <div
                  className="h-5 rounded-md flex overflow-hidden"
                  style={{ minWidth: 32 }}
                  title={`${row.region}: ${row.execs.toLocaleString()} execs, ${row.mid.toLocaleString()} mid, ${row.ic.toLocaleString()} IC`}
                >
                  <motion.div
                    initial={{ width: 0 }}
                    animate={inView ? { width: `${widthPct}%` } : { width: 0 }}
                    transition={{ delay: i * 0.08, duration: 0.6, ease: 'easeOut' }}
                    className="h-full flex overflow-hidden rounded-md"
                  >
                    <div
                      style={{ width: `${execsPct}%`, backgroundColor: ROLE_COLORS.execs }}
                    />
                    <div
                      style={{ width: `${midPct}%`, backgroundColor: ROLE_COLORS.mid }}
                    />
                    <div
                      style={{ width: `${icPct}%`, backgroundColor: ROLE_COLORS.ic }}
                    />
                  </motion.div>
                </div>
              </div>
            );
          })
        )}
        <div className="flex flex-wrap items-center gap-3 pt-2 text-[11px] text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <span
              className="inline-block h-2.5 w-3 rounded-sm"
              style={{ backgroundColor: ROLE_COLORS.execs }}
            />
            Execs
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span
              className="inline-block h-2.5 w-3 rounded-sm"
              style={{ backgroundColor: ROLE_COLORS.mid }}
            />
            Mid
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span
              className="inline-block h-2.5 w-3 rounded-sm"
              style={{ backgroundColor: ROLE_COLORS.ic }}
            />
            IC
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
