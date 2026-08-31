// Dependency-free SVG charts — horizontal bar chart and donut chart.
const PALETTE = ["#059669", "#0d9488", "#10b981", "#047857", "#d97706"];

/**
 * Single-metric horizontal bar breakdown.
 * @param {{title?: string, data: {label: string, value: number, color?: string}[], deep?: boolean}} props
 */
export function BarChart({ title, data = [], deep = false }) {
  const max = Math.max(1, ...data.map((d) => d.value));
  return (
    <div className={deep ? "card-hero" : "card"}>
      {title && (
        <div className={`mb-5 flex items-center justify-between border-b pb-3 ${deep ? "border-white/20" : "border-emerald-200/80"}`}>
          <h3 className={`text-base font-extrabold ${deep ? "text-white" : "text-slate-950"}`}>{title}</h3>
          <span className={`text-[10px] font-bold uppercase tracking-wider ${deep ? "text-emerald-200" : "text-slate-600"}`}>Distribution</span>
        </div>
      )}
      <div className="space-y-4">
        {data.map((d, i) => (
          <div key={d.label}>
            <div className={`mb-1.5 flex items-center justify-between text-xs font-bold ${deep ? "text-emerald-100" : "text-slate-800"}`}>
              <span>{d.label}</span>
              <span className={`tabular-nums font-extrabold ${deep ? "text-amber-300" : "text-amber-800"}`}>{d.value}</span>
            </div>
            <div className={`h-3 w-full overflow-hidden rounded-full ${deep ? "bg-black/30 border border-white/20" : "bg-emerald-100/80 border border-emerald-300/80"}`}>
              <div
                className="h-full rounded-full transition-all duration-500 shadow-sm"
                style={{
                  width: `${(d.value / max) * 100}%`,
                  backgroundColor: d.color || PALETTE[i % PALETTE.length],
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Donut chart with a legend.
 * @param {{title?: string, data: {label: string, value: number, color?: string}[], deep?: boolean}} props
 */
export function DonutChart({ title, data = [], deep = false }) {
  const total = data.reduce((s, d) => s + d.value, 0);
  const radius = 60;
  const stroke = 20;
  const circ = 2 * Math.PI * radius;
  let offset = 0;

  return (
    <div className={deep ? "card-hero" : "card"}>
      {title && (
        <div className={`mb-5 flex items-center justify-between border-b pb-3 ${deep ? "border-white/20" : "border-emerald-200/80"}`}>
          <h3 className={`text-base font-extrabold ${deep ? "text-white" : "text-slate-950"}`}>{title}</h3>
          <span className={`text-[10px] font-bold uppercase tracking-wider ${deep ? "text-emerald-200" : "text-slate-600"}`}>Breakdown</span>
        </div>
      )}
      <div className="flex flex-col sm:flex-row items-center gap-6">
        <div className="relative grid h-44 w-44 shrink-0 place-items-center">
          <svg className="h-full w-full -rotate-90" viewBox="0 0 160 160">
            {/* Background ring */}
            <circle
              cx="80"
              cy="80"
              r={radius}
              fill="transparent"
              stroke={deep ? "rgba(0, 0, 0, 0.35)" : "rgba(16, 185, 129, 0.15)"}
              strokeWidth={stroke}
            />
            {total > 0 &&
              data.map((d, i) => {
                const frac = d.value / total;
                const dash = frac * circ;
                const currentOffset = offset;
                offset += dash;
                return (
                  <circle
                    key={d.label}
                    cx="80"
                    cy="80"
                    r={radius}
                    fill="transparent"
                    stroke={d.color || PALETTE[i % PALETTE.length]}
                    strokeWidth={stroke}
                    strokeDasharray={`${dash} ${circ - dash}`}
                    strokeDashoffset={-currentOffset}
                    className="transition-all duration-500"
                  />
                );
              })}
          </svg>
          <div className="absolute text-center">
            <span className={`text-2xl font-black ${deep ? "text-amber-300" : "text-amber-800"}`}>{total}</span>
            <p className={`text-[10px] font-bold uppercase tracking-wider ${deep ? "text-emerald-200" : "text-slate-600"}`}>Total</p>
          </div>
        </div>

        {/* Legend */}
        <div className="flex-1 space-y-2.5 w-full">
          {data.map((d, i) => {
            const pct = total ? Math.round((d.value / total) * 100) : 0;
            return (
              <div key={d.label} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span
                    className="h-3 w-3 rounded-md shadow-sm border border-white/20"
                    style={{ backgroundColor: d.color || PALETTE[i % PALETTE.length] }}
                  />
                  <span className={`font-bold ${deep ? "text-emerald-100" : "text-slate-900"}`}>{d.label}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`font-extrabold ${deep ? "text-amber-300" : "text-amber-800"}`}>{d.value}</span>
                  <span className={`font-bold ${deep ? "text-emerald-300/80" : "text-slate-600"}`}>({pct}%)</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}