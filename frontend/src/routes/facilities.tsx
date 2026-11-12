import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Building2,
  Phone,
  ArrowRight,
  Sparkles,
  HeartPulse,
  ChevronRight,
  Bed,
  Ambulance,
  FlaskConical,
  Accessibility,
  Car,
  Users,
  Baby,
} from "lucide-react";
import reception from "@/assets/gallery/gallery-reception.jpg";
import delivery from "@/assets/delivery-room.jpg";
import lab from "@/assets/gallery/gallery-diagnostics.jpg";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { FacilitiesHero } from "@/components/site/hero/FacilitiesHero";
import { EmergencySection } from "@/components/site/EmergencySection";

export const Route = createFileRoute("/facilities")({
  head: () => ({
    meta: [
      { title: "Facilities — Izone Hospital" },
      {
        name: "description",
        content:
          "Labour suites, operation theatres, maternity wards, 24/7 lab, ultrasound, pharmacy and emergency services in Thillainagar.",
      },
      { property: "og:title", content: "Facilities — Izone Hospital" },
      { property: "og:url", content: "/facilities" },
    ],
    links: [{ rel: "canonical", href: "/facilities" }],
  }),
  component: FacilitiesPage,
});

// ─── Animation Variants ─────────────────────────────────────────────────────
const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

const fadeUpVariant: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 60, damping: 18 },
  },
};

function FacilitiesPage() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <>
      {/* ── 1. Facilities Page Hero ── */}
      <FacilitiesHero />

      {/* ── 2. Overview Section with Facility Cards ── */}
      <section className="bg-gradient-to-b from-white via-[#FFF5F8]/40 to-white pt-6 pb-6 md:pt-8 md:pb-8 border-b border-slate-100 relative overflow-hidden">
        <div className="container-page relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8 md:mb-10"
          >
            <span className="inline-flex items-center rounded-full bg-[#FF87B3]/25 border border-[#FF87B3] px-3.5 py-1 text-xs font-bold tracking-widest text-[#D94D78] uppercase mb-4 shadow-2xs">
              Our Facilities
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-[#14213D] font-display tracking-tight leading-tight mb-3">
              Thoughtful spaces for every stage of care.
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm md:text-base leading-relaxed max-w-2xl mx-auto font-medium">
              Designed to provide comfort, convenience and compassionate care for you and your loved
              ones.
            </p>
            <div className="flex items-center justify-center gap-1.5 mt-3">
              <div className="w-12 h-1 bg-[#FF87B3] rounded-full" />
              <div className="w-1.5 h-1.5 bg-[#FF87B3] rounded-full" />
            </div>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {[
              {
                icon: Bed,
                t: "Maternity Wards",
                d: "Comfortable, private and well-equipped wards for a safe and joyful motherhood experience.",
              },
              {
                icon: Building2,
                t: "OPD & Consulting",
                d: "Spacious consultation rooms with minimal wait times and personalised care.",
              },
              {
                icon: Ambulance,
                t: "24×7 Emergency",
                d: "Round-the-clock emergency care with rapid response and advanced life support.",
              },
              {
                icon: FlaskConical,
                t: "In-house Diagnostics",
                d: "Advanced laboratory and imaging services for accurate, timely and reliable results.",
              },
              {
                icon: Accessibility,
                t: "Accessibility",
                d: "Barrier-free infrastructure with elevators, ramps and special assistance.",
              },
              {
                icon: Car,
                t: "Parking & Transit",
                d: "Ample parking space and easy access to public transport for your convenience.",
              },
            ].map((f) => (
              <motion.div
                key={f.t}
                variants={fadeUpVariant}
                whileHover={
                  shouldReduceMotion
                    ? undefined
                    : {
                        y: -6,
                        scale: 1.015,
                        boxShadow: "0 20px 45px -10px rgba(255,135,179,0.40)",
                      }
                }
                transition={{ type: "spring", stiffness: 280, damping: 20 }}
                className="flex flex-col justify-between rounded-2xl sm:rounded-3xl border border-[#FF87B3] bg-white p-5 sm:p-7 md:p-8 shadow-xs hover:border-[#D94D78] transition-all duration-300 min-h-[200px] sm:min-h-[220px] group cursor-default"
              >
                <div>
                  <div className="flex items-center gap-3.5 sm:gap-4">
                    <motion.div
                      whileHover={shouldReduceMotion ? undefined : { scale: 1.15, rotate: 6 }}
                      transition={{ type: "spring", stiffness: 300, damping: 15 }}
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-[#FF87B3] bg-[#FFF5F8] flex items-center justify-center text-[#D94D78] shrink-0 group-hover:bg-[#FF87B3] group-hover:text-[#14213D] transition-colors duration-300 shadow-2xs"
                    >
                      <f.icon className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
                    </motion.div>
                    <h3 className="font-display text-base md:text-lg font-extrabold text-[#14213D] leading-tight group-hover:text-[#D94D78] transition-colors">
                      {f.t}
                    </h3>
                  </div>
                  <p className="mt-3 sm:mt-4 text-xs md:text-sm text-slate-600 leading-relaxed font-medium">
                    {f.d}
                  </p>
                </div>

                <div className="flex justify-end mt-4">
                  <Link
                    to="/contact"
                    className="w-8 h-8 rounded-full bg-[#FFF5F8] border border-[#FF87B3] flex items-center justify-center text-[#D94D78] hover:bg-[#FF87B3] hover:text-[#14213D] transition-colors shadow-2xs group-hover:scale-108 cursor-pointer"
                    aria-label={`Enquire about ${f.t}`}
                  >
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── 3. Inside Izone Hospital Section ── */}
      <section className="bg-white pt-6 pb-6 md:pt-8 md:pb-8 border-b border-slate-100 relative overflow-hidden">
        <div className="container-page relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8 md:mb-10"
          >
            <span className="inline-flex items-center rounded-full bg-[#FF87B3]/25 border border-[#FF87B3] px-3.5 py-1 text-xs font-bold tracking-widest text-[#D94D78] uppercase mb-4 shadow-2xs">
              Inside Izone Hospital
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-[#14213D] font-display tracking-tight leading-tight mb-3">
              See the spaces behind the care.
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm md:text-base leading-relaxed max-w-2xl mx-auto font-medium">
              Modern facilities, designed for comfort, safety, and compassion — so you feel
              supported at every step.
            </p>
            <div className="flex items-center justify-center gap-1.5 mt-3">
              <div className="w-12 h-1 bg-[#FF87B3] rounded-full" />
              <div className="w-1.5 h-1.5 bg-[#FF87B3] rounded-full" />
            </div>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="grid gap-5 sm:gap-7 md:grid-cols-3"
          >
            {[
              {
                img: reception,
                category: "Outpatient Care",
                title: "Welcoming OPD & Reception",
                desc: "A calm start to every visit.",
                icon: Users,
                objectPosition: "object-[center_35%]",
              },
              {
                img: delivery,
                category: "Maternity Care",
                title: "Labour & Delivery Suite",
                desc: "Safe, private, and designed for new beginnings.",
                icon: Baby,
                objectPosition: "object-center",
              },
              {
                img: lab,
                category: "Diagnostics",
                title: "In-house Diagnostic Lab",
                desc: "Accurate results, faster decisions.",
                icon: FlaskConical,
                objectPosition: "object-[center_35%]",
              },
            ].map((c, i) => (
              <motion.div
                key={i}
                variants={fadeUpVariant}
                whileHover={
                  shouldReduceMotion
                    ? undefined
                    : {
                        y: -8,
                        scale: 1.015,
                        boxShadow: "0 22px 45px -10px rgba(255,135,179,0.40)",
                      }
                }
                transition={{ type: "spring", stiffness: 280, damping: 20 }}
                className="overflow-hidden rounded-2xl sm:rounded-3xl border border-[#FF87B3] bg-white shadow-xs hover:border-[#D94D78] transition-all duration-300 flex flex-col justify-between group cursor-default"
              >
                <div className="aspect-[4/3] w-full overflow-hidden bg-slate-100">
                  <motion.img
                    src={c.img}
                    alt={c.title}
                    loading="lazy"
                    whileHover={shouldReduceMotion ? undefined : { scale: 1.06 }}
                    transition={{ duration: 0.65, ease: "easeOut" }}
                    className={`w-full h-full object-cover transform-gpu ${c.objectPosition || "object-center"}`}
                  />
                </div>
                <div className="p-5 sm:p-6">
                  <div className="flex gap-3.5 sm:gap-4 items-start">
                    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#FFF5F8] border border-[#FF87B3] flex items-center justify-center text-[#D94D78] shrink-0 group-hover:bg-[#FF87B3] group-hover:text-[#14213D] transition-colors duration-300 shadow-2xs">
                      <c.icon className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
                    </div>
                    <div>
                      <span className="text-[#D94D78] text-[10px] font-extrabold tracking-widest uppercase block mb-1">
                        {c.category}
                      </span>
                      <h3 className="font-display text-[15px] sm:text-[16px] font-extrabold text-[#14213D] leading-snug group-hover:text-[#D94D78] transition-colors">
                        {c.title}
                      </h3>
                      <p className="mt-1.5 text-xs text-slate-500 leading-relaxed font-medium">
                        {c.desc}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex justify-center mt-6 md:mt-8"
          >
            <motion.div
              whileHover={shouldReduceMotion ? undefined : { scale: 1.04, y: -1 }}
              whileTap={{ scale: 0.97 }}
            >
              <Link
                to="/gallery"
                className="inline-flex items-center gap-2 rounded-full border-2 border-[#FF87B3] bg-white px-7 py-3 text-xs md:text-sm font-extrabold text-[#14213D] hover:bg-[#FFF5F8] transition-all shadow-xs cursor-pointer"
              >
                View full gallery
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── 4. Emergency Section (Neumorphic) ── */}
      <EmergencySection />
    </>
  );
}
