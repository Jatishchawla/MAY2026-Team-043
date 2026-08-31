import { useState } from "react";
import { Link } from "react-router-dom";
import { submissionApi } from "../../services/endpoints";
import { useAsync } from "../../hooks/useAsync";
import { EmptyState, PageHeader, PageLoader, StatusBadge } from "../../components/ui";
import { formatDateTime } from "../../utils/datetime";

const TABS = [
  { key: "pending", label: "Pending Review" },
  { key: "approved", label: "Approved" },
  { key: "rejected", label: "Rejected" },
  { key: "all", label: "All Submissions" },
];

export default function ReviewQueue() {
  const [status, setStatus] = useState("pending");
  const { data: list = [], loading, error } = useAsync(() => submissionApi.queue(status), [status]);

  return (
    <div className="space-y-6">
      <PageHeader title="Proof Review Queue" subtitle="Verify and approve volunteer proofs across 5 seva pillars." />

      {/* Filters (Clean Box with Emerald Pill) */}
      <div className="flex flex-wrap gap-2 rounded-2xl border border-emerald-200 bg-white/90 p-1.5 shadow-sm">
        {TABS.map((f) => (
          <button
            key={f.key}
            onClick={() => setStatus(f.key)}
            className={`rounded-xl px-4 py-2 text-xs sm:text-sm font-bold transition-all duration-200 ${
              status === f.key
                ? "bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white font-black shadow-md shadow-emerald-900/20"
                : "text-slate-700 hover:bg-emerald-50 hover:text-emerald-950"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {loading ? (
        <PageLoader />
      ) : error ? (
        <p className="text-red-600 font-bold p-4 rounded-xl bg-red-50 border border-red-200">{error}</p>
      ) : list.length === 0 ? (
        <EmptyState
          title={`No ${status ? status : ""} submissions`}
          subtitle="Volunteer proof submissions will appear here for review."
        />
      ) : (
        <div className="space-y-3">
          {list.map((s) => (
            <Link
              key={s.id}
              to={`/em/submissions/${s.id}`}
              className="card p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:scale-[1.01] transition-all duration-200"
            >
              <div className="flex items-center gap-4 min-w-0">
                <img
                  src={s.image_url}
                  alt="proof"
                  className="h-16 w-16 shrink-0 rounded-xl object-cover border-2 border-emerald-300 bg-emerald-100/50 shadow-sm"
                />
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="badge">{s.category_name}</span>
                    <span className="text-xs font-bold text-amber-950">by {s.volunteer_name}</span>
                  </div>
                  <p className="mt-1 truncate text-sm font-extrabold text-slate-950">{s.description}</p>
                  <p className="mt-0.5 text-[11px] text-slate-700 font-medium">
                    Submitted {new Date(s.submitted_at).toLocaleString("en-IN")}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 self-end sm:self-center shrink-0">
                <StatusBadge status={s.status} />
                <span className="text-xs font-bold text-amber-800 bg-amber-100 px-3 py-1 rounded-lg border border-amber-300 shadow-xs hover:bg-amber-200">
                  Review Proof →
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}


