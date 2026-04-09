import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface HelpArticle {
  title: string;
  slug: string;
  category: string;
  order: number;
  short_answer: string;
  seo_title: string;
  seo_description: string;
  keywords: string[];
  related_articles: string[];
  content: string;
}

const helpDir = path.join(process.cwd(), '..', 'content', 'help-center');

const categoryLabels: Record<string, string> = {
  'getting-started': 'Getting Started',
  'features': 'Features',
  'integrations': 'Integrations',
  'troubleshooting': 'Troubleshooting',
};

const categoryOrder: string[] = [
  'getting-started',
  'features',
  'integrations',
  'troubleshooting',
];

export function getAllHelpArticles(): HelpArticle[] {
  if (!fs.existsSync(helpDir)) return [];

  const articles: HelpArticle[] = [];

  for (const category of categoryOrder) {
    const catDir = path.join(helpDir, category);
    if (!fs.existsSync(catDir)) continue;

    const files = fs.readdirSync(catDir).filter((f) => f.endsWith('.md'));

    for (const file of files) {
      const filePath = path.join(catDir, file);
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const { data, content } = matter(fileContent);

      articles.push({
        title: data.title,
        slug: data.slug,
        category: data.category || category,
        order: data.order || 99,
        short_answer: data.short_answer || '',
        seo_title: data.seo_title,
        seo_description: data.seo_description,
        keywords: data.keywords || [],
        related_articles: data.related_articles || [],
        content,
      });
    }
  }

  return articles.sort((a, b) => {
    const catA = categoryOrder.indexOf(a.category);
    const catB = categoryOrder.indexOf(b.category);
    if (catA !== catB) return catA - catB;
    return a.order - b.order;
  });
}

export function getHelpArticleBySlug(slug: string): HelpArticle | undefined {
  return getAllHelpArticles().find((a) => a.slug === slug);
}

export function getAllHelpSlugs(): string[] {
  return getAllHelpArticles().map((a) => a.slug);
}

export function getCategoryLabel(category: string): string {
  return categoryLabels[category] || category;
}

export function getHelpByCategory(): Record<string, HelpArticle[]> {
  const articles = getAllHelpArticles();
  const grouped: Record<string, HelpArticle[]> = {};
  for (const article of articles) {
    if (!grouped[article.category]) grouped[article.category] = [];
    grouped[article.category].push(article);
  }
  return grouped;
}

export function getSortedCategories(
  grouped: Record<string, HelpArticle[]>
): string[] {
  const keys = Object.keys(grouped);
  return keys.sort((a, b) => {
    const ai = categoryOrder.indexOf(a);
    const bi = categoryOrder.indexOf(b);
    return (ai === -1 ? 99 : ai) - (bi === -1 ? 99 : bi);
  });
}
