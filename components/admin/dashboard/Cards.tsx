import { fetchDashboardMetrics } from "@/lib/queries/dashboard";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

export default async function Cards() {
  // Retrieve dashboard metrics for borrowed books, users, and total books
  const { borrowed, users, books } = await fetchDashboardMetrics();

  // Render metric cards in a responsive 3-column grid
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
      {/* Card showing current borrowed books and change */}
      <Card
        label="Borrowed Books"
        value={borrowed.now}
        delta={borrowed.delta}
      />
      {/* Card showing total users and change */}
      <Card label="Total Users" value={users.now} delta={users.delta} />
      {/* Card showing total books and change */}
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
  // Flag indicating if delta is positive (up) or negative (down)
  const positive = delta >= 0;
  // Choose appropriate icon based on delta sign
  const Icon = positive ? ArrowUpRight : ArrowDownRight;

  // Render a single metric card
  return (
    <div className="border rounded-lg p-4 bg-white dark:bg-neutral-800">
      {/* Display label and delta with icon */}
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
      {/* Display the main metric value */}
      <p className="text-3xl font-semibold mt-1">{value}</p>
    </div>
  );
}
