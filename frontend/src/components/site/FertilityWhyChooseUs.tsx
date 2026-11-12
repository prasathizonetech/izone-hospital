import { useState } from "react";
import { Award, TestTubes, UserPlus, Baby, HeartHandshake, ShieldCheck, Heart } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    num: "01",
    title: "Expertise",
    description: "Experienced fertility specialists and a dedicated healthcare team.",
    icon: Award,
  },
  {
    num: "02",
    title: "Technology",
    description: "Advanced IVF technology and modern laboratory facilities.",
    icon: TestTubes,
  },
  {
    num: "03",
    title: "Personalization",
    description: "Customized treatment plans for every fertility journey.",
    icon: UserPlus,
  },
  {
    num: "04",
    title: "Complete Care",
    description: "Fertility, IVF, gynecology, and maternity care under one roof.",
    icon: Baby,
  },
  {
    num: "05",
    title: "Compassion",
    description: "Caring, respectful, and supportive treatment throughout the journey.",
    icon: HeartHandshake,
  },
  {
    num: "06",
    title: "Trust",
    description:
      "Ethical practices, quality treatment, transparent communication, and patient-first care.",
    icon: ShieldCheck,
  },
];

// Replicate array to create a seamless infinite loop
const carouselItems = [...features, ...features, ...features, ...features];

export function FertilityWhyChooseUs() {
  const [isPaused, setIsPaused] = useState(false);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white to-[#FFF5F8]/50 pt-4 pb-6 lg:pt-6 lg:pb-8">
      {/* Subtle background blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-[420px] h-[420px] rounded-full bg-[#FF87B3]/20 blur-[120px] -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-[360px] h-[360px] rounded-full bg-[#FFF5F8] blur-[100px] translate-y-1/3 -translate-x-1/4" />
      </div>

      <div className="relative z-10 w-full">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-6 px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#14213D] font-display tracking-tight mb-3"
          >
            Why Choose <span className="text-[#D94D78]">Us?</span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex justify-center mb-4"
          >
            <Heart className="w-4 h-4 text-[#FF87B3] fill-[#FF87B3]" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-base md:text-lg text-slate-500 leading-relaxed font-medium"
          >
            Advanced science, personalized treatment, and compassionate care for
            <br className="hidden sm:block" /> your journey to parenthood.
          </motion.p>
        </div>

        {/* ── Smooth Horizontal Continuous Carousel (Left to Right) ── */}
        <div
          className="relative w-full overflow-hidden py-4"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Edge Fade Gradients */}
          <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-28 bg-gradient-to-r from-white via-white/80 to-transparent z-20 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-28 bg-gradient-to-l from-white via-white/80 to-transparent z-20 pointer-events-none" />

          {/* Marquee Motion Strip: moves left to right (from -50% to 0%) */}
          <motion.div
            className="flex gap-5 w-max"
            animate={{
              x: isPaused ? undefined : ["-50%", "0%"],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 32,
                ease: "linear",
              },
            }}
            style={{ willChange: "transform" }}
          >
            {carouselItems.map((feature, idx) => (
              <div
                key={`${feature.num}-${idx}`}
                className="group relative flex-shrink-0 w-[230px] sm:w-[250px] md:w-[260px]
                           bg-white border border-[#FF87B3] rounded-3xl
                           shadow-[0_4px_24px_rgba(255,135,179,0.15)] hover:border-[#D94D78]
                           hover:shadow-[0_16px_36px_rgba(255,135,179,0.30)] hover:-translate-y-1.5
                           flex flex-col items-center text-center p-6
                           cursor-default select-none transition-all duration-300"
              >
                {/* Icon badge */}
                <div className="w-16 h-16 rounded-2xl bg-[#FFF5F8] border border-[#FF87B3] text-[#D94D78] flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110 group-hover:bg-[#FF87B3] group-hover:text-[#14213D]">
                  <feature.icon className="w-7 h-7" strokeWidth={1.8} />
                </div>

                {/* Title */}
                <h3 className="text-[15px] font-bold text-[#14213D] mb-2 leading-tight group-hover:text-[#D94D78] transition-colors">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-[12.5px] text-slate-500 leading-relaxed font-medium">
                  {feature.description}
                </p>

                {/* Subtle number watermark bottom-right */}
                <span className="absolute bottom-3 right-4 text-[10px] font-extrabold text-[#FF87B3] select-none">
                  {feature.num}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
