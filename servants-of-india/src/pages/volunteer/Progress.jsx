import { Link } from "react-router-dom";
import { progressApi } from "../../services/endpoints";
import { useAsync } from "../../hooks/useAsync";
import { PageHeader, PageLoader, StatusBadge } from "../../components/ui";

export default function Progress() {
  const { data, loading, error } = useAsync(() => progressApi.me(), []);

  if (loading) return <PageLoader />;
  if (error) return <p className="text-red-400 font-semibold p-4 rounded-xl bg-red-950/40 border border-red-800">{error}</p>;

  const pct = data.total_categories > 0 ? Math.round((data.stars / data.total_categories) * 100) : 0;

  return (
    <div className="max-w-2xl space-y-6">
      <PageHeader title="Seva Journey Progress" subtitle="Complete verified service across all 5 pillars to earn your certificate." />

      {/* Main hero credential status card (Deep Emerald/Teal Jewel Glass with Warm Amber/Gold Highlights) */}
      <div className="card-hero">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/20 pb-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-300">National Credential Status</span>
            <h2 className="mt-1 text-2xl font-extrabold text-white">
              {data.all_completed ? "Certified Servant of Bharat" : `${data.stars} of ${data.total_categories} Pillars Completed`}
            </h2>
          </div>
          <div className="flex items-center gap-1.5 rounded-2xl bg-black/25 px-4 py-2 border border-white/30 shadow-inner">
            {Array.from({ length: data.total_categories }).map((_, i) => (
              <span
                key={i}
                className={`text-2xl transition-all duration-300 ${
                  i < data.stars
                    ? "text-amber-300 scale-110 drop-shadow-md"
                    : "text-white/25"
                }`}
              >
                ★
              </span>
            ))}
          </div>
        </div>

        <div className="mt-5">
          <div className="flex justify-between text-xs font-bold text-white mb-1.5">
            <span>Overall Seva Completion</span>
            <span className="font-extrabold text-amber-300">{pct}%</span>
          </div>
          <div className="h-3.5 w-full overflow-hidden rounded-full bg-black/25 p-0.5 border border-white/30">
            <div
              className="h-full rounded-full bg-gradient-to-r from-amber-400 via-yellow-300 to-white transition-all duration-500 shadow-sm"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 pt-2 text-xs">
          <p className="text-emerald-100 font-medium">
            {data.all_completed
              ? "All 5 service pillars approved. You can generate your digital credential now."
              : `Complete verified service in ${data.total_categories - data.stars} more pillar(s) to unlock your certificate.`}
          </p>
          {data.all_completed ? (
            <Link to="/certificate" className="btn-primary py-2 px-4 text-xs font-bold shadow-md">
              View & Download Certificate →
            </Link>
          ) : (
            <Link to="/submit-proof" className="btn-primary py-2 px-4 text-xs font-bold shadow-md">
              Submit Next Proof →
            </Link>
          )}
        </div>
      </div>

      {/* Category breakdown cards (Green Cards) */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">5 Seva Pillars Breakdown</h3>
        {data.categories.map((c, i) => (
          <div key={c.category_id} className="card flex items-center justify-between py-4 px-5 hover:translate-x-1 transition-all duration-150">
            <div className="flex items-center gap-3">
              <span className="grid h-8 w-8 place-items-center rounded-xl text-xs font-bold bg-amber-100 text-amber-950 border border-amber-300 shadow-sm">
                0{i + 1}
              </span>
              <div>
                <h4 className="font-extrabold text-slate-950 text-sm">{c.category_name}</h4>
                <p className="text-xs text-slate-700 font-medium">
                  {c.status === "completed"
                    ? `Verified on ${new Date(c.approved_at).toLocaleDateString("en-IN")}`
                    : c.status === "pending"
                    ? "Proof submitted — awaiting review"
                    : "No approved seva in this pillar yet"}
                </p>
              </div>
            </div>
            <div>
              {c.status === "completed" ? (
                <StatusBadge status="completed" />
              ) : c.status === "pending" ? (
                <StatusBadge status="pending" />
              ) : (
                <Link
                  to="/submit-proof"
                  state={{ categoryId: c.category_id }}
                  className="rounded-lg bg-gradient-to-r from-emerald-700 via-teal-700 to-emerald-800 px-3.5 py-1.5 text-xs font-bold text-white hover:from-emerald-600 hover:to-teal-600 shadow-md transition"
                >
                  Submit Proof
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
