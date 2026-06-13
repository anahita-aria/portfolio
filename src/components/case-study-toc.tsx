"use client";

import { useEffect, useState } from "react";

export interface TocSection {
  id: string;
  label: string;
}

interface Props {
  sections: TocSection[];
  accent?: string;
}

export function CaseStudyToc({ sections, accent = "#a2ffd2" }: Props) {
  const [activeId, setActiveId] = useState<string>(sections[0]?.id ?? "");
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        rootMargin: "-20% 0px -60% 0px",
        threshold: [0, 0.1, 0.5, 1],
      }
    );

    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sections]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <nav
      aria-label="Case study sections"
      className="hidden lg:flex fixed right-6 top-1/2 -translate-y-1/2 z-40 flex-col gap-3 py-4"
    >
      {sections.map(({ id, label }) => {
        const isActive = activeId === id;
        const isHovered = hoveredId === id;
        const showLabel = isActive || isHovered;
        return (
          <a
            key={id}
            href={`#${id}`}
            onClick={(e) => handleClick(e, id)}
            onMouseEnter={() => setHoveredId(id)}
            onMouseLeave={() => setHoveredId(null)}
            className="group relative flex items-center justify-end gap-3"
            aria-label={label}
            aria-current={isActive ? "true" : undefined}
          >
            <span
              className={`text-xs font-medium whitespace-nowrap transition-all duration-200 px-2 py-1 rounded-md backdrop-blur-sm ${
                showLabel
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-2 pointer-events-none"
              }`}
              style={{
                color: accent,
                backgroundColor: showLabel ? "rgba(36, 39, 49, 0.85)" : "transparent",
              }}
            >
              {label}
            </span>
            <span
              className="block transition-all duration-200 rounded-full"
              style={{
                width: isActive ? 10 : 6,
                height: isActive ? 10 : 6,
                backgroundColor: showLabel ? accent : "rgba(219, 220, 225, 0.3)",
              }}
            />
          </a>
        );
      })}
    </nav>
  );
}
