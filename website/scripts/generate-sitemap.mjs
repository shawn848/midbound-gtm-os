import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const BASE_URL = 'https://blog.midbound.ai';

function getAllSlugs(contentDir, subDirs) {
  const slugs = [];
  for (const dir of subDirs) {
    const dirPath = path.join(contentDir, dir);
    if (!fs.existsSync(dirPath)) continue;
    const files = fs.readdirSync(dirPath).filter(f => f.endsWith('.md'));
    for (const file of files) {
      const content = fs.readFileSync(path.join(dirPath, file), 'utf-8');
      const { data } = matter(content);
      if (data.slug) {
        slugs.push({ slug: data.slug, date: data.date || new Date().toISOString().split('T')[0] });
      }
    }
  }
  return slugs;
}

function getSimpleSlugs(dir) {
  if (!fs.existsSync(dir)) return [];
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.md'));
  return files.map(file => {
    const content = fs.readFileSync(path.join(dir, file), 'utf-8');
    const { data } = matter(content);
    return data.slug ? { slug: data.slug } : null;
  }).filter(Boolean);
}

function getNestedSlugs(dir) {
  if (!fs.existsSync(dir)) return [];
  const slugs = [];
  const subdirs = fs.readdirSync(dir, { withFileTypes: true }).filter(d => d.isDirectory());
  for (const subdir of subdirs) {
    const files = fs.readdirSync(path.join(dir, subdir.name)).filter(f => f.endsWith('.md'));
    for (const file of files) {
      const content = fs.readFileSync(path.join(dir, subdir.name, file), 'utf-8');
      const { data } = matter(content);
      if (data.slug) slugs.push({ slug: data.slug });
    }
  }
  return slugs;
}

function generateSitemap() {
  const blogDir = path.join(process.cwd(), '..', 'content', 'blog');
  const glossaryDir = path.join(process.cwd(), '..', 'content', 'glossary');
  const playbooksDir = path.join(process.cwd(), '..', 'content', 'playbooks');
  const helpCenterDir = path.join(process.cwd(), '..', 'content', 'help-center');

  const blogPosts = getAllSlugs(blogDir, ['sebastian', 'eli']);
  const glossaryTerms = getSimpleSlugs(glossaryDir);
  const playbooks = getSimpleSlugs(playbooksDir);
  const helpArticles = getNestedSlugs(helpCenterDir);

  const today = new Date().toISOString().split('T')[0];

  const urls = [
    { loc: '/', priority: '1.0', changefreq: 'weekly' },
    { loc: '/blog', priority: '0.9', changefreq: 'weekly' },
    { loc: '/playbooks', priority: '0.8', changefreq: 'weekly' },
    { loc: '/help-center', priority: '0.8', changefreq: 'weekly' },
    { loc: '/glossary', priority: '0.8', changefreq: 'monthly' },
    ...blogPosts.map(p => ({
      loc: `/blog/${p.slug}`,
      lastmod: p.date,
      priority: '0.7',
      changefreq: 'monthly',
    })),
    ...playbooks.map(p => ({
      loc: `/playbooks/${p.slug}`,
      priority: '0.7',
      changefreq: 'monthly',
    })),
    ...helpArticles.map(a => ({
      loc: `/help-center/${a.slug}`,
      priority: '0.6',
      changefreq: 'monthly',
    })),
    ...glossaryTerms.map(t => ({
      loc: `/glossary/${t.slug}`,
      priority: '0.6',
      changefreq: 'monthly',
    })),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url>
    <loc>${BASE_URL}${u.loc}</loc>
    ${u.lastmod ? `<lastmod>${u.lastmod}</lastmod>` : `<lastmod>${today}</lastmod>`}
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  fs.writeFileSync(path.join(process.cwd(), 'public', 'sitemap.xml'), xml);
  console.log(`Sitemap generated with ${urls.length} URLs`);
}

generateSitemap();
