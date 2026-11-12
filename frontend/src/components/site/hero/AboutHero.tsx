import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  Sparkles,
  ArrowRight,
  Users,
  Award,
  Heart,
  Clock,
  ChevronRight,
  Quote,
  Star,
} from "lucide-react";

// Image imports for hero rotating carousel
import heroImg1 from "@/assets/about/about-hero-1.webp";
import heroImg2 from "@/assets/about/about-hero-2.webp";
import heroImg3 from "@/assets/about/about-hero-3.webp";
import heroImg4 from "@/assets/about/about-hero-4.webp";

const HERO_IMAGES = [
  {
    src: heroImg1,
    alt: "Caring doctor and smiling mother with newborn baby at Izone Hospital",
    caption: "Maternity & Newborn Care",
  },
  {
    src: heroImg2,
    alt: "Happy parents holding newborn baby with doctor in hospital suite",
    caption: "Compassionate Family Care",
  },
  {
    src: heroImg3,
    alt: "Expert medical team of doctors at Izone Hospital & Fertility Centre",
    caption: "Experienced Clinical Specialists",
  },
  {
    src: heroImg4,
    alt: "Dedicated doctors and nursing staff at Izone Hospital corridor",
    caption: "24/7 Patient-Centric Support",
  },
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

const ABOUT_PHRASES = [
  [
    { text: "Compassionate care for",       pink: false },
    { text: "every stage of family life",   pink: true  },
  ],
  [
    { text: "Caring for your journey",      pink: false },
    { text: "every step of the way",        pink: true  },
  ],
] as const;

function AboutAnimatedHeadline() {
  const shouldReduceMotion = useReducedMotion();
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    if (shouldReduceMotion) return;
    const id = setInterval(() => {
      setPhase((p) => (p + 1) % ABOUT_PHRASES.length);
    }, 5000);
    return () => clearInterval(id);
  }, [shouldReduceMotion]);

  const lines = ABOUT_PHRASES[phase];

  return (
    <div className="mb-4 sm:mb-6 min-h-[80px] sm:min-h-[105px] lg:min-h-[135px]">
      <h1 className="font-display text-xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-[44px] font-extrabold leading-[1.2] tracking-tight text-[#14213D]">
        {/* Line 1 */}
        <span className="block min-h-[1.2em] overflow-hidden">
          <AnimatePresence mode="wait">
            <AnimatedLetters
              key={`abt-l1-${phase}`}
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
              key={`abt-l2-${phase}`}
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

const STATS = [
  {
    icon: Award,
    value: "28+",
    label: "Years of Experience",
  },
  {
    icon: Users,
    value: "5000+",
    label: "Happy Families",
  },
  {
    icon: Heart,
    value: "95%",
    label: "Success Rate",
  },
  {
    icon: Clock,
    value: "24×7",
    label: "Emergency Care",
  },
] as const;

// ─── Elegant Curve Frame: Top-Left Quote Badge ──────────────────────────────
function QuoteBadge() {
  return (
    <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center p-1 bg-white/95 backdrop-blur-md border-[2.5px] border-[#FF87B3] shadow-[0_8px_24px_rgba(255,135,179,0.40)] group">
      {/* Specular Highlight Ring */}
      <div className="absolute inset-1 rounded-full border border-white/60 pointer-events-none" />
      {/* Inner Pink Core */}
      <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-gradient-to-tr from-[#DE356A] via-[#FB5783] to-[#FF87B3] flex items-center justify-center text-white shadow-inner transform-gpu group-hover:scale-105 transition-transform duration-300">
        <Quote className="w-5 h-5 sm:w-6 sm:h-6 fill-white text-white rotate-180 drop-shadow-[0_2px_4px_rgba(0,0,0,0.2)]" />
      </div>
    </div>
  );
}

// ─── Elegant Curve Frame: Bottom-Right Star Badge ────────────────────────────
function StarBadge() {
  return (
    <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center p-1 bg-white/95 backdrop-blur-md border-[2.5px] border-[#FF87B3] shadow-[0_8px_24px_rgba(255,135,179,0.40)] group">
      {/* Specular Highlight Ring */}
      <div className="absolute inset-1 rounded-full border border-white/60 pointer-events-none" />
      {/* Inner Pink Core */}
      <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-gradient-to-tr from-[#DE356A] via-[#FB5783] to-[#FF87B3] flex items-center justify-center text-white shadow-inner transform-gpu group-hover:scale-105 transition-transform duration-300">
        <Star className="w-5 h-5 sm:w-6 sm:h-6 fill-white text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.2)]" />
      </div>
    </div>
  );
}

export function AboutHero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  // Automatic slideshow changing every 5.5 seconds
  useEffect(() => {
    const imageTimer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 5500);

    return () => clearInterval(imageTimer);
  }, []);

  // Preload all 4 images on mount to ensure instant, butter-smooth transitions
  useEffect(() => {
    HERO_IMAGES.forEach((img) => {
      const imageLoader = new Image();
      imageLoader.src = img.src;
    });
  }, []);

  return (
    <section className="relative bg-gradient-to-b from-[#FFF5F8] via-[#FFF9FB] to-white overflow-hidden pt-8 pb-14 md:pt-12 md:pb-20 border-b border-[#FFCCD9]/60">
      {/* ── Background Glows & Ambient Lights ── */}
      <div
        className="absolute -top-32 -right-32 w-[650px] h-[650px] rounded-full bg-gradient-to-br from-[#FF87B3]/35 via-[#f06a99]/15 to-transparent blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute top-1/3 -left-32 w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-[#FFF5F8] via-[#FF87B3]/20 to-transparent blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      {/* ── Perspective Floor Grid Mesh (Right Side depth) ── */}
      <div
        className="absolute -bottom-10 right-0 w-[55%] h-[60%] pointer-events-none opacity-45 hidden lg:block overflow-hidden"
        style={{
          maskImage: "radial-gradient(ellipse at 70% 60%, black 20%, transparent 80%)",
          WebkitMaskImage: "radial-gradient(ellipse at 70% 60%, black 20%, transparent 80%)",
        }}
        aria-hidden="true"
      >
        <div
          className="w-full h-full hero-mesh-floor"
          style={{
            transform: "perspective(600px) rotateX(60deg) scale(1.4)",
            transformOrigin: "bottom center",
          }}
        />
      </div>

      <div className="container-page relative z-10">
        {/* Main Grid: Left Content & Right 3D Glass Stack */}
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* ═════════════════════════════════════════════════════════════════ */}
          {/* ── LEFT COLUMN: Text, Badge, CTA & Breadcrumbs (6 cols) ──────── */}
          {/* ═════════════════════════════════════════════════════════════════ */}
          <div className="lg:col-span-6 xl:col-span-6 flex flex-col justify-center">
            {/* Eyebrow Pill Tag */}
            <motion.div
              initial={{ opacity: 0, y: -14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="inline-flex items-center gap-2 rounded-full bg-[#FFEBF2] border border-[#FF87B3] px-3.5 py-1.5 text-[11px] font-bold tracking-wider text-[#D94D78] uppercase mb-4 w-fit shadow-xs"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#D94D78]" />
              <span>ABOUT IZONE HOSPITAL</span>
            </motion.div>

            {/* ── Animated Headline matching HomeHero ── */}
            <AboutAnimatedHeadline />

            {/* Pink Accent Line */}

            {/* Paragraph Description */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-lg mb-8 font-normal"
            >
              At Izone Hospital &amp; Fertility Centre, Thillainagar, we are dedicated to delivering
              trusted, personalized healthcare for women and families. From fertility care to
              maternity and beyond, we are here to support you at every step of your journey.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
              className="flex flex-wrap items-center gap-3.5 mb-6"
            >
              {/* Primary Contact Us Button */}
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#E94E77] via-[#DE356A] to-[#D92F60] text-white px-7 py-3.5 text-sm font-bold shadow-lg shadow-pink-500/25 hover:shadow-pink-500/40 hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 cursor-pointer"
              >
                <span>Contact Us</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>

              {/* Secondary Our Services Button */}
              <Link
                to="/departments"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white border border-[#FFCCD9] text-[#14213D] px-6 py-3.5 text-sm font-bold shadow-xs hover:bg-[#FFF5F8] hover:border-[#FF87B3] hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 cursor-pointer"
              >
                <Users className="w-4.5 h-4.5 text-[#DE356A]" />
                <span>Our Services</span>
              </Link>
            </motion.div>

            {/* Breadcrumbs */}
            <motion.nav
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              aria-label="Breadcrumb"
              className="flex items-center gap-2 text-xs text-slate-400 font-medium"
            >
              <Link to="/" className="hover:text-[#DE356A] transition-colors">
                Home
              </Link>
              <ChevronRight className="w-3 h-3 text-slate-300" />
              <span className="font-semibold text-[#DE356A]">About Us</span>
            </motion.nav>
          </div>

          {/* ═════════════════════════════════════════════════════════════════ */}
          {/* ── RIGHT COLUMN: Elegant Curve Frame Hero Carousel (6 cols) ──── */}
          {/* ═════════════════════════════════════════════════════════════════ */}
          <div className="lg:col-span-6 xl:col-span-6 relative flex flex-col items-center justify-center lg:items-end py-6 lg:py-4">
            <div className="relative w-full max-w-[530px] xl:max-w-[570px]">
              
              {/* Corner Dot Grid Particle Accents in Signature Pink */}
              {/* Top-Right Dots */}
              <div className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 w-12 h-12 pointer-events-none opacity-75 z-0 select-none">
                <div className="grid grid-cols-4 gap-1.5">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <div key={i} className="w-1 h-1 rounded-full bg-[#FF87B3]" />
                  ))}
                </div>
              </div>

              {/* Bottom-Left Dots */}
              <div className="absolute -bottom-3 -left-3 sm:-bottom-4 sm:-left-4 w-12 h-12 pointer-events-none opacity-75 z-0 select-none">
                <div className="grid grid-cols-4 gap-1.5">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <div key={i} className="w-1 h-1 rounded-full bg-[#FF87B3]" />
                  ))}
                </div>
              </div>

              {/* ── Outer Elegant Curve Frame Container in #FF87B3 ── */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-full rounded-[34px] sm:rounded-[46px] p-3 sm:p-4.5 bg-gradient-to-br from-[#FFF5F8] via-white to-[#FFEBF2] border-[3.5px] border-[#FF87B3] shadow-[0_20px_60px_rgba(255,135,179,0.30)]"
              >
                {/* Inner Sculpted Bevel Frame for Image */}
                <div className="relative w-full aspect-[16/11] sm:aspect-[16/10.5] rounded-[26px] sm:rounded-[36px] overflow-hidden bg-[#FFF5F8] shadow-inner border border-[#FFCCD9]">
                  <AnimatePresence initial={false}>
                    {HERO_IMAGES.map((item, index) => {
                      if (index !== currentIndex) return null;
                      return (
                        <motion.div
                          key={item.src}
                          initial={{ opacity: 0 }}
                          animate={{
                            opacity: 1,
                            transition: { duration: 1.2, ease: "easeInOut" },
                          }}
                          exit={{
                            opacity: 0,
                            transition: { duration: 1.2, ease: "easeInOut" },
                          }}
                          className="absolute inset-0 w-full h-full"
                        >
                          {/* Ken Burns Subtle Zoom Animation */}
                          <motion.img
                            src={item.src}
                            alt={item.alt}
                            loading={index === 0 ? "eager" : "lazy"}
                            fetchPriority={index === 0 ? "high" : "low"}
                            decoding="async"
                            initial={{ scale: 1.0 }}
                            animate={{
                              scale: shouldReduceMotion ? 1.0 : 1.07,
                              transition: {
                                duration: 6,
                                ease: "linear",
                              },
                            }}
                            className="w-full h-full object-cover object-center transform-gpu"
                          />

                          {/* Subtle gradient vignette at bottom for contrast */}
                          <div className="absolute inset-0 bg-gradient-to-t from-[#14213D]/20 via-transparent to-transparent pointer-events-none" />
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </div>

                {/* ── Top-Left Floating Quote Badge ── */}
                <motion.div
                  animate={
                    shouldReduceMotion
                      ? undefined
                      : {
                          y: [0, -6, 0],
                          rotate: [0, 2, -1, 0],
                        }
                  }
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute -top-3 -left-3 sm:-top-5 sm:-left-5 z-30 pointer-events-auto cursor-default"
                >
                  <QuoteBadge />
                </motion.div>

                {/* ── Bottom-Right Floating Star Badge ── */}
                <motion.div
                  animate={
                    shouldReduceMotion
                      ? undefined
                      : {
                          y: [0, 6, 0],
                          rotate: [0, -2, 2, 0],
                        }
                  }
                  transition={{
                    duration: 5.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5,
                  }}
                  className="absolute -bottom-3 -right-3 sm:-bottom-5 sm:-right-5 z-30 pointer-events-auto cursor-default"
                >
                  <StarBadge />
                </motion.div>
              </motion.div>

              {/* ── Carousel Pagination Dots Centered Under Frame ── */}
              <div className="mt-4 flex items-center justify-center gap-2">
                {HERO_IMAGES.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    aria-label={`Go to slide ${idx + 1}`}
                    className={`rounded-full transition-all duration-300 cursor-pointer ${
                      idx === currentIndex
                        ? "w-6 h-2 bg-[#DE356A] shadow-xs shadow-pink-500/40"
                        : "w-2 h-2 bg-[#FFCCD9] hover:bg-[#FF87B3]"
                    }`}
                  />
                ))}
              </div>

            </div>
          </div>
        </div>

        {/* ═════════════════════════════════════════════════════════════════ */}
        {/* ── BOTTOM STATS BAR: 4 Metrics Compact Pill Card ────────────── */}
        {/* ═════════════════════════════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35, ease: "easeOut" }}
          className="mt-8 sm:mt-10 bg-white border border-[#FF87B3] rounded-2xl md:rounded-full shadow-md shadow-pink-200/30 px-3.5 py-3 sm:px-5 md:px-6 sm:py-3.5 w-full md:w-fit max-w-full mx-auto lg:mx-0"
        >
          <div className="grid grid-cols-2 md:flex md:flex-nowrap md:items-center md:divide-x divide-pink-100 gap-y-3 gap-x-2 md:gap-0">
            {STATS.map(({ icon: Icon, value, label }, index) => (
              <div
                key={label}
                className={`flex items-center gap-2 sm:gap-2.5 px-2 sm:px-3 md:px-5 ${
                  index === 0 ? "md:pl-1" : ""
                } ${index === STATS.length - 1 ? "md:pr-1" : ""} group cursor-default`}
              >
                {/* Soft Pink Icon Circle Badge */}
                <div className="shrink-0 w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full bg-[#FFF5F8] border border-[#FF87B3] flex items-center justify-center text-[#D94D78] shadow-2xs group-hover:bg-[#FF87B3] group-hover:text-[#14213D] transition-colors duration-300">
                  <Icon className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-[#D94D78] group-hover:text-[#14213D] transition-colors duration-300" />
                </div>
                {/* Value and Label */}
                <div className="text-left min-w-0">
                  <div className="font-bold text-[#14213D] text-xs sm:text-sm md:text-base leading-tight whitespace-nowrap">
                    {value}
                  </div>
                  <div className="text-[10px] sm:text-xs text-slate-500 font-medium whitespace-nowrap">
                    {label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
export default AboutHero;
