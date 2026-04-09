import Link from 'next/link';
import { getAllPosts } from '../lib/posts';
import BlogGrid from '../components/BlogGrid';
import { Badge } from '@/components/ui/badge';
import { buttonVariants } from '@/components/ui/button';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'All Posts — MidBound Blog',
  description: 'Browse all MidBound blog posts on person-level identification, ABM evolution, GEO, AEO, B2B sales strategy, and startup growth.',
};

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
      <div className="mb-12">
        <Badge variant="outline" className="text-primary border-primary/30 mb-3">
          {posts.length} posts
        </Badge>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-4">
          All Posts
        </h1>
        <p className="text-muted-foreground">
          Insights on person-level GTM, B2B sales, AEO, GEO, and startup growth.
        </p>
      </div>

      <BlogGrid posts={posts} />

      <div className="mt-12 text-center">
        <Link
          href="/glossary"
          className={buttonVariants({ variant: 'outline' })}
        >
          Browse Glossary (45+ terms)
        </Link>
      </div>
    </div>
  );
}
