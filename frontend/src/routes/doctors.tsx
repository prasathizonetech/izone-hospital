import { createFileRoute, Link } from "@tanstack/react-router";
import { CTASection } from "@/components/site/CTASection";
import { DoctorCard } from "@/components/site/DoctorCard";
import { DoctorsHero } from "@/components/site/hero/DoctorsHero";
import { doctors } from "@/data/doctors";
import { departments } from "@/data/departments";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useState } from "react";
import {
  Stethoscope,
  Baby,
  HeartPulse,
  Wind,
  Users,
  Filter,
} from "lucide-react";

export const Route = createFileRoute("/doctors")({
  head: () => ({
    meta: [
      { title: "Our Doctors — Izone Hospital & Fertility Centre" },
      {
        name: "description",
        content:
          "Meet our consultants across gynaecology, fertility, general medicine, diabetes and respiratory care in Thillainagar.",
      },
      { property: "og:title", content: "Our Doctors — Izone Hospital" },
      { property: "og:url", content: "/doctors" },
    ],
    links: [{ rel: "canonical", href: "/doctors" }],
  }),
  component: DoctorsPage,
});

const filterTabs = [
  { id: "all", label: "All Specialists", icon: Users },
  { id: "fertility", label: "Gynaecology & Fertility", icon: Baby },
  { id: "diabetes", label: "Diabetes & Metabolic", icon: HeartPulse },
  { id: "general-medicine", label: "General Medicine", icon: Stethoscope },
  { id: "respiratory", label: "Pulmonology & Chest", icon: Wind },
] as const;

function DoctorsPage() {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const shouldReduceMotion = useReducedMotion();

  // Filter doctors based on active department filter
  const filteredDoctors = doctors.filter((doctor) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "fertility") {
      return ["fertility", "obstetrics", "gynaecology", "infertility"].includes(
        doctor.departmentId,
      );
    }
    if (activeFilter === "respiratory") {
      return ["respiratory", "pulmonology"].includes(doctor.departmentId);
    }
    return doctor.departmentId === activeFilter;
  });

  return (
    <>
      {/* ── 1. Redesigned Doctors Page Hero Section ── */}
      <DoctorsHero />



      {/* ── 2. Filter & Specialist Section ── */}
      <section id="specialists-section" className="relative pt-6 pb-10 md:pt-8 md:pb-14 bg-gradient-to-b from-white via-[#FFF5F8]/40 to-white overflow-hidden">
        <div className="container-page relative z-10">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto mb-8 sm:mb-10"
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-[#FF87B3]/25 border border-[#FF87B3] px-3.5 py-1 text-xs font-bold tracking-widest text-[#D94D78] uppercase mb-4 shadow-2xs">
              <Filter className="w-3 h-3 text-[#D94D78]" />
              By Department
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-[#14213D] font-display tracking-tight leading-tight mb-3">
              Specialists across every department.
            </h2>

            <p className="text-slate-600 text-xs sm:text-sm md:text-base leading-relaxed max-w-xl mx-auto mb-5 font-medium">
              Select a specialty below to view our experienced consultants, their consultation
              timings, and qualifications.
            </p>

            <div className="flex items-center justify-center gap-1.5">
              <div className="w-12 h-1 bg-[#FF87B3] rounded-full" />
              <div className="w-1.5 h-1.5 bg-[#FF87B3] rounded-full" />
            </div>
          </motion.div>

          {/* ── Animated Department Filter Pills (Full-Width Matching Doctor Cards) ── */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="w-full max-w-6xl mx-auto mb-8 sm:mb-12"
          >
            <div className="w-full p-1.5 sm:p-2 bg-[#FFF5F8] backdrop-blur-md rounded-2xl md:rounded-full border border-[#FF87B3] shadow-xs select-none">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-1.5 sm:gap-2">
                {filterTabs.map((tab) => {
                  const isSelected = activeFilter === tab.id;
                  const Icon = tab.icon;

                  return (
                    <motion.button
                      key={tab.id}
                      onClick={() => setActiveFilter(tab.id)}
                      whileHover={shouldReduceMotion ? undefined : { scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`relative flex items-center justify-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-2 sm:py-2.5 rounded-xl md:rounded-full text-[11px] sm:text-[13px] md:text-sm font-bold transition-colors duration-200 select-none cursor-pointer text-center ${
                        isSelected ? "text-[#14213D]" : "text-[#14213D]/70 hover:text-[#D94D78]"
                      }`}
                    >
                      {/* Active Background Pill */}
                      {isSelected && (
                        <motion.div
                          layoutId="activeDoctorFilterPill"
                          className="absolute inset-0 bg-white rounded-xl md:rounded-full shadow-sm border border-[#FF87B3]"
                          transition={{ type: "spring", stiffness: 350, damping: 28 }}
                        />
                      )}

                      {/* Animated Pink Underline for Active Filter */}
                      {isSelected && (
                        <motion.div
                          layoutId="activeDoctorFilterUnderline"
                          className="absolute bottom-1 left-2 sm:left-4 right-2 sm:right-4 h-[2px] bg-[#D94D78] rounded-full"
                          transition={{ type: "spring", stiffness: 350, damping: 28 }}
                        />
                      )}

                      <span className="relative z-10 flex items-center justify-center gap-1 sm:gap-1.5">
                        <Icon
                          className={`w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 ${isSelected ? "text-[#D94D78]" : "text-slate-500"}`}
                        />
                        <span className="truncate sm:whitespace-nowrap">{tab.label}</span>
                      </span>
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* ── 3. Doctor Cards Grid ── */}
          <motion.div layout className="grid gap-5 sm:gap-7 sm:grid-cols-2 lg:grid-cols-4 items-stretch relative">
            <AnimatePresence mode="popLayout">
              {filteredDoctors.map((d, index) => (
                <div key={d.id} className="flex h-full w-full">
                  <DoctorCard doctor={d} index={index} className="w-full" />
                </div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* If no doctors match filter */}
          {filteredDoctors.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <p className="text-slate-500 text-sm">No doctors found for this category.</p>
              <button
                onClick={() => setActiveFilter("all")}
                className="mt-3 text-xs font-bold text-[#D94D78] hover:underline cursor-pointer"
              >
                View all doctors
              </button>
            </motion.div>
          )}

          {/* ── All Departments Badges List (Single Horizontal Row Marquee) ── */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.5 }}
            className="mt-6 pt-4 sm:mt-8 sm:pt-5 border-t border-pink-100 overflow-hidden"
          >
            <div className="text-center mb-2.5">
              <span className="text-[11px] sm:text-xs font-extrabold uppercase tracking-widest text-[#D94D78]">
                All Hospital Departments &amp; Specialities
              </span>
            </div>

            {/* Seamless Infinite Marquee Left to Right */}
            <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)] py-1">
              <motion.div
                animate={shouldReduceMotion ? undefined : { x: ["-50%", "0%"] }}
                transition={{
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 28,
                  ease: "linear",
                }}
                className="flex items-center gap-2.5 w-max select-none"
              >
                {[...departments, ...departments, ...departments, ...departments].map((d, i) => {
                  const Icon = d.icon;
                  return (
                    <div
                      key={`${d.id}-${i}`}
                      className="inline-flex items-center gap-1.5 shrink-0 rounded-full border border-[#FF87B3] bg-white px-3 py-1.5 text-xs font-semibold text-[#14213D] shadow-2xs hover:border-[#f06a99] hover:bg-[#FFF5F8] transition-colors cursor-default whitespace-nowrap"
                    >
                      <Icon className="h-3.5 w-3.5 text-[#D94D78] shrink-0" />
                      <span>{d.name}</span>
                    </div>
                  );
                })}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
