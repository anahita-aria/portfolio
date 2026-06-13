"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface Props {
  summary: string;
  hint?: string;
  children: React.ReactNode;
  /** Tailwind hex color for the accent (border + chevron tint). Defaults to mint. */
  accent?: string;
}

/**
 * Wraps dense content (tables, matrices, flowcharts) so it stays expanded on
 * desktop (lg+) but collapses behind a teaser button on mobile/tablet.
 *
 * Usage:
 *   <MobileCollapsible summary="11 features mapped across 5 personas">
 *     <table>…</table>
 *   </MobileCollapsible>
 */
export function MobileCollapsible({
  summary,
  hint = "Tap to expand",
  children,
  accent = "#a2ffd2",
}: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile teaser button */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="lg:hidden w-full px-5 py-5 bg-[#2d313d]/60 border border-dashed border-white/15 rounded-2xl transition-all duration-300 hover:bg-[#2d313d]/85 hover:border-white/30 group flex items-center justify-between gap-4 text-left"
      >
        <div className="min-w-0 flex-1">
          <p className="text-white text-sm md:text-base font-semibold leading-snug">
            {summary}
          </p>
          {!open && (
            <p className="text-xs text-text-muted mt-1">{hint}</p>
          )}
        </div>
        <ChevronDown
          size={20}
          className={`shrink-0 transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
          style={{ color: accent }}
        />
      </button>

      {/* Content: always visible on lg+, conditionally visible on mobile when open */}
      <div className={`${open ? "block mt-4" : "hidden"} lg:block lg:mt-0`}>
        {children}
      </div>
    </>
  );
}
