import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeRaw from 'rehype-raw';
import rehypeHighlight from 'rehype-highlight';
import rehypeStringify from 'rehype-stringify';
import GithubSlugger from 'github-slugger';

const BASE_PATH = '/blog';

function stripFirstH1(content: string): string {
  return content.replace(/^\s*#\s+[^\n]+\n+/, '');
}

function cleanHeading(text: string): string {
  return text.replace(/^Step\s+\d+\s*[:.\-]\s*/i, '').trim();
}

function rehypeBasePath() {
  const needsPrefix = (href: string) =>
    href.startsWith('/') &&
    !href.startsWith('//') &&
    !href.startsWith(BASE_PATH + '/') &&
    href !== BASE_PATH;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function walk(node: any) {
    if (node.type === 'element' && node.tagName === 'a' && node.properties?.href) {
      const href = node.properties.href;
      if (typeof href === 'string' && needsPrefix(href)) {
        node.properties.href = BASE_PATH + href;
      }
    }
    if (Array.isArray(node.children)) node.children.forEach(walk);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (tree: any) => walk(tree);
}

function rehypeCleanHeadingIds() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function extractText(node: any): string {
    if (node.type === 'text') return node.value;
    if (Array.isArray(node.children)) return node.children.map(extractText).join('');
    return '';
  }

  return (tree: unknown) => {
    const slugger = new GithubSlugger();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function walk(node: any) {
      if (node.type === 'element' && /^h[1-6]$/.test(node.tagName)) {
        const cleaned = cleanHeading(extractText(node));
        node.properties = node.properties || {};
        node.properties.id = slugger.slug(cleaned);
      }
      if (Array.isArray(node.children)) node.children.forEach(walk);
    }
    walk(tree);
  };
}

export async function markdownToHtml(content: string): Promise<string> {
  const prepared = stripFirstH1(content);
  const result = await unified()
    .use(remarkParse)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeCleanHeadingIds)
    .use(rehypeBasePath)
    .use(rehypeHighlight)
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(prepared);

  return result.toString();
}
