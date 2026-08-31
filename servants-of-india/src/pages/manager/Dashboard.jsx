import { Link } from "react-router-dom";
import { adminApi } from "../../services/endpoints";
import { useAuth } from "../../contexts/AuthContext";
import { useAsync } from "../../hooks/useAsync";
import { PageHeader, PageLoader, StatCard } from "../../components/ui";
import { BarChart, DonutChart } from "../../components/Charts";

export default function EmDashboard() {
  const { user } = useAuth();
  const { data, loading, error } = useAsync(() => adminApi.stats(), []);

  if (loading) return <PageLoader />;
  if (error) return <p className="text-red-400 font-semibold p-4 rounded-xl bg-red-950/40 border border-red-800">{error}</p>;

  const s = data.submissions || {};
  const ev = data.events_by_status || {};
  const categoryBarData = data.category_stats || [];
  const statusDonutData = [
    { label: "Pending", value: s.pending ?? 0, color: "#f97316" },
    { label: "Approved", value: s.approved ?? 0, color: "#22c55e" },
    { label: "Rejected", value: s.rejected ?? 0, color: "#ef4444" },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title={`Welcome, ${user.full_name.split(" ")[0]}`}
        subtitle="Manage and review volunteer initiatives across Bharat."
      />

      {/* Quick links (Whitish-Green Cards) */}
      <div className="grid gap-4 sm:grid-cols-2">
        <Link
          to="/em/review-queue"
          className="card flex items-center justify-between hover:scale-[1.02] transition-all duration-200"
        >
          <div>
            <span className="badge">Action Required</span>
            <h3 className="mt-2 text-lg font-extrabold text-slate-950">Open Review Queue</h3>
            <p className="mt-1 text-xs text-slate-700 font-medium">Evaluate pending proofs submitted by volunteers.</p>
          </div>
          <span className="grid h-12 w-12 place-items-center rounded-2xl bg-amber-100 text-amber-950 border border-amber-300 font-black text-xl shadow-md">
            {s.pending ?? 0}
          </span>
        </Link>

        <Link
          to="/em/events"
          className="card flex items-center justify-between hover:scale-[1.02] transition-all duration-200"
        >
          <div>
            <span className="badge">Management</span>
            <h3 className="mt-2 text-lg font-extrabold text-slate-950">Manage Volunteer Events</h3>
            <p className="mt-1 text-xs text-slate-700 font-medium">Create and oversee volunteer drives across Bharat.</p>
          </div>
          <span className="grid h-12 w-12 place-items-center rounded-2xl bg-emerald-100 text-emerald-950 border border-emerald-300 font-black text-xl shadow-md">
            +
          </span>
        </Link>
      </div>

      {/* Analytics Breakdown Charts (Deep Green as requested) */}
      <div className="grid gap-6 lg:grid-cols-2">
        <DonutChart
          title="Submissions by Status"
          deep={true}
          data={[
            { label: "Pending", value: s.pending ?? 0, color: "#d97706" },
            { label: "Approved", value: s.approved ?? 0, color: "#10b981" },
            { label: "Rejected", value: s.rejected ?? 0, color: "#e11d48" },
          ]}
        />
        <BarChart
          title="Events by Status"
          deep={true}
          data={[
            { label: "Upcoming", value: ev.upcoming ?? 0, color: "#d97706" },
            { label: "Completed", value: ev.completed ?? 0, color: "#10b981" },
            { label: "Cancelled", value: ev.cancelled ?? 0, color: "#e11d48" },
          ]}
        />
      </div>

      <div className="flex flex-wrap gap-3 pt-2">
        <Link to="/em/review-queue" className="btn-primary shadow-lg">
          Go to Review Queue
        </Link>
        <Link to="/em/events" className="btn-ghost shadow-sm">
          Manage All Events
        </Link>
      </div>
    </div>
  );
}

