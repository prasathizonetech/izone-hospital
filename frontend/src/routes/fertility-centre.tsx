import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Sparkles,
  ArrowRight,
  Calculator,
  HeartHandshake,
  Users,
  Baby,
  Heart,
  Plus,
  Stethoscope,
  Activity,
  Check,
  FlaskConical,
  Snowflake,
} from "lucide-react";
import fertilityImg from "@/assets/fertility-lab.jpg";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { FertilityHero } from "@/components/site/hero/FertilityHero";
import { FertilityWhyChooseUs } from "@/components/site/FertilityWhyChooseUs";
import { FertilitySuccessStories } from "@/components/site/FertilitySuccessStories";

export const Route = createFileRoute("/fertility-centre")({
  head: () => ({
    meta: [
      { title: "Fertility & IVF Centre — Izone Hospital" },
      {
        name: "description",
        content:
          "Comprehensive fertility care, IUI, IVF, ICSI, and reproductive medicine with compassionate counselling in Thillainagar.",
      },
      { property: "og:title", content: "Fertility Centre — Izone Hospital" },
      { property: "og:url", content: "/fertility-centre" },
    ],
    links: [{ rel: "canonical", href: "/fertility-centre" }],
  }),
  component: FertilityCentre,
});

// ─── Shared Framer Motion Animation Variants ───────────────────────────────
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

const fadeLeftVariant: Variants = {
  hidden: { opacity: 0, x: -30 },
  show: {
    opacity: 1,
    x: 0,
    transition: { type: "spring", stiffness: 55, damping: 16 },
  },
};

const treatmentsList = [
  {
    title: "Fertility Assessment",
    icon: Stethoscope,
    desc: "A thorough, respectful evaluation of both partners to understand your unique path to parenthood with clarity and care.",
  },
  {
    title: "Ovulation Induction",
    icon: Sparkles,
    desc: "Gentle medical support and regular ultrasound monitoring to encourage and track healthy egg release.",
  },
  {
    title: "IUI (Intrauterine Insemination)",
    icon: HeartHandshake,
    desc: "A simple, well-established procedure that places prepared sperm directly into the uterus at the optimal time.",
  },
  {
    title: "IVF (In Vitro Fertilisation)",
    icon: Baby,
    desc: "Advanced assisted reproduction in our certified laboratory, guided with transparency and personalised care.",
  },
  {
    title: "ICSI (Intracytoplasmic Sperm Injection)",
    icon: Plus,
    desc: "A specialised IVF technique where a single sperm is injected into an egg to support fertilisation in selected cases of male-factor infertility.",
  },
  {
    title: "Blastocyst Culture & Transfer",
    icon: FlaskConical,
    desc: "Advanced incubation up to Day 5 (blastocyst stage) to select the healthiest embryos with the highest implantation and pregnancy potential.",
  },
  {
    title: "Cryopreservation & Freezing",
    icon: Snowflake,
    desc: "State-of-the-art vitrification technology to safely freeze and preserve eggs, sperm, and embryos for future family planning cycles.",
  },
  {
    title: "Reproductive Endocrinology",
    icon: Activity,
    desc: "Expert care for hormonal imbalances and reproductive disorders to restore hormonal health and support fertility naturally.",
  },
  {
    title: "Emotional Support & Counselling",
    icon: Heart,
    desc: "Compassionate counselling and wellness support to help you navigate every step of your fertility journey.",
  },
];

function FertilityCentre() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <>
      {/* ── 1. Production-Ready 3D Carousel Fertility Hero ── */}
      <FertilityHero />

      {/* ── 2. Overview Section ── */}
      <section className="bg-white pt-6 pb-6 md:pt-8 md:pb-8 border-b border-slate-100 overflow-hidden relative">
        <div className="container-page grid gap-12 md:grid-cols-2 md:items-center">
          {/* Left Column: Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, type: "spring", stiffness: 60 }}
            className="relative group"
          >
            <div className="overflow-hidden rounded-[32px] border-4 border-white shadow-[0_15px_45px_rgba(255,135,179,0.30)] relative z-10">
              <motion.img
                src={fertilityImg}
                alt="Fertility consultation room"
                loading="lazy"
                width={1400}
                height={1000}
                whileHover={shouldReduceMotion ? undefined : { scale: 1.05 }}
                transition={{ duration: 0.65, ease: "easeOut" }}
                className="object-cover w-full h-auto transform-gpu"
              />
            </div>
          </motion.div>

          {/* Right Column: Text and 3 Cards */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
          >
            <motion.div
              variants={fadeLeftVariant}
              className="inline-flex items-center rounded-full bg-[#FF87B3]/25 border border-[#FF87B3] px-3.5 py-1 text-xs font-bold tracking-widest text-[#D94D78] uppercase mb-3 sm:mb-4 shadow-2xs"
            >
              Overview
            </motion.div>

            <motion.h2
              variants={fadeLeftVariant}
              className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-[#14213D] font-display tracking-tight leading-tight mb-3 sm:mb-4"
            >
              Fertility care that feels personal.
            </motion.h2>

            <motion.p
              variants={fadeLeftVariant}
              className="text-slate-600 text-xs sm:text-sm md:text-base leading-relaxed mb-6 sm:mb-8 max-w-xl font-medium"
            >
              Fertility care is deeply personal. We keep our consultations unhurried, our advice
              honest, and our door open. We empower you with clear explanations at every milestone.
            </motion.p>

            {/* 3 Grid Cards */}
            <motion.div variants={staggerContainer} className="grid gap-2.5 sm:gap-4 grid-cols-1 sm:grid-cols-3">
              {[
                { icon: <Users className="w-4.5 h-4.5 sm:w-5 sm:h-5" />, t: "Personalised evaluation" },
                { icon: <Calculator className="w-4.5 h-4.5 sm:w-5 sm:h-5" />, t: "Clear cost counselling" },
                { icon: <Heart className="w-4.5 h-4.5 sm:w-5 sm:h-5" />, t: "Support at every step" },
              ].map((r, i) => (
                <motion.div
                  key={i}
                  variants={fadeUpVariant}
                  whileHover={
                    shouldReduceMotion
                      ? undefined
                      : {
                          y: -6,
                          scale: 1.025,
                          boxShadow: "0 15px 30px -8px rgba(255,135,179,0.40)",
                        }
                  }
                  transition={{ type: "spring", stiffness: 280, damping: 20 }}
                  className="rounded-2xl border border-[#FF87B3] bg-white p-3.5 sm:p-5 flex sm:flex-col items-center sm:justify-center text-left sm:text-center gap-3 sm:gap-0 shadow-xs hover:border-[#D94D78] transition-all duration-300 cursor-default group"
                >
                  <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-[#FF87B3] bg-[#FFF5F8] flex items-center justify-center text-[#D94D78] sm:mb-3 shrink-0 group-hover:bg-[#FF87B3] group-hover:text-[#14213D] transition-colors duration-300 shadow-2xs">
                    {r.icon}
                  </div>
                  <div className="text-xs sm:text-xs font-extrabold text-[#14213D] leading-snug group-hover:text-[#D94D78] transition-colors">
                    {r.t}
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Button */}
            <motion.div variants={fadeUpVariant} className="mt-5">
              <motion.div
                whileHover={shouldReduceMotion ? undefined : { scale: 1.03, y: -1 }}
                whileTap={{ scale: 0.97 }}
                className="w-full sm:w-fit"
              >
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#FF87B3] bg-white px-6 py-3 text-xs md:text-sm font-extrabold text-[#14213D] hover:bg-[#FFF5F8] transition-all shadow-xs cursor-pointer w-full sm:w-auto"
                >
                  Explore our approach
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── 3. Treatments Section ── */}
      <section className="bg-gradient-to-b from-white via-[#FFF5F8]/40 to-white pt-6 pb-6 md:pt-8 md:pb-8 border-b border-slate-100 relative overflow-hidden">
        <div className="container-page relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
            <span className="inline-flex items-center rounded-full bg-[#FF87B3]/25 border border-[#FF87B3] px-3.5 py-1 text-xs font-bold tracking-widest text-[#D94D78] uppercase mb-4 shadow-2xs">
              Our Treatments
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-[#14213D] font-display tracking-tight leading-tight mb-3">
              A clear path forward, together.
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm md:text-base leading-relaxed max-w-2xl mx-auto font-medium">
              Evidence-based treatments and personalised care, designed around your unique journey
              to parenthood.
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
            {treatmentsList.map((t) => (
              <motion.div
                key={t.title}
                variants={fadeUpVariant}
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
                className="flex flex-col justify-between rounded-2xl sm:rounded-3xl border border-[#FF87B3] bg-white p-5 sm:p-7 md:p-8 shadow-xs hover:border-[#D94D78] transition-all duration-300 min-h-[200px] sm:min-h-[220px] group cursor-default"
              >
                <div>
                  <div className="flex items-center gap-3.5 sm:gap-4">
                    <motion.div
                      whileHover={shouldReduceMotion ? undefined : { scale: 1.15, rotate: 6 }}
                      transition={{ type: "spring", stiffness: 300, damping: 15 }}
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-[#FF87B3] bg-[#FFF5F8] flex items-center justify-center text-[#D94D78] shrink-0 group-hover:bg-[#FF87B3] group-hover:text-[#14213D] transition-colors duration-300 shadow-2xs"
                    >
                      <t.icon className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
                    </motion.div>
                    <h3 className="font-display text-base md:text-lg font-extrabold text-[#14213D] leading-tight group-hover:text-[#D94D78] transition-colors">
                      {t.title}
                    </h3>
                  </div>
                  <p className="mt-3 sm:mt-4 text-xs md:text-sm text-slate-600 leading-relaxed font-medium">
                    {t.desc}
                  </p>
                </div>

                <div className="flex justify-end mt-4">
                  <Link
                    to="/contact"
                    className="w-8 h-8 rounded-full bg-[#FFF5F8] border border-[#FF87B3] flex items-center justify-center text-[#D94D78] hover:bg-[#FF87B3] hover:text-[#14213D] transition-colors shadow-2xs group-hover:scale-108 cursor-pointer"
                    aria-label={`Enquire about ${t.title}`}
                  >
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── 4. Why Choose Us Section ── */}
      <FertilityWhyChooseUs />

      {/* ── 5. Success Stories Section ── */}
      <FertilitySuccessStories />
    </>
  );
}
