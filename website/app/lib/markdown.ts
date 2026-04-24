import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeRaw from 'rehype-raw';
import rehypeHighlight from 'rehype-highlight';
import rehypeSlug from 'rehype-slug';
import rehypeStringify from 'rehype-stringify';

const BASE_PATH = '/blog';

function stripFirstH1(content: string): string {
  return content.replace(/^\s*#\s+[^\n]+\n+/, '');
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

export async function markdownToHtml(content: string): Promise<string> {
  const prepared = stripFirstH1(content);
  const result = await unified()
    .use(remarkParse)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeSlug)
    .use(rehypeBasePath)
    .use(rehypeHighlight)
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(prepared);

  return result.toString();
}
