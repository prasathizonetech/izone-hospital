import React, { useState, useEffect, useCallback, useRef } from "react";
import { Sparkles, Heart, ChevronRight, ChevronLeft } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import exterior from "@/assets/hospital-exterior.jpg";
import reception from "@/assets/gallery/gallery-reception.jpg";
import delivery from "@/assets/delivery-room.jpg";
import diagnostics from "@/assets/gallery/gallery-diagnostics.jpg";

interface GalleryCarouselItem {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  alt: string;
  badge: string;
  badgeColor: string;
  tag: string;
  objectPosition?: string;
}

const GALLERY_CAROUSEL_ITEMS: GalleryCarouselItem[] = [
  {
    id: "exterior",
    title: "Hospital Building Exterior",
    subtitle: "Modern multi-speciality medical campus in Thillainagar",
    image: exterior,
    alt: "Izone Hospital building facade",
    badge: "Hospital Campus",
    badgeColor: "#FB5783",
    tag: "Hospital",
    objectPosition: "object-center",
  },
  {
    id: "reception",
    title: "OPD Waiting Lounge",
    subtitle: "Comfortable, calm patient and family waiting area",
    image: reception,
    alt: "Hospital reception and waiting lounge",
    badge: "Warm Hospitality",
    badgeColor: "#DE356A",
    tag: "Reception",
    objectPosition: "object-[center_35%]",
  },
  {
    id: "delivery",
    title: "Modern Labour Suites",
    subtitle: "Hygienic, comfortable maternity delivery suites",
    image: delivery,
    alt: "Safe and modern labour suite for childbirth",
    badge: "Maternity Care",
    badgeColor: "#E6396B",
    tag: "Maternity",
    objectPosition: "object-center",
  },
  {
    id: "lab",
    title: "Advanced Diagnostic Lab",
    subtitle: "High-precision clinical laboratory & cleanroom",
    image: diagnostics,
    alt: "Clinical laboratory and diagnostic support",
    badge: "Advanced Tech",
    badgeColor: "#0284C7",
    tag: "Diagnostics",
    objectPosition: "object-[center_35%]",
  },
];

interface GalleryHeroCarouselProps {
  onSelectImage?: (img: { src: string; title: string; tag: string }) => void;
}

export function GalleryHeroCarousel({ onSelectImage }: GalleryHeroCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);

  const total = GALLERY_CAROUSEL_ITEMS.length;

  const nextSlide = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % total);
  }, [total]);

  const prevSlide = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Autoplay every 4.5 seconds when not paused
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 4500);
    return () => clearInterval(timer);
  }, [isPaused, nextSlide]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      prevSlide();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      nextSlide();
    }
  };

  // Helper to determine relative position offset (-1, 0, 1)
  const getCardOffset = (index: number) => {
    const diff = (index - activeIndex + total) % total;
    if (diff === 0) return 0; // Active (center)
    if (diff === 1) return 1; // Next (right)
    if (diff === total - 1) return -1; // Previous (left)
    return 2; // Hidden
  };

  return (
    <div
      ref={containerRef}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="region"
      aria-label="Gallery Hero Carousel"
      className="relative w-full flex flex-col items-center justify-center select-none outline-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* ── Cards 3D Perspective Stage ── */}
      <div
        className="relative w-full max-w-[640px] xl:max-w-[680px] h-[300px] sm:h-[380px] md:h-[430px] lg:h-[470px] xl:h-[490px] flex items-center justify-center overflow-hidden sm:overflow-visible"
        style={{ perspective: "1200px" }}
      >
        {GALLERY_CAROUSEL_ITEMS.map((item, idx) => {
          const offset = getCardOffset(idx);
          const isActive = offset === 0;
          const isRight = offset === 1;
          const isLeft = offset === -1;
          const isHidden = offset === 2;

          return (
            <motion.div
              key={item.id}
              animate={
                shouldReduceMotion
                  ? { opacity: isActive ? 1 : 0, scale: isActive ? 1 : 0.95 }
                  : {
                      x: isActive ? "0%" : isRight ? "33%" : isLeft ? "-33%" : "0%",
                      scale: isActive ? 1 : 0.88,
                      rotateY: isActive ? 0 : isRight ? 12 : isLeft ? -12 : 0,
                      rotateX: isActive ? 1 : 0,
                      opacity: isActive ? 1 : isHidden ? 0 : 0.65,
                      zIndex: isActive ? 30 : isHidden ? 0 : 10,
                      pointerEvents: isHidden ? "none" : "auto",
                    }
              }
              transition={{
                duration: 0.7,
                ease: [0.16, 1, 0.3, 1],
              }}
              onClick={() => {
                if (isActive && onSelectImage) {
                  onSelectImage({ src: item.image, title: item.title, tag: item.tag });
                } else {
                  setActiveIndex(idx);
                }
              }}
              className={`absolute top-0 w-[230px] sm:w-[320px] md:w-[360px] lg:w-[400px] xl:w-[420px] h-[290px] sm:h-[370px] md:h-[420px] lg:h-[460px] xl:h-[480px] rounded-[24px] sm:rounded-[36px] lg:rounded-[44px] p-2 sm:p-3 transition-shadow duration-500 cursor-pointer ${
                isActive
                  ? "border-2 sm:border-[3px] border-white bg-white/95 shadow-[0_16px_40px_rgba(200,40,90,0.20)]"
                  : isRight
                  ? "border-2 border-white/80 bg-white/70 backdrop-blur-sm shadow-[0_10px_25px_rgba(20,33,61,0.08)] hover:opacity-90"
                  : "border-2 border-white/80 bg-white/70 backdrop-blur-sm shadow-[0_10px_25px_rgba(20,33,61,0.08)] hover:opacity-90"
              }`}
            >
              {/* Image Container with Inner Curved Mask */}
              <div className="relative w-full h-full rounded-[24px] sm:rounded-[32px] lg:rounded-[36px] overflow-hidden group bg-slate-100">
                <motion.img
                  src={item.image}
                  alt={item.alt}
                  whileHover={shouldReduceMotion ? undefined : { scale: 1.04 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className={`w-full h-full object-cover select-none ${item.objectPosition || "object-center"}`}
                />

                {/* Top Subtle Pill Badge on Active Card */}
                {isActive && (
                  <div
                    className="absolute top-3.5 left-3.5 z-30 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-white text-xs font-extrabold shadow-xs flex items-center gap-1.5"
                    style={{ color: item.badgeColor }}
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{item.badge}</span>
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}

        {/* ── Floating Heart Badge near Center Card ── */}
        <motion.div
          animate={
            shouldReduceMotion
              ? undefined
              : {
                  y: [0, -6, 0],
                  rotate: [0, 3, 0, -3, 0],
                }
          }
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-3 right-[12%] sm:right-[15%] z-40 w-11 h-11 rounded-full bg-white/95 backdrop-blur-md border-2 border-white text-[#FB5783] shadow-[0_8px_20px_rgba(217,77,120,0.22)] flex items-center justify-center pointer-events-none"
        >
          <Heart className="w-5 h-5 text-[#FB5783] fill-[#FB5783]" />
        </motion.div>

        {/* ── Navigation Arrows (Left / Right) ── */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            prevSlide();
          }}
          aria-label="Previous slide"
          className="absolute left-1 sm:-left-3 top-1/2 -translate-y-1/2 z-40 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/90 backdrop-blur-md border border-[#FF87B3] text-[#FB5783] shadow-md flex items-center justify-center cursor-pointer hover:bg-[#FB5783] hover:text-white hover:scale-108 active:scale-95 transition-all duration-300"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            nextSlide();
          }}
          aria-label="Next slide"
          className="absolute right-1 sm:-right-3 top-1/2 -translate-y-1/2 z-40 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/90 backdrop-blur-md border border-[#FF87B3] text-[#FB5783] shadow-md flex items-center justify-center cursor-pointer hover:bg-[#FB5783] hover:text-white hover:scale-108 active:scale-95 transition-all duration-300"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* ── Carousel Progress Dots Below ── */}
      <div className="flex items-center gap-2 mt-4 z-30">
        {GALLERY_CAROUSEL_ITEMS.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setActiveIndex(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
              activeIndex === i
                ? "w-7 bg-[#FB5783] shadow-xs"
                : "w-2.5 bg-slate-300 hover:bg-[#FF87B3]"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
