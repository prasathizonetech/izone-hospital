import { hospital } from "@/data/hospital";
import { motion, useReducedMotion } from "framer-motion";
import { Phone } from "lucide-react";
import ambulanceImg from "@/assets/emergency-ambulance-cutout.webp";

export function EmergencySection() {
  const shouldReduceMotion = useReducedMotion();

  // Clean, sleek ECG path for smooth continuous left-to-right heartbeat animation
  const ecgPath =
    "M 0,25 L 35,25 L 43,25 L 49,18 L 55,32 L 61,8 L 71,42 L 78,16 L 84,28 L 90,25 L 150,25 L 158,25 L 164,18 L 170,32 L 176,8 L 186,42 L 193,16 L 199,28 L 205,25 L 265,25 L 273,25 L 279,18 L 285,32 L 291,8 L 301,42 L 308,16 L 314,28 L 320,25 L 355,25";

  return (
    <section className="bg-gradient-to-b from-[#FFF5F8]/50 via-[#F8FAFC] to-white py-12 md:py-16 lg:py-20 border-t border-b border-slate-100 overflow-hidden relative select-none">
      <div className="container-page relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          {/* ══════════════════════════════════════════════════════════════════
              LEFT CARD: Emergency Response & Ambulance (Generous Width)
             ══════════════════════════════════════════════════════════════════ */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, type: "spring", stiffness: 60 }}
            className="lg:col-span-7 xl:col-span-8 relative overflow-hidden rounded-2xl sm:rounded-[38px] bg-[#F4F7FB] border border-white p-5 sm:p-8 md:p-10 lg:p-12 flex flex-col justify-between shadow-[14px_16px_36px_rgba(163,177,198,0.32),-14px_-16px_36px_rgba(255,255,255,0.95),inset_0_1px_2px_rgba(255,255,255,0.9)] min-h-[380px] sm:min-h-[420px] transition-all duration-300"
          >
            {/* ── Top Header Row: Emergency Badge (Left) + Clean Sleek ECG Graph (Right) ── */}
            <div className="relative z-10 flex items-center justify-between gap-2 sm:gap-6 mb-4 sm:mb-6 w-full">
              {/* Neumorphic Emergency Pill Badge (Left) */}
              <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-[#EFF2F6] border border-white/80 shadow-[inset_2px_2px_5px_rgba(163,177,198,0.4),inset_-2px_-2px_5px_rgba(255,255,255,0.95)] shrink-0">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#DC2626] shadow-[0_0_8px_#EF4444]" />
                </span>
                <span className="text-[#DC2626] font-black text-[10px] sm:text-[11px] uppercase tracking-widest">
                  Emergency
                </span>
              </div>

              {/* ── Clean & Minimal ECG Graph Line on the Right ── */}
              <div className="relative flex-1 max-w-[140px] sm:max-w-[320px] md:max-w-[360px] lg:max-w-[380px] h-[36px] sm:h-[46px] overflow-hidden sm:overflow-visible pointer-events-none flex items-center justify-end">
                <div className="relative w-full h-full flex items-center">
                  {/* SVG ECG Track and Animated Red Wave */}
                  <svg
                    viewBox="0 0 360 50"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-full block"
                    preserveAspectRatio="none"
                  >
                    {/* Faint Background Guide Track */}
                    <path
                      d={ecgPath}
                      stroke="#CBD5E1"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeOpacity="0.45"
                    />

                    {/* Smooth Left-to-Right Animated Red Active ECG Wave */}
                    <motion.path
                      d={ecgPath}
                      stroke="#DC2626"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      initial={{ pathLength: 0.2, pathOffset: 0 }}
                      animate={
                        shouldReduceMotion
                          ? { pathLength: 1, pathOffset: 0 }
                          : {
                              pathLength: 0.22,
                              pathOffset: [0, 1],
                            }
                      }
                      transition={{
                        duration: 2.4,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* ── Main Content Grid: Text on Left, Ambulance Graphic with Full Visibility on Right ── */}
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-6 items-center flex-1">
              {/* Left Column: Headline, Pink Accent, Subtitle, and Pill */}
              <div className="md:col-span-6 lg:col-span-6 xl:col-span-7 flex flex-col justify-between h-full py-1">
                <div>
                  <h2 className="text-xl sm:text-3xl lg:text-[34px] xl:text-4xl font-black text-[#0F172A] font-display tracking-tight leading-tight mb-2">
                    24×7 emergency response.
                  </h2>

                  {/* Pink Accent Line */}
                  <div className="w-12 h-1 bg-[#FF87B3] rounded-full mb-3 sm:mb-4 shadow-2xs" />

                  <p className="text-slate-600 text-xs sm:text-sm md:text-[14.5px] leading-relaxed font-medium mb-4 sm:mb-6 max-w-sm sm:max-w-md">
                    Our emergency line is answered around the clock. In case of a maternity or medical
                    emergency, call for the fastest response.
                  </p>
                </div>

                {/* Bottom Neumorphic Capsule: Always here. Always ready. */}
                <div className="mt-2 sm:mt-4 w-max max-w-full">
                  <div className="inline-flex items-center gap-2.5 sm:gap-3 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full bg-[#EFF2F6] border border-white shadow-[4px_4px_12px_rgba(163,177,198,0.35),-4px_-4px_12px_rgba(255,255,255,0.95)]">
                    <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-red-50 border border-red-200/80 flex items-center justify-center shadow-inner">
                      <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#DC2626] shadow-[0_0_6px_#EF4444]" />
                    </div>
                    <span className="text-[11px] sm:text-sm font-extrabold text-slate-700 tracking-tight">
                      Always here. Always ready.
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Column: Ambulance Visual (Fully visible with unclipped ambulance text) ── */}
              <div className="md:col-span-6 lg:col-span-6 xl:col-span-5 relative flex items-center justify-center md:justify-end mt-4 md:mt-0 select-none">
                <div className="relative w-full max-w-[280px] sm:max-w-[380px] md:max-w-[420px] lg:max-w-[440px] flex items-center justify-center">
                  {/* Subtle dynamic motion speed streaks behind tires */}
                  <div className="absolute -bottom-2 left-2 right-2 h-4 pointer-events-none opacity-40">
                    <div className="w-full h-1 bg-gradient-to-r from-transparent via-slate-300 to-transparent rounded-full blur-[1px]" />
                    <div className="w-3/4 mx-auto mt-1 h-0.5 bg-gradient-to-r from-transparent via-slate-400/50 to-transparent rounded-full blur-[0.5px]" />
                  </div>

                  {/* Clean Ambulance Illustration */}
                  <motion.img
                    src={ambulanceImg}
                    alt="Izone Hospital 24x7 Emergency Ambulance Response"
                    whileHover={shouldReduceMotion ? undefined : { scale: 1.03, y: -2 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                    className="w-full h-auto object-contain drop-shadow-[0_12px_20px_rgba(15,23,42,0.12)] transform-gpu relative z-10"
                    loading="eager"
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* ══════════════════════════════════════════════════════════════════
              RIGHT CARD: Emergency Phone Box (Neumorphic)
             ══════════════════════════════════════════════════════════════════ */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.1, type: "spring", stiffness: 60 }}
            className="lg:col-span-5 xl:col-span-4 relative rounded-2xl sm:rounded-[38px] bg-[#F4F7FB] border border-white p-6 sm:p-9 md:p-10 flex flex-col items-center justify-center text-center shadow-[14px_16px_36px_rgba(163,177,198,0.32),-14px_-16px_36px_rgba(255,255,255,0.95),inset_0_1px_2px_rgba(255,255,255,0.9)] min-h-[360px] sm:min-h-[420px]"
          >
            {/* 3D Neumorphic Circular Phone Icon Bevel */}
            <motion.div
              animate={shouldReduceMotion ? undefined : { scale: [1, 1.05, 1] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#EFF2F6] border border-white shadow-[6px_6px_16px_rgba(163,177,198,0.38),-6px_-6px_16px_rgba(255,255,255,0.95)] flex items-center justify-center mb-4 sm:mb-6"
            >
              <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-[#F4F7FB] border border-white/80 shadow-[inset_2px_2px_5px_rgba(163,177,198,0.35),inset_-2px_-2px_5px_rgba(255,255,255,0.9)] flex items-center justify-center text-[#DC2626]">
                <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-[#DC2626]" />
              </div>
            </motion.div>

            {/* Emergency Line Uppercase Tracking Label */}
            <span className="text-[#DC2626] text-xs font-black tracking-widest uppercase block mb-2 sm:mb-3">
              Emergency Line
            </span>

            {/* Main Phone Number */}
            <a
              href="tel:+919988776655"
              className="text-xl sm:text-3xl xl:text-[32px] font-black text-[#0F172A] font-display hover:text-[#DC2626] transition-colors mb-2 sm:mb-3 block tracking-tight"
            >
              +91 9988776655
            </a>

            {/* Single contact number */}

            {/* 3D Neumorphic Red Gradient "Call now" Button */}
            <motion.a
              whileHover={shouldReduceMotion ? undefined : { scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              href="tel:+919988776655"
              className="inline-flex items-center justify-center gap-3 rounded-2xl md:rounded-[22px] bg-gradient-to-r from-[#DC2626] via-[#D92525] to-[#B91C1C] text-white px-6 sm:px-8 py-3.5 sm:py-4 font-extrabold text-sm sm:text-base shadow-[0_12px_24px_rgba(220,38,38,0.38),inset_0_2px_3px_rgba(255,255,255,0.35),inset_0_-3px_6px_rgba(0,0,0,0.22)] w-full max-w-[340px] transition-all cursor-pointer"
            >
              <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              <span>Call now</span>
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
