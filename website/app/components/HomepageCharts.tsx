'use client';

import AreaTrendChart from './charts/AreaTrendChart';
import BarComparisonChart from './charts/BarComparisonChart';
import ComparisonTable from './charts/ComparisonTable';

const identificationData = [
  { name: 'Company-Level', visitors: 30, contacts: 0 },
  { name: 'IP Enrichment', visitors: 30, contacts: 5 },
  { name: 'Form Fills', visitors: 100, contacts: 2 },
  { name: 'MidBound', visitors: 100, contacts: 70 },
];

const trendData = [
  { name: 'Week 1', identified: 12, enriched: 8 },
  { name: 'Week 2', identified: 28, enriched: 19 },
  { name: 'Week 3', identified: 45, enriched: 34 },
  { name: 'Week 4', identified: 67, enriched: 52 },
  { name: 'Week 5', identified: 89, enriched: 71 },
  { name: 'Week 6', identified: 120, enriched: 98 },
];

const comparisonFeatures = [
  { name: 'Person-level ID', values: { MidBound: true, 'Clearbit': false, 'Snitcher': false, '6sense': false } },
  { name: 'Real-time Slack alerts', values: { MidBound: true, 'Clearbit': false, 'Snitcher': true, '6sense': false } },
  { name: 'LinkedIn profile match', values: { MidBound: true, 'Clearbit': false, 'Snitcher': false, '6sense': false } },
  { name: 'Validated email', values: { MidBound: true, 'Clearbit': 'Partial', 'Snitcher': false, '6sense': false } },
  { name: 'ICP scoring', values: { MidBound: true, 'Clearbit': true, 'Snitcher': false, '6sense': true } },
  { name: 'No pixel required', values: { MidBound: true, 'Clearbit': false, 'Snitcher': false, '6sense': false } },
  { name: 'Free trial (no CC)', values: { MidBound: true, 'Clearbit': false, 'Snitcher': true, '6sense': false } },
];

export default function HomepageCharts() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <BarComparisonChart
        title="Identification Coverage"
        description="Contacts identified per 100 visitors by method"
        data={identificationData}
        bars={[
          { dataKey: 'contacts', label: 'Contacts Found', color: 'var(--primary)' },
        ]}
        layout="horizontal"
      />
      <AreaTrendChart
        title="Visitor Identification Trend"
        description="Typical ramp-up over first 6 weeks"
        data={trendData}
        areas={[
          { dataKey: 'identified', label: 'Visitors Identified' },
          { dataKey: 'enriched', label: 'Profiles Enriched', color: 'var(--chart-2)' },
        ]}
      />
      <div className="lg:col-span-2">
        <ComparisonTable
          title="MidBound vs. The Market"
          description="Person-level identification changes the game"
          columns={['MidBound', 'Clearbit', 'Snitcher', '6sense']}
          features={comparisonFeatures}
          highlightColumn="MidBound"
        />
      </div>
    </div>
  );
}
