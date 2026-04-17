'use client';

import { useTrendSeries } from '@/lib/filterStore';
import AreaTrendChart from './AreaTrendChart';

export default function VisitorTrend() {
  const data = useTrendSeries();

  return (
    <AreaTrendChart
      title="Identified visits over time"
      description="Filtered by the current selection. Each bar = a time bucket."
      data={data}
      areas={[
        { dataKey: 'identified', label: 'Identified visits', color: 'var(--primary)' },
        { dataKey: 'anonymous', label: 'Minutes on site', color: '#64748B' },
      ]}
    />
  );
}
