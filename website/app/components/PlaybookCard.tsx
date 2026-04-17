import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Playbook } from '@/lib/playbooks';
import MagnetCard from './MagnetCard';
import SectionPills from './SectionPills';

interface PlaybookCardProps {
  playbook: Playbook;
}

export default function PlaybookCard({ playbook }: PlaybookCardProps) {
  return (
    <Link href={`/playbooks/${playbook.slug}`} className="group block">
      <MagnetCard>
        <Card className="h-full bg-card border-border hover:border-primary/50 transition-all glow-card">
          <CardContent className="p-6 flex flex-col h-full">
            <div className="flex items-center gap-2 mb-3 flex-wrap">
              <span className="text-xs text-muted-foreground">
                {playbook.time_to_complete}
              </span>
            </div>

            <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
              {playbook.title}
            </h3>

            <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
              {playbook.excerpt}
            </p>

            {playbook.section_titles && playbook.section_titles.length > 0 && (
              <SectionPills sections={playbook.section_titles} className="mb-4" />
            )}

            <div className="flex flex-wrap gap-1.5 mt-auto pt-3 border-t border-border/50">
              {playbook.tools_needed.map((tool) => (
                <Badge key={tool} variant="secondary" className="text-[10px] font-normal">
                  {tool}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </MagnetCard>
    </Link>
  );
}
