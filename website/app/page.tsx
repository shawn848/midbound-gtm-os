import { getAllPosts } from './lib/posts';
import PostCard from './components/PostCard';

export default function HomePage() {
  const posts = getAllPosts();

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
      {/* Hero */}
      <section className="mb-16 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-[var(--color-text-primary)] mb-4">
          MidBound Blog
        </h1>
        <p className="text-lg text-[var(--color-text-secondary)] max-w-2xl mx-auto">
          Person-level GTM insights from the founders of MidBound
        </p>
      </section>

      {/* Latest posts */}
      <section>
        <h2 className="text-xl font-semibold text-[var(--color-text-primary)] mb-8">
          Latest Posts
        </h2>
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
      </section>
    </div>
  );
}
