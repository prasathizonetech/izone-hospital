import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Youtube, Globe, MapPin, Phone, Mail, Clock } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import logoAsset from "@/assets/izone-hospital-logo.png";
import { hospital } from "@/data/hospital";
import { departments } from "@/data/departments";
import { doctors } from "@/data/doctors";

// Line-by-line variant where delay is calculated per item index
const lineVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.045,
      duration: 0.35,
      ease: [0.25, 0.1, 0.25, 1] as const,
    },
  }),
};

export function Footer() {
  const currentYear = new Date().getFullYear();
  const shouldReduceMotion = useReducedMotion();

  const anim = (i: number) =>
    shouldReduceMotion
      ? {}
      : { variants: lineVariants, custom: i };

  const quickLinks = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About Us" },
    { to: "/doctors", label: "Our Doctors" },
    { to: "/departments", label: "Departments" },
    { to: "/fertility-centre", label: "Fertility Centre" },
    { to: "/facilities", label: "Facilities" },
    { to: "/gallery", label: "Gallery" },
    { to: "/testimonials", label: "Testimonials" },
    { to: "/contact", label: "Contact" },
  ];

  const socialLinks = [
    { Icon: Facebook, href: "https://facebook.com", label: "Facebook" },
    { Icon: Instagram, href: "https://instagram.com", label: "Instagram" },
    { Icon: Youtube, href: "https://youtube.com", label: "YouTube" },
    { Icon: Globe, href: "https://izonehospital.in", label: "Website" },
  ];

  // Counter to give every single line/element a sequential index
  let idx = 0;
  const WAVE_IDX = idx++;
  const LOGO_IDX = idx++;
  const DESC_IDX = idx++;
  const SOCIAL_START = idx; idx += socialLinks.length;
  const QL_TITLE = idx++;
  const QL_START = idx; idx += quickLinks.length;
  const DEPT_TITLE = idx++;
  const DEPT_START = idx; idx += departments.length;
  const DOC_TITLE = idx++;
  const DOC_START = idx; idx += doctors.length;
  const CONTACT_TITLE = idx++;
  const CONTACT_ADDR = idx++;
  const CONTACT_PHONE = idx++;
  const CONTACT_EMAIL = idx++;
  const CONTACT_HOURS = idx++;
  const BAR_COPY = idx++;
  const BAR_DEV = idx++;

  return (
    <motion.footer
      initial={shouldReduceMotion ? undefined : "hidden"}
      whileInView={shouldReduceMotion ? undefined : "visible"}
      viewport={{ once: true, amount: 0.05 }}
      className="relative w-full overflow-hidden bg-transparent"
    >
      {/* ── 1. Top Organic Transition Wave ── */}
      <motion.div
        {...anim(WAVE_IDX)}
        className="w-full overflow-hidden leading-none bg-transparent -mb-[1px]"
      >
        <svg
          viewBox="0 0 1440 90"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-14 sm:h-18 md:h-22 lg:h-26 block"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="footer-wave-body-grad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#E25680" />
              <stop offset="100%" stopColor="#DE4876" />
            </linearGradient>
          </defs>

          {/* Pastel pink ribbon accent layer */}
          <path
            d="M0,48 C200,30 340,30 520,44 C640,54 720,60 820,60 C940,60 1040,44 1180,33 C1300,24 1380,36 1440,46"
            stroke="#FBAFC9"
            strokeWidth="6"
            strokeLinecap="round"
            fill="none"
          />

          {/* Crisp white highlight contour line */}
          <path
            d="M0,44 C200,26 340,26 520,40 C640,50 720,56 820,56 C940,56 1040,40 1180,29 C1300,20 1380,32 1440,42"
            stroke="rgba(255, 255, 255, 0.9)"
            strokeWidth="1.5"
            strokeLinecap="round"
            fill="none"
          />

          {/* Main rose pink wave body fill */}
          <path
            d="M0,48 C200,30 340,30 520,44 C640,54 720,60 820,60 C940,60 1040,44 1180,33 C1300,24 1380,36 1440,46 L1440,90 L0,90 Z"
            fill="url(#footer-wave-body-grad)"
          />
        </svg>
      </motion.div>

      {/* ── 2. Footer Body Background ── */}
      <div className="relative bg-gradient-to-b from-[#DE4876] to-[#D63A6A] text-white">
        {/* ── Main 5-Column Grid ── */}
        <div className="relative max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12 pt-4 pb-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-12 gap-8 lg:gap-8 items-start">
            {/* ── Column 1: Brand Info & Socials ── */}
            <div className="sm:col-span-2 md:col-span-3 lg:col-span-3 pr-2">
              <motion.div {...anim(LOGO_IDX)} className="flex items-center gap-3.5 mb-4">
                <div className="w-14 h-14 rounded-full bg-white p-2 shadow-md shrink-0 flex items-center justify-center">
                  <img
                    src={logoAsset}
                    alt="Izone Hospital Logo"
                    className="w-full h-full object-contain"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div>
                  <h3 className="font-display font-extrabold text-[18px] sm:text-[20px] text-white tracking-tight leading-tight">
                    Izone Hospital
                  </h3>
                  <p className="text-[13px] text-white/90 font-medium">&amp; Fertility Centre</p>
                </div>
              </motion.div>

              <motion.p {...anim(DESC_IDX)} className="text-[13.5px] text-white/90 leading-relaxed mb-6 max-w-sm font-normal">
                Trusted Women&apos;s Health, Fertility &amp; Family Healthcare in Thillainagar. Manyata
                certified maternity care in the heart of Thillainagar.
              </motion.p>

              {/* Circular Social Outline Icons - individual animation */}
              <div className="flex items-center gap-3">
                {socialLinks.map(({ Icon, href, label }, i) => (
                  <motion.a
                    key={i}
                    {...anim(SOCIAL_START + i)}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-10 h-10 rounded-full border border-white/60 flex items-center justify-center text-white hover:bg-white hover:text-[#DE4876] hover:-translate-y-0.5 transition-all duration-300 shadow-xs"
                  >
                    <Icon className="w-4 h-4" />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* ── Column 2: Quick Links ── */}
            <div className="lg:col-span-2">
              <motion.div {...anim(QL_TITLE)} className="inline-block px-4 py-1.5 rounded-full bg-white text-[#DE4876] font-bold text-[11px] uppercase tracking-wider mb-5 shadow-xs">
                QUICK LINKS
              </motion.div>
              <ul className="space-y-2">
                {quickLinks.map(({ to, label }, i) => (
                  <motion.li key={to} {...anim(QL_START + i)}>
                    <Link
                      to={to}
                      className="text-[13.5px] text-white/90 hover:text-white hover:translate-x-1 inline-block transition-all duration-200 font-medium py-0.5"
                    >
                      {label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* ── Column 3: Departments ── */}
            <div className="lg:col-span-2">
              <motion.div {...anim(DEPT_TITLE)} className="inline-block px-4 py-1.5 rounded-full bg-white text-[#DE4876] font-bold text-[11px] uppercase tracking-wider mb-5 shadow-xs">
                DEPARTMENTS
              </motion.div>
              <ul className="space-y-2">
                {departments.map((d, i) => (
                  <motion.li key={d.id} {...anim(DEPT_START + i)}>
                    <Link
                      to={d.route}
                      className="text-[13.5px] text-white/90 hover:text-white hover:translate-x-1 inline-block transition-all duration-200 font-medium py-0.5"
                    >
                      {d.name}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* ── Column 4: Our Specialists ── */}
            <div className="lg:col-span-2">
              <motion.div {...anim(DOC_TITLE)} className="inline-block px-4 py-1.5 rounded-full bg-white text-[#DE4876] font-bold text-[11px] uppercase tracking-wider mb-5 shadow-xs">
                OUR SPECIALISTS
              </motion.div>
              <ul className="space-y-2.5">
                {doctors.map((doc, i) => (
                  <motion.li key={doc.id} {...anim(DOC_START + i)}>
                    <Link
                      to="/doctors"
                      className="text-[13.5px] text-white/90 hover:text-white hover:translate-x-1 inline-block transition-all duration-200 font-medium leading-snug py-0.5"
                    >
                      {doc.name}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* ── Column 5: Contact ── */}
            <div className="lg:col-span-3">
              <motion.div {...anim(CONTACT_TITLE)} className="inline-block px-4 py-1.5 rounded-full bg-white text-[#DE4876] font-bold text-[11px] uppercase tracking-wider mb-5 shadow-xs">
                CONTACT
              </motion.div>
              <ul className="space-y-4">
                {/* Address */}
                <motion.li {...anim(CONTACT_ADDR)} className="flex gap-3 items-start">
                  <div className="w-7 h-7 rounded-full bg-white text-[#DE4876] flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                    <MapPin className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-[13.5px] text-white/95 leading-snug font-normal">
                    {hospital.address.line1}, {hospital.address.line2}, {hospital.address.city} –{" "}
                    {hospital.address.pin}
                  </span>
                </motion.li>

                {/* Phone Numbers */}
                <motion.li {...anim(CONTACT_PHONE)} className="flex gap-3 items-start">
                  <div className="w-7 h-7 rounded-full bg-white text-[#DE4876] flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                    <Phone className="w-3.5 h-3.5" />
                  </div>
                  <div className="text-[13.5px] text-white/95 leading-relaxed font-normal">
                    {hospital.phones.map((phone) => (
                      <div key={phone}>
                        <a
                          href={`tel:${phone.replace(/[^0-9]/g, "")}`}
                          className="hover:text-white hover:underline"
                        >
                          {phone}
                        </a>
                      </div>
                    ))}
                    <div>
                      <a
                        href={`tel:${hospital.mobile.replace(/[^0-9]/g, "")}`}
                        className="hover:text-white hover:underline font-bold text-white"
                      >
                        {hospital.mobile}
                      </a>
                    </div>
                  </div>
                </motion.li>

                {/* Email */}
                <motion.li {...anim(CONTACT_EMAIL)} className="flex gap-3 items-center">
                  <div className="w-7 h-7 rounded-full bg-white text-[#DE4876] flex items-center justify-center shrink-0 shadow-xs">
                    <Mail className="w-3.5 h-3.5" />
                  </div>
                  <a
                    href={`mailto:${hospital.email}`}
                    className="text-[13.5px] text-white/95 hover:text-white hover:underline break-all font-normal"
                  >
                    {hospital.email}
                  </a>
                </motion.li>

                {/* Working Hours */}
                <motion.li {...anim(CONTACT_HOURS)} className="flex gap-3 items-center">
                  <div className="w-7 h-7 rounded-full bg-white text-[#DE4876] flex items-center justify-center shrink-0 shadow-xs">
                    <Clock className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-[13.5px] text-white/95 font-normal">{hospital.hours}</span>
                </motion.li>
              </ul>
            </div>
          </div>
        </div>

        {/* ── 3. Footer Bottom Bar ── */}
        <div className="border-t border-white/20 py-6 px-4">
          <div className="max-w-7xl mx-auto flex flex-col items-center justify-center text-center gap-1.5 text-[13px] text-white/90">
            <motion.p {...anim(BAR_COPY)}>
              © {currentYear} Izone Hospital &amp; Fertility Centre. All Rights Reserved.
            </motion.p>
            <motion.p {...anim(BAR_DEV)} className="font-normal text-white/90">
              Designed &amp; Developed by{" "}
              <a
                href="https://www.izonetech.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-white hover:text-pink-200 transition-colors duration-200 underline-offset-2 hover:underline"
              >
                Izone Technologies
              </a>
            </motion.p>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}
