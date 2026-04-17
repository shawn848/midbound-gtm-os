'use client';

import { motion, useReducedMotion } from 'framer-motion';
import {
  Bell,
  Database,
  Eye,
  Loader2,
  Mail,
  Search,
  UserCheck,
  type LucideIcon,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { WORKFLOW_PROSPECT, WORKFLOW_STEPS } from '@/lib/labData';

const STEP_DURATION_MS = 4000;

const ICONS: Record<string, LucideIcon> = {
  visit: Eye,
  match: Search,
  identify: UserCheck,
  alert: Bell,
  crm: Database,
  outreach: Mail,
};

function StepVisit() {
  return (
    <div className="space-y-1.5 text-xs">
      <div className="flex items-center justify-between">
        <span className="text-muted-foreground">Session</span>
        <span className="font-mono text-foreground">{WORKFLOW_PROSPECT.anonId}</span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-muted-foreground">Device</span>
        <span className="text-foreground">{WORKFLOW_PROSPECT.device}</span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-muted-foreground">City</span>
        <span className="text-foreground">{WORKFLOW_PROSPECT.city}</span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-muted-foreground">Page</span>
        <span className="text-primary font-medium">{WORKFLOW_PROSPECT.page}</span>
      </div>
    </div>
  );
}

function StepMatch({ active }: { active: boolean }) {
  return (
    <div className="space-y-2 text-xs">
      <div className="flex items-center gap-2 text-muted-foreground">
        <span className="font-mono text-[10px] bg-secondary/60 border border-border/60 rounded px-1.5 py-0.5">
          linkedin.com
        </span>
        <span>lookup</span>
      </div>
      <div className="rounded-md border border-border/60 bg-background/60 p-2">
        {active ? (
          <div className="flex items-center gap-2 text-foreground">
            <Loader2 className="h-3.5 w-3.5 animate-spin text-primary" />
            <span>Resolving identity&hellip;</span>
          </div>
        ) : (
          <div className="flex items-center gap-2 text-foreground">
            <UserCheck className="h-3.5 w-3.5 text-primary" />
            <span>Match confidence 94%</span>
          </div>
        )}
      </div>
    </div>
  );
}

function StepIdentify() {
  const initials = WORKFLOW_PROSPECT.name.split(' ').map((s) => s[0]).join('');
  return (
    <div className="space-y-2 text-xs">
      <div className="flex items-center gap-2">
        <div className="h-9 w-9 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-[11px] font-bold text-white">
          {initials}
        </div>
        <div className="min-w-0">
          <div className="text-foreground font-medium truncate">{WORKFLOW_PROSPECT.name}</div>
          <div className="text-muted-foreground truncate">
            {WORKFLOW_PROSPECT.title} &middot; {WORKFLOW_PROSPECT.company}
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-muted-foreground">Email</span>
        <span className="text-foreground font-mono text-[11px]">{WORKFLOW_PROSPECT.email}</span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-muted-foreground">ICP score</span>
        <span className="inline-flex items-center gap-1 text-primary font-semibold">
          {WORKFLOW_PROSPECT.icpScore}/10
        </span>
      </div>
    </div>
  );
}

function StepAlert() {
  return (
    <div className="space-y-2 text-xs">
      <div className="flex items-center gap-2 text-muted-foreground">
        <span className="text-foreground">#growth-alerts</span>
        <span>&middot; slack</span>
      </div>
      <div className="rounded-md border border-border/60 bg-background/60 p-2 space-y-1">
        <div className="text-foreground font-medium">MidBound bot</div>
        <div className="text-muted-foreground leading-snug">
          <span className="text-primary">{WORKFLOW_PROSPECT.name}</span> ({WORKFLOW_PROSPECT.company}) just hit{' '}
          <span className="font-mono">{WORKFLOW_PROSPECT.page}</span>. ICP 9/10.
        </div>
      </div>
    </div>
  );
}

function StepCrm() {
  return (
    <div className="space-y-1.5 text-xs">
      <div className="flex items-center gap-2 text-muted-foreground">
        <span className="text-foreground">HubSpot</span>
        <span>&middot; synced</span>
      </div>
      <div className="rounded-md border border-border/60 bg-background/60 divide-y divide-border/50">
        <div className="flex items-center justify-between px-2 py-1.5">
          <span className="text-muted-foreground">Contact</span>
          <span className="text-foreground">{WORKFLOW_PROSPECT.name}</span>
        </div>
        <div className="flex items-center justify-between px-2 py-1.5">
          <span className="text-muted-foreground">Company</span>
          <span className="text-foreground">{WORKFLOW_PROSPECT.company}</span>
        </div>
        <div className="flex items-center justify-between px-2 py-1.5">
          <span className="text-muted-foreground">Stage</span>
          <span className="text-primary font-medium">MQL</span>
        </div>
      </div>
    </div>
  );
}

function StepOutreach() {
  return (
    <div className="space-y-1.5 text-xs">
      <div className="flex items-center gap-2 text-muted-foreground">
        <span className="text-foreground">Draft</span>
        <span>&middot; reviewed before send</span>
      </div>
      <div className="rounded-md border border-border/60 bg-background/60 p-2 space-y-1 leading-snug">
        <div className="text-muted-foreground">To: {WORKFLOW_PROSPECT.email}</div>
        <div className="text-foreground">
          Hey {WORKFLOW_PROSPECT.name.split(' ')[0]} &mdash; saw you were looking at{' '}
          <span className="font-mono text-primary">{WORKFLOW_PROSPECT.page}</span>. Want a 10-minute teardown of how Lattice could plug MidBound into your HubSpot?
        </div>
      </div>
    </div>
  );
}

const STEP_BODIES: Record<string, (active: boolean) => React.ReactNode> = {
  visit: () => <StepVisit />,
  match: (active) => <StepMatch active={active} />,
  identify: () => <StepIdentify />,
  alert: () => <StepAlert />,
  crm: () => <StepCrm />,
  outreach: () => <StepOutreach />,
};

export default function VisitToDealFlow() {
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (reduced || paused) return;
    const interval = setInterval(() => {
      setActive((a) => (a + 1) % WORKFLOW_STEPS.length);
    }, STEP_DURATION_MS);
    return () => clearInterval(interval);
  }, [reduced, paused]);

  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl sm:text-2xl font-bold">
          A visit becomes a deal
        </CardTitle>
        <CardDescription className="mt-1 text-sm">
          Six steps, auto-firing &mdash; pause on hover. Sarah Chen (VP Growth, Lattice) walks through the whole pipeline.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          className="-mx-2 overflow-x-auto md:overflow-visible"
        >
          <div className="flex md:grid md:grid-cols-6 gap-3 px-2 pb-2 snap-x snap-mandatory">
            {WORKFLOW_STEPS.map((step, i) => {
              const Icon = ICONS[step.key];
              const isActive = !reduced && i === active;
              const body = STEP_BODIES[step.key](isActive);
              return (
                <motion.div
                  key={step.key}
                  initial={reduced ? false : { opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ delay: reduced ? 0 : i * 0.06, duration: 0.4, ease: 'easeOut' }}
                  animate={{
                    scale: isActive ? 1.02 : 1,
                  }}
                  className={`relative w-[78vw] md:w-auto shrink-0 snap-start rounded-lg border p-3 transition-colors ${
                    isActive
                      ? 'border-primary/60 bg-primary/[0.06] shadow-[0_0_24px_rgba(232,119,46,0.18)]'
                      : 'border-border bg-secondary/30'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div
                      className={`h-7 w-7 rounded-md flex items-center justify-center ${
                        isActive
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-background text-muted-foreground border border-border/60'
                      }`}
                    >
                      <Icon className="h-3.5 w-3.5" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
                        Step {i + 1}
                      </div>
                      <div className="text-sm font-semibold text-foreground">{step.label}</div>
                    </div>
                  </div>
                  <div className="text-[11px] text-muted-foreground mb-2">{step.sublabel}</div>
                  {body}
                </motion.div>
              );
            })}
          </div>
        </div>
        {!reduced && (
          <div className="mt-4 flex items-center gap-1.5">
            {WORKFLOW_STEPS.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Jump to step ${i + 1}`}
                onClick={() => setActive(i)}
                className={`h-1.5 rounded-full transition-all ${
                  i === active ? 'w-6 bg-primary' : 'w-1.5 bg-border hover:bg-muted-foreground/40'
                }`}
              />
            ))}
            <span className="ml-2 text-[11px] text-muted-foreground">
              {paused ? 'Paused (hover)' : 'Auto-advancing'}
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
