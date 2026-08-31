import { Link } from "react-router-dom";
import { adminApi } from "../../services/endpoints";
import { useAsync } from "../../hooks/useAsync";
import { PageHeader, PageLoader, StatCard } from "../../components/ui";
import { BarChart, DonutChart } from "../../components/Charts";

export default function AdminDashboard() {
  const { data, loading, error } = useAsync(() => adminApi.stats(), []);

  if (loading) return <PageLoader />;
  if (error) return <p className="text-red-600 font-bold p-4 rounded-xl bg-red-50 border border-red-200">{error}</p>;

  const u = data.users || {};
  const s = data.submissions || {};
  const ev = data.events_by_status || {};

  return (
    <div className="space-y-6">
      <PageHeader
        title="National Administration"
        subtitle="Comprehensive platform metrics, user management, and national certificate issuance."
      />

      {/* User Demographics */}
      <div>
        <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-800">User Demographics</h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          <StatCard label="Total Users" value={u.total ?? 0} />
          <StatCard label="Volunteers" value={u.volunteers ?? 0} />
          <StatCard label="Event Managers" value={u.event_managers ?? 0} />
          <StatCard label="Super Admins" value={u.super_admins ?? u.admins ?? 0} />
          <StatCard label="Active Accounts" value={u.active ?? (u.total - (u.blocked ?? 0)) ?? 0} />
        </div>
      </div>

      {/* Platform Seva Activity */}
      <div>
        <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-800">Platform Seva Activity</h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          <StatCard label="Total Events" value={data.events ?? 0} />
          <StatCard label="Pending Proofs" value={s.pending ?? 0} />
          <StatCard label="Approved Proofs" value={s.approved ?? 0} />
          <StatCard label="Rejected Proofs" value={s.rejected ?? 0} />
          <StatCard label="Certificates Issued" value={data.certificates_issued ?? data.certificates ?? 0} />
        </div>
      </div>

      {/* Graphical overview (Deep Green) */}
      <div>
        <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-800">Visual Analytics</h3>
        <div className="grid gap-6 lg:grid-cols-2">
          <DonutChart
            title="Submissions Breakdown"
            deep={true}
            data={[
              { label: "Pending", value: s.pending ?? 0, color: "#d97706" },
              { label: "Approved", value: s.approved ?? 0, color: "#10b981" },
              { label: "Rejected", value: s.rejected ?? 0, color: "#e11d48" },
            ]}
          />
          <BarChart
            title="Platform Distribution"
            deep={true}
            data={[
              { label: "Volunteers", value: u.volunteers ?? 0, color: "#2dd4bf" },
              { label: "Event Managers", value: u.event_managers ?? 0, color: "#38bdf8" },
              { label: "Upcoming Events", value: ev.upcoming ?? 0, color: "#fbbf24" },
              { label: "Completed Events", value: ev.completed ?? 0, color: "#34d399" },
              { label: "Certificates Issued", value: data.certificates_issued ?? data.certificates ?? 0, color: "#c084fc" },
            ]}
          />
        </div>
      </div>

      {/* Quick actions */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 pt-2">
        <Link to="/admin/users" className="btn-primary py-3.5 shadow-md font-bold">
          Manage Users
        </Link>
        <Link to="/admin/event-managers" className="btn-accent py-3.5 shadow-md font-bold">
          Manage Event Managers
        </Link>
        <Link
          to="/em/review-queue"
          className="card flex items-center justify-between py-3 px-5 hover:translate-y-[-2px] transition shadow-md"
        >
          <div>
            <p className="text-sm font-extrabold text-slate-950">Review Queue</p>
            <p className="text-xs font-bold text-amber-800">{s.pending ?? 0} pending proofs</p>
          </div>
          <span className="grid h-8 w-8 place-items-center rounded-xl bg-amber-100 text-amber-950 font-bold border border-amber-300 shadow-sm">→</span>
        </Link>
      </div>
    </div>
  );
}

