import { Link } from "@tanstack/react-router";
import {
  Calendar,
  Sparkles,
  ArrowRight,
  HeartHandshake,
  Award,
  Users,
  Heart,
  ChevronRight,
} from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import fertilityHeroFoetusOrb from "@/assets/fertility/fertility-hero-foetus-orb.webp";

const FERTILITY_STATS = [
  { icon: HeartHandshake, value: "95%+", label: "IVF Success Rate" },
  { icon: Users, value: "15+", label: "Fertility Specialists" },
  { icon: Award, value: "100%", label: "Personalized Care" },
  { icon: Heart, value: "24/7", label: "Patient Support" },
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
const FERTILITY_PHRASES = [
  [
    { text: "Building families with",  pink: false },
    { text: "care at every step",       pink: true  },
  ],
  [
    { text: "Building families one hopeful", pink: false },
    { text: "journey at a time",              pink: true  },
  ],
] as const;

// Sub-component: rotating headline inside the fertility hero
function FertilityAnimatedHeadline() {
  const shouldReduceMotion = useReducedMotion();
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    if (shouldReduceMotion) return;
    const id = setInterval(() => {
      setPhase((p) => (p + 1) % FERTILITY_PHRASES.length);
    }, 5000);
    return () => clearInterval(id);
  }, [shouldReduceMotion]);

  const lines = FERTILITY_PHRASES[phase];

  return (
    <div className="mb-4 sm:mb-6 min-h-[80px] sm:min-h-[105px] lg:min-h-[135px]">
      <h1 className="font-display font-extrabold text-xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-[44px] leading-[1.2] tracking-tight text-[#14213D]">
        {/* Line 1 */}
        <span className="block min-h-[1.2em] overflow-hidden">
          <AnimatePresence mode="wait">
            <AnimatedLetters
              key={`fert-l1-${phase}`}
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
              key={`fert-l2-${phase}`}
              text={lines[1].text}
              className={lines[1].pink ? "text-[#D94D78] drop-shadow-[0_0_15px_rgba(255,135,179,0.6)]" : "text-[#14213D]"}
              delay={0.3}
            />
          </AnimatePresence>
        </span>
      </h1>
    </div>
  );
}

export function FertilityHero() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div
      role="region"
      aria-label="Fertility & IVF Centre Hero"
      className="outline-none"
    >
      {/* ── Main Hero Section Container ── */}
      <section className="relative bg-gradient-to-r from-[#F9E2EB] via-[#F6C2D4] to-[#E98CAE] text-[#14213D] overflow-hidden min-h-[460px] sm:min-h-[500px] md:min-h-[540px] lg:min-h-[580px] xl:min-h-[600px] flex items-center border-b border-[#FF87B3]">
        
        {/* ── Desktop & Tablet (>= md): Full-Bleed Right-Side Artwork ── */}
        <div
          className="hidden md:block absolute right-0 top-0 bottom-0 w-[44%] md:w-[46%] lg:w-[48%] xl:w-[54%] h-full pointer-events-none select-none z-10 overflow-hidden"
          style={{
            maskImage:
              "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.15) 6%, rgba(0,0,0,0.85) 18%, black 32%, black 100%)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.15) 6%, rgba(0,0,0,0.85) 18%, black 32%, black 100%)",
          }}
        >
          {/* Animated 3D Floating Fetus in Womb Artwork */}
          <motion.div
            animate={
              shouldReduceMotion
                ? undefined
                : {
                    y: [0, -6, 2, -4, 0],
                    scale: [1, 1.015, 0.995, 1.01, 1],
                  }
            }
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="w-full h-full flex items-center justify-end"
          >
            <img
              src={fertilityHeroFoetusOrb}
              alt="Realistic developing fetus inside glowing transparent womb bubble with cellular blastocysts and flowing soft waves"
              className="w-full h-full object-cover object-center md:object-right select-none transform-gpu"
              loading="eager"
              fetchPriority="high"
            />
          </motion.div>
        </div>

        {/* ── Ambient Floating Glows & Fluid Womb Pulse Overlays (Desktop & Tablet) ── */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-15" aria-hidden="true">
          {/* Large Radiant Ambient Backlight on Right */}
          <motion.div
            animate={
              shouldReduceMotion
                ? undefined
                : {
                    scale: [1, 1.1, 1],
                    opacity: [0.55, 0.85, 0.55],
                  }
            }
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/2 -translate-y-1/2 right-[5%] md:right-[8%] lg:right-[15%] w-[380px] md:w-[460px] lg:w-[600px] h-[380px] md:h-[460px] lg:h-[600px] rounded-full bg-gradient-to-tr from-white/70 via-pink-200/40 to-transparent blur-3xl hidden sm:block"
          />

          {/* Realistic Womb Heartbeat Pulse Rings */}
          <motion.div
            animate={
              shouldReduceMotion
                ? undefined
                : {
                    scale: [0.96, 1.06, 0.98, 1.04, 0.96],
                    opacity: [0.35, 0.8, 0.45, 0.75, 0.35],
                  }
            }
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute right-[10%] md:right-[14%] lg:right-[20%] top-1/2 -translate-y-1/2 w-[240px] md:w-[300px] lg:w-[380px] h-[240px] md:h-[300px] lg:h-[380px] rounded-full bg-gradient-to-tr from-white/90 via-pink-100/50 to-[#FF87B3]/40 blur-2xl hidden sm:block"
          />
        </div>

        {/* ── Main Content Container ── */}
        <div className="container-page relative z-20 py-8 sm:py-10 md:py-12 lg:py-16 w-full">
          <div className="w-full md:max-w-[56%] lg:max-w-3xl">
            
            {/* ── Left Column: Typography, Actions, Breadcrumbs & Hero Stats ── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col"
            >
              {/* Eyebrow Pill Tag */}
              <div className="inline-flex items-center gap-2 rounded-full bg-white/85 backdrop-blur-md border border-[#f06a99] px-4 py-1.5 text-xs font-extrabold tracking-widest text-[#FB5783] uppercase mb-3.5 sm:mb-4 shadow-sm cursor-default w-fit">
                <Sparkles className="w-3.5 h-3.5 text-[#FB5783]" />
                <span>FERTILITY &amp; IVF CENTRE</span>
              </div>

              {/* Rotating animated headline */}
              <FertilityAnimatedHeadline />

              {/* Supporting Paragraph */}
              <p className="text-slate-700 text-xs sm:text-sm md:text-base leading-relaxed mt-2 sm:mt-3 md:mt-4 mb-4 sm:mb-5 md:mb-6 max-w-lg font-medium">
                A fertility unit combining international expertise with genuinely compassionate
                counselling. We walk with you at every step of your parenthood journey.
              </p>

              {/* Pink "Book Consultation" Button */}
              <div className="flex flex-wrap items-center gap-4 mb-3.5 sm:mb-4 md:mb-5">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-[#FF5C8A] via-[#FB5783] to-[#DE356A] text-white px-5 sm:px-6 md:px-7 py-2.5 sm:py-3 md:py-3.5 text-xs sm:text-sm font-bold shadow-lg shadow-pink-500/25 hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 cursor-pointer"
                >
                  <Calendar className="w-4 h-4 text-white" />
                  <span>Book Consultation</span>
                  <ArrowRight className="w-4 h-4 text-white" />
                </Link>
              </div>

              {/* Breadcrumbs */}
              <nav className="flex items-center gap-2 text-xs text-slate-600 font-medium mb-3.5 sm:mb-4 md:mb-6">
                <Link to="/" className="hover:text-[#FB5783] transition-colors">
                  Home
                </Link>
                <ChevronRight className="w-3.5 h-3.5 opacity-60 text-slate-400" />
                <span className="font-bold text-[#FB5783] bg-white border border-[#FF87B3] px-2.5 py-0.5 rounded-md shadow-2xs">
                  Fertility Centre
                </span>
              </nav>

              {/* ── Mobile In-Flow Artwork (< md only): Blended Seamlessly to BG ── */}
              <div className="md:hidden w-full select-none my-3 flex justify-center items-center pointer-events-none">
                <div
                  className="relative w-full max-w-[340px] xs:max-w-[380px] sm:max-w-[440px] aspect-[16/11] flex items-center justify-center overflow-hidden"
                  style={{
                    maskImage:
                      "radial-gradient(ellipse at center, black 40%, rgba(0,0,0,0.75) 60%, transparent 88%)",
                    WebkitMaskImage:
                      "radial-gradient(ellipse at center, black 40%, rgba(0,0,0,0.75) 60%, transparent 88%)",
                  }}
                >
                  <motion.img
                    src={fertilityHeroFoetusOrb}
                    alt="Developing fetus in glowing transparent womb sphere"
                    className="w-full h-full object-cover object-center select-none block transform-gpu mix-blend-multiply"
                    loading="eager"
                    fetchPriority="high"
                    animate={
                      shouldReduceMotion
                        ? undefined
                        : {
                            y: [0, -4, 0],
                            scale: [1, 1.02, 1],
                          }
                    }
                    transition={{
                      duration: 6,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                </div>
              </div>

              {/* ── Fertility Hero Stats Bar (4 Metrics): Perfectly Fitted & Aligned with NO Clipping ── */}
              <div className="mt-4 sm:mt-5 md:mt-6 bg-white border border-[#FF87B3] rounded-2xl md:rounded-full shadow-md shadow-pink-200/30 px-3 sm:px-5 md:px-4 lg:px-6 py-2 sm:py-2.5 md:py-2 lg:py-3 w-full md:w-max max-w-full">
                <div className="grid grid-cols-2 md:flex md:flex-nowrap md:items-center md:divide-x divide-pink-100 gap-y-3 gap-x-2 md:gap-0">
                  {FERTILITY_STATS.map((stat, idx) => (
                    <div
                      key={idx}
                      className={`flex items-center gap-1.5 sm:gap-2 md:gap-1.5 lg:gap-2.5 px-1.5 sm:px-3 md:px-2 lg:px-4 xl:px-5 ${
                        idx === 0 ? "md:pl-0" : ""
                      } ${idx === FERTILITY_STATS.length - 1 ? "md:pr-0" : ""} group cursor-default shrink-0`}
                    >
                      <div className="shrink-0 w-7 h-7 sm:w-8 sm:h-8 md:w-7 md:h-7 lg:w-8.5 lg:h-8.5 rounded-full bg-[#FFF5F8] border border-[#FF87B3] flex items-center justify-center text-[#D94D78] shadow-2xs group-hover:bg-[#FF87B3] group-hover:text-[#14213D] transition-colors duration-300">
                        <stat.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-3.5 md:h-3.5 lg:w-4 lg:h-4 text-[#D94D78] group-hover:text-[#14213D] transition-colors duration-300" strokeWidth={2.2} />
                      </div>
                      <div className="text-left">
                        <div className="font-extrabold text-[#14213D] text-[11px] sm:text-xs md:text-[11px] lg:text-sm leading-tight whitespace-nowrap">
                          {stat.value}
                        </div>
                        <div className="text-[9px] sm:text-[10px] md:text-[9.5px] lg:text-xs text-slate-500 font-medium whitespace-nowrap">
                          {stat.label}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>
    </div>
  );
}
