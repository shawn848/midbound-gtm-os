import type { ReactNode } from 'react';
import GeoHeatGrid from './charts/GeoHeatGrid';
import AreaTrendChart from './charts/AreaTrendChart';
import BarComparisonChart from './charts/BarComparisonChart';
import AnimatedCounter from './charts/AnimatedCounter';
import ComparisonMatrix from './charts/ComparisonMatrix';

interface ChartAwareContentProps {
  html: string;
}

const TITLE_DISTRIBUTION = [
  { name: 'VP / Head of', marketing: 38, sales: 28 },
  { name: 'Director', marketing: 44, sales: 51 },
  { name: 'Manager', marketing: 62, sales: 73 },
  { name: 'IC / Senior', marketing: 28, sales: 35 },
  { name: 'C-level', marketing: 12, sales: 9 },
];

const PAGEVIEW_TREND = [
  { name: 'Week 1', identified: 42, anonymous: 612 },
  { name: 'Week 2', identified: 71, anonymous: 584 },
  { name: 'Week 3', identified: 98, anonymous: 640 },
  { name: 'Week 4', identified: 124, anonymous: 701 },
  { name: 'Week 5', identified: 163, anonymous: 688 },
  { name: 'Week 6', identified: 198, anonymous: 722 },
  { name: 'Week 7', identified: 234, anonymous: 745 },
  { name: 'Week 8', identified: 276, anonymous: 769 },
];

const CLAY_WATERFALL = [
  { name: 'LinkedIn verify', rate: 95 },
  { name: 'Recent activity', rate: 62 },
  { name: 'Funding / news', rate: 41 },
  { name: 'Tech stack', rate: 54 },
  { name: 'Seniority map', rate: 88 },
  { name: 'Competitor check', rate: 37 },
];

const TOOL_COMPARISON = [
  { name: 'Person-level ID', midbound: 94, snitcher: 22, factors: 18, rb2b: 61 },
  { name: 'Validated email', midbound: 88, snitcher: 15, factors: 12, rb2b: 72 },
  { name: 'LinkedIn URL', midbound: 91, snitcher: 9, factors: 8, rb2b: 74 },
  { name: 'Page-level intent', midbound: 97, snitcher: 55, factors: 62, rb2b: 48 },
];

function renderChart(token: string): ReactNode {
  if (token.startsWith('counter:')) {
    const parts = token.split(':');
    const value = parseFloat(parts[2] || '0');
    const suffix = parts[3] || '';
    return (
      <div className="my-6 text-center">
        <AnimatedCounter
          to={value}
          suffix={suffix}
          className="text-5xl sm:text-6xl font-bold text-primary"
        />
      </div>
    );
  }

  switch (token) {
    case 'geo-heat':
      return <GeoHeatGrid />;
    case 'titles-bar':
      return (
        <BarComparisonChart
          title="Identified visitors by role and team"
          description="Who MidBound surfaces for a typical B2B SaaS site over 30 days."
          data={TITLE_DISTRIBUTION}
          bars={[
            { dataKey: 'marketing', label: 'Marketing', color: 'var(--primary)' },
            { dataKey: 'sales', label: 'Sales', color: '#A855F7' },
          ]}
        />
      );
    case 'pageviews-area':
      return (
        <AreaTrendChart
          title="Identified vs anonymous sessions over 8 weeks"
          description="Same traffic, same pages. Volume grows as the ICP filters tune in."
          data={PAGEVIEW_TREND}
          areas={[
            { dataKey: 'anonymous', label: 'Anonymous', color: '#64748B' },
            { dataKey: 'identified', label: 'Identified', color: 'var(--primary)' },
          ]}
        />
      );
    case 'clay-waterfall':
      return (
        <BarComparisonChart
          title="Clay enrichment hit rate by column"
          description="Percent of identified visitors where each enrichment column returns a value."
          data={CLAY_WATERFALL}
          bars={[{ dataKey: 'rate', label: 'Hit rate (%)', color: 'var(--primary)' }]}
          layout="vertical"
        />
      );
    case 'tools-matrix':
      return <ComparisonMatrix />;
    default:
      return null;
  }
}

const TOKEN_PATTERN = /<!--\s*chart:([a-z0-9:\-]+)\s*-->/gi;

export default function ChartAwareContent({ html }: ChartAwareContentProps) {
  const parts: ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  while ((match = TOKEN_PATTERN.exec(html)) !== null) {
    const segment = html.slice(lastIndex, match.index);
    if (segment) {
      parts.push(
        <div
          key={`html-${key++}`}
          className="prose"
          dangerouslySetInnerHTML={{ __html: segment }}
        />
      );
    }
    const chart = renderChart(match[1]);
    if (chart) parts.push(<div key={`chart-${key++}`}>{chart}</div>);
    lastIndex = match.index + match[0].length;
  }

  const tail = html.slice(lastIndex);
  if (tail) {
    parts.push(
      <div
        key={`html-${key++}`}
        className="prose"
        dangerouslySetInnerHTML={{ __html: tail }}
      />
    );
  }

  return <>{parts}</>;
}
