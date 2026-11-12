import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Facebook, Instagram, Youtube, Linkedin, MessageCircle, Phone, X } from "lucide-react";
import { hospital } from "@/data/hospital";

interface SocialItem {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  bg: string;
  shadow: string;
  customIcon?: React.ReactNode;
}

// Custom X (Twitter) Logo SVG for authentic look
function XLogo({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

const socialItems: SocialItem[] = [
  {
    id: "whatsapp",
    name: "WhatsApp",
    icon: MessageCircle,
    href: `https://wa.me/${hospital.whatsapp.replace(/\+/g, "")}`,
    bg: "bg-[#25D366] hover:bg-[#20bd5a]",
    shadow: "shadow-[0_6px_20px_rgba(37,211,102,0.45)]",
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    icon: Linkedin,
    href: "https://linkedin.com",
    bg: "bg-[#0A66C2] hover:bg-[#085299]",
    shadow: "shadow-[0_6px_20px_rgba(10,102,194,0.45)]",
  },
  {
    id: "facebook",
    name: "Facebook",
    icon: Facebook,
    href: "https://facebook.com",
    bg: "bg-[#1877F2] hover:bg-[#1465cf]",
    shadow: "shadow-[0_6px_20px_rgba(24,119,242,0.45)]",
  },
  {
    id: "instagram",
    name: "Instagram",
    icon: Instagram,
    href: "https://instagram.com",
    bg: "bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF] hover:brightness-110",
    shadow: "shadow-[0_6px_20px_rgba(221,42,123,0.45)]",
  },
  {
    id: "twitter",
    name: "X (Twitter)",
    icon: XLogo,
    href: "https://twitter.com",
    bg: "bg-[#000000] hover:bg-[#1a1a1a]",
    shadow: "shadow-[0_6px_20px_rgba(0,0,0,0.5)] border border-white/20",
  },
  {
    id: "youtube",
    name: "YouTube",
    icon: Youtube,
    href: "https://youtube.com",
    bg: "bg-[#FF0000] hover:bg-[#e60000]",
    shadow: "shadow-[0_6px_20px_rgba(255,0,0,0.45)]",
  },
  {
    id: "call",
    name: "Call Us",
    icon: Phone,
    href: `tel:${hospital.mobile}`,
    bg: "bg-gradient-to-br from-[#FF87B3] to-[#D94D78] hover:brightness-110",
    shadow: "shadow-[0_6px_20px_rgba(255,135,179,0.5)]",
  },
];

// Elliptical radial arc coordinates relative to bottom-right toggle button center
const arcPositions = [
  { x: -126, y: 0 }, // WhatsApp (bottom-left)
  { x: -120, y: 34 }, // LinkedIn
  { x: -108, y: 66 }, // Facebook
  { x: -88, y: 96 }, // Instagram
  { x: -62, y: 122 }, // X (Twitter)
  { x: -32, y: 142 }, // YouTube
  { x: 2, y: 154 }, // Call Us (top)
];

export function FloatingSocialMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div
      ref={menuRef}
      className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-[max(1rem,env(safe-area-inset-right))] sm:bottom-6 sm:right-6 z-[9999] flex items-center justify-center select-none"
    >
      {/* 3D Arc Floating Social Icons */}
      <AnimatePresence>
        {isOpen && (
          <>
            {socialItems.map((item, index) => {
              const pos = arcPositions[index];
              const Icon = item.icon;

              return (
                <motion.div
                  key={item.id}
                  className="absolute"
                  initial={{ opacity: 0, x: 0, y: 0, scale: 0.2 }}
                  animate={{
                    opacity: 1,
                    x: pos.x,
                    y: -pos.y,
                    scale: 1,
                    transition: {
                      type: "spring",
                      stiffness: 380,
                      damping: 24,
                      delay: index * 0.035,
                    },
                  }}
                  exit={{
                    opacity: 0,
                    x: 0,
                    y: 0,
                    scale: 0.2,
                    transition: {
                      duration: 0.2,
                      delay: (socialItems.length - 1 - index) * 0.02,
                    },
                  }}
                >
                  <a
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    title={item.name}
                    aria-label={item.name}
                    className={`relative group flex items-center justify-center w-11 h-11 rounded-full text-white ${item.bg} ${item.shadow} transition-transform duration-200 hover:scale-115 active:scale-95 border border-white/25`}
                  >
                    <Icon className="w-5 h-5 drop-shadow-sm" />

                    {/* Tooltip on hover */}
                    <span className="absolute right-full mr-2.5 px-2.5 py-1 rounded-lg bg-[#102A54]/95 text-white text-[11px] font-bold tracking-wide whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none shadow-md backdrop-blur-sm border border-[#FF87B3]/30">
                      {item.name}
                    </span>
                  </a>
                </motion.div>
              );
            })}
          </>
        )}
      </AnimatePresence>

      {/* Main Toggle Button */}
      <motion.button
        onClick={() => setIsOpen((prev) => !prev)}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        aria-label={isOpen ? "Close social menu" : "Open social menu"}
        className="relative z-10 flex items-center justify-center w-14 h-14 rounded-full text-[#14213D] shadow-[0_8px_28px_rgba(255,135,179,0.6)] border-2 border-[#f06a99] focus:outline-none transition-colors duration-300 cursor-pointer"
        style={{
          background: isOpen
            ? "linear-gradient(135deg, #102A54, #0A1D3D)"
            : "linear-gradient(135deg, #FF87B3, #f06a99)",
          color: isOpen ? "#ffffff" : "#14213D",
        }}
      >
        {/* Animated icon morph */}
        <AnimatePresence mode="wait" initial={false}>
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-6 h-6 stroke-[2.5]" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <MessageCircle className="w-6 h-6 stroke-[2.2] fill-[#14213D]/15" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Ambient pulse ring when closed */}
        {!isOpen && (
          <span className="absolute -inset-1 rounded-full bg-[#FF87B3]/50 animate-ping pointer-events-none -z-10 opacity-75" />
        )}
      </motion.button>
    </div>
  );
}
