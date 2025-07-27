import Cards from "@/components/admin/dashboard/Cards";
import BorrowWidget from "@/components/admin/dashboard/BorrowWidget";
import AccountWidget from "@/components/admin/dashboard/AccountWidget";
import RecentBooksWidget from "@/components/admin/dashboard/RecentBooksWidget";

export default function AdminDashboard() {
  return (
    <div className="p-8 space-y-6">
      {/* summary metrics */}
      <Cards />

      {/* two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* left column */}
        <div className="space-y-6">
          <BorrowWidget />
          <AccountWidget />
        </div>

        {/* right column */}
        <RecentBooksWidget />
      </div>
    </div>
  );
}
