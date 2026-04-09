import Link from 'next/link';
import type { Metadata } from 'next';
import { Card, CardContent } from '@/components/ui/card';
import { buttonVariants } from '@/components/ui/button';
import { FileText, BookOpen, HelpCircle, BookA, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Page Not Found',
  description: 'The page you are looking for does not exist or has been moved.',
  robots: { index: false, follow: true },
};

const links = [
  { href: '/blog', label: 'Blog', desc: 'Person-level GTM insights from Sebastian and Eli', icon: FileText },
  { href: '/playbooks', label: 'Playbooks', desc: 'Step-by-step guides for MidBound setup and workflows', icon: BookOpen },
  { href: '/help-center', label: 'Help Center', desc: 'Features, integrations, and troubleshooting', icon: HelpCircle },
  { href: '/glossary', label: 'Glossary', desc: '45+ B2B marketing and visitor identification terms', icon: BookA },
];

export default function NotFound() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-20 text-center">
      <p className="text-sm font-mono tracking-widest uppercase text-primary mb-4">
        404
      </p>
      <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-4">
        Page not found
      </h1>
      <p className="text-muted-foreground mb-8 max-w-md mx-auto">
        This page doesn&apos;t exist or was moved. Try one of these instead:
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto mb-12">
        {links.map(({ href, label, desc, icon: Icon }) => (
          <Link key={href} href={href}>
            <Card className="h-full bg-card border-border hover:border-primary/50 transition-all text-left group">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-1">
                  <Icon className="h-4 w-4 text-primary" />
                  <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">{label}</p>
                </div>
                <p className="text-xs text-muted-foreground">{desc}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
      <a
        href="https://midbound.ai/register"
        target="_blank"
        rel="noopener noreferrer"
        className={buttonVariants({ size: 'lg', className: 'cta-glow' })}
      >
        Start Your Free Trial
        <ArrowRight className="h-4 w-4 ml-1" />
      </a>
    </div>
  );
}
