import Link from 'next/link';
import { getAllPosts } from './lib/posts';
import { getAllPlaybooks } from './lib/playbooks';
import { getAllHelpArticles } from './lib/helpCenter';
import PostCard from './components/PostCard';
import StatsCard from './components/StatsCard';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  FileText,
  BookOpen,
  HelpCircle,
  BookA,
  ArrowRight,
  Zap,
} from 'lucide-react';
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

const sectionCards = [
  { href: '/blog', label: 'Blog', icon: FileText, desc: 'Person-level GTM, AEO, GEO, B2B strategy' },
  { href: '/playbooks', label: 'Playbooks', icon: BookOpen, desc: 'Step-by-step setup and workflow guides' },
  { href: '/help-center', label: 'Help Center', icon: HelpCircle, desc: 'Features, integrations, troubleshooting' },
  { href: '/glossary', label: 'Glossary', icon: BookA, desc: 'AEO, GEO, visitor ID definitions' },
];

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

      {/* Hero with radial glow */}
      <section className="glow-hero py-16 sm:py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <Badge variant="outline" className="mb-6 text-primary border-primary/30 bg-primary/5">
            <Zap className="h-3 w-3 mr-1" />
            The MidBound Knowledge Engine
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
          <div className="flex items-center justify-center gap-3 mb-12">
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
              Read the Blog
            </Link>
          </div>

          {/* Stats row — matching midbound.ai dashboard style */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto">
            <StatsCard icon="people" label="Blog Posts" value={posts.length} />
            <StatsCard icon="companies" label="Playbooks" value={playbooks.length} />
            <StatsCard icon="emails" label="Help Articles" value={helpArticles.length} />
            <StatsCard icon="audience" label="Glossary Terms" value="45+" />
          </div>
        </div>
      </section>

      <Separator />

      {/* Knowledge Engine Grid */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-semibold text-foreground mb-2">Knowledge Engine</h2>
          <p className="text-sm text-muted-foreground mb-8">
            Everything you need to master person-level visitor identification.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {sectionCards.map(({ href, label, icon: Icon, desc }) => (
              <Link key={href} href={href}>
                <Card className="h-full bg-card border-border hover:border-primary/50 transition-all group glow-card cursor-pointer">
                  <CardContent className="p-5">
                    <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                      <Icon className="h-4.5 w-4.5 text-primary" />
                    </div>
                    <p className="text-sm font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                      {label}
                    </p>
                    <p className="text-xs text-muted-foreground">{desc}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Separator />

      {/* Latest Posts */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-xl font-semibold text-foreground mb-1">Latest Posts</h2>
              <p className="text-sm text-muted-foreground">Fresh insights from the founders</p>
            </div>
            <Link
              href="/blog"
              className={buttonVariants({ variant: 'outline', size: 'sm' })}
            >
              View all
              <ArrowRight className="h-3 w-3 ml-1" />
            </Link>
          </div>
          {posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.slice(0, 6).map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">No posts yet. Check back soon.</p>
          )}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Card className="bg-primary/5 border-primary/20 glow-card">
            <CardContent className="p-8 sm:p-12 text-center">
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
                Stop guessing. Start <span className="gradient-text">knowing.</span>
              </h2>
              <p className="text-sm text-muted-foreground max-w-lg mx-auto mb-6">
                97% of website visitors leave without a trace. MidBound identifies the actual people — name, title, company, email — not just the IP.
              </p>
              <a
                href="https://midbound.ai/register"
                target="_blank"
                rel="noopener noreferrer"
                className={buttonVariants({ size: 'lg', className: 'cta-glow' })}
              >
                14-Day Free Trial — No CC Required
                <ArrowRight className="h-4 w-4 ml-1" />
              </a>
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  );
}
