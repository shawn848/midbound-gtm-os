'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import type { ReactNode } from 'react';
import { useRef } from 'react';

interface MagnetCardProps {
  children: ReactNode;
  strength?: number;
  className?: string;
}

const springConfig = { stiffness: 240, damping: 22, mass: 0.6 };

export default function MagnetCard({ children, strength = 8, className }: MagnetCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);
  const rotateX = useTransform(y, (v) => -v * 0.12);
  const rotateY = useTransform(x, (v) => v * 0.12);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const relX = event.clientX - rect.left - rect.width / 2;
    const relY = event.clientY - rect.top - rect.height / 2;
    mouseX.set((relX / (rect.width / 2)) * strength);
    mouseY.set((relY / (rect.height / 2)) * strength);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x, y, rotateX, rotateY, transformPerspective: 800 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
