import Link from 'next/link';
import AuthorBadge from './AuthorBadge';
import type { Post } from '@/lib/posts';

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <article className="h-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-sm transition-all hover:border-[var(--color-text-secondary)] hover:shadow-md">
        <div className="flex items-center gap-2 mb-3">
          <span className="inline-block rounded-md bg-[var(--color-accent)]/10 px-2.5 py-0.5 text-xs font-medium text-[var(--color-accent)]">
            {post.pillar}
          </span>
          <span className="text-xs text-[var(--color-text-secondary)]">
            {post.reading_time} min read
          </span>
        </div>

        <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-2 group-hover:text-[var(--color-accent)] transition-colors line-clamp-2">
          {post.title}
        </h3>

        <p className="text-sm text-[var(--color-text-secondary)] mb-4 line-clamp-3">
          {post.excerpt}
        </p>

        <div className="flex items-center justify-between mt-auto">
          <AuthorBadge name={post.author_name} role={post.author_role} />
          <time
            dateTime={post.date}
            className="text-xs text-[var(--color-text-secondary)]"
          >
            {new Date(post.date).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            })}
          </time>
        </div>
      </article>
    </Link>
  );
}
