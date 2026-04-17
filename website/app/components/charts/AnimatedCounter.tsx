'use client';

import { animate, useInView, useMotionValue, useTransform } from 'framer-motion';
import { useEffect, useRef } from 'react';

interface AnimatedCounterProps {
  to: number;
  from?: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  className?: string;
}

export default function AnimatedCounter({
  to,
  from = 0,
  duration = 1.6,
  suffix = '',
  prefix = '',
  decimals = 0,
  className = '',
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -20% 0px' });
  const value = useMotionValue(from);
  const rounded = useTransform(value, (latest) =>
    latest.toLocaleString('en-US', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    })
  );

  useEffect(() => {
    if (!inView) return;
    const controls = animate(value, to, {
      duration,
      ease: 'easeOut',
    });
    return () => controls.stop();
  }, [inView, to, duration, value]);

  useEffect(() => {
    const unsub = rounded.on('change', (latest) => {
      if (ref.current) ref.current.textContent = `${prefix}${latest}${suffix}`;
    });
    return () => unsub();
  }, [rounded, prefix, suffix]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {from.toLocaleString('en-US', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}
      {suffix}
    </span>
  );
}
