export default function EmptyState({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <div className="flex flex-col items-center py-10">
      <img
        src="/illustrations/empty-state.svg"
        alt=""
        className="h-28 mb-6 opacity-80"
      />
      <p className="font-semibold mb-1">{title}</p>
      <p className="text-sm text-gray-500 text-center max-w-xs">{subtitle}</p>
    </div>
  );
}
