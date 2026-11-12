import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ShieldCheck,
  Award,
  Target,
  Eye,
  Sparkles,
  Users,
  Headphones,
  HeartPulse,
  Heart,
  HeartHandshake,
  Lightbulb,
  Clock,
  Baby,
  ChevronRight,
  ArrowRight,
  Plus,
} from "lucide-react";
import { hospital } from "@/data/hospital";
import { AboutHero } from "@/components/site/hero/AboutHero";
import ourStoryDoctors from "@/assets/our-story-doctors.webp";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValueEvent,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import { useRef, useState, useEffect } from "react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Izone Hospital & Fertility Centre" },
      {
        name: "description",
        content:
          "Our story, mission, values and milestones. Manyata-certified maternity and fertility care in Thillainagar since 1998.",
      },
      { property: "og:title", content: "About Izone Hospital" },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: About,
});

// ─── Shared Framer Motion Variants ──────────────────────────────────────────
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
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 60, damping: 18 },
  },
};

const fadeLeftVariant: Variants = {
  hidden: { opacity: 0, x: -35 },
  show: {
    opacity: 1,
    x: 0,
    transition: { type: "spring", stiffness: 55, damping: 16 },
  },
};

const fadeRightVariant: Variants = {
  hidden: { opacity: 0, x: 35 },
  show: {
    opacity: 1,
    x: 0,
    transition: { type: "spring", stiffness: 55, damping: 16 },
  },
};

const imageVariant: Variants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", stiffness: 50, damping: 16, delay: 0.2 },
  },
};

// Hand holding heart illustration for Mission Background
const MissionIllustration = () => (
  <svg
    className="absolute right-0 bottom-0 w-32 h-32 text-[#FF87B3] opacity-[0.25] pointer-events-none select-none transition-transform duration-700 ease-out group-hover:scale-110 group-hover:opacity-[0.4]"
    viewBox="0 0 100 100"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M50 35 C50 35 46 27 38 27 C28 27 21 35 21 45 C21 58 38 71 50 75 C62 71 79 58 79 45 C79 35 72 27 62 27 C54 27 50 35 50 35 Z" />
    <path d="M50 40 V50 M45 45 H55" strokeWidth="2" />
    <path d="M15 75 Q25 70 35 73 Q45 76 55 70 Q60 65 75 65 C80 65 85 68 88 73 L80 87 Q75 92 60 92 L15 92 Z" />
  </svg>
);

// Mountains and Flag illustration for Vision Background
const VisionIllustration = () => (
  <svg
    className="absolute right-0 bottom-0 w-32 h-32 text-[#FF87B3] opacity-[0.25] pointer-events-none select-none transition-transform duration-700 ease-out group-hover:scale-110 group-hover:opacity-[0.4]"
    viewBox="0 0 100 100"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M15 80 L40 35 L60 60 L78 30 L95 80 Z" />
    <path d="M30 62 L45 80" />
    <path d="M65 52 L73 80" />
    <path d="M78 30 V12" />
    <path d="M78 12 L92 18 L78 24 Z" fill="currentColor" fillOpacity="0.15" />
  </svg>
);

function About() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <>
      {/* 1. Hero Section */}
      <AboutHero />

      {/* 2. About Us & Mission/Vision Section */}
      <section className="relative bg-gradient-to-b from-white via-[#FFF5F8]/40 to-white pt-6 pb-8 md:pt-8 md:pb-10 border-b border-slate-100 overflow-hidden">
        <div
          className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-[#FF87B3]/20 blur-3xl pointer-events-none"
          aria-hidden="true"
        />

        <div className="container-page relative z-10">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            {/* Left Content Column */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
            >
              <motion.div
                variants={fadeLeftVariant}
                className="inline-flex items-center rounded-full bg-[#FF87B3]/25 border border-[#FF87B3] px-3.5 py-1 text-xs font-bold tracking-widest text-[#D94D78] uppercase mb-3"
              >
                About Us
              </motion.div>

              <motion.h2
                variants={fadeLeftVariant}
                className="text-3xl md:text-4xl font-extrabold text-[#14213D] font-display tracking-tight mb-2 leading-tight"
              >
                Compassionate Care
                <br />
                Healthier <span className="text-[#D94D78]">Tomorrow</span>
              </motion.h2>

              <motion.div
                variants={fadeLeftVariant}
                className="w-12 h-1 bg-[#FF87B3] rounded-full mb-4"
              />

              <motion.p
                variants={fadeLeftVariant}
                className="text-slate-600 text-sm md:text-base leading-relaxed mb-6 max-w-xl font-medium"
              >
                Izone Hospital &amp; Fertility Centre is dedicated to providing advanced, ethical
                and patient-centric healthcare for every family. With a team of experienced doctors,
                modern facilities and a caring approach, we strive to make quality healthcare
                accessible to all.
              </motion.p>

              {/* 3 Feature Pillars */}
              <motion.div variants={staggerContainer} className="grid gap-4 sm:grid-cols-3">
                {[
                  {
                    icon: HeartPulse,
                    title: "Patient First",
                    desc: "Your health and well-being are our priority.",
                  },
                  {
                    icon: Users,
                    title: "Experienced Team",
                    desc: "Skilled professionals delivering expert care with empathy.",
                  },
                  {
                    icon: ShieldCheck,
                    title: "Trusted Care",
                    desc: "Safe, ethical and reliable healthcare you can trust.",
                  },
                ].map(({ icon: Icon, title, desc }) => (
                  <motion.div
                    key={title}
                    variants={fadeUpVariant}
                    whileHover={
                      shouldReduceMotion
                        ? undefined
                        : {
                            y: -6,
                            scale: 1.025,
                            boxShadow: "0 20px 35px -10px rgba(255,135,179,0.35)",
                          }
                    }
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="flex flex-col gap-2.5 p-3.5 rounded-2xl bg-white border border-[#FF87B3] shadow-sm hover:border-[#D94D78] transition-all duration-300 group cursor-default"
                  >
                    <div className="w-10 h-10 rounded-full border border-[#FF87B3] bg-[#FFF5F8] flex items-center justify-center text-[#D94D78] shrink-0 shadow-xs group-hover:bg-[#FF87B3] group-hover:text-[#14213D] transition-all duration-300">
                      <Icon className="w-4.5 h-4.5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-[#14213D] text-[13.5px] mb-0.5 group-hover:text-[#D94D78] transition-colors">
                        {title}
                      </h3>
                      <p className="text-[11.5px] text-slate-500 leading-snug">{desc}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right Image Column */}
            <motion.div
              variants={fadeRightVariant}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
              className="relative flex items-center justify-center lg:justify-end"
            >
              <div className="relative group overflow-hidden rounded-3xl p-1 bg-gradient-to-tr from-[#FF87B3]/40 via-white to-[#FF87B3]/25 shadow-xl transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-pink-200/50">
                <motion.img
                  src={ourStoryDoctors}
                  alt="Izone Hospital doctors team"
                  loading="lazy"
                  whileHover={shouldReduceMotion ? undefined : { scale: 1.04 }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                  className="w-full h-auto max-w-[550px] object-contain object-right transform-gpu rounded-[22px]"
                />
              </div>
            </motion.div>
          </div>

          {/* Mission & Vision cards */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            className="mt-8 md:mt-10 relative"
          >
            <div className="grid md:grid-cols-2 gap-6 md:gap-8">
              {/* Mission Card */}
              <motion.div
                variants={fadeUpVariant}
                whileHover={
                  shouldReduceMotion
                    ? undefined
                    : { y: -8, scale: 1.015, boxShadow: "0 25px 50px -12px rgba(255,135,179,0.35)" }
                }
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className="group relative overflow-hidden rounded-2xl sm:rounded-[28px] border border-[#FF87B3] bg-white p-5 sm:p-6 md:p-8 shadow-[0_8px_30px_rgba(255,135,179,0.15)] flex flex-col md:flex-row gap-4 sm:gap-5 items-start transition-all duration-300 cursor-default"
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-[#FFF5F8] border border-[#FF87B3] rounded-full flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-[#FF87B3] transition-all duration-300 shadow-xs">
                  <Target
                    className="w-6 h-6 sm:w-7 sm:h-7 text-[#D94D78] group-hover:text-[#14213D] transition-colors duration-300"
                    strokeWidth={1.8}
                  />
                </div>
                <div className="flex-1 relative z-10">
                  <h3 className="font-display text-lg sm:text-xl md:text-2xl font-extrabold text-[#14213D] group-hover:text-[#D94D78] transition-colors">
                    Our Mission
                  </h3>
                  <div className="w-12 h-1 bg-[#FF87B3] rounded-full mt-2 mb-2.5 sm:mb-3" />
                  <p className="text-slate-600 text-xs sm:text-sm md:text-base leading-relaxed max-w-sm font-medium">
                    {hospital.mission}
                  </p>
                </div>
                <MissionIllustration />
              </motion.div>

              {/* Vision Card */}
              <motion.div
                variants={fadeUpVariant}
                whileHover={
                  shouldReduceMotion
                    ? undefined
                    : { y: -8, scale: 1.015, boxShadow: "0 25px 50px -12px rgba(255,135,179,0.35)" }
                }
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className="group relative overflow-hidden rounded-2xl sm:rounded-[28px] border border-[#FF87B3] bg-white p-5 sm:p-6 md:p-8 shadow-[0_8px_30px_rgba(255,135,179,0.15)] flex flex-col md:flex-row gap-4 sm:gap-5 items-start transition-all duration-300 cursor-default"
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-[#FFF5F8] border border-[#FF87B3] rounded-full flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-[#FF87B3] transition-all duration-300 shadow-xs">
                  <Eye
                    className="w-6 h-6 sm:w-7 sm:h-7 text-[#D94D78] group-hover:text-[#14213D] transition-colors duration-300"
                    strokeWidth={1.8}
                  />
                </div>
                <div className="flex-1 relative z-10">
                  <h3 className="font-display text-lg sm:text-xl md:text-2xl font-extrabold text-[#14213D] group-hover:text-[#D94D78] transition-colors">
                    Our Vision
                  </h3>
                  <div className="w-12 h-1 bg-[#FF87B3] rounded-full mt-2 mb-2.5 sm:mb-3" />
                  <p className="text-slate-600 text-xs sm:text-sm md:text-base leading-relaxed max-w-sm font-medium">
                    {hospital.vision}
                  </p>
                </div>
                <VisionIllustration />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3. Our Values Section */}
      <section className="relative bg-white pt-6 pb-8 md:pt-8 md:pb-10 border-b border-slate-100 overflow-hidden">
        <div className="container-page relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            className="text-center mb-6 md:mb-8"
          >
            <span className="inline-flex items-center rounded-full bg-[#FF87B3]/25 border border-[#FF87B3] px-3.5 py-1 text-xs font-bold tracking-widest text-[#D94D78] uppercase mb-3">
              Our Values
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-[#14213D] font-display tracking-tight leading-tight mb-2">
              What guides us, every day.
            </h2>
            <div className="flex items-center justify-center gap-1.5 mt-2">
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
            {hospital.values.map((v, i) => {
              const icons = [
                <Heart key="1" className="w-5 h-5 sm:w-6 sm:h-6" />,
                <Award key="2" className="w-5 h-5 sm:w-6 sm:h-6" />,
                <ShieldCheck key="3" className="w-5 h-5 sm:w-6 sm:h-6" />,
                <Users key="4" className="w-5 h-5 sm:w-6 sm:h-6" />,
                <Lightbulb key="5" className="w-5 h-5 sm:w-6 sm:h-6" />,
                <HeartHandshake key="6" className="w-5 h-5 sm:w-6 sm:h-6" />,
              ];

              const numStr = String(i + 1).padStart(2, "0");

              return (
                <motion.div
                  key={v.title}
                  variants={fadeUpVariant}
                  whileHover={
                    shouldReduceMotion
                      ? undefined
                      : {
                          y: -8,
                          scale: 1.025,
                          boxShadow: "0 22px 45px -10px rgba(255,135,179,0.40)",
                        }
                  }
                  transition={{ type: "spring", stiffness: 280, damping: 20 }}
                  className="group relative rounded-2xl sm:rounded-3xl border border-[#FF87B3] bg-[#FFF5F8]/40 p-5 sm:p-7 shadow-xs hover:bg-white transition-all duration-300 cursor-default"
                >
                  <span className="absolute top-5 right-5 sm:top-6 sm:right-6 text-xs font-extrabold text-[#14213D] bg-[#FF87B3] group-hover:bg-[#f06a99] px-2.5 py-0.5 rounded-md transition-colors duration-300">
                    {numStr}
                  </span>

                  <div className="w-11 h-11 sm:w-13 sm:h-13 rounded-full border border-[#FF87B3] bg-[#FFF5F8] flex items-center justify-center text-[#D94D78] mb-3.5 sm:mb-4 mt-1 group-hover:bg-[#FF87B3] group-hover:text-[#14213D] group-hover:scale-110 transition-all duration-300 shadow-xs">
                    {icons[i]}
                  </div>

                  <h3 className="font-display text-base sm:text-lg font-bold text-[#14213D] mb-1 group-hover:text-[#D94D78] transition-colors">
                    {v.title}
                  </h3>
                  <div className="w-8 h-0.5 bg-[#FF87B3] mb-2 sm:mb-2.5 group-hover:w-12 transition-all duration-300" />
                  <p className="text-slate-600 text-xs md:text-sm leading-relaxed font-medium">
                    {v.desc}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* 4. Chairman's Message Section */}
      <section className="bg-gradient-to-tr from-[#FFF5F8] via-[#fffcfd] to-white pt-6 pb-8 md:pt-8 md:pb-10 border-b border-slate-100 overflow-hidden relative">
        <div className="container-page relative z-10">
          <div className="grid md:grid-cols-[1.1fr_1.3fr] gap-6 md:gap-12 items-center">
            {/* Left Column: Monogram & Header */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, type: "spring", stiffness: 60 }}
            >
              <div className="flex items-center gap-2 mb-2 sm:mb-3">
                <div className="w-6 h-0.5 bg-[#FF87B3]" />
                <span className="text-xs font-bold uppercase tracking-widest text-[#D94D78]">
                  Chairman's Message
                </span>
              </div>

              <h2 className="font-display text-2xl sm:text-3xl md:text-5xl font-extrabold text-[#14213D] leading-tight mb-2 sm:mb-3">
                A note from our leadership.
              </h2>

              <div className="w-12 h-1 bg-[#FF87B3] rounded-full mb-3 sm:mb-4" />

              <p className="text-slate-600 text-sm md:text-base leading-relaxed max-w-sm font-medium">
                At Izone Hospital &amp; Fertility Centre, we believe that true clinical
                excellence begins with listening with kindness and treating every family as our own.
              </p>
            </motion.div>

            {/* Right Column: Quote Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, type: "spring", stiffness: 60 }}
            >
              <motion.div
                whileHover={
                  shouldReduceMotion
                    ? undefined
                    : { y: -6, boxShadow: "0 25px 50px rgba(255,135,179,0.30)" }
                }
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className="relative rounded-2xl sm:rounded-[32px] bg-white border border-[#FF87B3] p-5 sm:p-6 md:p-8 shadow-[0_15px_45px_rgba(255,135,179,0.15)] transition-all duration-300"
              >
                <p className="text-[#14213D] text-sm sm:text-base md:text-lg font-semibold leading-relaxed italic relative z-10">
                  <span className="text-[#D94D78] text-lg sm:text-xl md:text-2xl font-serif font-bold mr-1 leading-none select-none">“</span>
                  Medicine is not just about diagnosis and treatment. It is about listening to a
                  young woman anxious about her first pregnancy, to a couple longing for a child, to
                  a father worried about his diabetes. Every day at Izone Hospital, we try to earn that
                  trust, again and again.
                  <span className="text-[#D94D78] text-lg sm:text-xl md:text-2xl font-serif font-bold ml-1 leading-none select-none">”</span>
                </p>
                <footer className="mt-3.5 sm:mt-4 text-xs md:text-sm text-slate-500 font-semibold">
                  Chairman, Izone Hospital &amp; Fertility Centre
                </footer>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 5. Milestones Section */}
      <MilestoneTimeline />

      {/* 6. Certifications Section */}
      <section className="bg-gradient-to-b from-white to-[#FFF5F8] pt-6 pb-8 md:pt-8 md:pb-12 border-t border-slate-100 overflow-hidden relative">
        <div className="container-page relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            className="text-center mb-6 md:mb-8"
          >
            <span className="inline-flex items-center rounded-full bg-[#FF87B3]/25 border border-[#FF87B3] px-3.5 py-1 text-xs font-bold tracking-widest text-[#D94D78] uppercase mb-3">
              Certifications
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#14213D] leading-tight font-display tracking-tight">
              Recognitions we are proud of.
            </h2>
            <div className="flex items-center justify-center gap-1.5 mt-2">
              <div className="w-12 h-1 bg-[#FF87B3] rounded-full" />
              <div className="w-1.5 h-1.5 bg-[#FF87B3] rounded-full" />
            </div>
          </motion.div>

          {/* Manyata Certified Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            whileHover={
              shouldReduceMotion
                ? undefined
                : { y: -6, scale: 1.015, boxShadow: "0 22px 45px rgba(255,135,179,0.35)" }
            }
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="max-w-2xl mx-auto rounded-2xl sm:rounded-[32px] border border-[#FF87B3] bg-white p-6 sm:p-8 md:p-10 shadow-[0_8px_30px_rgba(255,135,179,0.15)] flex flex-col md:flex-row gap-6 sm:gap-8 items-center justify-center transition-all duration-300 cursor-default"
          >
            {/* Scalloped pink seal */}
            <motion.div
              animate={shouldReduceMotion ? undefined : { rotate: [0, 4, -4, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="relative w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center shrink-0"
            >
              <div className="absolute inset-0 rounded-full border border-dashed border-[#FF87B3]" />
              <svg
                className="w-16 h-16 sm:w-20 sm:h-20 text-[#FF87B3] drop-shadow-md"
                viewBox="0 0 100 100"
                fill="currentColor"
              >
                <path d="M50 5 L55 12 L63 9 L66 17 L74 16 L74 24 L82 26 L79 34 L86 38 L81 45 L86 52 L80 59 L83 67 L76 71 L76 79 L68 81 L65 89 L58 89 L53 96 L47 96 L42 89 L35 89 L32 81 L24 79 L24 71 L17 67 L20 59 L14 52 L19 45 L14 38 L21 34 L18 26 L26 24 L26 16 L34 17 L37 9 L45 12 Z" />
                <circle
                  cx="50"
                  cy="50"
                  r="32"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  strokeDasharray="4 3"
                />
              </svg>
              <ShieldCheck className="absolute w-7 h-7 sm:w-8 sm:h-8 text-[#14213D]" strokeWidth={2.2} />
            </motion.div>

            {/* Middle separator line */}
            <div className="hidden md:block w-px h-16 bg-pink-100 mx-2" />

            {/* Certification copy details */}
            <div className="flex-1 text-center md:text-left">
              <h3 className="font-display text-xl sm:text-2xl font-extrabold text-[#14213D] mb-1 sm:mb-1.5">
                Manyata Certified
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4 font-medium">
                Recognised maternity care facility for safe childbirth practices.
              </p>
              <div className="inline-flex items-center gap-1.5 bg-[#FFF5F8] border border-[#FF87B3] px-3.5 py-1.5 rounded-full text-xs font-bold text-[#D94D78] shadow-xs">
                <ShieldCheck className="w-3.5 h-3.5 text-[#D94D78]" />
                Verified Recognition
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}

// Sub-component for individual milestone cards
const MilestoneCard = ({
  milestone,
  isActive,
  index,
  align,
}: {
  milestone: (typeof hospital.milestones)[number];
  isActive: boolean;
  index: number;
  align: "left" | "right";
}) => {
  const shouldReduceMotion = useReducedMotion();

  const icons = [
    <Sparkles key="1" className="w-4 h-4 sm:w-5 sm:h-5 text-[#14213D]" />,
    <HeartPulse key="2" className="w-4 h-4 sm:w-5 sm:h-5 text-[#14213D]" />,
    <Users key="3" className="w-4 h-4 sm:w-5 sm:h-5 text-[#14213D]" />,
    <ShieldCheck key="4" className="w-4 h-4 sm:w-5 sm:h-5 text-[#14213D]" />,
    <Headphones key="5" className="w-4 h-4 sm:w-5 sm:h-5 text-[#14213D]" />,
  ];

  return (
    <motion.div
      className={`bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 border-2 transition-all duration-500 shadow-sm max-w-md w-full text-left group cursor-default ${
        isActive
          ? "border-[#FF87B3] shadow-[0_12px_36px_rgba(255,135,179,0.4)] scale-[1.02]"
          : "border-slate-100 hover:border-[#FF87B3] hover:shadow-md"
      }`}
      initial={{ opacity: 0, x: align === "right" ? -30 : 30, y: 20 }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      whileHover={shouldReduceMotion ? undefined : { y: -4, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 60, damping: 16 }}
    >
      <div className="flex gap-3 sm:gap-4 items-start">
        {/* Left Side: Icon Container */}
        <div
          className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-gradient-to-br from-[#FF87B3] to-[#f06a99] border border-[#f06a99] flex items-center justify-center shrink-0 shadow-sm transition-all duration-500 ${
            isActive ? "scale-110 shadow-pink-300/50" : "group-hover:scale-105"
          }`}
        >
          {icons[index % icons.length]}
        </div>

        {/* Right Side: Text details */}
        <div className="min-w-0 flex-1">
          <div
            className={`text-xs sm:text-sm font-extrabold transition-colors duration-500 ${
              isActive ? "text-[#D94D78]" : "text-slate-400 group-hover:text-[#D94D78]"
            }`}
          >
            {milestone.year}
          </div>
          <h4 className="text-sm sm:text-[17px] font-extrabold text-[#14213D] leading-tight mb-1 sm:mb-2 group-hover:text-[#D94D78] transition-colors">
            {milestone.title}
          </h4>
          <p className="text-slate-600 text-[11.5px] sm:text-xs md:text-sm leading-relaxed font-medium">
            {milestone.desc}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

// Sub-component for Milestones Section with scroll progress tracking
function MilestoneTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [cardThresholds, setCardThresholds] = useState<number[]>([]);
  const [scrollProgress, setScrollProgress] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 25,
    restDelta: 0.001,
  });

  const heightPercent = useTransform(scaleY, [0, 1], ["0%", "100%"]);

  useEffect(() => {
    const calculateThresholds = () => {
      if (!containerRef.current || !lineRef.current) return;
      const lineRect = lineRef.current.getBoundingClientRect();
      const thresholds = cardRefs.current.map((card) => {
        if (!card) return 0;
        const cardRect = card.getBoundingClientRect();
        const relativeCenter = cardRect.top + cardRect.height / 2 - lineRect.top;
        return relativeCenter / lineRect.height;
      });
      setCardThresholds(thresholds);
    };

    calculateThresholds();
    const timer = setTimeout(calculateThresholds, 250);

    window.addEventListener("resize", calculateThresholds);
    return () => {
      window.removeEventListener("resize", calculateThresholds);
      clearTimeout(timer);
    };
  }, []);

  useMotionValueEvent(scaleY, "change", (latest) => {
    setScrollProgress(latest);
  });

  const milestones = hospital.milestones;

  return (
    <section className="pt-6 pb-8 md:pt-8 md:pb-10 overflow-hidden bg-white border-b border-slate-100 relative">
      <div className="container-page relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-6 md:mb-8"
        >
          <span className="inline-flex items-center rounded-full bg-[#FF87B3]/25 border border-[#FF87B3] px-3.5 py-1 text-xs font-bold tracking-widest text-[#D94D78] uppercase mb-3">
            Milestones
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-[#14213D] font-display tracking-tight leading-tight">
            A quiet, steady journey.
          </h2>
          <div className="flex items-center justify-center gap-1.5 mt-2">
            <div className="w-12 h-1 bg-[#FF87B3] rounded-full" />
            <div className="w-1.5 h-1.5 bg-[#FF87B3] rounded-full" />
          </div>
        </motion.div>

        <div className="relative max-w-5xl mx-auto py-2" ref={containerRef}>
          {/* Vertical Timeline Line Container */}
          <div
            ref={lineRef}
            className="absolute left-3.5 sm:left-5 md:left-1/2 top-10 bottom-10 w-[3px] -translate-x-1/2 pointer-events-none z-10"
          >
            {/* Gray Background Line */}
            <div className="w-full h-full bg-slate-100 rounded-full" />

            {/* Pink Scroll-Drawn Active Line */}
            <motion.div
              className="absolute top-0 left-0 w-full bg-gradient-to-b from-[#FF87B3] to-[#D94D78] rounded-full origin-top"
              style={{ height: heightPercent }}
            />

            {/* Glowing Blinking Dot tracking line end */}
            <motion.div
              className="absolute left-1/2 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-white border-3 sm:border-4 border-[#FF87B3] shadow-[0_0_14px_#FF87B3] z-20 flex items-center justify-center animate-pulse"
              style={{ top: heightPercent, transform: "translate(-50%, -50%)" }}
            >
              <span className="absolute w-2 h-2 sm:w-2.5 sm:h-2.5 bg-[#D94D78] rounded-full animate-ping opacity-75" />
              <span className="absolute w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#D94D78] rounded-full" />
            </motion.div>
          </div>

          {/* Cards List */}
          <div className="space-y-5 sm:space-y-6 md:space-y-8 relative">
            {milestones.map((m, idx) => {
              const threshold = cardThresholds[idx] || 0;
              const isActive = scrollProgress >= threshold - 0.02;

              return (
                <div
                  key={m.year}
                  ref={(el) => {
                    cardRefs.current[idx] = el;
                  }}
                  className="relative grid grid-cols-[28px_1fr] sm:grid-cols-[40px_1fr] md:grid-cols-[1fr_80px_1fr] items-center gap-2.5 sm:gap-4 md:gap-0"
                >
                  {/* Left Column (Desktop Only: Even Card) */}
                  <div
                    className={`hidden md:flex justify-end pr-10 transition-all duration-500 ${
                      idx % 2 === 0
                        ? "opacity-100 translate-x-0"
                        : "opacity-0 translate-x-4 pointer-events-none"
                    }`}
                  >
                    {idx % 2 === 0 && (
                      <MilestoneCard milestone={m} isActive={isActive} index={idx} align="right" />
                    )}
                  </div>

                  {/* Center Column: Milestone Dot/Marker */}
                  <div className="flex justify-center z-20">
                    <div
                      className={`w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 rounded-full border-3 sm:border-4 flex items-center justify-center transition-all duration-500 bg-white ${
                        isActive
                          ? "border-[#FF87B3] bg-[#FF87B3] shadow-[0_0_14px_#FF87B3]"
                          : "border-slate-200"
                      }`}
                    >
                      <div
                        className={`w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-2.5 md:h-2.5 rounded-full transition-all duration-500 ${
                          isActive ? "bg-[#14213D]" : "bg-slate-300"
                        }`}
                      />
                    </div>
                  </div>

                  {/* Right Column: Desktop Odd Card / Mobile All Cards */}
                  <div className="pl-2 sm:pl-4 md:pl-10">
                    <div className="md:hidden">
                      <MilestoneCard milestone={m} isActive={isActive} index={idx} align="left" />
                    </div>
                    <div className="hidden md:block">
                      {idx % 2 !== 0 && (
                        <MilestoneCard milestone={m} isActive={isActive} index={idx} align="left" />
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
