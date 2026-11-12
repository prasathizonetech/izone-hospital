import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Stethoscope,
  Star,
  Quote,
  Heart,
  HeartHandshake,
  Award,
  ShieldCheck,
  UserCheck,
  LayoutGrid,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import ivfLabImg from "@/assets/features/ivf_lab.webp";
import welcomeCardBg from "@/assets/welcome-card-bg.webp";
import welcomeCareCutout from "@/assets/welcome-family-care-cutout.webp";
import obstetricsImg from "@/assets/departments/obstetrics.webp";
import gynaecologyImg from "@/assets/features/expertise.jpg";
import infertilityImg from "@/assets/departments/infertility.webp";
import generalMedicineImg from "@/assets/departments/general-medicine.webp";
import generalSurgeryImg from "@/assets/departments/general-surgery.webp";
import orthopaedicImg from "@/assets/departments/orthopaedic.webp";
import obstetricsArt from "@/assets/departments/obstetrics-illustration-2x.webp";
import gynaecologyArt from "@/assets/departments/gynaecology-illustration-2x.webp";
import infertilityArt from "@/assets/departments/infertility-illustration-2x.webp";
import generalMedicineArt from "@/assets/departments/general-medicine-illustration-2x.webp";
import generalSurgeryArt from "@/assets/departments/general-surgery-illustration-2x.webp";
import orthopaedicArt from "@/assets/departments/orthopaedic-illustration-2x.webp";
import { departments } from "@/data/departments";
import { doctors } from "@/data/doctors";
import { testimonials } from "@/data/testimonials";
import { DoctorCard } from "@/components/site/DoctorCard";
import { CTASection } from "@/components/site/CTASection";
import { HomeHero } from "@/components/site/hero/HomeHero";
import { FertilityWhyChooseUs } from "@/components/site/FertilityWhyChooseUs";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { fadeUp, fadeLeft, staggerContainer, scaleIn, viewport } from "@/lib/animations";
import { useState, useRef, useEffect, useCallback } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Izone Hospital & Fertility Centre — Thillainagar" },
      {
        name: "description",
        content:
          "Trusted women's health, fertility & IVF, and family healthcare in Thillainagar. Manyata-certified maternity care.",
      },
      { property: "og:title", content: "Izone Hospital & Fertility Centre" },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

function Home() {
  return (
    <>
      <HomeHero />
      <FertilityWhyChooseUs />
      <Welcome />
      <SpecialitiesPreview />
      <FertilityHighlight />
      <DoctorsPreview />
      <TestimonialsPreview />
      <CTASection />
    </>
  );
}

// ─── Welcome section ──────────────────────────────────────────────────────────
function Welcome() {
  const values = [
    {
      title: "Compassion",
      desc: "Care rooted in empathy and warmth for every patient and family.",
      icon: HeartHandshake,
    },
    {
      title: "Excellence",
      desc: "Clinical rigour, modern protocols and continuous improvement.",
      icon: Award,
    },
    {
      title: "Integrity",
      desc: "Honest counselling, transparent pricing and ethical practice.",
      icon: ShieldCheck,
    },
    {
      title: "Patient-Centered",
      desc: "Every treatment plan is built around the person in front of us.",
      icon: UserCheck,
    },
  ];

  return (
    <section className="relative pt-8 pb-10 lg:pt-10 lg:pb-12 bg-gradient-to-br from-[#FFF5F8] to-white overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-[#FF87B3]/20 blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="container-page relative z-10 grid gap-12 lg:grid-cols-2 lg:items-center">
        {/* Left: Card with attached background image & cutout image */}
        <motion.div
          variants={fadeLeft}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="relative flex items-center justify-center"
        >
          {/* Ambient background blur circles */}
          <div className="absolute -left-12 top-10 w-96 h-96 rounded-full bg-[#FF87B3]/35 blur-3xl pointer-events-none" />
          <div className="absolute -right-8 bottom-8 w-80 h-80 rounded-full bg-[#FFF5F8] blur-3xl pointer-events-none" />

          {/* Card Container */}
          <motion.div
            whileHover={{ scale: 1.02, y: -4 }}
            transition={{ type: "spring", stiffness: 200, damping: 25 }}
            className="relative z-10 w-full max-w-[540px] rounded-[24px] sm:rounded-[36px] overflow-hidden drop-shadow-[0_20px_40px_rgba(255,135,179,0.30)] border border-[#FF87B3] bg-white"
          >
            {/* Attached Background Card Image */}
            <img
              src={welcomeCardBg}
              alt="Hospital room background"
              className="w-full h-auto block"
            />
            {/* High-quality foreground cutout of doctor, mother and baby */}
            <img
              src={welcomeCareCutout}
              alt="Doctor caring for mother and newborn baby at Izone Hospital"
              loading="lazy"
              className="absolute inset-0 w-full h-full object-contain pointer-events-none"
            />
          </motion.div>
        </motion.div>

        {/* Right: content */}
        <motion.div
          variants={staggerContainer(0.1, 0.15)}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
        >
          <motion.div
            variants={fadeUp}
            className="inline-flex items-center rounded-full bg-[#FF87B3]/25 border border-[#FF87B3] px-3.5 py-1 text-[11px] font-bold tracking-widest text-[#D94D78] uppercase mb-4 sm:mb-6"
          >
            Welcome
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#14213D] font-display tracking-tight mb-4 sm:mb-6 leading-tight"
          >
            Caring for families since 1998.
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="text-sm sm:text-base md:text-lg text-slate-600 leading-relaxed mb-8 sm:mb-10 font-medium"
          >
            Izone Hospital &amp; Fertility Centre is a trusted healthcare institution in the
            heart of Thillainagar, providing comprehensive medical services with special focus on
            women's healthcare, fertility treatments, general medicine and a wide range of
            specialist departments.
          </motion.p>

          <motion.div variants={staggerContainer(0.08)} className="grid gap-3.5 sm:gap-4 sm:grid-cols-2 mb-8 sm:mb-10">
            {values.map((v, i) => (
              <motion.div
                key={i}
                variants={scaleIn}
                whileHover={{ y: -4, boxShadow: "0 12px 32px rgba(255,135,179,0.35)" }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
                className="bg-white rounded-2xl p-4 sm:p-5 border border-[#FF87B3] shadow-[0_8px_30px_rgba(0,0,0,0.03)] cursor-default"
              >
                <div className="flex gap-3.5 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#FFF5F8] border border-[#FF87B3] flex items-center justify-center shrink-0">
                    <v.icon className="w-5 h-5 sm:w-6 sm:h-6 text-[#D94D78]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#14213D] text-sm sm:text-base mb-1">{v.title}</h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-snug">{v.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div variants={fadeUp}>
            <Link
              to="/about"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#FF87B3] via-[#ff9ec2] to-[#D94D78] border border-[#e86595] px-6 sm:px-8 py-3.5 sm:py-4 text-sm font-extrabold text-[#14213D] shadow-lg shadow-pink-400/30 hover:shadow-pink-400/50 transition-all group cursor-pointer w-full sm:w-auto"
            >
              About the hospital
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── 3D-tilt department card ──────────────────────────────────────────────────
function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 200, damping: 20 });
  const sry = useSpring(ry, { stiffness: 200, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    rx.set(-py * 8);
    ry.set(px * 8);
  };
  const reset = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <motion.div
      ref={ref}
      style={{ rotateX: srx, rotateY: sry, transformPerspective: 800 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={reset}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Specialities section ─────────────────────────────────────────────────────
function SpecialitiesPreview() {
  const deptIllustrations: Record<string, string> = {
    obstetrics: obstetricsArt,
    gynaecology: gynaecologyArt,
    infertility: infertilityArt,
    "general-medicine": generalMedicineArt,
    "general-surgery": generalSurgeryArt,
    orthopaedic: orthopaedicArt,
  };

  const deptImages: Record<string, string> = {
    obstetrics: obstetricsImg,
    gynaecology: gynaecologyImg,
    infertility: infertilityImg,
    "general-medicine": generalMedicineImg,
    "general-surgery": generalSurgeryImg,
    orthopaedic: orthopaedicImg,
  };

  return (
    <section className="pt-6 pb-6 lg:pt-8 lg:pb-8 bg-[#FFF8FA] relative overflow-hidden">
      {/* Decorative ambient background glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-[#FF87B3]/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[450px] h-[450px] rounded-full bg-[#FF87B3]/10 blur-[100px] pointer-events-none" />

      <div className="container-page relative z-10">
        {/* Header */}
        <motion.div
          variants={staggerContainer(0.12)}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 md:mb-10"
        >
          <div className="max-w-2xl">
            <motion.div
              variants={fadeUp}
              className="inline-flex items-center gap-2 rounded-full bg-white/90 backdrop-blur-md border border-[#FF87B3] px-4 py-1.5 text-xs font-extrabold tracking-widest text-[#D94D78] uppercase mb-3.5 shadow-2xs cursor-default"
            >
              <LayoutGrid className="w-3.5 h-3.5 text-[#D94D78]" />
              Departments
            </motion.div>
            <motion.h2
              variants={fadeUp}
              className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-[1.12] mb-3 tracking-tight text-[#14213D]"
            >
              Specialised care,{" "}
              <span className="text-[#D94D78]">
                delivered with warmth.
              </span>
            </motion.h2>
            <motion.div
              variants={fadeUp}
              className="w-14 h-1.5 bg-gradient-to-r from-[#FF87B3] to-[#D94D78] rounded-full mb-3.5"
            />
            <motion.p variants={fadeUp} className="text-sm sm:text-base text-slate-600 leading-relaxed font-medium max-w-xl">
              From fertility and maternity to everyday family medicine,
              <br className="hidden md:block" />
              our departments work together seamlessly around you.
            </motion.p>
          </div>
          <motion.div variants={fadeUp} className="shrink-0 w-full sm:w-auto">
            <Link
              to="/departments"
              className="inline-flex items-center justify-between sm:justify-start gap-3 rounded-full bg-white hover:bg-[#FFF5F8] border-2 border-[#FF87B3] pl-6 pr-3.5 py-2.5 text-sm font-extrabold text-[#14213D] hover:text-[#D94D78] shadow-xs hover:shadow-[0_10px_25px_rgba(255,135,179,0.25)] transition-all group cursor-pointer w-full sm:w-auto"
            >
              View all departments
              <div className="w-7 h-7 rounded-full bg-[#FFF5F8] border border-[#FF87B3] flex items-center justify-center text-[#D94D78] group-hover:bg-[#D94D78] group-hover:text-white transition-all duration-300">
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
              </div>
            </Link>
          </motion.div>
        </motion.div>

        {/* Cards grid with stagger */}
        <motion.div
          variants={staggerContainer(0.08, 0.1)}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="grid gap-5 sm:gap-6 md:gap-7 md:grid-cols-2 xl:grid-cols-3"
        >
          {departments.slice(0, 6).map((d, index) => {
            const num = String(index + 1).padStart(2, "0");
            const illustrationSrc = deptIllustrations[d.id] || deptImages[d.id];

            return (
              <motion.div key={d.id} variants={scaleIn}>
                <TiltCard>
                  <Link
                    to={d.route}
                    className="group relative overflow-hidden rounded-[24px] sm:rounded-[32px] border border-[#FCE7F0] bg-white shadow-[0_4px_24px_rgba(244,63,94,0.06)] hover:shadow-[0_16px_36px_rgba(244,63,94,0.13)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between p-5 sm:p-7 min-h-[280px] sm:min-h-[300px]"
                  >
                    {/* Top Row: Left Icon & Dots, Right Number Badge */}
                    <div className="flex items-start justify-between relative z-10">
                      {/* Left: Dot Pattern + Circular Pink Icon */}
                      <div className="relative">
                        {/* 3x3 Pink Dots */}
                        <div className="absolute -top-1 -left-1 grid grid-cols-3 gap-1 opacity-70 pointer-events-none">
                          {[...Array(9)].map((_, i) => (
                            <span key={i} className="w-1 h-1 rounded-full bg-[#FBA9C5]" />
                          ))}
                        </div>

                        {/* Circular Icon Badge */}
                        <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-gradient-to-tr from-[#E11D48] to-[#F43F5E] text-white flex items-center justify-center shadow-md shadow-pink-500/20 group-hover:scale-110 transition-transform duration-300 relative z-10 mt-1 ml-1">
                          <d.icon className="w-4 h-4 sm:w-5 sm:h-5 text-white" strokeWidth={2.2} />
                        </div>
                      </div>

                      {/* Right: Number Badge (01, 02, etc.) */}
                      <div className="flex flex-col items-center">
                        <span className="text-[#E11D48] font-bold text-xs sm:text-sm tracking-tight leading-none px-2.5 py-1 rounded-full bg-[#FFF0F4]">
                          {num}
                        </span>
                        <span className="w-4 h-[2px] bg-[#E11D48] rounded-full mt-1" />
                      </div>
                    </div>

                    {/* Middle: Title with Short Pink Underline & Description */}
                    <div className="mt-4 mb-2 relative z-10 max-w-[62%] sm:max-w-[210px]">
                      <h3 className="text-lg sm:text-[22px] font-bold text-[#14213D] tracking-tight font-display">
                        {d.name}
                      </h3>
                      <div className="w-7 h-[2.5px] bg-[#E11D48] rounded-full mt-1.5 mb-2 sm:mb-2.5" />
                      <p className="text-slate-600 text-xs sm:text-[14px] leading-relaxed font-normal">
                        {d.short}
                      </p>
                    </div>

                    {/* Bottom: Explore Department CTA */}
                    <div className="mt-3 sm:mt-4 relative z-10">
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-[#E11D48] bg-white px-3.5 sm:px-4 py-1.5 text-[11.5px] sm:text-[12.5px] font-semibold text-[#E11D48] group-hover:bg-[#E11D48] group-hover:text-white transition-all duration-300 shadow-xs">
                        Explore Department
                        <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                      </span>
                    </div>

                    {/* Right-Side Line Art Illustration with Botanical Base */}
                    <div className="absolute right-0 sm:right-1 bottom-0 w-[48%] sm:w-[52%] h-[82%] sm:h-[88%] pointer-events-none flex items-end justify-end overflow-hidden select-none z-0">
                      <img
                        src={illustrationSrc}
                        alt={d.name}
                        loading="eager"
                        className="w-full h-full object-contain object-bottom transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                  </Link>
                </TiltCard>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

// ─── Fertility highlight ──────────────────────────────────────────────────────
function FertilityHighlight() {
  return (
    <section className="pt-2 pb-6 lg:pt-3 lg:pb-8 bg-[#FFF5F8]">
      <div className="container-page max-w-7xl mx-auto">
        <div className="bg-white rounded-[1.75rem] md:rounded-[2.5rem] shadow-[0_8px_30px_rgba(255,135,179,0.30)] overflow-hidden flex flex-col md:flex-row border border-[#FF87B3]">
          {/* Left: Image */}
          <motion.div
            variants={fadeLeft}
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            className="w-full md:w-1/2 p-3 sm:p-5 flex items-center justify-center bg-[#FFF5F8]/50 self-stretch overflow-hidden"
          >
            <motion.img
              src={ivfLabImg}
              alt="Fertility & IVF Centre"
              whileHover={{ scale: 1.04 }}
              transition={{ type: "spring", stiffness: 180, damping: 25 }}
              className="w-full h-56 sm:h-72 md:h-full md:min-h-[380px] md:max-h-[520px] object-cover object-center rounded-2xl"
            />
          </motion.div>

          {/* Right: Content */}
          <motion.div
            variants={staggerContainer(0.1, 0.2)}
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            className="w-full md:w-1/2 p-5 sm:p-8 lg:p-10 flex flex-col justify-center"
          >
            <motion.div
              variants={fadeUp}
              className="self-start inline-flex items-center rounded-full bg-[#FF87B3]/25 border border-[#FF87B3] px-3.5 py-1.5 text-[11px] font-bold tracking-widest text-[#D94D78] uppercase mb-4"
            >
              Fertility &amp; IVF Centre
            </motion.div>
            <motion.h2
              variants={fadeUp}
              className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#14213D] font-display tracking-tight leading-tight mb-3"
            >
              Where the science of fertility meets a very human kind of hope.
            </motion.h2>
            <motion.p variants={fadeUp} className="text-slate-600 font-medium leading-relaxed text-sm md:text-base mb-6">
              Our dedicated fertility unit combines internationally-trained expertise with the
              ethics, transparency and warmth families deserve on this journey.
            </motion.p>

            <motion.ul variants={staggerContainer(0.07)} className="space-y-3 mb-6">
              {[
                "Personalised fertility evaluation for both partners",
                "IUI, IVF and ICSI cycles with clear cost counselling",
                "Reproductive endocrinology & hormonal management",
                "Ongoing emotional support for every couple",
              ].map((text, i) => (
                <motion.li key={i} variants={fadeUp} className="flex items-start gap-3.5">
                  <span className="mt-2 w-2 h-2 rounded-full bg-[#FF87B3] border border-[#f06a99] shrink-0 shadow-sm" />
                  <span className="text-slate-700 font-medium text-xs sm:text-sm leading-relaxed">{text}</span>
                </motion.li>
              ))}
            </motion.ul>

            <motion.div variants={fadeUp} className="self-stretch sm:self-start">
              <Link
                to="/fertility-centre"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#FF87B3] via-[#ff9ec2] to-[#D94D78] border border-[#e86595] px-6 sm:px-8 py-3.5 sm:py-4 text-sm font-extrabold text-[#14213D] shadow-lg shadow-pink-400/30 hover:shadow-pink-400/50 transition-all group cursor-pointer w-full sm:w-auto"
              >
                Explore Fertility Centre
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── Doctors preview ──────────────────────────────────────────────────────────
function DoctorsPreview() {
  return (
    <section className="pt-4 pb-6 lg:pt-6 lg:pb-8 bg-[#FFF8FA] relative overflow-hidden">
      {/* Decorative ambient background glows */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full bg-[#FF87B3]/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[450px] h-[450px] rounded-full bg-[#FF87B3]/10 blur-[100px] pointer-events-none" />

      <div className="container-page relative z-10">
        {/* Header */}
        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 md:mb-10"
        >
          <div className="max-w-xl">
            <motion.div
              variants={fadeUp}
              className="inline-flex items-center gap-2 rounded-full bg-white/90 backdrop-blur-md border border-[#FF87B3] px-4 py-1.5 text-xs font-extrabold tracking-widest text-[#D94D78] uppercase mb-3.5 shadow-2xs cursor-default"
            >
              <Stethoscope className="w-3.5 h-3.5 text-[#D94D78]" />
              Our Specialists
            </motion.div>
            <motion.h2
              variants={fadeUp}
              className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-[1.12] mb-3 tracking-tight text-[#14213D]"
            >
              Meet the doctors families{" "}
              <span className="text-[#D94D78]">
                in Thillainagar trust.
              </span>
            </motion.h2>
            <motion.div
              variants={fadeUp}
              className="w-14 h-1.5 bg-gradient-to-r from-[#FF87B3] to-[#D94D78] rounded-full mb-3.5"
            />
            <motion.p variants={fadeUp} className="text-sm sm:text-base text-slate-600 leading-relaxed font-medium">
              A close-knit team of consultants across gynaecology, fertility,
              <br className="hidden md:block" /> general medicine, surgery and other specialities.
            </motion.p>
          </div>
          <motion.div variants={fadeUp} className="shrink-0 w-full sm:w-auto">
            <Link
              to="/doctors"
              className="inline-flex items-center justify-between sm:justify-start gap-3 rounded-full bg-white hover:bg-[#FFF5F8] border-2 border-[#FF87B3] pl-6 pr-3.5 py-2.5 text-sm font-extrabold text-[#14213D] hover:text-[#D94D78] shadow-xs hover:shadow-[0_10px_25px_rgba(255,135,179,0.25)] transition-all group cursor-pointer w-full sm:w-auto"
            >
              All doctors
              <div className="w-7 h-7 rounded-full bg-[#FFF5F8] border border-[#FF87B3] flex items-center justify-center text-[#D94D78] group-hover:bg-[#D94D78] group-hover:text-white transition-all duration-300">
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
              </div>
            </Link>
          </motion.div>
        </motion.div>

        {/* Cards with stagger */}
        <motion.div
          variants={staggerContainer(0.08, 0.1)}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 items-stretch"
        >
          {doctors.map((d, index) => (
            <motion.div key={d.id} variants={scaleIn} className="flex h-full w-full">
              <DoctorCard doctor={d} index={index} className="w-full" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── Testimonials carousel ────────────────────────────────────────────────────
function TestimonialsPreview() {
  const deptColors: Record<string, string> = {
    "Fertility Centre": "bg-[#FF87B3]/30 text-[#D94D78] border border-[#FF87B3]",
    Maternity: "bg-purple-100 text-purple-700",
    "Diabetes Care": "bg-blue-100 text-blue-700",
    Gynaecology: "bg-rose-100 text-rose-700",
    "Respiratory Care": "bg-teal-100 text-teal-700",
  };
  const avatarColors = [
    "from-[#FF87B3] to-[#f06a99] text-[#14213D]",
    "from-violet-400 to-purple-500 text-white",
    "from-blue-400 to-cyan-500 text-white",
    "from-emerald-400 to-teal-500 text-white",
    "from-amber-400 to-orange-500 text-white",
    "from-fuchsia-400 to-pink-500 text-white",
  ];

  const items = testimonials.slice(0, 6);
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const go = useCallback(
    (idx: number) => {
      setDirection(idx > active ? 1 : -1);
      setActive(idx);
    },
    [active],
  );
  const next = useCallback(() => go((active + 1) % items.length), [active, go, items.length]);
  const prev = useCallback(
    () => go((active - 1 + items.length) % items.length),
    [active, go, items.length],
  );

  // Auto-advance every 5s
  useEffect(() => {
    timerRef.current = setTimeout(next, 5000);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [active, next]);

  const t = items[active];

  const slideVariants = {
    enter: (dir: number) => ({ opacity: 0, x: dir > 0 ? 60 : -60 }),
    center: {
      opacity: 1,
      x: 0,
      transition: { type: "spring" as const, stiffness: 280, damping: 26 },
    },
    exit: (dir: number) => ({ opacity: 0, x: dir > 0 ? -40 : 40, transition: { duration: 0.2 } }),
  };

  return (
    <section className="relative pt-6 pb-6 lg:pt-8 lg:pb-8 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#FFF5F8] via-[#fffcfd] to-[#f5f3ff]" />
      <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#FF87B3]/25 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-purple-200/30 blur-3xl pointer-events-none" />

      <div className="relative container-page max-w-4xl">
        {/* Header */}
        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="text-center mb-8 lg:mb-10"
        >
          <motion.div
            variants={scaleIn}
            className="inline-flex items-center gap-2 rounded-full bg-white border border-[#FF87B3] px-4 py-1.5 text-[11px] font-bold tracking-widest text-[#D94D78] uppercase mb-4 shadow-sm"
          >
            <Heart className="w-3.5 h-3.5 fill-current text-[#D94D78]" />
            Family Stories
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#14213D] font-display tracking-tight mb-4"
          >
            Care that families take the
            <br className="hidden md:block" /> time to write about.
          </motion.h2>
          <motion.p variants={fadeUp} className="text-slate-600 font-medium max-w-xl mx-auto text-sm sm:text-base">
            A few notes from the mothers, fathers and patients we have had the privilege of caring
            for.
          </motion.p>

          {/* Rating badge */}
          <motion.div
            variants={scaleIn}
            className="inline-flex items-center gap-3 sm:gap-4 mt-6 bg-white border border-[#FF87B3] rounded-2xl px-4 sm:px-6 py-3.5 sm:py-4 shadow-[0_8px_30px_rgba(255,135,179,0.30)]"
          >
            <div className="text-left">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#14213D]">4.6</div>
              <div className="text-[11px] sm:text-xs text-slate-500 font-medium">out of 5</div>
            </div>
            <div className="w-px h-8 sm:h-10 bg-pink-100" />
            <div>
              <div className="flex gap-0.5 mb-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${s <= 4 ? "text-amber-400 fill-current" : "text-amber-300 fill-current"}`}
                  />
                ))}
              </div>
              <div className="text-[11px] sm:text-xs text-slate-600 font-medium">Based on 92+ reviews</div>
            </div>
          </motion.div>
        </motion.div>

        {/* Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={{ type: "spring", stiffness: 60, damping: 18 }}
          className="relative"
        >
          <div className="overflow-hidden rounded-2xl sm:rounded-3xl">
            <AnimatePresence custom={direction} mode="wait">
              <motion.figure
                key={t.id}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="bg-white border border-[#FF87B3] rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-10 flex flex-col shadow-lg shadow-pink-200/30"
              >
                {/* Top row */}
                <div className="flex items-start justify-between mb-4 sm:mb-6">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br from-[#FF87B3] to-[#D94D78] flex items-center justify-center shadow-md text-white">
                    <Quote className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
                  </div>
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${deptColors[t.department] || "bg-slate-100 text-slate-600"}`}
                  >
                    {t.department}
                  </span>
                </div>

                {/* Quote */}
                <blockquote className="text-sm sm:text-[15px] md:text-base leading-relaxed text-slate-600 flex-1 mb-6 sm:mb-8 italic">
                  "{t.quote}"
                </blockquote>

                {/* Author */}
                <div className="flex flex-wrap sm:flex-nowrap items-center justify-between gap-3 sm:gap-4 pt-4 sm:pt-6 border-t border-pink-100">
                  <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                    <div
                      className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br ${avatarColors[active % avatarColors.length]} flex items-center justify-center text-xs sm:text-sm font-bold shadow-md shrink-0`}
                    >
                      {t.initials}
                    </div>
                    <div className="min-w-0">
                      <div className="font-bold text-sm sm:text-base text-[#14213D] truncate">{t.name}</div>
                      <div className="text-[11px] sm:text-xs text-slate-500 font-medium">
                        {t.city} · {t.date}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-0.5 shrink-0">
                    {Array.from({ length: 5 }).map((_, s) => (
                      <Star
                        key={s}
                        className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${s < t.rating ? "text-amber-400 fill-current" : "text-slate-200 fill-current"}`}
                      />
                    ))}
                  </div>
                </div>
              </motion.figure>
            </AnimatePresence>
          </div>

          {/* Prev / Next */}
          <button
            onClick={prev}
            aria-label="Previous testimonial"
            className="hidden md:flex absolute -left-4 lg:-left-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white border border-[#FF87B3] shadow-md items-center justify-center text-slate-700 hover:text-[#14213D] hover:bg-[#FFF5F8] transition-colors cursor-pointer z-10"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={next}
            aria-label="Next testimonial"
            className="hidden md:flex absolute -right-4 lg:-right-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white border border-[#FF87B3] shadow-md items-center justify-center text-slate-700 hover:text-[#14213D] hover:bg-[#FFF5F8] transition-colors cursor-pointer z-10"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </motion.div>

        {/* Dot navigation */}
        <div className="flex justify-center items-center gap-2 mt-5 sm:mt-6">
          <button
            onClick={prev}
            aria-label="Previous testimonial mobile"
            className="md:hidden p-1.5 text-slate-500 hover:text-[#D94D78]"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => go(i)}
              aria-label={`Go to testimonial ${i + 1}`}
              className={`rounded-full transition-all duration-300 cursor-pointer ${
                i === active
                  ? "w-6 h-2.5 bg-[#FF87B3] border border-[#f06a99]"
                  : "w-2.5 h-2.5 bg-slate-300 hover:bg-[#FF87B3]"
              }`}
            />
          ))}
          <button
            onClick={next}
            aria-label="Next testimonial mobile"
            className="md:hidden p-1.5 text-slate-500 hover:text-[#D94D78]"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
