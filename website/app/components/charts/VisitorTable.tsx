'use client';

import { useMemo, useState } from 'react';
import { useFilteredVisitors, useFilterStore } from '@/lib/filterStore';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ChevronLeft, ChevronRight, ArrowUpDown, Search } from 'lucide-react';
import type { Visitor } from '@/lib/mockVisitors';

type SortKey =
  | 'company'
  | 'title'
  | 'country'
  | 'session_duration_sec'
  | 'pages'
  | 'icp_score'
  | 'timestamp';

interface SortConfig {
  key: SortKey;
  dir: 'asc' | 'desc';
}

const PAGE_SIZE = 15;

function compare(a: Visitor, b: Visitor, key: SortKey): number {
  switch (key) {
    case 'company':
      return a.company.localeCompare(b.company);
    case 'title':
      return a.title.localeCompare(b.title);
    case 'country':
      return a.country.localeCompare(b.country);
    case 'session_duration_sec':
      return a.session_duration_sec - b.session_duration_sec;
    case 'pages':
      return a.pages_viewed.length - b.pages_viewed.length;
    case 'icp_score':
      return a.icp_score - b.icp_score;
    case 'timestamp':
      return a.timestamp - b.timestamp;
  }
}

function formatDate(ts: number): string {
  const d = new Date(ts);
  return d.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
}

function ScoreBar({ value }: { value: number }) {
  const pct = (value / 10) * 100;
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-foreground font-semibold w-4">{value}</span>
      <div className="flex-1 h-1 rounded-full bg-secondary overflow-hidden min-w-[40px]">
        <div className="h-full rounded-full bg-primary" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

export default function VisitorTable() {
  const visitors = useFilteredVisitors();
  const setSelectedCompany = useFilterStore((s) => s.setSelectedCompany);

  const [search, setSearch] = useState('');
  const [sort, setSort] = useState<SortConfig>({ key: 'timestamp', dir: 'desc' });
  const [page, setPage] = useState(0);

  const filteredSorted = useMemo(() => {
    const q = search.trim().toLowerCase();
    const filtered = q
      ? visitors.filter(
          (v) =>
            v.company.toLowerCase().includes(q) ||
            v.title.toLowerCase().includes(q) ||
            v.country.toLowerCase().includes(q)
        )
      : visitors;
    return [...filtered].sort((a, b) => {
      const c = compare(a, b, sort.key);
      return sort.dir === 'asc' ? c : -c;
    });
  }, [visitors, search, sort]);

  const pageCount = Math.max(1, Math.ceil(filteredSorted.length / PAGE_SIZE));
  const pageSafe = Math.min(page, pageCount - 1);
  const pageRows = filteredSorted.slice(pageSafe * PAGE_SIZE, (pageSafe + 1) * PAGE_SIZE);

  const toggleSort = (key: SortKey) => {
    setSort((s) => (s.key === key ? { key, dir: s.dir === 'asc' ? 'desc' : 'asc' } : { key, dir: 'desc' }));
    setPage(0);
  };

  const HeaderCell = ({ label, k }: { label: string; k: SortKey }) => (
    <TableHead className="text-[11px] uppercase tracking-wider text-muted-foreground">
      <button
        type="button"
        onClick={() => toggleSort(k)}
        className="inline-flex items-center gap-1 hover:text-foreground transition-colors"
      >
        {label}
        <ArrowUpDown className="h-3 w-3 opacity-60" />
      </button>
    </TableHead>
  );

  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-3 flex flex-col sm:flex-row sm:items-end gap-3 sm:justify-between">
        <div>
          <CardTitle className="text-sm font-semibold">Identified visitors</CardTitle>
          <CardDescription className="text-xs">
            {filteredSorted.length.toLocaleString()} match
            {filteredSorted.length === 1 ? '' : 'es'} · showing {pageRows.length} of page {pageSafe + 1} of {pageCount}
          </CardDescription>
        </div>
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
          <Input
            placeholder="Search company, title, country…"
            className="pl-8 h-9 text-sm"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(0);
            }}
          />
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="rounded-lg border border-border overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <HeaderCell label="Company" k="company" />
                <HeaderCell label="Title" k="title" />
                <HeaderCell label="Country" k="country" />
                <HeaderCell label="Session" k="session_duration_sec" />
                <HeaderCell label="Pages" k="pages" />
                <HeaderCell label="Score" k="icp_score" />
                <HeaderCell label="When" k="timestamp" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {pageRows.map((v) => (
                <TableRow key={v.id} className="hover:bg-primary/5 transition-colors">
                  <TableCell>
                    <button
                      type="button"
                      onClick={() => setSelectedCompany(v.company)}
                      className="font-medium text-foreground hover:text-primary transition-colors"
                    >
                      {v.company}
                    </button>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{v.title}</TableCell>
                  <TableCell className="text-muted-foreground">{v.country}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {Math.round(v.session_duration_sec / 60)}m
                  </TableCell>
                  <TableCell className="text-muted-foreground">{v.pages_viewed.length}</TableCell>
                  <TableCell>
                    <ScoreBar value={v.icp_score} />
                  </TableCell>
                  <TableCell className="text-muted-foreground text-xs">
                    {formatDate(v.timestamp)}
                  </TableCell>
                </TableRow>
              ))}
              {pageRows.length === 0 && (
                <TableRow className="hover:bg-transparent">
                  <TableCell colSpan={7} className="py-10 text-center text-muted-foreground text-sm">
                    No visitors match the current filters.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        {pageCount > 1 && (
          <div className="flex items-center justify-between mt-3 text-xs text-muted-foreground">
            <span>
              Page {pageSafe + 1} of {pageCount}
            </span>
            <div className="flex gap-1">
              <Button
                size="sm"
                variant="outline"
                onClick={() => setPage((p) => Math.max(0, p - 1))}
                disabled={pageSafe === 0}
              >
                <ChevronLeft className="h-3 w-3" /> Prev
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setPage((p) => Math.min(pageCount - 1, p + 1))}
                disabled={pageSafe >= pageCount - 1}
              >
                Next <ChevronRight className="h-3 w-3" />
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
