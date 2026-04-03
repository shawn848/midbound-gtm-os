import Link from 'next/link';
import { getAllPosts } from './lib/posts';
import PostCard from './components/PostCard';

export default function HomePage() {
  const posts = getAllPosts();

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
      {/* Hero */}
      <section className="mb-20 text-center">
        <p className="text-sm font-mono tracking-widest uppercase text-[var(--color-accent)] mb-4">
          The MidBound Blog
        </p>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6">
          See who visits your site.
          <br />
          <span className="text-[var(--color-accent)]">Not just which company.</span>
        </h1>
        <p className="text-lg text-[var(--color-text-secondary)] max-w-2xl mx-auto mb-8">
          Person-level GTM insights from Sebastian Obadia and Eli Freedman — the founders building the future of website visitor identification.
        </p>
        <blockquote className="max-w-xl mx-auto border-l-2 border-[var(--color-accent)] pl-4 text-left italic text-[var(--color-text-secondary)]">
          &ldquo;We don&apos;t just help you track who comes to your website. We give you the full playbook on why they should stay.&rdquo;
        </blockquote>
      </section>

      {/* Resource links */}
      <section className="mb-16 flex flex-wrap justify-center gap-3">
        <Link
          href="/blog"
          className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-2 text-sm font-medium text-white hover:border-[var(--color-accent)] transition-colors"
        >
          All Posts
        </Link>
        <Link
          href="/glossary"
          className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-2 text-sm font-medium text-white hover:border-[var(--color-accent)] transition-colors"
        >
          Glossary
        </Link>
        <a
          href="https://midbound.ai/register"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-lg bg-[var(--color-accent)] px-4 py-2 text-sm font-medium text-white hover:opacity-90 transition-opacity"
        >
          Start Free Trial
        </a>
      </section>

      {/* Latest posts */}
      <section>
        <h2 className="text-xl font-semibold text-white mb-8">
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
