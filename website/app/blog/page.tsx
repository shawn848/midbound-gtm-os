import { getAllPosts } from '../lib/posts';
import BlogGrid from '../components/BlogGrid';
import { Badge } from '@/components/ui/badge';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog — Midbound',
  description: 'Person-level GTM insights from Midbound co-founders Sebastian Obadia and Eli Freedman. ABM, visitor identification, B2B sales strategy.',
};

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
      <div className="mb-12">
        <Badge variant="outline" className="text-primary border-primary/30 mb-3">
          {posts.length} post{posts.length === 1 ? '' : 's'}
        </Badge>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-4">
          Blog
        </h1>
        <p className="text-muted-foreground max-w-2xl">
          Person-level GTM, ABM evolution, and the operational reality of modern B2B sales. From the founders of Midbound.
        </p>
      </div>

      <BlogGrid posts={posts} />
    </div>
  );
}
