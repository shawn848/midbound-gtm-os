'use client';

import { useTrendSeries } from '@/lib/filterStore';
import AreaTrendChart from './AreaTrendChart';

export default function VisitorTrend() {
  const data = useTrendSeries();

  return (
    <div className="space-y-2">
      <AreaTrendChart
        title="Identified visits over time"
        description="Current filter, plotted across the selected date range."
        data={data}
        areas={[
          { dataKey: 'identified', label: 'Identified visits', color: 'var(--primary)' },
          { dataKey: 'anonymous', label: 'Session minutes', color: '#64748B' },
        ]}
      />
      <p className="text-[11px] text-muted-foreground px-1">
        Each point is the sum of visits in that time bucket. The Identified-visitors table below is
        the same set, one row per visit. Filter above and both redraw together.
      </p>
    </div>
  );
}
