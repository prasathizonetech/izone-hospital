import { Link, useRouterState } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Menu, X, Phone } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import logoAsset from "@/assets/izone-hospital-logo.png";
import { hospital } from "@/data/hospital";

const NAV_PINK = "#FF87B3";

interface NavItem {
  to: string;
  label: string;
  exact?: boolean;
}

const navItems: readonly NavItem[] = [
  { to: "/", label: "Home", exact: true },
  { to: "/about", label: "About Us" },
  { to: "/doctors", label: "Doctors" },
  { to: "/departments", label: "Departments" },
  { to: "/fertility-centre", label: "Fertility Centre" },
  { to: "/facilities", label: "Facilities" },
  { to: "/gallery", label: "Gallery" },
  { to: "/testimonials", label: "Testimonials" },
  { to: "/contact", label: "Contact" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const currentPath = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 12;
      setScrolled((prev) => (prev !== isScrolled ? isScrolled : prev));
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [currentPath]);

  // Close mobile menu on Escape key press or window resize to desktop
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    const handleResize = () => {
      if (window.innerWidth >= 1024) setMobileOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-xl shadow-[0_8px_30px_rgba(255,135,179,0.30)] border-b border-pink-200/80"
          : "bg-white/90 backdrop-blur-md border-b border-pink-100/60"
      }`}
    >
      {/* ── Desktop navbar (1024px and up: neatly aligned in 1 single row) ─── */}
      <div className="hidden lg:flex items-stretch w-full h-[58px] xl:h-[66px] 2xl:h-[72px]">
        {/* LEFT: White brand panel */}
        <Link
          to="/"
          className="flex items-center gap-2 xl:gap-3 bg-white pl-2.5 pr-2 xl:pl-5 xl:pr-4 2xl:pl-6 2xl:pr-5 shrink-0 group cursor-pointer select-none"
        >
          <motion.div
            id="nav-logo-desktop"
            whileHover={shouldReduceMotion ? undefined : { scale: 1.06, rotate: 2 }}
            transition={{ type: "spring", stiffness: 300, damping: 18 }}
            className="relative shrink-0 pointer-events-none rounded-full overflow-hidden"
          >
            <img
              src={logoAsset}
              alt="Izone Hospital logo"
              className="h-9 w-9 xl:h-12 xl:w-12 2xl:h-14 2xl:w-14 object-contain rounded-full"
            />
          </motion.div>
          <div className="leading-tight pointer-events-none">
            <div className="font-display text-[12px] xl:text-[15px] 2xl:text-[16.5px] font-bold text-[#14213D] tracking-tight transition-colors group-hover:text-[#D94D78] whitespace-nowrap">
              Izone Hospital
            </div>
            <div className="text-[9px] xl:text-[10.5px] 2xl:text-[11px] font-medium text-slate-500 mt-0.5 whitespace-nowrap">
              &amp; <span className="font-bold text-[#D94D78]">Fertility Centre</span> · Thillainagar
            </div>
          </div>
        </Link>

        {/* CURVE: sigmoid S-curve per design */}
        <div
          className="relative shrink-0 self-stretch pointer-events-none w-5 xl:w-10 2xl:w-14"
          style={{ backgroundColor: NAV_PINK }}
        >
          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="absolute inset-0 h-full w-full pointer-events-none"
          >
            <path d="M 0 100 C 15 100 22 90 32 65 C 46 30 64 5 100 0 L 0 0 Z" fill="white" />
          </svg>
        </div>

        {/* RIGHT: Pink nav panel with all 9 items + Book Appointment in a single horizontal row */}
        <nav
          className="flex flex-1 items-center justify-start pl-1 xl:pl-2.5 pr-2 xl:pr-4 2xl:pr-6 overflow-x-auto scrollbar-none"
          style={{ backgroundColor: NAV_PINK }}
        >
          <div className="flex items-center gap-0.5 xl:gap-1 2xl:gap-1.5 flex-nowrap shrink-0 mx-auto xl:mx-0">
            {navItems.map((item) => {
              const isActive =
                item.to === "/"
                  ? currentPath === "/"
                  : currentPath === item.to || currentPath.startsWith(`${item.to}/`);

              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className="relative px-1.5 xl:px-2.5 2xl:px-3.5 py-1 xl:py-1.5 rounded-full text-[11px] xl:text-[12.5px] 2xl:text-[13px] font-semibold whitespace-nowrap transition-colors duration-200 group/nav shrink-0 cursor-pointer select-none"
                >
                  {/* Smooth active background pill with layoutId */}
                  {isActive && (
                    <motion.div
                      layoutId="navActiveBackground"
                      className="absolute inset-0 bg-white rounded-full pointer-events-none"
                      transition={{ type: "spring", stiffness: 350, damping: 28 }}
                    />
                  )}

                  {/* Animated active underline indicator */}
                  {isActive && (
                    <motion.div
                      layoutId="navActiveUnderline"
                      className="absolute bottom-[-4px] xl:bottom-[-5px] left-1/2 -translate-x-1/2 w-3.5 xl:w-5 h-[2.5px] xl:h-[3px] rounded-full bg-[#D94D78] pointer-events-none"
                      transition={{ type: "spring", stiffness: 350, damping: 28 }}
                    />
                  )}

                  {/* Hover glow background for inactive items */}
                  {!isActive && (
                    <span className="absolute inset-0 rounded-full bg-white/0 group-hover/nav:bg-white/35 transition-all duration-200 pointer-events-none" />
                  )}

                  <span
                    className={`relative z-10 transition-all duration-200 pointer-events-none ${
                      isActive
                        ? "text-[#D94D78] font-bold"
                        : "text-[#14213D] font-semibold group-hover/nav:text-white"
                    }`}
                  >
                    {item.label}
                  </span>
                </Link>
              );
            })}

            <Link
              to="/contact"
              className="ml-1 xl:ml-2 px-3 xl:px-4 2xl:px-5 py-1.5 xl:py-2 rounded-full bg-white text-[#14213D] text-[11px] xl:text-[12.5px] 2xl:text-[13px] font-bold whitespace-nowrap shadow-xs hover:bg-[#FFF5F8] hover:text-[#D94D78] hover:shadow-md transition-all duration-200 shrink-0 cursor-pointer select-none"
            >
              Book Appointment
            </Link>
          </div>
        </nav>
      </div>

      {/* ── Mobile / Tablet navbar (< 1024px) ─── */}
      <div className="lg:hidden w-full">
        <div className="flex items-center justify-between w-full h-14 sm:h-16 px-3 sm:px-5 bg-white">
          <Link
            to="/"
            className="flex items-center gap-2 sm:gap-2.5 bg-white flex-1 min-w-0 cursor-pointer"
            onClick={() => setMobileOpen(false)}
          >
            <div id="nav-logo-mobile" className="h-9 w-9 sm:h-11 sm:w-11 shrink-0 rounded-full overflow-hidden">
              <img
                src={logoAsset}
                alt="Izone Hospital logo"
                className="h-full w-full object-contain rounded-full"
              />
            </div>
            <div className="leading-tight min-w-0">
              <div className="font-display text-[13px] sm:text-[15px] font-bold text-[#14213D] truncate">
                Izone Hospital
              </div>
              <div className="text-[9.5px] sm:text-[11px] text-slate-500 truncate">
                &amp; <span className="font-bold text-[#D94D78]">Fertility Centre</span>
              </div>
            </div>
          </Link>

          <motion.button
            whileHover={shouldReduceMotion ? undefined : { scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            className="flex items-center justify-center h-9 w-9 sm:h-10 sm:w-10 rounded-full text-[#14213D] shadow-xs cursor-pointer border border-[#f06a99] shrink-0 ml-2"
            style={{ backgroundColor: NAV_PINK }}
            onClick={() => setMobileOpen((v) => !v)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
          >
            {mobileOpen ? <X className="h-4.5 w-4.5 sm:h-5 sm:w-5" /> : <Menu className="h-4.5 w-4.5 sm:h-5 sm:w-5" />}
          </motion.button>
        </div>
      </div>

      {/* ── Backdrop Overlay for Mobile Drawer ─── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 top-14 sm:top-16 bg-slate-900/40 backdrop-blur-xs z-40 lg:hidden"
            onClick={() => setMobileOpen(false)}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      {/* ── Mobile / Tablet Drawer ─── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute top-full left-0 right-0 z-50 lg:hidden bg-white shadow-2xl border-t border-pink-100 max-h-[calc(100dvh-56px)] sm:max-h-[calc(100dvh-64px)] overflow-y-auto overscroll-contain"
          >
            <div className="flex flex-col gap-1 p-3 sm:p-5">
              {navItems.map((item) => {
                const isActive =
                  item.to === "/"
                    ? currentPath === "/"
                    : currentPath === item.to || currentPath.startsWith(`${item.to}/`);

                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center justify-between rounded-xl px-4 py-2.5 sm:py-3 text-[13.5px] sm:text-[14.5px] font-bold transition-all cursor-pointer ${
                      isActive
                        ? "bg-[#FF87B3]/25 text-[#D94D78] shadow-xs border border-[#FF87B3]"
                        : "text-[#14213D] hover:bg-pink-50/50 active:bg-pink-100/40"
                    }`}
                  >
                    <span>{item.label}</span>
                    {isActive && (
                      <span className="w-2 h-2 rounded-full bg-[#D94D78] shadow-xs" />
                    )}
                  </Link>
                );
              })}

              <Link
                to="/contact"
                onClick={() => setMobileOpen(false)}
                className="mt-1.5 flex items-center justify-center rounded-xl px-4 py-3 text-[13.5px] sm:text-[14.5px] font-extrabold text-[#14213D] shadow-xs hover:shadow-md transition-all border border-[#f06a99] cursor-pointer"
                style={{ backgroundColor: NAV_PINK }}
              >
                Book Appointment
              </Link>

              <div className="mt-2 rounded-2xl bg-gradient-to-br from-[#FFF5F8] to-[#ffecf2] border border-[#FF87B3]/60 p-3.5 sm:p-4 flex items-center justify-between shadow-xs">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#FF87B3] flex items-center justify-center text-[#14213D] shadow-xs shrink-0">
                    <Phone className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <div className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">
                      24/7 Helpline
                    </div>
                    <div className="text-xs sm:text-sm font-bold text-[#14213D]">{hospital.mobile}</div>
                  </div>
                </div>
                <motion.a
                  whileHover={shouldReduceMotion ? undefined : { scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href={`tel:${hospital.mobile}`}
                  className="px-4 py-2 rounded-xl text-[#14213D] text-xs font-extrabold shadow-xs hover:shadow-md transition-shadow border border-[#f06a99] cursor-pointer shrink-0"
                  style={{ backgroundColor: NAV_PINK }}
                >
                  Call
                </motion.a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
