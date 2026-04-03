import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface GlossaryTerm {
  title: string;
  slug: string;
  category: string;
  short_description: string;
  seo_title: string;
  seo_description: string;
  keywords: string[];
  related_terms: string[];
  content: string;
}

const glossaryDir = path.join(process.cwd(), '..', 'content', 'glossary');

export function getAllTerms(): GlossaryTerm[] {
  if (!fs.existsSync(glossaryDir)) return [];

  const files = fs.readdirSync(glossaryDir).filter((f) => f.endsWith('.md'));
  const terms: GlossaryTerm[] = [];

  for (const file of files) {
    const filePath = path.join(glossaryDir, file);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(fileContent);

    terms.push({
      title: data.title,
      slug: data.slug,
      category: data.category,
      short_description: data.short_description,
      seo_title: data.seo_title,
      seo_description: data.seo_description,
      keywords: data.keywords || [],
      related_terms: data.related_terms || [],
      content,
    });
  }

  return terms.sort((a, b) => a.title.localeCompare(b.title));
}

export function getTermBySlug(slug: string): GlossaryTerm | undefined {
  return getAllTerms().find((t) => t.slug === slug);
}

export function getTermsByCategory(): Record<string, GlossaryTerm[]> {
  const terms = getAllTerms();
  const grouped: Record<string, GlossaryTerm[]> = {};
  for (const term of terms) {
    if (!grouped[term.category]) grouped[term.category] = [];
    grouped[term.category].push(term);
  }
  return grouped;
}

const categoryLabels: Record<string, string> = {
  'search-optimization': 'Search & AI Optimization',
  'analytics-tools': 'Analytics & SEO Tools',
  'visitor-identification': 'Website Visitor Identification',
  'b2b-marketing': 'B2B Marketing',
  'crm-integrations': 'CRM & Integrations',
  'metrics': 'Metrics & KPIs',
};

const categoryOrder: string[] = [
  'visitor-identification',
  'b2b-marketing',
  'search-optimization',
  'analytics-tools',
  'crm-integrations',
  'metrics',
];

export function getCategoryLabel(category: string): string {
  return categoryLabels[category] || category;
}

export function getSortedCategories(
  grouped: Record<string, GlossaryTerm[]>
): string[] {
  const keys = Object.keys(grouped);
  return keys.sort((a, b) => {
    const ai = categoryOrder.indexOf(a);
    const bi = categoryOrder.indexOf(b);
    const aIdx = ai === -1 ? categoryOrder.length : ai;
    const bIdx = bi === -1 ? categoryOrder.length : bi;
    return aIdx - bIdx;
  });
}
