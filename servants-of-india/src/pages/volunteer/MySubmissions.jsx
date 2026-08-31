import { Link } from "react-router-dom";
import { submissionApi } from "../../services/endpoints";
import { useAsync } from "../../hooks/useAsync";
import { EmptyState, PageHeader, PageLoader, StatusBadge } from "../../components/ui";
import { formatDateTime } from "../../utils/datetime";

export default function MySubmissions() {
  const { data, loading, error } = useAsync(() => submissionApi.mine(), []);

  return (
    <div className="space-y-6">
      <PageHeader
        title="My Seva Submissions"
        subtitle="Track the verification status of your uploaded service proofs."
        action={
          <Link to="/submit-proof" className="btn-primary text-xs sm:text-sm shadow-md shadow-amber-500/20">
            New Submission
          </Link>
        }
      />

      {loading ? (
        <PageLoader />
      ) : error ? (
        <p className="text-red-400 font-semibold p-4 rounded-xl bg-red-950/40 border border-red-800">{error}</p>
      ) : data.length === 0 ? (
        <EmptyState
          title="No submissions yet"
          subtitle="Submit proof of your seva to start earning your verified certificate."
          action={<Link to="/submit-proof" className="btn-primary">Submit First Proof</Link>}
        />
      ) : (
        <div className="space-y-4">
          {data.map((s) => (
            <div key={s.id} className="card hover:border-emerald-400 transition-all">
              <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
                <div className="flex flex-col sm:flex-row gap-4 w-full">
                  <img
                    src={s.image_url}
                    alt="proof"
                    className="h-28 w-28 shrink-0 rounded-xl object-cover border-2 border-emerald-300 bg-white shadow-sm"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="badge">{s.category_name}</span>
                      <StatusBadge status={s.status} />
                    </div>
                    <p className="mt-2.5 text-sm text-slate-950 font-bold leading-relaxed">{s.description}</p>
                    {s.event_title && (
                      <div className="mt-2">
                        <span className="text-xs text-amber-950 font-bold bg-amber-100 px-3 py-1 rounded-lg border border-amber-300 inline-block shadow-sm">
                          Event: {s.event_title}
                        </span>
                      </div>
                    )}
                    {s.rejection_reason && (
                      <div className="mt-2.5 rounded-xl bg-rose-50 p-3 text-xs text-rose-950 border border-rose-300 shadow-sm font-medium">
                        <b className="font-bold">Feedback / Reason:</b> {s.rejection_reason}
                      </div>
                    )}
                    <p className="mt-2.5 text-xs text-slate-700 font-semibold">
                      Submitted on {new Date(s.submitted_at).toLocaleString("en-IN")} IST
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

