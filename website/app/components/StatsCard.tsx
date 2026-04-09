import { Card, CardContent } from '@/components/ui/card';
import { Users, Building2, Mail, Target } from 'lucide-react';

const iconMap = {
  people: Users,
  companies: Building2,
  emails: Mail,
  audience: Target,
} as const;

interface StatsCardProps {
  icon: keyof typeof iconMap;
  label: string;
  value: string | number;
}

export default function StatsCard({ icon, label, value }: StatsCardProps) {
  const Icon = iconMap[icon];
  return (
    <Card className="bg-card border-border">
      <CardContent className="flex items-center gap-3 p-4">
        <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
          <Icon className="h-5 w-5 text-primary" />
        </div>
        <div>
          <p className="text-xs text-muted-foreground">{label}</p>
          <p className="text-xl font-bold text-foreground tabular-nums">{value}</p>
        </div>
      </CardContent>
    </Card>
  );
}
