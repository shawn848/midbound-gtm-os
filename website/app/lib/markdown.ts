import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeHighlight from 'rehype-highlight';
import rehypeSlug from 'rehype-slug';
import rehypeStringify from 'rehype-stringify';

function stripFirstH1(content: string): string {
  return content.replace(/^\s*#\s+[^\n]+\n+/, '');
}

export async function markdownToHtml(content: string): Promise<string> {
  const prepared = stripFirstH1(content);
  const result = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeSlug)
    .use(rehypeHighlight)
    .use(rehypeStringify)
    .process(prepared);

  return result.toString();
}
