'use client';

export function AvatarCircle({ name }: { name: string }) {
  const initials =
    name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .slice(0, 2)
      .toUpperCase() || '?';

  return (
    <div className="h-9 w-9 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center text-xs font-semibold text-indigo-600 dark:text-indigo-200 shrink-0">
      {initials}
    </div>
  );
}
