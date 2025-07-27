import { fetchDashboardMetrics } from "@/lib/queries/dashboard";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

export default async function Cards() {
  const { borrowed, users, books } = await fetchDashboardMetrics();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
      <Card
        label="Borrowed Books"
        value={borrowed.now}
        delta={borrowed.delta}
      />
      <Card label="Total Users" value={users.now} delta={users.delta} />
      <Card label="Total Books" value={books.now} delta={books.delta} />
    </div>
  );
}

function Card({
  label,
  value,
  delta,
}: {
  label: string;
  value: number;
  delta: number;
}) {
  const positive = delta >= 0;
  const Icon = positive ? ArrowUpRight : ArrowDownRight;

  return (
    <div className="border rounded-lg p-4 bg-white dark:bg-neutral-800">
      <p className="text-sm text-gray-500 flex items-center gap-1">
        {label}
        <span
          className={`flex items-center ${
            positive ? "text-green-600" : "text-rose-600"
          }`}
        >
          <Icon size={14} />
          {Math.abs(delta)}
        </span>
      </p>
      <p className="text-3xl font-semibold mt-1">{value}</p>
    </div>
  );
}
