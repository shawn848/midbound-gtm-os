import { generateMockVisitors, type Visitor } from './mockVisitors';

export const FUNNEL_RATES = {
  identify: 0.15,
  icp: 0.30,
  pricing: 0.20,
  meeting: 0.08,
} as const;

export type FunnelStage = {
  key: 'visitors' | 'identified' | 'icp' | 'pricing' | 'meeting';
  label: string;
  withCount: number;
  withoutCount: number;
  conversionFromPrev: number | null;
};

export function buildFunnel(monthlyVisitors = 15_000): FunnelStage[] {
  const identified = Math.round(monthlyVisitors * FUNNEL_RATES.identify);
  const icp = Math.round(identified * FUNNEL_RATES.icp);
  const pricing = Math.round(icp * FUNNEL_RATES.pricing);
  const meeting = Math.round(pricing * FUNNEL_RATES.meeting);

  return [
    {
      key: 'visitors',
      label: 'Anonymous traffic',
      withCount: monthlyVisitors,
      withoutCount: monthlyVisitors,
      conversionFromPrev: null,
    },
    {
      key: 'identified',
      label: 'Identified visitor',
      withCount: identified,
      withoutCount: 0,
      conversionFromPrev: FUNNEL_RATES.identify,
    },
    {
      key: 'icp',
      label: 'ICP match',
      withCount: icp,
      withoutCount: 0,
      conversionFromPrev: FUNNEL_RATES.icp,
    },
    {
      key: 'pricing',
      label: 'Pricing-intent signal',
      withCount: pricing,
      withoutCount: 0,
      conversionFromPrev: FUNNEL_RATES.pricing,
    },
    {
      key: 'meeting',
      label: 'Meeting booked',
      withCount: meeting,
      withoutCount: 0,
      conversionFromPrev: FUNNEL_RATES.meeting,
    },
  ];
}

export const ROI_LIMITS = {
  visitors: { min: 500, max: 100_000, step: 500, default: 15_000 },
  dealSize: { min: 1_000, max: 500_000, step: 1_000, default: 25_000 },
  closeRate: { min: 0.005, max: 0.10, step: 0.001, default: 0.02 },
} as const;

export const FIXED_ID_RATE = 0.15;

export function computePipelineMonthly(
  visitors: number,
  dealSize: number,
  closeRate: number,
  idRate = FIXED_ID_RATE
) {
  return Math.round(visitors * idRate * closeRate * dealSize);
}

export type FeedRow = {
  id: string;
  name: string;
  title: string;
  company: string;
  domain: string;
  page: string;
  secondsAgo: number;
};

const FIRST_NAMES = [
  'Sarah', 'Marcus', 'Priya', 'Daniel', 'Elena', 'James', 'Maya', 'Omar',
  'Rachel', 'Tomás', 'Lena', 'Nikhil', 'Claire', 'Yusuf', 'Zoe', 'Alex',
  'Jordan', 'Aisha', 'Ben', 'Emma', 'Liam', 'Sofia', 'Noah', 'Ava',
];

const LAST_NAMES = [
  'Chen', 'Patel', 'Nguyen', 'Fischer', 'Okonkwo', 'Martínez', 'Kowalski',
  'Rossi', 'Johansson', 'Abdullah', 'Kim', 'Brown', 'Singh', 'Walker',
  'Sato', 'Hughes', 'Park', 'Morales', 'Weber', 'Davis',
];

function nameFor(seed: string): string {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  const first = FIRST_NAMES[h % FIRST_NAMES.length];
  const last = LAST_NAMES[(h >>> 8) % LAST_NAMES.length];
  return `${first} ${last}`;
}

let feedPoolCache: Visitor[] | null = null;
export function getFeedPool(): Visitor[] {
  if (feedPoolCache) return feedPoolCache;
  const all = generateMockVisitors(20_000, 42);
  feedPoolCache = all.filter(
    (v) => v.seniority !== 'IC' && v.pages_viewed.length > 0 && v.icp_score >= 5
  );
  return feedPoolCache;
}

export function sampleFeedRows(count: number, rotationIndex = 0): FeedRow[] {
  const pool = getFeedPool();
  const rows: FeedRow[] = [];
  for (let i = 0; i < count; i++) {
    const v = pool[(rotationIndex + i * 37) % pool.length];
    const page = v.pages_viewed[v.pages_viewed.length - 1] ?? '/';
    rows.push({
      id: `${v.id}-${rotationIndex}-${i}`,
      name: nameFor(`${v.id}-${v.company}`),
      title: v.title,
      company: v.company,
      domain: v.domain,
      page,
      secondsAgo: (i * 3) + 2,
    });
  }
  return rows;
}

export const WORKFLOW_PROSPECT = {
  name: 'Sarah Chen',
  title: 'VP Growth',
  company: 'Lattice',
  domain: 'lattice.com',
  email: 's.chen@lattice.com',
  page: '/pricing',
  icpScore: 9,
  anonId: 'ANON_7a2f91',
  city: 'San Francisco',
  device: 'MacBook · Chrome',
} as const;

export const WORKFLOW_STEPS = [
  {
    key: 'visit',
    label: 'Visit',
    sublabel: 'Anonymous session opens',
  },
  {
    key: 'match',
    label: 'Match',
    sublabel: 'LinkedIn identity lookup',
  },
  {
    key: 'identify',
    label: 'Identify',
    sublabel: 'Person-level resolution',
  },
  {
    key: 'alert',
    label: 'Alert',
    sublabel: 'Slack ping to growth channel',
  },
  {
    key: 'crm',
    label: 'CRM sync',
    sublabel: 'HubSpot contact + deal',
  },
  {
    key: 'outreach',
    label: 'Outreach',
    sublabel: 'Personalized email drafted',
  },
] as const;

export function buildMonthlySeries(pipelineMonthly: number, months = 12) {
  const now = new Date();
  const series: { label: string; identified: number; anonymous: number }[] = [];
  for (let i = months - 1; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const label = d.toLocaleString('en-US', { month: 'short' });
    const ramp = 0.6 + (months - 1 - i) * (0.4 / (months - 1));
    series.push({
      label,
      identified: Math.round(pipelineMonthly * ramp),
      anonymous: 0,
    });
  }
  return series;
}
