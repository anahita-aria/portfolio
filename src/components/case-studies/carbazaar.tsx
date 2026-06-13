"use client";

import { useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import {
  Target,
  Users,
  Search,
  Brain,
  Lightbulb,
  CheckCircle2,
  XCircle,
  User,
  Heart,
  Eye,
  MessageCircle,
  Map,
  Layers,
  Zap,
} from "lucide-react";
import { carbazaar } from "@/data/carbazaar";
import { CaseStudyToc } from "@/components/case-study-toc";
import { MobileCollapsible } from "@/components/mobile-collapsible";

const CARBAZAAR_TOC = [
  { id: "overview", label: "Overview" },
  { id: "process", label: "Process" },
  { id: "research", label: "Research" },
  { id: "personas", label: "Personas" },
  { id: "competition", label: "Competition" },
  { id: "ia", label: "IA" },
  { id: "typography", label: "Typography" },
  { id: "colors", label: "Colors" },
  { id: "wireframes", label: "Wireframes" },
  { id: "hi-fi", label: "Hi-Fi" },
  { id: "gallery", label: "Gallery" },
  { id: "prototype", label: "Prototype" },
];

const CARBAZAAR_ACCENT = "#F5F590";

function Section({
  children,
  dark = false,
}: {
  children: React.ReactNode;
  dark?: boolean;
}) {
  return (
    <section className={`py-12 md:py-16 lg:py-20 xl:py-28 ${dark ? "bg-surface/50" : ""}`}>
      <div className="max-w-4xl mx-auto px-6">{children}</div>
    </section>
  );
}

function SectionHeader({
  label,
  title,
}: {
  label: string;
  title: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mb-10"
    >
      <p className="text-accent text-xs tracking-[0.3em] uppercase mb-2">
        {label}
      </p>
      <h2 className="text-2xl lg:text-3xl font-bold">{title}</h2>
    </motion.div>
  );
}

function AnimatedCard({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      className={`bg-surface border border-border rounded-2xl p-6 ${className}`}
    >
      {children}
    </motion.div>
  );
}

const hifiSlides = [
  { src: "/projects/Landing.png", title: "Landing Page" },
  { src: "/projects/AuctionsListPage.png", title: "Auctions Page" },
  { src: "/projects/Auction Page.png", title: "Auction Page" },
];

function HiFiSlider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);

  const handleScroll = useCallback(() => {
    const el = sliderRef.current;
    if (!el) return;
    const slideWidth = el.scrollWidth / hifiSlides.length;
    const index = Math.round(el.scrollLeft / slideWidth);
    setActiveIndex(index);
  }, []);

  const goTo = useCallback((index: number) => {
    const el = sliderRef.current;
    if (!el) return;
    const slideWidth = el.scrollWidth / hifiSlides.length;
    el.scrollTo({ left: slideWidth * index, behavior: "smooth" });
    setActiveIndex(index);
  }, []);

  return (
    <div className="lg:hidden">
      <div
        ref={sliderRef}
        onScroll={handleScroll}
        className="flex gap-4 overflow-x-auto pb-4"
        style={{ scrollSnapType: "x mandatory", WebkitOverflowScrolling: "touch", scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        <style>{`.hifi-scroll::-webkit-scrollbar { display: none; }`}</style>
        {hifiSlides.map((slide) => (
          <div
            key={slide.title}
            className="flex-shrink-0 w-[90%]"
            style={{ scrollSnapAlign: "center" }}
          >
            <img src={slide.src} alt={slide.title} className="w-full rounded-xl" />
            <p className="text-white text-base md:text-lg font-bold mt-3 text-center tracking-[-0.48px]" style={{ fontFamily: "'Poppins', sans-serif" }}>
              {slide.title}
            </p>
          </div>
        ))}
      </div>
      <div className="flex justify-center gap-3 mt-4">
        {hifiSlides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${i === activeIndex ? "bg-[#F5F590] w-6" : "bg-white/30"}`}
          />
        ))}
      </div>
    </div>
  );
}

/* ─── Coverflow gallery for CarBazaar admin screens ─── */
const CARBAZAAR_GALLERY = [
  { src: "/projects/carbazaar-gallery/dashboard.png", label: "Admin Dashboard" },
  { src: "/projects/carbazaar-gallery/announcements.png", label: "Announcements" },
  { src: "/projects/carbazaar-gallery/orders.png", label: "Orders Management" },
  { src: "/projects/carbazaar-gallery/new-car-modal.png", label: "Add New Car Modal" },
  { src: "/projects/carbazaar-gallery/profile.png", label: "Car Bids" },
];

function CarbazaarGallery() {
  const [activeIndex, setActiveIndex] = useState(0);
  const slides = CARBAZAAR_GALLERY;

  const next = () => setActiveIndex((p) => (p + 1) % slides.length);
  const prev = () => setActiveIndex((p) => (p - 1 + slides.length) % slides.length);

  return (
    <div className="relative w-full">
      <div className="relative w-full overflow-hidden" style={{ height: "clamp(260px, 50vw, 560px)" }}>
        {slides.map((slide, i) => {
          let offset = i - activeIndex;
          if (offset > slides.length / 2) offset -= slides.length;
          if (offset < -slides.length / 2) offset += slides.length;

          const abs = Math.abs(offset);
          const isCenter = offset === 0;
          const isVisible = abs <= 2;
          const scale = isCenter ? 1 : abs === 1 ? 0.72 : 0.55;
          const opacity = isVisible ? (isCenter ? 1 : abs === 1 ? 0.6 : 0.3) : 0;

          return (
            <button
              key={slide.src}
              onClick={() => setActiveIndex(i)}
              disabled={isCenter}
              aria-label={isCenter ? `Current: ${slide.label}` : `Show ${slide.label}`}
              className="absolute top-1/2 left-1/2 transition-all duration-500 ease-out"
              style={{
                transform: `translate(-50%, -50%) translateX(${offset * 38}%) scale(${scale})`,
                opacity,
                zIndex: 10 - abs,
                pointerEvents: !isVisible ? "none" : "auto",
                cursor: isCenter ? "default" : "pointer",
              }}
            >
              <img
                src={slide.src}
                alt={slide.label}
                className="w-[58vw] max-w-[680px] rounded-xl shadow-2xl"
                draggable={false}
              />
            </button>
          );
        })}
      </div>

      {/* Active label */}
      <p
        className="text-center text-white text-base md:text-lg font-bold mt-6"
        style={{ fontFamily: "'Poppins', sans-serif" }}
      >
        {slides[activeIndex].label}
      </p>

      {/* Arrows */}
      <button
        onClick={prev}
        aria-label="Previous"
        className="absolute left-2 md:left-4 top-[calc(50%-2rem)] -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full bg-[rgba(45,49,61,0.85)] hover:bg-[rgba(45,49,61,1)] backdrop-blur-sm border border-[#F5F590]/20 flex items-center justify-center text-[#F5F590] hover:border-[#F5F590]/60 transition-all"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M12 4l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <button
        onClick={next}
        aria-label="Next"
        className="absolute right-2 md:right-4 top-[calc(50%-2rem)] -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full bg-[rgba(45,49,61,0.85)] hover:bg-[rgba(45,49,61,1)] backdrop-blur-sm border border-[#F5F590]/20 flex items-center justify-center text-[#F5F590] hover:border-[#F5F590]/60 transition-all"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M8 4l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-6">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            aria-label={`Go to slide ${i + 1}`}
            className="h-2 rounded-full transition-all duration-300"
            style={{
              width: i === activeIndex ? 24 : 8,
              backgroundColor: i === activeIndex ? "#F5F590" : "rgba(255,255,255,0.25)",
            }}
          />
        ))}
      </div>
    </div>
  );
}

export function CarbazaarCaseStudy() {
  return (
    <>
      <CaseStudyToc sections={CARBAZAAR_TOC} accent={CARBAZAAR_ACCENT} />
      {/* Problem Statement */}
      <section id="overview" className="relative py-12 md:py-16 lg:py-20 xl:py-28 overflow-hidden bg-[#242731]">
        {/* Noise texture overlay */}
        <div
          className="absolute inset-0 opacity-[0.13] pointer-events-none"
          style={{ backgroundImage: "url('/hero/card-noise.png')", backgroundSize: "1024px 1024px" }}
        />

        <div className="relative flex items-start">
          {/* Left — text content */}
          <div className="flex-1 min-w-0 px-4 md:px-6 lg:max-w-[65%] lg:pl-[8%] lg:pr-[16px] lg:mr-[35%]">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-xl md:text-2xl lg:text-[32px] font-bold text-[#cbcbcb] mb-3">
                Problem Statement
              </h2>
              <div className="w-[105px] h-[3px] rounded-full bg-[#F5F590] mb-8" />
              <p className="text-sm md:text-base leading-relaxed text-white/90">
                {carbazaar.problemStatement}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="mt-14"
            >
              <h2 className="text-xl md:text-2xl lg:text-[32px] font-bold text-[#cbcbcb] mb-3">
                Goals
              </h2>
              <div className="w-[105px] h-[3px] rounded-full bg-[#F5F590] mb-8" />
              <p className="text-sm md:text-base leading-relaxed text-white/90">
                {carbazaar.goals}
              </p>
            </motion.div>
          </div>

          {/* Right — phone mockup, stuck to right edge */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="hidden lg:block absolute right-0 top-0 bottom-0 w-[35%]"
          >
            <img
              src="/projects/carbazaar-phone.png"
              alt="CarBazaar app mockup"
              className="w-full h-full object-contain object-right-top"
            />
          </motion.div>
        </div>
      </section>

      {/* Design Thinking Process */}
      <section id="process" className="relative py-12 md:py-16 lg:py-20 xl:py-28 overflow-hidden">
        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10 px-4 md:px-6 lg:pl-[8%] lg:pr-0"
          >
            <h2 className="text-xl md:text-2xl lg:text-[32px] font-bold text-[#cbcbcb] mb-3">
              Design Thinking Process
            </h2>
            <div className="w-[105px] h-[3px] rounded-full bg-[#F5F590]" />
          </motion.div>
          <div className="max-w-4xl mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-5">
            {carbazaar.designProcess.map((step, i) => {
            const icons = [Heart, Users, Lightbulb, Layers, CheckCircle2];
            const Icon = icons[i] || Heart;
            return (
              <motion.div
                key={step.phase}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`relative rounded-[24px] md:rounded-[40px] p-5 md:p-6 pb-4 md:pb-5 shadow-[0px_-28px_108px_0px_rgba(36,39,49,0.74)] w-full sm:w-[calc((100%-20px)/2)] lg:w-[calc((100%-40px)/3)] min-h-[180px] md:min-h-[220px] flex flex-col ${step.phase === "Define" ? "bg-[#F5F590]" : "bg-[#2d313d]"}`}
              >
                <div className="flex items-start gap-4 flex-1">
                  {/* Hexagon icon */}
                  <div className="relative shrink-0 w-[64px] h-[64px]">
                    <div
                      className="absolute inset-0 w-full h-full"
                      style={{ ["--fill-0" as string]: step.phase === "Define" ? "#2D313D" : "#F5F590" }}
                      dangerouslySetInnerHTML={{
                        __html: `<svg preserveAspectRatio="none" width="100%" height="100%" viewBox="0 0 77.9742 76.6207" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M33.7805 1.18837C37.0707 -0.396125 40.9035 -0.396124 44.1937 1.18837L65.8356 11.6106C69.1258 13.1951 71.5155 16.1916 72.3281 19.7519L77.6732 43.1704C78.4858 46.7307 77.633 50.4673 75.3561 53.3225L60.3794 72.1026C58.1025 74.9578 54.6493 76.6207 50.9974 76.6207H26.9768C23.3249 76.6207 19.8717 74.9578 17.5948 72.1026L2.61813 53.3225C0.34121 50.4673 -0.51165 46.7307 0.300974 43.1704L5.64608 19.7519C6.4587 16.1916 8.84836 13.1951 12.1386 11.6106L33.7805 1.18837Z" fill="var(--fill-0, #F5F590)"/></svg>`,
                      }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Icon size={28} className={step.phase === "Define" ? "text-white" : "text-[#2d313d]"} />
                    </div>
                  </div>
                  {/* Text content */}
                  <div className="flex-1 min-w-0">
                    <h3 className={`text-xl md:text-2xl font-normal mb-2 ${step.phase === "Define" ? "text-[#3D3D3D]" : "text-white"}`}>
                      {step.phase}
                    </h3>
                    <p className={`text-sm leading-relaxed tracking-[-0.3px] ${step.phase === "Define" ? "text-[#3D3D3D]/80" : "text-white/80"}`}>
                      {step.activities.join(", ")}
                    </p>
                  </div>
                </div>
                {/* Week — centered at card footer */}
                <p className={`text-xl md:text-2xl whitespace-nowrap text-center mt-4 ${step.phase === "Define" ? "text-[#3D3D3D]/50" : "text-[#6e7286]"}`}>
                  {step.week}
                </p>
              </motion.div>
            );
            })}
          </div>
          </div>
        </div>

        {/* Pattern — behind cards, stuck to right edge */}
        <div className="absolute right-0 top-[10%] pointer-events-none opacity-50">
          <div className="relative w-[650px] h-[650px]">
            {/* Base pattern (dim) */}
            <img
              src="/projects/pattern-union.svg"
              alt=""
              className="w-full h-full rotate-180 opacity-30"
            />
            {/* Bright flowing electricity layer */}
            <div
              className="absolute inset-0 rotate-180"
              style={{
                maskImage: "url('/projects/pattern-union.svg')",
                WebkitMaskImage: "url('/projects/pattern-union.svg')",
                maskSize: "100% 100%",
                WebkitMaskSize: "100% 100%",
              }}
            >
              {/* The electricity — bright #F5F590 band that sweeps from right → curve → down */}
              <div
                className="w-full h-full electricity-flow"
                style={{
                  background: "#F5F590",
                  maskImage: "linear-gradient(var(--elec-angle), transparent 0%, transparent var(--elec-start), #fff var(--elec-mid1), #fff var(--elec-mid2), transparent var(--elec-end), transparent 100%)",
                  WebkitMaskImage: "linear-gradient(var(--elec-angle), transparent 0%, transparent var(--elec-start), #fff var(--elec-mid1), #fff var(--elec-mid2), transparent var(--elec-end), transparent 100%)",
                  filter: "drop-shadow(0 0 8px #F5F590) drop-shadow(0 0 20px rgba(245,245,144,0.6))",
                  animation: "electricityFlow 5s ease-in-out infinite",
                }}
              />
            </div>
            {/* Glow layer for extra shine */}
            <div
              className="absolute inset-0 rotate-180"
              style={{
                maskImage: "url('/projects/pattern-union.svg')",
                WebkitMaskImage: "url('/projects/pattern-union.svg')",
                maskSize: "100% 100%",
                WebkitMaskSize: "100% 100%",
              }}
            >
              <div
                className="w-full h-full"
                style={{
                  background: "#F5F590",
                  maskImage: "linear-gradient(var(--elec-angle), transparent 0%, transparent var(--elec-start), #fff var(--elec-mid1), #fff var(--elec-mid2), transparent var(--elec-end), transparent 100%)",
                  WebkitMaskImage: "linear-gradient(var(--elec-angle), transparent 0%, transparent var(--elec-start), #fff var(--elec-mid1), #fff var(--elec-mid2), transparent var(--elec-end), transparent 100%)",
                  filter: "blur(6px) brightness(2)",
                  opacity: 0.7,
                  animation: "electricityFlow 5s ease-in-out infinite",
                }}
              />
            </div>
          </div>
        </div>
        <style>{`
          @property --elec-angle {
            syntax: '<angle>';
            inherits: false;
            initial-value: 0deg;
          }
          @property --elec-start {
            syntax: '<percentage>';
            inherits: false;
            initial-value: 0%;
          }
          @property --elec-mid1 {
            syntax: '<percentage>';
            inherits: false;
            initial-value: 0%;
          }
          @property --elec-mid2 {
            syntax: '<percentage>';
            inherits: false;
            initial-value: 0%;
          }
          @property --elec-end {
            syntax: '<percentage>';
            inherits: false;
            initial-value: 0%;
          }
          @keyframes electricityFlow {
            /* Start: bright band on the right horizontal lines */
            0% {
              --elec-angle: 0deg;
              --elec-start: 70%;
              --elec-mid1: 80%;
              --elec-mid2: 95%;
              --elec-end: 100%;
            }
            /* Flow left along horizontal lines */
            30% {
              --elec-angle: 0deg;
              --elec-start: 15%;
              --elec-mid1: 25%;
              --elec-mid2: 45%;
              --elec-end: 55%;
            }
            /* Transition through the curve — angle shifts to vertical */
            50% {
              --elec-angle: 45deg;
              --elec-start: 5%;
              --elec-mid1: 15%;
              --elec-mid2: 35%;
              --elec-end: 50%;
            }
            /* Flow down the vertical lines */
            75% {
              --elec-angle: 90deg;
              --elec-start: 30%;
              --elec-mid1: 45%;
              --elec-mid2: 65%;
              --elec-end: 75%;
            }
            /* Exit at the bottom */
            100% {
              --elec-angle: 90deg;
              --elec-start: 75%;
              --elec-mid1: 85%;
              --elec-mid2: 98%;
              --elec-end: 100%;
            }
          }
        `}</style>
      </section>


      {/* User Research */}
      <section id="research" className="relative py-12 md:py-16 lg:py-20 xl:py-28 overflow-hidden bg-[#242731]">
        <div
          className="absolute inset-0 opacity-[0.13] pointer-events-none"
          style={{ backgroundImage: "url('/hero/card-noise.png')", backgroundSize: "1024px 1024px" }}
        />

        <div className="relative px-4 md:px-8 lg:pl-[8%] lg:pr-[8%]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-xl md:text-2xl lg:text-[32px] font-bold text-[#cbcbcb] mb-3">
              User Research
            </h2>
            <div className="w-[105px] h-[3px] rounded-full bg-[#F5F590] mb-8" />
            <p className="text-sm md:text-base leading-relaxed text-white/90">
              {carbazaar.userResearch}
            </p>
          </motion.div>

          {/* Key Observations */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="mt-14"
          >
            <h2 className="text-xl md:text-2xl lg:text-[32px] font-bold text-[#cbcbcb] mb-3">
              Key Observations
            </h2>
            <div className="w-[105px] h-[3px] rounded-full bg-[#F5F590] mb-8" />

            {/* Row 1: 3 cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 mb-4 md:mb-5">
              {carbazaar.observations.slice(0, 3).map((obs, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="obs-card rounded-[24px] shadow-[0px_-1px_40px_0px_rgba(36,39,49,0.5)]"
                >
                  <div className="obs-card-inner rounded-[24px] p-6 flex flex-col h-full">
                    <span className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#F5F590] leading-none">
                      {obs.percentage}%
                    </span>
                    <p className="text-sm md:text-base leading-relaxed text-white/80 mt-3 flex-1">
                      {obs.text}
                    </p>
                    <p className="text-xs text-[#6e7286] mt-4 text-right font-semibold">
                      {obs.group}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Row 2: 2 cards centered between the 3 above */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5 sm:max-w-[66%] lg:max-w-none lg:flex lg:justify-center">
              {carbazaar.observations.slice(3, 5).map((obs, i) => (
                <motion.div
                  key={i + 3}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: (i + 3) * 0.1 }}
                  className="obs-card rounded-[24px] shadow-[0px_-1px_40px_0px_rgba(36,39,49,0.5)] lg:w-[calc((100%-40px)/3)]"
                >
                  <div className="obs-card-inner rounded-[24px] p-6 flex flex-col h-full">
                    <span className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#F5F590] leading-none">
                      {obs.percentage}%
                    </span>
                    <p className="text-sm md:text-base leading-relaxed text-white/80 mt-3 flex-1">
                      {obs.text}
                    </p>
                    <p className="text-xs text-[#6e7286] mt-4 text-right font-semibold">
                      {obs.group}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* User Personas */}
      <section id="personas" className="relative py-12 md:py-16 lg:py-20 xl:py-28 overflow-hidden bg-[#242731]">
        <div
          className="absolute inset-0 opacity-[0.13] pointer-events-none"
          style={{ backgroundImage: "url('/hero/card-noise.png')", backgroundSize: "1024px 1024px" }}
        />

        <div className="relative px-4 md:px-8 lg:pl-[8%] lg:pr-[8%]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-xl md:text-2xl lg:text-[32px] font-bold text-[#cbcbcb] mb-3">
              User Personas
            </h2>
            <div className="w-[105px] h-[3px] rounded-full bg-[#F5F590] mb-10" />
          </motion.div>

          {/* 4 persona cards — 2x2 grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {[
              {
                name: "Alexander Hoffman",
                age: 42,
                role: "Senior Manager · Luxury Car Dealership",
                quote: "I need one place to find the best deals, not ten.",
                img: "https://randomuser.me/api/portraits/men/32.jpg",
                tags: ["Detail-oriented", "Data-driven", "15+ yrs experience"],
                type: "Dealer",
                painPoints: [
                  "Fragmented auction platforms",
                  "No granular search filters",
                  "Delayed auction notifications",
                  "No market trend insights",
                ],
                goals: [
                  "One platform for all auctions",
                  "Real-time alerts on matching cars",
                  "Analytics for purchase decisions",
                  "Expand inventory with rare finds",
                ],
              },
              {
                name: "Sofia Marchetti",
                age: 35,
                role: "Independent Dealer · Milan, Italy",
                quote: "I can't compete if I don't see the inventory first.",
                img: "https://randomuser.me/api/portraits/women/44.jpg",
                tags: ["Resourceful", "Mobile-first", "Solo operator"],
                type: "Dealer",
                painPoints: [
                  "Limited access to premium inventory",
                  "Can't request specific vehicles",
                  "Opaque pricing and vehicle history",
                  "Slow manual sourcing process",
                ],
                goals: [
                  "Request cars before they're listed",
                  "Transparent pricing & condition data",
                  "Faster sourcing workflow",
                  "Compete with larger dealerships",
                ],
              },
              {
                name: "Marcus Weber",
                age: 48,
                role: "Platform Admin · Auto Auction Group",
                quote: "Keeping inventory accurate across crawled sources is a nightmare.",
                img: "https://randomuser.me/api/portraits/men/52.jpg",
                tags: ["Systematic", "Process-focused", "Tech-savvy"],
                type: "Admin",
                painPoints: [
                  "Inconsistent crawled data formats",
                  "Manual auction inventory management",
                  "Hard to validate dealer credentials",
                  "No automated request handling",
                ],
                goals: [
                  "Automate auction creation from crawls",
                  "Rule-based request management",
                  "Streamlined dealer verification",
                  "Consistent data across all sources",
                ],
              },
              {
                name: "Elena Petrov",
                age: 31,
                role: "Operations Lead · EU Auto Exchange",
                quote: "Every unverified purchase is a liability for us.",
                img: "https://randomuser.me/api/portraits/women/68.jpg",
                tags: ["Risk-aware", "Compliance-focused", "Analytical"],
                type: "Admin",
                painPoints: [
                  "Purchase validation is manual",
                  "Dealer fraud risk",
                  "No real-time inventory sync",
                  "Reporting is time-consuming",
                ],
                goals: [
                  "Automated purchase verification",
                  "Trusted dealer scoring system",
                  "Live inventory dashboard",
                  "One-click compliance reports",
                ],
              },
            ].map((persona, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-[#2d313d] rounded-[32px] p-5 shadow-[0px_-28px_108px_0px_rgba(36,39,49,0.74)]"
              >
                {/* Header */}
                <div className="flex gap-4 mb-4">
                  <div className="w-[90px] h-[90px] rounded-full bg-[#3a3f4f] overflow-hidden shrink-0">
                    <img src={persona.img} alt={persona.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-base md:text-lg text-white">{persona.name}, {persona.age}</span>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-[#F5F590]/10 text-[#F5F590] font-semibold">{persona.type}</span>
                    </div>
                    <p className="text-xs md:text-sm text-[#9ea1ae] mb-2">{persona.role}</p>
                    <p className="text-xs md:text-sm text-white/60 italic">&ldquo;{persona.quote}&rdquo;</p>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {persona.tags.map((tag) => (
                    <span key={tag} className="text-xs px-2.5 py-1 rounded-full border border-white/10 text-[#9ea1ae]">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Pain Points & Goals — side by side */}
                <div className="flex gap-4">
                  <div className="flex-1">
                    <h4 className="text-xs md:text-sm font-bold text-white mb-2">Pain Points</h4>
                    <ul className="space-y-1.5">
                      {persona.painPoints.map((p, j) => (
                        <li key={j} className="flex items-start gap-2 text-xs leading-snug text-white/70">
                          <span className="text-[#F5F590] mt-0.5 shrink-0">&#9679;</span>
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="w-px bg-white/10 shrink-0" />
                  <div className="flex-1">
                    <h4 className="text-xs md:text-sm font-bold text-white mb-2">Goals</h4>
                    <ul className="space-y-1.5">
                      {persona.goals.map((g, j) => (
                        <li key={j} className="flex items-start gap-2 text-xs leading-snug text-white/70">
                          <span className="text-[#F5F590] mt-0.5 shrink-0">&#9679;</span>
                          {g}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Competitive Analysis */}
      <section id="competition" className="relative py-12 md:py-16 lg:py-20 xl:py-28 overflow-hidden bg-[#242731]">
        <div
          className="absolute inset-0 opacity-[0.13] pointer-events-none"
          style={{ backgroundImage: "url('/hero/card-noise.png')", backgroundSize: "1024px 1024px" }}
        />

        <div className="relative px-4 md:px-8 lg:pl-[8%] lg:pr-[8%]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-xl md:text-2xl lg:text-[32px] font-bold text-[#cbcbcb] mb-3">
              Competitive Analysis
            </h2>
            <div className="w-[105px] h-[3px] rounded-full bg-[#F5F590] mb-10" />
          </motion.div>

          {/* Card-based table grid */}
          <MobileCollapsible
            summary="3 competitor platforms compared across 5 features"
            hint="Tap to expand the comparison"
            accent="#F5F590"
          >
            {/* Mobile: feature-as-card layout */}
            <div className="lg:hidden flex flex-col gap-3">
              {carbazaar.competitiveAnalysis.features.map((feature, fi) => (
                <div key={feature} className="bg-[#2d313d] rounded-2xl border border-[rgba(245,245,144,0.15)] p-5">
                  <h4 className="text-sm md:text-base font-bold text-white leading-snug mb-4 pb-3 border-b border-[rgba(58,63,66,0.4)]">
                    {feature}
                  </h4>
                  <div className="space-y-3">
                    {carbazaar.competitiveAnalysis.competitors.map((c) => {
                      const isOurs = c.name === "Carbazaar24";
                      return (
                        <div
                          key={c.name}
                          className={`flex items-center justify-between gap-3 ${
                            isOurs ? "bg-[rgba(245,245,144,0.08)] -mx-2 px-3 py-2 rounded-lg" : ""
                          }`}
                        >
                          <p className={`text-sm font-semibold ${isOurs ? "text-[#F5F590]" : "text-white"}`}>
                            {c.name}
                          </p>
                          {c.scores[fi] ? (
                            <div className="w-[26px] h-[26px] rounded-full bg-[#F5F590] flex items-center justify-center shrink-0">
                              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                                <path d="M3.5 8L6.5 11L12.5 5" stroke="#2d313d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            </div>
                          ) : (
                            <div className="w-[26px] h-[26px] rounded-full bg-[#FF6B6B] flex items-center justify-center shrink-0">
                              <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                                <path d="M3 3L11 11M11 3L3 11" stroke="#2d313d" strokeWidth="2" strokeLinecap="round" />
                              </svg>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop: original grid table */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="hidden lg:block"
            >
              {/* Header row */}
              <div className="grid grid-cols-[220px_1fr_1fr_1fr] gap-3 mb-3">
                <div className="bg-[#353a48] rounded-[20px] px-5 py-4 flex items-center justify-center">
                  <span className="text-sm font-semibold text-white text-center">Company Name</span>
                </div>
                {carbazaar.competitiveAnalysis.competitors.map((c) => (
                  <div key={c.name} className="bg-[#353a48] rounded-[20px] px-5 py-4 flex items-center justify-center">
                    <span className={`text-sm font-semibold text-center ${c.name === "Carbazaar24" ? "text-[#F5F590]" : "text-white"}`}>
                      {c.name}
                    </span>
                  </div>
                ))}
              </div>

              {/* Feature rows */}
              {carbazaar.competitiveAnalysis.features.map((feature, fi) => (
                <div key={feature} className="grid grid-cols-[220px_1fr_1fr_1fr] gap-3 mb-3">
                  {/* Feature name cell */}
                  <div className="bg-[#2d313d] rounded-[20px] px-5 py-5 flex items-center justify-center">
                    <span className="text-sm text-white/80 text-center">{feature}</span>
                  </div>
                  {/* Score cells */}
                  {carbazaar.competitiveAnalysis.competitors.map((c) => (
                    <div key={c.name} className="bg-[#2d313d] rounded-[20px] px-5 py-5 flex items-center justify-center">
                      {c.scores[fi] ? (
                        <div className="w-[32px] h-[32px] rounded-full bg-[#F5F590] flex items-center justify-center">
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M3.5 8L6.5 11L12.5 5" stroke="#2d313d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                      ) : (
                        <div className="w-[32px] h-[32px] rounded-full bg-[#FF6B6B] flex items-center justify-center">
                          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                            <path d="M3 3L11 11M11 3L3 11" stroke="#2d313d" strokeWidth="2" strokeLinecap="round" />
                          </svg>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </motion.div>
          </MobileCollapsible>
        </div>
      </section>




      {/* Information Architecture */}
      <section id="ia" className="relative py-12 md:py-16 lg:py-20 xl:py-28 overflow-hidden bg-[#242731]">
        <div
          className="absolute inset-0 opacity-[0.13] pointer-events-none"
          style={{ backgroundImage: "url('/hero/card-noise.png')", backgroundSize: "1024px 1024px" }}
        />

        <div className="relative px-4 md:px-8 lg:pl-[8%] lg:pr-[8%]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-xl md:text-2xl lg:text-[32px] font-bold text-[#cbcbcb] mb-3">
              Information Architecture
            </h2>
            <div className="w-[105px] h-[3px] rounded-full bg-[#F5F590] mb-10" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <MobileCollapsible
              summary="Site map and user journey across 18 screens"
              hint="Tap to view the full architecture diagram"
              accent="#F5F590"
            >
            <div className="overflow-x-auto -mx-4 px-4 md:mx-0 md:px-0">
            <svg viewBox="0 0 1000 1240" className="w-full max-w-[680px] mx-auto min-w-[500px] lg:min-w-0" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <marker id="ia-dot" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5">
                  <circle cx="5" cy="5" r="4" fill="#6a6a6a" />
                </marker>
                <marker id="ia-arrow" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="8" markerHeight="8" orient="auto">
                  <path d="M 0 0 L 10 5 L 0 10" fill="none" stroke="#6a6a6a" strokeWidth="1.5" />
                </marker>
                <marker id="ia-arrow-rev" viewBox="0 0 10 10" refX="0" refY="5" markerWidth="8" markerHeight="8" orient="auto">
                  <path d="M 10 0 L 0 5 L 10 10" fill="none" stroke="#6a6a6a" strokeWidth="1.5" />
                </marker>
                <filter id="ia-glow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <style>{`
                  .ia-elec {
                    stroke: #F5F590;
                    stroke-width: 3;
                    fill: none;
                    stroke-linecap: round;
                    stroke-dasharray: 0.13 0.87;
                    animation: ia-elec-flow 2.4s linear infinite;
                  }
                  @keyframes ia-elec-flow {
                    from { stroke-dashoffset: 1; }
                    to { stroke-dashoffset: 0; }
                  }
                `}</style>
              </defs>

              {/* ========== CONNECTING LINES (yellow, drawn first = behind boxes) ========== */}
              <g stroke="#6a6a6a" strokeWidth="1.5" fill="none">
                {/* Start bottom → Diamond top */}
                <line x1="500" y1="63" x2="500" y2="92" markerStart="url(#ia-dot)" markerEnd="url(#ia-arrow)" />

                {/* Diamond left → SignUp right (No) */}
                <line x1="422" y1="170" x2="345" y2="170" markerStart="url(#ia-dot)" markerEnd="url(#ia-arrow)" />
                {/* Diamond right → Login left (Yes) */}
                <line x1="578" y1="170" x2="645" y2="170" markerStart="url(#ia-dot)" markerEnd="url(#ia-arrow)" />

                {/* SignUp left → Left details right */}
                <line x1="220" y1="170" x2="200" y2="170" markerStart="url(#ia-dot)" markerEnd="url(#ia-arrow)" />
                {/* Login right → Right details left */}
                <line x1="780" y1="170" x2="800" y2="170" markerStart="url(#ia-dot)" markerEnd="url(#ia-arrow)" />

                {/* SignUp bottom → Home Page top (smooth L-curve) */}
                <path d="M 282 190 L 282 260 Q 282 275 297 275 L 485 275 Q 500 275 500 290 L 500 295" markerStart="url(#ia-dot)" markerEnd="url(#ia-arrow)" />
                {/* Login bottom → Home Page top (smooth L-curve) */}
                <path d="M 712 190 L 712 260 Q 712 275 697 275 L 515 275 Q 500 275 500 290 L 500 295" markerStart="url(#ia-dot)" markerEnd="url(#ia-arrow)" />

                {/* Home Page bottom → branch split */}
                <line x1="500" y1="335" x2="500" y2="365" markerStart="url(#ia-dot)" />
                {/* Horizontal branch */}
                <line x1="217" y1="365" x2="870" y2="365" />
                {/* Vertical drops → top of each branch box */}
                <line x1="217" y1="365" x2="217" y2="400" markerEnd="url(#ia-arrow)" />
                <line x1="440" y1="365" x2="440" y2="400" markerEnd="url(#ia-arrow)" />
                <line x1="640" y1="365" x2="640" y2="400" markerEnd="url(#ia-arrow)" />
                <line x1="870" y1="365" x2="870" y2="400" markerEnd="url(#ia-arrow)" />

                {/* Auctions bottom → Browse By top */}
                <line x1="217" y1="438" x2="217" y2="470" markerStart="url(#ia-dot)" markerEnd="url(#ia-arrow)" />
                {/* My Cars bottom → orders list top */}
                <line x1="440" y1="438" x2="440" y2="480" markerStart="url(#ia-dot)" markerEnd="url(#ia-arrow)" />
                {/* My Requests bottom → Requests list top */}
                <line x1="640" y1="438" x2="640" y2="480" markerStart="url(#ia-dot)" markerEnd="url(#ia-arrow)" />

                {/* Others right → right then down */}
                <path d="M 918 419 L 940 419 L 940 612" markerStart="url(#ia-dot)" />
                {/* Side branches → Profile right, Blog right, About Us right */}
                <line x1="940" y1="468" x2="895" y2="468" markerEnd="url(#ia-arrow)" />
                <line x1="940" y1="540" x2="895" y2="540" markerEnd="url(#ia-arrow)" />
                <line x1="940" y1="612" x2="897" y2="612" markerEnd="url(#ia-arrow)" />

                {/* orders list bottom → order detail top */}
                <line x1="440" y1="518" x2="440" y2="545" markerStart="url(#ia-dot)" markerEnd="url(#ia-arrow)" />
                {/* Requests list bottom → Request detail top */}
                <line x1="640" y1="518" x2="640" y2="555" markerStart="url(#ia-dot)" markerEnd="url(#ia-arrow)" />

                {/* Browse By bottom → Auction Detail top (straight vertical) */}
                <line x1="217" y1="640" x2="217" y2="710" markerStart="url(#ia-dot)" markerEnd="url(#ia-arrow)" />

                {/* Auction Detail left → Bid Form top (smooth corner) */}
                <path d="M 120 729 L 115 729 Q 100 729 100 744 L 100 780" markerStart="url(#ia-dot)" markerEnd="url(#ia-arrow)" />
                {/* Auction Detail right → Buy Now top (smooth corner) */}
                <path d="M 315 729 L 364 729 Q 379 729 379 744 L 379 780" markerStart="url(#ia-dot)" markerEnd="url(#ia-arrow)" />

                {/* Auction Detail bottom ↔ Diamond top (bidirectional, perfectly vertical) */}
                <line x1="217" y1="748" x2="217" y2="834" markerStart="url(#ia-arrow-rev)" markerEnd="url(#ia-arrow)" />
                {/* No label beside the bidirectional arrow */}
                <text x="225" y="795" fill="#cbcbcb" fontSize="13" fontWeight="bold" fontFamily="Montserrat, sans-serif" stroke="none">No</text>

                {/* Bid Form bottom → Diamond left (smooth corner) */}
                <path d="M 100 818 L 100 890 Q 100 905 115 905 L 146 905" markerStart="url(#ia-dot)" markerEnd="url(#ia-arrow)" />

                {/* Diamond bottom → Won? top (Yes) */}
                <line x1="217" y1="976" x2="217" y2="1029" markerStart="url(#ia-dot)" markerEnd="url(#ia-arrow)" />

                {/* Won? left → No → up → Home Page left (smooth corners) */}
                <path d="M 146 1100 L 35 1100 Q 20 1100 20 1085 L 20 330 Q 20 315 35 315 L 430 315" markerStart="url(#ia-dot)" markerEnd="url(#ia-arrow)" />
                {/* Won? right → After Purchase → right → up → Home Page right (smooth corners) */}
                <path d="M 288 1100 L 945 1100 Q 960 1100 960 1085 L 960 330 Q 960 315 945 315 L 570 315" markerStart="url(#ia-dot)" markerEnd="url(#ia-arrow)" />
              </g>

              {/* ========== ELECTRICITY FLOW ANIMATION ========== */}
              <g filter="url(#ia-glow)">
                {/* Route 1: Start → through Diamond → left → through SignUp → Left details */}
                <path className="ia-elec" d="M 500 63 L 500 170 L 200 170" pathLength={1} style={{ animationDelay: '0s', animationDuration: '3s' }} />
                {/* Route 2: Start → through Diamond → right → through Login → Right details */}
                <path className="ia-elec" d="M 500 63 L 500 170 L 800 170" pathLength={1} style={{ animationDelay: '0s', animationDuration: '3s' }} />

                {/* Route 3: SignUp → Home */}
                <path className="ia-elec" d="M 282 190 L 282 260 Q 282 275 297 275 L 485 275 Q 500 275 500 290 L 500 295" pathLength={1} style={{ animationDelay: '1.5s', animationDuration: '3s' }} />
                {/* Route 4: Login → Home */}
                <path className="ia-elec" d="M 712 190 L 712 260 Q 712 275 697 275 L 515 275 Q 500 275 500 290 L 500 295" pathLength={1} style={{ animationDelay: '1.5s', animationDuration: '3s' }} />

                {/* Route 5: Home → left → Auctions → Browse By → Auction Detail */}
                <path className="ia-elec" d="M 500 335 L 500 365 L 217 365 L 217 710" pathLength={1} style={{ animationDelay: '2.8s', animationDuration: '4s' }} />
                {/* Route 6: Home → My Cars → orders list → order detail */}
                <path className="ia-elec" d="M 500 335 L 500 365 L 440 365 L 440 545" pathLength={1} style={{ animationDelay: '2.8s', animationDuration: '3.5s' }} />
                {/* Route 7: Home → My Requests → Requests list → Request detail */}
                <path className="ia-elec" d="M 500 335 L 500 365 L 640 365 L 640 555" pathLength={1} style={{ animationDelay: '2.8s', animationDuration: '3.5s' }} />
                {/* Route 8: Home → Others → Profile */}
                <path className="ia-elec" d="M 500 335 L 500 365 L 870 365 L 870 419 L 940 419 L 940 468 L 895 468" pathLength={1} style={{ animationDelay: '2.8s', animationDuration: '4s' }} />
                {/* Route 9: side → Blog */}
                <path className="ia-elec" d="M 940 468 L 940 540 L 895 540" pathLength={1} style={{ animationDelay: '4.5s', animationDuration: '2s' }} />
                {/* Route 10: side → About Us */}
                <path className="ia-elec" d="M 940 540 L 940 612 L 897 612" pathLength={1} style={{ animationDelay: '5s', animationDuration: '2s' }} />

                {/* Route 11: AD left → through Bid Form → Diamond(AT) left */}
                <path className="ia-elec" d="M 120 729 L 115 729 Q 100 729 100 744 L 100 818 L 100 890 Q 100 905 115 905 L 146 905" pathLength={1} style={{ animationDelay: '4.5s', animationDuration: '3.5s' }} />
                {/* Route 12: AD right → Buy Now */}
                <path className="ia-elec" d="M 315 729 L 364 729 Q 379 729 379 744 L 379 780" pathLength={1} style={{ animationDelay: '4.5s', animationDuration: '2s' }} />

                {/* Route 13: AD bottom → Diamond(AT) top (down) */}
                <path className="ia-elec" d="M 217 748 L 217 834" pathLength={1} style={{ animationDelay: '4.5s', animationDuration: '2s' }} />
                {/* Route 14: Diamond(AT) top → AD bottom (up) */}
                <path className="ia-elec" d="M 217 834 L 217 748" pathLength={1} style={{ animationDelay: '5s', animationDuration: '2s' }} />

                {/* Route 15: Diamond(AT) bottom → Won? top */}
                <path className="ia-elec" d="M 217 976 L 217 1029" pathLength={1} style={{ animationDelay: '5.5s', animationDuration: '2s' }} />

                {/* Route 16: Won? → No → loop back to Home left */}
                <path className="ia-elec" d="M 146 1100 L 35 1100 Q 20 1100 20 1085 L 20 330 Q 20 315 35 315 L 430 315" pathLength={1} style={{ animationDelay: '6s', animationDuration: '5s' }} />
                {/* Route 17: Won? → After Purchase → loop back to Home right */}
                <path className="ia-elec" d="M 288 1100 L 945 1100 Q 960 1100 960 1085 L 960 330 Q 960 315 945 315 L 570 315" pathLength={1} style={{ animationDelay: '6s', animationDuration: '5s' }} />
              </g>

              {/* ========== START CIRCLE ========== */}
              <circle cx="500" cy="35" r="28" fill="#F5F590" />
              <text x="500" y="42" textAnchor="middle" fill="#263238" fontWeight="bold" fontSize="20" fontFamily="Montserrat, sans-serif">Start</text>

              {/* ========== DIAMOND: Have an account? ========== */}
              <g transform="translate(500, 170)">
                <rect x="-55" y="-55" width="110" height="110" rx="14" fill="#242731" stroke="#a39e9e" strokeWidth="1.5" transform="rotate(45)" />
                <text textAnchor="middle" fill="#cbcbcb" fontSize="15" fontFamily="Montserrat, sans-serif" fontWeight="500">
                  <tspan x="0" dy="-8">Have an</tspan>
                  <tspan x="0" dy="22">account?</tspan>
                </text>
              </g>

              {/* Labels: No / Yes */}
              <text x="385" y="142" textAnchor="middle" fill="#cbcbcb" fontSize="14" fontWeight="bold" fontFamily="Montserrat, sans-serif">No</text>
              <text x="610" y="142" textAnchor="middle" fill="#cbcbcb" fontSize="14" fontWeight="bold" fontFamily="Montserrat, sans-serif">Yes</text>

              {/* ========== SIGNUP PAGE ========== */}
              <rect x="220" y="150" width="125" height="40" rx="12" fill="#242731" stroke="#a39e9e" strokeWidth="1.5" />
              <text x="282" y="175" textAnchor="middle" fill="#cbcbcb" fontSize="16" fontFamily="Montserrat, sans-serif" fontWeight="500">SignUp Page</text>

              {/* ========== LOGIN PAGE ========== */}
              <rect x="645" y="150" width="135" height="40" rx="12" fill="#242731" stroke="#a39e9e" strokeWidth="1.5" />
              <text x="712" y="175" textAnchor="middle" fill="#cbcbcb" fontSize="16" fontFamily="Montserrat, sans-serif" fontWeight="500">Login Page</text>

              {/* ========== LEFT DETAILS BOX ========== */}
              <rect x="5" y="120" width="195" height="110" rx="12" fill="#242731" stroke="#a39e9e" strokeWidth="1.5" />
              <text fill="#cbcbcb" fontSize="14" fontFamily="Montserrat, sans-serif" fontWeight="500">
                <tspan x="25" y="150">• Fullname</tspan>
                <tspan x="25" dy="22">• Dealership Name</tspan>
                <tspan x="25" dy="22">• Email/Mobile</tspan>
                <tspan x="25" dy="22">• Password</tspan>
              </text>

              {/* ========== RIGHT DETAILS BOX ========== */}
              <rect x="800" y="130" width="190" height="80" rx="12" fill="#242731" stroke="#a39e9e" strokeWidth="1.5" />
              <text fill="#cbcbcb" fontSize="14" fontFamily="Montserrat, sans-serif" fontWeight="500">
                <tspan x="820" y="163">• Email/Mobile</tspan>
                <tspan x="820" dy="22">• Password</tspan>
              </text>

              {/* ========== HOME PAGE ========== */}
              <rect x="430" y="295" width="140" height="40" rx="12" fill="#242731" stroke="#a39e9e" strokeWidth="1.5" />
              <text x="500" y="320" textAnchor="middle" fill="#cbcbcb" fontSize="16" fontFamily="Montserrat, sans-serif" fontWeight="500">Home Page</text>

              {/* ========== AUCTIONS ========== */}
              <rect x="157" y="400" width="120" height="38" rx="12" fill="#242731" stroke="#a39e9e" strokeWidth="1.5" />
              <text x="217" y="424" textAnchor="middle" fill="#cbcbcb" fontSize="16" fontFamily="Montserrat, sans-serif" fontWeight="500">Auctions</text>

              {/* ========== MY CARS ========== */}
              <rect x="385" y="400" width="110" height="38" rx="12" fill="#242731" stroke="#a39e9e" strokeWidth="1.5" />
              <text x="440" y="424" textAnchor="middle" fill="#cbcbcb" fontSize="16" fontFamily="Montserrat, sans-serif" fontWeight="500">My Cars</text>

              {/* ========== MY REQUESTS ========== */}
              <rect x="572" y="400" width="136" height="38" rx="12" fill="#242731" stroke="#a39e9e" strokeWidth="1.5" />
              <text x="640" y="424" textAnchor="middle" fill="#cbcbcb" fontSize="16" fontFamily="Montserrat, sans-serif" fontWeight="500">My Requests</text>

              {/* ========== OTHERS ========== */}
              <rect x="822" y="400" width="96" height="38" rx="12" fill="#242731" stroke="#a39e9e" strokeWidth="1.5" />
              <text x="870" y="424" textAnchor="middle" fill="#cbcbcb" fontSize="16" fontFamily="Montserrat, sans-serif" fontWeight="500">Others</text>

              {/* ========== BROWSE BY (list box) ========== */}
              <rect x="132" y="470" width="170" height="180" rx="12" fill="#242731" stroke="#a39e9e" strokeWidth="1.5" />
              <text fill="#cbcbcb" fontSize="14" fontFamily="Montserrat, sans-serif" fontWeight="500">
                <tspan x="152" y="500">Browse By</tspan>
                <tspan x="152" dy="22">• Car&apos;s Model</tspan>
                <tspan x="152" dy="22">• Fuel Type</tspan>
                <tspan x="152" dy="22">• Body Type</tspan>
                <tspan x="152" dy="22">• Gear Type</tspan>
                <tspan x="152" dy="22">• Doors</tspan>
                <tspan x="152" dy="22">• Mileage</tspan>
              </text>

              {/* ========== ORDERS LIST ========== */}
              <rect x="378" y="480" width="124" height="38" rx="12" fill="#242731" stroke="#a39e9e" strokeWidth="1.5" />
              <text x="440" y="504" textAnchor="middle" fill="#cbcbcb" fontSize="16" fontFamily="Montserrat, sans-serif" fontWeight="500">orders list</text>

              {/* ========== REQUESTS LIST ========== */}
              <rect x="572" y="480" width="136" height="38" rx="12" fill="#242731" stroke="#a39e9e" strokeWidth="1.5" />
              <text x="640" y="504" textAnchor="middle" fill="#cbcbcb" fontSize="16" fontFamily="Montserrat, sans-serif" fontWeight="500">Requests list</text>

              {/* ========== PROFILE ========== */}
              <rect x="830" y="450" width="65" height="35" rx="12" fill="#242731" stroke="#a39e9e" strokeWidth="1.5" />
              <text x="862" y="473" textAnchor="middle" fill="#cbcbcb" fontSize="14" fontFamily="Montserrat, sans-serif" fontWeight="500">Profile</text>

              {/* ========== BLOG ========== */}
              <rect x="835" y="522" width="60" height="35" rx="12" fill="#242731" stroke="#a39e9e" strokeWidth="1.5" />
              <text x="865" y="545" textAnchor="middle" fill="#cbcbcb" fontSize="14" fontFamily="Montserrat, sans-serif" fontWeight="500">Blog</text>

              {/* ========== ABOUT US ========== */}
              <rect x="825" y="594" width="72" height="35" rx="12" fill="#242731" stroke="#a39e9e" strokeWidth="1.5" />
              <text x="861" y="617" textAnchor="middle" fill="#cbcbcb" fontSize="14" fontFamily="Montserrat, sans-serif" fontWeight="500">About Us</text>

              {/* ========== ORDER DETAIL PAGE (list box) ========== */}
              <rect x="325" y="545" width="230" height="110" rx="12" fill="#242731" stroke="#a39e9e" strokeWidth="1.5" />
              <text fill="#cbcbcb" fontSize="14" fontFamily="Montserrat, sans-serif" fontWeight="500">
                <tspan x="345" y="575">order detail Page:</tspan>
                <tspan x="345" dy="22">• Car General Detail Tab</tspan>
                <tspan x="345" dy="22">• Equipments Tab</tspan>
                <tspan x="345" dy="22">• Documents Tab</tspan>
              </text>

              {/* ========== REQUEST DETAIL PAGE ========== */}
              <rect x="560" y="555" width="165" height="38" rx="12" fill="#242731" stroke="#a39e9e" strokeWidth="1.5" />
              <text x="642" y="579" textAnchor="middle" fill="#cbcbcb" fontSize="14" fontFamily="Montserrat, sans-serif" fontWeight="500">Request detail Page</text>

              {/* ========== SELECT AN AUCTION LABEL ========== */}
              <text x="230" y="680" textAnchor="start" fill="#cbcbcb" fontSize="12" fontWeight="bold" fontFamily="Montserrat, sans-serif">Select An Auction</text>

              {/* ========== AUCTION DETAIL PAGE ========== */}
              <rect x="120" y="710" width="195" height="38" rx="12" fill="#242731" stroke="#a39e9e" strokeWidth="1.5" />
              <text x="217" y="734" textAnchor="middle" fill="#cbcbcb" fontSize="15" fontFamily="Montserrat, sans-serif" fontWeight="500">Auction Detail Page</text>

              {/* ========== LABELS: Place A Bid / Buy Now Button ========== */}
              <text textAnchor="middle" fill="#cbcbcb" fontSize="11" fontWeight="bold" fontFamily="Montserrat, sans-serif">
                <tspan x="75" y="726">Place A Bid</tspan>
                <tspan x="75" dy="14">Button</tspan>
              </text>
              <text x="385" y="722" textAnchor="middle" fill="#cbcbcb" fontSize="11" fontWeight="bold" fontFamily="Montserrat, sans-serif">Buy Now Button</text>

              {/* ========== BID FORM ========== */}
              <rect x="38" y="780" width="125" height="38" rx="12" fill="#242731" stroke="#a39e9e" strokeWidth="1.5" />
              <text x="100" y="804" textAnchor="middle" fill="#cbcbcb" fontSize="16" fontFamily="Montserrat, sans-serif" fontWeight="500">Bid Form</text>

              {/* ========== BUY NOW CONFIRMATION ========== */}
              <rect x="270" y="780" width="218" height="38" rx="12" fill="#242731" stroke="#a39e9e" strokeWidth="1.5" />
              <text x="379" y="804" textAnchor="middle" fill="#cbcbcb" fontSize="15" fontFamily="Montserrat, sans-serif" fontWeight="500">Buy Now Confirmation</text>

              {/* ========== SUBMIT A BID label ========== */}
              <text textAnchor="middle" fill="#cbcbcb" fontSize="11" fontWeight="bold" fontFamily="Montserrat, sans-serif">
                <tspan x="75" y="838">Submit</tspan>
                <tspan x="75" dy="14">A bid</tspan>
              </text>

              {/* ========== DIAMOND: Auction Times up? ========== */}
              <g transform="translate(217, 905)">
                <rect x="-50" y="-50" width="100" height="100" rx="14" fill="#242731" stroke="#a39e9e" strokeWidth="1.5" transform="rotate(45)" />
                <text textAnchor="middle" fill="#cbcbcb" fontSize="14" fontFamily="Montserrat, sans-serif" fontWeight="500">
                  <tspan x="0" dy="-12">Auction</tspan>
                  <tspan x="0" dy="18">Times</tspan>
                  <tspan x="0" dy="18">up?</tspan>
                </text>
              </g>

              {/* Yes label below Auction Times up? */}
              <text x="229" y="990" textAnchor="start" fill="#cbcbcb" fontSize="13" fontWeight="bold" fontFamily="Montserrat, sans-serif">Yes</text>

              {/* ========== DIAMOND: Won? ========== */}
              <g transform="translate(217, 1100)">
                <rect x="-50" y="-50" width="100" height="100" rx="14" fill="#242731" stroke="#a39e9e" strokeWidth="1.5" transform="rotate(45)" />
                <text textAnchor="middle" fill="#cbcbcb" fontSize="16" fontFamily="Montserrat, sans-serif" fontWeight="500">
                  <tspan x="0" dy="6">Won?</tspan>
                </text>
              </g>

              {/* No label (left of Won?) */}
              <text x="90" y="1095" textAnchor="middle" fill="#cbcbcb" fontSize="13" fontWeight="bold" fontFamily="Montserrat, sans-serif">No</text>

              {/* After Purchase* label (right of Won?) */}
              <text x="370" y="1095" textAnchor="middle" fill="#cbcbcb" fontSize="13" fontWeight="bold" fontFamily="Montserrat, sans-serif">After Purchase*</text>
            </svg>
            </div>
            </MobileCollapsible>
          </motion.div>
        </div>
      </section>

      {/* Typography */}
      <section id="typography" className="relative py-12 md:py-16 lg:py-20 xl:py-28 overflow-hidden bg-[#242731]">
        <div
          className="absolute inset-0 opacity-[0.13] pointer-events-none"
          style={{ backgroundImage: "url('/hero/card-noise.png')", backgroundSize: "1024px 1024px" }}
        />

        <div className="relative px-4 md:px-8 lg:pl-[8%] lg:pr-[8%]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-xl md:text-2xl lg:text-[32px] font-bold text-[#cbcbcb] mb-3">
              Typography
            </h2>
            <div className="w-[105px] h-[3px] rounded-full bg-[#F5F590] mb-10" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="flex flex-col lg:flex-row gap-12 lg:gap-20"
          >
            {/* Left: Font name + description */}
            <div className="flex-1">
              <h3 className="text-5xl sm:text-6xl md:text-7xl lg:text-[110px] font-bold text-white leading-[1] mb-6 md:mb-8 font-[family-name:var(--font-montserrat)]">
                Montserrat
              </h3>
              <p className="text-sm md:text-base leading-relaxed text-white/70 max-w-[540px] font-[family-name:var(--font-montserrat)]">
                I picked <span className="font-bold text-white">Montserrat</span> for two reasons. It stays readable at small sizes (the auction tables where dealers scan dozens of listings), and it has a wide weight range from Thin to Black, which let the homepage hero and the body copy share one font without losing personality.
              </p>
            </div>

            {/* Right: Font weights */}
            <div className="flex flex-col justify-center gap-1 shrink-0 font-[family-name:var(--font-montserrat)]">
              <span className="text-xs md:text-sm text-white/30" style={{ fontWeight: 200 }}>Extra Light</span>
              <span className="text-xs md:text-sm text-white/30" style={{ fontWeight: 100 }}>Thin</span>
              <span className="text-sm md:text-base text-white/40" style={{ fontWeight: 300 }}>Light</span>
              <span className="text-sm md:text-base text-white/50" style={{ fontWeight: 400 }}>Regular</span>
              <span className="text-base md:text-lg text-white/60" style={{ fontWeight: 500 }}>Medium</span>
              <span className="text-base md:text-lg text-white/70 font-semibold" style={{ fontWeight: 600 }}>Semi Bold</span>
              <span className="text-lg md:text-xl text-white/80" style={{ fontWeight: 700 }}>Bold</span>
              <span className="text-lg md:text-xl text-white/90" style={{ fontWeight: 800 }}>Extra Bold</span>
              <span className="text-xl md:text-2xl text-white" style={{ fontWeight: 900 }}>Black</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Color Palette */}
      <section id="colors" className="relative py-12 md:py-16 lg:py-20 xl:py-28 overflow-hidden bg-[#242731]">
        <div
          className="absolute inset-0 opacity-[0.13] pointer-events-none"
          style={{ backgroundImage: "url('/hero/card-noise.png')", backgroundSize: "1024px 1024px" }}
        />

        <div className="relative px-4 md:px-8 lg:pl-[8%] lg:pr-[8%]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-xl md:text-2xl lg:text-[32px] font-bold text-[#cbcbcb] mb-3">
              Color Palette
            </h2>
            <div className="w-[105px] h-[3px] rounded-full bg-[#F5F590] mb-10" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="flex justify-center"
          >
            <svg viewBox="-15 0 600 510" className="w-full max-w-[620px]" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <filter id="cp-glow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="30" />
                </filter>
              </defs>

              {/* Center glow */}
              <circle cx="260" cy="255" r="75" fill="#6B6B30" opacity="0.5" filter="url(#cp-glow)" />

              {/* Color arcs — filled annular sectors, 8px corners, ~16px gaps (6°) */}
              {/* Outer R=189, Inner R=141, band=48px, center=(260,255) */}
              <g>
                {/* Yellow #F5F590 — top (-52.5° to 52.5°, 105°) */}
                <path d="M 116.4 144.8 A 8 8 0 0 1 115.0 133.8 A 189 189 0 0 1 405.0 133.8 A 8 8 0 0 1 403.6 144.8 L 378.2 164.3 A 8 8 0 0 1 366.9 163.1 A 141 141 0 0 0 153.1 163.1 A 8 8 0 0 1 141.8 164.3 Z" fill="#F5F590" />

                {/* Gray #A4A5A6 — upper right (58.5° to 97.5°, 39°) */}
                <path d="M 414.3 160.4 A 8 8 0 0 1 425.3 163.4 A 189 189 0 0 1 448.3 271.7 A 8 8 0 0 1 439.4 278.6 L 407.7 274.4 A 8 8 0 0 1 400.6 265.4 A 141 141 0 0 0 384.3 188.4 A 8 8 0 0 1 387.0 177.1 Z" fill="#A4A5A6" />

                {/* Dark navy #242731 — right to bottom (103.5° to 170.5°, 67°) */}
                <path d="M 436.0 297.2 A 8 8 0 0 1 441.8 306.6 A 189 189 0 0 1 299.0 439.9 A 8 8 0 0 1 289.9 433.5 L 284.6 402.0 A 8 8 0 0 1 291.1 392.5 A 141 141 0 0 0 395.1 295.4 A 8 8 0 0 1 404.9 289.8 Z" fill="#242731" stroke="#F5F590" strokeWidth="1.5" strokeOpacity="0.3" />

                {/* White #FDFDFD — bottom left (176.5° to 230.5°, 54°) */}
                <path d="M 271.0 435.7 A 8 8 0 0 1 263.5 444.0 A 189 189 0 0 1 119.3 381.2 A 8 8 0 0 1 121.3 371.3 L 145.9 350.8 A 8 8 0 0 1 156.7 351.0 A 141 141 0 0 0 260.6 396.0 A 8 8 0 0 1 269.1 403.7 Z" fill="#FDFDFD" />

                {/* Dark gray #494B58 — left (236.5° to 301.5°, 65°) */}
                <path d="M 109.1 354.9 A 8 8 0 0 1 98.3 352.8 A 189 189 0 0 1 94.7 163.4 A 8 8 0 0 1 105.7 160.4 L 133.0 177.1 A 8 8 0 0 1 135.7 188.4 A 141 141 0 0 0 138.2 326.0 A 8 8 0 0 1 135.7 337.2 Z" fill="#494B58" stroke="#F5F590" strokeWidth="1.5" strokeOpacity="0.3" />
              </g>

              {/* "Color" center text */}
              <text x="260" y="268" textAnchor="middle" fill="white" fontSize="52" fontWeight="400" fontFamily="Montserrat, sans-serif" opacity="0.9">Color</text>

              {/* Hex labels — 16px outside outer edge at each arc's midpoint angle */}
              {/* Yellow mid=0°, Gray mid=78°, Navy mid=137°, White mid=203.5°, DarkGray mid=269° */}
              <text x="260" y="50" textAnchor="middle" fill="#cbcbcb" fontSize="14" fontFamily="Montserrat, sans-serif" fontWeight="500">#F5F590</text>
              <text x="464" y="217" textAnchor="start" fill="#cbcbcb" fontSize="14" fontFamily="Montserrat, sans-serif" fontWeight="500">#A4A5A6</text>
              <text x="403" y="410" textAnchor="start" fill="#cbcbcb" fontSize="14" fontFamily="Montserrat, sans-serif" fontWeight="500">#242731</text>
              <text x="175" y="448" textAnchor="end" fill="#cbcbcb" fontSize="14" fontFamily="Montserrat, sans-serif" fontWeight="500">#FDFDFD</text>
              <text x="55" y="256" textAnchor="end" fill="#cbcbcb" fontSize="14" fontFamily="Montserrat, sans-serif" fontWeight="500">#494B58</text>
            </svg>
          </motion.div>
        </div>
      </section>

      {/* Wireframes */}
      <section id="wireframes" className="relative py-12 md:py-16 lg:py-20 xl:py-28 overflow-hidden bg-[#242731]">
        <div
          className="absolute inset-0 opacity-[0.13] pointer-events-none"
          style={{ backgroundImage: "url('/hero/card-noise.png')", backgroundSize: "1024px 1024px" }}
        />

        <div className="relative px-4 md:px-8 lg:pl-[8%] lg:pr-[8%]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-xl md:text-2xl lg:text-[32px] font-bold text-[#cbcbcb] mb-3">
              Wireframes
            </h2>
            <div className="w-[105px] h-[3px] rounded-full bg-[#F5F590] mb-10" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <div
              className="relative overflow-hidden rounded-[20px] bg-[#1a1c24]"
              style={{ height: "clamp(400px, 50vw, 700px)" }}
            >
              <style>{`
                @keyframes wf-scroll-left {
                  0% { transform: translateX(0); }
                  100% { transform: translateX(-50%); }
                }
                @keyframes wf-scroll-right {
                  0% { transform: translateX(-50%); }
                  100% { transform: translateX(0); }
                }
                .wf-row-left { animation: wf-scroll-left 30s linear infinite; }
                .wf-row-right { animation: wf-scroll-right 30s linear infinite; }
              `}</style>

              <div
                className="absolute flex flex-col gap-5"
                style={{
                  transform: "rotate(-40deg)",
                  transformOrigin: "center center",
                  top: "-30%",
                  left: "-20%",
                  width: "140%",
                }}
              >
                {/* Row 0 — scrolls right (top), hidden on mobile */}
                <div className="hidden md:flex gap-5 wf-row-right" style={{ width: "200%", animationDuration: "28s" }}>
                  {["/projects/login.png", "/projects/Landing Page.png", "/projects/Cars_Page-1.png", "/projects/Details of Cars_Tab1.png", "/projects/Suggestion Modal.png", "/projects/Cars_Page.png",
                    "/projects/login.png", "/projects/Landing Page.png", "/projects/Cars_Page-1.png", "/projects/Details of Cars_Tab1.png", "/projects/Suggestion Modal.png", "/projects/Cars_Page.png",
                  ].map((src, i) => (
                    <img key={i} src={src} alt="" className="h-[180px] md:h-[240px] lg:h-[280px] w-auto rounded-xl shadow-2xl shrink-0 opacity-90" />
                  ))}
                </div>

                {/* Row 1 — scrolls left */}
                <div className="flex gap-5 wf-row-left" style={{ width: "200%" }}>
                  {["/projects/Landing Page.png", "/projects/Cars_Page.png", "/projects/Details of Cars_Tab1.png", "/projects/Suggestion Modal.png", "/projects/login.png", "/projects/Cars_Page-1.png",
                    "/projects/Landing Page.png", "/projects/Cars_Page.png", "/projects/Details of Cars_Tab1.png", "/projects/Suggestion Modal.png", "/projects/login.png", "/projects/Cars_Page-1.png",
                  ].map((src, i) => (
                    <img key={i} src={src} alt="" className="h-[180px] md:h-[240px] lg:h-[280px] w-auto rounded-xl shadow-2xl shrink-0 opacity-90" />
                  ))}
                </div>

                {/* Row 2 — scrolls right */}
                <div className="flex gap-5 wf-row-right" style={{ width: "200%" }}>
                  {["/projects/Cars_Page-1.png", "/projects/Suggestion Modal.png", "/projects/Landing Page.png", "/projects/login.png", "/projects/Cars_Page.png", "/projects/Details of Cars_Tab1.png",
                    "/projects/Cars_Page-1.png", "/projects/Suggestion Modal.png", "/projects/Landing Page.png", "/projects/login.png", "/projects/Cars_Page.png", "/projects/Details of Cars_Tab1.png",
                  ].map((src, i) => (
                    <img key={i} src={src} alt="" className="h-[180px] md:h-[240px] lg:h-[280px] w-auto rounded-xl shadow-2xl shrink-0 opacity-90" />
                  ))}
                </div>

                {/* Row 3 — scrolls left */}
                <div className="flex gap-5 wf-row-left" style={{ width: "200%", animationDuration: "35s" }}>
                  {["/projects/Details of Cars_Tab1.png", "/projects/login.png", "/projects/Cars_Page-1.png", "/projects/Landing Page.png", "/projects/Suggestion Modal.png", "/projects/Cars_Page.png",
                    "/projects/Details of Cars_Tab1.png", "/projects/login.png", "/projects/Cars_Page-1.png", "/projects/Landing Page.png", "/projects/Suggestion Modal.png", "/projects/Cars_Page.png",
                  ].map((src, i) => (
                    <img key={i} src={src} alt="" className="h-[180px] md:h-[240px] lg:h-[280px] w-auto rounded-xl shadow-2xl shrink-0 opacity-90" />
                  ))}
                </div>

                {/* Row 4 — scrolls right (bottom), hidden on mobile */}
                <div className="hidden md:flex gap-5 wf-row-right" style={{ width: "200%", animationDuration: "32s" }}>
                  {["/projects/Suggestion Modal.png", "/projects/Cars_Page.png", "/projects/login.png", "/projects/Landing Page.png", "/projects/Details of Cars_Tab1.png", "/projects/Cars_Page-1.png",
                    "/projects/Suggestion Modal.png", "/projects/Cars_Page.png", "/projects/login.png", "/projects/Landing Page.png", "/projects/Details of Cars_Tab1.png", "/projects/Cars_Page-1.png",
                  ].map((src, i) => (
                    <img key={i} src={src} alt="" className="h-[180px] md:h-[240px] lg:h-[280px] w-auto rounded-xl shadow-2xl shrink-0 opacity-90" />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* High Fidelity Screens */}
      <section id="hi-fi" className="relative py-12 md:py-16 lg:py-20 xl:py-28 overflow-hidden bg-[#242731]">
        <div
          className="absolute inset-0 opacity-[0.13] pointer-events-none"
          style={{ backgroundImage: "url('/hero/card-noise.png')", backgroundSize: "1024px 1024px" }}
        />

        <div className="relative px-4 md:px-8 lg:pl-[8%] lg:pr-[8%]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-start justify-between gap-3 mb-3">
              <h2 className="text-xl md:text-2xl lg:text-[32px] font-bold text-[#cbcbcb]">
                High Fidelity Screens
              </h2>
              <a
                href="https://www.figma.com/design/rSsTkCp2ClJlvHaMKp4L3O/CarBazaar24-Overview?node-id=652-17507&t=GcnwlBv0T1aFYiQV-1"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Explore more on Figma"
                className="group inline-flex items-center justify-center sm:justify-start gap-1.5 p-2 sm:px-4 sm:py-2 rounded-[10px] border text-xs md:text-sm font-medium transition-all hover:bg-[rgba(245,245,144,0.08)] shrink-0"
                style={{ borderColor: "rgba(245,245,144,0.4)", color: "#F5F590" }}
              >
                <span className="hidden sm:inline">Explore more</span>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                  <path d="M5 11L11 5M11 5H6M11 5V10" stroke="#F5F590" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
            <div className="w-[105px] h-[3px] rounded-full bg-[#F5F590] mb-10" />
          </motion.div>

          {/* Desktop: annotated cards with lines */}
          <div className="hidden lg:flex flex-col gap-24">
            {/* Card 1 — Left: Landing Page */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-row gap-0"
            >
              <div className="w-[55%] flex flex-col items-center">
                <div className="relative w-full">
                  <img src="/projects/laptop-frame.png" alt="" className="relative w-full pointer-events-none" />
                  <img
                    src="/projects/Landing.png"
                    alt="Landing Page"
                    className="absolute"
                    style={{
                      top: "2.3%",
                      left: "13.5%",
                      width: "73%",
                      height: "86.2%",
                      objectFit: "fill",
                      borderRadius: "8px 8px 0 0",
                    }}
                  />
                </div>
                <p className="text-white text-lg md:text-xl font-bold mt-4 tracking-[-0.48px]" style={{ fontFamily: "'Poppins', sans-serif" }}>
                  Landing Page
                </p>
              </div>
              <div className="w-[45%] relative" style={{ minHeight: 300 }}>
                <div className="absolute flex items-start gap-4" style={{ top: "6%" }}>
                  <div className="w-[100px] h-[1px] border-t border-dashed border-[#F5F590] mt-3 shrink-0" />
                  <div>
                    <h3 className="text-white text-base md:text-lg font-semibold" style={{ fontFamily: "'Poppins', sans-serif" }}>Navigation Bar</h3>
                    <p className="text-[#a39e9e] text-sm mt-1 leading-relaxed max-w-[280px]" style={{ fontFamily: "'Poppins', sans-serif" }}>
                      User can access Home page, Cars&apos; list page, Blog page and About Us page.
                    </p>
                  </div>
                </div>
                <div className="absolute flex items-start gap-4" style={{ top: "26%" }}>
                  <div className="w-[100px] h-[1px] border-t border-dashed border-[#F5F590] mt-3 shrink-0" />
                  <h3 className="text-white text-base md:text-lg font-semibold" style={{ fontFamily: "'Poppins', sans-serif" }}>Hero Section</h3>
                </div>
              </div>
            </motion.div>

            {/* Card 2 — Right: Auctions Page */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-row-reverse gap-0"
            >
              <div className="w-[55%] flex flex-col items-center">
                <div className="relative w-full">
                  <img src="/projects/laptop-frame.png" alt="" className="relative w-full pointer-events-none" />
                  <img
                    src="/projects/AuctionsListPage.png"
                    alt="Auctions Page"
                    className="absolute"
                    style={{
                      top: "2.3%",
                      left: "13.5%",
                      width: "73%",
                      height: "86.2%",
                      objectFit: "fill",
                      borderRadius: "8px 8px 0 0",
                    }}
                  />
                </div>
                <p className="text-white text-lg md:text-xl font-bold mt-4 tracking-[-0.48px]" style={{ fontFamily: "'Poppins', sans-serif" }}>
                  Auctions Page
                </p>
              </div>
              <div className="w-[45%] relative" style={{ minHeight: 300 }}>
                <div className="absolute flex items-start gap-4 flex-row-reverse text-right" style={{ top: "7%", right: 0 }}>
                  <div className="w-[100px] h-[1px] border-t border-dashed border-[#F5F590] mt-3 shrink-0" />
                  <h3 className="text-white text-base md:text-lg font-semibold" style={{ fontFamily: "'Poppins', sans-serif" }}>Navigation Bar</h3>
                </div>
                <div className="absolute flex items-start gap-4 flex-row-reverse text-right" style={{ top: "28%", right: 0 }}>
                  <div className="w-[100px] h-[1px] border-t border-dashed border-[#F5F590] mt-3 shrink-0" />
                  <h3 className="text-white text-base md:text-lg font-semibold" style={{ fontFamily: "'Poppins', sans-serif" }}>Special Offer Poster</h3>
                </div>
                <div className="absolute flex items-start gap-4 flex-row-reverse text-right" style={{ top: "50%", right: 0 }}>
                  <div className="w-[100px] h-[1px] border-t border-dashed border-[#F5F590] mt-3 shrink-0" />
                  <h3 className="text-white text-base md:text-lg font-semibold" style={{ fontFamily: "'Poppins', sans-serif" }}>Search and Filter</h3>
                </div>
                <div className="absolute flex items-start gap-4 flex-row-reverse text-right" style={{ top: "67%", right: 0 }}>
                  <div className="w-[100px] h-[1px] border-t border-dashed border-[#F5F590] mt-3 shrink-0" />
                  <h3 className="text-white text-base md:text-lg font-semibold" style={{ fontFamily: "'Poppins', sans-serif" }}>Auctions List</h3>
                </div>
              </div>
            </motion.div>

            {/* Card 3 — Left2: Auction Page */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-row gap-0"
            >
              <div className="w-[55%] flex flex-col items-center">
                <div className="relative w-full">
                  <img src="/projects/laptop-frame.png" alt="" className="relative w-full pointer-events-none" />
                  <img
                    src="/projects/Auction Page.png"
                    alt="Auction Page"
                    className="absolute"
                    style={{
                      top: "2.3%",
                      left: "13.5%",
                      width: "73%",
                      height: "86.2%",
                      objectFit: "fill",
                      borderRadius: "8px 8px 0 0",
                    }}
                  />
                </div>
                <p className="text-white text-lg md:text-xl font-bold mt-4 tracking-[-0.48px]" style={{ fontFamily: "'Poppins', sans-serif" }}>
                  Auction Page
                </p>
              </div>
              <div className="w-[45%] relative" style={{ minHeight: 300 }}>
                <div className="absolute flex items-start gap-4" style={{ top: "7%" }}>
                  <div className="w-[100px] h-[1px] border-t border-dashed border-[#F5F590] mt-3 shrink-0" />
                  <h3 className="text-white text-base md:text-lg font-semibold" style={{ fontFamily: "'Poppins', sans-serif" }}>Profile</h3>
                </div>
                <div className="absolute flex items-start gap-4" style={{ top: "26%" }}>
                  <div className="w-[100px] h-[1px] border-t border-dashed border-[#F5F590] mt-3 shrink-0" />
                  <h3 className="text-white text-base md:text-lg font-semibold" style={{ fontFamily: "'Poppins', sans-serif" }}>CTAs</h3>
                </div>
                <div className="absolute flex items-start gap-4" style={{ top: "40%" }}>
                  <div className="w-[100px] h-[1px] border-t border-dashed border-[#F5F590] mt-3 shrink-0" />
                  <h3 className="text-white text-base md:text-lg font-semibold" style={{ fontFamily: "'Poppins', sans-serif" }}>Tabs</h3>
                </div>
                <div className="absolute flex items-start gap-4" style={{ top: "57%" }}>
                  <div className="w-[100px] h-[1px] border-t border-dashed border-[#F5F590] mt-3 shrink-0" />
                  <h3 className="text-white text-base md:text-lg font-semibold" style={{ fontFamily: "'Poppins', sans-serif" }}>Car Details Table</h3>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Mobile: swipeable slider with captions */}
          <HiFiSlider />
        </div>
      </section>

      {/* Gallery */}
      <section id="gallery" className="relative py-12 md:py-16 lg:py-20 xl:py-28 overflow-hidden bg-[#242731]">
        <div
          className="absolute inset-0 opacity-[0.13] pointer-events-none"
          style={{ backgroundImage: "url('/hero/card-noise.png')", backgroundSize: "1024px 1024px" }}
        />

        <div className="relative px-4 md:px-8 lg:pl-[8%] lg:pr-[8%]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-xl md:text-2xl lg:text-[32px] font-bold text-[#cbcbcb] mb-3">
              Gallery
            </h2>
            <div className="w-[105px] h-[3px] rounded-full bg-[#F5F590] mb-10" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <CarbazaarGallery />
          </motion.div>
        </div>
      </section>

      {/* Prototype */}
      <section id="prototype" className="relative py-12 md:py-16 lg:py-20 xl:py-28 overflow-hidden bg-[#242731]">
        <div
          className="absolute inset-0 opacity-[0.13] pointer-events-none"
          style={{ backgroundImage: "url('/hero/card-noise.png')", backgroundSize: "1024px 1024px" }}
        />

        <div className="relative px-4 md:px-8 lg:pl-[8%] lg:pr-[8%]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-xl md:text-2xl lg:text-[32px] font-bold text-[#cbcbcb] mb-3">
              Prototype
            </h2>
            <div className="w-[105px] h-[3px] rounded-full bg-[#F5F590] mb-10" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="flex flex-col items-center"
          >
            {/* Laptop with video */}
            <div className="relative w-full max-w-[900px]">
              {/* Laptop frame as base layer */}
              <img
                src="/projects/laptop-frame.png"
                alt="Laptop frame"
                className="relative w-full"
              />
              {/* Video positioned inside the laptop screen */}
              <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute"
                style={{
                  top: "2.3%",
                  left: "13.5%",
                  width: "73%",
                  height: "86.2%",
                  objectFit: "cover",
                  zIndex: 1,
                  borderRadius: "8px 8px 0 0",
                }}
                src="/projects/carbazaar-prototype.mp4"
              />
            </div>

            {/* View Prototype button */}
            <a
              href="https://www.figma.com/proto/0kd5dzl82EypIjLPaPBNdt/CarBazaar24?node-id=1079-19499&t=1HrfaonnZtOjC84D-1&scaling=scale-down&content-scaling=fixed&page-id=652%3A17507&starting-point-node-id=978%3A18997"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 px-8 py-3 rounded-full bg-[#F5F590] text-[#242731] font-semibold text-sm md:text-base hover:opacity-90 transition-opacity"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              View Prototype
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="#242731" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </motion.div>
        </div>
      </section>

    </>
  );
}
