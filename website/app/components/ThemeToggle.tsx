'use client';

import { useEffect, useState } from 'react';
import { Sun, Moon, Palette } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export default function ThemeToggle() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [scheme, setScheme] = useState<'platform' | 'cloud'>('platform');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'light' || storedTheme === 'dark') {
      setTheme(storedTheme);
    } else if (window.matchMedia('(prefers-color-scheme: light)').matches) {
      setTheme('light');
    }
    const storedScheme = localStorage.getItem('color-scheme');
    if (storedScheme === 'cloud') {
      setScheme('cloud');
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const html = document.documentElement;
    if (theme === 'light') {
      html.classList.add('light');
      html.setAttribute('data-theme', 'light');
    } else {
      html.classList.remove('light');
      html.removeAttribute('data-theme');
    }
    localStorage.setItem('theme', theme);
  }, [theme, mounted]);

  useEffect(() => {
    if (!mounted) return;
    const html = document.documentElement;
    if (scheme === 'cloud') {
      html.setAttribute('data-scheme', 'cloud');
    } else {
      html.removeAttribute('data-scheme');
    }
    localStorage.setItem('color-scheme', scheme);
  }, [scheme, mounted]);

  if (!mounted) {
    return <div className="flex gap-1"><div className="w-9 h-9" /><div className="w-9 h-9" /></div>;
  }

  return (
    <div className="flex items-center gap-1">
      <Tooltip>
        <TooltipTrigger
          render={
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setScheme(s => s === 'platform' ? 'cloud' : 'platform')}
              className="h-9 w-9"
              aria-label="Toggle color scheme"
            />
          }
        >
          <Palette className="h-4 w-4" />
        </TooltipTrigger>
        <TooltipContent>
          {scheme === 'platform' ? 'Platform (Orange)' : 'Cloud (Green)'}
        </TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger
          render={
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(t => t === 'dark' ? 'light' : 'dark')}
              className="h-9 w-9"
              aria-label="Toggle theme"
            />
          }
        >
          {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </TooltipTrigger>
        <TooltipContent>
          {theme === 'dark' ? 'Light mode' : 'Dark mode'}
        </TooltipContent>
      </Tooltip>
    </div>
  );
}
