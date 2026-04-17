'use client';

import { create } from 'zustand';
import { useMemo } from 'react';
import { generateMockVisitors, type Visitor, type Seniority } from './mockVisitors';

export type DateRangeKey = '7d' | '30d' | '90d' | 'all';

interface FilterState {
  dateRange: DateRangeKey;
  countries: string[];
  seniorities: Seniority[];
  teams: string[];
  selectedCompany: string | null;
  setDateRange: (key: DateRangeKey) => void;
  toggleCountry: (code: string) => void;
  setCountries: (codes: string[]) => void;
  toggleSeniority: (level: Seniority) => void;
  setSeniorities: (levels: Seniority[]) => void;
  toggleTeam: (team: string) => void;
  setTeams: (teams: string[]) => void;
  setSelectedCompany: (name: string | null) => void;
  reset: () => void;
  hydrateFromURL: (params: URLSearchParams) => void;
  toURLParams: () => URLSearchParams;
}

export const useFilterStore = create<FilterState>((set, get) => ({
  dateRange: '30d',
  countries: [],
  seniorities: [],
  teams: [],
  selectedCompany: null,

  setDateRange: (key) => set({ dateRange: key }),

  toggleCountry: (code) =>
    set((s) => ({
      countries: s.countries.includes(code)
        ? s.countries.filter((c) => c !== code)
        : [...s.countries, code],
    })),

  setCountries: (codes) => set({ countries: codes }),

  toggleSeniority: (level) =>
    set((s) => ({
      seniorities: s.seniorities.includes(level)
        ? s.seniorities.filter((l) => l !== level)
        : [...s.seniorities, level],
    })),

  setSeniorities: (levels) => set({ seniorities: levels }),

  toggleTeam: (team) =>
    set((s) => ({
      teams: s.teams.includes(team) ? s.teams.filter((t) => t !== team) : [...s.teams, team],
    })),

  setTeams: (teams) => set({ teams }),

  setSelectedCompany: (name) => set({ selectedCompany: name }),

  reset: () =>
    set({
      dateRange: '30d',
      countries: [],
      seniorities: [],
      teams: [],
      selectedCompany: null,
    }),

  hydrateFromURL: (params) => {
    const next: Partial<FilterState> = {};
    const days = params.get('days');
    if (days === '7d' || days === '30d' || days === '90d' || days === 'all') {
      next.dateRange = days;
    }
    const countries = params.get('countries');
    if (countries) next.countries = countries.split(',').filter(Boolean);
    const seniorities = params.get('seniorities');
    if (seniorities) {
      const allowed: Seniority[] = ['IC', 'Manager', 'Director', 'VP', 'C-level'];
      next.seniorities = seniorities
        .split(',')
        .filter((s): s is Seniority => allowed.includes(s as Seniority));
    }
    const teams = params.get('teams');
    if (teams) next.teams = teams.split(',').filter(Boolean);
    const company = params.get('company');
    if (company) next.selectedCompany = company;
    set(next);
  },

  toURLParams: () => {
    const s = get();
    const p = new URLSearchParams();
    if (s.dateRange !== '30d') p.set('days', s.dateRange);
    if (s.countries.length) p.set('countries', s.countries.join(','));
    if (s.seniorities.length) p.set('seniorities', s.seniorities.join(','));
    if (s.teams.length) p.set('teams', s.teams.join(','));
    if (s.selectedCompany) p.set('company', s.selectedCompany);
    return p;
  },
}));

const ALL_VISITORS = generateMockVisitors(300, 42);

export function getAllVisitors(): Visitor[] {
  return ALL_VISITORS;
}

export function useFilteredVisitors(): Visitor[] {
  const dateRange = useFilterStore((s) => s.dateRange);
  const countries = useFilterStore((s) => s.countries);
  const seniorities = useFilterStore((s) => s.seniorities);
  const teams = useFilterStore((s) => s.teams);
  const selectedCompany = useFilterStore((s) => s.selectedCompany);

  return useMemo(() => {
    const now = Date.now();
    const cutoff =
      dateRange === '7d'
        ? now - 7 * 24 * 60 * 60 * 1000
        : dateRange === '30d'
          ? now - 30 * 24 * 60 * 60 * 1000
          : dateRange === '90d'
            ? now - 90 * 24 * 60 * 60 * 1000
            : 0;

    return ALL_VISITORS.filter((v) => {
      if (v.timestamp < cutoff) return false;
      if (countries.length && !countries.includes(v.country_code)) return false;
      if (seniorities.length && !seniorities.includes(v.seniority)) return false;
      if (teams.length && !teams.includes(v.team)) return false;
      if (selectedCompany && v.company !== selectedCompany) return false;
      return true;
    });
  }, [dateRange, countries, seniorities, teams, selectedCompany]);
}

export function useKpis() {
  const visitors = useFilteredVisitors();
  return useMemo(() => {
    const totalVisitors = visitors.length;
    const identifiedCompanies = new Set(visitors.map((v) => v.company)).size;
    const avgSessionMin =
      visitors.length === 0
        ? 0
        : visitors.reduce((s, v) => s + v.session_duration_sec, 0) / visitors.length / 60;
    const industryCounts = new Map<string, number>();
    for (const v of visitors) {
      industryCounts.set(v.industry, (industryCounts.get(v.industry) || 0) + 1);
    }
    const topIndustryEntry = [...industryCounts.entries()].sort((a, b) => b[1] - a[1])[0];
    return {
      totalVisitors,
      identifiedCompanies,
      avgSessionMin,
      topIndustry: topIndustryEntry?.[0] ?? '—',
    };
  }, [visitors]);
}

export function useByCountry() {
  const visitors = useFilteredVisitors();
  return useMemo(() => {
    const counts = new Map<
      string,
      { country: string; country_code: string; lat: number; lng: number; count: number }
    >();
    for (const v of visitors) {
      const existing = counts.get(v.country_code);
      if (existing) existing.count += 1;
      else
        counts.set(v.country_code, {
          country: v.country,
          country_code: v.country_code,
          lat: v.lat,
          lng: v.lng,
          count: 1,
        });
    }
    return [...counts.values()].sort((a, b) => b.count - a.count);
  }, [visitors]);
}

export function useByCompany(topN = 8) {
  const visitors = useFilteredVisitors();
  return useMemo(() => {
    const counts = new Map<string, number>();
    for (const v of visitors) {
      counts.set(v.company, (counts.get(v.company) || 0) + 1);
    }
    return [...counts.entries()]
      .map(([company, count]) => ({ company, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, topN);
  }, [visitors, topN]);
}

const PAGE_BUCKETS: { label: string; min: number; max: number }[] = [
  { label: '1 page', min: 1, max: 1 },
  { label: '2-3', min: 2, max: 3 },
  { label: '4-6', min: 4, max: 6 },
  { label: '7+', min: 7, max: Infinity },
];
const SENIORITY_ORDER: Seniority[] = ['C-level', 'VP', 'Director', 'Manager', 'IC'];

export function useBehaviorMatrix() {
  const visitors = useFilteredVisitors();
  return useMemo(() => {
    const matrix = SENIORITY_ORDER.map((seniority) => ({
      id: seniority,
      data: PAGE_BUCKETS.map((bucket) => ({ x: bucket.label, y: 0 })),
    }));
    for (const v of visitors) {
      const rowIdx = SENIORITY_ORDER.indexOf(v.seniority);
      if (rowIdx === -1) continue;
      const pages = v.pages_viewed.length;
      const colIdx = PAGE_BUCKETS.findIndex((b) => pages >= b.min && pages <= b.max);
      if (colIdx === -1) continue;
      matrix[rowIdx].data[colIdx].y += 1;
    }
    return matrix;
  }, [visitors]);
}

export function useTrendSeries() {
  const visitors = useFilteredVisitors();
  const dateRange = useFilterStore((s) => s.dateRange);
  return useMemo(() => {
    const days = dateRange === '7d' ? 7 : dateRange === '30d' ? 30 : dateRange === '90d' ? 90 : 90;
    const bucketSize = days <= 14 ? 1 : days <= 45 ? 3 : 7;
    const now = Date.now();
    const start = now - days * 24 * 60 * 60 * 1000;

    const buckets: { name: string; identified: number; anonymous: number }[] = [];
    for (let d = 0; d < days; d += bucketSize) {
      buckets.push({ name: '', identified: 0, anonymous: 0 });
    }
    for (const v of visitors) {
      const offset = Math.floor((v.timestamp - start) / (bucketSize * 24 * 60 * 60 * 1000));
      if (offset < 0 || offset >= buckets.length) continue;
      buckets[offset].identified += 1;
      buckets[offset].anonymous += Math.round(v.session_duration_sec / 60);
    }
    buckets.forEach((b, i) => {
      const bucketStart = new Date(start + i * bucketSize * 24 * 60 * 60 * 1000);
      b.name = bucketStart.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      });
    });
    return buckets;
  }, [visitors, dateRange]);
}
