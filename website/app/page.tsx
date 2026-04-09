import Link from 'next/link';
import { getAllPosts } from './lib/posts';
import { getAllPlaybooks } from './lib/playbooks';
import { getAllHelpArticles } from './lib/helpCenter';
import PostCard from './components/PostCard';

const orgJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'MidBound',
  url: 'https://midbound.ai',
  description: 'Person-level website visitor identification for modern GTM teams',
  founders: [
    { '@type': 'Person', name: 'Sebastian Obadia', jobTitle: 'Co-Founder & CRO' },
    { '@type': 'Person', name: 'Eli Freedman', jobTitle: 'Co-Founder & CEO' },
  ],
};

export default function HomePage() {
  const posts = getAllPosts();
  const playbooks = getAllPlaybooks();
  const helpArticles = getAllHelpArticles();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
      />
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
            Person-level GTM insights from Sebastian Obadia and Eli Freedman. The founders building the future of website visitor identification.
          </p>
          <blockquote className="max-w-xl mx-auto border-l-2 border-[var(--color-accent)] pl-4 text-left italic text-white/90">
            &ldquo;We don&apos;t just help track who comes to your website. We give you the full facts on why they should stay there.&rdquo;
          </blockquote>
        </section>

        {/* Knowledge Engine */}
        <section className="mb-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <Link
            href="/blog"
            className="group rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 hover:border-[var(--color-accent)] transition-colors"
          >
            <p className="text-xs font-mono uppercase tracking-wider text-[var(--color-accent)] mb-2">Blog</p>
            <p className="text-sm font-semibold text-white mb-1 group-hover:text-[var(--color-accent)] transition-colors">
              {posts.length} Posts
            </p>
            <p className="text-xs text-[var(--color-text-secondary)]">
              Person-level GTM, AEO, GEO, B2B sales strategy
            </p>
          </Link>
          <Link
            href="/glossary"
            className="group rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 hover:border-[var(--color-accent)] transition-colors"
          >
            <p className="text-xs font-mono uppercase tracking-wider text-[var(--color-accent)] mb-2">Glossary</p>
            <p className="text-sm font-semibold text-white mb-1 group-hover:text-[var(--color-accent)] transition-colors">
              45+ Terms
            </p>
            <p className="text-xs text-[var(--color-text-secondary)]">
              AEO, GEO, visitor ID, B2B marketing definitions
            </p>
          </Link>
          <Link
            href="/playbooks"
            className="group rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 hover:border-[var(--color-accent)] transition-colors"
          >
            <p className="text-xs font-mono uppercase tracking-wider text-[var(--color-accent)] mb-2">Playbooks</p>
            <p className="text-sm font-semibold text-[var(--color-text-primary)] mb-1 group-hover:text-[var(--color-accent)] transition-colors">
              {playbooks.length} Guides
            </p>
            <p className="text-xs text-[var(--color-text-secondary)]">
              Step-by-step setup, workflows, and CRM automation
            </p>
          </Link>
          <Link
            href="/help-center"
            className="group rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 hover:border-[var(--color-accent)] transition-colors"
          >
            <p className="text-xs font-mono uppercase tracking-wider text-[var(--color-accent)] mb-2">Help Center</p>
            <p className="text-sm font-semibold text-[var(--color-text-primary)] mb-1 group-hover:text-[var(--color-accent)] transition-colors">
              {helpArticles.length} Articles
            </p>
            <p className="text-xs text-[var(--color-text-secondary)]">
              Features, integrations, and troubleshooting
            </p>
          </Link>
          <a
            href="https://midbound.ai/register"
            target="_blank"
            rel="noopener noreferrer"
            className="group rounded-xl border border-[var(--color-accent)]/30 bg-[var(--color-accent)]/5 p-5 hover:bg-[var(--color-accent)]/10 transition-colors cta-glow"
          >
            <p className="text-xs font-mono uppercase tracking-wider text-[var(--color-accent)] mb-2">Get Started</p>
            <p className="text-sm font-semibold text-[var(--color-text-primary)] mb-1">
              14-Day Free Trial
            </p>
            <p className="text-xs text-[var(--color-text-secondary)]">
              No credit card required. See your visitors today.
            </p>
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
    </>
  );
}
