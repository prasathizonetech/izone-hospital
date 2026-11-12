import { ShieldCheck, Clock, HeartHandshake } from "lucide-react";

const features = [
  {
    title: "Manyata Certified",
    description: "Recognized for excellence and safety in maternity and fertility care standards.",
    icon: ShieldCheck,
  },
  {
    title: "24×7 Emergency Support",
    description:
      "Round-the-clock rapid response teams available for obstetric and medical emergencies.",
    icon: Clock,
  },
  {
    title: "Compassion First",
    description:
      "Patient-first ethical care where you are treated like family, not just a case file.",
    icon: HeartHandshake,
  },
];

export function TrustSection() {
  return (
    <section className="relative py-12 lg:py-20 bg-gradient-to-b from-white to-[#FFF5F8]/50 overflow-hidden">
      {/* Decorative background blurs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -left-20 w-[500px] h-[500px] bg-[#FF87B3]/20 rounded-full blur-3xl opacity-50" />
        <div className="absolute bottom-10 -right-20 w-[400px] h-[400px] bg-[#FFF5F8] rounded-full blur-3xl opacity-50" />
      </div>

      <div className="container-page relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#14213D] font-display tracking-tight mb-4">
            Why Choose Us
          </h2>
          <p className="text-lg md:text-xl text-slate-600 font-medium">
            Trusted Care. Advanced Technology. Compassionate Support.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-white/80 backdrop-blur-xl border border-[#FF87B3] p-6 lg:p-8 rounded-[2rem] shadow-[0_8px_30px_rgba(255,135,179,0.15)] hover:shadow-[0_20px_40px_rgba(255,135,179,0.35)] hover:border-[#D94D78] transition-all duration-300 hover:-translate-y-2 flex flex-col items-center text-center"
            >
              <div className="w-20 h-20 rounded-full bg-[#FFF5F8] border border-[#FF87B3] flex items-center justify-center mb-8 relative transition-all duration-300 group-hover:scale-110 group-hover:bg-[#FF87B3]">
                <feature.icon
                  className="w-10 h-10 text-[#D94D78] group-hover:text-[#14213D] relative z-10 transition-colors duration-300"
                  strokeWidth={1.5}
                />
              </div>
              <h3 className="text-xl lg:text-2xl font-bold text-[#14213D] mb-4 group-hover:text-[#D94D78] transition-colors">
                {feature.title}
              </h3>
              <p className="text-slate-600 leading-relaxed font-medium">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
