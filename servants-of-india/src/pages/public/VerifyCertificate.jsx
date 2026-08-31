import { Link, useParams } from "react-router-dom";
import { certificateApi } from "../../services/endpoints";
import { useAsync } from "../../hooks/useAsync";
import { PageLoader } from "../../components/ui";
import { IndianFlagIcon } from "../../components/Layout";

export default function VerifyCertificate() {
  const { code } = useParams();
  const { data, loading, error } = useAsync(() => certificateApi.verify(code), [code]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-6 font-sans">
      {/* Top Tricolor Accent */}
      <div className="fixed top-0 left-0 right-0 h-1.5 w-full bg-gradient-to-r from-[#FF9933] via-white to-[#138808]" />

      <div className="w-full max-w-lg">
        <Link to="/" className="mb-6 flex items-center justify-center gap-3 group">
          <IndianFlagIcon className="h-7 w-10 shrink-0 border border-emerald-300 shadow-md transition-transform group-hover:scale-105" />
          <span className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-1.5 font-heading">
            <span>Servants of</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-600">Bharat</span>
          </span>
        </Link>

        <div className="card text-center shadow-2xl">
          <span className="badge">Public Verification Portal</span>
          <h1 className="mt-3 text-2xl font-black text-slate-900 font-heading">Certificate Verification</h1>

          {loading && <PageLoader />}
          {error && <p className="mt-6 text-rose-700 font-bold p-3 bg-rose-50 rounded-xl border border-rose-200">{error}</p>}

          {!loading && !error && data && (
            data.valid ? (
              <div className="mt-6">
                <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-emerald-100 text-teal-700 border border-emerald-300 shadow-lg">
                  <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="mt-3 text-xl font-black text-slate-900 font-heading">Authentic & Verified</p>
                <p className="text-xs text-slate-600 font-medium">Official certificate issued by Servants of Bharat</p>

                <dl className="mt-6 space-y-3 rounded-xl bg-white/80 p-4 text-left border border-emerald-200">
                  <Row label="Volunteer Name" value={data.certificate.volunteer_name} />
                  <Row label="Certificate Number" value={data.certificate.certificate_number} isMono />
                  <Row
                    label="Issue Date"
                    value={
                      data.certificate.issued_at
                        ? new Date(data.certificate.issued_at).toLocaleDateString("en-IN", { dateStyle: "medium" })
                        : "—"
                    }
                  />
                  <Row label="Verification Status" value="100% Cryptographically Verified" isSuccess />
                </dl>
              </div>
            ) : (
              <div className="mt-6">
                <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-rose-100 text-rose-600 border border-rose-300 shadow-lg">
                  <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
                <p className="mt-3 text-xl font-black text-slate-900 font-heading">Invalid or Not Found</p>
                <p className="mt-2 text-sm text-slate-600 font-medium">
                  No certificate record was found matching verification code <span className="font-mono font-bold text-slate-900">"{code}"</span>.
                </p>
              </div>
            )
          )}

          <div className="mt-6 pt-4 border-t border-emerald-200/80">
            <Link to="/" className="btn-primary text-xs px-6 py-2.5 shadow-lg">
              Return to Home Page
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value, isMono = false, isSuccess = false }) {
  return (
    <div key={label} className="flex justify-between py-2 border-b border-emerald-100 last:border-0">
      <dt className="text-xs font-bold text-slate-600">{label}</dt>
      <dd className={`text-sm font-black ${isSuccess ? "text-emerald-700 font-black" : isMono ? "font-mono text-emerald-900" : "text-slate-900"}`}>
        {value}
      </dd>
    </div>
  );
}
