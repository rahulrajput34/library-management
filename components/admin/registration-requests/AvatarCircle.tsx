"use client";

// Client component to display user initials in a circular avatar
export function AvatarCircle({ name }: { name: string }) {
  // Derive up to two uppercase initials from the provided name, or use '?' if name is empty
  const initials =
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "?";

  // Render a fixed-size circle with background and centered initials
  return (
    <div className="h-9 w-9 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center text-xs font-semibold text-indigo-600 dark:text-indigo-200 shrink-0">
      {initials}
    </div>
  );
}
