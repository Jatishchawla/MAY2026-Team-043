import { useState } from "react";
import { Link } from "react-router-dom";
import { eventApi } from "../../services/endpoints";
import { useAsync } from "../../hooks/useAsync";
import { EmptyState, PageHeader, PageLoader, StatusBadge } from "../../components/ui";
import { formatDate } from "../../utils/datetime";

const FILTERS = [
  { key: "", label: "All Drives" },
  { key: "upcoming", label: "Upcoming" },
  { key: "completed", label: "Completed" },
  { key: "cancelled", label: "Cancelled" },
];

export default function Events() {
  const [status, setStatus] = useState("");
  const { data, loading, error } = useAsync(
    () => eventApi.list(status ? { status } : {}),
    [status]
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Seva Drives & Events"
        subtitle="Discover and participate in grassroots volunteer events across the nation."
      />

      {/* Filters (Clean White Box with Emerald Pill) */}
      <div className="flex flex-wrap gap-2 rounded-2xl border border-emerald-200 bg-white/90 p-1.5 shadow-sm">
        {FILTERS.map((f) => (
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
      ) : !data || data.length === 0 ? (
        <EmptyState title="No events found" subtitle="There are no events matching this status right now." />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {data.map((e) => (
            <Link
              key={e.id}
              to={`/events/${e.slug}`}
              className="card flex flex-col justify-between hover:scale-[1.02] transition-all duration-200"
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className="badge">{e.category_name}</span>
                  <StatusBadge status={e.status} />
                </div>
                <h3 className="mt-3 font-extrabold text-slate-950 text-base hover:text-amber-800 transition">
                  {e.title}
                </h3>
                <p className="mt-1.5 line-clamp-2 text-xs text-slate-700 font-medium leading-relaxed">{e.description}</p>
              </div>
              <div className="mt-4 flex items-center justify-between border-t border-emerald-200/80 pt-3 text-xs font-bold text-slate-800">
                <span>📍 {e.city}</span>
                <span>📅 {formatDate(e.event_date)}</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

