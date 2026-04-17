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

const COUNTRIES: {
  country: string;
  country_code: string;
  lat: number;
  lng: number;
  weight: number;
}[] = [
  { country: 'United States', country_code: 'US', lat: 37.0902, lng: -95.7129, weight: 60 },
  { country: 'Israel', country_code: 'IL', lat: 31.0461, lng: 34.8516, weight: 15 },
  { country: 'United Kingdom', country_code: 'GB', lat: 55.3781, lng: -3.436, weight: 5 },
  { country: 'Germany', country_code: 'DE', lat: 51.1657, lng: 10.4515, weight: 4 },
  { country: 'Canada', country_code: 'CA', lat: 56.1304, lng: -106.3468, weight: 4 },
  { country: 'Australia', country_code: 'AU', lat: -25.2744, lng: 133.7751, weight: 3 },
  { country: 'Netherlands', country_code: 'NL', lat: 52.1326, lng: 5.2913, weight: 3 },
  { country: 'France', country_code: 'FR', lat: 46.2276, lng: 2.2137, weight: 2 },
  { country: 'Singapore', country_code: 'SG', lat: 1.3521, lng: 103.8198, weight: 2 },
  { country: 'India', country_code: 'IN', lat: 20.5937, lng: 78.9629, weight: 2 },
];

const SENIORITIES: WeightedEntry<Seniority>[] = [
  ['C-level', 8],
  ['VP', 18],
  ['Director', 32],
  ['Manager', 26],
  ['IC', 16],
];

const TEAMS: WeightedEntry<Team>[] = [
  ['marketing', 38],
  ['sales', 28],
  ['ops', 14],
  ['product', 12],
  ['exec', 8],
];

const INDUSTRIES: WeightedEntry<string>[] = [
  ['B2B SaaS', 40],
  ['Agency', 18],
  ['Fintech', 12],
  ['HealthTech', 9],
  ['eCommerce', 9],
  ['Manufacturing', 6],
  ['Media', 6],
];

const COMPANIES = [
  'Lattice', 'Rippling', 'Gong', 'Clay', 'Default', 'Motion', 'Deel', 'Notion',
  'Airtable', 'Linear', 'Ramp', 'Mercury', 'Plaid', 'Vercel', 'Retool',
  'Segment', 'Amplitude', 'Mixpanel', 'Pendo', 'Heap', 'Hex', 'PostHog',
  'Fathom', 'Plausible', 'Cal.com', 'Vanta', 'Drata', 'Arc', 'Attio',
  'Superhuman', 'Loom', 'Figma', 'Canva', 'Monday', 'Wix', 'Melio',
  'Lemonade', 'Lusha', 'AppsFlyer', 'Common Room', 'Warmly', 'RB2B',
  'Snitcher', 'Factors', 'Clearbit', 'Apollo', 'Outreach', 'Salesloft',
  'HubSpot', 'Intercom', 'Zendesk', 'Front', 'Linear', 'Coda',
];

const TITLES_BY_SENIORITY: Record<Seniority, string[]> = {
  'C-level': ['CEO', 'CRO', 'CMO', 'CFO', 'CTO', 'COO', 'CPO', 'Founder', 'Co-Founder'],
  'VP': ['VP of Sales', 'VP of Marketing', 'VP of Revenue', 'VP of Growth', 'VP of Product', 'VP of Operations'],
  'Director': ['Director of Marketing', 'Director of Demand Gen', 'Director of Sales Ops', 'Director of RevOps', 'Director of Growth', 'Director of Product Marketing'],
  'Manager': ['Marketing Manager', 'Growth Manager', 'Demand Gen Manager', 'SDR Manager', 'RevOps Manager', 'Content Manager'],
  'IC': ['Senior SDR', 'Marketing Specialist', 'Growth Marketer', 'RevOps Analyst', 'Product Marketing Manager', 'Lifecycle Marketer'],
};

const PAGES = [
  '/pricing', '/demo', '/features', '/compare', '/integrations',
  '/blog/person-level-intent-abm-upgrade',
  '/blog/best-visitor-identification-tools-2026',
  '/blog/what-success-actually-means',
  '/playbooks', '/playbooks/personalize-engagement-clay',
  '/about', '/case-studies', '/', '/customers',
];

function domainize(company: string): string {
  return company
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '')
    .slice(0, 14) + '.com';
}

function jitter(rng: () => number, base: number, spread: number): number {
  return base + (rng() - 0.5) * spread;
}

export function generateMockVisitors(count = 300, seed = 42): Visitor[] {
  const rng = mulberry32(seed);
  const weightedCountries: WeightedEntry<typeof COUNTRIES[number]>[] =
    COUNTRIES.map((c) => [c, c.weight]);

  const now = Date.now();
  const ninetyDaysAgo = now - 90 * 24 * 60 * 60 * 1000;

  const out: Visitor[] = [];
  for (let i = 0; i < count; i++) {
    const geo = pick(rng, weightedCountries);
    const seniority = pick(rng, SENIORITIES);
    const team = pick(rng, TEAMS);
    const industry = pick(rng, INDUSTRIES);
    const company = COMPANIES[Math.floor(rng() * COMPANIES.length)];
    const titles = TITLES_BY_SENIORITY[seniority];
    const title = titles[Math.floor(rng() * titles.length)];

    const pageCount = Math.max(1, Math.floor(rng() * 9));
    const pages_viewed: string[] = [];
    for (let p = 0; p < pageCount; p++) {
      pages_viewed.push(PAGES[Math.floor(rng() * PAGES.length)]);
    }

    const session_duration_sec = Math.floor(30 + rng() * 600);
    const icp_base = seniority === 'C-level' ? 6 : seniority === 'VP' ? 8 : seniority === 'Director' ? 9 : seniority === 'Manager' ? 7 : 5;
    const icp_score = Math.max(1, Math.min(10, Math.round(icp_base + (rng() - 0.5) * 3)));

    out.push({
      id: `v_${i.toString(36).padStart(5, '0')}`,
      timestamp: Math.floor(ninetyDaysAgo + rng() * (now - ninetyDaysAgo)),
      company,
      domain: domainize(company),
      country: geo.country,
      country_code: geo.country_code,
      lat: jitter(rng, geo.lat, 4),
      lng: jitter(rng, geo.lng, 6),
      title,
      seniority,
      team,
      session_duration_sec,
      pages_viewed,
      icp_score,
      industry,
    });
  }

  return out.sort((a, b) => b.timestamp - a.timestamp);
}
