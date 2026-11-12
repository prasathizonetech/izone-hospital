import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Sparkles,
  ArrowRight,
  Maximize2,
  Play,
  Heart,
  Users,
  Shield,
  Star,
  Clock,
  Building,
  Bed,
  TestTube,
  Baby,
  Waves,
  HeartPulse,
  HeartHandshake,
  FlaskConical,
  ChevronRight,
} from "lucide-react";
import exterior from "@/assets/hospital-exterior.webp";
import reception from "@/assets/reception.jpg";
import delivery from "@/assets/delivery-room.jpg";
import lab from "@/assets/lab.jpg";
import fertility from "@/assets/fertility-lab.jpg";
import family from "@/assets/family-care.webp";
import hero from "@/assets/hero-maternity.jpg";
import ultrasound from "@/assets/hero-doctor-mother.webp";
import general from "@/assets/departments/general-medicine.webp";
import galleryReception from "@/assets/gallery/gallery-reception.webp";
import galleryFertilityLab from "@/assets/gallery/gallery-fertility-lab.webp";
import galleryUltrasound from "@/assets/gallery/gallery-ultrasound.webp";
import galleryConsultation from "@/assets/gallery/gallery-consultation.webp";
import galleryDiagnostics from "@/assets/gallery/gallery-diagnostics.webp";
import galleryCare from "@/assets/gallery/gallery-care.webp";
import galleryMoments from "@/assets/gallery/gallery-moments.webp";
import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion, type Variants } from "framer-motion";
import { GalleryLightbox, type LightboxImage } from "@/components/site/GalleryLightbox";
import { MagneticButton } from "@/components/site/MagneticButton";
import { HeroBackground } from "@/components/site/hero/HeroBackground";
import { GalleryHeroCarousel } from "@/components/site/hero/GalleryHeroCarousel";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — Izone Hospital" },
      {
        name: "description",
        content:
          "Photos and video tour of our hospital building, labour suites, fertility lab, ultrasound and patient rooms in Thillainagar.",
      },
      { property: "og:title", content: "Gallery — Izone Hospital" },
      { property: "og:url", content: "/gallery" },
    ],
    links: [{ rel: "canonical", href: "/gallery" }],
  }),
  component: Gallery,
});

// ─── Animation Variants ─────────────────────────────────────────────────────
const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
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
const GALLERY_PHRASES = [
  {
    line1: { text: "A hospital designed", pink: false },
    line2: { text: "around your comfort", pink: true  },
  },
  {
    line1: { text: "Moments of care",      pink: false },
    line2: { text: "captured for you",     pink: true  },
  },
] as const;

// Sub-component: rotating headline inside the gallery hero left column
function GalleryAnimatedHeadline() {
  const shouldReduceMotion = useReducedMotion();
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    if (shouldReduceMotion) return;
    const id = setInterval(() => {
      setPhase((p) => (p + 1) % GALLERY_PHRASES.length);
    }, 5000);
    return () => clearInterval(id);
  }, [shouldReduceMotion]);

  const current = GALLERY_PHRASES[phase];

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
              key={`gal-l1-${phase}`}
              text={current.line1.text}
              className={current.line1.pink ? "text-[#D94D78] drop-shadow-[0_0_15px_rgba(255,135,179,0.6)]" : "text-[#14213D]"}
              delay={0}
            />
          </AnimatePresence>
        </span>

        {/* Line 2 */}
        <span className="block min-h-[1.2em] overflow-hidden">
          <AnimatePresence mode="wait">
            <AnimatedLetters
              key={`gal-l2-${phase}`}
              text={current.line2.text}
              className={current.line2.pink ? "text-[#D94D78] drop-shadow-[0_0_15px_rgba(255,135,179,0.6)]" : "text-[#14213D]"}
              delay={0.3}
            />
          </AnimatePresence>
        </span>
      </h1>
    </motion.div>
  );
}

const scaleInVariant: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 65, damping: 18 },
  },
};

const galleryItems = [
  {
    img: exterior,
    tag: "Hospital",
    title: "Hospital Building Exterior Dusk Facade",
    icon: Building,
    objectPosition: "object-center",
  },
  {
    img: galleryReception,
    tag: "Reception",
    title: "Comfortable OPD Reception & Patient Waiting Lounge",
    icon: Users,
    objectPosition: "object-[center_35%]",
  },
  {
    img: delivery,
    tag: "Maternity",
    title: "Safe & Modern Labour Suite for Childbirth",
    icon: Baby,
    objectPosition: "object-center",
  },
  {
    img: galleryDiagnostics,
    tag: "Diagnostics",
    title: "In-house Clinical Laboratory & Diagnostic Support",
    icon: FlaskConical,
    objectPosition: "object-[center_35%]",
  },
  {
    img: galleryFertilityLab,
    tag: "Fertility",
    title: "Advanced Assisted Reproductive IVF & Embryology Unit",
    icon: TestTube,
    objectPosition: "object-[center_30%]",
  },
  {
    img: galleryUltrasound,
    tag: "Ultrasound",
    title: "High-Resolution 3D/4D Foetal Ultrasound Suite",
    icon: Waves,
    objectPosition: "object-[center_30%]",
  },
  {
    img: galleryConsultation,
    tag: "Consulting",
    title: "Spacious General Medicine Consultation Cabin",
    icon: HeartPulse,
    objectPosition: "object-[center_20%]",
  },
  {
    img: galleryMoments,
    tag: "Care",
    title: "Dedicated Maternity & Nursing Care Team",
    icon: HeartHandshake,
    objectPosition: "object-[center_25%]",
  },
  {
    img: galleryCare,
    tag: "Moments",
    title: "Moments of Joy & Healthy New Beginnings",
    icon: Heart,
    objectPosition: "object-[center_25%]",
  },
];

function Gallery() {
  const [selectedImage, setSelectedImage] = useState<LightboxImage | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <GalleryLightbox image={selectedImage} onClose={() => setSelectedImage(null)} />

      {/* ── 1. Gallery Page Hero ── */}
      <section className="relative bg-gradient-to-br from-[#FFF5F8] via-[#FF87B3] to-[#f06a99] text-[#14213D] overflow-hidden pt-4 pb-12 sm:pt-6 sm:pb-14 lg:pt-8 lg:pb-16 flex flex-col justify-between">
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
              <linearGradient id="galleryWaveStrokePink" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#FFAEC7" stopOpacity="0.8" />
                <stop offset="30%" stopColor="#FF85AA" stopOpacity="0.9" />
                <stop offset="70%" stopColor="#FFAEC7" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.6" />
              </linearGradient>

              {/* Subtle Depth Shadow */}
              <filter id="galleryWaveDepthGlow" x="-5%" y="-40%" width="110%" height="180%">
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
              stroke="url(#galleryWaveStrokePink)"
              strokeWidth="1.8"
              filter="url(#galleryWaveDepthGlow)"
            />
          </svg>
        </div>

        <div className="container-page relative z-10 pt-1 md:pt-2 pb-4">
          <div className="grid md:grid-cols-12 gap-8 lg:gap-10 items-center">
            {/* Left Column: Title, Subtitle, Buttons (7 cols) */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="show"
              className="md:col-span-6 lg:col-span-6 max-w-xl flex flex-col justify-center"
            >
              <motion.div
                variants={fadeUpVariant}
                whileHover={shouldReduceMotion ? undefined : { scale: 1.04, y: -1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="inline-flex items-center gap-1.5 rounded-full bg-white/85 backdrop-blur-md border border-[#f06a99] px-4 py-1.5 text-xs font-extrabold tracking-widest text-[#D94D78] uppercase mb-3 w-max shadow-xs cursor-default"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#D94D78]" />
                Gallery
              </motion.div>

              {/* Rotating animated headline */}
              <GalleryAnimatedHeadline />


              <motion.p
                variants={fadeUpVariant}
                className="text-slate-700 text-xs sm:text-sm md:text-base leading-relaxed mb-5 max-w-md font-medium"
              >
                Warm interiors, modern equipment and the everyday moments of care that make Izone Hospital
                special. Click any image to view in full resolution.
              </motion.p>

              {/* Action Buttons */}
              <motion.div
                variants={fadeUpVariant}
                className="flex flex-wrap items-center gap-3.5 mb-5"
              >
                <MagneticButton>
                  <button
                    onClick={() => scrollToSection("facility-moments")}
                    className="inline-flex items-center gap-2.5 bg-[#14213D] hover:bg-[#1a2b49] border border-[#14213D] text-white pl-5 pr-2 py-2 rounded-full font-extrabold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all cursor-pointer"
                  >
                    Explore Gallery
                    <div className="w-6 h-6 rounded-full bg-white text-[#14213D] flex items-center justify-center shadow-xs">
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </button>
                </MagneticButton>

                <MagneticButton>
                  <button
                    onClick={() => scrollToSection("video-tour")}
                    className="inline-flex items-center gap-2 text-[#14213D] font-bold text-xs sm:text-sm hover:text-[#D94D78] transition-colors cursor-pointer"
                  >
                    <div className="w-8 h-8 rounded-full border border-[#FF87B3] bg-white/85 backdrop-blur-xs flex items-center justify-center shadow-2xs text-[#D94D78]">
                      <Play className="w-3 h-3 fill-current ml-0.5" />
                    </div>
                    <span>Watch Video Tour</span>
                  </button>
                </MagneticButton>
              </motion.div>

              {/* Desktop Only: Horizontal Stats/Trust card (>= md) */}
              <motion.div
                variants={fadeUpVariant}
                className="hidden md:block bg-white border border-[#FF87B3] rounded-full shadow-md shadow-pink-200/30 px-3.5 py-3 sm:px-6 sm:py-3.5 w-fit max-w-full mx-auto lg:mx-0"
              >
                <div className="flex flex-nowrap items-center divide-x divide-pink-100 gap-0">
                  <div className="flex items-center gap-2 sm:gap-2.5 px-2 sm:px-3.5 md:px-5 sm:pl-1 group cursor-default">
                    <div className="shrink-0 w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full bg-[#FFF5F8] border border-[#FF87B3] flex items-center justify-center text-[#D94D78] shadow-2xs group-hover:bg-[#FF87B3] group-hover:text-[#14213D] transition-colors duration-300">
                      <Shield className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-[#D94D78] group-hover:text-[#14213D] transition-colors duration-300" />
                    </div>
                    <div className="text-left min-w-0">
                      <div className="font-bold text-[#14213D] text-xs sm:text-sm md:text-base leading-tight whitespace-nowrap">
                        Trusted Care
                      </div>
                      <div className="text-[10px] sm:text-xs text-slate-500 font-medium whitespace-nowrap">
                        Since 1998
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 sm:gap-2.5 px-2 sm:px-3.5 md:px-5 group cursor-default">
                    <div className="shrink-0 w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full bg-[#FFF5F8] border border-[#FF87B3] flex items-center justify-center text-[#D94D78] shadow-2xs group-hover:bg-[#FF87B3] group-hover:text-[#14213D] transition-colors duration-300">
                      <Users className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-[#D94D78] group-hover:text-[#14213D] transition-colors duration-300" />
                    </div>
                    <div className="text-left min-w-0">
                      <div className="font-bold text-[#14213D] text-xs sm:text-sm md:text-base leading-tight whitespace-nowrap">
                        Expert
                      </div>
                      <div className="text-[10px] sm:text-xs text-slate-500 font-medium whitespace-nowrap">
                        Specialists
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 sm:gap-2.5 px-2 sm:px-3.5 md:px-5 sm:pr-1 group cursor-default">
                    <div className="shrink-0 w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full bg-[#FFF5F8] border border-[#FF87B3] flex items-center justify-center text-[#D94D78] shadow-2xs group-hover:bg-[#FF87B3] group-hover:text-[#14213D] transition-colors duration-300">
                      <Heart className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-[#D94D78] group-hover:text-[#14213D] transition-colors duration-300" />
                    </div>
                    <div className="text-left min-w-0">
                      <div className="font-bold text-[#14213D] text-xs sm:text-sm md:text-base leading-tight whitespace-nowrap">
                        Patient First
                      </div>
                      <div className="text-[10px] sm:text-xs text-slate-500 font-medium whitespace-nowrap">
                        Always
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Breadcrumbs */}
              <motion.nav
                variants={fadeUpVariant}
                className="flex items-center gap-2 text-xs text-slate-600 font-medium mt-4"
              >
                <Link to="/" className="hover:text-[#D94D78] transition-colors">
                  Home
                </Link>
                <ChevronRight className="w-3.5 h-3.5 opacity-60 text-slate-400" />
                <span className="font-bold text-[#D94D78] bg-white border border-[#FF87B3] px-2.5 py-0.5 rounded-md shadow-2xs">
                  Gallery
                </span>
              </motion.nav>
            </motion.div>

            {/* Right Column / Mobile In-Flow: 3D Layered Carousel System (Appears above stats on mobile) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="md:col-span-6 lg:col-span-6 relative w-full flex items-center justify-center select-none mt-4 md:mt-0"
            >
              <GalleryHeroCarousel onSelectImage={(img) => setSelectedImage(img)} />
            </motion.div>
          </div>

          {/* Mobile Only: Stats Box Positioned BELOW the Image Carousel (< md) */}
          <motion.div
            variants={fadeUpVariant}
            initial="hidden"
            animate="show"
            className="md:hidden relative z-20 mt-6 w-full max-w-sm mx-auto"
          >
            <div className="bg-white border border-[#FF87B3] rounded-2xl shadow-md shadow-pink-200/30 p-3.5 w-full">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-y-3.5 gap-x-2.5">
                <div className="flex items-center gap-2.5 px-1 group cursor-default min-w-0">
                  <div className="shrink-0 w-8 h-8 rounded-full bg-[#FFF5F8] border border-[#FF87B3] flex items-center justify-center text-[#D94D78] shadow-2xs group-hover:bg-[#FF87B3] group-hover:text-[#14213D] transition-colors duration-300">
                    <Shield className="w-4 h-4 text-[#D94D78] group-hover:text-[#14213D] transition-colors duration-300" />
                  </div>
                  <div className="text-left min-w-0 flex-1">
                    <div className="font-extrabold text-[#14213D] text-xs sm:text-sm leading-tight whitespace-nowrap">
                      Trusted Care
                    </div>
                    <div className="text-[10px] sm:text-xs text-slate-500 font-medium whitespace-nowrap truncate">
                      Since 1998
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 px-1 group cursor-default min-w-0">
                  <div className="shrink-0 w-8 h-8 rounded-full bg-[#FFF5F8] border border-[#FF87B3] flex items-center justify-center text-[#D94D78] shadow-2xs group-hover:bg-[#FF87B3] group-hover:text-[#14213D] transition-colors duration-300">
                    <Users className="w-4 h-4 text-[#D94D78] group-hover:text-[#14213D] transition-colors duration-300" />
                  </div>
                  <div className="text-left min-w-0 flex-1">
                    <div className="font-extrabold text-[#14213D] text-xs sm:text-sm leading-tight whitespace-nowrap">
                      Expert
                    </div>
                    <div className="text-[10px] sm:text-xs text-slate-500 font-medium whitespace-nowrap truncate">
                      Specialists
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 px-1 group cursor-default min-w-0">
                  <div className="shrink-0 w-8 h-8 rounded-full bg-[#FFF5F8] border border-[#FF87B3] flex items-center justify-center text-[#D94D78] shadow-2xs group-hover:bg-[#FF87B3] group-hover:text-[#14213D] transition-colors duration-300">
                    <Heart className="w-4 h-4 text-[#D94D78] group-hover:text-[#14213D] transition-colors duration-300" />
                  </div>
                  <div className="text-left min-w-0 flex-1">
                    <div className="font-extrabold text-[#14213D] text-xs sm:text-sm leading-tight whitespace-nowrap">
                      Patient First
                    </div>
                    <div className="text-[10px] sm:text-xs text-slate-500 font-medium whitespace-nowrap truncate">
                      Always
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── 2. Facility & Moments Section ── */}
      <section
        id="facility-moments"
        className="bg-gradient-to-b from-white via-[#FFF5F8]/40 to-white pt-6 pb-6 md:pt-8 md:pb-8 border-b border-slate-100 relative overflow-hidden"
      >
        <div className="container-page relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8 md:mb-10"
          >
            <span className="inline-flex items-center rounded-full bg-[#FF87B3]/25 border border-[#FF87B3] px-3.5 py-1 text-xs font-bold tracking-widest text-[#D94D78] uppercase mb-4 shadow-2xs">
              Facility &amp; Moments
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-[#14213D] font-display tracking-tight leading-tight mb-3">
              Inside Izone Hospital.
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm md:text-base leading-relaxed max-w-2xl mx-auto font-medium">
              A closer look at the spaces, people and everyday moments behind our care. Click any
              photo for a full view.
            </p>
            <div className="flex items-center justify-center gap-1.5 mt-3">
              <div className="w-12 h-1 bg-[#FF87B3] rounded-full" />
              <div className="w-1.5 h-1.5 bg-[#FF87B3] rounded-full" />
            </div>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {galleryItems.map((c, idx) => (
              <motion.div
                key={idx}
                variants={scaleInVariant}
                onClick={() => setSelectedImage({ src: c.img, title: c.title, tag: c.tag })}
                whileHover={
                  shouldReduceMotion
                    ? undefined
                    : {
                        y: -6,
                        scale: 1.015,
                        boxShadow: "0 20px 45px -10px rgba(255,135,179,0.40)",
                      }
                }
                transition={{ type: "spring", stiffness: 280, damping: 20 }}
                className="group relative overflow-hidden rounded-2xl sm:rounded-3xl border border-[#FF87B3] bg-white aspect-[4/3] shadow-xs hover:border-[#D94D78] transition-all duration-300 cursor-pointer"
              >
                <motion.img
                  src={c.img}
                  alt={c.title}
                  whileHover={shouldReduceMotion ? undefined : { scale: 1.05 }}
                  transition={{ duration: 0.65, ease: "easeOut" }}
                  className={`w-full h-full object-cover transform-gpu ${c.objectPosition || "object-center"}`}
                  loading="lazy"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                  <div className="p-3 rounded-full bg-white/90 text-[#14213D] shadow-lg transform scale-90 group-hover:scale-100 transition-transform">
                    <Maximize2 className="w-5 h-5" />
                  </div>
                </div>

                <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 bg-white/95 backdrop-blur-md border border-[#FF87B3] px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full shadow-md z-10 flex items-center gap-2 group-hover:bg-white transition-colors">
                  <c.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#D94D78]" />
                  <span className="text-[11px] sm:text-xs font-extrabold text-[#14213D] tracking-wide">
                    {c.tag}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── 3. Video Tour Section ── */}
      <section
        id="video-tour"
        className="bg-gradient-to-tr from-[#FFF5F8] via-[#fffcfd] to-white pt-6 pb-6 md:pt-8 md:pb-8 border-t border-slate-100 overflow-hidden relative"
      >
        <div className="container-page relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8 md:mb-10"
          >
            <span className="inline-flex items-center rounded-full bg-[#FF87B3]/25 border border-[#FF87B3] px-3.5 py-1 text-xs font-bold tracking-widest text-[#D94D78] uppercase mb-4 shadow-2xs">
              Video Tour
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-[#14213D] font-display tracking-tight leading-tight mb-3">
              Take a look around.
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm md:text-base leading-relaxed max-w-2xl mx-auto font-medium">
              An inside look at our departments, facilities and care environment.
            </p>
            <div className="flex items-center justify-center gap-1.5 mt-3">
              <div className="w-12 h-1 bg-[#FF87B3] rounded-full" />
              <div className="w-1.5 h-1.5 bg-[#FF87B3] rounded-full" />
            </div>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="mx-auto grid max-w-4xl gap-8 sm:grid-cols-2"
          >
            {[
              {
                title: "Fertility Centre walk-through",
                img: reception,
                time: "02:45",
              },
              {
                title: "Maternity ward tour",
                img: delivery,
                time: "03:20",
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                variants={fadeUpVariant}
                whileHover={
                  shouldReduceMotion
                    ? undefined
                    : {
                        y: -8,
                        scale: 1.02,
                        boxShadow: "0 25px 50px -10px rgba(255,135,179,0.40)",
                      }
                }
                transition={{ type: "spring", stiffness: 280, damping: 20 }}
                className="group relative aspect-[1.58] overflow-hidden rounded-3xl border border-[#FF87B3] bg-white shadow-md transition-all duration-300 cursor-pointer"
              >
                <motion.img
                  src={item.img}
                  alt={item.title}
                  whileHover={shouldReduceMotion ? undefined : { scale: 1.06 }}
                  transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
                  className="w-full h-full object-cover transform-gpu"
                />

                <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/80 via-black/40 to-transparent pointer-events-none" />

                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="relative flex items-center justify-center">
                    <div className="absolute w-20 h-20 rounded-full bg-[#FF87B3]/30 group-hover:scale-130 group-hover:opacity-100 transition-all duration-500 opacity-0" />

                    <div className="w-16 h-16 rounded-full border-4 border-white/90 bg-white/95 flex items-center justify-center text-[#14213D] shadow-xl transition-all duration-400 group-hover:scale-115 group-hover:bg-[#FF87B3] group-hover:text-[#14213D]">
                      <Play className="w-5 h-5 fill-current ml-1" />
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-5 left-5 right-5 z-10 flex flex-col items-start">
                  <div className="inline-flex items-center gap-1.5 bg-black/60 backdrop-blur-xs text-white text-[10px] font-bold px-3 py-1 rounded-md mb-2 shadow-xs">
                    <Clock className="w-3.5 h-3.5 text-[#FF87B3]" />
                    <span>{item.time}</span>
                  </div>
                  <h4 className="text-white font-display text-base md:text-[18px] font-extrabold leading-tight drop-shadow-md group-hover:text-[#FF87B3] transition-colors">
                    {item.title}
                  </h4>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
}
