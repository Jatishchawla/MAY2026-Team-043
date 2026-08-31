import { certificateApi } from "../../services/endpoints";
import { useAsync } from "../../hooks/useAsync";
import { EmptyState, PageHeader, PageLoader } from "../../components/ui";
import { formatDate } from "../../utils/datetime";

export default function AdminCertificates() {
  const { data, loading, error } = useAsync(() => certificateApi.list(), []);

  return (
    <div>
      <PageHeader
        title="Certificates"
        subtitle="Every volunteer who has earned a completion certificate."
      />

      {loading ? (
        <PageLoader />
      ) : error ? (
        <p className="text-red-600 font-bold p-4 rounded-xl bg-red-50 border border-red-200">{error}</p>
      ) : data.length === 0 ? (
        <EmptyState
          title="No certificates issued yet"
          subtitle="Certificates appear here once volunteers complete all five categories."
        />
      ) : (
        <div className="card overflow-hidden p-0 border border-emerald-300/80 shadow-md">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-emerald-100/90 text-xs font-bold uppercase tracking-wider text-emerald-950 border-b border-emerald-200">
                <tr>
                  <th className="px-5 py-3.5">Certificate No.</th>
                  <th className="px-5 py-3.5">Volunteer</th>
                  <th className="px-5 py-3.5">Email</th>
                  <th className="px-5 py-3.5">Issued</th>
                  <th className="px-5 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-emerald-200/60 bg-transparent">
                {data.map((c) => (
                  <tr key={c.id} className="hover:bg-emerald-100/40 transition-colors">
                    <td className="px-5 py-3.5 font-mono text-xs font-bold text-amber-900">{c.certificate_number}</td>
                    <td className="px-5 py-3.5 font-bold text-slate-950">{c.volunteer_name}</td>
                    <td className="px-5 py-3.5 text-slate-700 font-medium">{c.volunteer_email || "—"}</td>
                    <td className="px-5 py-3.5 text-slate-700 font-medium">{formatDate(c.issued_at)}</td>
                    <td className="px-5 py-3.5 text-right">
                      <div className="flex justify-end gap-3 text-xs font-bold">
                        <a
                          href={`/verify/${c.verification_code}`}
                          target="_blank"
                          rel="noreferrer"
                          className="text-emerald-700 hover:text-emerald-900 hover:underline"
                        >
                          Verify Portal ↗
                        </a>
                        {c.pdf_url && (
                          <a
                            href={c.pdf_url}
                            target="_blank"
                            rel="noreferrer"
                            className="text-amber-800 hover:text-amber-950 hover:underline"
                          >
                            PDF
                          </a>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
