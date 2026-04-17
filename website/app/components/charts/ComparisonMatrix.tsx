'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Check, X, Minus } from 'lucide-react';

interface ToolRow {
  tool: string;
  level: string;
  names: 'yes' | 'no' | 'partial';
  emails: string;
  icp: string;
  setup: string;
  price: string;
  bestFor: string;
  highlight?: boolean;
}

const DEFAULT_ROWS: ToolRow[] = [
  {
    tool: 'Midbound',
    level: 'Person',
    names: 'yes',
    emails: 'Yes (validated)',
    icp: 'Yes (auto)',
    setup: 'Minutes',
    price: 'SMB – Mid',
    bestFor: 'B2B SaaS, agencies',
    highlight: true,
  },
  { tool: 'RB2B', level: 'Person', names: 'yes', emails: 'Yes (Pro+)', icp: 'Hot Leads filter', setup: 'Minutes', price: '$79 – $199/mo', bestFor: 'Broad person-level' },
  { tool: 'Snitcher', level: 'Company', names: 'no', emails: '—', icp: '—', setup: 'Minutes', price: '$39/mo+', bestFor: 'Budget SMB' },
  { tool: 'Factors.ai', level: 'Account', names: 'no', emails: '—', icp: '—', setup: 'Hours', price: 'Mid-market', bestFor: 'Attribution teams' },
  { tool: 'Vector', level: 'Person / Contact', names: 'yes', emails: 'Yes (add-on)', icp: 'ICP matching', setup: 'Minutes', price: '$399/mo+', bestFor: 'Contact-level ads' },
  { tool: 'Breeze (Clearbit)', level: 'Company', names: 'no', emails: 'Enrichment only', icp: '—', setup: 'Moderate', price: '$75/mo+', bestFor: 'HubSpot users' },
  { tool: '6sense', level: 'Account', names: 'no', emails: 'Database only', icp: 'Predictive', setup: 'Weeks', price: '$50K+/yr', bestFor: 'Enterprise ABM' },
  { tool: 'Demandbase', level: 'Account', names: 'no', emails: 'Database only', icp: 'Predictive', setup: 'Weeks', price: '$50K+/yr', bestFor: 'Enterprise ABM' },
];

function NamesCell({ value }: { value: 'yes' | 'no' | 'partial' }) {
  if (value === 'yes') return <Check className="h-4 w-4 text-primary inline-block" aria-label="Yes" />;
  if (value === 'no') return <X className="h-4 w-4 text-muted-foreground/60 inline-block" aria-label="No" />;
  return <Minus className="h-4 w-4 text-muted-foreground inline-block" aria-label="Partial" />;
}

interface ComparisonMatrixProps {
  title?: string;
  description?: string;
  rows?: ToolRow[];
}

export default function ComparisonMatrix({
  title = 'Visitor identification tools at a glance',
  description = 'Side-by-side on the fields that actually matter for B2B pipeline.',
  rows = DEFAULT_ROWS,
}: ComparisonMatrixProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -15% 0px' });

  return (
    <div ref={ref} className="my-8 not-prose">
      {title && <h3 className="text-base font-semibold text-foreground mb-1">{title}</h3>}
      {description && <p className="text-xs text-muted-foreground mb-4">{description}</p>}
      <div className="overflow-x-auto rounded-xl border border-border bg-card">
        <table className="w-full text-sm min-w-[840px]">
          <thead>
            <tr className="border-b border-border bg-secondary/40">
              <th className="text-left font-semibold px-4 py-3 text-xs uppercase tracking-wider text-muted-foreground">Tool</th>
              <th className="text-left font-semibold px-4 py-3 text-xs uppercase tracking-wider text-muted-foreground">Level</th>
              <th className="text-center font-semibold px-4 py-3 text-xs uppercase tracking-wider text-muted-foreground">Names</th>
              <th className="text-left font-semibold px-4 py-3 text-xs uppercase tracking-wider text-muted-foreground">Emails</th>
              <th className="text-left font-semibold px-4 py-3 text-xs uppercase tracking-wider text-muted-foreground">ICP Score</th>
              <th className="text-left font-semibold px-4 py-3 text-xs uppercase tracking-wider text-muted-foreground">Setup</th>
              <th className="text-left font-semibold px-4 py-3 text-xs uppercase tracking-wider text-muted-foreground">Price</th>
              <th className="text-left font-semibold px-4 py-3 text-xs uppercase tracking-wider text-muted-foreground">Best For</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <motion.tr
                key={row.tool}
                initial={{ opacity: 0, y: 8 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
                transition={{ delay: i * 0.05, duration: 0.4, ease: 'easeOut' }}
                className={`border-b border-border/50 transition-colors hover:bg-primary/5 ${
                  row.highlight ? 'bg-primary/10 hover:bg-primary/15' : ''
                }`}
              >
                <td className={`px-4 py-3 font-semibold ${row.highlight ? 'text-primary' : 'text-foreground'}`}>
                  {row.tool}
                </td>
                <td className="px-4 py-3 text-muted-foreground">{row.level}</td>
                <td className="px-4 py-3 text-center"><NamesCell value={row.names} /></td>
                <td className="px-4 py-3 text-muted-foreground">{row.emails}</td>
                <td className="px-4 py-3 text-muted-foreground">{row.icp}</td>
                <td className="px-4 py-3 text-muted-foreground">{row.setup}</td>
                <td className="px-4 py-3 text-foreground font-medium">{row.price}</td>
                <td className="px-4 py-3 text-muted-foreground">{row.bestFor}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-[11px] text-muted-foreground mt-2">
        Data points reflect publicly available product tiers as of April 2026. Swipe horizontally to see all columns.
      </p>
    </div>
  );
}
