export default function Detail({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex flex-col">
      <span className="text-xs uppercase tracking-wide text-gray-400">
        {label}
      </span>
      <span className="text-lg font-medium text-white">{value}</span>
    </div>
  );
}
