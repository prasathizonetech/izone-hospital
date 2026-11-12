import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export interface LightboxImage {
  src: string;
  title: string;
  tag?: string;
}

interface GalleryLightboxProps {
  image: LightboxImage | null;
  onClose: () => void;
}

export function GalleryLightbox({ image, onClose }: GalleryLightboxProps) {
  useEffect(() => {
    if (!image) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [image, onClose]);

  return (
    <AnimatePresence>
      {image && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8 bg-black/80 backdrop-blur-md"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={image.title}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 sm:top-6 sm:right-6 p-2.5 sm:p-3 rounded-full bg-white/20 hover:bg-white text-white hover:text-slate-900 backdrop-blur-md transition-all shadow-lg cursor-pointer z-10"
            aria-label="Close image preview"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Modal content */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.92, opacity: 0, y: 15 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-5xl max-h-[85dvh] bg-white rounded-3xl overflow-hidden shadow-2xl border border-white/20 flex flex-col"
          >
            <div className="relative overflow-hidden bg-slate-950 flex items-center justify-center">
              <img
                src={image.src}
                alt={image.title}
                className="max-h-[70vh] w-auto object-contain"
              />
            </div>
            <div className="p-5 bg-white flex items-center justify-between gap-4">
              <div>
                {image.tag && (
                  <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#D94D78] block mb-0.5">
                    {image.tag}
                  </span>
                )}
                <h3 className="font-display text-lg font-bold text-slate-900">{image.title}</h3>
              </div>
              <div className="text-xs text-slate-400 font-medium hidden sm:block">
                Press{" "}
                <kbd className="px-2 py-1 bg-slate-100 rounded text-slate-600 font-mono text-[11px]">
                  ESC
                </kbd>{" "}
                to close
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
