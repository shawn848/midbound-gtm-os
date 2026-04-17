'use client';

import { useEffect, useRef } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useFilterStore } from '@/lib/filterStore';

export default function FilterURLSync() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const hydrateFromURL = useFilterStore((s) => s.hydrateFromURL);
  const dateRange = useFilterStore((s) => s.dateRange);
  const countries = useFilterStore((s) => s.countries);
  const seniorities = useFilterStore((s) => s.seniorities);
  const teams = useFilterStore((s) => s.teams);
  const selectedCompany = useFilterStore((s) => s.selectedCompany);
  const toURLParams = useFilterStore((s) => s.toURLParams);

  const hasHydratedRef = useRef(false);

  useEffect(() => {
    if (hasHydratedRef.current) return;
    hasHydratedRef.current = true;
    hydrateFromURL(new URLSearchParams(searchParams.toString()));
  }, [hydrateFromURL, searchParams]);

  useEffect(() => {
    if (!hasHydratedRef.current) return;
    const next = toURLParams().toString();
    const current = searchParams.toString();
    if (next === current) return;
    const suffix = next ? `?${next}` : '';
    router.replace(`${pathname}${suffix}`, { scroll: false });
  }, [dateRange, countries, seniorities, teams, selectedCompany, pathname, router, searchParams, toURLParams]);

  return null;
}
