import type { Doctor } from "@/data/doctors";
import {
  CalendarClock,
  GraduationCap,
  Sparkles,
  Stethoscope,
  HeartPulse,
  Wind,
  Award,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

interface DoctorCardProps {
  doctor: Doctor;
  layout?: boolean;
  index?: number;
  className?: string;
}

export function DoctorCard({ doctor, layout = true, index = 0, className = "" }: DoctorCardProps) {
  const shouldReduceMotion = useReducedMotion();

  // Specialty icon mapping
  const getSpecialityIcon = () => {
    switch (doctor.departmentId) {
      case "fertility":
        return Sparkles;
      case "diabetes":
        return HeartPulse;
      case "general-medicine":
        return Stethoscope;
      case "respiratory":
        return Wind;
      default:
        return Stethoscope;
    }
  };

  const SpecialityIcon = getSpecialityIcon();
  const num = String((index ?? 0) + 1).padStart(2, "0");

  return (
    <motion.article
      layout={shouldReduceMotion ? false : layout}
      initial={{ opacity: 0, scale: 0.96, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96, y: 15 }}
      whileHover={
        shouldReduceMotion
          ? undefined
          : {
              y: -6,
              boxShadow: "0 16px 36px rgba(244,63,94,0.13)",
            }
      }
      transition={{ type: "spring", stiffness: 280, damping: 22 }}
      className={`group relative flex flex-col justify-between h-full w-full overflow-hidden rounded-[24px] sm:rounded-[32px] bg-white border border-[#FCE7F0] shadow-[0_4px_24px_rgba(244,63,94,0.06)] p-4 sm:p-6 cursor-default transition-all duration-300 ${className}`}
    >
      <div className="flex flex-col h-full justify-between">
        {/* ── 1. Top Row: Left Icon + 3x3 Dots, Right Number Badge ── */}
        <div>
          <div className="flex items-start justify-between relative z-10">
            {/* Left: Dot Pattern + Circular Pink Icon */}
            <div className="relative">
              {/* 3x3 Pink Dots */}
              <div className="absolute -top-1 -left-1 grid grid-cols-3 gap-1 opacity-70 pointer-events-none">
                {[...Array(9)].map((_, i) => (
                  <span key={i} className="w-1 h-1 rounded-full bg-[#FBA9C5]" />
                ))}
              </div>

              {/* Circular Icon Badge */}
              <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-[#E11D48] to-[#F43F5E] text-white flex items-center justify-center shadow-md shadow-pink-500/20 group-hover:scale-110 transition-transform duration-300 relative z-10 mt-1 ml-1">
                <SpecialityIcon className="w-5 h-5 text-white" strokeWidth={2.2} />
              </div>
            </div>

            {/* Right: Number Badge (01, 02, etc.) */}
            <div className="flex flex-col items-center">
              <span className="text-[#E11D48] font-bold text-sm tracking-tight leading-none px-2.5 py-1 rounded-full bg-[#FFF0F4]">
                {num}
              </span>
              <span className="w-4 h-[2px] bg-[#E11D48] rounded-full mt-1" />
            </div>
          </div>

          {/* ── 2. Doctor Photo Frame with Experience Badge ── */}
          <div className="relative rounded-2xl overflow-hidden aspect-[4/4.2] bg-gradient-to-b from-[#FFF5F8] to-slate-100 border border-[#FCE7F0] my-4 shadow-2xs">
            <motion.img
              src={doctor.image}
              alt={doctor.name}
              loading="lazy"
              whileHover={shouldReduceMotion ? undefined : { scale: 1.05 }}
              transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
              className="h-full w-full object-cover object-top"
            />

            {/* Floating Experience Badge */}
            <div className="absolute bottom-2.5 right-2.5 bg-white/95 backdrop-blur-md border border-[#FF87B3]/40 rounded-full px-2.5 py-1 shadow-xs text-[#14213D] text-[11px] font-extrabold flex items-center gap-1">
              <Award className="w-3 h-3 text-[#D94D78]" />
              <span>{doctor.experienceYears}+ Yrs Exp</span>
            </div>
          </div>

          {/* ── 3. Doctor Name, Pink Underline & Speciality Title (Standardized Height) ── */}
          <div className="mb-3">
            <h3 className="font-display text-lg sm:text-[19px] font-bold text-[#14213D] tracking-tight group-hover:text-[#D94D78] transition-colors leading-snug">
              {doctor.name}
            </h3>
            <div className="w-7 h-[2.5px] bg-[#E11D48] rounded-full mt-1 mb-2" />
            <p className="text-[11.5px] font-bold text-[#D94D78] uppercase tracking-wider leading-snug min-h-[34px] flex items-center">
              {doctor.title}
            </p>
          </div>

          {/* ── 4. Qualifications Box (Standardized Height) ── */}
          <div className="bg-[#FFF9FB] border border-[#FCE7F0] rounded-xl p-2.5 flex items-center gap-2.5 mb-2.5 shadow-2xs min-h-[58px]">
            <div className="w-5 h-5 rounded-full bg-[#FFF0F4] border border-[#FF87B3] flex items-center justify-center shrink-0 text-[#E11D48]">
              <GraduationCap className="w-3 h-3" />
            </div>
            <div>
              <div className="text-[9.5px] font-bold uppercase tracking-wider text-slate-400">
                Qualifications
              </div>
              <div className="text-[12px] text-[#14213D] font-semibold leading-tight">
                {doctor.qualifications}
              </div>
            </div>
          </div>

          {/* ── 5. Consultation Schedule Box (Standardized Height) ── */}
          <div className="bg-[#FFF9FB] border border-[#FCE7F0] rounded-xl p-2.5 flex items-center gap-2.5 mb-3 shadow-2xs min-h-[58px]">
            <div className="w-5 h-5 rounded-full bg-[#FFF0F4] border border-[#FF87B3] flex items-center justify-center shrink-0 text-[#E11D48]">
              <CalendarClock className="w-3 h-3" />
            </div>
            <div>
              <div className="text-[9.5px] font-bold uppercase tracking-wider text-slate-400">
                Consultation Schedule
              </div>
              <div className="text-[11.5px] text-slate-700 leading-snug">
                <span className="font-bold text-[#14213D]">{doctor.consultationDays}</span>
                <span className="text-slate-400 mx-1">·</span>
                <span>{doctor.consultationTimes}</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── 6. Doctor Bio Summary (Uniform Height & Bottom Aligned) ── */}
        <div className="mt-2 pt-1 border-t border-slate-100/80">
          <p className="text-[12px] text-slate-500 leading-relaxed font-normal line-clamp-3 min-h-[52px]">
            {doctor.bio}
          </p>
        </div>
      </div>
    </motion.article>
  );
}
