'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

interface DataPoint {
  name: string;
  [key: string]: string | number;
}

interface BarComparisonChartProps {
  title: string;
  description?: string;
  data: DataPoint[];
  bars: {
    dataKey: string;
    label: string;
    color?: string;
    stackId?: string;
  }[];
  layout?: 'vertical' | 'horizontal';
}

const defaultColors = [
  'var(--primary)',
  'var(--chart-2)',
  'var(--chart-3)',
  'var(--chart-4)',
  'var(--chart-5)',
];

export default function BarComparisonChart({
  title,
  description,
  data,
  bars,
  layout = 'vertical',
}: BarComparisonChartProps) {
  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-semibold">{title}</CardTitle>
        {description && <CardDescription className="text-xs">{description}</CardDescription>}
      </CardHeader>
      <CardContent className="pt-0">
        <div className="h-[280px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              layout={layout === 'horizontal' ? 'vertical' : 'horizontal'}
              margin={{ top: 5, right: 5, left: layout === 'horizontal' ? 60 : -20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              {layout === 'horizontal' ? (
                <>
                  <XAxis type="number" tick={{ fill: 'var(--muted-foreground)', fontSize: 11 }} tickLine={false} axisLine={false} />
                  <YAxis dataKey="name" type="category" tick={{ fill: 'var(--muted-foreground)', fontSize: 11 }} tickLine={false} axisLine={{ stroke: 'var(--border)' }} width={80} />
                </>
              ) : (
                <>
                  <XAxis dataKey="name" tick={{ fill: 'var(--muted-foreground)', fontSize: 11 }} tickLine={false} axisLine={{ stroke: 'var(--border)' }} />
                  <YAxis tick={{ fill: 'var(--muted-foreground)', fontSize: 11 }} tickLine={false} axisLine={false} />
                </>
              )}
              <Tooltip
                contentStyle={{
                  backgroundColor: 'var(--card)',
                  border: '1px solid var(--border)',
                  borderRadius: '0.5rem',
                  fontSize: '0.75rem',
                  color: 'var(--foreground)',
                }}
              />
              <Legend
                wrapperStyle={{ fontSize: '0.75rem' }}
                iconType="rect"
                iconSize={10}
              />
              {bars.map((bar, i) => (
                <Bar
                  key={bar.dataKey}
                  dataKey={bar.dataKey}
                  name={bar.label}
                  fill={bar.color || defaultColors[i]}
                  stackId={bar.stackId}
                  radius={bar.stackId ? 0 : [4, 4, 0, 0]}
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
