'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

interface GeoRegion {
  label: string;
  count: number;
  share: number;
}

interface GeoHeatGridProps {
  title?: string;
  description?: string;
  regions?: GeoRegion[];
}

const DEFAULT_REGIONS: GeoRegion[] = [
  { label: 'US West', count: 342, share: 0.22 },
  { label: 'US East', count: 418, share: 0.28 },
  { label: 'US Central', count: 201, share: 0.13 },
  { label: 'Israel', count: 147, share: 0.10 },
  { label: 'EU / UK', count: 223, share: 0.15 },
  { label: 'Canada', count: 88, share: 0.06 },
  { label: 'APAC', count: 64, share: 0.04 },
  { label: 'Other', count: 42, share: 0.02 },
];

function intensityBg(share: number): string {
  const alpha = Math.min(0.85, 0.18 + share * 2.6);
  return `rgba(232, 119, 46, ${alpha.toFixed(3)})`;
}

export default function GeoHeatGrid({
  title = 'Visitors by region',
  description = 'Where identified website visitors live, based on LinkedIn location inference.',
  regions = DEFAULT_REGIONS,
}: GeoHeatGridProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -15% 0px' });

  return (
    <Card className="bg-card border-border my-6">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-semibold">{title}</CardTitle>
        {description && <CardDescription className="text-xs">{description}</CardDescription>}
      </CardHeader>
      <CardContent className="pt-2">
        <div ref={ref} className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {regions.map((region, i) => (
            <motion.div
              key={region.label}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.92 }}
              transition={{ delay: i * 0.06, duration: 0.45, ease: 'easeOut' }}
              whileHover={{
                scale: 1.04,
                boxShadow: '0 0 16px rgba(232, 119, 46, 0.55), 0 0 24px rgba(255,255,255,0.18)',
              }}
              className="relative overflow-hidden rounded-xl border border-primary/25 p-4 cursor-default"
              style={{
                backgroundColor: inView ? intensityBg(region.share) : 'transparent',
                transition: 'background-color 1s ease',
              }}
            >
              <div className="text-[11px] uppercase tracking-wider text-foreground/80 font-semibold mb-1">
                {region.label}
              </div>
              <div className="text-2xl font-bold text-foreground">
                {region.count.toLocaleString()}
              </div>
              <div className="text-[11px] text-foreground/70">
                {(region.share * 100).toFixed(1)}% of identified
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
