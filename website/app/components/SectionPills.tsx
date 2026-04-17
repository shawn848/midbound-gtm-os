'use client';

import { motion } from 'framer-motion';

interface SectionPillsProps {
  sections: string[];
  className?: string;
  max?: number;
}

export default function SectionPills({ sections, className = '', max = 4 }: SectionPillsProps) {
  if (!sections || sections.length === 0) return null;
  const visible = sections.slice(0, max);

  return (
    <div className={`flex flex-wrap gap-1.5 ${className}`}>
      {visible.map((label, i) => (
        <motion.span
          key={`${label}-${i}`}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.04, duration: 0.35, ease: 'easeOut' }}
          whileHover={{
            y: -2,
            scale: 1.04,
            boxShadow: '0 0 12px rgba(255,255,255,0.32), 0 0 18px rgba(232,119,46,0.45)',
          }}
          className="inline-flex items-center rounded-full border border-primary/35 bg-primary/10 px-2.5 py-0.5 text-[11px] font-medium text-primary"
        >
          {label}
        </motion.span>
      ))}
    </div>
  );
}
