import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { submissionApi } from "../../services/endpoints";
import { useToast } from "../../contexts/ToastContext";
import { useAsync } from "../../hooks/useAsync";
import { PageLoader, Spinner, StatusBadge } from "../../components/ui";
import { formatDateTime } from "../../utils/datetime";

export default function SubmissionDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const { data: s, loading, error, reload } = useAsync(() => submissionApi.get(id), [id]);
  const [remarks, setRemarks] = useState("");
  const [busy, setBusy] = useState(false);

  const act = async (kind) => {
    if (kind === "reject" && !remarks.trim()) {
      return toast.error("A rejection reason is required");
    }
    setBusy(true);
    try {
      if (kind === "approve") {
        await submissionApi.approve(id, remarks.trim() || undefined);
        toast.success("Submission approved successfully!");
      } else {
        await submissionApi.reject(id, remarks.trim());
        toast.success("Submission rejected");
      }
      reload();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setBusy(false);
    }
  };

  if (loading) return <PageLoader />;
  if (error) return <p className="text-red-400 font-semibold p-4 rounded-xl bg-red-950/40 border border-red-800">{error}</p>;

  const pending = s.status === "pending";

  return (
    <div className="max-w-3xl space-y-4">
      <button onClick={() => navigate(-1)} className="btn-ghost text-xs">
        Back to Review Queue
      </button>

      <div className="card shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-emerald-200/80 pb-4">
          <div>
            <h1 className="text-2xl font-black text-slate-900 font-heading">{s.category_name}</h1>
            <p className="mt-1 text-xs font-semibold text-slate-600">
              Submitted by <span className="text-slate-900 font-black">{s.volunteer_name}</span> · {formatDateTime(s.submitted_at)} IST
            </p>
          </div>
          <StatusBadge status={s.status} />
        </div>

        <div className="mt-6">
          <p className="text-[11px] font-black uppercase tracking-wider text-slate-600 mb-2">Proof Photo</p>
          <div className="overflow-hidden rounded-2xl border border-emerald-200 bg-white p-2">
            <img
              src={s.image_url}
              alt="proof"
              className="max-h-96 w-full rounded-xl object-contain mx-auto"
            />
          </div>
        </div>

        <div className="mt-6 rounded-xl bg-white/80 p-4 border border-emerald-200">
          <p className="text-[11px] font-black uppercase tracking-wider text-emerald-800">Activity Report / Description</p>
          <p className="mt-2 whitespace-pre-line text-sm text-slate-800 leading-relaxed font-medium">{s.description}</p>
        </div>

        {s.event_title && (
          <div className="mt-4 flex items-center gap-2 rounded-xl bg-emerald-50 p-3 border border-emerald-200 text-xs text-emerald-950">
            <span className="font-black text-emerald-800">Linked Event:</span>
            <span className="font-black text-slate-900">{s.event_title}</span>
          </div>
        )}

        {s.review && !pending && (
          <div className="mt-6 rounded-xl p-4 border border-emerald-200 bg-white text-sm text-slate-900">
            <p className="font-black">
              {s.review.decision === "approved" ? "Approved" : "Rejected"}
            </p>
            {s.review.remarks && <p className="mt-1 text-xs text-slate-600">{s.review.remarks}</p>}
            <p className="mt-2 text-[11px] opacity-70">
              Reviewed by {s.review.reviewer_name} on {formatDateTime(s.review.reviewed_at)} IST
            </p>
          </div>
        )}

        {pending && (
          <div className="mt-6 border-t border-white/20 pt-6">
            <label className="label">
              Review Remarks (Required for rejection, optional for approval)
            </label>
            <textarea
              className="input min-h-[90px] text-sm text-slate-900"
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              placeholder="Add feedback or notes for the volunteer..."
            />
            <div className="mt-4 flex gap-3">
              <button
                onClick={() => act("approve")}
                disabled={busy}
                className="btn-primary flex-1 py-3 text-sm font-black shadow-lg"
              >
                {busy ? <Spinner /> : "Approve Proof"}
              </button>
              <button
                onClick={() => act("reject")}
                disabled={busy}
                className="btn-danger flex-1 py-3 text-sm font-black shadow-lg"
              >
                {busy ? <Spinner /> : "Reject Proof"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

