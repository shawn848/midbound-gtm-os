'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu, BookOpen, FileText, ExternalLink } from 'lucide-react';
import { Button, buttonVariants } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import ThemeToggle from './ThemeToggle';

const sections = [
  { href: '/blog', label: 'Blog', icon: FileText },
  { href: '/playbooks', label: 'Playbooks', icon: BookOpen },
];

function SectionTabs() {
  const pathname = usePathname();

  return (
    <div className="flex items-center rounded-full border border-border bg-secondary/50 p-1 shadow-sm">
      {sections.map(({ href, label, icon: Icon }) => {
        const isActive = pathname === href || pathname.startsWith(href + '/');
        return (
          <Link
            key={href}
            href={href}
            className={`flex items-center gap-2 rounded-full px-5 py-2 text-sm font-medium transition-all ${
              isActive
                ? 'bg-primary text-primary-foreground shadow-[0_0_24px_rgba(232,119,46,0.45)]'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Icon className="h-4 w-4" />
            <span>{label}</span>
          </Link>
        );
      })}
    </div>
  );
}

export default function Navigation() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 border-b border-border/60 bg-background/90 backdrop-blur-xl backdrop-saturate-150">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <img
              src="/blog/midbound-mark.png"
              alt="Midbound"
              width={28}
              height={28}
              className="h-7 w-7 rounded-md"
            />
            <span className="text-base font-bold tracking-tight text-foreground">
              Midbound
            </span>
            <span className="text-base font-light text-primary">
              Blog
            </span>
          </Link>

          {/* Desktop: Section tabs */}
          <div className="hidden md:flex flex-1 justify-center">
            <SectionTabs />
          </div>

          {/* Desktop: Actions */}
          <div className="hidden md:flex items-center gap-2 shrink-0">
            <ThemeToggle />
            <a
              href="https://midbound.ai/register"
              target="_blank"
              rel="noopener noreferrer"
              className={buttonVariants({ size: 'sm', className: 'cta-glow' })}
            >
              Start Free Trial
            </a>
          </div>

          {/* Mobile: Toggle + Sheet */}
          <div className="flex md:hidden items-center gap-2">
            <ThemeToggle />
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger
                render={<Button variant="ghost" size="icon" className="h-9 w-9" />}
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Open menu</span>
              </SheetTrigger>
              <SheetContent side="right" className="w-72">
                <SheetTitle className="text-base font-bold">Midbound Blog</SheetTitle>
                <div className="flex flex-col gap-1 mt-4">
                  {sections.map(({ href, label, icon: Icon }) => {
                    const isActive = pathname === href || pathname.startsWith(href + '/');
                    return (
                      <Link
                        key={href}
                        href={href}
                        onClick={() => setOpen(false)}
                        className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
                          isActive
                            ? 'bg-primary/10 text-primary font-medium'
                            : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                        {label}
                      </Link>
                    );
                  })}
                </div>
                <Separator className="my-4" />
                <div className="flex flex-col gap-2">
                  <a
                    href="https://midbound.ai"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                  >
                    <ExternalLink className="h-4 w-4" />
                    midbound.ai
                  </a>
                  <a
                    href="https://midbound.ai/register"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setOpen(false)}
                    className={buttonVariants({ className: 'mx-3 cta-glow' })}
                  >
                    Start Free Trial
                  </a>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
