'use client';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { gradientForCompany, initialsForCompany, logoUrl } from '@/lib/companyLogo';
import { sampleFeedRows, type FeedRow } from '@/lib/labData';

const ROW_COUNT = 10;
const TICK_MS = 2500;

function CompanyAvatar({ company, domain }: { company: string; domain: string }) {
  const [failed, setFailed] = useState(false);
  const { from, to } = gradientForCompany(company);
  const initials = initialsForCompany(company);

  if (failed) {
    return (
      <div
        className="h-8 w-8 shrink-0 rounded-md flex items-center justify-center text-[10px] font-bold text-white"
        style={{ background: `linear-gradient(135deg, ${from}, ${to})` }}
        aria-hidden="true"
      >
        {initials}
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={logoUrl(domain)}
      alt=""
      width={32}
      height={32}
      loading="lazy"
      onError={() => setFailed(true)}
      className="h-8 w-8 shrink-0 rounded-md bg-white object-contain p-0.5 border border-border/60"
    />
  );
}

function formatAgo(seconds: number) {
  if (seconds < 60) return `${seconds}s ago`;
  const m = Math.floor(seconds / 60);
  return `${m}m ago`;
}

export default function LiveIdFeed() {
  const reduced = useReducedMotion();
  const rotation = useRef(0);
  const [rows, setRows] = useState<FeedRow[]>(() =>
    sampleFeedRows(ROW_COUNT, 0).map((r, i) => ({ ...r, secondsAgo: i * 8 + 4 }))
  );

  useEffect(() => {
    if (reduced) return;
    let paused = false;
    const onVis = () => {
      paused = document.hidden;
    };
    document.addEventListener('visibilitychange', onVis);

    const interval = setInterval(() => {
      if (paused) return;
      rotation.current += 1;
      setRows((prev) => {
        const aged = prev.map((r) => ({ ...r, secondsAgo: r.secondsAgo + 8 }));
        const [fresh] = sampleFeedRows(1, rotation.current * ROW_COUNT + ROW_COUNT);
        const next: FeedRow = {
          ...fresh,
          id: `tick-${rotation.current}-${fresh.id}`,
          secondsAgo: 1,
        };
        return [next, ...aged].slice(0, ROW_COUNT);
      });
    }, TICK_MS);

    return () => {
      clearInterval(interval);
      document.removeEventListener('visibilitychange', onVis);
    };
  }, [reduced]);

  return (
    <Card className="bg-card border-border overflow-hidden">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <CardTitle className="text-xl sm:text-2xl font-bold">
              Live identification feed
            </CardTitle>
            <CardDescription className="mt-1 text-sm">
              Simulated stream of buyers landing on your site right now.
            </CardDescription>
          </div>
          <div className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-primary">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-primary/70 animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            Live
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="relative divide-y divide-border/50">
          <AnimatePresence initial={false}>
            {rows.map((row) => (
              <motion.div
                key={row.id}
                layout
                initial={reduced ? { opacity: 1 } : { opacity: 0, y: -12, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={reduced ? { opacity: 0 } : { opacity: 0, y: 8, scale: 0.98 }}
                transition={{
                  duration: reduced ? 0 : 0.35,
                  ease: 'easeOut',
                }}
                className="flex items-center gap-3 py-2.5 first:pt-1 last:pb-1"
              >
                <CompanyAvatar company={row.company} domain={row.domain} />
                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline gap-2 flex-wrap">
                    <span className="text-sm font-medium text-foreground truncate">
                      {row.name}
                    </span>
                    <span className="text-xs text-muted-foreground truncate">
                      {row.title} &middot; {row.company}
                    </span>
                  </div>
                  <div className="text-xs text-muted-foreground truncate">
                    Viewed <span className="text-primary font-medium">{row.page}</span>
                  </div>
                </div>
                <span className="text-[11px] text-muted-foreground tabular-nums shrink-0">
                  {formatAgo(row.secondsAgo)}
                </span>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </CardContent>
    </Card>
  );
}
