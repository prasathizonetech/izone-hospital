import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logoAsset from "@/assets/izone-hospital-logo.png";

interface SplashScreenProps {
  onComplete: () => void;
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  const [phase, setPhase] = useState<"fade-in" | "loading" | "transition" | "done">("fade-in");
  const [targetRect, setTargetRect] = useState<{
    top: number;
    left: number;
    width: number;
    height: number;
  }>({
    top: 12,
    left: 16,
    width: 44,
    height: 44,
  });

  // Responsive center size state
  const [centerLogoSize, setCenterLogoSize] = useState<number>(140);
  const [windowDimensions, setWindowDimensions] = useState<{ width: number; height: number }>({
    width: typeof window !== "undefined" ? window.innerWidth : 1024,
    height: typeof window !== "undefined" ? window.innerHeight : 768,
  });

  // Robust measurement function for navbar target & screen dimensions
  const measure = useCallback(() => {
    if (typeof window === "undefined") return;

    const vw = window.innerWidth;
    const vh = window.innerHeight;
    setWindowDimensions({ width: vw, height: vh });

    // Adaptive logo sizing based on screen size:
    // Mobile (<640px): 110px - 125px
    // Tablet (<1024px): 135px - 145px
    // Laptop (<1440px): 160px
    // Desktop (>=1440px): 175px
    let dynamicSize = 160;
    if (vw < 480) {
      dynamicSize = Math.min(Math.max(Math.round(vw * 0.32), 108), 125);
    } else if (vw < 768) {
      dynamicSize = 135;
    } else if (vw < 1024) {
      dynamicSize = 145;
    } else if (vw < 1440) {
      dynamicSize = 160;
    } else {
      dynamicSize = 175;
    }
    setCenterLogoSize(dynamicSize);

    const isMobile = vw < 1024;
    const targetElement = isMobile
      ? document.getElementById("nav-logo-mobile")
      : document.getElementById("nav-logo-desktop");

    if (targetElement) {
      const rect = targetElement.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        setTargetRect({
          top: rect.top,
          left: rect.left,
          width: rect.width,
          height: rect.height,
        });
        return;
      }
    }

    // High accuracy fallback coordinates if header is not yet rendered or measured
    if (isMobile) {
      const padLeft = vw < 640 ? 12 : 20;
      const logoW = vw < 640 ? 36 : 44;
      const navH = vw < 640 ? 56 : 64;
      setTargetRect({
        top: Math.max((navH - logoW) / 2, 8),
        left: padLeft,
        width: logoW,
        height: logoW,
      });
    } else {
      const navH = vw >= 1536 ? 72 : vw >= 1280 ? 66 : 58;
      const logoW = vw >= 1536 ? 56 : vw >= 1280 ? 48 : 36;
      const padLeft = vw >= 1536 ? 24 : vw >= 1280 ? 20 : 10;
      setTargetRect({
        top: Math.max((navH - logoW) / 2, 8),
        left: padLeft,
        width: logoW,
        height: logoW,
      });
    }
  }, []);

  useEffect(() => {
    // 1. Lock scroll on html and body while splash screen is active
    const originalBodyOverflow = document.body.style.overflow;
    const originalHtmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    // Measure immediately and on subsequent frames
    measure();
    const frameId = requestAnimationFrame(measure);

    // ── Timeline (3.8s total duration) ──────────────
    // 0s – 0.55s: Smooth entrance
    const tFadeIn = setTimeout(() => {
      setPhase("loading");
    }, 550);

    // 0.55s – 3.0s: Circular loading ring animation
    // 3.0s: Precision morph & travel to navbar logo position + reveal site
    const tTransition = setTimeout(() => {
      measure();
      setPhase("transition");
    }, 3000);

    // 3.8s: Complete splash screen and cleanly hand off
    const tDone = setTimeout(() => {
      setPhase("done");
      document.body.style.overflow = originalBodyOverflow;
      document.documentElement.style.overflow = originalHtmlOverflow;
      onComplete();
    }, 3800);

    window.addEventListener("resize", measure, { passive: true });
    window.addEventListener("orientationchange", measure, { passive: true });

    return () => {
      cancelAnimationFrame(frameId);
      clearTimeout(tFadeIn);
      clearTimeout(tTransition);
      clearTimeout(tDone);
      window.removeEventListener("resize", measure);
      window.removeEventListener("orientationchange", measure);
      document.body.style.overflow = originalBodyOverflow;
      document.documentElement.style.overflow = originalHtmlOverflow;
    };
  }, [measure, onComplete]);

  if (phase === "done") return null;

  // Geometry for Circular Outer Loading Progress Ring
  // Dynamically scales with centerLogoSize with proportional padding
  const strokeWidth = centerLogoSize < 130 ? 3 : 3.5;
  const gap = centerLogoSize < 130 ? 10 : 13;
  const ringRadius = centerLogoSize / 2 + gap;
  const svgBoxSize = (ringRadius + strokeWidth + 6) * 2;
  const circumference = 2 * Math.PI * ringRadius;

  const isTransitioning = phase === "transition";

  // Center coordinates in viewport
  const centerTop = windowDimensions.height / 2 - centerLogoSize / 2;
  const centerLeft = windowDimensions.width / 2 - centerLogoSize / 2;

  return (
    <div
      className="fixed inset-0 z-[99999] pointer-events-none select-none overflow-hidden"
      style={{
        width: "100vw",
        height: "100vh",
        maxWidth: "100%",
        maxHeight: "100%",
      }}
    >
      {/* ── Solid White Screen Backdrop (fades smoothly 3s -> 3.8s) ── */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: isTransitioning ? 0 : 1 }}
        transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 bg-white will-change-opacity"
      />

      {/* ── Circular Loading Ring (Fades smoothly before transition) ── */}
      <AnimatePresence>
        {phase !== "transition" && (
          <motion.div
            key="loading-ring-container"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{
              opacity: phase === "loading" ? 1 : 0.35,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              scale: 0.88,
              transition: { duration: 0.3, ease: "easeOut" },
            }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none will-change-transform"
            style={{
              top: windowDimensions.height / 2,
              left: windowDimensions.width / 2,
              width: svgBoxSize,
              height: svgBoxSize,
            }}
          >
            <svg
              className="w-full h-full transform-gpu -rotate-90 block"
              viewBox={`0 0 ${svgBoxSize} ${svgBoxSize}`}
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="splashLoadingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FF87B3" />
                  <stop offset="50%" stopColor="#FB5783" />
                  <stop offset="100%" stopColor="#DE356A" />
                </linearGradient>
                <filter id="splashGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#FF87B3" floodOpacity="0.5" />
                </filter>
              </defs>

              {/* Background Track Circle */}
              <circle
                cx={svgBoxSize / 2}
                cy={svgBoxSize / 2}
                r={ringRadius}
                stroke="#FFE5EE"
                strokeWidth={strokeWidth}
                fill="none"
              />

              {/* Smooth Animated Loading Progress Stroke (0.55s to 3.0s = 2.45s) */}
              <motion.circle
                cx={svgBoxSize / 2}
                cy={svgBoxSize / 2}
                r={ringRadius}
                stroke="url(#splashLoadingGrad)"
                strokeWidth={strokeWidth + 0.6}
                strokeLinecap="round"
                fill="none"
                filter="url(#splashGlow)"
                strokeDasharray={circumference}
                initial={{ strokeDashoffset: circumference }}
                animate={
                  phase === "loading"
                    ? {
                        strokeDashoffset: 0,
                      }
                    : {
                        strokeDashoffset: circumference,
                      }
                }
                transition={{
                  duration: 2.45,
                  ease: "easeInOut",
                }}
              />
            </svg>

            {/* Concentric subtle decorative orbit ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 rounded-full border border-dashed border-[#FFCCD9]/60 pointer-events-none"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Single Smooth Responsive Logo Entity ── */}
      {/* Centered with exact coordinate math, flying straight to the navbar logo on all devices */}
      <motion.div
        initial={{
          top: centerTop,
          left: centerLeft,
          width: centerLogoSize,
          height: centerLogoSize,
          opacity: 0,
          scale: 0.92,
        }}
        animate={
          isTransitioning
            ? {
                top: targetRect.top,
                left: targetRect.left,
                width: targetRect.width,
                height: targetRect.height,
                opacity: 1,
                scale: 1,
              }
            : {
                top: centerTop,
                left: centerLeft,
                width: centerLogoSize,
                height: centerLogoSize,
                opacity: 1,
                scale: 1,
              }
        }
        transition={
          isTransitioning
            ? {
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1], // Smooth organic deceleration
              }
            : {
                opacity: { duration: 0.5, ease: "easeOut" },
                scale: { duration: 0.5, ease: "easeOut" },
              }
        }
        className="fixed z-[100000] rounded-full overflow-hidden flex items-center justify-center pointer-events-none will-change-transform"
        style={{
          boxShadow: isTransitioning
            ? "0 2px 8px rgba(255,135,179,0.12)"
            : "0 14px 40px rgba(255,135,179,0.28)",
          backgroundColor: "#ffffff",
          border: isTransitioning ? "1px solid #FFCCD9" : "2px solid #FFCCD9",
        }}
      >
        <img
          src={logoAsset}
          alt="Izone Hospital Logo"
          className="w-full h-full object-contain rounded-full transform-gpu select-none"
          loading="eager"
          fetchPriority="high"
        />
      </motion.div>
    </div>
  );
}
