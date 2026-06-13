"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Download, Menu, X } from "lucide-react";
import { caseStudies } from "@/data/portfolio";

export function GlobalNav() {
  const [scrolled, setScrolled] = useState(false);
  const [workOpen, setWorkOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setWorkOpen(false);
      }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  // Close mobile menu on Escape, and lock body scroll while open
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    document.addEventListener("keydown", onKey);
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const handleWorkEnter = () => {
    clearTimeout(timeoutRef.current);
    setWorkOpen(true);
  };

  const handleWorkLeave = () => {
    timeoutRef.current = setTimeout(() => setWorkOpen(false), 200);
  };

  const handleWorkClick = () => {
    if (pathname === "/") {
      // On homepage — scroll to work section
      document.getElementById("work")?.scrollIntoView({ behavior: "smooth" });
      setWorkOpen(false);
    }
  };

  const closeMobile = () => setMobileOpen(false);

  return (
    <>
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || mobileOpen
          ? "backdrop-blur-xl bg-[#242731]/85 border-b border-white/5"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="flex items-center justify-between px-4 md:px-8 py-4 max-w-[1440px] mx-auto">
        <Link
          href="/"
          className="text-[28px] sm:text-[34px] text-white tracking-[-0.76px] leading-none"
          style={{ fontFamily: "'Original Surfer', cursive" }}
          onClick={closeMobile}
        >
          A.A
        </Link>

        {/* Desktop menu — hidden below lg */}
        <div className="hidden lg:flex items-center gap-7">
          {/* Work — with dropdown */}
          <div
            ref={dropdownRef}
            className="relative"
            onMouseEnter={handleWorkEnter}
            onMouseLeave={handleWorkLeave}
          >
            {pathname === "/" ? (
              <button
                onClick={handleWorkClick}
                className="flex items-center gap-2 text-[14px] font-semibold text-white px-2.5 py-2 rounded-[10px] hover:bg-white/5 transition-colors"
              >
                <img src="/hero/icon-work.svg" alt="" className="w-[18px] h-[18px]" />
                Work
              </button>
            ) : (
              <Link
                href="/#work"
                className="flex items-center gap-2 text-[14px] font-semibold text-white px-2.5 py-2 rounded-[10px] hover:bg-white/5 transition-colors"
              >
                <img src="/hero/icon-work.svg" alt="" className="w-[18px] h-[18px]" />
                Work
              </Link>
            )}

            {/* Dropdown */}
            <div
              className={`absolute top-full left-0 mt-2 w-[240px] rounded-[16px] border border-white/10 bg-[#2d313d]/95 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden transition-all duration-200 origin-top ${
                workOpen
                  ? "opacity-100 scale-100 pointer-events-auto"
                  : "opacity-0 scale-95 pointer-events-none"
              }`}
            >
              <div className="p-2">
                <p className="px-3 py-2 text-[11px] font-semibold text-[#6e7286] uppercase tracking-wider">
                  Case Studies
                </p>
                {caseStudies.map((study) => (
                  <Link
                    key={study.slug}
                    href={`/case-study/${study.slug}`}
                    onClick={() => setWorkOpen(false)}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-[10px] hover:bg-white/5 transition-colors group"
                  >
                    <div
                      className="w-[8px] h-[8px] rounded-full shrink-0"
                      style={{ backgroundColor: study.color }}
                    />
                    <div>
                      <p className="text-[13px] font-semibold text-white group-hover:text-[#a2ffd2] transition-colors">
                        {study.title}
                      </p>
                      <p className="text-[11px] text-[#6e7286]">
                        {study.subtitle}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <Link
            href={pathname === "/" ? "#about" : "/#about"}
            className="flex items-center gap-2 text-[14px] font-semibold text-white px-2.5 py-2 rounded-[10px] hover:bg-white/5 transition-colors"
          >
            <img src="/hero/icon-about.svg" alt="" className="w-[18px] h-[18px]" />
            About
          </Link>
          <Link
            href={pathname === "/" ? "#contact" : "/#contact"}
            className="flex items-center gap-2 text-[14px] font-semibold text-white px-2.5 py-2 rounded-[10px] hover:bg-white/5 transition-colors"
          >
            <img src="/hero/icon-contact.svg" alt="" className="w-[18px] h-[18px]" />
            Contact
          </Link>
          <a
            href="/AnahitaAria_ProductDesigner_CV.pdf"
            download="AnahitaAria_ProductDesigner_CV.pdf"
            className="relative flex items-center gap-2 text-[14px] font-semibold text-[#01030d] bg-[#a2ffd2] px-2.5 py-2 rounded-[10px] shadow-[0px_3px_0px_0px_rgba(162,255,210,0.2)] hover:brightness-110 transition-all"
          >
            <Download size={15} strokeWidth={2} />
            Resume
            <div className="absolute inset-0 rounded-[10px] shadow-[inset_0px_2px_0px_0px_rgba(0,0,0,0.15)] pointer-events-none" />
          </a>
        </div>

        {/* Mobile hamburger toggle — visible below lg */}
        <button
          type="button"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
          className="lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-[10px] text-white hover:bg-white/5 transition-colors"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
    </nav>

      {/* ──────────────── Mobile drawer — full screen, slides up from bottom (rendered as sibling of nav so it's outside the nav's stacking context) ──────────────── */}
      <div
        style={{ backgroundColor: "rgba(36, 39, 49, 0.85)" }}
        className={`lg:hidden fixed inset-0 z-[60] backdrop-blur-xl transition-transform duration-300 ease-out ${
          mobileOpen ? "translate-y-0" : "translate-y-full pointer-events-none"
        }`}
      >
        {/* Top bar — mirrors the nav with logo + close button */}
        <div className="flex items-center justify-between px-4 md:px-8 py-4 max-w-[1440px] mx-auto border-b border-white/5">
          <Link
            href="/"
            className="text-[28px] sm:text-[34px] text-white tracking-[-0.76px] leading-none"
            style={{ fontFamily: "'Original Surfer', cursive" }}
            onClick={closeMobile}
          >
            A.A
          </Link>
          <button
            type="button"
            aria-label="Close menu"
            onClick={closeMobile}
            className="inline-flex items-center justify-center w-10 h-10 rounded-[10px] text-white hover:bg-white/5 transition-colors"
          >
            <X size={22} />
          </button>
        </div>

        {/* Menu content */}
        <div className="px-4 md:px-8 py-6 max-w-[1440px] mx-auto h-[calc(100vh-60px)] overflow-y-auto">
          {/* Case Studies */}
          <p className="px-3 py-2 text-[11px] font-semibold text-[#6e7286] uppercase tracking-wider">
            Case Studies
          </p>
          {caseStudies.map((study) => (
            <Link
              key={study.slug}
              href={`/case-study/${study.slug}`}
              onClick={closeMobile}
              className="flex items-center gap-3 px-3 py-3 rounded-[12px] hover:bg-white/5 transition-colors group"
            >
              <div
                className="w-[10px] h-[10px] rounded-full shrink-0"
                style={{ backgroundColor: study.color }}
              />
              <div className="flex-1 min-w-0">
                <p className="text-[15px] font-semibold text-white group-hover:text-[#a2ffd2] transition-colors leading-tight">
                  {study.title}
                </p>
                <p className="text-[12px] text-[#6e7286] mt-0.5 truncate">
                  {study.subtitle}
                </p>
              </div>
            </Link>
          ))}

          {/* Divider */}
          <div className="my-3 border-t border-white/10" />

          {/* Section navigation */}
          <p className="px-3 py-2 text-[11px] font-semibold text-[#6e7286] uppercase tracking-wider">
            Navigation
          </p>
          <Link
            href={pathname === "/" ? "#work" : "/#work"}
            onClick={closeMobile}
            className="flex items-center gap-3 px-3 py-3 rounded-[12px] hover:bg-white/5 transition-colors"
          >
            <img src="/hero/icon-work.svg" alt="" className="w-[18px] h-[18px]" />
            <span className="text-[15px] font-semibold text-white">Work</span>
          </Link>
          <Link
            href={pathname === "/" ? "#about" : "/#about"}
            onClick={closeMobile}
            className="flex items-center gap-3 px-3 py-3 rounded-[12px] hover:bg-white/5 transition-colors"
          >
            <img src="/hero/icon-about.svg" alt="" className="w-[18px] h-[18px]" />
            <span className="text-[15px] font-semibold text-white">About</span>
          </Link>
          <Link
            href={pathname === "/" ? "#contact" : "/#contact"}
            onClick={closeMobile}
            className="flex items-center gap-3 px-3 py-3 rounded-[12px] hover:bg-white/5 transition-colors"
          >
            <img src="/hero/icon-contact.svg" alt="" className="w-[18px] h-[18px]" />
            <span className="text-[15px] font-semibold text-white">Contact</span>
          </Link>

          {/* Resume CTA */}
          <a
            href="/AnahitaAria_ProductDesigner_CV.pdf"
            download="AnahitaAria_ProductDesigner_CV.pdf"
            onClick={closeMobile}
            className="relative flex items-center justify-center gap-2 mt-6 mx-3 text-[15px] font-semibold text-[#01030d] bg-[#a2ffd2] px-4 py-3 rounded-[12px] shadow-[0px_3px_0px_0px_rgba(162,255,210,0.2)] hover:brightness-110 transition-all"
          >
            <Download size={16} strokeWidth={2} />
            Resume
            <div className="absolute inset-0 rounded-[12px] shadow-[inset_0px_2px_0px_0px_rgba(0,0,0,0.15)] pointer-events-none" />
          </a>
        </div>
      </div>
    </>
  );
}
