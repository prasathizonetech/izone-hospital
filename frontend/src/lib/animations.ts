import { type Variants, type Transition } from "framer-motion";

// ─── Awwwards-Level Custom Easing & Transitions ─────────────────────────────
export const awwwardsEase: [number, number, number, number] = [0.22, 1, 0.36, 1];
export const springSmooth: Transition = { type: "spring", stiffness: 260, damping: 24 };
export const springGentle: Transition = { type: "spring", stiffness: 180, damping: 20 };
export const springBouncy: Transition = { type: "spring", stiffness: 350, damping: 18 };

export const viewportConfig = { once: true, margin: "-60px" };

// ─── Stagger Container Function & Object Hybrid ──────────────────────────────
export interface StaggerContainerFn {
  (staggerChildren?: number, delayChildren?: number): Variants;
  hidden: { opacity: number };
  show: { opacity: number; transition: { staggerChildren: number; delayChildren?: number } };
}

const baseStaggerFn = (staggerChildren = 0.08, delayChildren = 0.04): Variants => ({
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren,
      delayChildren,
    },
  },
});

export const staggerContainer = Object.assign(baseStaggerFn, {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.04,
    },
  },
}) as unknown as StaggerContainerFn & Variants;

export const staggerSlowContainer: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.08,
    },
  },
};

// ─── Fade & Slide Variants ──────────────────────────────────────────────────
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: awwwardsEase },
  },
};

export const fadeDown: Variants = {
  hidden: { opacity: 0, y: -24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: awwwardsEase },
  },
};

export const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -32 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.65, ease: awwwardsEase },
  },
};

export const fadeRight: Variants = {
  hidden: { opacity: 0, x: 32 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.65, ease: awwwardsEase },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

// ─── Scale & Mask Reveal Variants ───────────────────────────────────────────
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: awwwardsEase },
  },
};

export const scaleUpCard: Variants = {
  hidden: { opacity: 0, scale: 0.92, y: 20 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", stiffness: 220, damping: 20 },
  },
};

export const pageVariants: Variants = {
  initial: { opacity: 0, y: 8 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: awwwardsEase },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: { duration: 0.2, ease: "easeIn" },
  },
};

// Backwards compatibility aliases for existing imports
export const viewport = viewportConfig;
export const magneticButton = springSmooth;
