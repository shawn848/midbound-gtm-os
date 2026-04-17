export type PageCategory =
  | 'Homepage'
  | 'Product'
  | 'Pricing'
  | 'Docs'
  | 'Blog'
  | 'Case Study'
  | 'Demo'
  | 'Playbooks'
  | 'Other';

export const PAGE_CATEGORIES: PageCategory[] = [
  'Homepage',
  'Product',
  'Pricing',
  'Docs',
  'Blog',
  'Case Study',
  'Demo',
  'Playbooks',
  'Other',
];

export function categorizePage(path: string): PageCategory {
  if (!path || path === '/' || path === '') return 'Homepage';
  if (path.startsWith('/pricing')) return 'Pricing';
  if (path.startsWith('/demo')) return 'Demo';
  if (path.startsWith('/docs')) return 'Docs';
  if (path.startsWith('/blog')) return 'Blog';
  if (path.startsWith('/case-studies') || path.startsWith('/customers')) return 'Case Study';
  if (path.startsWith('/playbooks')) return 'Playbooks';
  if (
    path.startsWith('/features') ||
    path.startsWith('/integrations') ||
    path.startsWith('/compare') ||
    path.startsWith('/product')
  ) {
    return 'Product';
  }
  return 'Other';
}
