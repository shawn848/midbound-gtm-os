'use client';

import { useMemo, useState } from 'react';
import AnimatedCounter from '../charts/AnimatedCounter';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  FIXED_ID_RATE,
  ROI_LIMITS,
  computePipelineMonthly,
} from '@/lib/labData';

type SliderProps = {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  format: (v: number) => string;
  onChange: (v: number) => void;
  help?: string;
};

function Slider({ label, value, min, max, step, format, onChange, help }: SliderProps) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div className="space-y-2">
      <div className="flex items-baseline justify-between gap-2">
        <label className="text-xs uppercase tracking-wider text-muted-foreground">{label}</label>
        <span className="text-sm font-semibold text-foreground tabular-nums">{format(value)}</span>
      </div>
      <div className="relative h-6 flex items-center">
        <div className="absolute inset-x-0 h-1.5 rounded-full bg-background/80 border border-border/60" />
        <div
          className="absolute h-1.5 rounded-full bg-gradient-to-r from-primary/70 to-primary pointer-events-none"
          style={{ width: `${pct}%` }}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="relative w-full appearance-none bg-transparent cursor-pointer [&::-webkit-slider-runnable-track]:h-1.5 [&::-webkit-slider-runnable-track]:bg-transparent [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:-mt-[5px] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-background [&::-webkit-slider-thumb]:shadow [&::-webkit-slider-thumb]:transition [&::-webkit-slider-thumb]:hover:scale-110 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-primary [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-background [&::-moz-range-track]:bg-transparent"
          aria-label={label}
        />
      </div>
      {help && <p className="text-[11px] text-muted-foreground">{help}</p>}
    </div>
  );
}

function formatDollars(n: number) {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `$${(n / 1_000).toFixed(0)}k`;
  return `$${n.toLocaleString()}`;
}

export default function RoiCalculator() {
  const [visitors, setVisitors] = useState<number>(ROI_LIMITS.visitors.default);
  const [dealSize, setDealSize] = useState<number>(ROI_LIMITS.dealSize.default);
  const [closeRate, setCloseRate] = useState<number>(ROI_LIMITS.closeRate.default);

  const pipelineMonthly = useMemo(
    () => computePipelineMonthly(visitors, dealSize, closeRate),
    [visitors, dealSize, closeRate]
  );
  const pipelineAnnual = pipelineMonthly * 12;

  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl sm:text-2xl font-bold">ROI calculator</CardTitle>
        <CardDescription className="mt-1 text-sm">
          Drag the sliders. The orange number is what you&rsquo;re currently leaving on the table.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-6">
            <Slider
              label="Monthly visitors"
              value={visitors}
              min={ROI_LIMITS.visitors.min}
              max={ROI_LIMITS.visitors.max}
              step={ROI_LIMITS.visitors.step}
              format={(v) => v.toLocaleString('en-US')}
              onChange={setVisitors}
            />
            <Slider
              label="Avg deal size"
              value={dealSize}
              min={ROI_LIMITS.dealSize.min}
              max={ROI_LIMITS.dealSize.max}
              step={ROI_LIMITS.dealSize.step}
              format={formatDollars}
              onChange={setDealSize}
            />
            <Slider
              label="Close rate on identified visitors"
              value={closeRate}
              min={ROI_LIMITS.closeRate.min}
              max={ROI_LIMITS.closeRate.max}
              step={ROI_LIMITS.closeRate.step}
              format={(v) => `${(v * 100).toFixed(1)}%`}
              onChange={setCloseRate}
            />
            <div className="inline-flex items-center gap-2 rounded-md border border-border/60 bg-secondary/30 px-3 py-2">
              <span className="text-[10px] uppercase tracking-wider text-muted-foreground">ID rate</span>
              <span className="text-sm font-semibold text-foreground tabular-nums">
                {(FIXED_ID_RATE * 100).toFixed(0)}%
              </span>
              <span className="text-[11px] text-muted-foreground">
                &middot; based on MidBound&rsquo;s published identification rate
              </span>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg border border-primary/30 bg-primary/[0.06] p-5 shadow-[0_0_24px_rgba(232,119,46,0.15)]">
              <div className="text-[11px] uppercase tracking-wider text-primary/90 mb-2">
                Pipeline unlocked &middot; monthly
              </div>
              <AnimatedCounter
                key={`with-${pipelineMonthly}`}
                to={pipelineMonthly}
                duration={0.6}
                prefix="$"
                className="text-3xl sm:text-4xl font-bold text-primary tabular-nums"
              />
              <div className="mt-2 text-xs text-muted-foreground">
                Annualized:{' '}
                <span className="text-foreground font-medium">
                  ${pipelineAnnual.toLocaleString('en-US')}
                </span>
              </div>
            </div>
            <div className="rounded-lg border border-border bg-secondary/20 p-5">
              <div className="text-[11px] uppercase tracking-wider text-muted-foreground mb-2">
                Without MidBound &middot; monthly
              </div>
              <div className="text-3xl sm:text-4xl font-bold text-muted-foreground/70 tabular-nums">
                $0
              </div>
              <div className="mt-2 text-xs text-muted-foreground">
                Anonymous traffic converts nowhere.
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
