import { Link } from "@tanstack/react-router";
import { Building2, ChevronRight, Layers, Heart, Microscope, ShieldCheck } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion, type Variants } from "framer-motion";
import facilitiesHeroLab from "@/assets/facilities/facilities-hero-lab.webp";
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

const FACILITIES_STATS = [
  { icon: Building2, value: "25+", label: "Modern Facilities" },
  { icon: Layers, value: "10+", label: "Specialized Departments" },
  { icon: Heart, value: "100%", label: "Patient-Centered Care" },
];

// ─── Letter-by-letter left-to-right animation (matches HomeHero) ─────────────
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

// Two alternating headline phrase sets
const FACILITIES_PHRASES = [
  [
    { text: "Advanced facilities for", pink: false },
    { text: "exceptional care", pink: true },
  ],
  [
    { text: "Designed for healing", pink: false },
    { text: "built for your comfort", pink: true },
  ],
] as const;

// Sub-component: rotating headline inside the facilities hero
function FacilitiesAnimatedHeadline() {
  const shouldReduceMotion = useReducedMotion();
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    if (shouldReduceMotion) return;
    const id = setInterval(() => {
      setPhase((p) => (p + 1) % FACILITIES_PHRASES.length);
    }, 5000);
    return () => clearInterval(id);
  }, [shouldReduceMotion]);

  const lines = FACILITIES_PHRASES[phase];

  return (
    <motion.div
      variants={fadeUpVariant}
      className="mb-4 sm:mb-6 min-h-[80px] sm:min-h-[105px] lg:min-h-[135px]"
    >
      <h1 className="font-display text-xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-[44px] font-extrabold leading-[1.2] tracking-tight text-[#14213D]">
        {/* Line 1 */}
        <span className="block min-h-[1.2em] overflow-hidden">
          <AnimatePresence mode="wait">
            <AnimatedLetters
              key={`fac-l1-${phase}`}
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
              key={`fac-l2-${phase}`}
              text={lines[1].text}
              className={lines[1].pink ? "text-[#D94D78] drop-shadow-[0_0_15px_rgba(255,135,179,0.6)]" : "text-[#14213D]"}
              delay={0.3}
            />
          </AnimatePresence>
        </span>
      </h1>
    </motion.div>
  );
}

export function FacilitiesHero() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative bg-gradient-to-r from-[#FFF5F8] via-[#FFEBF2] to-[#FFDDE8] text-[#14213D] overflow-hidden min-h-[420px] sm:min-h-[520px] lg:min-h-[620px] xl:min-h-[660px] pt-6 pb-10 sm:pt-10 sm:pb-14 lg:pt-16 lg:pb-24 flex items-center justify-between">
      {/* ── Background Ambient Glows & Subtle Light Orbs ── */}
      <HeroBackground />

      {/* Decorative Subtle Plus (+) Accents matching reference layout */}
      <div
        className="absolute top-12 left-[44%] text-[#FF87B3]/40 text-xl font-light pointer-events-none select-none z-0 hidden lg:block"
        aria-hidden="true"
      >
        +
      </div>
      <div
        className="absolute top-28 left-[18%] text-[#FF87B3]/25 text-lg font-light pointer-events-none select-none z-0 hidden sm:block"
        aria-hidden="true"
      >
        +
      </div>

      {/* ── Smooth, Balanced Wave Transition at the Bottom ── */}
      <div className="absolute -bottom-[2px] inset-x-0 w-full overflow-hidden pointer-events-none z-20 leading-none select-none">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full block"
          preserveAspectRatio="none"
          style={{ height: "65px", minHeight: "45px", maxHeight: "95px" }}
        >
          {/* Secondary Ambient Crest Line */}
          <path
            d="M0,52 C280,18 560,78 840,42 C1120,8 1320,58 1440,38 L1440,125 L0,125 Z"
            fill="#FFFFFF"
            fillOpacity="0.3"
          />

          {/* Main Pure White Transition Wave */}
          <path
            d="M0,65 C260,28 540,88 820,50 C1100,16 1300,66 1440,48 L1440,125 L0,125 Z"
            fill="#FFFFFF"
          />
        </svg>
      </div>

      {/* ── Main Left-Side Content Container ── */}
      <div className="container-page relative z-10 pt-1 md:pt-4 pb-4 w-full">
        <div className="grid lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          {/* ── Left Column: Text Content & Desktop Stats (7 cols) ── */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="show"
            className="lg:col-span-6 xl:col-span-6 max-w-2xl z-10 flex flex-col justify-center py-2 lg:py-4"
          >
            {/* Eyebrow Badge */}
            <motion.div
              variants={fadeUpVariant}
              whileHover={shouldReduceMotion ? undefined : { scale: 1.04, y: -1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="inline-flex items-center gap-2 rounded-full bg-white/90 backdrop-blur-md border border-[#FF87B3] px-3.5 sm:px-4 py-1.5 text-xs font-extrabold tracking-widest text-[#D94D78] uppercase mb-3.5 sm:mb-4 w-max shadow-sm cursor-default"
            >
              <Building2 className="w-3.5 h-3.5 text-[#D94D78]" />
              Facilities
            </motion.div>

            {/* Rotating animated headline */}
            <FacilitiesAnimatedHeadline />


            {/* Description */}
            <motion.p
              variants={fadeUpVariant}
              className="text-slate-800 text-xs sm:text-sm md:text-base leading-relaxed mb-5 sm:mb-6 max-w-lg font-medium"
            >
              Our hospital is equipped with advanced technology and modern infrastructure to ensure
              the best care and comfort for every patient.
            </motion.p>

            {/* Breadcrumbs */}
            <motion.nav
              variants={fadeUpVariant}
              className="flex items-center gap-2 text-xs text-slate-700 font-semibold"
            >
              <Link to="/" className="hover:text-[#D94D78] transition-colors">
                Home
              </Link>
              <ChevronRight className="w-3.5 h-3.5 opacity-60 text-slate-500" />
              <span className="font-bold text-[#D94D78] bg-white border border-[#FF87B3] px-3 py-1 rounded-md shadow-2xs">
                Facilities
              </span>
            </motion.nav>

            {/* ── Desktop Viewport (>= lg): Facilities Hero Stats Pill (3 Items) ── */}
            <motion.div
              variants={fadeUpVariant}
              className="hidden lg:block mt-6 sm:mt-8 z-20 w-fit max-w-full"
            >
              <div className="bg-white border border-[#FF87B3] rounded-full shadow-md shadow-pink-200/30 pl-4 sm:pl-5 lg:pl-4 xl:pl-5 pr-7 sm:pr-8 lg:pr-7 xl:pr-8 py-2 sm:py-2.5 lg:py-2.5 xl:py-3 flex items-center divide-x divide-pink-100 max-w-full">
                {FACILITIES_STATS.map((stat, idx) => (
                  <div
                    key={idx}
                    className={`flex items-center gap-2 sm:gap-2.5 md:gap-3 lg:gap-2.5 xl:gap-3 group cursor-default shrink-0 ${
                      idx === 0
                        ? "pr-3 sm:pr-3.5 md:pr-4 lg:pr-3 xl:pr-4"
                        : idx === FACILITIES_STATS.length - 1
                        ? "pl-3 sm:pl-3.5 md:pl-4 lg:pl-3 xl:pl-4"
                        : "px-3 sm:px-3.5 md:px-4 lg:px-3 xl:px-4"
                    }`}
                  >
                    <div className="shrink-0 w-7 h-7 sm:w-7.5 sm:h-7.5 md:w-8 md:h-8 lg:w-7.5 lg:h-7.5 xl:w-8.5 xl:h-8.5 rounded-full bg-[#FFF5F8] border border-[#FF87B3] flex items-center justify-center text-[#D94D78] shadow-2xs group-hover:bg-[#FF87B3] group-hover:text-[#14213D] transition-colors duration-300">
                      <stat.icon className="w-3.5 h-3.5 lg:w-4 lg:h-4 xl:w-4.5 xl:h-4.5 text-[#D94D78] group-hover:text-[#14213D] transition-colors duration-300" strokeWidth={2.2} />
                    </div>
                    <div className="text-left min-w-0">
                      <div className="font-bold text-[#14213D] text-[11px] sm:text-xs md:text-sm lg:text-xs xl:text-sm leading-tight whitespace-nowrap">
                        {stat.value}
                      </div>
                      <div className="text-[9.5px] sm:text-[10px] md:text-xs lg:text-[10px] xl:text-xs text-slate-500 font-medium whitespace-nowrap">
                        {stat.label}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* ── Right Column: ChatGPT-Inspired Organic Medical Portal Frame (All-Device Fit) ── */}
          <div className="lg:col-span-6 xl:col-span-6 w-full select-none mt-6 lg:mt-0 pb-4 flex flex-col items-center justify-center lg:items-end">
            <div className="relative w-full max-w-[420px] xs:max-w-[460px] sm:max-w-[520px] lg:max-w-[540px] xl:max-w-[600px] 2xl:max-w-[640px]">
              
              {/* ── Background Ambient Glow Backdrop ── */}
              <div
                className="absolute -inset-4 sm:-inset-6 rounded-full bg-gradient-to-tr from-[#FF87B3]/35 via-white/50 to-[#DE356A]/20 blur-2xl pointer-events-none -z-10"
                aria-hidden="true"
              />

              {/* ── Floating Decorative Spheres (Matching ChatGPT Design) ── */}
              <motion.div
                animate={shouldReduceMotion ? undefined : { y: [0, -8, 0], scale: [1, 1.08, 1] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -left-3 sm:-left-5 top-1/4 w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-gradient-to-br from-[#FF87B3] to-[#DE356A] opacity-75 blur-[1.5px] pointer-events-none -z-5 hidden sm:block shadow-md shadow-pink-400/30"
                aria-hidden="true"
              />
              <motion.div
                animate={shouldReduceMotion ? undefined : { y: [0, 8, 0], scale: [1, 1.1, 1] }}
                transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -right-2 sm:-right-4 top-1/3 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-gradient-to-br from-[#FF6E9D] to-[#DE356A] opacity-80 pointer-events-none -z-5 hidden sm:block shadow-md shadow-pink-400/30"
                aria-hidden="true"
              />

              {/* ── Main Frame Motion Container ── */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-full pt-3 pb-3 px-1.5 sm:px-2 group"
              >


                {/* ── Organic Shape Frame for Laboratory Photo ── */}
                <div className="relative w-full rounded-tl-[56px] sm:rounded-tl-[84px] xl:rounded-tl-[108px] rounded-bl-[46px] sm:rounded-bl-[72px] xl:rounded-bl-[92px] rounded-tr-[20px] sm:rounded-tr-[30px] xl:rounded-tr-[38px] rounded-br-[20px] sm:rounded-br-[30px] xl:rounded-br-[38px] p-2.5 sm:p-3 bg-gradient-to-br from-white via-[#FFF5F8] to-[#FFEBF2] border-[3px] sm:border-[3.5px] border-[#FF87B3] shadow-[0_20px_55px_rgba(255,135,179,0.30)]">
                  
                  {/* Inner Bevel & Clean Photo */}
                  <div className="relative w-full aspect-[16/11] sm:aspect-[4/3] rounded-tl-[46px] sm:rounded-tl-[72px] xl:rounded-tl-[96px] rounded-bl-[38px] sm:rounded-bl-[62px] xl:rounded-bl-[80px] rounded-tr-[14px] sm:rounded-tr-[22px] xl:rounded-tr-[28px] rounded-br-[14px] sm:rounded-br-[22px] xl:rounded-br-[28px] overflow-hidden bg-white shadow-inner border border-[#FFCCD9]">
                    <img
                      src={facilitiesHeroLab}
                      alt="Izone Hospital advanced IVF laboratory and clinical embryology facilities"
                      className="w-full h-full object-cover object-center select-none block transform-gpu group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                      loading="eager"
                      fetchPriority="high"
                    />
                    {/* Soft Bottom-Up Vignette for Depth */}
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-[#14213D]/15 via-transparent to-transparent pointer-events-none"
                      aria-hidden="true"
                    />
                  </div>
                </div>

                {/* ── Top-Left Floating Badge: Advanced IVF Lab (ChatGPT Design) ── */}
                <motion.div
                  animate={shouldReduceMotion ? undefined : { y: [0, -5, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -top-1 sm:-top-2 left-0 sm:left-1 z-30 flex items-center gap-1.5 sm:gap-2.5"
                >
                  <div className="flex items-center gap-2 sm:gap-3 pl-1.5 pr-3.5 sm:pr-4.5 py-1.5 sm:py-2 rounded-full bg-white/98 backdrop-blur-md border-[2px] sm:border-[2.5px] border-[#FF87B3] shadow-[0_12px_28px_rgba(255,135,179,0.40)] cursor-default">
                    {/* Pink Icon Circle with Microscope */}
                    <div className="w-8 h-8 sm:w-9.5 sm:h-9.5 rounded-full bg-gradient-to-tr from-[#DE356A] via-[#FB5783] to-[#FF87B3] flex items-center justify-center text-white shadow-md shadow-pink-500/30 shrink-0">
                      <Microscope className="w-4 h-4 sm:w-5 sm:h-5 text-white stroke-[2.2]" />
                    </div>
                    {/* Badge Text */}
                    <div className="text-left leading-tight">
                      <div className="text-[9px] sm:text-[11px] font-semibold text-slate-500 tracking-wide">
                        Advanced
                      </div>
                      <div className="text-xs sm:text-base font-black text-[#DE356A] tracking-tight">
                        IVF Lab
                      </div>
                    </div>
                  </div>

                  {/* 3 Pink Dots Accent next to the badge (matching ChatGPT design) */}
                  <div className="hidden sm:flex items-center gap-1.5 pl-0.5 opacity-75 pointer-events-none">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF87B3]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF87B3]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF87B3]" />
                  </div>
                </motion.div>

                {/* ── Bottom-Right Floating Badge: 100% Sterile Cleanroom (ChatGPT Design) ── */}
                <motion.div
                  animate={shouldReduceMotion ? undefined : { y: [0, 5, 0] }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                  className="absolute -bottom-2 sm:-bottom-3 right-0 sm:right-2 z-30 flex items-center gap-2 sm:gap-2.5 pl-1.5 pr-3.5 sm:pr-4.5 py-1.5 sm:py-2 rounded-full bg-white/98 backdrop-blur-md border-[2px] sm:border-[2.5px] border-[#FF87B3] shadow-[0_12px_28px_rgba(255,135,179,0.40)] cursor-default"
                >
                  {/* Pink Icon Circle with ShieldCheck */}
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-tr from-[#DE356A] to-[#FF87B3] flex items-center justify-center text-white shadow-md shadow-pink-500/30 shrink-0">
                    <ShieldCheck className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-white stroke-[2.4]" />
                  </div>
                  {/* Badge Text */}
                  <div className="text-left leading-tight">
                    <div className="text-[11px] sm:text-[13px] font-extrabold text-[#14213D] whitespace-nowrap">
                      100% Sterile
                    </div>
                    <div className="text-[8.5px] sm:text-[10px] text-slate-500 font-semibold whitespace-nowrap">
                      Class 10,000 Cleanroom
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* ── Mobile & Tablet Viewport (< lg): Facilities Hero Stats Box (Positioned BELOW Image) ── */}
        <motion.div
          variants={fadeUpVariant}
          initial="hidden"
          animate="show"
          className="lg:hidden relative z-20 mt-5 sm:mt-6 w-full max-w-2xl mx-auto"
        >
          <div className="bg-white border border-[#FF87B3] rounded-2xl sm:rounded-3xl shadow-md shadow-pink-200/30 p-3.5 sm:p-5 w-full">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-y-3.5 gap-x-3 sm:gap-x-4">
              {FACILITIES_STATS.map((stat, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2.5 sm:gap-3 px-1 sm:px-2 group cursor-default min-w-0"
                >
                  <div className="shrink-0 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#FFF5F8] border border-[#FF87B3] flex items-center justify-center text-[#D94D78] shadow-2xs group-hover:bg-[#FF87B3] group-hover:text-[#14213D] transition-colors duration-300">
                    <stat.icon className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-[#D94D78] group-hover:text-[#14213D] transition-colors duration-300" />
                  </div>
                  <div className="text-left min-w-0 flex-1">
                    <div className="font-extrabold text-[#14213D] text-xs sm:text-sm leading-tight whitespace-nowrap">
                      {stat.value}
                    </div>
                    <div className="text-[10px] sm:text-xs text-slate-500 font-medium whitespace-nowrap truncate">
                      {stat.label}
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
