import { Link } from "react-router-dom";
import { IndianFlagIcon } from "../../components/ui";

export default function AuthLayout({ title, subtitle, children, footer }) {
  return (
    <div className="min-h-screen flex flex-col justify-between font-sans bg-[#f0f7f4]">
      {/* Top Peacock Accent */}
      <div className="h-1.5 w-full bg-gradient-to-r from-teal-600 via-blue-600 to-indigo-700 shadow-sm" />

      <div className="flex flex-1 items-center justify-center p-4 py-12">
        <div className="w-full max-w-md">
          {/* Logo Brand Link */}
          <div className="mb-6 text-center">
            <Link to="/" className="inline-flex items-center gap-3 group">
              <IndianFlagIcon className="h-7 w-11 shadow-sm transition-transform group-hover:scale-105 border border-emerald-300" />
              <span className="text-2xl font-extrabold tracking-tight text-slate-950">
                <span>Servants of</span>{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-amber-700 to-yellow-600">Bharat</span>
              </span>
            </Link>
          </div>

          {/* Green Auth Card */}
          <div className="card shadow-2xl p-6 sm:p-8">
            <div className="mb-6 text-center">
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 font-heading">{title}</h1>
              {subtitle && <p className="mt-1 text-xs sm:text-sm text-slate-600 font-medium">{subtitle}</p>}
            </div>

            {children}

            {footer && (
              <div className="mt-6 border-t border-emerald-200/80 pt-4 text-center text-xs text-slate-600 font-medium">
                {footer}
              </div>
            )}
          </div>
        </div>
      </div>

      <footer className="py-4 text-center text-xs text-slate-600 font-medium border-t border-emerald-200/70 bg-[#f0f7f4]">
        © {new Date().getFullYear()} Servants of Bharat · Verified National Youth Service
      </footer>
    </div>
  );
}


