import Link from 'next/link';
import { Separator } from '@/components/ui/separator';

const footerSections = [
  {
    title: 'Content',
    links: [
      { href: '/blog', label: 'Blog' },
      { href: '/playbooks', label: 'Playbooks' },
      { href: '/help-center', label: 'Help Center' },
      { href: '/glossary', label: 'Glossary' },
    ],
  },
  {
    title: 'Product',
    links: [
      { href: 'https://midbound.ai', label: 'Platform', external: true },
      { href: 'https://midbound.ai/register', label: 'Free Trial', external: true },
      { href: 'https://midbound.ai/pricing', label: 'Pricing', external: true },
      { href: 'https://midbound.ai/docs', label: 'Docs', external: true },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-border mt-auto">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="h-6 w-6 rounded-md bg-primary flex items-center justify-center">
                <span className="text-[10px] font-bold text-primary-foreground">M</span>
              </div>
              <span className="text-sm font-bold text-foreground">Midbound</span>
            </div>
            <p className="text-xs text-muted-foreground max-w-[200px]">
              Person-level website visitor identification for modern GTM teams.
            </p>
          </div>

          {/* Link sections */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <p className="text-xs font-semibold text-foreground uppercase tracking-wider mb-3">
                {section.title}
              </p>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    {'external' in link && link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="my-6" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} MidBound. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Built by Sebastian &amp; Eli
          </p>
        </div>
      </div>
    </footer>
  );
}
