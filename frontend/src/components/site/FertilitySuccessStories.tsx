import React, { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Heart, Check, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

export interface SuccessStoryItem {
  id: string;
  quote: string;
  author: string;
  location: string;
}

export const SUCCESS_STORIES: SuccessStoryItem[] = [
  {
    id: "story-1",
    quote:
      "From our first consultation to holding our baby, the team was with us at every step. Their compassion, expertise and patience made all the difference.",
    author: "A & R",
    location: "Fertility Centre · Thillainagar",
  },
  {
    id: "story-2",
    quote:
      "We felt heard, understood and truly cared for. The doctors explained every step clearly and gave us the confidence to keep going. We are forever grateful.",
    author: "S & K",
    location: "Fertility Centre · Thillainagar",
  },
  {
    id: "story-3",
    quote:
      "After years of hope and waiting, our dream came true. Thank you for your kindness, support and never giving up on us.",
    author: "M & P",
    location: "Fertility Centre · Thillainagar",
  },
  {
    id: "story-4",
    quote:
      "The warmth, transparency and clinical excellence gave us tremendous confidence throughout our fertility journey. A blessing for our family.",
    author: "V & D",
    location: "Fertility Centre · Thillainagar",
  },
  {
    id: "story-5",
    quote:
      "Every member of the clinical and nursing staff treated us with genuine dignity, empathy and gentle encouragement. Truly grateful!",
    author: "K & T",
    location: "Fertility Centre · Thillainagar",
  },
];

export function FertilitySuccessStories() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const totalStories = SUCCESS_STORIES.length;

  // Auto-advance carousel smoothly every 3 seconds
  // Pause automatically when tab/window is hidden to save resources
  useEffect(() => {
    if (isPaused || shouldReduceMotion) return;

    let timer: ReturnType<typeof setInterval> | null = null;

    const startTimer = () => {
      timer = setInterval(() => {
        setDirection(1);
        setCurrentIndex((prev) => (prev + 1) % totalStories);
      }, 3000);
    };

    const stopTimer = () => {
      if (timer) clearInterval(timer);
    };

    const handleVisibility = () => {
      if (document.hidden) stopTimer();
      else startTimer();
    };

    if (!document.hidden) startTimer();
    document.addEventListener("visibilitychange", handleVisibility, { passive: true });

    return () => {
      stopTimer();
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [isPaused, shouldReduceMotion, totalStories]);

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + totalStories) % totalStories);
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % totalStories);
  };

  // Compute 3 visible cards in window for desktop/tablet
  const visibleCards = [
    SUCCESS_STORIES[currentIndex % totalStories],
    SUCCESS_STORIES[(currentIndex + 1) % totalStories],
    SUCCESS_STORIES[(currentIndex + 2) % totalStories],
  ];

  return (
    <section
      className="relative bg-gradient-to-b from-[#FFF5F8]/70 via-[#FFF9FB] to-white py-8 sm:py-10 lg:py-12 overflow-hidden border-t border-slate-100 select-none"
      aria-label="Patient Success Stories"
    >
      <div className="container-page relative z-10">
        <div className="grid gap-10 lg:grid-cols-12 items-center">
          {/* ── Left Column: Headline, Subtext, Badges & CTA (4 cols) ── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, type: "spring", stiffness: 60 }}
            className="lg:col-span-4 flex flex-col justify-center text-left z-10"
          >
            {/* Pink Badge */}
            <span className="inline-flex items-center rounded-full bg-[#FF87B3]/25 border border-[#FF87B3] px-3.5 py-1 text-xs font-bold tracking-widest text-[#D94D78] uppercase mb-4 w-max shadow-2xs">
              SUCCESS STORIES
            </span>

            {/* Main Headline */}
            <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-[#14213D] font-display tracking-tight leading-[1.14] mb-4">
              Hope, care and <br />
              <span className="text-[#14213D]">journeys shared.</span>
            </h2>

            {/* Paragraph Description */}
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6 max-w-sm font-medium">
              Every journey is unique and every story is precious. We thank our patients for trusting us
              and sharing their experiences.
            </p>

            {/* Verified Badge */}
            <div className="inline-flex items-center gap-1.5 bg-[#FFF5F8] border border-[#FF87B3] px-3.5 py-1.5 rounded-full text-xs font-bold text-[#D94D78] w-max mb-5 shadow-2xs">
              <Check className="w-3.5 h-3.5 text-[#D94D78]" strokeWidth={3.5} />
              <span>Shared with permission</span>
            </div>

            {/* CTA Button */}
            <motion.div
              whileHover={shouldReduceMotion ? undefined : { scale: 1.03, y: -1 }}
              whileTap={{ scale: 0.97 }}
              className="w-max"
            >
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#FF87B3] bg-white px-6 py-3.5 text-xs sm:text-sm font-extrabold text-[#14213D] hover:bg-[#FFF5F8] hover:border-[#D94D78] transition-all shadow-xs cursor-pointer"
              >
                <span>Read more stories</span>
                <ArrowRight className="w-4 h-4 text-[#14213D]" />
              </Link>
            </motion.div>
          </motion.div>

          {/* ── Right Column: Cards with 3D Carousel Transition & Pulsing Backdrop (8 cols) ── */}
          <div
            className="lg:col-span-8 relative flex flex-col items-center justify-center"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* ── Soft Pink Concentric Pulsing Circular Backdrop ── */}
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0 flex items-center justify-center select-none"
              aria-hidden="true"
            >
              {/* Outer soft ring */}
              <motion.div
                animate={
                  shouldReduceMotion
                    ? undefined
                    : {
                        scale: [1, 1.04, 1],
                        opacity: [0.25, 0.45, 0.25],
                      }
                }
                transition={{
                  duration: 5.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="w-[340px] sm:w-[420px] lg:w-[460px] h-[340px] sm:h-[420px] lg:h-[460px] rounded-full bg-[#FF87B3]/15 border border-[#FF87B3]/25"
              />

              {/* Middle concentric pulsing ring */}
              <motion.div
                animate={
                  shouldReduceMotion
                    ? undefined
                    : {
                        scale: [1, 1.03, 1],
                        opacity: [0.4, 0.65, 0.4],
                      }
                }
                transition={{
                  duration: 5.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.4,
                }}
                className="absolute w-[260px] sm:w-[320px] lg:w-[360px] h-[260px] sm:h-[320px] lg:h-[360px] rounded-full bg-[#FF87B3]/20 border border-[#FF87B3]/35"
              />

              {/* Core radiant glowing disc */}
              <motion.div
                animate={
                  shouldReduceMotion
                    ? undefined
                    : {
                        scale: [1, 1.02, 1],
                        opacity: [0.55, 0.8, 0.55],
                      }
                }
                transition={{
                  duration: 5.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.8,
                }}
                className="absolute w-[180px] sm:w-[220px] lg:w-[260px] h-[180px] sm:h-[220px] lg:h-[260px] rounded-full bg-gradient-to-tr from-[#FFA6C5]/40 via-[#FF87B3]/40 to-[#FFD1E0]/35 blur-md"
              />
            </div>

            {/* ── Carousel Slider Container with Left & Right Arrows ── */}
            <div className="relative z-10 w-full flex items-center justify-center">
              {/* Left Arrow Button */}
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous story"
                className="absolute -left-3 sm:-left-5 lg:-left-6 top-1/2 -translate-y-1/2 z-30 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#FF87B3] hover:bg-[#DE356A] text-white flex items-center justify-center shadow-[0_4px_14px_rgba(255,135,179,0.45)] transition-all duration-200 hover:scale-110 active:scale-95 cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
              </button>

              {/* Story Cards Track with 3D perspective transition */}
              <div
                className="w-full overflow-hidden px-1 py-4"
                style={{ perspective: 1200 }}
              >
                <AnimatePresence mode="popLayout" initial={false} custom={direction}>
                  <motion.div
                    key={currentIndex}
                    custom={direction}
                    variants={{
                      enter: (dir: number) => ({
                        opacity: 0,
                        x: dir > 0 ? 80 : -80,
                        rotateY: dir > 0 ? 18 : -18,
                        scale: 0.94,
                      }),
                      center: {
                        opacity: 1,
                        x: 0,
                        rotateY: 0,
                        scale: 1,
                      },
                      exit: (dir: number) => ({
                        opacity: 0,
                        x: dir > 0 ? -80 : 80,
                        rotateY: dir > 0 ? -18 : 18,
                        scale: 0.94,
                      }),
                    }}
                    initial={shouldReduceMotion ? { opacity: 0 } : "enter"}
                    animate={shouldReduceMotion ? { opacity: 1 } : "center"}
                    exit={shouldReduceMotion ? { opacity: 0 } : "exit"}
                    transition={{
                      duration: 0.65,
                      ease: [0.25, 1, 0.5, 1],
                    }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6 items-stretch transform-gpu"
                  >
                    {visibleCards.map((story, idx) => {
                      const isCenter = idx === 1;
                      const responsiveClass =
                        idx === 0 ? "flex" : idx === 1 ? "hidden sm:flex" : "hidden lg:flex";

                      return (
                        <motion.div
                          key={`${story.id}-${idx}`}
                          whileHover={
                            shouldReduceMotion
                              ? undefined
                              : {
                                  y: -8,
                                  scale: 1.03,
                                  rotateY: isCenter ? 0 : idx === 0 ? 3 : -3,
                                  boxShadow: "0 24px 50px -10px rgba(255,135,179,0.42)",
                                }
                          }
                          transition={{ type: "spring", stiffness: 300, damping: 20 }}
                          className={`${responsiveClass} bg-white rounded-[24px] sm:rounded-[30px] border border-[#FF87B3]/40 p-5 sm:p-7 flex-col justify-between transition-all duration-300 cursor-default transform-gpu ${
                            isCenter
                              ? "shadow-[0_18px_42px_-8px_rgba(255,135,179,0.35)] border-[#FF87B3] lg:-translate-y-2"
                              : "shadow-[0_10px_28px_-6px_rgba(255,135,179,0.20)]"
                          }`}
                        >
                          <div>
                            {/* Top Heart Badge */}
                            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#FFF5F8] border border-[#FF87B3] flex items-center justify-center mb-3 sm:mb-4 mx-auto shadow-2xs">
                              <Heart className="w-4 h-4 text-[#D94D78] fill-[#FF87B3]" />
                            </div>

                            {/* Pink Quote Mark */}
                            <span
                              className="text-2xl sm:text-3xl font-serif text-[#FF87B3] opacity-65 leading-none select-none block mb-1 sm:mb-1.5 text-center"
                              aria-hidden="true"
                            >
                              “
                            </span>

                            {/* Testimonial Quote */}
                            <p className="text-[12.5px] sm:text-[13.5px] text-slate-700 leading-relaxed italic font-medium text-center">
                              {story.quote}
                            </p>
                          </div>

                          {/* Bottom Author Section */}
                          <div className="text-center mt-4 sm:mt-5">
                            <div className="w-px h-4 sm:h-5 bg-pink-100 mx-auto mb-2 sm:mb-3" />
                            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-[#FF87B3] bg-[#FFF5F8] flex items-center justify-center font-display text-[11px] sm:text-[12px] font-extrabold text-[#14213D] mx-auto mb-1.5 shadow-2xs">
                              {story.author}
                            </div>
                            <div className="text-[10px] sm:text-[11px] text-slate-400 font-semibold leading-none">
                              {story.location}
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Right Arrow Button */}
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next story"
                className="absolute -right-3 sm:-right-5 lg:-right-6 top-1/2 -translate-y-1/2 z-30 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#FF87B3] hover:bg-[#DE356A] text-white flex items-center justify-center shadow-[0_4px_14px_rgba(255,135,179,0.45)] transition-all duration-200 hover:scale-110 active:scale-95 cursor-pointer"
              >
                <ChevronRight className="w-5 h-5 stroke-[2.5]" />
              </button>
            </div>

            {/* ── Bottom Pagination Indicator Dots ── */}
            <div className="flex items-center justify-center gap-2 mt-6 z-20">
              {SUCCESS_STORIES.map((_, dotIdx) => {
                const isActive = dotIdx === currentIndex % totalStories;

                return (
                  <button
                    key={dotIdx}
                    type="button"
                    onClick={() => {
                      setDirection(dotIdx > currentIndex ? 1 : -1);
                      setCurrentIndex(dotIdx);
                    }}
                    aria-label={`Go to slide ${dotIdx + 1}`}
                    className={`transition-all duration-300 rounded-full cursor-pointer ${
                      isActive
                        ? "w-6 h-2.5 bg-[#FF87B3] shadow-xs"
                        : "w-2.5 h-2.5 bg-[#FF87B3]/35 hover:bg-[#FF87B3]/60"
                    }`}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
