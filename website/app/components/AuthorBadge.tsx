import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface AuthorBadgeProps {
  name: string;
  role: string;
}

export default function AuthorBadge({ name, role }: AuthorBadgeProps) {
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();

  return (
    <div className="flex items-center gap-2">
      <Avatar className="h-6 w-6">
        <AvatarFallback className="bg-primary/10 text-primary text-[10px] font-semibold">
          {initials}
        </AvatarFallback>
      </Avatar>
      <div>
        <p className="text-xs font-medium text-foreground leading-none">{name}</p>
        <p className="text-[10px] text-muted-foreground leading-none mt-0.5">{role}</p>
      </div>
    </div>
  );
}
