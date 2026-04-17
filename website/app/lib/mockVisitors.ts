import { PAGE_CATEGORIES, type PageCategory } from './pageCategory';

export type Seniority = 'IC' | 'Manager' | 'Director' | 'VP' | 'C-level';
export type Team = 'marketing' | 'sales' | 'product' | 'exec' | 'ops';

export interface Visitor {
  id: string;
  timestamp: number;
  company: string;
  domain: string;
  country: string;
  country_code: string;
  lat: number;
  lng: number;
  title: string;
  seniority: Seniority;
  team: Team;
  session_duration_sec: number;
  pages_viewed: string[];
  icp_score: number;
  industry: string;
}

type WeightedEntry<T> = [T, number];

function mulberry32(seed: number) {
  let t = seed >>> 0;
  return () => {
    t = (t + 0x6d2b79f5) >>> 0;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r;
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

function pick<T>(rng: () => number, entries: WeightedEntry<T>[]): T {
  const total = entries.reduce((s, [, w]) => s + w, 0);
  let r = rng() * total;
  for (const [value, weight] of entries) {
    r -= weight;
    if (r <= 0) return value;
  }
  return entries[entries.length - 1][0];
}

export const COUNTRIES: {
  country: string;
  country_code: string;
  lat: number;
  lng: number;
  weight: number;
}[] = [
  { country: 'United States', country_code: 'US', lat: 37.0902, lng: -95.7129, weight: 58 },
  { country: 'Israel', country_code: 'IL', lat: 31.0461, lng: 34.8516, weight: 14 },
  { country: 'United Kingdom', country_code: 'GB', lat: 55.3781, lng: -3.436, weight: 6 },
  { country: 'Germany', country_code: 'DE', lat: 51.1657, lng: 10.4515, weight: 5 },
  { country: 'Canada', country_code: 'CA', lat: 56.1304, lng: -106.3468, weight: 5 },
  { country: 'Australia', country_code: 'AU', lat: -25.2744, lng: 133.7751, weight: 3 },
  { country: 'Netherlands', country_code: 'NL', lat: 52.1326, lng: 5.2913, weight: 3 },
  { country: 'France', country_code: 'FR', lat: 46.2276, lng: 2.2137, weight: 2 },
  { country: 'Singapore', country_code: 'SG', lat: 1.3521, lng: 103.8198, weight: 2 },
  { country: 'India', country_code: 'IN', lat: 20.5937, lng: 78.9629, weight: 2 },
];

const SENIORITIES: WeightedEntry<Seniority>[] = [
  ['C-level', 10],
  ['VP', 18],
  ['Director', 30],
  ['Manager', 26],
  ['IC', 16],
];

const TEAMS: WeightedEntry<Team>[] = [
  ['marketing', 36],
  ['sales', 28],
  ['ops', 14],
  ['product', 14],
  ['exec', 8],
];

interface CompanyConfig {
  name: string;
  domain: string;
  industry: string;
  weight: number;
}

const COMPANIES: CompanyConfig[] = [
  { name: 'Factors', domain: 'factors.ai', industry: 'B2B SaaS', weight: 80 },
  { name: 'Clearbit', domain: 'clearbit.com', industry: 'B2B SaaS', weight: 40 },
  { name: 'Lattice', domain: 'lattice.com', industry: 'B2B SaaS', weight: 25 },
  { name: 'Rippling', domain: 'rippling.com', industry: 'B2B SaaS', weight: 18 },
  { name: 'Gong', domain: 'gong.io', industry: 'B2B SaaS', weight: 14 },
  { name: 'Clay', domain: 'clay.com', industry: 'B2B SaaS', weight: 10 },
  { name: 'Notion', domain: 'notion.so', industry: 'B2B SaaS', weight: 8 },
  { name: 'HubSpot', domain: 'hubspot.com', industry: 'B2B SaaS', weight: 7 },
  { name: 'Linear', domain: 'linear.app', industry: 'B2B SaaS', weight: 6 },
  { name: 'Deel', domain: 'deel.com', industry: 'B2B SaaS', weight: 5 },
  { name: 'Figma', domain: 'figma.com', industry: 'B2B SaaS', weight: 5 },
  { name: 'Ramp', domain: 'ramp.com', industry: 'Fintech', weight: 4 },
  { name: 'Segment', domain: 'segment.com', industry: 'B2B SaaS', weight: 4 },
  { name: 'Amplitude', domain: 'amplitude.com', industry: 'B2B SaaS', weight: 4 },
  { name: 'Mixpanel', domain: 'mixpanel.com', industry: 'B2B SaaS', weight: 3 },
  { name: 'PostHog', domain: 'posthog.com', industry: 'B2B SaaS', weight: 3 },
  { name: 'Mercury', domain: 'mercury.com', industry: 'Fintech', weight: 3 },
  { name: 'Plaid', domain: 'plaid.com', industry: 'Fintech', weight: 3 },
  { name: 'Vanta', domain: 'vanta.com', industry: 'B2B SaaS', weight: 3 },
  { name: 'Drata', domain: 'drata.com', industry: 'B2B SaaS', weight: 3 },
  { name: 'Vercel', domain: 'vercel.com', industry: 'B2B SaaS', weight: 3 },
  { name: 'Retool', domain: 'retool.com', industry: 'B2B SaaS', weight: 3 },
  { name: 'Attio', domain: 'attio.com', industry: 'B2B SaaS', weight: 3 },
  { name: 'Apollo', domain: 'apollo.io', industry: 'B2B SaaS', weight: 3 },
  { name: 'Outreach', domain: 'outreach.io', industry: 'B2B SaaS', weight: 3 },
  { name: 'Salesloft', domain: 'salesloft.com', industry: 'B2B SaaS', weight: 3 },
  { name: 'Intercom', domain: 'intercom.com', industry: 'B2B SaaS', weight: 3 },
  { name: 'Zendesk', domain: 'zendesk.com', industry: 'B2B SaaS', weight: 3 },
  { name: 'Canva', domain: 'canva.com', industry: 'B2B SaaS', weight: 2 },
  { name: 'Monday', domain: 'monday.com', industry: 'B2B SaaS', weight: 2 },
  { name: 'Wix', domain: 'wix.com', industry: 'B2B SaaS', weight: 2 },
  { name: 'Coda', domain: 'coda.io', industry: 'B2B SaaS', weight: 2 },
  { name: 'Loom', domain: 'loom.com', industry: 'B2B SaaS', weight: 2 },
  { name: 'Warmly', domain: 'warmly.ai', industry: 'B2B SaaS', weight: 2 },
  { name: 'RB2B', domain: 'rb2b.com', industry: 'B2B SaaS', weight: 2 },
  { name: 'Snitcher', domain: 'snitcher.com', industry: 'B2B SaaS', weight: 2 },
  { name: 'Melio', domain: 'meliopayments.com', industry: 'Fintech', weight: 2 },
  { name: 'Lemonade', domain: 'lemonade.com', industry: 'Fintech', weight: 2 },
  { name: 'AppsFlyer', domain: 'appsflyer.com', industry: 'B2B SaaS', weight: 2 },
  { name: 'Front', domain: 'front.com', industry: 'B2B SaaS', weight: 2 },
];

const TITLES_BY_SENIORITY: Record<Seniority, string[]> = {
  'C-level': ['CEO', 'CRO', 'CMO', 'CFO', 'CTO', 'COO', 'CPO', 'Founder', 'Co-Founder'],
  'VP': ['VP of Sales', 'VP of Marketing', 'VP of Revenue', 'VP of Growth', 'VP of Product', 'VP of Engineering'],
  'Director': ['Director of Marketing', 'Director of Demand Gen', 'Director of Sales Ops', 'Director of RevOps', 'Director of Growth', 'Director of Product Marketing'],
  'Manager': ['Marketing Manager', 'Growth Manager', 'Demand Gen Manager', 'SDR Manager', 'RevOps Manager', 'Content Manager'],
  'IC': ['Senior SDR', 'Marketing Specialist', 'Growth Marketer', 'RevOps Analyst', 'Senior Engineer', 'Lifecycle Marketer'],
};

const PATHS_BY_CATEGORY: Record<PageCategory, string[]> = {
  Homepage: ['/'],
  Product: ['/features', '/integrations', '/compare', '/product'],
  Pricing: ['/pricing'],
  Docs: ['/docs', '/docs/api', '/docs/quickstart', '/docs/install'],
  Blog: [
    '/blog/person-level-intent-abm-upgrade',
    '/blog/best-visitor-identification-tools-2026',
    '/blog/what-success-actually-means',
    '/blog/how-visitor-analytics-actually-work',
  ],
  'Case Study': ['/case-studies', '/customers', '/case-studies/lattice', '/case-studies/clay'],
  Demo: ['/demo'],
  Playbooks: ['/playbooks', '/playbooks/personalize-engagement-clay'],
  Other: ['/about', '/careers', '/security'],
};

const CATEGORY_WEIGHTS: Record<Seniority, WeightedEntry<PageCategory>[]> = {
  'C-level': [
    ['Homepage', 18],
    ['Pricing', 22],
    ['Product', 14],
    ['Case Study', 20],
    ['Blog', 7],
    ['Demo', 6],
    ['Playbooks', 2],
    ['Docs', 2],
    ['Other', 9],
  ],
  'VP': [
    ['Homepage', 12],
    ['Pricing', 20],
    ['Product', 18],
    ['Case Study', 16],
    ['Blog', 10],
    ['Demo', 10],
    ['Playbooks', 4],
    ['Docs', 2],
    ['Other', 8],
  ],
  'Director': [
    ['Homepage', 8],
    ['Pricing', 15],
    ['Product', 22],
    ['Case Study', 10],
    ['Blog', 12],
    ['Demo', 12],
    ['Playbooks', 10],
    ['Docs', 3],
    ['Other', 8],
  ],
  'Manager': [
    ['Homepage', 7],
    ['Pricing', 10],
    ['Product', 20],
    ['Case Study', 7],
    ['Blog', 15],
    ['Demo', 8],
    ['Playbooks', 15],
    ['Docs', 6],
    ['Other', 12],
  ],
  'IC': [
    ['Homepage', 6],
    ['Pricing', 4],
    ['Product', 14],
    ['Case Study', 4],
    ['Blog', 18],
    ['Demo', 3],
    ['Playbooks', 15],
    ['Docs', 26],
    ['Other', 10],
  ],
};

function pickPath(rng: () => number, seniority: Seniority): string {
  const category = pick(rng, CATEGORY_WEIGHTS[seniority]);
  const paths = PATHS_BY_CATEGORY[category];
  return paths[Math.floor(rng() * paths.length)];
}

function jitter(rng: () => number, base: number, spread: number): number {
  return base + (rng() - 0.5) * spread;
}

function buildVisitor(
  rng: () => number,
  idx: number,
  now: number,
  ninetyDaysAgo: number,
  company: CompanyConfig,
  geoRow: typeof COUNTRIES[number],
  seniority: Seniority,
  team: Team
): Visitor {
  const titles = TITLES_BY_SENIORITY[seniority];
  const title = titles[Math.floor(rng() * titles.length)];
  const pageCount = Math.max(1, Math.floor(rng() * 9));
  const pages_viewed: string[] = [];
  for (let p = 0; p < pageCount; p++) {
    pages_viewed.push(pickPath(rng, seniority));
  }
  const session_duration_sec = Math.floor(30 + rng() * 600);
  const icpBase = seniority === 'C-level' ? 6 : seniority === 'VP' ? 8 : seniority === 'Director' ? 9 : seniority === 'Manager' ? 7 : 5;
  const icp_score = Math.max(1, Math.min(10, Math.round(icpBase + (rng() - 0.5) * 3)));
  const offset = Math.pow(rng(), 0.35) * (now - ninetyDaysAgo);
  const timestamp = Math.floor(now - offset);

  return {
    id: `v_${idx.toString(36).padStart(5, '0')}`,
    timestamp,
    company: company.name,
    domain: company.domain,
    country: geoRow.country,
    country_code: geoRow.country_code,
    lat: jitter(rng, geoRow.lat, 4),
    lng: jitter(rng, geoRow.lng, 6),
    title,
    seniority,
    team,
    session_duration_sec,
    pages_viewed,
    icp_score,
    industry: company.industry,
  };
}

export function generateMockVisitors(count = 20000, seed = 42): Visitor[] {
  const rng = mulberry32(seed);
  const weightedCountries: WeightedEntry<typeof COUNTRIES[number]>[] =
    COUNTRIES.map((c) => [c, c.weight]);
  const weightedCompanies: WeightedEntry<CompanyConfig>[] =
    COMPANIES.map((c) => [c, c.weight]);

  const now = Date.now();
  const ninetyDaysAgo = now - 90 * 24 * 60 * 60 * 1000;

  const out: Visitor[] = [];

  for (let i = 0; i < count; i++) {
    const company = pick(rng, weightedCompanies);
    const geo = pick(rng, weightedCountries);
    const seniority = pick(rng, SENIORITIES);
    const team = pick(rng, TEAMS);
    out.push(buildVisitor(rng, i, now, ninetyDaysAgo, company, geo, seniority, team));
  }

  const byCompany = new Map<string, Visitor[]>();
  for (const v of out) {
    const arr = byCompany.get(v.company);
    if (arr) arr.push(v);
    else byCompany.set(v.company, [v]);
  }

  let nextId = out.length;
  for (const company of COMPANIES) {
    const existing = byCompany.get(company.name) || [];
    while (existing.length < 30) {
      const geo = pick(rng, weightedCountries);
      const seniority = pick(rng, SENIORITIES);
      const team = pick(rng, TEAMS);
      const v = buildVisitor(rng, nextId++, now, ninetyDaysAgo, company, geo, seniority, team);
      existing.push(v);
      out.push(v);
    }
    const seniorities = new Set(existing.map((v) => v.seniority));
    const required: Seniority[] = ['C-level', 'VP', 'Director', 'Manager', 'IC'];
    for (const need of required) {
      if (!seniorities.has(need)) {
        const geo = pick(rng, weightedCountries);
        const team = pick(rng, TEAMS);
        const v = buildVisitor(rng, nextId++, now, ninetyDaysAgo, company, geo, need, team);
        existing.push(v);
        out.push(v);
        seniorities.add(need);
      }
    }
    byCompany.set(company.name, existing);
  }

  return out.sort((a, b) => b.timestamp - a.timestamp);
}

export function getCompanyDomainMap(): Record<string, string> {
  const map: Record<string, string> = {};
  for (const c of COMPANIES) map[c.name] = c.domain;
  return map;
}
