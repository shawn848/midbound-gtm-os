import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)] mt-auto">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <div>
              <span className="text-sm font-semibold text-white block">
                MidBound
              </span>
              <span className="text-xs font-mono text-[var(--color-text-secondary)]">
                Person-level visitor identification
              </span>
            </div>
            <Link
              href="/blog"
              className="text-sm text-white/80 hover:text-white transition-colors"
            >
              Blog
            </Link>
            <Link
              href="/playbooks"
              className="text-sm text-white/80 hover:text-white transition-colors"
            >
              Playbooks
            </Link>
            <Link
              href="/help-center"
              className="text-sm text-white/80 hover:text-white transition-colors"
            >
              Help Center
            </Link>
            <Link
              href="/glossary"
              className="text-sm text-white/80 hover:text-white transition-colors"
            >
              Glossary
            </Link>
            <a
              href="https://midbound.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-white/80 hover:text-white transition-colors"
            >
              midbound.ai
            </a>
          </div>
          <p className="text-xs text-[var(--color-text-secondary)]">
            &copy; {new Date().getFullYear()} MidBound. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
