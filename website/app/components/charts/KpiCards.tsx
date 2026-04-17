'use client';

import { useKpis } from '@/lib/filterStore';
import { Card, CardContent } from '@/components/ui/card';
import AnimatedCounter from './AnimatedCounter';
import MagnetCard from '../MagnetCard';
import { Users, Building2, Clock, TrendingUp } from 'lucide-react';

export default function KpiCards() {
  const kpis = useKpis();

  const tiles = [
    {
      label: 'Identified visitors',
      icon: Users,
      render: (
        <AnimatedCounter to={kpis.totalVisitors} className="text-3xl font-bold text-primary" />
      ),
    },
    {
      label: 'Unique companies',
      icon: Building2,
      render: (
        <AnimatedCounter
          to={kpis.identifiedCompanies}
          className="text-3xl font-bold text-foreground"
        />
      ),
    },
    {
      label: 'Avg session',
      icon: Clock,
      render: (
        <span className="text-3xl font-bold text-foreground">
          <AnimatedCounter to={kpis.avgSessionMin} decimals={1} />
          <span className="text-base font-semibold text-muted-foreground ml-1">min</span>
        </span>
      ),
    },
    {
      label: 'Top industry',
      icon: TrendingUp,
      render: (
        <span className="text-xl font-semibold text-foreground truncate block">
          {kpis.topIndustry}
        </span>
      ),
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {tiles.map(({ label, icon: Icon, render }) => (
        <MagnetCard key={label} strength={5}>
          <Card className="bg-card border-border glow-card h-full">
            <CardContent className="p-5">
              <div className="flex items-center gap-2 mb-3 text-muted-foreground">
                <Icon className="h-4 w-4 text-primary" />
                <span className="text-[11px] uppercase tracking-wider font-semibold">
                  {label}
                </span>
              </div>
              <div className="min-h-[36px] flex items-center">{render}</div>
            </CardContent>
          </Card>
        </MagnetCard>
      ))}
    </div>
  );
}
