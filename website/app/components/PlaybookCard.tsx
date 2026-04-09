import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Playbook } from '@/lib/playbooks';

interface PlaybookCardProps {
  playbook: Playbook;
}

const difficultyVariant: Record<string, string> = {
  beginner: 'bg-green-500/10 text-green-400 border-green-500/20',
  intermediate: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  advanced: 'bg-red-500/10 text-red-400 border-red-500/20',
};

export default function PlaybookCard({ playbook }: PlaybookCardProps) {
  return (
    <Link href={`/playbooks/${playbook.slug}`} className="group block">
      <Card className="h-full bg-card border-border hover:border-primary/50 transition-all glow-card">
        <CardContent className="p-6 flex flex-col h-full">
          <div className="flex items-center gap-2 mb-3 flex-wrap">
            <Badge
              variant="outline"
              className={difficultyVariant[playbook.difficulty] || 'text-primary border-primary/30'}
            >
              {playbook.difficulty}
            </Badge>
            <span className="text-xs text-muted-foreground">
              {playbook.time_to_complete}
            </span>
          </div>

          <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
            {playbook.title}
          </h3>

          <p className="text-sm text-muted-foreground mb-4 line-clamp-3 flex-1">
            {playbook.excerpt}
          </p>

          <div className="flex flex-wrap gap-1.5 mt-auto pt-3 border-t border-border/50">
            {playbook.tools_needed.map((tool) => (
              <Badge key={tool} variant="secondary" className="text-[10px] font-normal">
                {tool}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
