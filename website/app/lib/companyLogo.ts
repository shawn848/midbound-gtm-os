const PALETTES: [string, string][] = [
  ['#E8772E', '#FDBA74'],
  ['#A855F7', '#F0ABFC'],
  ['#3B82F6', '#93C5FD'],
  ['#10B981', '#6EE7B7'],
  ['#F43F5E', '#FDA4AF'],
  ['#F59E0B', '#FCD34D'],
];

function hash(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

export function logoUrl(domain: string): string {
  return `https://logo.clearbit.com/${domain}`;
}

export function initialsForCompany(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[1][0]).toUpperCase();
}

export function gradientForCompany(name: string): { from: string; to: string } {
  const palette = PALETTES[hash(name) % PALETTES.length];
  return { from: palette[0], to: palette[1] };
}
