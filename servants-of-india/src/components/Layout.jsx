import { useState } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Modal from "./Modal";

const NAV = {
  volunteer: [
    { to: "/dashboard", label: "Dashboard" },
    { to: "/events", label: "Events" },
    { to: "/submit-proof", label: "Submit Proof" },
    { to: "/my-submissions", label: "My Submissions" },
    { to: "/progress", label: "Progress" },
    { to: "/certificate", label: "Certificate" },
    { to: "/notifications", label: "Notifications" },
    { to: "/profile", label: "Profile" },
  ],
  event_manager: [
    { to: "/em/dashboard", label: "Dashboard" },
    { to: "/em/events", label: "Events" },
    { to: "/em/review-queue", label: "Review Queue" },
    { to: "/profile", label: "Profile" },
  ],
  super_admin: [
    { to: "/admin/dashboard", label: "Dashboard" },
    { to: "/admin/users", label: "Users" },
    { to: "/admin/event-managers", label: "Event Managers" },
    { to: "/admin/certificates", label: "Certificates" },
    { to: "/em/events", label: "Events" },
    { to: "/em/review-queue", label: "Review Queue" },
    { to: "/profile", label: "Profile" },
  ],
};

const ROLE_LABEL = {
  volunteer: "Volunteer",
  event_manager: "Event Manager",
  super_admin: "Super Admin",
};

const ROLE_BADGE_STYLE = {
  super_admin: "bg-purple-100 text-purple-950 border-purple-300 font-extrabold",
  event_manager: "bg-sky-100 text-sky-950 border-sky-300 font-extrabold",
  volunteer: "bg-emerald-100 text-emerald-950 border-emerald-300 font-extrabold",
};

export function IndianFlagIcon({ className = "h-6 w-9" }) {
  return (
    <svg className={`rounded shadow-md ${className}`} viewBox="0 0 900 600" aria-label="Indian Flag">
      <rect width="900" height="200" fill="#FF9933" />
      <rect y="200" width="900" height="200" fill="#FFFFFF" />
      <rect y="400" width="900" height="200" fill="#138808" />
      <circle cx="450" cy="300" r="85" fill="none" stroke="#000080" strokeWidth="10" />
      <circle cx="450" cy="300" r="16" fill="#000080" />
      {Array.from({ length: 24 }).map((_, i) => {
        const angle = i * 15;
        const rad = (angle * Math.PI) / 180;
        const x2 = 450 + 85 * Math.cos(rad);
        const y2 = 300 + 85 * Math.sin(rad);
        return <line key={i} x1="450" y1="300" x2={x2} y2={y2} stroke="#000080" strokeWidth="6" />;
      })}
    </svg>
  );
}

function Brand() {
  return (
    <Link to="/" className="group flex items-center gap-3">
      <div className="relative">
        <IndianFlagIcon className="h-6 w-9 shrink-0 border border-emerald-300 shadow-sm transition-transform group-hover:scale-105" />
        <div className="absolute -inset-1 -z-10 rounded-lg bg-amber-500/15 blur-sm opacity-0 group-hover:opacity-100 transition" />
      </div>
      <div>
        <span className="text-xl font-extrabold text-slate-950 tracking-tight flex items-center gap-1.5 font-sans">
          <span>Servants of</span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-amber-700 to-yellow-600">Bharat</span>
        </span>
      </div>
    </Link>
  );
}

export default function Layout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [policyOpen, setPolicyOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const links = NAV[user?.role] || [];

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const linkClass = ({ isActive }) =>
    `flex items-center justify-between rounded-xl px-4 py-2.5 text-sm font-bold transition-all duration-200 ${
      isActive
        ? "bg-gradient-to-r from-emerald-700 via-teal-700 to-emerald-800 text-white font-bold shadow-md shadow-emerald-950/20 translate-x-1"
        : "text-slate-900 hover:bg-emerald-100/70 hover:text-slate-950 hover:translate-x-0.5"
    }`;

  return (
    <div className="min-h-screen flex flex-col font-sans">
      {/* Top Emerald & Warm Gold Accent Strip */}
      <div className="h-1.5 w-full bg-gradient-to-r from-emerald-700 via-teal-700 to-amber-600 shadow-sm" />

      {/* Header with Dedicated Navbar */}
      <header className="sticky top-0 z-30 border-b border-emerald-200/80 bg-[#f0f7f4]/95 backdrop-blur-xl shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2.5 sm:px-6">
          {/* Left: Hamburger & Brand */}
          <div className="flex items-center gap-3">
            <button
              className="rounded-xl border border-emerald-300 p-2 text-slate-900 hover:bg-emerald-100 lg:hidden transition"
              onClick={() => setOpen((o) => !o)}
              aria-label="Toggle menu"
            >
              ☰
            </button>
            <Brand />
          </div>

          {/* Center: Dedicated Navbar Links for All Dashboards */}
          <nav className="hidden md:flex items-center gap-1.5 rounded-full border border-emerald-200/80 bg-white/85 px-4 py-1.5 shadow-xs">
            <Link
              to="/"
              className="rounded-lg px-3 py-1 text-xs font-bold text-slate-800 hover:text-amber-800 hover:bg-emerald-100/60 transition"
            >
              Home
            </Link>
            <span className="text-emerald-300 text-xs">•</span>
            <Link
              to="/pillars"
              className="rounded-lg px-3 py-1 text-xs font-bold text-slate-800 hover:text-amber-800 hover:bg-emerald-100/60 transition"
            >
              5 Seva Pillars
            </Link>
            <span className="text-emerald-300 text-xs">•</span>
            <button
              onClick={() => setPolicyOpen(true)}
              className="rounded-lg px-3 py-1 text-xs font-bold text-slate-800 hover:text-amber-800 hover:bg-emerald-100/60 transition"
            >
              Policy
            </button>
            <span className="text-emerald-300 text-xs">•</span>
            <button
              onClick={() => setContactOpen(true)}
              className="rounded-lg px-3 py-1 text-xs font-bold text-slate-800 hover:text-amber-800 hover:bg-emerald-100/60 transition"
            >
              Contact
            </button>
          </nav>

          {/* Right: User Pill & Logout */}
          <div className="flex items-center gap-3 rounded-full border border-emerald-200 bg-white/95 px-3.5 py-1.5 shadow-sm">
            <div className="hidden text-right sm:block pr-2 border-r border-emerald-200">
              <p className="text-sm font-bold text-slate-950 leading-tight">{user?.full_name}</p>
              <span className={`mt-0.5 inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.2 rounded-full border ${ROLE_BADGE_STYLE[user?.role] || "bg-amber-100 text-amber-950 border-amber-300"}`}>
                {ROLE_LABEL[user?.role]}
              </span>
            </div>
            <button
              onClick={handleLogout}
              className="rounded-full bg-gradient-to-r from-emerald-700 to-teal-800 px-4 py-1 text-xs font-bold text-white transition hover:from-emerald-600 hover:to-teal-700 shadow-sm active:scale-95"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main App Canvas */}
      <div className="mx-auto flex max-w-7xl flex-1 w-full gap-6 px-4 py-6 sm:px-6">
        {/* Sidebar Nav */}
        <aside
          className={`${
            open ? "block" : "hidden"
          } fixed inset-x-0 top-[61px] z-20 border-b border-emerald-200 bg-[#f0f7f4]/98 p-4 backdrop-blur-xl lg:static lg:block lg:w-64 lg:shrink-0 lg:border-0 lg:bg-transparent lg:p-0`}
        >
          <nav className="space-y-1.5" onClick={() => setOpen(false)}>
            {links.map((l) => (
              <NavLink key={l.to} to={l.to} className={linkClass} end>
                <span>{l.label}</span>
                <span className="text-xs opacity-60">›</span>
              </NavLink>
            ))}

            {/* Mobile Header Links Drawer */}
            <div className="mt-4 pt-4 border-t border-emerald-200 space-y-1 lg:hidden">
              <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-500">Quick Links</p>
              <Link to="/" className="block px-3 py-2 rounded-xl text-xs font-bold text-slate-800 hover:bg-emerald-100/60">
                Home Page
              </Link>
              <Link to="/pillars" className="block px-3 py-2 rounded-xl text-xs font-bold text-slate-800 hover:bg-emerald-100/60">
                5 Seva Pillars
              </Link>
              <button
                onClick={() => setPolicyOpen(true)}
                className="w-full text-left px-3 py-2 rounded-xl text-xs font-bold text-slate-800 hover:bg-emerald-100/60"
              >
                Portal Policy
              </button>
              <button
                onClick={() => setContactOpen(true)}
                className="w-full text-left px-3 py-2 rounded-xl text-xs font-bold text-slate-800 hover:bg-emerald-100/60"
              >
                Contact & Support
              </button>
            </div>
          </nav>
        </aside>

        {/* Content Area */}
        <main className="min-w-0 flex-1 pb-10">
          <Outlet />
        </main>
      </div>

      {/* Dedicated Policy Modal */}
      <Modal open={policyOpen} onClose={() => setPolicyOpen(false)} title="Servants of Bharat — Official Policy" wide>
        <div className="space-y-4 text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
          <div className="rounded-xl bg-emerald-100/80 p-3.5 border border-emerald-300">
            <h4 className="font-extrabold text-emerald-950 text-sm">National Voluntary Service Framework</h4>
            <p className="mt-1 text-xs text-emerald-900">
              Servants of Bharat is a nationwide initiative to track, verify, and celebrate grassroots citizen service across five national pillars.
            </p>
          </div>

          <div className="space-y-3 divide-y divide-emerald-200/60">
            <div className="pt-2">
              <h5 className="font-extrabold text-slate-950">1. Verification & Proof Standards</h5>
              <p className="mt-1 text-slate-700">
                All submitted proof photos must clearly show the volunteer actively participating in the seva drive with genuine location and date context. Submissions are reviewed by verified Event Managers.
              </p>
            </div>

            <div className="pt-3">
              <h5 className="font-extrabold text-slate-950">2. Five Pillars of National Service</h5>
              <p className="mt-1 text-slate-700">
                To earn the official National Credential, a volunteer must complete and receive approval for at least one verified seva drive across all five designated pillars: Education, Environment, Healthcare, Swachhata, and Community Upliftment.
              </p>
            </div>

            <div className="pt-3">
              <h5 className="font-extrabold text-slate-950">3. Cryptographic Verification & Authenticity</h5>
              <p className="mt-1 text-slate-700">
                Each issued certificate is assigned a unique cryptographic verification code and QR identifier that can be publicly validated on the national verification portal.
              </p>
            </div>

            <div className="pt-3">
              <h5 className="font-extrabold text-slate-950">4. Privacy & Data Protection</h5>
              <p className="mt-1 text-slate-700">
                User personal details, contact information, and proof documents are securely encrypted and used exclusively for national voluntary service recognition.
              </p>
            </div>
          </div>

          <div className="flex justify-end pt-3">
            <button onClick={() => setPolicyOpen(false)} className="btn-primary px-5 py-2 text-xs font-bold shadow-md">
              I Understand & Agree
            </button>
          </div>
        </div>
      </Modal>

      {/* Dedicated Contact & Help Modal */}
      <Modal open={contactOpen} onClose={() => setContactOpen(false)} title="Contact & Helpdesk">
        <div className="space-y-4 text-xs sm:text-sm text-slate-800 font-medium">
          <p className="text-slate-700">
            Have questions about volunteering, seva drives, or certificate issuance? Reach out to our dedicated national support desk:
          </p>

          <div className="space-y-2.5 rounded-xl bg-emerald-50 p-4 border border-emerald-300">
            <div className="flex items-start gap-3">
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-amber-100 text-amber-950 font-bold border border-amber-300">📞</span>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Toll-Free Helpline</p>
                <p className="text-sm font-extrabold text-slate-950">1800-11-BHARAT (1800-11-2427)</p>
                <p className="text-[11px] text-slate-600">Available Mon–Sat: 9:00 AM – 6:00 PM IST</p>
              </div>
            </div>

            <div className="flex items-start gap-3 pt-2 border-t border-emerald-200">
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-amber-100 text-amber-950 font-bold border border-amber-300">✉️</span>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Official Support Email</p>
                <p className="text-sm font-extrabold text-amber-900">support@servantsofbharat.gov.in</p>
              </div>
            </div>

            <div className="flex items-start gap-3 pt-2 border-t border-emerald-200">
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-amber-100 text-amber-950 font-bold border border-amber-300">🏛️</span>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500">National Headquarters</p>
                <p className="text-xs text-slate-900 font-bold">
                  National Voluntary Service Directorate<br />
                  Shram Shakti Bhawan, Rafi Marg, New Delhi - 110001
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button onClick={() => setContactOpen(false)} className="btn-primary px-5 py-2 text-xs font-bold shadow-md">
              Close
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
