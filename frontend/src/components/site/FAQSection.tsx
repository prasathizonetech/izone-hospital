import React, { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { HelpCircle, Plus, Minus } from "lucide-react";
import faqConsultation from "@/assets/faq/faq-consultation.jpg";
import faqManyata from "@/assets/faq/faq-manyata.jpg";
import faqEmergency from "@/assets/faq/faq-emergency.jpg";
import faqDiagnostics from "@/assets/faq/faq-diagnostics.jpg";

export interface FAQItem {
  id: string;
  title: string;
  answer: string;
  image: string;
  imageAlt: string;
  badge?: string;
}

export const FAQ_ITEMS: FAQItem[] = [
  {
    id: "appointment",
    title: "Do I need an appointment for a consultation?",
    answer:
      "Appointments help us give you the time and care you deserve. Book ahead for a planned consultation, or contact our team if you need guidance.",
    image: faqConsultation,
    imageAlt: "Doctor consulting with expectant mother in a modern clinic room",
    badge: "FAQ",
  },
  {
    id: "manyata",
    title: "Are you a Manyata-certified maternity hospital?",
    answer:
      "Yes. Our maternity services follow recognised clinical standards and are supported by experienced doctors, nurses, and care teams.",
    image: faqManyata,
    imageAlt: "Doctor and nurse supporting a new mother holding her newborn in a maternity ward",
    badge: "FAQ",
  },
  {
    id: "emergency",
    title: "Do you offer emergency care?",
    answer:
      "Our team is available to guide you during urgent situations. Contact the hospital immediately for emergency support and arrival instructions.",
    image: faqEmergency,
    imageAlt: "Doctor and nurse providing immediate hospital care to an expectant mother",
    badge: "FAQ",
  },
  {
    id: "diagnostics",
    title: "Do you have in-house diagnostics?",
    answer:
      "Yes. Our in-house diagnostic services help support faster consultations, accurate reports, and coordinated care.",
    image: faqDiagnostics,
    imageAlt: "Medical specialists reviewing diagnostic imaging on a digital tablet in a laboratory",
    badge: "FAQ",
  },
];

export function FAQSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const shouldReduceMotion = useReducedMotion();
  const activeItem = FAQ_ITEMS[activeIndex] || FAQ_ITEMS[0];

  return (
    <section
      id="faq-section"
      aria-label="Frequently Asked Questions"
      className="relative bg-[#FFF9FB] py-12 md:py-16 lg:py-20 border-t border-[#F28BB3]/30 overflow-hidden"
    >
      {/* Background Soft Glow Accents */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/4 h-96 w-96 rounded-full bg-[#F28BB3]/15 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 right-1/4 h-96 w-96 rounded-full bg-[#F28BB3]/10 blur-3xl"
      />

      <div className="container-page relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-14">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#F28BB3]/20 border border-[#F28BB3] px-3.5 py-1 text-xs font-bold tracking-widest text-[#D94D78] uppercase mb-3 shadow-2xs">
            <HelpCircle className="w-3.5 h-3.5 text-[#D94D78]" />
            FAQ &amp; PATIENT SUPPORT
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#102A52] font-display tracking-tight leading-tight mb-3">
            Common questions, honestly answered.
          </h2>
          <p className="text-slate-600 text-sm md:text-base leading-relaxed max-w-2xl mx-auto font-medium">
            Everything you need to know about our consultations, Manyata-certified maternity care, 24/7 urgent support, and in-house diagnostic services.
          </p>
          <div className="flex items-center justify-center gap-1.5 mt-3">
            <div className="w-12 h-1 bg-[#F28BB3] rounded-full" />
            <div className="w-1.5 h-1.5 bg-[#F28BB3] rounded-full" />
          </div>
        </div>

        {/* Two-Column Layout */}
        <div className="grid lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          {/* ── Left Column: Answer & Image Panel (6 cols) ── */}
          <div className="lg:col-span-6 flex flex-col">
            <motion.div
              layout
              id="faq-answer-panel"
              role="region"
              aria-live="polite"
              aria-labelledby={`faq-question-${activeIndex}`}
              className="relative w-full overflow-hidden rounded-[20px] sm:rounded-[24px] border border-[#F28BB3]/30 bg-[#0A1E3F] shadow-[0_16px_36px_-12px_rgba(10,30,63,0.25)] transition-all duration-300 flex flex-col"
            >
              {/* Fitted Card Image - Full 4:3 Aspect Ratio for Complete Visibility */}
              <div className="relative w-full aspect-[4/3] overflow-hidden bg-slate-900 shrink-0">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeItem.id}
                    src={activeItem.image}
                    alt={activeItem.imageAlt}
                    initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 1.01 }}
                    animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, scale: 1 }}
                    exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.99 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className="w-full h-full object-cover object-center"
                    loading="lazy"
                  />
                </AnimatePresence>
              </div>

              {/* Reduced Compact Navy Answer Content Block */}
              <div className="p-3.5 sm:p-4 md:p-4.5 text-white flex flex-col justify-start">
                {/* Pink FAQ Badge */}
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#FF87B3] text-[#0A1E3F] font-extrabold text-[10px] sm:text-[10.5px] uppercase tracking-wide shadow-xs">
                    <HelpCircle className="w-3 h-3 text-[#0A1E3F] stroke-[2.5]" />
                    FAQ
                  </span>
                </div>

                {/* Selected Question Heading */}
                <AnimatePresence mode="wait">
                  <motion.h3
                    key={activeItem.id + "-heading"}
                    initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 4 }}
                    animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                    exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -4 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    className="font-display text-[15px] sm:text-[17px] md:text-[18px] font-extrabold text-white leading-snug tracking-tight mb-1.5"
                  >
                    {activeItem.title}
                  </motion.h3>
                </AnimatePresence>

                {/* Answer Text */}
                <AnimatePresence mode="wait">
                  <motion.p
                    key={activeItem.id + "-answer"}
                    initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 4 }}
                    animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                    exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -4 }}
                    transition={{ duration: 0.2, delay: 0.04, ease: "easeInOut" }}
                    className="text-slate-200 text-[12.5px] sm:text-[13px] md:text-[13.5px] leading-relaxed font-normal"
                  >
                    {activeItem.answer}
                  </motion.p>
                </AnimatePresence>
              </div>
            </motion.div>
          </div>

          {/* ── Right Column: 4 Compact Accordion Question Cards (6 cols) ── */}
          <div className="lg:col-span-6 flex flex-col justify-center gap-2.5 sm:gap-3">
            {FAQ_ITEMS.map((item, idx) => {
              const isActive = activeIndex === idx;

              return (
                <button
                  key={item.id}
                  id={`faq-question-${idx}`}
                  type="button"
                  aria-expanded={isActive}
                  aria-controls="faq-answer-panel"
                  onClick={() => setActiveIndex(idx)}
                  className={`group relative w-full text-left p-3.5 sm:p-4 rounded-[16px] sm:rounded-[18px] border transition-all duration-200 ease-in-out cursor-pointer flex items-center justify-between gap-3 select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F28BB3] focus-visible:ring-offset-2 ${
                    isActive
                      ? "bg-[#FFF0F5] border-[#F28BB3] shadow-[0_4px_16px_-2px_rgba(242,139,179,0.30)] ring-1.5 ring-[#F28BB3]/50"
                      : "bg-white border-[#F28BB3]/40 hover:border-[#F28BB3] hover:bg-[#FFF9FB] shadow-[0_2px_6px_rgba(0,0,0,0.02)]"
                  }`}
                >
                  <div className="flex-1 pr-2">
                    <span
                      className={`font-display text-[14px] sm:text-[15px] font-extrabold leading-snug transition-colors duration-200 ${
                        isActive ? "text-[#0A1E3F]" : "text-[#14213D] group-hover:text-[#D94D78]"
                      }`}
                    >
                      {item.title}
                    </span>
                  </div>

                  {/* Plus / Minus Indicator Icon */}
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border transition-all duration-200 ease-in-out ${
                      isActive
                        ? "bg-[#FF87B3] border-[#FF87B3] text-[#0A1E3F] shadow-xs"
                        : "bg-[#FFF0F5] border-[#FF87B3]/60 text-[#D94D78] group-hover:bg-[#FF87B3] group-hover:text-[#0A1E3F]"
                    }`}
                  >
                    {isActive ? (
                      <Minus className="w-3.5 h-3.5 stroke-[2.8]" />
                    ) : (
                      <Plus className="w-3.5 h-3.5 stroke-[2.8]" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

