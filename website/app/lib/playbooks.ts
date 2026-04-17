import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface Playbook {
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  time_to_complete: string;
  tools_needed: string[];
  seo_title: string;
  seo_description: string;
  keywords: string[];
  related_playbooks: string[];
  section_titles: string[];
  content: string;
}

const BOILERPLATE_HEADINGS = new Set([
  "what you'll have when done",
  'next steps',
  'related posts',
  'privacy and compliance notes',
  'privacy notes',
  'compliance notes',
  'related playbooks',
  'why clay instead of direct integration',
]);

function cleanHeading(raw: string): string {
  return raw.replace(/^Step\s+\d+\s*[:.\-]\s*/i, '').trim();
}

function extractSectionTitles(content: string, max = 5): string[] {
  const lines = content.split('\n');
  const titles: string[] = [];
  for (const line of lines) {
    const match = /^##\s+(.+?)\s*$/.exec(line);
    if (!match) continue;
    const raw = match[1].trim();
    if (BOILERPLATE_HEADINGS.has(raw.toLowerCase())) continue;
    titles.push(cleanHeading(raw));
    if (titles.length >= max) break;
  }
  return titles;
}

const playbooksDir = path.join(process.cwd(), '..', 'content', 'playbooks');

const categoryLabels: Record<string, string> = {
  'getting-started': 'Getting Started',
  'outreach-workflows': 'Outreach Workflows',
  'crm-setup': 'CRM Setup',
  'analytics': 'Analytics & Optimization',
};

const categoryOrder: string[] = [
  'getting-started',
  'outreach-workflows',
  'crm-setup',
  'analytics',
];

export function getAllPlaybooks(): Playbook[] {
  if (!fs.existsSync(playbooksDir)) return [];

  const files = fs.readdirSync(playbooksDir).filter((f) => f.endsWith('.md'));
  const playbooks: Playbook[] = [];

  for (const file of files) {
    const filePath = path.join(playbooksDir, file);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(fileContent);

    if (data.draft === true) continue;

    playbooks.push({
      title: data.title,
      slug: data.slug,
      category: data.category,
      excerpt: data.excerpt,
      difficulty: data.difficulty,
      time_to_complete: data.time_to_complete,
      tools_needed: data.tools_needed || [],
      seo_title: data.seo_title,
      seo_description: data.seo_description,
      keywords: data.keywords || [],
      related_playbooks: data.related_playbooks || [],
      section_titles: extractSectionTitles(content),
      content,
    });
  }

  return playbooks.sort((a, b) => {
    const ai = categoryOrder.indexOf(a.category);
    const bi = categoryOrder.indexOf(b.category);
    const aIdx = ai === -1 ? categoryOrder.length : ai;
    const bIdx = bi === -1 ? categoryOrder.length : bi;
    return aIdx - bIdx;
  });
}

export function getPlaybookBySlug(slug: string): Playbook | undefined {
  return getAllPlaybooks().find((p) => p.slug === slug);
}

export function getAllPlaybookSlugs(): string[] {
  return getAllPlaybooks().map((p) => p.slug);
}

export function getCategoryLabel(category: string): string {
  return categoryLabels[category] || category;
}

export function getPlaybooksByCategory(): Record<string, Playbook[]> {
  const playbooks = getAllPlaybooks();
  const grouped: Record<string, Playbook[]> = {};
  for (const pb of playbooks) {
    if (!grouped[pb.category]) grouped[pb.category] = [];
    grouped[pb.category].push(pb);
  }
  return grouped;
}

export function getSortedCategories(
  grouped: Record<string, Playbook[]>
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
