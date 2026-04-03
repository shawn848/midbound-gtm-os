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
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 rounded-full bg-[var(--color-accent)] flex items-center justify-center text-white text-xs font-semibold shrink-0">
        {initials}
      </div>
      <div className="min-w-0">
        <p className="text-sm font-medium text-[var(--color-text-primary)] truncate">
          {name}
        </p>
        <p className="text-xs text-[var(--color-text-secondary)] truncate">
          {role}
        </p>
      </div>
    </div>
  );
}
