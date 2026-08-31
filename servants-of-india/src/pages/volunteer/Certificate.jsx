import { useState } from "react";
import { Link } from "react-router-dom";
import { certificateApi, progressApi } from "../../services/endpoints";
import { useToast } from "../../contexts/ToastContext";
import { useAsync } from "../../hooks/useAsync";
import { PageHeader, PageLoader, Spinner } from "../../components/ui";
import { IndianFlagIcon } from "../../components/Layout";

export default function CertificatePage() {
  const toast = useToast();
  const progress = useAsync(() => progressApi.me(), []);
  // 404 (no cert yet) is expected — swallow it into null.
  const cert = useAsync(() => certificateApi.me().catch(() => null), []);
  const [generating, setGenerating] = useState(false);

  const formatDate = (d) =>
    d ? new Date(d).toLocaleDateString("en-IN", { dateStyle: "long" }) : "—";

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
    <div className="max-w-3xl space-y-6">
      <PageHeader title="Official Certificate" subtitle="Your verified credential of national service." />

      {c ? (
        <div className="space-y-6">
          {/* Actions (Green Card) */}
          <div className="card flex flex-wrap items-center justify-between gap-4 shadow-xl">
            <div>
              <h2 className="text-lg font-black text-slate-900 font-heading">Official National Credential</h2>
              <p className="text-xs text-slate-600 font-medium">Verified by Servants of Bharat Central Directorate.</p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <button onClick={() => window.print()} className="btn-primary py-2.5 px-4 text-xs font-black shadow-lg">
                Print / Save as PDF
              </button>
              <Link
                to={`/verify/${c.certificate_number || c.verification_code}`}
                target="_blank"
                className="btn-accent py-2.5 px-4 text-xs font-black"
              >
                Public Verification Portal ↗
              </Link>
            </div>
          </div>

          {/* Printable Certificate Canvas (Clean White Certificate Paper with Emerald Trims) */}
          <div
            id="certificate-print"
            className="relative overflow-hidden rounded-3xl border-8 border-emerald-800 bg-white p-8 sm:p-14 text-center shadow-2xl text-slate-900"
          >
            {/* Decorative corner accents */}
            <div className="absolute top-0 left-0 h-16 w-16 border-t-8 border-l-8 border-teal-600 rounded-tl-2xl" />
            <div className="absolute top-0 right-0 h-16 w-16 border-t-8 border-r-8 border-teal-600 rounded-tr-2xl" />
            <div className="absolute bottom-0 left-0 h-16 w-16 border-b-8 border-l-8 border-emerald-700 rounded-bl-2xl" />
            <div className="absolute bottom-0 right-0 h-16 w-16 border-b-8 border-r-8 border-emerald-700 rounded-br-2xl" />

            {/* Certificate Header */}
            <div className="flex items-center justify-center gap-3">
              <IndianFlagIcon className="h-8 w-12 border border-emerald-300 shadow-md" />
              <span className="text-2xl font-extrabold text-slate-950">
                SERVANTS OF <span className="text-amber-700">BHARAT</span>
              </span>
            </div>
            <p className="mt-1 text-[11px] font-bold uppercase tracking-widest text-teal-700">
              National Voluntary Service Directorate · Government of Bharat Initiative
            </p>

            <h1 className="mt-8 text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-950">
              Certificate of National Service
            </h1>
            <p className="mt-2 text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-600">
              This is proudly presented to
            </p>

            <p className="mt-4 text-2xl sm:text-4xl font-extrabold tracking-tight text-amber-800 underline decoration-amber-400 decoration-wavy underline-offset-8">
              {c.volunteer_name || "Volunteer"}
            </p>

            <p className="mx-auto mt-6 max-w-xl text-xs sm:text-sm leading-relaxed text-slate-800 font-medium">
              In sincere recognition of exemplary dedication, civic responsibility, and active leadership demonstrated through the completion of verified community seva across all five national service pillars.
            </p>

            {/* 5 Stars of Seva (Topaz Gold) */}
            <div className="mt-6 flex justify-center gap-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={i} className="text-2xl text-amber-500 drop-shadow-sm">★</span>
              ))}
            </div>

            {/* Footer info & signatures */}
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-between border-t-2 border-emerald-100 pt-6 text-left gap-6">
              <div>
                <p className="text-[10px] font-black uppercase tracking-wider text-slate-500">Certificate Number</p>
                <p className="font-mono text-xs sm:text-sm font-black text-amber-950">{c.certificate_number || c.verification_code}</p>
                <p className="mt-1 text-[10px] font-bold text-slate-600">Issued: {formatDate(c.issued_at)}</p>
              </div>

              <div className="text-center sm:text-right">
                <div className="inline-block border-b-2 border-slate-900 pb-1 px-6 font-serif italic text-base sm:text-lg font-bold text-slate-900">
                  National Director
                </div>
                <p className="mt-1 text-[10px] font-black uppercase tracking-wider text-slate-500">
                  Central Board of Volunteer Seva
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : allDone ? (
        <div className="card text-center shadow-2xl py-12">
          <div className="mx-auto grid h-20 w-20 place-items-center rounded-3xl bg-white text-emerald-700 border border-emerald-200 shadow-md">
            <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            </svg>
          </div>
          <h3 className="mt-5 text-2xl font-black text-slate-900 font-heading">Congratulations! You are Eligible</h3>
          <p className="mt-2 text-sm text-slate-600 max-w-md mx-auto font-medium">
            You have successfully completed verified submissions across all five seva categories. Generate your official digital certificate now.
          </p>
          <div className="mt-6 flex justify-center">
            <button onClick={generate} disabled={generating} className="btn-primary px-8 py-3.5 text-base font-black shadow-xl">
              {generating ? <Spinner /> : "Generate My Certificate"}
            </button>
          </div>
        </div>
      ) : (
        <div className="card text-center shadow-2xl py-12">
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
            <Link to="/progress" className="btn-primary px-6 py-3 text-sm font-black shadow-lg">
              Check Seva Progress
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

