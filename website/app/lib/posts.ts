import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface Post {
  title: string;
  slug: string;
  date: string;
  author: 'sebastian' | 'eli';
  author_name: string;
  author_role: string;
  pillar: string;
  excerpt: string;
  seo_title: string;
  seo_description: string;
  keywords: string[];
  keyword_cluster: string;
  related_posts: string[];
  reading_time: number;
  section_titles: string[];
  content: string;
}

const contentDir = path.join(process.cwd(), '..', 'content', 'blog');

const authorDirs = ['sebastian', 'eli'] as const;

const BOILERPLATE_HEADINGS = new Set([
  "what you'll have when done",
  'next steps',
  'related posts',
  'privacy and compliance notes',
  'privacy notes',
  'compliance notes',
  'related playbooks',
]);

function cleanHeading(raw: string): string {
  return raw.replace(/^Step\s+\d+\s*[:.\-]\s*/i, '').trim();
}

export function extractSectionTitles(content: string, max = 5): string[] {
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

export function getAllPosts(): Post[] {
  const posts: Post[] = [];

  for (const authorDir of authorDirs) {
    const dirPath = path.join(contentDir, authorDir);
    if (!fs.existsSync(dirPath)) continue;

    const files = fs.readdirSync(dirPath).filter((f) => f.endsWith('.md'));

    for (const file of files) {
      const filePath = path.join(dirPath, file);
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const { data, content } = matter(fileContent);

      if (data.draft === true) continue;

      posts.push({
        title: data.title,
        slug: data.slug,
        date: data.date,
        author: data.author,
        author_name: data.author_name,
        author_role: data.author_role,
        pillar: data.pillar,
        excerpt: data.excerpt,
        seo_title: data.seo_title,
        seo_description: data.seo_description,
        keywords: data.keywords || [],
        keyword_cluster: data.keyword_cluster || '',
        related_posts: data.related_posts || [],
        reading_time: data.reading_time,
        section_titles: extractSectionTitles(content),
        content,
      });
    }
  }

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getPostBySlug(slug: string): Post | undefined {
  const allPosts = getAllPosts();
  return allPosts.find((post) => post.slug === slug);
}

export function getAllSlugs(): string[] {
  return getAllPosts().map((post) => post.slug);
}
