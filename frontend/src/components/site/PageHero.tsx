import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { ChevronRight } from "lucide-react";
import { HeroBackground } from "./hero/HeroBackground";

export function PageHero({
  eyebrow,
  title,
  description,
  crumbs,
}: {
  eyebrow?: string;
  title: string;
  description?: ReactNode;
  crumbs?: { label: string; to?: string }[];
}) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#FFF5F8] via-[#FF87B3] to-[#f06a99] text-[#14213D] pt-8 pb-8 sm:pt-12 sm:pb-12 lg:pt-16 lg:pb-16 border-b border-[#FF87B3]">
      <HeroBackground />
      <div className="container-page relative z-10">
        {eyebrow && (
          <div className="mb-3 sm:mb-4 inline-flex items-center rounded-full bg-white/85 backdrop-blur-md border border-[#FF87B3] px-3.5 py-1 sm:px-4 sm:py-1.5 text-[11px] sm:text-xs font-extrabold uppercase tracking-widest text-[#D94D78] shadow-sm">
            {eyebrow}
          </div>
        )}
        <h1 className="max-w-3xl font-display text-2xl sm:text-4xl md:text-5xl font-extrabold leading-tight text-[#14213D] break-words">
          {title}
        </h1>
        {description && (
          <p className="mt-3 sm:mt-4 max-w-2xl text-sm sm:text-base font-medium text-slate-700 md:text-lg">
            {description}
          </p>
        )}
        {crumbs && (
          <nav className="mt-4 sm:mt-6 flex flex-wrap items-center gap-1.5 text-xs font-medium text-slate-600">
            {crumbs.map((c, i) => (
              <span key={i} className="inline-flex items-center gap-1.5 max-w-full">
                {c.to ? (
                  <Link to={c.to} className="hover:text-[#D94D78] transition-colors truncate">
                    {c.label}
                  </Link>
                ) : (
                  <span className="font-bold text-[#D94D78] bg-white border border-[#FF87B3] px-2.5 py-0.5 rounded-md shadow-2xs truncate max-w-[200px] sm:max-w-none">
                    {c.label}
                  </span>
                )}
                {i < crumbs.length - 1 && <ChevronRight className="h-3 w-3 shrink-0 text-slate-400" />}
              </span>
            ))}
          </nav>
        )}
      </div>
    </section>
  );
}
