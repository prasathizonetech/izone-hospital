import { Phone, MapPin, ArrowRight, Headphones } from "lucide-react";
import { hospital } from "@/data/hospital";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef } from "react";
import { fadeUp, fadeRight, staggerContainer, scaleIn, viewport } from "@/lib/animations";

// Magnetic anchor — subtle tracking effect on hover
function MagneticCard({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className: string;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 260, damping: 22 });
  const sy = useSpring(y, { stiffness: 260, damping: 22 });

  const onMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * 0.15);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.15);
  };
  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      style={{ x: sx, y: sy }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      whileHover={{ scale: 1.02, boxShadow: "0 10px 36px rgba(255,200,214,0.5)" }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className={className}
    >
      {children}
    </motion.a>
  );
}

export function CTASection() {
  return (
    <section className="pt-2 pb-8 lg:pt-2 lg:pb-10 bg-[#FFF5F8]">
      <div className="container-page max-w-6xl mx-auto">
        {/* Outer card */}
        <motion.div
          variants={scaleIn}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="relative overflow-hidden rounded-3xl bg-white shadow-[0_8px_40px_rgba(255,135,179,0.30)] border border-[#FF87B3]/60 px-5 py-7 sm:px-10 sm:py-10 md:px-12 md:py-10"
        >
          {/* Decorative pink blob */}
          <div className="absolute top-0 right-0 w-80 h-80 pointer-events-none opacity-60">
            <svg
              viewBox="0 0 320 320"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full"
            >
              <ellipse cx="260" cy="60" rx="180" ry="160" fill="#FFF5F8" />
              <ellipse cx="300" cy="100" rx="140" ry="120" fill="#FF87B3" />
            </svg>
          </div>

          <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1fr_360px] gap-6 md:gap-8 lg:gap-12 items-center">
            {/* ── LEFT: Text ── */}
            <motion.div
              variants={staggerContainer(0.1, 0.1)}
              initial="hidden"
              whileInView="show"
              viewport={viewport}
            >
              {/* Pill */}
              <motion.div
                variants={fadeUp}
                className="inline-flex items-center gap-2 rounded-full bg-[#FF87B3]/25 border border-[#FF87B3] px-3.5 py-1 sm:px-4 sm:py-1.5 text-[10px] sm:text-[11px] font-bold tracking-widest text-[#D94D78] uppercase mb-4"
              >
                <Headphones className="w-3.5 h-3.5 text-[#D94D78]" />
                Talk to a Specialist
              </motion.div>

              {/* Heading */}
              <motion.h2
                variants={fadeUp}
                className="font-display text-2xl sm:text-4xl md:text-5xl font-extrabold text-[#14213D] leading-[1.15] sm:leading-[1.1] mb-3"
              >
                Every consultation
                <br />
                begins with
                <br />
                <span className="text-[#D94D78]">listening.</span>
              </motion.h2>

              {/* Description */}
              <motion.p
                variants={fadeUp}
                className="text-slate-600 text-sm md:text-[15px] leading-relaxed mb-6 max-w-sm font-medium"
              >
                Call us and speak with our gynaecology, fertility, medicine, diabetes or respiratory
                specialists — we will guide you every step of the way.
              </motion.p>

              {/* Feature badge */}
              <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
                <div className="flex items-center gap-2.5 bg-[#FFF5F8] border border-[#FF87B3] rounded-xl px-4 py-2.5 text-[#14213D] text-sm font-semibold">
                  <MapPin className="w-4 h-4 text-[#D94D78] shrink-0" />
                  Thillainagar, Trichy
                </div>
              </motion.div>
            </motion.div>

            {/* ── RIGHT: Call card ── */}
            <motion.div
              variants={fadeRight}
              initial="hidden"
              whileInView="show"
              viewport={viewport}
              className="flex flex-col gap-4"
            >
              <MagneticCard
                href={`tel:${hospital.mobile}`}
                className="group flex items-center gap-4 bg-white border border-[#FF87B3] rounded-2xl px-5 py-5 shadow-[0_4px_20px_rgba(255,135,179,0.30)] hover:border-[#D94D78] transition-all duration-300"
              >
                {/* Icon */}
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#FF87B3] to-[#D94D78] flex items-center justify-center shrink-0 shadow-md text-white">
                  <Phone className="w-6 h-6" strokeWidth={2} />
                </div>
                {/* Text */}
                <div className="flex-1 min-w-0">
                  <div className="text-[10px] font-extrabold uppercase tracking-widest text-[#D94D78] mb-1">
                    Call us now
                  </div>
                  <div className="text-[17px] font-extrabold text-[#14213D] tracking-tight leading-tight">
                    {hospital.mobile}
                  </div>
                </div>
                {/* Arrow */}
                <ArrowRight className="w-5 h-5 text-[#D94D78] shrink-0 group-hover:translate-x-1 transition-transform" />
              </MagneticCard>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
