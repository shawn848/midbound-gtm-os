'use client';

import Link from 'next/link';
import { useState } from 'react';
import ThemeToggle from './ThemeToggle';

export default function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-[var(--color-border)] bg-[var(--color-canvas)]/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="text-lg font-bold tracking-tight text-white"
          >
            MidBound
          </Link>

          {/* Desktop nav */}
          <div className="hidden sm:flex items-center gap-6">
            <Link
              href="/blog"
              className="text-sm text-[var(--color-text-secondary)] hover:text-white transition-colors"
            >
              Blog
            </Link>
            <Link
              href="/glossary"
              className="text-sm text-[var(--color-text-secondary)] hover:text-white transition-colors"
            >
              Glossary
            </Link>
            <a
              href="https://midbound.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-[var(--color-text-secondary)] hover:text-white transition-colors"
            >
              About
            </a>
            <a
              href="https://midbound.ai/register"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md bg-[var(--color-accent)] px-3 py-1.5 text-xs font-medium text-white hover:opacity-90 transition-opacity"
            >
              Start Free Trial
            </a>
            <ThemeToggle />
          </div>

          {/* Mobile controls */}
          <div className="flex sm:hidden items-center gap-3">
            <ThemeToggle />
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="w-9 h-9 flex items-center justify-center rounded-lg border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              ) : (
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="sm:hidden pb-4 border-t border-[var(--color-border)] pt-4 flex flex-col gap-3">
            <Link
              href="/blog"
              onClick={() => setMobileOpen(false)}
              className="text-sm text-[var(--color-text-secondary)] hover:text-white transition-colors"
            >
              Blog
            </Link>
            <Link
              href="/glossary"
              onClick={() => setMobileOpen(false)}
              className="text-sm text-[var(--color-text-secondary)] hover:text-white transition-colors"
            >
              Glossary
            </Link>
            <a
              href="https://midbound.ai"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileOpen(false)}
              className="text-sm text-[var(--color-text-secondary)] hover:text-white transition-colors"
            >
              About
            </a>
            <a
              href="https://midbound.ai/register"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileOpen(false)}
              className="inline-block rounded-md bg-[var(--color-accent)] px-3 py-1.5 text-xs font-medium text-white hover:opacity-90 transition-opacity w-fit"
            >
              Start Free Trial
            </a>
          </div>
        )}
      </div>
    </nav>
  );
}
