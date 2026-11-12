import { Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion, type Variants } from "framer-motion";
import {
  Stethoscope,
  ArrowRight,
  Users,
  ShieldCheck,
  Calendar,
  Heart,
  Plus,
} from "lucide-react";
import doctorsHeroTeam from "@/assets/doctors/doctors-hero-team.png";
import { HeroBackground } from "./HeroBackground";

// ─── Animation Variants ─────────────────────────────────────────────────────
const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.04,
    },
  },
};

const fadeUpVariant: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 65, damping: 18 },
  },
};

const statsItems = [
  { icon: ShieldCheck, label: "Experienced", sub: "Doctors" },
  { icon: Heart, label: "Personalized", sub: "Care" },
  { icon: Users, label: "Family", sub: "Focused" },
  { icon: Plus, label: "Advanced", sub: "Facilities" },
];

// ─── Letter-by-letter left-to-right animation (same as HomeHero) ───────────
const AnimatedLetters = ({
  text,
  className,
  delay = 0,
}: {
  text: string;
  className: string;
  delay?: number;
}) => {
  const words = text.split(" ");
  return (
    <motion.span
      initial="hidden"
      animate="show"
      exit="exit"
      variants={{
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { staggerChildren: 0.035, delayChildren: delay } },
        exit: { opacity: 0, transition: { staggerChildren: 0.018, staggerDirection: -1 } },
      }}
      className={`inline-block ${className}`}
    >
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block whitespace-nowrap">
          {word.split("").map((char, charIndex) => (
            <motion.span
              key={charIndex}
              variants={{
                hidden: { opacity: 0 },
                show: { opacity: 1 },
                exit: { opacity: 0 },
              }}
              className="inline-block"
            >
              {char}
            </motion.span>
          ))}
          {wordIndex < words.length - 1 && (
            <span className="inline-block w-[0.25em]">&nbsp;</span>
          )}
        </span>
      ))}
    </motion.span>
  );
};

// Three rotating headline phrase sets:
// Phase 0: "Expert Care" / "Trusted Doctors for" / "Every Health Journey"
// Phase 1: "Compassionate" / "Trusted Doctors" / "For Your Family"
// Phase 2: "Advanced Skills" / "Trusted Doctors Who" / "Truly Care"
const HEADLINE_PHASES = [
  [
    { text: "Expert Care",          pink: false },
    { text: "Trusted Doctors for",   pink: true  },
    { text: "Every Health Journey",  pink: false },
  ],
  [
    { text: "Compassionate",         pink: false },
    { text: "Trusted Doctors",       pink: true  },
    { text: "For Your Family",       pink: false },
  ],
  [
    { text: "Advanced Skills",       pink: false },
    { text: "Trusted Doctors Who",   pink: true  },
    { text: "Truly Care",            pink: false },
  ],
] as const;

export function DoctorsHero() {
  const shouldReduceMotion = useReducedMotion();
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    if (shouldReduceMotion) return;
    const id = setInterval(() => {
      setPhase((p) => (p + 1) % HEADLINE_PHASES.length);
    }, 5000);
    return () => clearInterval(id);
  }, [shouldReduceMotion]);

  const lines = HEADLINE_PHASES[phase];

  return (
    <section className="relative bg-gradient-to-br from-[#FFF5F8] via-[#FFEBF2] to-[#FF87B3] text-[#14213D] overflow-hidden pt-4 sm:pt-6 lg:pt-8 pb-0 flex flex-col justify-between">
      {/* ── Background Ambient Lights & Curves ── */}
      <HeroBackground />

      {/* Decorative Heart Outline Motif on the far right background */}
      <svg
        className="absolute top-10 right-6 sm:right-12 lg:right-20 w-32 sm:w-48 lg:w-56 h-32 sm:h-48 lg:h-56 text-white/35 pointer-events-none z-0 select-none"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
      </svg>

      {/* ── 3D Sweeping Pink Ribbon & Bottom Wave Transition across Right Corner ── */}
      <div className="absolute -bottom-[2px] inset-x-0 w-full overflow-hidden pointer-events-none z-10 leading-none select-none">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full block"
          preserveAspectRatio="none"
          style={{ height: "58px", minHeight: "38px", maxHeight: "82px" }}
        >
          <defs>
            {/* Top Light Ribbon Highlight Gradient */}
            <linearGradient id="docRibbonHighlight" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FFA6C5" />
              <stop offset="25%" stopColor="#FF709E" />
              <stop offset="65%" stopColor="#FF4F86" />
              <stop offset="100%" stopColor="#FF2E6D" />
            </linearGradient>

            {/* Bottom Darker 3D Ribbon Shadow Gradient */}
            <linearGradient id="docRibbonShadow" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#E6396E" />
              <stop offset="40%" stopColor="#D42058" />
              <stop offset="75%" stopColor="#B81446" />
              <stop offset="100%" stopColor="#9E0C38" />
            </linearGradient>

            {/* Subtle Depth Shadow */}
            <filter id="docRibbonDropGlow" x="-5%" y="-40%" width="110%" height="180%">
              <feDropShadow dx="0" dy="-3" stdDeviation="4" floodColor="#990B35" floodOpacity="0.22" />
            </filter>
          </defs>

          {/* 1. Deep 3D Shadow Ribbon Layer (Right Corner Flare) */}
          <path
            d="M0,85 C240,60 520,72 780,76 C1040,80 1260,60 1440,30 L1440,58 C1260,88 1040,96 780,86 C520,80 240,70 0,85 Z"
            fill="url(#docRibbonShadow)"
            opacity="0.95"
          />

          {/* 2. Top Vibrant 3D Ribbon Highlight Swoosh */}
          <path
            d="M0,85 C260,52 540,62 800,66 C1060,70 1280,45 1440,16 L1440,38 C1280,66 1060,84 800,76 C540,70 260,60 0,85 Z"
            fill="url(#docRibbonHighlight)"
            filter="url(#docRibbonDropGlow)"
          />

          {/* 3. Pure White Seamless Page Bottom Transition Wave */}
          <path
            d="M0,85 C250,64 540,76 800,80 C1060,84 1270,72 1440,48 L1440,130 L0,130 Z"
            fill="#FFFFFF"
          />
        </svg>
      </div>

      {/* ── Main Content Container ── */}
      <div className="container-page relative z-20 pt-1 md:pt-2 pb-0 w-full">
        <div className="grid lg:grid-cols-12 gap-6 lg:gap-8 xl:gap-10 items-end">

          {/* ── Left Column: Typography, Actions & Bottom-Left Hero Stats Box ── */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="show"
            className="lg:col-span-7 xl:col-span-7 max-w-2xl text-left z-10 flex flex-col justify-center pt-1 pb-4 sm:pb-8 lg:pb-14"
          >
            {/* Eyebrow Badge */}
            <motion.div
              variants={fadeUpVariant}
              whileHover={shouldReduceMotion ? undefined : { scale: 1.04, y: -1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="inline-flex items-center gap-2 rounded-full bg-white/90 backdrop-blur-md border border-[#FF87B3] px-4 py-1.5 text-xs font-extrabold tracking-widest text-[#D94D78] uppercase mb-3.5 w-max shadow-2xs cursor-default"
            >
              <Stethoscope className="w-3.5 h-3.5 text-[#D94D78]" />
              <span>MEET OUR DOCTORS</span>
            </motion.div>

            {/* Main Headline – Rotating 3-line animated title */}
            <motion.div
              variants={fadeUpVariant}
              className="mb-4 sm:mb-6 min-h-[110px] sm:min-h-[145px] lg:min-h-[175px]"
            >
              <h1
                className="font-display text-xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-[44px] font-extrabold leading-[1.2] tracking-tight"
              >
                {/* Line 1 */}
                <span className="block min-h-[1.2em] overflow-hidden">
                  <AnimatePresence mode="wait">
                    <AnimatedLetters
                      key={`doc-l1-${phase}`}
                      text={lines[0].text}
                      className={lines[0].pink ? "text-[#D94D78] drop-shadow-[0_0_15px_rgba(255,135,179,0.6)]" : "text-[#14213D]"}
                      delay={0}
                    />
                  </AnimatePresence>
                </span>

                {/* Line 2 */}
                <span className="block min-h-[1.2em] overflow-hidden">
                  <AnimatePresence mode="wait">
                    <AnimatedLetters
                      key={`doc-l2-${phase}`}
                      text={lines[1].text}
                      className={lines[1].pink ? "text-[#D94D78] drop-shadow-[0_0_15px_rgba(255,135,179,0.6)]" : "text-[#14213D]"}
                      delay={0.3}
                    />
                  </AnimatePresence>
                </span>

                {/* Line 3 */}
                <span className="block min-h-[1.2em] overflow-hidden">
                  <AnimatePresence mode="wait">
                    <AnimatedLetters
                      key={`doc-l3-${phase}`}
                      text={lines[2].text}
                      className={lines[2].pink ? "text-[#D94D78] drop-shadow-[0_0_15px_rgba(255,135,179,0.6)]" : "text-[#14213D]"}
                      delay={0.6}
                    />
                  </AnimatePresence>
                </span>
              </h1>
            </motion.div>

            {/* Description Paragraph */}
            <motion.p
              variants={fadeUpVariant}
              className="text-slate-600 text-xs sm:text-sm md:text-base leading-relaxed mb-5 sm:mb-6 max-w-lg font-medium"
            >
              Consultants who take the time to listen, explain, and reassure. Dedicated to
              delivering trusted, compassionate, and ethical healthcare for every family.
            </motion.p>

            {/* Dual Action Buttons */}
            <motion.div
              variants={fadeUpVariant}
              className="flex flex-wrap items-center gap-3 sm:gap-3.5"
            >
              {/* Primary Consultation Button */}
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-[#FF87B3] via-[#f06a99] to-[#D94D78] text-white px-5 sm:px-7 py-3 sm:py-3.5 text-xs sm:text-sm font-extrabold hover:shadow-lg hover:shadow-pink-900/20 hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 cursor-pointer shadow-md"
              >
                <Calendar className="w-4 h-4 text-white" />
                <span>Book Consultation</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </Link>

              {/* Secondary View Specialists Button */}
              <button
                type="button"
                onClick={() => {
                  const el = document.getElementById("specialists-section");
                  el?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white border border-[#FF87B3] text-[#D94D78] px-5 sm:px-6 py-3 sm:py-3.5 text-xs sm:text-sm font-extrabold hover:bg-[#FFF5F8] hover:border-[#D94D78] hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 cursor-pointer shadow-2xs"
              >
                <Users className="w-4 h-4 text-[#D94D78]" />
                <span>View Specialists</span>
              </button>
            </motion.div>

            {/* ── Tablet, Laptop & Desktop: Hero Section Stats Box (Bottom-Left Corner) ── */}
            <motion.div
              variants={fadeUpVariant}
              className="hidden sm:block mt-6 sm:mt-8 lg:mt-9 z-20 w-fit max-w-full"
            >
              <div className="bg-white border border-[#FF87B3] rounded-full shadow-md shadow-pink-200/30 px-2.5 sm:px-3.5 md:px-4 lg:px-3 xl:px-5 2xl:px-6 py-2 sm:py-2.5 lg:py-2.5 xl:py-3.5 flex items-center divide-x divide-pink-100 max-w-full">
                {statsItems.map((item, idx) => (
                  <div
                    key={idx}
                    className={`flex items-center gap-1.5 sm:gap-2 md:gap-2.5 lg:gap-1.5 xl:gap-3 px-1.5 sm:px-2 md:px-3 lg:px-2 xl:px-4 ${
                      idx === 0 ? "pl-0.5 sm:pl-1" : ""
                    } ${idx === 3 ? "pr-1.5 sm:pr-2 xl:pr-3" : ""} group cursor-default shrink-0`}
                  >
                    <div className="shrink-0 w-6.5 h-6.5 sm:w-7.5 sm:h-7.5 md:w-8 md:h-8 lg:w-7 lg:h-7 xl:w-9 xl:h-9 rounded-full bg-[#FFF5F8] border border-[#FF87B3] flex items-center justify-center text-[#D94D78] shadow-2xs group-hover:bg-[#FF87B3] group-hover:text-[#14213D] transition-colors duration-300">
                      <item.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-3.5 lg:h-3.5 xl:w-4.5 xl:h-4.5 text-[#D94D78] group-hover:text-[#14213D] transition-colors duration-300" strokeWidth={2.2} />
                    </div>
                    <div className="text-left min-w-0">
                      <div className="font-bold text-[#14213D] text-[10.5px] sm:text-[11.5px] md:text-xs lg:text-[11px] xl:text-[13.5px] 2xl:text-sm leading-tight whitespace-nowrap">
                        {item.label}
                      </div>
                      <div className="text-[8.5px] sm:text-[9.5px] md:text-[10px] lg:text-[9px] xl:text-[11px] 2xl:text-xs text-slate-500 font-medium whitespace-nowrap">
                        {item.sub}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* ── Right Column: Doctors Trio Sitting Cleanly on the Bottom Baseline ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 xl:col-span-5 relative flex items-end justify-center lg:justify-end self-end select-none mt-6 sm:mt-8 lg:mt-0 z-20 pb-0 mb-0 leading-none w-full"
          >
            {/* Doctor Trio Visual Container */}
            <div className="relative w-full max-w-[340px] xs:max-w-[400px] sm:max-w-[480px] md:max-w-[520px] lg:max-w-[480px] xl:max-w-[560px] 2xl:max-w-[620px] flex items-end justify-center mx-auto lg:mx-0 lg:ml-auto">
              {/* Vibrant Pink Circular Disc Backdrop Centered Perfectly Behind Doctors */}
              <div
                className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-[52%] sm:-translate-y-[50%] w-[78%] xs:w-[82%] sm:w-[85%] md:w-[84%] lg:w-[86%] aspect-square rounded-full bg-gradient-to-tr from-[#FA5F8B] via-[#FF7AA2] to-[#FF9EBC] shadow-[0_20px_50px_rgba(217,77,120,0.35)] border-4 sm:border-8 border-white/70 pointer-events-none z-0"
                aria-hidden="true"
              />

              {/* Doctor Trio Image Cutout - 100% Full Body & Hands Visible */}
              <div className="relative z-10 w-full flex items-end justify-center">
                <img
                  src={doctorsHeroTeam}
                  alt="Expert medical consultants and specialist doctors at Izone Hospital"
                  className="w-full h-auto object-contain object-bottom align-bottom block drop-shadow-[0_18px_36px_rgba(130,20,55,0.22)] select-none"
                  loading="eager"
                  fetchPriority="high"
                  draggable={false}
                />
              </div>
            </div>
          </motion.div>

        </div>

        {/* ── Mobile Viewport (<640px): Hero Section Stats Box at the Bottom ── */}
        <motion.div
          variants={fadeUpVariant}
          initial="hidden"
          animate="show"
          className="sm:hidden relative z-30 mt-6 mb-4 w-full max-w-[420px] mx-auto px-2"
        >
          <div className="bg-white border border-[#FF87B3] rounded-2xl shadow-md shadow-pink-200/30 p-3.5 w-full">
            <div className="grid grid-cols-2 gap-y-3 gap-x-2">
              {statsItems.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 px-1 group cursor-default"
                >
                  <div className="shrink-0 w-8 h-8 rounded-full bg-[#FFF5F8] border border-[#FF87B3] flex items-center justify-center text-[#D94D78] shadow-2xs group-hover:bg-[#FF87B3] group-hover:text-[#14213D] transition-colors duration-300">
                    <item.icon className="w-4 h-4 text-[#D94D78] group-hover:text-[#14213D] transition-colors duration-300" strokeWidth={2.2} />
                  </div>
                  <div className="text-left min-w-0">
                    <div className="font-bold text-[#14213D] text-xs leading-tight whitespace-nowrap">
                      {item.label}
                    </div>
                    <div className="text-[10px] text-slate-500 font-medium whitespace-nowrap">
                      {item.sub}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
