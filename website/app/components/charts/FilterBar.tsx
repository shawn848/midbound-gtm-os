'use client';

import { useFilterStore, type DateRangeKey } from '@/lib/filterStore';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import type { Seniority } from '@/lib/mockVisitors';

const DATE_OPTIONS: { key: DateRangeKey; label: string }[] = [
  { key: '7d', label: '7 days' },
  { key: '30d', label: '30 days' },
  { key: '90d', label: '90 days' },
  { key: 'all', label: 'All time' },
];

const COUNTRY_OPTIONS = [
  { code: 'US', label: 'United States' },
  { code: 'IL', label: 'Israel' },
  { code: 'GB', label: 'UK' },
  { code: 'DE', label: 'Germany' },
  { code: 'CA', label: 'Canada' },
  { code: 'AU', label: 'Australia' },
];

const SENIORITY_OPTIONS: Seniority[] = ['C-level', 'VP', 'Director', 'Manager', 'IC'];

function PillToggle({
  active,
  label,
  onClick,
}: {
  active: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium transition-all ${
        active
          ? 'border-primary bg-primary text-primary-foreground shadow-[0_0_14px_rgba(232,119,46,0.5)]'
          : 'border-border bg-secondary/40 text-muted-foreground hover:text-foreground hover:border-primary/40'
      }`}
    >
      {label}
    </button>
  );
}

export default function FilterBar() {
  const dateRange = useFilterStore((s) => s.dateRange);
  const setDateRange = useFilterStore((s) => s.setDateRange);
  const countries = useFilterStore((s) => s.countries);
  const toggleCountry = useFilterStore((s) => s.toggleCountry);
  const seniorities = useFilterStore((s) => s.seniorities);
  const toggleSeniority = useFilterStore((s) => s.toggleSeniority);
  const selectedCompany = useFilterStore((s) => s.selectedCompany);
  const setSelectedCompany = useFilterStore((s) => s.setSelectedCompany);
  const reset = useFilterStore((s) => s.reset);

  const hasFilters =
    dateRange !== '30d' ||
    countries.length > 0 ||
    seniorities.length > 0 ||
    selectedCompany !== null;

  return (
    <div className="rounded-xl border border-border bg-card/50 backdrop-blur p-4">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex flex-col gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold mr-1">
              Range
            </span>
            {DATE_OPTIONS.map((opt) => (
              <PillToggle
                key={opt.key}
                active={dateRange === opt.key}
                label={opt.label}
                onClick={() => setDateRange(opt.key)}
              />
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold mr-1">
              Country
            </span>
            {COUNTRY_OPTIONS.map((opt) => (
              <PillToggle
                key={opt.code}
                active={countries.includes(opt.code)}
                label={opt.label}
                onClick={() => toggleCountry(opt.code)}
              />
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold mr-1">
              Seniority
            </span>
            {SENIORITY_OPTIONS.map((opt) => (
              <PillToggle
                key={opt}
                active={seniorities.includes(opt)}
                label={opt}
                onClick={() => toggleSeniority(opt)}
              />
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2 lg:items-end">
          {selectedCompany && (
            <Badge
              variant="outline"
              className="gap-1 border-primary/40 text-primary bg-primary/10"
            >
              Company: {selectedCompany}
              <button
                type="button"
                onClick={() => setSelectedCompany(null)}
                className="ml-1 hover:opacity-70"
                aria-label="Clear company filter"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
          {hasFilters && (
            <Button variant="ghost" size="sm" onClick={reset}>
              Reset all filters
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
