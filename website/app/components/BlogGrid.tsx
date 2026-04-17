import PostCard from './PostCard';
import type { Post } from '@/lib/posts';

interface BlogGridProps {
  posts: Post[];
}

export default function BlogGrid({ posts }: BlogGridProps) {
  if (posts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No posts yet.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map((post, i) => (
        <div
          key={post.slug}
          className="animate-in fade-in slide-in-from-bottom-4"
          style={{
            animationDelay: `${i * 60}ms`,
            animationFillMode: 'both',
            animationDuration: '420ms',
          }}
        >
          <PostCard post={post} />
        </div>
      ))}
    </div>
  );
}
