import Link from 'next/link';
import { getAllPosts } from './lib/posts';
import { getAllPlaybooks } from './lib/playbooks';
import PostCard from './components/PostCard';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ArrowRight, Zap, FileText, BookOpen } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';

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

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
      />

      {/* Hero */}
      <section className="glow-hero py-16 sm:py-24 lg:py-28">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
          <Badge variant="outline" className="mb-6 text-primary border-primary/30 bg-primary/5">
            <Zap className="h-3 w-3 mr-1" />
            Midbound Knowledge Engine
          </Badge>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6 leading-tight">
            See who visits your site.
            <br />
            <span className="gradient-text">Not just which company.</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
            Person-level GTM insights from Sebastian Obadia and Eli Freedman.
            The founders building the future of website visitor identification.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href="https://midbound.ai/register"
              target="_blank"
              rel="noopener noreferrer"
              className={buttonVariants({ size: 'lg', className: 'cta-glow' })}
            >
              Start Free Trial
              <ArrowRight className="h-4 w-4 ml-1" />
            </a>
            <Link
              href="/blog"
              className={buttonVariants({ variant: 'outline', size: 'lg' })}
            >
              <FileText className="h-4 w-4 mr-2" />
              Read the Blog
            </Link>
            <Link
              href="/playbooks"
              className={buttonVariants({ variant: 'outline', size: 'lg' })}
            >
              <BookOpen className="h-4 w-4 mr-2" />
              Explore Playbooks
            </Link>
          </div>
        </div>
      </section>

      <Separator />

      {/* All posts */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-xl font-semibold text-foreground mb-1">From the founders</h2>
              <p className="text-sm text-muted-foreground">
                {posts.length} post{posts.length === 1 ? '' : 's'} · {playbooks.length} playbook{playbooks.length === 1 ? '' : 's'}
              </p>
            </div>
            <Link
              href="/blog"
              className={buttonVariants({ variant: 'outline', size: 'sm' })}
            >
              All posts
              <ArrowRight className="h-3 w-3 ml-1" />
            </Link>
          </div>
          {posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post, i) => (
                <div
                  key={post.slug}
                  className="animate-in fade-in slide-in-from-bottom-4"
                  style={{ animationDelay: `${i * 60}ms`, animationFillMode: 'both' }}
                >
                  <PostCard post={post} />
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">No posts yet.</p>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Card className="bg-primary/5 border-primary/20 glow-card">
            <CardContent className="p-8 sm:p-12 text-center">
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
                Stop guessing. Start <span className="gradient-text">knowing.</span>
              </h2>
              <p className="text-sm text-muted-foreground max-w-lg mx-auto mb-6">
                97% of website visitors leave without a trace. Midbound identifies the actual people, not just the IP.
              </p>
              <a
                href="https://midbound.ai/register"
                target="_blank"
                rel="noopener noreferrer"
                className={buttonVariants({ size: 'lg', className: 'cta-glow' })}
              >
                14-Day Free Trial, No CC Required
                <ArrowRight className="h-4 w-4 ml-1" />
              </a>
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  );
}
