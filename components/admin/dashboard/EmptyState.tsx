// Stateless component for displaying an empty state with an illustration and messages
export default function EmptyState({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  // Centered container with vertical layout and padding
  return (
    <div className="flex flex-col items-center py-10">
      {/* Illustration for empty state */}
      <img
        src="/illustrations/empty-state.svg"
        alt=""
        className="h-28 mb-6 opacity-80"
      />
      {/* Main title text */}
      <p className="font-semibold mb-1">{title}</p>
      {/* Supporting subtitle text */}
      <p className="text-sm text-gray-500 text-center max-w-xs">{subtitle}</p>
    </div>
  );
}
