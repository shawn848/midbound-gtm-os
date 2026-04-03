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
  reading_time: number;
  content: string;
}

const contentDir = path.join(process.cwd(), '..', 'content', 'blog');

const authorDirs = ['sebastian', 'eli'] as const;

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
        reading_time: data.reading_time,
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
