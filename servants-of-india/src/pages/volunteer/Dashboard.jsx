import { Link } from "react-router-dom";
import { progressApi, submissionApi, notificationApi } from "../../services/endpoints";
import { useAuth } from "../../contexts/AuthContext";
import { useAsync } from "../../hooks/useAsync";
import { PageHeader, PageLoader, StatCard, StatusBadge } from "../../components/ui";

export default function VolunteerDashboard() {
  const { user } = useAuth();
  const progress = useAsync(() => progressApi.me(), []);
  const subs = useAsync(() => submissionApi.mine(), []);
  const notes = useAsync(() => notificationApi.list(), []);

  if (progress.loading) return <PageLoader />;

  const p = progress.data || { stars: 0, total_categories: 5, all_completed: false };
  const recent = (subs.data || []).slice(0, 4);

  return (
    <div className="space-y-6">
      <PageHeader
        title={`Namaste, ${user.full_name.split(" ")[0]}`}
        subtitle="Your journey toward making a lasting community impact across Bharat."
        action={
          <div className="flex gap-2">
            <Link to="/events" className="btn-primary text-xs sm:text-sm">
              Browse Events
            </Link>
            <Link to="/submit-proof" className="btn-accent text-xs sm:text-sm">
              Submit Proof
            </Link>
          </div>
        }
      />

      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard
          label="Pillars Completed"
          value={`${p.stars} / ${p.total_categories}`}
          accent="saffron"
        />
        <StatCard
          label="Total Submissions"
          value={subs.data?.length ?? 0}
          accent="blue"
        />
        <StatCard
          label="Unread Alerts"
          value={notes.data?.unread_count ?? 0}
          accent="green"
        />
      </div>

      {/* Featured Hero Progress Card (Deep Emerald/Teal Jewel Glass with Warm Amber/Gold Highlights) */}
      <div className="card-hero">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/20 pb-3">
          <div>
            <h3 className="font-extrabold text-white text-base">Progress to Official Certificate</h3>
            <p className="text-xs text-emerald-100 font-medium">Complete verified seva in all 5 pillars to earn your national credential.</p>
          </div>
          <Link to="/progress" className="text-xs font-bold text-amber-300 hover:text-white underline">
            View Seva Breakdown →
          </Link>
        </div>

        <div className="mt-4">
          <div className="flex justify-between text-xs font-bold text-white mb-1.5">
            <span>Overall Seva Completion</span>
            <span className="font-extrabold text-amber-300">{Math.round((p.stars / p.total_categories) * 100)}%</span>
          </div>
          <div className="h-3.5 w-full overflow-hidden rounded-full bg-black/25 p-0.5 border border-white/30">
            <div
              className="h-full rounded-full bg-gradient-to-r from-amber-400 via-yellow-300 to-white transition-all duration-500 shadow-sm"
              style={{ width: `${(p.stars / p.total_categories) * 100}%` }}
            />
          </div>
        </div>

        <div className="mt-4 rounded-xl bg-black/20 p-3.5 border border-white/20 flex items-center justify-between text-xs text-white">
          {p.all_completed ? (
            <span className="font-extrabold text-amber-300">
              🎉 All five pillars completed! You are eligible for national certification.
            </span>
          ) : (
            <span className="font-medium text-emerald-100">
              Only <b className="font-extrabold text-amber-300">{p.total_categories - p.stars} more pillar{p.total_categories - p.stars === 1 ? "" : "s"}</b> needed to earn your certificate.
            </span>
          )}
          {p.all_completed && (
            <Link to="/certificate" className="btn-primary py-1.5 px-3 text-xs font-bold shadow-md">
              Get Certificate →
            </Link>
          )}
        </div>
      </div>

      {/* Recent submissions list (Deep Green Card-Hero) */}
      <div className="card-hero">
        <div className="flex items-center justify-between border-b border-white/20 pb-3">
          <h3 className="text-base font-extrabold text-white">Recent Proof Submissions</h3>
          <Link to="/my-submissions" className="text-xs font-bold text-amber-300 hover:text-white underline">
            View All →
          </Link>
        </div>

        {recent.length === 0 ? (
          <p className="mt-4 text-xs font-semibold text-emerald-100 text-center py-6">
            No submissions yet. Participate in drives and upload your seva proofs!
          </p>
        ) : (
          <div className="mt-3 divide-y divide-white/15">
            {recent.map((s) => (
              <div key={s.id} className="flex items-center justify-between py-3">
                <div className="min-w-0 flex-1 pr-3">
                  <p className="truncate text-sm font-bold text-white">{s.category_name}</p>
                  <p className="mt-0.5 truncate text-xs text-emerald-100 font-medium">{s.description}</p>
                </div>
                <StatusBadge status={s.status} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

