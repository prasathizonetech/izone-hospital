import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Heart, Star, ChevronLeft, ChevronRight, Check } from "lucide-react";
import { testimonials, reviewStats, type Testimonial } from "@/data/testimonials";

// Expanded curated patient reviews dataset for rich continuous scrolling
const EXTENDED_REVIEWS: Testimonial[] = [
  ...testimonials,
  {
    id: "t7",
    name: "Ananya & Deepak",
    city: "Thillainagar",
    rating: 5,
    department: "Maternity Care",
    date: "February 2025",
    quote:
      "Our delivery was handled with such warmth and calmness. The labour suite was spotless and the paediatric team was ready instantly. Truly blessed.",
    initials: "AD",
  },
  {
    id: "t8",
    name: "Dr. S. Ramanathan",
    city: "Trichy",
    rating: 5,
    department: "General Medicine",
    date: "January 2025",
    quote:
      "As a physician myself, I appreciate the clinical precision, clear communication, and ethical medical care provided to my family at Izone Hospital.",
    initials: "SR",
  },
];

export function PatientReviewsAutoScroll() {
  const [isPaused, setIsPaused] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  // Duplicate items array for seamless continuous infinite scroll loop
  const duplicatedReviews = [...EXTENDED_REVIEWS, ...EXTENDED_REVIEWS];

  return (
    <div
      className="relative w-full overflow-hidden py-2 select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* ── Left & Right Edge Gradient Fade Masks for smooth entrance & exit ── */}
      <div
        className="absolute left-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-r from-white via-white/80 to-transparent z-20 pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute right-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-l from-white via-white/80 to-transparent z-20 pointer-events-none"
        aria-hidden="true"
      />

      {/* ── Smooth Continuous Horizontal Auto-Scrolling Track (Left to Right) ── */}
      <motion.div
        className="flex gap-5 sm:gap-6 w-max py-4"
        animate={
          isPaused || shouldReduceMotion
            ? undefined
            : {
                x: ["-50%", "0%"],
              }
        }
        transition={{
          duration: 38,
          ease: "linear",
          repeat: Infinity,
        }}
      >
        {duplicatedReviews.map((story, idx) => (
          <motion.div
            key={`${story.id}-${idx}`}
            whileHover={
              shouldReduceMotion
                ? undefined
                : {
                    y: -6,
                    scale: 1.02,
                    boxShadow: "0 22px 45px -10px rgba(255,135,179,0.38)",
                  }
            }
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="bg-white rounded-[26px] sm:rounded-[30px] border border-[#FF87B3]/40 p-6 sm:p-7 flex flex-col justify-between shadow-[0_10px_28px_-6px_rgba(255,135,179,0.20)] hover:border-[#FF87B3] transition-all duration-300 w-[290px] sm:w-[320px] md:w-[340px] shrink-0 min-h-[300px] cursor-default"
          >
            <div>
              {/* Top Heart Badge matching Fertility Success Stories */}
              <div className="w-12 h-12 rounded-full bg-[#FFF5F8] border border-[#FF87B3] flex items-center justify-center mb-3.5 mx-auto shadow-2xs">
                <Heart className="w-4 h-4 text-[#D94D78] fill-[#FF87B3]" />
              </div>

              {/* Pink Serif Quote Mark */}
              <span
                className="text-3xl font-serif text-[#FF87B3] opacity-65 leading-none select-none block mb-1 text-center"
                aria-hidden="true"
              >
                “
              </span>

              {/* Patient Testimonial Quote */}
              <p className="text-[12.5px] sm:text-[13.5px] text-slate-700 leading-relaxed italic font-medium text-center line-clamp-4">
                {story.quote}
              </p>
            </div>

            {/* Bottom Patient Author Details */}
            <div className="text-center mt-5">
              <div className="w-px h-4 bg-pink-100 mx-auto mb-2.5" />
              <div className="w-10 h-10 rounded-full border border-[#FF87B3] bg-[#FFF5F8] flex items-center justify-center font-display text-[12px] font-extrabold text-[#14213D] mx-auto mb-1.5 shadow-2xs">
                {story.initials}
              </div>
              <div className="text-xs sm:text-[13px] font-extrabold text-[#14213D] leading-tight">
                {story.name}
              </div>
              <div className="text-[10px] sm:text-[11px] text-slate-400 font-semibold leading-none mt-1">
                {story.department} · {story.city}
              </div>
              {/* Star Rating */}
              <div className="flex items-center justify-center gap-0.5 text-amber-400 mt-2.5">
                {Array.from({ length: story.rating }).map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Subtle Bottom Status Indicator */}
      <div className="flex items-center justify-center gap-2 mt-2 text-[11px] text-slate-400 font-medium">
        <span className="w-1.5 h-1.5 rounded-full bg-[#FF87B3] animate-pulse" />
        <span>Continuous patient reviews · Hover over any card to pause</span>
      </div>
    </div>
  );
}
