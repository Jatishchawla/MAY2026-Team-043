import { Link, useNavigate, useParams } from "react-router-dom";
import { eventApi } from "../../services/endpoints";
import { useAsync } from "../../hooks/useAsync";
import { PageLoader, StatusBadge } from "../../components/ui";
import { formatDate } from "../../utils/datetime";

export default function EventDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: e, loading, error } = useAsync(() => eventApi.get(id), [id]);

  if (loading) return <PageLoader />;
  if (error) return <p className="text-red-400 font-semibold p-4 rounded-xl bg-red-950/40 border border-red-800">{error}</p>;

  return (
    <div className="max-w-3xl space-y-4">
      <button onClick={() => navigate(-1)} className="btn-ghost text-xs">← Back to Events</button>

      <div className="card shadow-xl">
        <div className="flex items-start justify-between gap-3 border-b border-emerald-200/80 pb-4">
          <div>
            <span className="badge">{e.category_name}</span>
            <h1 className="mt-2 text-2xl font-black text-slate-900 font-heading">{e.title}</h1>
            <p className="mt-1 text-xs font-semibold text-slate-600">{e.city} · {formatDate(e.event_date)}</p>
          </div>
          <StatusBadge status={e.status} />
        </div>

        <div className="mt-6 rounded-xl bg-white/80 p-4 border border-emerald-200">
          <p className="text-xs font-black uppercase tracking-wider text-emerald-800">Event Description</p>
          <p className="mt-2 whitespace-pre-line text-sm text-slate-800 leading-relaxed font-medium">{e.description}</p>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {[
            { label: "City / Location", value: e.city },
            { label: "Scheduled Date", value: formatDate(e.event_date) },
            { label: "Assigned Manager", value: e.creator_name },
          ].map(({ label, value }) => (
            <div key={label} className="rounded-xl bg-white/80 p-3.5 border border-emerald-200">
              <dt className="text-[10px] font-black uppercase tracking-wider text-slate-600">{label}</dt>
              <dd className="mt-1 text-sm font-black text-slate-900">{value}</dd>
            </div>
          ))}
        </div>

        <div className="mt-6 border-t border-emerald-200/80 pt-6">
          {e.status === "completed" ? (
            <Link to="/submit-proof" state={{ eventId: e.id, categoryId: e.category_id }} className="btn-primary py-3 px-6 text-sm font-black shadow-lg">
              Submit Proof for this Completed Drive
            </Link>
          ) : (
            <div className="rounded-xl bg-emerald-50 p-3.5 text-xs text-emerald-950 font-bold border border-emerald-200">
              This event is currently active or upcoming. Attendance and proof submissions unlock once the drive concludes.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Detail({ label, value }) {
  return (
    <div>
      <dt className="text-[10px] font-bold uppercase tracking-wider text-amber-300">{label}</dt>
      <dd className="mt-1 text-sm font-bold text-white">{value}</dd>
    </div>
  );
}


