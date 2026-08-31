import { useState } from "react";
import { Link } from "react-router-dom";
import { certificateApi, progressApi } from "../../services/endpoints";
import { useToast } from "../../contexts/ToastContext";
import { useAsync } from "../../hooks/useAsync";
import { PageHeader, PageLoader, Spinner } from "../../components/ui";

export default function CertificatePage() {
  const toast = useToast();
  const progress = useAsync(() => progressApi.me(), []);
  // 404 (no cert yet) is expected — swallow it into null.
  const cert = useAsync(() => certificateApi.me().catch(() => null), []);
  const [generating, setGenerating] = useState(false);

  const formatDate = (d) =>
    d ? new Date(d).toLocaleDateString("en-IN", { dateStyle: "medium" }) : "—";

  const generate = async () => {
    setGenerating(true);
    try {
      const c = await certificateApi.generate();
      cert.setData(c);
      toast.success("Certificate generated successfully!");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setGenerating(false);
    }
  };

  if (progress.loading || cert.loading) return <PageLoader />;

  const allDone = progress.data?.all_completed;
  const c = cert.data;

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <PageHeader
        title="Official Certificate"
        subtitle="Your verified credential of national service."
      />

      {c ? (
        <div className="card text-center shadow-2xl p-6 sm:p-8 space-y-6">
          <span className="badge">Official Credential</span>
          <h2 className="text-2xl font-black text-slate-900 font-heading">
            Certificate Verification
          </h2>

          <div className="mt-4">
            <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-emerald-100 text-teal-700 border border-emerald-300 shadow-lg">
              <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="mt-3 text-xl font-black text-slate-900 font-heading">Authentic & Verified</p>
            <p className="text-xs text-slate-600 font-medium">Official certificate issued by Servants of Bharat</p>

            <dl className="mt-6 space-y-3 rounded-2xl bg-white/90 p-5 text-left border border-emerald-200 shadow-xs">
              <div className="flex justify-between py-2 border-b border-emerald-100">
                <dt className="text-xs font-bold text-slate-600">Volunteer Name</dt>
                <dd className="text-sm font-black text-slate-950">{c.volunteer_name || "Volunteer"}</dd>
              </div>
              <div className="flex justify-between py-2 border-b border-emerald-100">
                <dt className="text-xs font-bold text-slate-600">Certificate Number</dt>
                <dd className="text-sm font-black font-mono text-amber-900">{c.certificate_number || c.verification_code}</dd>
              </div>
              <div className="flex justify-between py-2">
                <dt className="text-xs font-bold text-slate-600">Issue Date</dt>
                <dd className="text-sm font-black text-slate-900">{formatDate(c.issued_at)}</dd>
              </div>
            </dl>
          </div>

          {/* Single Action Button: Download Certificate PDF */}
          <div className="pt-2">
            {c.pdf_url ? (
              <a
                href={c.pdf_url}
                target="_blank"
                rel="noopener noreferrer"
                download={`Certificate_${c.certificate_number || "SOB"}.pdf`}
                className="btn-primary w-full py-3.5 text-base font-extrabold shadow-xl text-center block"
              >
                Download Certificate PDF ↓
              </a>
            ) : (
              <button
                onClick={() => window.print()}
                className="btn-primary w-full py-3.5 text-base font-extrabold shadow-xl"
              >
                Download Certificate PDF ↓
              </button>
            )}
          </div>
        </div>
      ) : allDone ? (
        <div className="card text-center shadow-2xl py-12 p-6 sm:p-8 space-y-6">
          <div className="mx-auto grid h-20 w-20 place-items-center rounded-3xl bg-white text-emerald-700 border border-emerald-200 shadow-md">
            <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138z" />
            </svg>
          </div>
          <h3 className="mt-5 text-2xl font-black text-slate-900 font-heading">Congratulations! You are Eligible</h3>
          <p className="mt-2 text-sm text-slate-600 max-w-md mx-auto font-medium">
            You have successfully completed verified submissions across all five seva categories. Generate your official digital certificate now.
          </p>
          <div className="mt-6 flex justify-center">
            <button onClick={generate} disabled={generating} className="btn-primary w-full py-3.5 text-base font-extrabold shadow-xl">
              {generating ? <Spinner /> : "Generate My Certificate"}
            </button>
          </div>
        </div>
      ) : (
        <div className="card text-center shadow-2xl py-12 p-6 sm:p-8 space-y-6">
          <div className="mx-auto grid h-20 w-20 place-items-center rounded-3xl bg-white text-emerald-700 border border-emerald-200 shadow-md">
            <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h3 className="mt-5 text-2xl font-black text-slate-900 font-heading">Certificate Locked</h3>
          <p className="mt-2 text-sm text-slate-600 max-w-md mx-auto font-medium">
            Complete verified service across all five categories to unlock your certificate. You have completed <b className="text-emerald-900 font-black">{progress.data?.stars ?? 0} of {progress.data?.total_categories ?? 5}</b> categories.
          </p>
          <div className="mt-6 flex justify-center">
            <Link to="/progress" className="btn-primary px-6 py-3 text-sm font-extrabold shadow-lg">
              Check Seva Progress →
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
