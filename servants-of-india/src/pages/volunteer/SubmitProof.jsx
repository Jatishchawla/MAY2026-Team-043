import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { eventApi, progressApi, submissionApi } from "../../services/endpoints";
import { useToast } from "../../contexts/ToastContext";
import { useAsync } from "../../hooks/useAsync";
import { PageHeader, PageLoader, Spinner, StatusBadge } from "../../components/ui";
import { formatDate } from "../../utils/datetime";

const MAX_BYTES = 5 * 1024 * 1024;

export default function SubmitProof() {
  const toast = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  // Categories (with status) come from the progress endpoint — no separate list API.
  const { data, loading } = useAsync(() => progressApi.me(), []);
  // All completed events; we filter to the chosen category below.
  const { data: completedEvents } = useAsync(() => eventApi.list({ status: "completed" }), []);

  const [categoryId, setCategoryId] = useState(location.state?.categoryId || "");
  const [eventId, setEventId] = useState(location.state?.eventId || "");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // Completed events belonging to the selected category.
  const categoryEvents = useMemo(
    () => (completedEvents || []).filter((e) => e.category_id === categoryId),
    [completedEvents, categoryId]
  );

  // Whenever the category changes, drop any event selection that no longer fits.
  useEffect(() => {
    if (eventId && !categoryEvents.some((e) => e.id === eventId)) setEventId("");
  }, [categoryId]); // eslint-disable-line react-hooks/exhaustive-deps

  const onFile = (e) => {
    const f = e.target.files[0];
    if (!f) return;
    if (!["image/jpeg", "image/png"].includes(f.type)) {
      toast.error("Only JPG and PNG images are allowed");
      return;
    }
    if (f.size > MAX_BYTES) {
      toast.error("Image must be under 5 MB");
      return;
    }
    setFile(f);
    setPreview(URL.createObjectURL(f));
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!categoryId) return toast.error("Please choose a category");
    if (!eventId) return toast.error("Please select the completed event you attended");
    if (!file) return toast.error("Please attach a proof image");
    if (!description.trim()) return toast.error("Please add a description");

    const fd = new FormData();
    fd.append("category_id", categoryId);
    fd.append("description", description.trim());
    fd.append("image", file);
    fd.append("event_id", eventId);

    setSubmitting(true);
    try {
      await submissionApi.create(fd);
      toast.success("Proof submitted — awaiting review");
      navigate("/my-submissions");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <PageLoader />;

  const categories = data?.categories || [];

  return (
    <div className="max-w-2xl space-y-6">
      <PageHeader
        title="Submit Seva Proof"
        subtitle="Upload photographic evidence and activity summary for manager verification."
      />
      <form onSubmit={submit} className="card space-y-6">
        <div className="space-y-5">
          {/* Category selection */}
          <div className="rounded-2xl bg-emerald-50/70 p-4 sm:p-5 border border-emerald-200/80 shadow-xs">
            <label className="label text-slate-950 font-extrabold text-sm mb-3">1. Select Service Pillar</label>
            <div className="grid gap-3 sm:grid-cols-2">
              {categories.map((c, i) => {
                const isSelected = categoryId === c.category_id;
                const disabled = c.status === "completed" || c.status === "pending";
                return (
                  <button
                    type="button"
                    key={c.category_id}
                    disabled={disabled}
                    onClick={() => setCategoryId(c.category_id)}
                    className={`flex items-center justify-between rounded-xl p-4 text-left text-sm transition-all duration-200 ${
                      isSelected
                        ? "bg-gradient-to-br from-[#064e3b] via-[#047857] to-[#0f766e] text-white font-extrabold shadow-xl border-2 border-amber-300 ring-2 ring-amber-400/60 scale-[1.02]"
                        : "bg-gradient-to-br from-[#064e3b] via-[#047857] to-[#0f766e] text-white font-bold border border-emerald-600/60 shadow-md hover:border-amber-300 hover:shadow-lg hover:scale-[1.01]"
                    } ${disabled ? "cursor-not-allowed opacity-45 grayscale bg-slate-800 text-slate-300" : ""}`}
                  >
                    <div className="flex items-center gap-3 min-w-0 pr-2">
                      <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg text-xs font-black shadow-xs ${
                        isSelected
                          ? "bg-amber-400 text-slate-950 ring-2 ring-amber-200"
                          : "bg-amber-400/25 text-amber-300 border border-amber-300/40"
                      }`}>
                        0{i + 1}
                      </span>
                      <span className="truncate font-extrabold text-white text-sm tracking-wide">
                        {c.category_name}
                      </span>
                    </div>
                    {c.status !== "not_started" ? (
                      <StatusBadge status={c.status} />
                    ) : isSelected ? (
                      <span className="text-[11px] font-black uppercase tracking-wider text-amber-300 bg-amber-950/50 px-2 py-0.5 rounded-full border border-amber-400/50">
                        Selected ✓
                      </span>
                    ) : null}
                  </button>
                );
              })}
            </div>
            <p className="mt-3 text-xs text-slate-700 font-medium">
              💡 Categories marked as <b>completed</b> or <b>pending review</b> cannot be re-submitted.
            </p>
          </div>

          {/* Completed events for the chosen category */}
          {categoryId && (
            <div className="rounded-2xl bg-emerald-50/70 p-4 sm:p-5 border border-emerald-200/80 shadow-xs">
              <label className="label text-slate-950 font-extrabold text-sm mb-2">2. Completed Event Attended</label>
              {categoryEvents.length === 0 ? (
                <div className="rounded-xl bg-amber-50 p-3.5 text-xs font-bold text-amber-950 border border-amber-300">
                  ⚠️ Notice: No completed events found in this category yet. You can submit proof after participating in a completed drive.
                </div>
              ) : (
                <select
                  className="input font-bold text-slate-950 border-emerald-300 bg-white"
                  value={eventId}
                  onChange={(e) => setEventId(e.target.value)}
                >
                  <option value="">Select the completed event drive…</option>
                  {categoryEvents.map((e) => (
                    <option key={e.id} value={e.id}>
                      {e.title} — {e.city} · {formatDate(e.event_date)}
                    </option>
                  ))}
                </select>
              )}
            </div>
          )}

          {/* Description */}
          <div className="rounded-2xl bg-emerald-50/70 p-4 sm:p-5 border border-emerald-200/80 shadow-xs">
            <label className="label text-slate-950 font-extrabold text-sm mb-2">3. Activity Report / Summary</label>
            <textarea
              required
              rows={4}
              className="input font-medium text-slate-950 border-emerald-300 bg-white"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your volunteer seva, duties performed, hours spent, and the real community impact created…"
            />
          </div>

          {/* Image Upload */}
          <div className="rounded-2xl bg-emerald-50/70 p-4 sm:p-5 border border-emerald-200/80 shadow-xs">
            <label className="label text-slate-950 font-extrabold text-sm mb-2">4. Geo-Tagged Photographic Proof</label>
            <input
              type="file"
              accept="image/*"
              required
              className="input text-xs text-slate-700 file:mr-3 file:rounded-lg file:border-0 file:bg-emerald-700 file:px-3 file:py-1 file:text-xs file:font-black file:text-white hover:file:bg-emerald-800"
              onChange={onFile}
            />
            {preview && (
              <div className="mt-3 overflow-hidden rounded-xl border border-emerald-300 bg-white p-2 shadow-sm">
                <img src={preview} alt="preview" className="max-h-60 rounded-lg object-contain mx-auto shadow-xs" />
              </div>
            )}
            <p className="mt-2 text-xs text-slate-600 font-medium">Supported formats: JPG, PNG, WEBP up to 5 MB.</p>
          </div>
        </div>

        <button
          type="submit"
          disabled={submitting || (categoryId && categoryEvents.length === 0)}
          className="btn-primary w-full py-3.5 text-base font-extrabold shadow-lg"
        >
          {submitting ? <Spinner /> : "Submit Proof for Review →"}
        </button>
      </form>
    </div>
  );
}
