import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Page Not Found',
  description: 'The page you are looking for does not exist or has been moved.',
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-20 text-center">
      <p className="text-sm font-mono tracking-widest uppercase text-[var(--color-accent)] mb-4">
        404
      </p>
      <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4">
        Page not found
      </h1>
      <p className="text-[var(--color-text-secondary)] mb-8 max-w-md mx-auto">
        This page doesn&apos;t exist or was moved. Try one of these instead:
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto mb-12">
        <Link
          href="/blog"
          className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-4 hover:border-[var(--color-accent)] transition-colors text-left"
        >
          <p className="text-sm font-semibold text-white mb-1">Blog</p>
          <p className="text-xs text-[var(--color-text-secondary)]">
            Person-level GTM insights from Sebastian and Eli
          </p>
        </Link>
        <Link
          href="/playbooks"
          className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-4 hover:border-[var(--color-accent)] transition-colors text-left"
        >
          <p className="text-sm font-semibold text-white mb-1">Playbooks</p>
          <p className="text-xs text-[var(--color-text-secondary)]">
            Step-by-step guides for MidBound setup and workflows
          </p>
        </Link>
        <Link
          href="/help-center"
          className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-4 hover:border-[var(--color-accent)] transition-colors text-left"
        >
          <p className="text-sm font-semibold text-white mb-1">Help Center</p>
          <p className="text-xs text-[var(--color-text-secondary)]">
            Features, integrations, and troubleshooting
          </p>
        </Link>
        <Link
          href="/glossary"
          className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-4 hover:border-[var(--color-accent)] transition-colors text-left"
        >
          <p className="text-sm font-semibold text-white mb-1">Glossary</p>
          <p className="text-xs text-[var(--color-text-secondary)]">
            45+ B2B marketing and visitor identification terms
          </p>
        </Link>
      </div>
      <a
        href="https://midbound.ai/register"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block rounded-lg bg-[var(--color-accent)] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90 transition-opacity"
      >
        Start Your Free Trial
      </a>
    </div>
  );
}
