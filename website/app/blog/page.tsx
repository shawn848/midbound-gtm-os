import { getAllPosts } from '../lib/posts';
import PostCard from '../components/PostCard';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'All Posts',
  description: 'Browse all MidBound blog posts on B2B GTM strategy, ABM evolution, and person-level marketing.',
};

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
      <div className="mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--color-text-primary)] mb-4">
          All Posts
        </h1>
        <p className="text-[var(--color-text-secondary)]">
          Insights on person-level GTM, B2B sales, and startup growth.
        </p>
      </div>

      {posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <p className="text-[var(--color-text-secondary)]">
          No posts yet. Check back soon.
        </p>
      )}
    </div>
  );
}
