import { motion, useReducedMotion } from "framer-motion";
import {
  Baby,
  HeartPulse,
  Brain,
  FlaskConical,
  Waves,
  Activity,
  ShieldCheck,
  Wind,
} from "lucide-react";

interface DepartmentCardItem {
  id: string;
  name: string;
  icon: typeof Baby;
  angle: number; // in degrees around the circle
}

const SURROUNDING_CARDS: DepartmentCardItem[] = [
  { id: "pediatrics", name: "Pediatrics", icon: Baby, angle: -90 },
  { id: "general-surgery", name: "General Surgery", icon: Activity, angle: -45 },
  { id: "nephrology", name: "Nephrology", icon: ShieldCheck, angle: 0 },
  { id: "radiology", name: "Radiology", icon: Waves, angle: 45 },
  { id: "pathology", name: "Pathology", icon: FlaskConical, angle: 90 },
  { id: "pulmonology", name: "Pulmonology", icon: Wind, angle: 135 },
  { id: "neurology", name: "Neurology", icon: Brain, angle: 180 },
  { id: "general-medicine", name: "General Medicine", icon: HeartPulse, angle: 225 },
];

export function RadialDepartmentCards() {
  const shouldReduceMotion = useReducedMotion();

  // Orbital radius percentage from center (50%, 50%)
  const ORBIT_RADIUS_PERCENT = 37.5;

  return (
    <div className="orbit-system relative w-full max-w-[235px] sm:max-w-[390px] md:max-w-[450px] lg:max-w-[500px] xl:max-w-[520px] aspect-square mx-auto flex items-center justify-center select-none py-2">
      
      {/* ── Soft Ambient Glow & Background Pearls ── */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        {/* Soft Pink Radial Light */}
        <div className="w-[200px] sm:w-[320px] lg:w-[390px] h-[200px] sm:h-[320px] lg:h-[390px] rounded-full bg-gradient-to-tr from-[#FF87B3]/25 via-[#FFEBF2]/40 to-transparent blur-2xl" />
        
        {/* Ambient Floating Pearl Spheres */}
        <motion.div
          animate={
            shouldReduceMotion
              ? undefined
              : {
                  y: [0, -8, 0, 8, 0],
                  scale: [1, 1.05, 1],
                }
          }
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-2 right-4 sm:top-4 sm:right-8 w-5 h-5 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-white via-pink-100 to-[#FF87B3]/60 shadow-[0_4px_12px_rgba(255,135,179,0.35)] border border-white/80 pointer-events-none"
        />
        <motion.div
          animate={
            shouldReduceMotion
              ? undefined
              : {
                  y: [0, 6, 0, -6, 0],
                  scale: [1, 0.95, 1],
                }
          }
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-6 left-3 sm:bottom-10 sm:left-6 w-4 h-4 sm:w-7 sm:h-7 rounded-full bg-gradient-to-br from-white via-pink-100 to-[#FF87B3]/50 shadow-[0_4px_10px_rgba(255,135,179,0.3)] border border-white/80 pointer-events-none"
        />
      </div>

      {/* ── Outer Connecting Radial Ring (Subtle Dashed Track) ── */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none opacity-40"
        viewBox="0 0 500 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="250"
          cy="250"
          r="187.5"
          stroke="url(#radialRingGrad)"
          strokeWidth="1.5"
          strokeDasharray="4 6"
        />
        <defs>
          <linearGradient id="radialRingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF87B3" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#DE356A" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#FF87B3" stopOpacity="0.8" />
          </linearGradient>
        </defs>
      </svg>

      {/* ── 🔄 ORBITING CONTAINER (Rotates 360° Clockwise in 20s, Pauses on Hover) ── */}
      <div className={`absolute inset-0 w-full h-full pointer-events-none ${shouldReduceMotion ? "" : "animate-orbit-spin"}`}>
        {SURROUNDING_CARDS.map((card) => {
          const Icon = card.icon;
          const rad = (card.angle * Math.PI) / 180;
          const left = 50 + ORBIT_RADIUS_PERCENT * Math.cos(rad);
          const top = 50 + ORBIT_RADIUS_PERCENT * Math.sin(rad);

          return (
            <div
              key={card.id}
              style={{
                top: `${top}%`,
                left: `${left}%`,
                transform: "translate(-50%, -50%)",
              }}
              className="absolute pointer-events-auto cursor-pointer z-10"
            >
              {/* Counter-rotation to keep each card, icon, and text facing upright */}
              <div className={`w-full h-full ${shouldReduceMotion ? "" : "animate-orbit-counter-spin"}`}>
                <div className="w-[52px] h-[52px] sm:w-[78px] sm:h-[78px] md:w-[88px] md:h-[88px] lg:w-[98px] lg:h-[98px] rounded-[12px] sm:rounded-[18px] lg:rounded-[22px] bg-gradient-to-br from-white via-[#FFF9FB] to-white/95 border border-pink-200/90 shadow-[0_8px_20px_-4px_rgba(255,135,179,0.3)] backdrop-blur-md flex items-center justify-center hover:border-[#FF87B3] hover:shadow-[0_12px_28px_-4px_rgba(222,53,106,0.35)] hover:bg-white hover:scale-110 transition-all duration-300 group">
                  
                  {/* Upright Content Container */}
                  <div className="flex flex-col items-center justify-center text-center p-0.5 sm:p-1.5 w-full h-full">
                    <div className="w-4 h-4 sm:w-5.5 sm:h-5.5 mb-0.5 sm:mb-1 flex items-center justify-center text-[#14213D] group-hover:text-[#DE356A] group-hover:scale-110 transition-all duration-200">
                      <Icon className="w-3.5 h-3.5 sm:w-4.5 sm:h-4.5 lg:w-5.5 lg:h-5.5 stroke-[1.8]" />
                    </div>
                    <span className="text-[7px] sm:text-[9px] md:text-[9.5px] lg:text-[10.5px] font-bold text-[#14213D] leading-[1.1] max-w-[46px] sm:max-w-[68px] tracking-tight line-clamp-2">
                      {card.name}
                    </span>
                  </div>

                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── 📍 FIXED CENTER PINK CARD (Obstetrics & Gynecology - Stays Fixed) ── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 140,
          damping: 16,
          delay: 0.05,
        }}
        whileHover={
          shouldReduceMotion
            ? undefined
            : {
                scale: 1.08,
                transition: { type: "spring", stiffness: 350, damping: 18 },
              }
        }
        className="relative z-20 cursor-pointer group"
      >
        {/* Pulse Glow under Center Card */}
        <div className="absolute inset-0 rounded-[20px] sm:rounded-[30px] bg-[#DE356A]/35 blur-xl rotate-45 scale-95 pointer-events-none group-hover:bg-[#DE356A]/50 transition-colors" />

        {/* 45-deg Rotated Center Diamond Container */}
        <div className="relative w-[84px] h-[84px] sm:w-[124px] sm:h-[124px] lg:w-[155px] lg:h-[155px] rounded-[16px] sm:rounded-[26px] lg:rounded-[34px] bg-gradient-to-br from-[#FF4D88] via-[#E82F6E] to-[#D82260] border-2 border-white/80 shadow-[0_16px_36px_rgba(216,34,96,0.45)] rotate-45 flex items-center justify-center group-hover:shadow-[0_20px_44px_rgba(216,34,96,0.55)] transition-all duration-300">
          
          {/* Subtle Inner Glass Ring */}
          <div className="absolute inset-1 rounded-[13px] sm:rounded-[20px] lg:rounded-[28px] border border-white/30 pointer-events-none" />

          {/* Counter-Rotated Center Content (-45 deg) */}
          <div className="-rotate-45 flex flex-col items-center justify-center text-center p-1 sm:p-2.5 w-full h-full text-white">
            
            {/* Maternity / Women's Health Icon */}
            <div className="w-5 h-5 sm:w-8 sm:h-8 mb-0.5 sm:mb-1 flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-200">
              <svg
                viewBox="0 0 24 24"
                className="w-4.5 h-4.5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 fill-none stroke-current stroke-2 stroke-linecap-round stroke-linejoin-round"
              >
                <circle cx="12" cy="7" r="4" />
                <path d="M5.5 21v-2a6.5 6.5 0 0 1 13 0v2" />
                <path d="M12 11c1.5 1.5 3 2.5 3 4.5a3 3 0 0 1-6 0c0-2 1.5-3 3-4.5z" />
              </svg>
            </div>

            {/* Department Title */}
            <span className="text-[8.5px] sm:text-[11.5px] lg:text-[13.5px] font-extrabold text-white leading-[1.14] tracking-tight max-w-[66px] sm:max-w-[95px]">
              Obstetrics &amp; Gynecology
            </span>
          </div>

        </div>
      </motion.div>

    </div>
  );
}
