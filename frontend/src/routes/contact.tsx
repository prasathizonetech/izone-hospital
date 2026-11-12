import { createFileRoute, Link } from "@tanstack/react-router";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  Sparkles,
  Check,
  User,
  Building2,
  Quote,
  ChevronRight,
  Heart,
  MessageSquare,
  Zap,
} from "lucide-react";
import { hospital } from "@/data/hospital";
import { departments } from "@/data/departments";
import contactHeroSupport from "@/assets/contact/contact-hero-support.webp";
import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion, type Variants } from "framer-motion";
import { HeroBackground } from "@/components/site/hero/HeroBackground";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us — Izone Hospital & Fertility Centre" },
      {
        name: "description",
        content:
          "Visit us at No. 5 Gandhi Road, Thillainagar, Trichy. Call +91 9988776655 or send an enquiry for appointments and fertility consultations.",
      },
      { property: "og:title", content: "Contact Us — Izone Hospital" },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: Contact,
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

// Two alternating headline phrase sets
const CONTACT_PHRASES = [
  [
    { text: "We are always a",  pink: false },
    { text: "phone call away",  pink: true  },
  ],
  [
    { text: "Your questions",    pink: false },
    { text: "our caring support", pink: true  },
  ],
] as const;

// Sub-component: rotating headline inside the contact hero left column
function ContactAnimatedHeadline() {
  const shouldReduceMotion = useReducedMotion();
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    if (shouldReduceMotion) return;
    const id = setInterval(() => {
      setPhase((p) => (p + 1) % CONTACT_PHRASES.length);
    }, 5000);
    return () => clearInterval(id);
  }, [shouldReduceMotion]);

  const lines = CONTACT_PHRASES[phase];

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
              key={`con-l1-${phase}`}
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
              key={`con-l2-${phase}`}
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

function Contact() {
  const [sent, setSent] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  return (
    <>
      {/* ── 1. Contact Hero Section ── */}
      <section className="relative bg-gradient-to-br from-[#FFF5F8] via-[#FF87B3] to-[#f06a99] text-[#14213D] overflow-hidden pt-4 pb-12 sm:pt-6 sm:pb-14 lg:pt-6 lg:pb-16 flex flex-col justify-center">
        {/* Shared Hero Background with animated glow orbs, organic curves & decor */}
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
              <linearGradient id="contactWaveStrokePink" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#FFAEC7" stopOpacity="0.8" />
                <stop offset="30%" stopColor="#FF85AA" stopOpacity="0.9" />
                <stop offset="70%" stopColor="#FFAEC7" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.6" />
              </linearGradient>

              {/* Subtle Depth Shadow */}
              <filter id="contactWaveDepthGlow" x="-5%" y="-40%" width="110%" height="180%">
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
              stroke="url(#contactWaveStrokePink)"
              strokeWidth="1.8"
              filter="url(#contactWaveDepthGlow)"
            />
          </svg>
        </div>

        <div className="container-page relative z-10 pt-0 pb-2 w-full">
          <div className="grid md:grid-cols-12 gap-8 lg:gap-10 items-center">
            {/* Left Column: Title & Subtitle (Unchanged text & layout) */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="show"
              className="md:col-span-6 lg:col-span-5 z-10 flex flex-col justify-center"
            >
              <motion.div
                variants={fadeUpVariant}
                whileHover={shouldReduceMotion ? undefined : { scale: 1.05, y: -2 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="inline-flex items-center gap-1.5 rounded-full bg-white/80 backdrop-blur-md border border-[#f06a99] px-4 py-1.5 text-xs font-extrabold tracking-widest text-[#D94D78] uppercase mb-3 w-max shadow-sm cursor-default"
              >
                <Phone className="w-3.5 h-3.5 text-[#D94D78]" />
                Contact Us
              </motion.div>

              {/* Rotating animated headline */}
              <ContactAnimatedHeadline />


              <motion.p
                variants={fadeUpVariant}
                className="text-slate-700 text-sm md:text-base leading-relaxed mb-5 max-w-md font-medium"
              >
                On Gandhi Road, in the heart of Thillainagar. We are here to assist with appointments,
                emergency care, and all your health inquiries.
              </motion.p>

              {/* Breadcrumbs */}
              <motion.nav
                variants={fadeUpVariant}
                className="flex items-center gap-2 text-xs text-slate-600 font-medium"
              >
                <Link to="/" className="hover:text-[#D94D78] transition-colors">
                  Home
                </Link>
                <ChevronRight className="w-3.5 h-3.5 opacity-60 text-slate-400" />
                <span className="font-bold text-[#D94D78] bg-white border border-[#FF87B3] px-2.5 py-0.5 rounded-md shadow-2xs">
                  Contact
                </span>
              </motion.nav>
            </motion.div>

            {/* Right Column: Large, Prominent & Attractive Patient Care Hero Visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="md:col-span-6 lg:col-span-7 relative flex items-center justify-center lg:justify-end select-none mt-6 md:mt-0 overflow-hidden sm:overflow-visible"
            >
              <div className="relative w-full max-w-[340px] sm:max-w-[540px] lg:max-w-[600px] xl:max-w-[640px] h-[300px] sm:h-[440px] md:h-[470px] lg:h-[500px] flex items-center justify-center lg:justify-end">
                
                {/* Ambient Glow Aura behind the frame */}
                <div
                  className="absolute -inset-2 sm:-inset-4 bg-gradient-to-tr from-[#FF87B3]/40 via-[#f06a99]/25 to-white/30 rounded-l-[300px] rounded-r-[60px] blur-2xl pointer-events-none -z-10"
                  aria-hidden="true"
                />

                {/* Decorative Connecting Arc SVG along the left contour */}
                <svg
                  className="absolute -left-6 sm:-left-10 md:-left-12 inset-y-0 w-[140px] sm:w-[170px] md:w-[190px] h-full pointer-events-none z-10 hidden sm:block"
                  viewBox="0 0 160 480"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M 140,30 C 50,70 15,180 20,260 C 25,340 70,410 130,450"
                    stroke="#FE84B0"
                    strokeWidth="2"
                    strokeDasharray="5 5"
                    strokeOpacity="0.85"
                  />
                  {/* Accent Beads along the curve */}
                  <circle cx="140" cy="30" r="4" fill="#E6396E" />
                  <circle cx="20" cy="180" r="3.5" fill="#E6396E" />
                  <circle cx="24" cy="340" r="3.5" fill="#E6396E" />
                  <circle cx="130" cy="450" r="4" fill="#E6396E" />
                </svg>

                {/* ── 3 Interactive Floating Contact Badges along the arch ── */}
                {/* 1. Phone Badge */}
                <motion.div
                  animate={shouldReduceMotion ? undefined : { y: [0, -6, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  whileHover={shouldReduceMotion ? undefined : { scale: 1.15 }}
                  className="absolute top-[8%] left-[2%] sm:left-[2%] md:left-[0%] z-30"
                >
                  <a
                    href={`tel:${hospital.mobile}`}
                    aria-label="Call Hospital"
                    className="group flex items-center gap-1.5 sm:gap-2 p-1.5 sm:p-2 pr-2.5 sm:pr-4 rounded-full bg-[#E6396E] text-white shadow-[0_10px_25px_rgba(230,57,110,0.38)] border-2 sm:border-[3px] border-white transition-all cursor-pointer hover:shadow-xl hover:shadow-pink-900/20"
                  >
                    <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-white/20 flex items-center justify-center">
                      <svg
                        viewBox="0 0 24 24"
                        className="w-4 h-4 sm:w-5 sm:h-5 fill-white text-white"
                        fill="currentColor"
                      >
                        <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.02-.24c1.12.37 2.33.57 3.57.57a1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.24.2 2.45.57 3.57a1 1 0 01-.25 1.02l-2.2 2.2z" />
                      </svg>
                    </div>
                    <span className="text-[10px] sm:text-xs font-extrabold text-white tracking-wide hidden md:inline">
                      Call Us
                    </span>
                  </a>
                </motion.div>

                {/* 2. Mail Badge */}
                <motion.div
                  animate={shouldReduceMotion ? undefined : { y: [0, 6, 0] }}
                  transition={{ duration: 4.6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                  whileHover={shouldReduceMotion ? undefined : { scale: 1.15 }}
                  className="absolute top-[46%] left-[0%] sm:-left-[5%] md:-left-[7%] z-30"
                >
                  <a
                    href={`mailto:${hospital.email}`}
                    aria-label="Email Hospital"
                    className="group flex items-center gap-1.5 sm:gap-2 p-1.5 sm:p-2 pr-2.5 sm:pr-4 rounded-full bg-white text-[#E6396E] shadow-[0_10px_25px_rgba(200,40,90,0.18)] border-2 sm:border-[3px] border-white transition-all cursor-pointer hover:border-[#FF87B3] hover:shadow-xl"
                  >
                    <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-[#FFF5F8] border border-[#FF87B3]/40 flex items-center justify-center">
                      <svg
                        viewBox="0 0 24 24"
                        className="w-4 h-4 sm:w-5 sm:h-5 stroke-[#E6396E] fill-none"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect width="20" height="16" x="2" y="4" rx="2" />
                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                      </svg>
                    </div>
                    <span className="text-[10px] sm:text-xs font-extrabold text-[#14213D] tracking-wide hidden md:inline">
                      Enquiry
                    </span>
                  </a>
                </motion.div>

                {/* 3. Location Pin Badge */}
                <motion.div
                  animate={shouldReduceMotion ? undefined : { y: [0, -5, 0] }}
                  transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  whileHover={shouldReduceMotion ? undefined : { scale: 1.15 }}
                  className="absolute bottom-[10%] left-[2%] sm:left-[0%] md:-left-[2%] z-30"
                >
                  <a
                    href="#contact-info"
                    aria-label="Hospital Location"
                    className="group flex items-center gap-1.5 sm:gap-2 p-1.5 sm:p-2 pr-2.5 sm:pr-4 rounded-full bg-white text-[#E6396E] shadow-[0_10px_25px_rgba(200,40,90,0.18)] border-2 sm:border-[3px] border-white transition-all cursor-pointer hover:border-[#FF87B3] hover:shadow-xl"
                  >
                    <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-[#FFF5F8] border border-[#FF87B3]/40 flex items-center justify-center">
                      <svg
                        viewBox="0 0 24 24"
                        className="w-4 h-4 sm:w-5 sm:h-5 fill-[#E6396E]"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M12 2C8.134 2 5 5.134 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.866-3.134-7-7-7zm0 9.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z"
                        />
                      </svg>
                    </div>
                    <span className="text-[10px] sm:text-xs font-extrabold text-[#14213D] tracking-wide hidden md:inline">
                      Thillainagar
                    </span>
                  </a>
                </motion.div>

                {/* ── Main Reception Support Photo in Grand Sweeping Curved Arch Frame ── */}
                <div className="relative z-20 w-[260px] sm:w-[400px] md:w-[460px] lg:w-[520px] xl:w-[560px] h-[270px] sm:h-[400px] md:h-[440px] lg:h-[470px] rounded-l-[140px] sm:rounded-l-[240px] md:rounded-l-[280px] lg:rounded-l-[320px] rounded-r-[28px] sm:rounded-r-[48px] border-[5px] sm:border-[8px] lg:border-[10px] border-white shadow-[0_24px_60px_rgba(200,40,90,0.24)] overflow-hidden group bg-slate-900">
                  <motion.img
                    src={contactHeroSupport}
                    alt="Izone Hospital friendly patient support and care coordination"
                    whileHover={shouldReduceMotion ? undefined : { scale: 1.05 }}
                    transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
                    className="w-full h-full object-cover object-[35%_center] sm:object-center transform-gpu select-none"
                    loading="eager"
                    fetchPriority="high"
                  />
                  {/* Subtle inner lighting gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-white/10 pointer-events-none" />
                </div>

                {/* ── Floating "We are here to help you" Acrylic Glass Card ── */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35, duration: 0.5 }}
                  whileHover={shouldReduceMotion ? undefined : { scale: 1.04, y: -2 }}
                  className="absolute -bottom-2 sm:-bottom-4 right-1 sm:right-6 md:right-4 z-30 bg-white/95 backdrop-blur-md rounded-2xl sm:rounded-3xl border border-[#FF87B3] px-3 py-2 sm:px-5 sm:py-3 shadow-[0_14px_36px_rgba(200,40,90,0.20)] text-[#14213D] flex items-center gap-2 sm:gap-3 cursor-default scale-[0.9] sm:scale-100"
                >
                  <div className="w-7 h-7 sm:w-10 sm:h-10 rounded-full bg-[#FFF5F8] border border-[#FF87B3] flex items-center justify-center text-[#D94D78] shrink-0 shadow-2xs">
                    <Heart className="w-3.5 h-3.5 sm:w-5 sm:h-5 fill-[#D94D78] text-[#D94D78] animate-pulse" />
                  </div>
                  <div>
                    <div className="text-[10px] sm:text-[13px] font-extrabold text-[#14213D] leading-tight">
                      We are here to help you
                    </div>
                    <div className="text-[8px] sm:text-[10px] text-[#D94D78] font-bold mt-0.5 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping inline-block" />
                      24/7 Patient Care &amp; Support
                    </div>
                  </div>
                </motion.div>

              </div>
            </motion.div>
          </div>

          {/* ── Contact Hero Stats Bar (4 Metrics) ── */}
          <div className="mt-8 sm:mt-10">
            <motion.div
              variants={fadeUpVariant}
              initial="hidden"
              animate="show"
              className="bg-white border border-[#FF87B3] rounded-2xl md:rounded-full shadow-md shadow-pink-200/30 px-3.5 py-3 sm:px-5 md:px-6 sm:py-3.5 w-full md:w-fit max-w-full mx-auto lg:mx-0"
            >
              <div className="grid grid-cols-2 md:flex md:flex-nowrap md:items-center md:divide-x divide-pink-100 gap-y-3 gap-x-2 md:gap-0">
                {[
                  { icon: Clock, value: "24/7", label: "Patient Support" },
                  { icon: MessageSquare, value: "10+", label: "Contact Channels" },
                  { icon: Zap, value: "Fast", label: "Response Time" },
                  { icon: Heart, value: "100%", label: "Dedicated Care" },
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

      {/* ── 2. Main Content Section ── */}
      <section id="contact-info" className="container-page pt-6 pb-6 md:pt-8 md:pb-8 overflow-hidden">
        <div className="grid gap-8 lg:gap-10 lg:grid-cols-2 items-start">
          {/* Left Column: Details Cards & Map */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="space-y-3.5 sm:space-y-4"
          >
            <motion.div variants={fadeUpVariant} className="mb-4 md:mb-5">
              <span className="inline-flex items-center rounded-full bg-[#FF87B3]/25 border border-[#FF87B3] px-3.5 py-1 text-xs font-bold tracking-widest text-[#D94D78] uppercase mb-3 w-max shadow-2xs">
                Contact Details
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#14213D] font-display tracking-tight leading-tight mb-2">
                We’re here to help
              </h2>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed max-w-md font-medium">
                Have a question or need assistance? Our team is ready to assist you with the best
                care and support.
              </p>
            </motion.div>

            {[
              {
                icon: MapPin,
                t: "Address",
                d: `No. 5, Gandhi Road, Thillainagar, Trichy - 620 006.`,
              },
              {
                icon: Phone,
                t: "Phone",
                d: hospital.phones.length > 0 ? `${hospital.phones.join("  ·  ")}  ·  ${hospital.mobile}` : hospital.mobile,
              },
              { icon: Mail, t: "Email", d: hospital.email },
              { icon: Clock, t: "Hours", d: hospital.hours },
            ].map((c) => (
              <motion.div
                key={c.t}
                variants={fadeUpVariant}
                whileHover={
                  shouldReduceMotion
                    ? undefined
                    : {
                        y: -4,
                        scale: 1.01,
                        boxShadow: "0 15px 35px -8px rgba(255,135,179,0.40)",
                      }
                }
                transition={{ type: "spring", stiffness: 280, damping: 20 }}
                className="flex items-center justify-between rounded-2xl sm:rounded-3xl border border-[#FF87B3] bg-white p-4 sm:p-5 shadow-xs hover:border-[#D94D78] transition-all duration-300 cursor-default group"
              >
                <div className="flex gap-3 sm:gap-4 items-center min-w-0 flex-1">
                  <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-[#FF87B3] bg-[#FFF5F8] flex items-center justify-center text-[#D94D78] shrink-0 group-hover:bg-[#FF87B3] group-hover:text-[#14213D] transition-colors duration-300 shadow-2xs">
                    <c.icon className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="font-display font-extrabold text-[#14213D] text-[14px] sm:text-[15px] md:text-base leading-snug group-hover:text-[#D94D78] transition-colors">
                      {c.t}
                    </div>
                    <div className="mt-0.5 sm:mt-1 text-xs md:text-sm text-slate-600 break-words leading-relaxed font-medium">
                      {c.d}
                    </div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-[#D94D78] shrink-0 ml-2 sm:ml-4 group-hover:translate-x-1 transition-transform" />
              </motion.div>
            ))}

            {/* Embedded Google Map */}
            <motion.div
              variants={fadeUpVariant}
              className="overflow-hidden rounded-2xl sm:rounded-3xl border border-[#FF87B3] shadow-md mt-6"
            >
              <iframe
                title="Map to Izone Hospital"
                src="https://www.google.com/maps?q=Gandhi+Road+Thillainagar+Tiruchirappalli&output=embed"
                className="h-56 sm:h-64 w-full border-0"
                loading="lazy"
              />
            </motion.div>
          </motion.div>

          {/* Right Column: Contact form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, type: "spring", stiffness: 60 }}
            className="flex justify-center lg:justify-end w-full"
          >
            <div className="w-full max-w-[550px] bg-white border border-[#FF87B3] rounded-2xl sm:rounded-[32px] p-5 sm:p-6 md:p-8 shadow-xl relative overflow-hidden">
              <span className="inline-flex items-center rounded-full bg-[#FF87B3]/25 border border-[#FF87B3] px-3.5 py-1 text-xs font-bold tracking-widest text-[#D94D78] uppercase mb-4 w-max shadow-2xs">
                Enquiry
              </span>

              <h2 className="text-2xl md:text-3xl font-extrabold text-[#14213D] font-display leading-tight mb-2">
                Send us a message
              </h2>

              <p className="text-slate-500 text-xs md:text-sm leading-relaxed mb-6 font-normal">
                Fill in the form below and our team will get back to you shortly.
              </p>

              {sent ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  className="rounded-2xl bg-[#FFF5F8] border border-[#FF87B3] p-8 text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: [0, 1.2, 1] }}
                    transition={{ duration: 0.5, type: "spring", stiffness: 300, damping: 15 }}
                    className="w-14 h-14 rounded-full bg-white border border-[#FF87B3] flex items-center justify-center text-[#D94D78] mx-auto mb-4 shadow-sm"
                  >
                    <Check className="h-7 w-7 text-[#D94D78]" strokeWidth={2.5} />
                  </motion.div>
                  <div className="font-display text-xl font-extrabold text-[#14213D] mb-2">
                    Thank you — we will call you back.
                  </div>
                  <div className="text-xs md:text-sm text-slate-600 font-medium mb-6">
                    For urgent matters please call{" "}
                    <a
                      href={`tel:${hospital.mobile}`}
                      className="font-bold text-[#D94D78] underline"
                    >
                      {hospital.mobile}
                    </a>
                    .
                  </div>
                  <button
                    onClick={() => setSent(false)}
                    className="text-xs font-bold text-[#D94D78] hover:underline cursor-pointer"
                  >
                    Send another enquiry
                  </button>
                </motion.div>
              ) : (
                <form
                  className="space-y-4 relative z-10"
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSent(true);
                  }}
                >
                  {/* Field 1: Name */}
                  <div className="space-y-1.5">
                    <label className="text-xs md:text-sm font-extrabold text-[#14213D] block">
                      Full name <span className="text-[#D94D78]">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#D94D78]">
                        <User className="w-4 h-4" />
                      </div>
                      <input
                        type="text"
                        required
                        placeholder="Enter your full name"
                        className="w-full bg-white border border-[#FF87B3]/30 rounded-xl py-3 pl-11 pr-4 text-xs md:text-sm text-slate-700 placeholder-slate-400 focus:outline-hidden focus:border-[#D94D78] focus:ring-2 focus:ring-[#FF87B3]/50 transition-all duration-200 font-medium"
                      />
                    </div>
                  </div>

                  {/* Field 2: Phone */}
                  <div className="space-y-1.5">
                    <label className="text-xs md:text-sm font-extrabold text-[#14213D] block">
                      Phone <span className="text-[#D94D78]">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#D94D78]">
                        <Phone className="w-4 h-4" />
                      </div>
                      <input
                        type="tel"
                        required
                        placeholder="Enter your phone number"
                        className="w-full bg-white border border-[#FF87B3]/30 rounded-xl py-3 pl-11 pr-4 text-xs md:text-sm text-slate-700 placeholder-slate-400 focus:outline-hidden focus:border-[#D94D78] focus:ring-2 focus:ring-[#FF87B3]/50 transition-all duration-200 font-medium"
                      />
                    </div>
                  </div>

                  {/* Field 3: Email */}
                  <div className="space-y-1.5">
                    <label className="text-xs md:text-sm font-extrabold text-[#14213D] block">
                      Email <span className="text-[#D94D78]">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#D94D78]">
                        <Mail className="w-4 h-4" />
                      </div>
                      <input
                        type="email"
                        required
                        placeholder="Enter your email address"
                        className="w-full bg-white border border-[#FF87B3]/30 rounded-xl py-3 pl-11 pr-4 text-xs md:text-sm text-slate-700 placeholder-slate-400 focus:outline-hidden focus:border-[#D94D78] focus:ring-2 focus:ring-[#FF87B3]/50 transition-all duration-200 font-medium"
                      />
                    </div>
                  </div>

                  {/* Field 4: Department */}
                  <div className="space-y-1.5">
                    <label className="text-xs md:text-sm font-extrabold text-[#14213D] block">
                      Department <span className="text-[#D94D78]">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#D94D78]">
                        <Building2 className="w-4 h-4" />
                      </div>
                      <select
                        required
                        className="w-full bg-white border border-[#FF87B3]/30 rounded-xl py-3 pl-11 pr-10 text-xs md:text-sm text-slate-600 focus:outline-hidden focus:border-[#D94D78] focus:ring-2 focus:ring-[#FF87B3]/50 transition-all duration-200 appearance-none font-medium cursor-pointer"
                        defaultValue=""
                      >
                        <option value="" disabled>
                          Select department
                        </option>
                        {departments.map((d) => (
                          <option key={d.id} value={d.id}>
                            {d.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Field 5: Message */}
                  <div className="space-y-1.5">
                    <label className="text-xs md:text-sm font-extrabold text-[#14213D] block">
                      Message <span className="text-[#D94D78]">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute top-3 left-4 pointer-events-none text-[#D94D78]">
                        <Quote className="w-4 h-4" />
                      </div>
                      <textarea
                        required
                        placeholder="How can we help you?"
                        rows={4}
                        className="w-full bg-white border border-[#FF87B3]/30 rounded-xl pt-3 pb-8 pl-11 pr-4 text-xs md:text-sm text-slate-700 placeholder-slate-400 focus:outline-hidden focus:border-[#D94D78] focus:ring-2 focus:ring-[#FF87B3]/50 transition-all duration-200 resize-none font-medium leading-relaxed"
                      />
                      <div className="absolute bottom-2.5 right-4 text-[10px] text-slate-400 font-semibold">
                        0 / 1000
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    whileHover={shouldReduceMotion ? undefined : { scale: 1.03, y: -1 }}
                    whileTap={{ scale: 0.97 }}
                    type="submit"
                    className="inline-flex items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-[#FF87B3] via-[#f06a99] to-[#D94D78] border border-[#FF87B3] text-[#14213D] hover:text-white px-8 py-3.5 font-extrabold text-base shadow-md hover:shadow-lg w-full transition-all mt-4 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    Send enquiry
                  </motion.button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
