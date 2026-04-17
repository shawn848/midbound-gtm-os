import Link from 'next/link';
import AuthorBadge from './AuthorBadge';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Post } from '@/lib/posts';
import MagnetCard from './MagnetCard';
import SectionPills from './SectionPills';

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <MagnetCard>
        <Card className="h-full bg-card border-border hover:border-primary/50 transition-all glow-card">
          <CardContent className="p-6 flex flex-col h-full">
            <div className="flex items-center gap-2 mb-3">
              <Badge variant="secondary" className="text-primary bg-primary/10 border-0 text-[11px]">
                {post.pillar}
              </Badge>
              <span className="text-xs text-muted-foreground">
                {post.reading_time} min read
              </span>
            </div>

            <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
              {post.title}
            </h3>

            <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
              {post.excerpt}
            </p>

            {post.section_titles && post.section_titles.length > 0 && (
              <SectionPills sections={post.section_titles} className="mb-4" />
            )}

            <div className="flex items-center justify-between mt-auto pt-3 border-t border-border/50">
              <AuthorBadge name={post.author_name} role={post.author_role} />
              <time
                dateTime={post.date}
                className="text-xs text-muted-foreground"
              >
                {new Date(post.date).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </time>
            </div>
          </CardContent>
        </Card>
      </MagnetCard>
    </Link>
  );
}
