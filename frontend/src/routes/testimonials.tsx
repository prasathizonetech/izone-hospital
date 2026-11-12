import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Sparkles,
  Quote,
  Star,
  Check,
  User,
  Mail,
  Building2,
  Send,
  ShieldCheck,
  ChevronRight,
  Users,
  Heart,
  Clock,
} from "lucide-react";
import welcomeFamilyCare from "@/assets/family-care.jpg";
import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion, type Variants } from "framer-motion";
import { HeroBackground } from "@/components/site/hero/HeroBackground";
import { PatientReviewsAutoScroll } from "@/components/site/PatientReviewsAutoScroll";

export const Route = createFileRoute("/testimonials")({
  head: () => ({
    meta: [
      { title: "Testimonials — Izone Hospital" },
      {
        name: "description",
        content:
          "Read patient stories and reviews from families who received maternity, fertility, diabetes and general healthcare at Izone Hospital in Thillainagar.",
      },
      { property: "og:title", content: "Patient Stories — Izone Hospital" },
      { property: "og:url", content: "/testimonials" },
    ],
    links: [{ rel: "canonical", href: "/testimonials" }],
  }),
  component: Testimonials,
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

// Two alternating 2-line headline phrase sets
const TESTIMONIAL_PHRASES = [
  {
    line1Prefix: "Care ",
    line1Highlight: "our patients",
    line2: "take the time to write about",
  },
  {
    line1Prefix: "Real stories ",
    line1Highlight: "real journeys",
    line2: "real hope",
  },
] as const;

// Sub-component: rotating headline inside the testimonials hero left column
function TestimonialsAnimatedHeadline() {
  const shouldReduceMotion = useReducedMotion();
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    if (shouldReduceMotion) return;
    const id = setInterval(() => {
      setPhase((p) => (p + 1) % TESTIMONIAL_PHRASES.length);
    }, 5000);
    return () => clearInterval(id);
  }, [shouldReduceMotion]);

  const current = TESTIMONIAL_PHRASES[phase];

  return (
    <motion.div
      variants={fadeUpVariant}
      className="mb-4 sm:mb-6 min-h-[80px] sm:min-h-[105px] lg:min-h-[135px]"
    >
      <h1 className="font-display text-xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-[44px] font-extrabold leading-[1.2] tracking-tight text-[#14213D]">
        {/* Line 1 */}
        <span className="block min-h-[1.2em] overflow-hidden">
          <AnimatePresence mode="wait">
            <span key={`test-l1-${phase}`} className="inline-block">
              <AnimatedLetters
                text={current.line1Prefix}
                className="text-[#14213D]"
                delay={0}
              />
              <AnimatedLetters
                text={current.line1Highlight}
                className="text-[#D94D78] drop-shadow-[0_0_15px_rgba(255,135,179,0.6)]"
                delay={0.15}
              />
            </span>
          </AnimatePresence>
        </span>

        {/* Line 2 */}
        <span className="block min-h-[1.2em] overflow-hidden">
          <AnimatePresence mode="wait">
            <AnimatedLetters
              key={`test-l2-${phase}`}
              text={current.line2}
              className="text-[#14213D]"
              delay={0.3}
            />
          </AnimatePresence>
        </span>
      </h1>
    </motion.div>
  );
}

function Testimonials() {
  const [formSent, setFormSent] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  return (
    <>
      {/* ── 1. Custom Hero Section ── */}
      <section className="relative bg-gradient-to-br from-[#FFF5F8] via-[#FF87B3] to-[#f06a99] text-[#14213D] overflow-hidden pt-6 pb-10 sm:pt-8 sm:pb-14 lg:pt-8 lg:pb-16">
        {/* Scoped CSS for smooth, continuous 26s clockwise circular orbit & counter-rotation */}
        <style>{`
          @keyframes testimonialOrbitClockwise {
            from {
              transform: translate(-50%, -50%) rotate(0deg);
            }
            to {
              transform: translate(-50%, -50%) rotate(360deg);
            }
          }
          @keyframes testimonialCounterRotate {
            from {
              transform: translate(-50%, -50%) rotate(0deg);
            }
            to {
              transform: translate(-50%, -50%) rotate(-360deg);
            }
          }
          .testimonial-orbit-track {
            animation: testimonialOrbitClockwise 26s linear infinite;
          }
          .testimonial-orbit-card-wrapper {
            animation: testimonialCounterRotate 26s linear infinite;
          }
          .testimonial-orbit-stage:hover .testimonial-orbit-track,
          .testimonial-orbit-stage:hover .testimonial-orbit-card-wrapper {
            animation-play-state: paused;
          }
          @media (prefers-reduced-motion: reduce) {
            .testimonial-orbit-track,
            .testimonial-orbit-card-wrapper {
              animation: none !important;
            }
          }
        `}</style>

        {/* Shared Hero Background with subtle ambient glow orbs & organic curves */}
        <HeroBackground />

        {/* ── Smooth Decorative Wave Transition at the Bottom ── */}
        <div className="absolute -bottom-[2px] inset-x-0 w-full overflow-hidden pointer-events-none z-20 leading-none select-none">
          <svg
            viewBox="0 0 1440 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full block"
            preserveAspectRatio="none"
            style={{ height: "70px", minHeight: "50px", maxHeight: "110px" }}
          >
            <defs>
              {/* Subtle Pink Ribbon Accent Gradient */}
              <linearGradient id="testimonialWaveStrokePink" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#FFAEC7" stopOpacity="0.8" />
                <stop offset="30%" stopColor="#FF85AA" stopOpacity="0.9" />
                <stop offset="70%" stopColor="#FFAEC7" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.6" />
              </linearGradient>

              {/* Subtle Depth Shadow */}
              <filter id="testimonialWaveDepthGlow" x="-5%" y="-40%" width="110%" height="180%">
                <feDropShadow dx="0" dy="-2" stdDeviation="4" floodColor="#C92556" floodOpacity="0.18" />
              </filter>
            </defs>

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
              stroke="url(#testimonialWaveStrokePink)"
              strokeWidth="1.8"
              filter="url(#testimonialWaveDepthGlow)"
            />
          </svg>
        </div>

        <div className="container-page relative z-10 pt-1 md:pt-2 pb-2 w-full">
          <div className="grid lg:grid-cols-12 gap-6 lg:gap-8 xl:gap-10 items-start">
            {/* Left Column: Text & Navigation (5/6 cols) */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="show"
              className="lg:col-span-6 max-w-2xl z-10 flex flex-col justify-start"
            >
              <motion.div
                variants={fadeUpVariant}
                whileHover={shouldReduceMotion ? undefined : { scale: 1.04, y: -1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="inline-flex items-center gap-2 rounded-full bg-white/85 backdrop-blur-md border border-[#f06a99] px-4 py-1.5 text-xs font-extrabold tracking-widest text-[#D94D78] uppercase mb-3 w-max shadow-xs cursor-default"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#D94D78]" />
                Family Stories
              </motion.div>

              {/* Rotating animated headline */}
              <TestimonialsAnimatedHeadline />


              <motion.p
                variants={fadeUpVariant}
                className="text-slate-700 text-xs sm:text-sm md:text-base leading-relaxed mb-5 max-w-md font-medium"
              >
                A few of the many heartfelt stories and kind words shared with us by the families we
                care for every day.
              </motion.p>

              {/* Breadcrumbs */}
              <motion.nav
                variants={fadeUpVariant}
                className="flex items-center gap-2 text-xs text-slate-600 font-medium mt-2"
              >
                <Link to="/" className="hover:text-[#D94D78] transition-colors">
                  Home
                </Link>
                <ChevronRight className="w-3.5 h-3.5 opacity-60 text-slate-400" />
                <span className="font-bold text-[#D94D78] bg-white border border-[#FF87B3] px-2.5 py-0.5 rounded-md shadow-2xs">
                  Testimonials
                </span>
              </motion.nav>
            </motion.div>

            {/* Right Column: Center Fixed Image with 5 Clockwise Orbiting Feedback Cards (6/7 cols) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="lg:col-span-6 relative w-full h-[300px] sm:h-[460px] md:h-[500px] lg:h-[540px] xl:h-[560px] flex items-center justify-center select-none mt-6 lg:mt-0 self-start testimonial-orbit-stage scale-[0.65] sm:scale-[0.85] md:scale-100 origin-center overflow-visible"
            >
              {/* Subtle Ambient Decorative Guide Ring behind the center */}
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[370px] md:w-[430px] lg:w-[470px] h-[300px] sm:h-[370px] md:h-[430px] lg:h-[470px] rounded-full border border-white/35 pointer-events-none z-0"
                aria-hidden="true"
              />

              {/* ── Fixed Center Doctor & Family Consultation Photo ── */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150px] sm:w-[210px] md:w-[230px] lg:w-[250px] h-[150px] sm:h-[210px] md:h-[230px] lg:h-[250px] rounded-full overflow-hidden border-4 sm:border-[6px] border-white shadow-[0_16px_36px_rgba(200,40,90,0.18)] z-10 group pointer-events-auto bg-slate-900">
                <img
                  src={welcomeFamilyCare}
                  alt="Izone Hospital compassionate patient consultation"
                  className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-500"
                />
              </div>

              {/* ── Rotating Orbit Track Container (26s Smooth Clockwise Circle with 5 Cards) ── */}
              <div className="absolute top-1/2 left-1/2 w-[320px] sm:w-[390px] md:w-[450px] lg:w-[490px] xl:w-[510px] h-[320px] sm:h-[390px] md:h-[450px] lg:h-[490px] xl:h-[510px] pointer-events-none z-20 testimonial-orbit-track">
                
                {/* ── Card 1: Arun Prakash (Top / Angle -90°) ── */}
                <div
                  className="absolute"
                  style={{ top: "0%", left: "50%" }}
                >
                  <div className="testimonial-orbit-card-wrapper pointer-events-auto">
                    <div className="bg-white/95 backdrop-blur-md rounded-2xl border border-[#FF87B3]/60 p-2.5 sm:p-3 lg:p-3.5 shadow-[0_8px_24px_rgba(200,40,90,0.14)] text-[#14213D] w-[155px] sm:w-[195px] md:w-[215px] lg:w-[225px] transition-all hover:scale-105 hover:shadow-lg cursor-default">
                      <div className="flex gap-2 items-center mb-1 sm:mb-1.5">
                        <div className="w-6.5 h-6.5 sm:w-7 sm:h-7 rounded-full bg-[#FFF5F8] border border-[#FF87B3] flex items-center justify-center text-[9px] sm:text-[10px] font-extrabold text-[#D94D78] shadow-2xs shrink-0">
                          AP
                        </div>
                        <div className="min-w-0">
                          <div className="text-[9.5px] sm:text-[10.5px] font-extrabold text-[#14213D] leading-tight truncate">
                            Arun Prakash
                          </div>
                          <div className="text-[7.5px] sm:text-[8.5px] text-slate-500 font-semibold">Patient</div>
                        </div>
                        <div className="ml-auto flex text-amber-400 gap-0.5 shrink-0">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star key={i} className="w-2 sm:w-2.5 h-2 sm:h-2.5 fill-current" />
                          ))}
                        </div>
                      </div>
                      <p className="text-[8.5px] sm:text-[9.5px] text-slate-600 leading-relaxed italic font-medium">
                        "From the moment we walked in, we felt at ease. The care and support were exceptional."
                      </p>
                    </div>
                  </div>
                </div>

                {/* ── Card 2: Rohit & Sneha (Upper-Right / Angle -18°) ── */}
                <div
                  className="absolute"
                  style={{ top: "34.5%", left: "97.5%" }}
                >
                  <div className="testimonial-orbit-card-wrapper pointer-events-auto">
                    <div className="bg-white/95 backdrop-blur-md rounded-2xl border border-[#FF87B3]/60 p-2.5 sm:p-3 lg:p-3.5 shadow-[0_8px_24px_rgba(200,40,90,0.14)] text-[#14213D] w-[155px] sm:w-[195px] md:w-[215px] lg:w-[225px] transition-all hover:scale-105 hover:shadow-lg cursor-default">
                      <div className="flex gap-2 items-center mb-1 sm:mb-1.5">
                        <div className="w-6.5 h-6.5 sm:w-7 sm:h-7 rounded-full bg-[#FFF5F8] border border-[#FF87B3] flex items-center justify-center text-[9px] sm:text-[10px] font-extrabold text-[#D94D78] shadow-2xs shrink-0">
                          RS
                        </div>
                        <div className="min-w-0">
                          <div className="text-[9.5px] sm:text-[10.5px] font-extrabold text-[#14213D] leading-tight truncate">
                            Rohit &amp; Sneha
                          </div>
                          <div className="text-[7.5px] sm:text-[8.5px] text-slate-500 font-semibold">IVF Parents</div>
                        </div>
                        <div className="ml-auto flex text-amber-400 gap-0.5 shrink-0">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star key={i} className="w-2 sm:w-2.5 h-2 sm:h-2.5 fill-current" />
                          ))}
                        </div>
                      </div>
                      <p className="text-[8.5px] sm:text-[9.5px] text-slate-600 leading-relaxed italic font-medium">
                        "Our journey to parenthood was made possible by the expertise and compassion of the team."
                      </p>
                    </div>
                  </div>
                </div>

                {/* ── Card 3: Meena Krishnan (Lower-Right / Angle 54°) ── */}
                <div
                  className="absolute"
                  style={{ top: "90.5%", left: "79.4%" }}
                >
                  <div className="testimonial-orbit-card-wrapper pointer-events-auto">
                    <div className="bg-white/95 backdrop-blur-md rounded-2xl border border-[#FF87B3]/60 p-2.5 sm:p-3 lg:p-3.5 shadow-[0_8px_24px_rgba(200,40,90,0.14)] text-[#14213D] w-[155px] sm:w-[195px] md:w-[215px] lg:w-[225px] transition-all hover:scale-105 hover:shadow-lg cursor-default">
                      <div className="flex gap-2 items-center mb-1 sm:mb-1.5">
                        <div className="w-6.5 h-6.5 sm:w-7 sm:h-7 rounded-full bg-[#FFF5F8] border border-[#FF87B3] flex items-center justify-center text-[9px] sm:text-[10px] font-extrabold text-[#D94D78] shadow-2xs shrink-0">
                          MK
                        </div>
                        <div className="min-w-0">
                          <div className="text-[9.5px] sm:text-[10.5px] font-extrabold text-[#14213D] leading-tight truncate">
                            Meena Krishnan
                          </div>
                          <div className="text-[7.5px] sm:text-[8.5px] text-slate-500 font-semibold">Patient</div>
                        </div>
                        <div className="ml-auto flex text-amber-400 gap-0.5 shrink-0">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star key={i} className="w-2 sm:w-2.5 h-2 sm:h-2.5 fill-current" />
                          ))}
                        </div>
                      </div>
                      <p className="text-[8.5px] sm:text-[9.5px] text-slate-600 leading-relaxed italic font-medium">
                        "The doctors and staff are incredible. They go above and beyond for their patients."
                      </p>
                    </div>
                  </div>
                </div>

                {/* ── Card 4: Kavitha Sundar (Lower-Left / Angle 126°) ── */}
                <div
                  className="absolute"
                  style={{ top: "90.5%", left: "20.6%" }}
                >
                  <div className="testimonial-orbit-card-wrapper pointer-events-auto">
                    <div className="bg-white/95 backdrop-blur-md rounded-2xl border border-[#FF87B3]/60 p-2.5 sm:p-3 lg:p-3.5 shadow-[0_8px_24px_rgba(200,40,90,0.14)] text-[#14213D] w-[155px] sm:w-[195px] md:w-[215px] lg:w-[225px] transition-all hover:scale-105 hover:shadow-lg cursor-default">
                      <div className="flex gap-2 items-center mb-1 sm:mb-1.5">
                        <div className="w-6.5 h-6.5 sm:w-7 sm:h-7 rounded-full bg-[#FFF5F8] border border-[#FF87B3] flex items-center justify-center text-[9px] sm:text-[10px] font-extrabold text-[#D94D78] shadow-2xs shrink-0">
                          KS
                        </div>
                        <div className="min-w-0">
                          <div className="text-[9.5px] sm:text-[10.5px] font-extrabold text-[#14213D] leading-tight truncate">
                            Kavitha Sundar
                          </div>
                          <div className="text-[7.5px] sm:text-[8.5px] text-slate-500 font-semibold">Fertility Patient</div>
                        </div>
                        <div className="ml-auto flex text-amber-400 gap-0.5 shrink-0">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star key={i} className="w-2 sm:w-2.5 h-2 sm:h-2.5 fill-current" />
                          ))}
                        </div>
                      </div>
                      <p className="text-[8.5px] sm:text-[9.5px] text-slate-600 leading-relaxed italic font-medium">
                        "We felt truly heard and supported. Izone Hospital made our parenthood dream come true."
                      </p>
                    </div>
                  </div>
                </div>

                {/* ── Card 5: Dr. Priya Raman (Upper-Left / Angle 198°) ── */}
                <div
                  className="absolute"
                  style={{ top: "34.5%", left: "2.5%" }}
                >
                  <div className="testimonial-orbit-card-wrapper pointer-events-auto">
                    <div className="bg-white/95 backdrop-blur-md rounded-2xl border border-[#FF87B3]/60 p-2.5 sm:p-3 lg:p-3.5 shadow-[0_8px_24px_rgba(200,40,90,0.14)] text-[#14213D] w-[155px] sm:w-[195px] md:w-[215px] lg:w-[225px] transition-all hover:scale-105 hover:shadow-lg cursor-default">
                      <div className="flex gap-2 items-center mb-1 sm:mb-1.5">
                        <div className="w-6.5 h-6.5 sm:w-7 sm:h-7 rounded-full bg-[#FFF5F8] border border-[#FF87B3] flex items-center justify-center text-[9px] sm:text-[10px] font-extrabold text-[#D94D78] shadow-2xs shrink-0">
                          PR
                        </div>
                        <div className="min-w-0">
                          <div className="text-[9.5px] sm:text-[10.5px] font-extrabold text-[#14213D] leading-tight truncate">
                            Dr. Priya Raman
                          </div>
                          <div className="text-[7.5px] sm:text-[8.5px] text-slate-500 font-semibold">Maternity Care</div>
                        </div>
                        <div className="ml-auto flex text-amber-400 gap-0.5 shrink-0">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star key={i} className="w-2 sm:w-2.5 h-2 sm:h-2.5 fill-current" />
                          ))}
                        </div>
                      </div>
                      <p className="text-[8.5px] sm:text-[9.5px] text-slate-600 leading-relaxed italic font-medium">
                        "The maternity care was exceptional. The doctors made my delivery so calm and comforting."
                      </p>
                    </div>
                  </div>
                </div>

              </div>
            </motion.div>
          </div>

          {/* ── Testimonials Hero Stats Bar (4 Metrics) ── */}
          <div className="mt-8 sm:mt-10">
            <motion.div
              variants={fadeUpVariant}
              initial="hidden"
              animate="show"
              className="bg-white border border-[#FF87B3] rounded-2xl md:rounded-full shadow-md shadow-pink-200/30 px-3.5 py-3 sm:px-5 md:px-6 sm:py-3.5 w-full md:w-fit max-w-full mx-auto lg:mx-0"
            >
              <div className="grid grid-cols-2 md:flex md:flex-nowrap md:items-center md:divide-x divide-pink-100 gap-y-3 gap-x-2 md:gap-0">
                {[
                  { icon: Users, value: "1,000+", label: "Happy Patients" },
                  { icon: Star, value: "4.9/5", label: "Patient Rating" },
                  { icon: Heart, value: "95%+", label: "Patient Satisfaction" },
                  { icon: Clock, value: "24/7", label: "Caring Support" },
                ].map((stat, idx) => (
                  <div
                    key={idx}
                    className={`flex items-center gap-2 sm:gap-2.5 px-2 sm:px-3 md:px-5 ${
                      idx === 0 ? "md:pl-1" : ""
                    } ${idx === 3 ? "md:pr-1" : ""} group cursor-default`}
                  >
                    <div className="shrink-0 w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full bg-[#FFF5F8] border border-[#FF87B3] flex items-center justify-center text-[#D94D78] shadow-2xs group-hover:bg-[#FF87B3] group-hover:text-[#14213D] transition-colors duration-300">
                      <stat.icon className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-[#D94D78] group-hover:text-[#14213D] transition-colors duration-300" />
                    </div>
                    <div className="text-left min-w-0">
                      <div className="font-bold text-[#14213D] text-xs sm:text-sm md:text-base leading-tight whitespace-nowrap">
                        {stat.value}
                      </div>
                      <div className="text-[10px] sm:text-xs text-slate-500 font-medium whitespace-nowrap">
                        {stat.label}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 2. Ratings & Reviews Section ── */}
      <section className="bg-gradient-to-b from-white via-[#FFF5F8]/40 to-white pt-6 pb-8 md:pt-8 md:pb-12 border-b border-slate-100 relative overflow-hidden">
        <div className="container-page relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            className="text-center mb-6 md:mb-8"
          >
            <span className="inline-flex items-center rounded-full bg-[#FF87B3]/25 border border-[#FF87B3] px-3.5 py-1 text-xs font-bold tracking-widest text-[#D94D78] uppercase mb-3 shadow-2xs">
              Patient Reviews
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-[#14213D] font-display tracking-tight leading-tight mb-2">
              Trust, shared one story at a time.
            </h2>
            <div className="flex items-center justify-center gap-1.5 mt-2">
              <div className="w-12 h-1 bg-[#FF87B3] rounded-full" />
              <div className="w-1.5 h-1.5 bg-[#FF87B3] rounded-full" />
            </div>
          </motion.div>

          <div className="grid gap-8 lg:grid-cols-12 items-center">
            {/* Left Column: Rating breakdown card */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, type: "spring", stiffness: 60 }}
              className="lg:col-span-4 flex flex-col gap-4"
            >
              <div className="rounded-2xl sm:rounded-[32px] bg-gradient-to-br from-[#FFF5F8] via-[#FF87B3] to-[#f06a99] border border-[#FF87B3] p-5 sm:p-7 text-[#14213D] shadow-xl flex flex-col justify-between min-h-[280px] sm:min-h-[300px]">
                <div>
                  <div className="font-display text-5xl sm:text-6xl font-extrabold tracking-tight mb-2 text-[#14213D]">
                    4.6
                  </div>
                  <div className="flex gap-1 text-amber-500 mb-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1, duration: 0.3 }}
                      >
                        <Star className="h-5 w-5 fill-current" />
                      </motion.div>
                    ))}
                  </div>
                  <div className="text-xs text-[#14213D] font-bold">
                    Average rating from 92+ families
                  </div>
                </div>

                <div className="mt-6 sm:mt-8 space-y-3 sm:space-y-3.5">
                  {[
                    { stars: 5, pct: 68 },
                    { stars: 4, pct: 22 },
                    { stars: 3, pct: 6 },
                    { stars: 2, pct: 2 },
                    { stars: 1, pct: 2 },
                  ].map((b, idx) => (
                    <div
                      key={b.stars}
                      className="flex items-center gap-3 text-xs font-bold text-[#14213D]"
                    >
                      <span className="w-6 flex items-center gap-0.5">
                        {b.stars} <Star className="w-3 h-3 fill-current text-amber-500" />
                      </span>
                      <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-white/40">
                        <motion.div
                          className="h-full bg-[#14213D] rounded-full"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${b.pct}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8, delay: idx * 0.1, ease: "easeOut" }}
                        />
                      </div>
                      <span className="w-8 text-right font-extrabold">{b.pct}%</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Shared with permission badge */}
              <div className="inline-flex items-center gap-1.5 bg-[#FFF5F8] border border-[#FF87B3] px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs font-bold text-[#D94D78] w-max shadow-2xs">
                <Check className="w-3.5 h-3.5 text-[#D94D78]" strokeWidth={3.5} />
                Shared with permission
              </div>
            </motion.div>

            {/* Right Column: Modern Patient Reviews Continuous Auto-Scrolling Track */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: 0.1, type: "spring", stiffness: 60 }}
              className="lg:col-span-8 min-w-0 overflow-hidden"
            >
              <PatientReviewsAutoScroll />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 3. Share Your Story Section ── */}
      <section className="bg-gradient-to-tr from-[#FFF5F8] via-[#fffcfd] to-white pt-8 pb-10 md:pt-12 md:pb-14 border-t border-slate-100 overflow-hidden relative">
        <div className="container-page relative z-10">
          <div className="grid gap-8 md:grid-cols-[1fr_1.3fr] lg:grid-cols-12 items-start">
            {/* Left Content Column */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, type: "spring", stiffness: 60 }}
              className="lg:col-span-5 flex flex-col justify-start pt-2 md:pt-4"
            >
              <span className="inline-flex items-center rounded-full bg-[#FF87B3]/25 border border-[#FF87B3] px-3.5 py-1 text-xs font-bold tracking-widest text-[#D94D78] uppercase mb-4 w-max shadow-2xs">
                Share Your Story
              </span>

              <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-[#14213D] font-display tracking-tight leading-tight mb-3 sm:mb-4">
                Have a story to share?
              </h2>

              <p className="text-slate-600 text-xs sm:text-sm md:text-base leading-relaxed mb-4 max-w-sm font-medium">
                If Izone Hospital has been part of your family's journey, we would love to hear
                from you. Your story inspires hope in others.
              </p>

              <p className="text-slate-400 text-xs md:text-sm leading-relaxed mb-6 max-w-sm">
                We review every story and only share it with your explicit consent and privacy
                preferences.
              </p>

              <div className="w-12 h-1 bg-[#FF87B3] rounded-full" />
            </motion.div>

            {/* Right Column: High-Fidelity Form Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, type: "spring", stiffness: 60 }}
              className="lg:col-span-7 flex justify-center md:justify-end"
            >
              <div className="w-full max-w-[520px] bg-white border border-[#FF87B3] rounded-2xl sm:rounded-[32px] p-5 sm:p-6 md:p-8 shadow-xl relative overflow-hidden">
                {formSent ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-6 text-center py-10"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: [0, 1.2, 1] }}
                      transition={{ duration: 0.5, type: "spring", stiffness: 300, damping: 15 }}
                      className="w-16 h-16 rounded-full bg-[#FFF5F8] border border-[#FF87B3] text-[#D94D78] flex items-center justify-center mx-auto mb-5 shadow-sm"
                    >
                      <Check className="w-8 h-8 text-[#D94D78]" strokeWidth={2.5} />
                    </motion.div>
                    <h3 className="font-display text-2xl font-extrabold text-[#14213D] mb-2">
                      Thank you for sharing!
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed max-w-xs mx-auto mb-6 font-medium">
                      We have received your story. Our team will review it and get in touch with
                      you.
                    </p>
                    <button
                      onClick={() => setFormSent(false)}
                      className="text-xs font-bold text-[#D94D78] hover:underline cursor-pointer"
                    >
                      Submit another story
                    </button>
                  </motion.div>
                ) : (
                  <form
                    className="space-y-4 relative z-10"
                    onSubmit={(e) => {
                      e.preventDefault();
                      setFormSent(true);
                    }}
                  >
                    {/* Field 1: Name */}
                    <div className="space-y-1.5">
                      <label className="text-xs md:text-sm font-extrabold text-[#14213D] block">
                        Your name
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#D94D78]">
                          <User className="w-4 h-4" />
                        </div>
                        <input
                          type="text"
                          required
                          placeholder="Enter your name"
                          className="w-full bg-white border border-[#FF87B3]/30 rounded-xl py-3.5 pl-11 pr-4 text-xs md:text-sm text-slate-700 placeholder-slate-400 focus:outline-hidden focus:border-[#D94D78] focus:ring-2 focus:ring-[#FF87B3]/50 transition-all duration-200 font-medium"
                        />
                      </div>
                    </div>

                    {/* Field 2: Email or Phone */}
                    <div className="space-y-1.5">
                      <label className="text-xs md:text-sm font-extrabold text-[#14213D] block">
                        Email or phone
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#D94D78]">
                          <Mail className="w-4 h-4" />
                        </div>
                        <input
                          type="text"
                          required
                          placeholder="Enter your email or phone number"
                          className="w-full bg-white border border-[#FF87B3]/30 rounded-xl py-3.5 pl-11 pr-4 text-xs md:text-sm text-slate-700 placeholder-slate-400 focus:outline-hidden focus:border-[#D94D78] focus:ring-2 focus:ring-[#FF87B3]/50 transition-all duration-200 font-medium"
                        />
                      </div>
                    </div>

                    {/* Field 3: Department */}
                    <div className="space-y-1.5">
                      <label className="text-xs md:text-sm font-extrabold text-[#14213D] block">
                        Department
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#D94D78]">
                          <Building2 className="w-4 h-4" />
                        </div>
                        <select
                          required
                          className="w-full bg-white border border-[#FF87B3]/30 rounded-xl py-3.5 pl-11 pr-10 text-xs md:text-sm text-slate-600 focus:outline-hidden focus:border-[#D94D78] focus:ring-2 focus:ring-[#FF87B3]/50 transition-all duration-200 appearance-none font-medium cursor-pointer"
                          defaultValue=""
                        >
                          <option value="" disabled>
                            Select department
                          </option>
                          <option value="fertility">Fertility Care</option>
                          <option value="maternity">Maternity Care</option>
                          <option value="diagnostics">Diagnostics</option>
                          <option value="general">General Medicine</option>
                        </select>
                      </div>
                    </div>

                    {/* Field 4: Story Textarea */}
                    <div className="space-y-1.5">
                      <label className="text-xs md:text-sm font-extrabold text-[#14213D] block">
                        Tell us your story
                      </label>
                      <div className="relative">
                        <div className="absolute top-3.5 left-4 pointer-events-none text-[#D94D78]">
                          <Quote className="w-4 h-4" />
                        </div>
                        <textarea
                          required
                          placeholder="Share your experience with us..."
                          rows={4}
                          className="w-full bg-white border border-[#FF87B3]/30 rounded-xl pt-3.5 pb-8 pl-11 pr-4 text-xs md:text-sm text-slate-700 placeholder-slate-400 focus:outline-hidden focus:border-[#D94D78] focus:ring-2 focus:ring-[#FF87B3]/50 transition-all duration-200 resize-none font-medium leading-relaxed"
                        />
                        <div className="absolute bottom-2.5 right-4 text-[10px] text-slate-400 font-semibold">
                          0 / 1000
                        </div>
                      </div>
                    </div>

                    {/* Consent Checkbox */}
                    <div className="flex items-start gap-3 pt-1">
                      <input
                        type="checkbox"
                        id="consent"
                        required
                        className="w-4.5 h-4.5 border-slate-300 rounded-sm text-[#D94D78] focus:ring-[#FF87B3] mt-1 shrink-0 cursor-pointer"
                      />
                      <label
                        htmlFor="consent"
                        className="text-[11px] md:text-xs text-slate-500 font-medium leading-snug cursor-pointer select-none"
                      >
                        <strong className="text-[#14213D] font-extrabold block">
                          I'm happy for Izone Hospital to contact me
                        </strong>
                        We will only use your details to follow up about your story.
                      </label>
                    </div>

                    {/* Submit Button */}
                    <motion.button
                      whileHover={shouldReduceMotion ? undefined : { scale: 1.03, y: -1 }}
                      whileTap={{ scale: 0.97 }}
                      type="submit"
                      className="inline-flex items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-[#FF87B3] via-[#f06a99] to-[#D94D78] border border-[#FF87B3] text-[#14213D] hover:text-white px-8 py-3.5 font-extrabold text-base shadow-md hover:shadow-lg w-full transition-all mt-4 cursor-pointer"
                    >
                      <Send className="w-4 h-4" />
                      Submit story
                    </motion.button>
                  </form>
                )}

                {/* Bottom Verification Note */}
                <div className="flex items-center justify-center gap-2 mt-6 border-t border-pink-100 pt-5 text-[10px] md:text-[11px] text-slate-400 font-medium leading-none select-none">
                  <ShieldCheck className="w-4 h-4 text-[#D94D78]" />
                  <span>Stories are reviewed before publishing and shared with permission.</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
