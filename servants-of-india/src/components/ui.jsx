import React from "react";

export function IndianFlagIcon({ className = "h-6 w-9" }) {
  return (
    <svg className={`rounded-sm inline-block shadow-sm ${className}`} viewBox="0 0 900 600" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="900" height="200" fill="#FF9933" />
      <rect y="200" width="900" height="200" fill="#FFFFFF" />
      <rect y="400" width="900" height="200" fill="#138808" />
      <circle cx="450" cy="300" r="80" stroke="#000080" strokeWidth="6.5" fill="none" />
      <circle cx="450" cy="300" r="14" fill="#000080" />
      {Array.from({ length: 24 }).map((_, i) => (
        <line
          key={i}
          x1="450"
          y1="300"
          x2={450 + 78 * Math.cos((i * 15 * Math.PI) / 180)}
          y2={300 + 78 * Math.sin((i * 15 * Math.PI) / 180)}
          stroke="#000080"
          strokeWidth="3.5"
        />
      ))}
    </svg>
  );
}

export function Spinner({ className = "" }) {
  return (
    <svg
      className={`animate-spin h-5 w-5 ${className}`}
      viewBox="0 0 24 24"
      fill="none"
    >
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
    </svg>
  );
}

export function PageLoader() {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-emerald-700 gap-3">
      <Spinner className="h-9 w-9 text-emerald-700" />
      <p className="text-xs font-bold uppercase tracking-wider text-slate-700">Loading data...</p>
    </div>
  );
}

export function EmptyState({ title, subtitle, action }) {
  return (
    <div className="rounded-2xl border-2 border-dashed border-emerald-300 bg-emerald-50/80 py-12 px-6 text-center shadow-sm">
      <div className="mx-auto grid h-12 w-12 place-items-center rounded-xl bg-emerald-100 text-emerald-800 border border-emerald-300 shadow-sm">
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
        </svg>
      </div>
      <p className="mt-4 text-lg font-bold text-slate-900">{title}</p>
      {subtitle && <p className="mt-1 text-sm text-slate-700 max-w-md mx-auto font-medium leading-relaxed">{subtitle}</p>}
      {action && <div className="mt-6 flex justify-center">{action}</div>}
    </div>
  );
}

const STATUS_STYLES = {
  pending: "bg-amber-100 text-amber-950 border-amber-300 font-bold",
  approved: "bg-emerald-100 text-emerald-950 border-emerald-300 font-bold",
  completed: "bg-emerald-100 text-emerald-950 border-emerald-300 font-bold",
  rejected: "bg-rose-100 text-rose-950 border-rose-300 font-bold",
  not_started: "bg-slate-200 text-slate-900 border-slate-300 font-bold",
  upcoming: "bg-sky-100 text-sky-950 border-sky-300 font-bold",
  cancelled: "bg-rose-100 text-rose-950 border-rose-300 font-bold",
  active: "bg-emerald-100 text-emerald-950 border-emerald-300 font-bold",
  blocked: "bg-rose-100 text-rose-950 border-rose-300 font-bold",
  deactivated: "bg-slate-200 text-slate-900 border-slate-300 font-bold",
};

export function StatusBadge({ status }) {
  const cls = STATUS_STYLES[status] || "bg-slate-200 text-slate-900 border-slate-300 font-bold";
  return (
    <span className={`badge border ${cls}`}>
      <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-current" />
      {String(status).replace(/_/g, " ")}
    </span>
  );
}

export function PageHeader({ title, subtitle, action }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-emerald-200/80 pb-4">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">{title}</h1>
        {subtitle && <p className="mt-1 text-sm font-medium text-slate-700">{subtitle}</p>}
      </div>
      {action && <div className="flex items-center gap-2">{action}</div>}
    </div>
  );
}

export function StatCard({ label, value }) {
  return (
    <div className="card flex flex-col justify-between hover:translate-y-[-2px] transition-all">
      <p className="text-xs font-bold uppercase tracking-wider text-slate-900">{label}</p>
      <p className="mt-3 text-3xl sm:text-4xl font-extrabold tracking-tight text-amber-800">{value}</p>
    </div>
  );
}