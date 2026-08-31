import { Link } from "react-router-dom";
import { IndianFlagIcon } from "../../components/Layout";

const CATEGORIES = [
  {
    name: "Women's Care",
    desc: "Health, hygiene, empowerment & support programs.",
    color: "border-t-rose-500",
    svg: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
  },
  {
    name: "Child Welfare",
    desc: "Education, nutrition, mentoring & development.",
    color: "border-t-blue-500",
    svg: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
  },
  {
    name: "Elder Care & Orphanage",
    desc: "Companionship, aid, elderly & orphanage visits.",
    color: "border-t-amber-500",
    svg: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
  {
    name: "Environmental Plantation",
    desc: "Tree planting, clean drives & eco conservation.",
    color: "border-t-emerald-500",
    svg: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    name: "Blood Donation",
    desc: "Camp volunteering & life-saving donations.",
    color: "border-t-red-500",
    svg: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
  },
];

export default function Landing() {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      {/* Top Peacock Accent */}
      <div className="h-1.5 w-full bg-gradient-to-r from-teal-600 via-blue-600 to-indigo-700 shadow-sm" />

      {/* Nav */}
      <header className="border-b border-emerald-200/70 bg-[#f0f7f4]/95 backdrop-blur-xl sticky top-0 z-30 shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6">
          <Link to="/" className="group flex items-center gap-3">
            <IndianFlagIcon className="h-6 w-9 shrink-0 border border-emerald-300 shadow-sm transition-transform group-hover:scale-105" />
            <span className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-1.5 font-heading">
              <span>Servants of</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-700 via-teal-700 to-emerald-800">Bharat</span>
            </span>
          </Link>
          <div className="flex items-center gap-3">
            <Link to="/login" className="btn-ghost px-4 py-2 text-xs sm:text-sm font-bold">Login</Link>
            <Link to="/register" className="btn-primary px-4 py-2 text-xs sm:text-sm font-bold shadow-md shadow-emerald-900/20">Get Started</Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden py-16 sm:py-24">
        <div className="mx-auto max-w-5xl px-4 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-300 bg-emerald-100/70 px-4 py-1.5 text-xs font-black uppercase tracking-wider text-emerald-950 shadow-sm">
            <span className="h-2 w-2 rounded-full bg-emerald-600 animate-pulse" />
            Empowering Youth & Social Change Across Bharat
          </div>

          <h1 className="mx-auto mt-6 max-w-4xl text-4xl font-extrabold leading-tight sm:text-6xl text-slate-950 tracking-tight">
            Turn Everyday Service into{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-amber-700 to-yellow-600">
              Recognised Impact
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base sm:text-lg text-slate-800 leading-relaxed font-medium">
            One unified platform to participate in community initiatives, submit verified proofs across five core service areas, and earn a cryptographically verifiable certificate of completion.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link to="/register" className="btn-primary px-8 py-3.5 text-base font-bold shadow-lg shadow-emerald-950/20">
              Become a Volunteer
            </Link>
            <Link to="/login" className="btn-ghost px-8 py-3.5 text-base font-bold shadow-md">
              Sign In to Portal
            </Link>
          </div>
        </div>
      </section>

      {/* 5 Pillars / Categories (Green Cards) */}
      <section className="py-16 bg-white/60 border-y border-emerald-200/70">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="text-center">
            <span className="inline-block rounded-full bg-amber-100 border border-amber-300 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-amber-950">5 Pillars of Service</span>
            <h2 className="mt-2 text-3xl font-extrabold text-slate-950">Five Ways to Serve the Nation</h2>
            <p className="mt-2 text-slate-700 text-sm max-w-lg mx-auto font-medium">
              Complete verified service in each of these five domains to qualify for your official certificate.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {CATEGORIES.map((c, i) => (
              <div key={c.name} className="card text-center hover:scale-[1.03] transition-all duration-200 flex flex-col justify-between">
                <div>
                  <div className="mx-auto grid h-12 w-12 place-items-center rounded-xl bg-white text-amber-700 border border-amber-300 shadow-sm">
                    {c.svg}
                  </div>
                  <div className="mt-3 text-xs font-bold uppercase tracking-wider text-amber-950">Pillar 0{i + 1}</div>
                  <h3 className="mt-1 font-bold text-slate-950 text-base">{c.name}</h3>
                  <p className="mt-2 text-xs text-slate-700 leading-relaxed font-medium">{c.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 bg-emerald-50/40">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="text-center">
            <span className="inline-block rounded-full bg-emerald-100 border border-emerald-300 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-emerald-950">Simple Process</span>
            <h2 className="mt-2 text-3xl font-extrabold text-slate-950">How It Works</h2>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {[
              {
                step: "01",
                title: "Register & Join Events",
                desc: "Create your volunteer profile and discover upcoming social drives and community initiatives.",
              },
              {
                step: "02",
                title: "Submit Verified Proof",
                desc: "Upload geo-tagged photographs and activity reports for review by assigned Event Managers.",
              },
              {
                step: "03",
                title: "Get Certified",
                desc: "Once all five categories are approved, instantly generate your public QR-verified certificate.",
              },
            ].map((s) => (
              <div key={s.step} className="card hover:translate-y-[-2px] transition-all duration-200">
                <div className="text-xs font-bold tracking-widest uppercase text-emerald-950">STEP {s.step}</div>
                <h3 className="mt-2 text-lg font-bold text-slate-950">{s.title}</h3>
                <p className="mt-2 text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t border-emerald-200/70 bg-[#f0f7f4] py-8 text-center text-xs text-slate-600">
        <div className="mx-auto max-w-6xl px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <IndianFlagIcon className="h-4 w-6 rounded shadow-sm" />
            <span className="font-black text-slate-900 font-heading">Servants of Bharat</span>
          </div>
          <p>© {new Date().getFullYear()} Servants of Bharat. Dedicated to national seva & community impact.</p>
        </div>
      </footer>
    </div>
  );
}



