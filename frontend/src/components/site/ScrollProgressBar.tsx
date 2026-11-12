import { motion, useScroll, useSpring } from "framer-motion";

export function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 280,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#FF87B3] via-[#f06a99] to-[#D94D78] origin-left z-[100] shadow-[0_0_10px_rgba(255,135,179,0.8)] pointer-events-none"
      style={{ scaleX }}
      aria-hidden="true"
    />
  );
}
