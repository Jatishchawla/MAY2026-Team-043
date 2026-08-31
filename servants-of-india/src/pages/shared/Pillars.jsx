import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { PageHeader } from "../../components/ui";

const PILLARS_DETAIL = [
  {
    id: "blood-donation",
    name: "Blood Donation",
    hindi: "रक्तदान सेवा (Arogya Seva)",
    number: "01",
    tagline: "Lifesaving Blood Drives & Health Camps",
    description:
      "Voluntary blood donation is one of the highest forms of seva. Volunteers mobilize and participate in local blood donation camps, build emergency donor networks, and support patients requiring critical blood transfusions.",
    activities: [
      "Voluntary blood donation at verified medical camps and hospitals",
      "Organizing emergency blood donor helplines & awareness camps",
      "Assisting Thalassemia, Dialysis, and emergency trauma patients",
      "Spreading awareness to dispel myths around voluntary blood donation",
    ],
    impact: "Saves critical lives during medical emergencies, surgeries, and chronic blood disorders.",
  },
  {
    id: "child-welfare",
    name: "Child Welfare",
    hindi: "बाल कल्याण एवं विद्या सेवा (Vidya Seva)",
    number: "02",
    tagline: "Education, Nutrition & Holistic Child Upliftment",
    description:
      "Ensuring that every child from underprivileged backgrounds has access to quality learning, nutrition, and mentorship. Volunteers conduct tutoring, distribute books, and organize health checkups.",
    activities: [
      "Remedial teaching & coaching for underprivileged school students",
      "Notebook, textbook, school bag, and stationery distribution drives",
      "Nutritious snack/fruit distribution in community learning centres",
      "Digital literacy sessions and interactive storytelling workshops",
    ],
    impact: "Bridges educational inequality and empowers children with confidence and literacy.",
  },
  {
    id: "elder-care",
    name: "Elder Care & Orphanage",
    hindi: "वृद्ध एवं अनाथालय सेवा (Vridha & Bal Ashram Seva)",
    number: "03",
    tagline: "Compassionate Senior & Orphan Shelter Support",
    description:
      "Providing emotional warmth, healthcare assistance, and essential supplies to elderly citizens residing in old age homes and children in orphanages across the nation.",
    activities: [
      "Visiting senior citizen homes for companionship, recreation & reading",
      "Supplying essential medicines, blankets, hygiene kits & clothes",
      "Organizing cultural events, festival celebrations & joyful interactions",
      "Assisting orphanage authorities with administrative & caretaking support",
    ],
    impact: "Restores dignity, joy, and emotional support to vulnerable seniors and shelter children.",
  },
  {
    id: "environmental-plantation",
    name: "Environmental Plantation",
    hindi: "पर्यावरण एवं वृक्षारोपण सेवा (Prakriti Seva)",
    number: "04",
    tagline: "Afforestation, Biodiversity & Clean Green Bharat",
    description:
      "Combating environmental degradation through grassroots afforestation drives, waste segregation, water body revitalization, and plastic-free citizen campaigns.",
    activities: [
      "Native tree sapling plantation drives in public spaces, schools & parks",
      "Seed ball creation and dispersal drives in open forests and barren lands",
      "Cleaning and rejuvenating local ponds, lakes, and river banks",
      "Conducting community workshops on zero-waste living and plastic reduction",
    ],
    impact: "Boosts green cover, supports groundwater recharge, and fosters environmental stewardship.",
  },
  {
    id: "womens-care",
    name: "Women's Care",
    hindi: "नारी शक्ति एवं स्वास्थ्य सेवा (Nari Shakti Seva)",
    number: "05",
    tagline: "Maternal Health, Skill Empowerment & Dignity",
    description:
      "Fostering self-reliance and wellness among women from marginalized communities through menstrual hygiene awareness, vocational training, and maternal healthcare support.",
    activities: [
      "Distributing biodegradable sanitary napkins and menstrual health education",
      "Conducting skill-building workshops in tailoring, handicrafts & digital skills",
      "Maternal and child nutrition counselling drives in rural communities",
      "Legal awareness camps on women's rights and self-help group formation",
    ],
    impact: "Enhances women's dignity, healthcare access, and economic independence.",
  },
];

export default function Pillars() {
  const { user } = useAuth();
  const role = user?.role || "volunteer";
  const isVolunteer = role === "volunteer";
  const isManager = role === "event_manager";
  const isAdmin = role === "super_admin";

  return (
    <div className="space-y-8">
      {/* Header */}
      <PageHeader
        title="5 Pillars of National Seva"
        subtitle={
          isVolunteer
            ? "Explore the five foundational service categories. Complete verified seva in each pillar to qualify for your official certificate."
            : isManager
            ? "Manage community drives and evaluate volunteer submissions across the five national seva categories."
            : "Overview of the five foundational seva categories across Bharat."
        }
      />

      {/* Top Banner (Only for Volunteer and Event Manager; omitted for Admin) */}
      {!isAdmin && (
        <div className="card">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex-1">
              <span className="badge">
                {isVolunteer ? "National Framework" : "Event Management"}
              </span>
              <h3 className="mt-2 text-lg font-extrabold text-slate-950">
                {isVolunteer
                  ? "Why Five Core Pillars?"
                  : "Category-Based Drive Management & Review"}
              </h3>
              <p className="mt-1 text-xs sm:text-sm text-slate-700 font-medium max-w-3xl leading-relaxed">
                {isVolunteer
                  ? "True nation-building requires balanced progress across healthcare, education, social welfare, environment, and gender empowerment. Complete at least one approved seva in each domain to earn your national credential."
                  : "As an Event Manager, you create, supervise, and verify grassroots initiatives across all five national categories. Ensure submitted proofs meet authenticity guidelines before approving."}
              </p>
            </div>

            <div className="flex flex-wrap gap-2.5 shrink-0">
              {isVolunteer && (
                <Link to="/events" className="btn-primary py-2.5 px-5 font-bold shadow-md">
                  Browse Events →
                </Link>
              )}
              {isManager && (
                <Link to="/em/events" className="btn-primary py-2.5 px-5 font-bold shadow-md">
                  Manage Events →
                </Link>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 5 Pillar Detail Cards */}
      <div className="space-y-6">
        {PILLARS_DETAIL.map((p) => (
          <div
            key={p.id}
            className="card p-6 sm:p-7 hover:border-emerald-400 transition-all duration-200"
          >
            <div className="flex flex-col lg:flex-row items-start justify-between gap-6">
              {/* Left Column: Number, Title, Tagline & Description */}
              <div className="flex-1 space-y-3">
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-amber-100 text-amber-950 border border-amber-300 font-black text-sm shadow-sm">
                    {p.number}
                  </span>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-xl font-extrabold text-slate-950 font-heading">
                        {p.name}
                      </h3>
                      <span className="text-xs font-bold text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                        {p.hindi}
                      </span>
                    </div>
                    <p className="text-xs font-bold text-slate-600 mt-0.5">{p.tagline}</p>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-800 font-medium leading-relaxed">
                  {p.description}
                </p>

                {/* Key Activities List */}
                <div className="pt-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-2">
                    Key Seva Activities:
                  </h4>
                  <ul className="grid sm:grid-cols-2 gap-2 text-xs text-slate-700 font-medium">
                    {p.activities.map((act, idx) => (
                      <li key={idx} className="flex items-start gap-2 bg-emerald-100/50 rounded-lg p-2 border border-emerald-200/60">
                        <span className="text-emerald-700 font-bold">✔</span>
                        <span>{act}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Impact Statement */}
                <div className="pt-1 text-xs text-amber-950 bg-amber-50/80 p-2.5 rounded-xl border border-amber-200/80">
                  <b className="font-bold text-amber-900">National Impact:</b> {p.impact}
                </div>
              </div>

              {/* Right Column: Role Specific Actions */}
              <div className="flex flex-row lg:flex-col gap-2.5 shrink-0 self-stretch lg:self-center justify-end">
                {isVolunteer && (
                  <>
                    <Link
                      to="/events"
                      className="btn-accent py-2.5 px-4 text-xs font-bold text-center shadow-sm"
                    >
                      Find Drives
                    </Link>
                    <Link
                      to="/submit-proof"
                      className="btn-primary py-2.5 px-4 text-xs font-bold text-center shadow-sm"
                    >
                      Submit Proof
                    </Link>
                  </>
                )}

                {(isManager || isAdmin) && (
                  <>
                    <Link
                      to="/em/events"
                      className="btn-accent py-2.5 px-4 text-xs font-bold text-center shadow-sm"
                    >
                      Manage Drives
                    </Link>
                    <Link
                      to="/em/review-queue"
                      className="btn-primary py-2.5 px-4 text-xs font-bold text-center shadow-sm"
                    >
                      Review Proofs
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Role-Specific Hero Section (Deep Forest Green) */}
      <div className="card-hero">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="badge">
              {isVolunteer
                ? "Certification Milestone"
                : isManager
                ? "Quality & Review Oversight"
                : "National Seva Oversight"}
            </span>
            <h3 className="text-xl font-extrabold text-white">
              {isVolunteer
                ? "Earn the Official National 5-Star Credential"
                : isManager
                ? "Review Submissions Oversight"
                : "Review Queue & National Registry"}
            </h3>
            <p className="text-xs sm:text-sm text-emerald-100 font-medium max-w-2xl leading-relaxed">
              {isVolunteer
                ? "Once you complete at least 1 verified seva drive across all 5 pillars, you can instantly generate your QR-verified National Certificate recognized across organizations and institutions nationwide."
                : isManager
                ? "Maintain the integrity of national service evaluations. Review volunteer submissions in the queue and verify proof photographs across all five categories."
                : "Supervise volunteer submissions in the review queue and manage verified completion certificates across all 5 pillars of Servants of Bharat."}
            </p>
          </div>

          <div className="flex flex-wrap gap-3 shrink-0">
            {isVolunteer && (
              <Link to="/progress" className="btn-primary py-3 px-6 font-bold shadow-lg">
                Check Your 5-Star Progress →
              </Link>
            )}

            {isManager && (
              <Link to="/em/review-queue" className="btn-primary py-3 px-6 font-bold shadow-lg">
                Open Review Queue →
              </Link>
            )}

            {isAdmin && (
              <>
                <Link to="/em/review-queue" className="btn-primary py-3 px-5 font-bold shadow-lg">
                  Review Queue →
                </Link>
                <Link to="/admin/certificates" className="btn-ghost py-3 px-5 font-bold shadow-lg">
                  View Certificates →
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
