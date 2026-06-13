"use client";

import { useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { Search, Target, Lightbulb, Layers, Sparkles, ArrowUpRight } from "lucide-react";
import { backed } from "@/data/backed";
import { CaseStudyToc } from "@/components/case-study-toc";
import { MobileCollapsible } from "@/components/mobile-collapsible";

const ACCENT = "#53B9AB";

const BACKED_TOC = [
  { id: "overview", label: "Overview" },
  { id: "how-i-work", label: "Process" },
  { id: "research", label: "Research" },
  { id: "features", label: "Features" },
  { id: "governance", label: "Governance" },
  { id: "flows", label: "Flows" },
  { id: "visual-system", label: "Visual System" },
  { id: "final-designs", label: "Final Designs" },
  { id: "status", label: "Status" },
  { id: "learnings", label: "Takeaways" },
];

/* ─── Process Card with hover border glow + floating lights ─── */
function ProcessCard({
  step,
  cfg,
  delay,
}: {
  step: { phase: string; number: string; description: string };
  cfg: { iconBg: string; glowFrom: string; glowTo: string; Icon: React.ElementType; iconColor: string; borderColor: string };
  delay: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }, []);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      className="relative overflow-hidden rounded-[34px] w-full sm:w-[calc((100%-20px)/2)] lg:w-[calc((100%-60px)/3)] xl:w-[calc((100%-80px)/3)]"
      style={{ backgroundColor: "transparent" }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Static border — 10% opacity of card accent */}
      <div
        className="absolute inset-0 rounded-[34px] pointer-events-none z-[2]"
        style={{ border: `2px solid ${cfg.borderColor.replace("0.5)", "0.05)")}` }}
      />

      {/* Border glow that follows mouse — only visible on hover */}
      <div
        className="absolute inset-0 rounded-[34px] pointer-events-none transition-opacity duration-300 z-[3]"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(250px circle at ${mousePos.x}px ${mousePos.y}px, ${cfg.borderColor} 0%, transparent 70%)`,
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          maskComposite: "exclude",
          WebkitMaskComposite: "xor",
          padding: "2px",
        }}
      />

      {/* Floating glow — top (animated) */}
      <div
        className="absolute top-[-62px] left-[123px] w-[142px] h-[108px] rounded-[54px] blur-[35px]"
        style={{
          backgroundImage: `linear-gradient(-32deg, ${cfg.glowFrom} 34%, ${cfg.glowTo} 100%)`,
          animation: "float-glow-a 6s ease-in-out infinite",
        }}
      />
      {/* Floating glow — right (animated) */}
      <div
        className="absolute top-[100px] right-[-60px] w-[151px] h-[151px] rounded-full blur-[35px]"
        style={{
          backgroundImage: `linear-gradient(-85deg, ${cfg.glowFrom} 83%, ${cfg.glowTo} 100%)`,
          animation: "float-glow-b 8s ease-in-out infinite",
        }}
      />

      {/* Content */}
      <div className="relative z-[1] p-4 md:p-6 flex flex-col justify-between h-[170px] md:h-[194px]">
        <div className="flex items-end gap-2">
          <div
            className="w-[44px] h-[40px] md:w-[52px] md:h-[47px] rounded-[10px] md:rounded-[12px] flex items-center justify-center shrink-0"
            style={{ backgroundColor: cfg.iconBg }}
          >
            <cfg.Icon size={20} color={cfg.iconColor} />
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-bold text-[#ecedee]/80 leading-[16px]">#{step.number}</span>
            <span className="text-sm md:text-base font-bold text-white leading-snug">{step.phase}</span>
          </div>
        </div>
        <p className="text-xs md:text-sm font-medium leading-relaxed text-[#ecedee]/80 mt-auto">
          {step.description}
        </p>
      </div>
    </motion.div>
  );
}

/* ─── Hi-Fi Slider (mobile) ─── */
function HiFiSlider() {
  const slides = backed.highFidelity.screens;
  const [activeIndex, setActiveIndex] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);

  const handleScroll = useCallback(() => {
    const el = sliderRef.current;
    if (!el) return;
    const slideWidth = el.scrollWidth / slides.length;
    setActiveIndex(Math.round(el.scrollLeft / slideWidth));
  }, [slides.length]);

  const goTo = useCallback(
    (index: number) => {
      const el = sliderRef.current;
      if (!el) return;
      el.scrollTo({ left: (el.scrollWidth / slides.length) * index, behavior: "smooth" });
      setActiveIndex(index);
    },
    [slides.length],
  );

  return (
    <div className="lg:hidden">
      <div
        ref={sliderRef}
        onScroll={handleScroll}
        className="flex gap-3 sm:gap-4 overflow-x-auto pb-4 px-1"
        style={{ scrollSnapType: "x mandatory", WebkitOverflowScrolling: "touch", scrollbarWidth: "none" }}
      >
        {slides.map((s) => (
          <div key={s.title} className="flex-shrink-0 w-[88%] sm:w-[85%] max-w-[640px]" style={{ scrollSnapAlign: "center" }}>
            <div className="relative">
              <img src="/projects/laptop-frame.png" alt="" className="relative w-full pointer-events-none" />
              <video
                autoPlay loop muted playsInline
                className="absolute z-[1]"
                style={{ top: "2.3%", left: "13.5%", width: "73%", height: "86.2%", objectFit: "cover", borderRadius: "8px 8px 0 0" }}
                src={s.video}
              />
            </div>
            <p className="text-white text-base md:text-lg font-bold mt-3 text-center tracking-[-0.48px]">{s.title}</p>
            <p className="text-white/60 text-xs md:text-sm mt-1 text-center leading-relaxed px-2">{s.description.slice(0, 120)}...</p>
          </div>
        ))}
      </div>
      <div className="flex justify-center gap-3 mt-4">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className="h-2.5 rounded-full transition-all duration-300"
            style={{ width: i === activeIndex ? 24 : 10, backgroundColor: i === activeIndex ? ACCENT : "rgba(255,255,255,0.3)" }}
          />
        ))}
      </div>
    </div>
  );
}

/* ─── Section wrapper ─── */
function Sec({ children, className = "", id }: { children: React.ReactNode; className?: string; id?: string }) {
  return (
    <section id={id} className={`relative py-12 md:py-16 lg:py-20 xl:py-28 overflow-hidden bg-[#242731] ${className}`}>
      <div
        className="absolute inset-0 opacity-[0.13] pointer-events-none"
        style={{ backgroundImage: "url('/hero/card-noise.png')", backgroundSize: "1024px 1024px" }}
      />
      <div className="relative px-4 md:px-8 lg:pl-[8%] lg:pr-[8%]">{children}</div>
    </section>
  );
}

function Title({ children }: { children: React.ReactNode }) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
      <h2 className="text-xl md:text-2xl lg:text-[32px] font-bold text-[#cbcbcb] mb-3">{children}</h2>
      <div className="w-[105px] h-[3px] rounded-full mb-8 md:mb-10" style={{ backgroundColor: ACCENT }} />
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════════════ */
export function BackedCaseStudy() {
  return (
    <>
      <CaseStudyToc sections={BACKED_TOC} accent={ACCENT} />
      {/* ── Project Overview ── */}
      <section id="overview" className="relative py-12 md:py-16 lg:py-20 xl:py-28 overflow-hidden bg-[#242731]">
        <div
          className="absolute inset-0 opacity-[0.13] pointer-events-none"
          style={{ backgroundImage: "url('/hero/card-noise.png')", backgroundSize: "1024px 1024px" }}
        />
        <div className="relative px-4 md:px-8 lg:pl-[8%] lg:pr-[3%]">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-stretch">
            {/* Left: title + content */}
            <div className="flex-1 lg:max-w-[40%]">
              <Title>Project Overview</Title>
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
                <p className="text-sm md:text-base leading-relaxed text-white/80 mb-5">{backed.projectOverview.problem}</p>
                <ul className="space-y-3 mb-8">
                  {backed.projectOverview.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-3 text-xs md:text-sm leading-relaxed text-white/70">
                      <span style={{ color: ACCENT }} className="mt-1 shrink-0">&#9679;</span>
                      {h}
                    </li>
                  ))}
                </ul>

                {/* Result — styled like a sub-title */}
                <h3 className="text-base md:text-lg lg:text-xl font-bold text-[#cbcbcb] mb-2">The Result</h3>
                <div className="w-[60px] h-[3px] rounded-full mb-4" style={{ backgroundColor: ACCENT }} />
                <p className="text-sm md:text-base leading-relaxed text-white/80">{backed.projectOverview.result}</p>
              </motion.div>
            </div>
            {/* Right: video — same margin as left, aligned with title top */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex-1 lg:max-w-[60%] flex flex-col items-center justify-center gap-5"
            >
              <div className="relative w-full">
                {/* Laptop frame */}
                <img
                  src="/projects/laptop-frame.png"
                  alt=""
                  className="relative w-full pointer-events-none"
                />
                {/* Video inside screen */}
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="absolute z-[1]"
                  style={{
                    top: "2.3%",
                    left: "13.5%",
                    width: "73%",
                    height: "86.2%",
                    objectFit: "cover",
                    borderRadius: "8px 8px 0 0",
                  }}
                  src="/projects/backed/ProjectOverview.mp4"
                />
              </div>
              <a
                href="https://www.figma.com/proto/uMlKR9QjLy1ACIusUDv6gF/Backed-NextUI--Copy-?node-id=11475-59081&t=duCzqbXapda96jBp-1&scaling=scale-down&content-scaling=fixed&page-id=11475%3A58997"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-1.5 px-4 py-2 rounded-[10px] border text-xs md:text-sm font-medium transition-all hover:bg-[rgba(83,185,171,0.08)]"
                style={{ borderColor: "rgba(83,185,171,0.4)", color: ACCENT }}
              >
                View Prototype
                <ArrowUpRight size={14} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Design Process Framework ── */}
      <Sec id="how-i-work" className="bg-[#1e2029]">
        <style>{`
          @keyframes float-glow-a {
            0%   { transform: translate(0, 0); }
            15%  { transform: translate(-120px, 80px); }
            35%  { transform: translate(-80px, 160px); }
            50%  { transform: translate(60px, 120px); }
            65%  { transform: translate(140px, 40px); }
            80%  { transform: translate(80px, -20px); }
            100% { transform: translate(0, 0); }
          }
          @keyframes float-glow-b {
            0%   { transform: translate(0, 0); }
            20%  { transform: translate(100px, -60px); }
            40%  { transform: translate(60px, -120px); }
            55%  { transform: translate(-80px, -80px); }
            70%  { transform: translate(-140px, 20px); }
            85%  { transform: translate(-60px, 80px); }
            100% { transform: translate(0, 0); }
          }
        `}</style>
        <Title>How I Work</Title>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
          <p className="text-sm md:text-base leading-relaxed text-white/70 max-w-[800px] mb-10">
            I turn complex systems into simple, human-friendly experiences through a fast, structured, and insight-driven design approach.
          </p>

          {(() => {
            const cardConfigs = [
              { iconBg: "#ffcb47", glowFrom: "rgba(255,255,143,0.1)", glowTo: "rgba(255,203,71,0.06)", Icon: Search, iconColor: "#1a1a1a", borderColor: "rgba(255,203,71,0.5)" },
              { iconBg: "#01453d", glowFrom: "rgba(105,217,193,0.1)", glowTo: "rgba(112,225,200,0.04)", Icon: Target, iconColor: "#53B9AB", borderColor: "rgba(83,185,171,0.5)" },
              { iconBg: "#e5484d", glowFrom: "rgba(242,85,90,0.1)", glowTo: "rgba(229,72,77,0.04)", Icon: Lightbulb, iconColor: "#fff", borderColor: "rgba(229,72,77,0.5)" },
              { iconBg: "#1f2c5c", glowFrom: "rgba(132,157,255,0.1)", glowTo: "rgba(62,99,221,0.04)", Icon: Layers, iconColor: "#849dff", borderColor: "rgba(132,157,255,0.5)" },
              { iconBg: "#ae7ede", glowFrom: "rgba(120,40,200,0.1)", glowTo: "rgba(147,83,211,0.04)", Icon: Sparkles, iconColor: "#fff", borderColor: "rgba(147,83,211,0.5)" },
            ];

            return (
              <div className="flex flex-wrap justify-center gap-4 md:gap-5">
                {backed.designProcess.map((step, i) => (
                  <ProcessCard key={step.phase} step={step} cfg={cardConfigs[i]} delay={i * 0.08} />
                ))}
              </div>
            );
          })()}
        </motion.div>
      </Sec>

      {/* ── Applying the Process ── */}
      <Sec id="research">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="flex items-start justify-between gap-3 mb-3">
            <h2 className="text-xl md:text-2xl lg:text-[32px] font-bold text-[#cbcbcb]">Research &amp; Discovery</h2>
            <a
              href="https://www.figma.com/board/KuMmZbEXpH3Hm9ibwR4krH/Backed-Overview?node-id=1-665&t=RGJcoguMmADKIqRL-1"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Explore more on Figma"
              className="group inline-flex items-center justify-center sm:justify-start gap-1.5 p-2 sm:px-4 sm:py-2 rounded-[10px] border text-xs md:text-sm font-medium transition-all hover:bg-[rgba(83,185,171,0.08)] shrink-0"
              style={{ borderColor: "rgba(83,185,171,0.4)", color: ACCENT }}
            >
              <span className="hidden sm:inline">Explore more</span>
              <ArrowUpRight size={16} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </div>
          <div className="w-[105px] h-[3px] rounded-full mb-8 md:mb-10" style={{ backgroundColor: ACCENT }} />
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
          <p className="text-sm md:text-base leading-relaxed text-white/80 mb-10">{backed.applyingProcess}</p>

          <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-[#cbcbcb] mb-3">Understanding Users</h3>
          <p className="text-sm md:text-base leading-relaxed text-white/70 mb-6">{backed.researchIntro}</p>

          <style>{`
            @keyframes persona-float-1 {
              0%, 100% { transform: rotate(-32deg) translateY(0); }
              50% { transform: rotate(-32deg) translateY(-6px); }
            }
            @keyframes persona-float-1r {
              0%, 100% { transform: rotate(32deg) translateY(0); }
              50% { transform: rotate(32deg) translateY(-6px); }
            }
            @keyframes persona-float-2 {
              0%, 100% { transform: rotate(10deg) translateY(0); }
              50% { transform: rotate(10deg) translateY(-5px); }
            }
            @keyframes persona-float-2r {
              0%, 100% { transform: rotate(-10deg) translateY(0); }
              50% { transform: rotate(-10deg) translateY(-5px); }
            }
          `}</style>
          <h4 className="text-base md:text-lg font-semibold mb-16 md:mb-20" style={{ color: ACCENT }}>Personas</h4>

          {/* Persona cards — Row 1: 2 cards, Row 2: 1 centered, Row 3: 2 cards */}
          {(() => {
            const renderCard = (persona: typeof backed.personas[0], i: number, side: "left" | "right" | "center" = "left") => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (i % 2) * 0.1 }}
                className="relative lg:pt-12 flex"
              >
                {/* DESKTOP: Floating teardrop avatars above the card */}
                <div className={`hidden lg:flex absolute -top-16 z-[2] items-start ${side === "right" ? "-right-12 flex-row-reverse" : "-left-12"}`}>
                  {/* Image 1 — larger */}
                  <div style={{ animation: side === "right" ? "persona-float-1r 3s ease-in-out infinite" : "persona-float-1 3s ease-in-out infinite" }}>
                    <div className="relative w-[78px] h-[116px]">
                      <img src="/projects/backed/drop-mask.png" alt="" className="absolute inset-0 w-full h-full object-contain" style={side === "right" ? { transform: "scaleX(-1)" } : undefined} />
                      <div className="absolute top-[8%] left-[12%] w-[76%] aspect-square rounded-full overflow-hidden">
                        <img src={persona.avatars[0]} alt="" className="w-full h-full object-cover" />
                      </div>
                    </div>
                  </div>
                  {/* Image 2 — smaller */}
                  <div style={{ animation: side === "right" ? "persona-float-2r 4s ease-in-out infinite" : "persona-float-2 4s ease-in-out infinite", marginTop: "10px", ...(side === "right" ? { marginRight: "-6px" } : { marginLeft: "-6px" }) }}>
                    <div className="relative w-[58px] h-[86px]">
                      <img src="/projects/backed/drop-mask.png" alt="" className="absolute inset-0 w-full h-full object-contain" style={side === "right" ? { transform: "scaleX(-1)" } : undefined} />
                      <div className="absolute top-[8%] left-[12%] w-[76%] aspect-square rounded-full overflow-hidden">
                        <img src={persona.avatars[1]} alt="" className="w-full h-full object-cover" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card body */}
                <div className="bg-white rounded-[34px] md:rounded-[48px] p-7 md:p-10 flex flex-col flex-1 border border-[#e0e0e0]/50">
                  {/* Header */}
                  <div className="flex flex-col lg:flex-row gap-3 lg:gap-6 lg:items-start mb-5">
                    {/* Title row (with overlapping avatars on mobile) */}
                    <div className="flex items-start justify-between gap-4 lg:block lg:shrink-0">
                      <div className="min-w-0">
                        <h4 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#0d1a33] leading-tight">{persona.type}</h4>
                        <span className="inline-block mt-1.5 px-2.5 py-0.5 rounded-[10px] text-xs md:text-sm font-medium text-[#0d1a33]" style={{ backgroundColor: persona.badgeColor }}>
                          {persona.badge}
                        </span>
                      </div>
                      {/* MOBILE: Overlapping circular avatars */}
                      <div className="lg:hidden flex -space-x-3 shrink-0">
                        <div className="relative w-14 h-14 rounded-full overflow-hidden border-[3px] border-white shadow-md">
                          <img src={persona.avatars[0]} alt="" className="w-full h-full object-cover" />
                        </div>
                        <div className="relative w-14 h-14 rounded-full overflow-hidden border-[3px] border-white shadow-md">
                          <img src={persona.avatars[1]} alt="" className="w-full h-full object-cover" />
                        </div>
                      </div>
                    </div>
                    {/* Summary — flows below on mobile, on the right on desktop */}
                    <div className="flex-1 lg:text-right relative">
                      <img src="/projects/backed/quote-icon.png" alt="" className="w-[28px] h-[28px] md:w-[36px] md:h-[36px] opacity-80 mb-2 lg:absolute lg:mb-0 lg:-top-4 lg:right-[60px] xl:right-[70px]" />
                      <p className="text-sm md:text-base font-semibold text-[#0d1a33] mb-1">Summary</p>
                      <p className="text-sm md:text-base leading-[1.5] text-[#0d1a33]/80 italic" style={{ fontFamily: "'Georgia', serif" }}>
                        {persona.summary}
                      </p>
                    </div>
                  </div>

                  {/* Needs + Pain Points */}
                  <div className="flex flex-col sm:flex-row gap-5 sm:gap-6 flex-1">
                    <div className="flex-1">
                      <p className="text-sm md:text-base font-semibold text-[#0d1a33] leading-[1.8]">Needs</p>
                      <p className="text-xs text-[#0d1a33]/40 mb-2">List of things that may be required to use the product or service</p>
                      <ul className="space-y-1.5">
                        {persona.needs.map((n) => (
                          <li key={n} className="text-xs md:text-sm text-[#0d1a33]/80 leading-[1.7] list-disc ml-5">{n}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm md:text-base font-semibold text-[#0d1a33] leading-[1.8]">Pain points &amp; objections</p>
                      <p className="text-xs text-[#0d1a33]/40 mb-2">List of points of frustration that the user has encountered</p>
                      <ul className="space-y-1.5">
                        {persona.painPoints.map((p) => (
                          <li key={p} className="text-xs md:text-sm text-[#0d1a33]/80 leading-[1.7] list-disc ml-5">{p}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
            );

            return (
              <div className="mb-10">
                {/* Row 1: 2 cards */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-12 lg:gap-y-20 mb-12 lg:mb-20">
                  {renderCard(backed.personas[0], 0, "left")}
                  {renderCard(backed.personas[1], 1, "right")}
                </div>
                {/* Row 2: 1 card centered */}
                <div className="flex justify-center mb-12 lg:mb-20">
                  <div className="w-full lg:w-[55%]">
                    {renderCard(backed.personas[2], 2, "center")}
                  </div>
                </div>
                {/* Row 3: 2 cards */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-12 lg:gap-y-20">
                  {renderCard(backed.personas[3], 3, "left")}
                  {renderCard(backed.personas[4], 4, "right")}
                </div>
              </div>
            );
          })()}
        </motion.div>
      </Sec>

      {/* ── Feature Matrix ── */}
      <Sec id="features" className="bg-[#1e2029]">
        <Title>Mapping the Feature Landscape</Title>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
          <p className="text-sm md:text-base leading-relaxed text-white/70 mb-6">
            Before designing anything, I mapped every protocol feature against its target personas, user goals, and the pain points it needed to solve. The result was a clear picture of where the product stood and where the gaps were.
          </p>
          {/* Feature Matrix Table */}
          <MobileCollapsible
            summary="11 features mapped across 5 personas, goals & problems"
            hint="Tap to expand the full matrix"
            accent={ACCENT}
          >
          {(() => {
            const rows = [
              { feature: "Deposit", personas: "All Personas", goals: "Get started; grow portfolio assets", problems: "Confusing workflows for beginners", priority: "High", dark: true },
              { feature: "Withdraw", personas: "All Personas", goals: "Access funds easily; maintain liquidity", problems: "Unclear process; high gas costs for frequent actions", priority: "High", dark: false },
              { feature: "Onboarding Workflow", personas: "Beginners (New), Intermediate (New)", goals: "Build confidence; reduce reliance on help", problems: "Overwhelming UX; unclear terminology", priority: "High", dark: true },
              { feature: "Staking System", personas: "All Personas", goals: "Earn rewards; grow holdings steadily", problems: "Complex UX; high gas costs", priority: "High", dark: false },
              { feature: "Reward Mechanisms", personas: "All Personas", goals: "Unlock NFT utility; maximize rewards", problems: "Missed opportunities; lack of visibility", priority: "High", dark: true },
              { feature: "Wrapping & Unwrapping", personas: "Intermediate (All), Experts (All)", goals: "Manage assets efficiently", problems: "Confusing flows; high gas fees", priority: "Medium", dark: false },
              { feature: "Portfolio Analytics", personas: "Intermediate (All), Experts (All)", goals: "Track performance; optimize Strategie", problems: "No centralized tracking; unclear ROI", priority: "High", dark: true },
              { feature: "Governance Tools", personas: "Intermediate (Old), Experts (Old)", goals: "Participate in decisions; shape platform", problems: "Opaque governance; no execution layer", priority: "Medium", dark: false },
              { feature: "Gas Fee Optimization", personas: "All Personas", goals: "Reduce transaction costs", problems: "High gas discourages engagement", priority: "Medium", dark: true },
              { feature: "Equity Token Management", personas: "Intermediate (Old), Experts (Old)", goals: "Stake and govern efficiently", problems: "Manual tracking; unclear impact", priority: "Medium", dark: false },
              { feature: "Tutorials & Docs / Test Mode", personas: "Beginners (New), Intermediate (All)", goals: "Learn independently; test features safely", problems: "Poor documentation; overreliance on Discord or community explanations", priority: "Medium", dark: true },
            ];
            return (
              <>
                {/* Mobile: row-as-card layout */}
                <div className="lg:hidden flex flex-col gap-3 mb-6">
                  {rows.map((row) => (
                    <div key={row.feature} className="bg-[#2d313d] rounded-2xl border border-[rgba(83,185,171,0.18)] p-5">
                      <div className="flex items-start justify-between gap-3 mb-4 pb-3 border-b border-[rgba(58,63,66,0.4)]">
                        <h4 className="text-base font-bold text-white leading-snug">{row.feature}</h4>
                        <span
                          className={`shrink-0 text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-full ${
                            row.priority === "High"
                              ? "bg-[#53B9AB]/20 text-[#53B9AB]"
                              : "bg-white/10 text-white/70"
                          }`}
                        >
                          {row.priority}
                        </span>
                      </div>
                      <div className="space-y-3">
                        <div>
                          <p className="text-[10px] tracking-[0.15em] uppercase text-white/40 mb-1">Target Personas</p>
                          <p className="text-sm text-white/85 leading-relaxed">{row.personas}</p>
                        </div>
                        <div>
                          <p className="text-[10px] tracking-[0.15em] uppercase text-white/40 mb-1">User Goals</p>
                          <p className="text-sm text-white/85 leading-relaxed">{row.goals}</p>
                        </div>
                        <div>
                          <p className="text-[10px] tracking-[0.15em] uppercase text-white/40 mb-1">Problems Solved</p>
                          <p className="text-sm text-white/85 leading-relaxed">{row.problems}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Desktop: original wide table */}
                <div className="hidden lg:block overflow-x-auto -mx-4 px-4 md:mx-0 md:px-0 mb-6">
                  <style>{`
                    @keyframes matrix-spin {
                      0% { transform: rotate(0deg); }
                      100% { transform: rotate(360deg); }
                    }
                    .matrix-glow-wrap {
                      position: relative;
                      border-radius: 30px;
                      overflow: hidden;
                      padding: 2px;
                    }
                    .matrix-glow-wrap::before {
                      content: '';
                      position: absolute;
                      top: -50%;
                      left: -50%;
                      width: 200%;
                      height: 200%;
                      background: conic-gradient(
                        from 0deg,
                        transparent 0%,
                        transparent 70%,
                        rgba(83,185,171,0.6) 78%,
                        #53B9AB 85%,
                        rgba(83,185,171,0.6) 92%,
                        transparent 100%
                      );
                      animation: matrix-spin 6s linear infinite;
                      transform-origin: center center;
                    }
                    .matrix-glow-inner {
                      position: relative;
                      border-radius: 28px;
                      background: #242731;
                      border: 2px solid rgba(83,185,171,0.05);
                    }
                  `}</style>
                  <div className="matrix-glow-wrap min-w-[800px]">
                    <div className="matrix-glow-inner rounded-[34px] py-6">
                      {/* Header row */}
                      <div className="flex px-6 h-[60px] items-center">
                        {["Feature", "Target Personas", "User Goals", "Problems Solved", "Priority"].map((h, i) => (
                          <div key={h} className={`flex-1 px-4 text-sm md:text-base font-bold text-[#e3e5e8] ${i < 4 ? "border-r border-[rgba(58,63,66,0.3)]" : ""}`}>{h}</div>
                        ))}
                      </div>

                      {/* Data rows */}
                      {rows.map((row) => (
                        <div
                          key={row.feature}
                          className={`flex mx-6 ${row.dark ? "bg-[#151718] rounded-[26px] border border-[rgba(83,185,171,0.05)]" : ""}`}
                        >
                          {[row.feature, row.personas, row.goals, row.problems, row.priority].map((cell, ci) => (
                            <div
                              key={ci}
                              className={`flex-1 px-4 py-4 text-sm font-medium leading-[20px] flex items-center ${ci < 4 ? "border-r border-[rgba(58,63,66,0.3)]" : ""}`}
                              style={{ color: row.dark ? "#edecff" : "#e3e5e8" }}
                            >
                              {cell}
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            );
          })()}
          </MobileCollapsible>

        </motion.div>
      </Sec>

      {/* ── Zooming Into Governance ── */}
      <Sec id="governance">
        <Title>Zooming Into Governance</Title>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
          {/* Context callout */}
          <div className="relative bg-white rounded-[34px] md:rounded-[48px] p-6 md:p-10 mb-12">
            <svg className="absolute top-4 left-6 md:top-5 md:left-10 w-[32px] h-[32px] md:w-[40px] md:h-[40px]" viewBox="0 0 40 40" fill="none">
              <path d="M8 22h6l-4 8h4l4-8V12H8v10zm16 0h6l-4 8h4l4-8V12H24v10z" fill="#0d1a33" opacity="0.15" />
            </svg>
            <div className="pt-4 md:pt-6">
              <p className="text-sm md:text-base leading-relaxed text-[#0d1a33]/80 italic" style={{ fontFamily: "'Georgia', 'Lora', serif" }}>
                Due to the{" "}
                <span className="font-bold">scale of the protocol</span>
                {" "}and the{" "}
                <span className="font-bold">wide scope of features</span>
                , as well as the{" "}
                <span className="font-bold">confidential nature of some internal mechanisms</span>
                , this case study focuses on the governance system as a representative example of the research and design process.
              </p>
            </div>
          </div>

          {/* Feature Comparison Matrix */}
          <h3 className="text-base md:text-lg lg:text-xl font-bold text-[#cbcbcb] mb-3">How Others Do It</h3>
          <p className="text-sm md:text-base leading-relaxed text-white/70 mb-6">I compared how seven DeFi protocols actually run governance, looking for patterns, trade-offs, and opportunities that shaped Backed&apos;s hybrid approach.</p>
          <MobileCollapsible
            summary="7 DeFi protocols compared across 10 governance features"
            hint="Tap to expand the comparison"
            accent={ACCENT}
          >
          <div className="overflow-x-auto -mx-4 px-4 md:mx-0 md:px-0">
            <style>{`
              .fcm-glow-wrap {
                position: relative;
                border-radius: 30px;
                overflow: hidden;
                padding: 2px;
              }
              .fcm-glow-wrap::before {
                content: '';
                position: absolute;
                top: -50%;
                left: -50%;
                width: 200%;
                height: 200%;
                background: conic-gradient(
                  from 0deg,
                  transparent 0%,
                  transparent 70%,
                  rgba(174,126,222,0.6) 78%,
                  #AE7EDE 85%,
                  rgba(174,126,222,0.6) 92%,
                  transparent 100%
                );
                animation: gov-border-spin 6s linear infinite;
                transform-origin: center center;
              }
              .fcm-glow-inner {
                position: relative;
                border-radius: 28px;
                background: #242731;
                border: 2px solid rgba(174,126,222,0.05);
              }
            `}</style>

            {(() => {
              type CellVal = { icon: "check" | "cross" | "minus"; text?: string } | string;
              const iconSrc = { check: "/projects/backed/icons/Check Square.svg", cross: "/projects/backed/icons/close-square.svg", minus: "/projects/backed/icons/minus-square.svg" };
              const Icon = ({ type }: { type: "check" | "cross" | "minus" }) => (
                <img src={iconSrc[type]} alt={type} className="w-[18px] h-[18px] md:w-[20px] md:h-[20px]" />
              );

              const cols = ["Feature / Capability", "Aave", "Compound", "MakerDAO", "Curve", "Pendle", "Backed (ours)"];

              const rows: { feature: string; cells: CellVal[]; dark: boolean }[] = [
                { feature: "Governance Token Type", cells: ["AAVE, stkAAVE", "COMP", "MKR", "veCRV", "vePENDLE", "Equity → veEQ"], dark: true },
                { feature: "Core Voting Model", cells: ["Token-weighted + Snapshot", "Token-weighted", "Token-weighted on-chain", "veToken + gauge", "veToken gauge (emissions)", "Hybrid veToken + delegation + quadratic cost"], dark: false },
                { feature: "Delegation System", cells: [{ icon: "check", text: "Delegation" }, { icon: "check", text: "Delegation" }, { icon: "check", text: "Recognised Delegates" }, { icon: "cross" }, { icon: "cross" }, { icon: "check", text: "Delegators → Delegates" }], dark: true },
                { feature: "Snapshot / Temp-Check Stage", cells: [{ icon: "check", text: "Forum + Snapshot temp check" }, { icon: "cross" }, { icon: "check", text: "Governance Polls before Exec" }, { icon: "minus", text: "(direct on-chain for DAO votes)" }, { icon: "minus", text: "(off-chain signalling)" }, { icon: "check", text: "Forum + Temp-check before BIP" }], dark: false },
                { feature: "veToken / Lock-Based Voting", cells: [{ icon: "cross" }, { icon: "cross" }, { icon: "cross" }, { icon: "check", text: "veCRV" }, { icon: "check", text: "vePENDLE" }, { icon: "check", text: "veEQ (locked Equity)" }], dark: true },
                { feature: "Gauge-style Emission Control", cells: [{ icon: "cross" }, { icon: "cross" }, { icon: "cross" }, { icon: "check", text: "Gauge weights" }, { icon: "check", text: "Gauges for pools" }, { icon: "check", text: "Gauges for vaults / rewards (design dependent)" }], dark: false },
                { feature: "Bribe Market for Votes", cells: [{ icon: "cross" }, { icon: "cross" }, { icon: "cross" }, { icon: "minus", text: "via external platforms" }, { icon: "minus", text: "via Hidden Hand, etc." }, { icon: "minus", text: "(future-ready, can integrate)" }], dark: true },
                { feature: "Security / Emergency Guardian", cells: [{ icon: "check", text: "Emergency Guardian multisig" }, { icon: "minus", text: "(protocol admin)" }, { icon: "check", text: "Emergency shutdown + facilitators" }, { icon: "minus", text: "(Aragon + timelock)" }, { icon: "check", text: "Team multisig for upgrades" }, { icon: "check", text: "Governance Guardians + Protocol Emergency Guardians" }], dark: false },
                { feature: "Timelock Before Execution", cells: [{ icon: "check", text: "(1–7 days)" }, { icon: "check" }, { icon: "check", text: "Executive hat model" }, { icon: "check", text: "~3 days" }, { icon: "minus", text: "for upgrades via multisig" }, { icon: "check", text: "3–5 days timelock with pause option" }], dark: true },
                { feature: "On-Chain Automatic Execution", cells: [{ icon: "check" }, { icon: "check" }, { icon: "check" }, { icon: "check" }, { icon: "minus", text: "(gauges auto, upgrades multisig)" }, { icon: "check", text: "For smart-contract changes, with guardian pause" }], dark: false },
                { feature: "Anti-Spam / Proposal Thresholds", cells: [{ icon: "check", text: "Proposal power + thresholds" }, { icon: "check", text: "Proposal threshold" }, { icon: "check", text: "MIP process + thresholds" }, { icon: "check", text: "2,500 veCRV to propose" }, { icon: "check", text: "Lock PENDLE for vePENDLE" }, { icon: "check", text: "Proposition Power + quadratic cost model" }], dark: true },
              ];

              const protocolNames = cols.slice(1);

              return (
                <>
                  {/* Mobile: row-as-card layout */}
                  <div className="lg:hidden flex flex-col gap-3">
                    {rows.map((row) => (
                      <div key={row.feature} className="bg-[#2d313d] rounded-2xl border border-[rgba(174,126,222,0.2)] p-5">
                        <h4 className="text-base font-bold text-white leading-snug mb-4 pb-3 border-b border-[rgba(58,63,66,0.4)]">
                          {row.feature}
                        </h4>
                        <div className="space-y-3">
                          {row.cells.map((cell, ci) => {
                            const protocol = protocolNames[ci];
                            const isOurs = protocol === "Backed (ours)";
                            return (
                              <div
                                key={ci}
                                className={`flex items-start gap-3 ${
                                  isOurs ? "bg-[rgba(174,126,222,0.08)] -mx-2 px-2 py-2 rounded-lg" : ""
                                }`}
                              >
                                <p
                                  className={`text-[10px] tracking-[0.15em] uppercase font-semibold w-24 shrink-0 pt-0.5 ${
                                    isOurs ? "text-[#AE7EDE]" : "text-white/40"
                                  }`}
                                >
                                  {protocol}
                                </p>
                                <div className="flex items-start gap-2 flex-1 text-sm text-white/85 leading-relaxed">
                                  {typeof cell === "string" ? (
                                    <span>{cell}</span>
                                  ) : (
                                    <>
                                      <span className="shrink-0 mt-0.5"><Icon type={cell.icon} /></span>
                                      {cell.text ? <span>{cell.text}</span> : <span className="text-white/40">—</span>}
                                    </>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Desktop: original wide table */}
                  <div className="hidden lg:block fcm-glow-wrap min-w-[1100px]">
                    <div className="fcm-glow-inner py-4">
                      {/* Header */}
                      <div className="flex px-4 h-[50px] items-center">
                        {cols.map((h, ci) => (
                          <div key={h} className={`${ci === 0 ? "w-[16%]" : "w-[14%]"} px-2 text-xs font-bold text-[#e3e5e8] uppercase tracking-wider`}>{h}</div>
                        ))}
                      </div>
                      {/* Rows */}
                      {rows.map((row) => (
                        <div key={row.feature} className={`flex mx-4 items-stretch ${row.dark ? "bg-[#151718] rounded-[26px] border border-[rgba(174,126,222,0.05)]" : ""}`}>
                          <div className="w-[16%] px-2 py-3 text-xs md:text-sm font-medium text-[#e3e5e8] leading-[18px] flex items-center">{row.feature}</div>
                          {row.cells.map((cell, ci) => (
                            <div key={ci} className="w-[14%] px-2 py-3 text-xs font-medium text-[#e3e5e8]/80 leading-[18px] flex items-center gap-1.5">
                              {typeof cell === "string" ? (
                                <span>{cell}</span>
                              ) : (
                                <>
                                  <span className="shrink-0"><Icon type={cell.icon} /></span>
                                  {cell.text && <span>{cell.text}</span>}
                                </>
                              )}
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              );
            })()}
          </div>
          </MobileCollapsible>
        </motion.div>
      </Sec>

      {/* ── Designing the Flows ── */}
      <Sec id="flows" className="bg-[#1e2029]">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="flex items-start justify-between gap-3 mb-3">
            <h2 className="text-xl md:text-2xl lg:text-[32px] font-bold text-[#cbcbcb]">Designing the Flows</h2>
            <a
              href="https://www.figma.com/board/KuMmZbEXpH3Hm9ibwR4krH/Backed-Overview?node-id=1-2369&t=LmjxMr9McTzN4EIL-4"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Explore more on Figma"
              className="group inline-flex items-center justify-center sm:justify-start gap-1.5 p-2 sm:px-4 sm:py-2 rounded-[10px] border text-xs md:text-sm font-medium transition-all hover:bg-[rgba(83,185,171,0.08)] shrink-0"
              style={{ borderColor: "rgba(83,185,171,0.4)", color: ACCENT }}
            >
              <span className="hidden sm:inline">Explore more</span>
              <ArrowUpRight size={16} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </div>
          <div className="w-[105px] h-[3px] rounded-full mb-8 md:mb-10" style={{ backgroundColor: ACCENT }} />
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
          <p className="text-sm md:text-base leading-relaxed text-white/70 mb-10">
            With the governance model defined, I translated each decision path into detailed user flows. I mapped every state, edge case, and feedback loop so nothing was left to assumption.
          </p>

          <h3 className="text-base md:text-lg lg:text-xl font-bold text-[#cbcbcb] mb-3">Proposal &amp; Voting Flow</h3>
          <p className="text-sm md:text-base leading-relaxed text-white/70 mb-6">{backed.userFlows.governance.description}</p>
          <div className="rounded-[26px] overflow-hidden mb-12">
            <img src="/projects/backed/ProposalFlow.webp" alt="Governance Flows" className="w-full rounded-[26px]" />
          </div>

          <h3 className="text-base md:text-lg lg:text-xl font-bold text-[#cbcbcb] mb-3">Core Protocol Flows</h3>
          <p className="text-sm md:text-base leading-relaxed text-white/70 mb-6">
            Beyond governance, I mapped the critical protocol interactions: deposit, withdrawal, staking, and reward claiming. The aim was a consistent and predictable experience across every touchpoint. Below is the withdrawal flow as a representative example.
          </p>
          <MobileCollapsible
            summary="Withdrawal flow with 9 decision points and edge cases"
            hint="Tap to view the full flow diagram"
            accent={ACCENT}
          >
          <div className="overflow-x-auto -mx-4 px-4 md:mx-0 md:px-0">
            <svg viewBox="0 0 680 780" className="w-full max-w-[680px] mx-auto min-w-[500px] lg:min-w-0" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <marker id="sf-dot" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4">
                  <circle cx="5" cy="5" r="4" fill="#4a4a4a" />
                </marker>
                <marker id="sf-arr" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="5" markerHeight="5" orient="auto">
                  <path d="M 0 0 L 10 5 L 0 10" fill="none" stroke="#4a4a4a" strokeWidth="1.8" />
                </marker>
                <filter id="sf-glow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="3" result="b" />
                  <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
                <style>{`
                  .sf-elec { stroke: #53B9AB; stroke-width: 3; fill: none; stroke-linecap: round; stroke-dasharray: 0.13 0.87; animation: sf-flow 2.4s linear infinite; }
                  @keyframes sf-flow { from { stroke-dashoffset: 1; } to { stroke-dashoffset: 0; } }
                `}</style>
              </defs>

              {/* ===== BASE LINES with dots & arrows ===== */}
              <g stroke="#4a4a4a" strokeWidth="1.5" fill="none">
                {/* Enter bottom → Connect Wallet top */}
                <line x1="340" y1="45" x2="340" y2="65" markerStart="url(#sf-dot)" markerEnd="url(#sf-arr)" />
                {/* Connect Wallet bottom → Dashboard top */}
                <line x1="340" y1="98" x2="340" y2="118" markerStart="url(#sf-dot)" markerEnd="url(#sf-arr)" />
                {/* Dashboard left → Withdraw? top (L-curve) */}
                <path d="M 285 155 L 190 155 Q 175 155 175 170 L 175 228" markerStart="url(#sf-dot)" markerEnd="url(#sf-arr)" />
                {/* Dashboard bottom → CancelWithdraw? top */}
                <line x1="340" y1="188" x2="340" y2="228" markerStart="url(#sf-dot)" markerEnd="url(#sf-arr)" />
                {/* Dashboard right → Claim? top (L-curve) */}
                <path d="M 395 155 L 510 155 Q 525 155 525 170 L 525 228" markerStart="url(#sf-dot)" markerEnd="url(#sf-arr)" />

                {/* Withdraw? bottom → SelectVault top (Yes) */}
                <line x1="175" y1="308" x2="175" y2="330" markerStart="url(#sf-dot)" markerEnd="url(#sf-arr)" />
                {/* Withdraw? left → Dashboard left (No — loop back) */}
                <path d="M 135 268 L 80 268 Q 65 268 65 253 L 65 148 Q 65 138 75 138 L 285 138" markerStart="url(#sf-dot)" markerEnd="url(#sf-arr)" />

                {/* SelectVault bottom → TxnConfirm top */}
                <line x1="175" y1="430" x2="175" y2="455" markerStart="url(#sf-dot)" markerEnd="url(#sf-arr)" />
                {/* TxnConfirm left → Dashboard (If Success loop) */}
                <path d="M 130 478 L 50 478 Q 40 478 40 468 L 40 148 Q 40 138 50 138 L 285 138" markerStart="url(#sf-dot)" markerEnd="url(#sf-arr)" />
                {/* TxnConfirm right → If Failed/Canceled → up to SelectVault right */}
                <path d="M 225 475 L 260 475 Q 270 475 270 465 L 270 380 Q 270 370 260 370 L 230 370" markerStart="url(#sf-dot)" markerEnd="url(#sf-arr)" />

                {/* CancelWithdraw? right → Claim? left (No) */}
                <line x1="380" y1="268" x2="485" y2="268" markerStart="url(#sf-dot)" markerEnd="url(#sf-arr)" />
                {/* CancelWithdraw? bottom → ConfirmCancel? top (Yes) */}
                <line x1="340" y1="308" x2="340" y2="385" markerStart="url(#sf-dot)" markerEnd="url(#sf-arr)" />

                {/* Claim? bottom → ConfirmTxn? top (Yes) */}
                <line x1="525" y1="308" x2="525" y2="385" markerStart="url(#sf-dot)" markerEnd="url(#sf-arr)" />

                {/* ConfirmCancel? bottom → SuccessL top (Yes) */}
                <line x1="340" y1="455" x2="340" y2="520" markerStart="url(#sf-dot)" markerEnd="url(#sf-arr)" />

                {/* ConfirmTxn? bottom → SuccessR top (Yes) */}
                <line x1="525" y1="455" x2="525" y2="520" markerStart="url(#sf-dot)" markerEnd="url(#sf-arr)" />
                {/* ConfirmTxn? right → Dashboard (No loop) */}
                <path d="M 565 420 L 620 420 Q 630 420 630 410 L 630 148 Q 630 138 620 138 L 395 138" markerStart="url(#sf-dot)" markerEnd="url(#sf-arr)" />

                {/* FIX 4: SuccessL bottom → EventView left */}
                <path d="M 340 560 L 340 620 Q 340 630 350 630 L 395 630" markerStart="url(#sf-dot)" markerEnd="url(#sf-arr)" />
                {/* FIX 4: SuccessR bottom → EventView right */}
                <path d="M 525 560 L 525 620 Q 525 630 515 630 L 480 630" markerStart="url(#sf-dot)" markerEnd="url(#sf-arr)" />

                {/* EventView → End */}
                <path d="M 437 650 L 437 700 Q 437 710 420 710 L 380 712" markerStart="url(#sf-dot)" markerEnd="url(#sf-arr)" />
              </g>

              {/* ===== ELECTRICITY FLOW ===== */}
              <g filter="url(#sf-glow)">
                <path className="sf-elec" d="M 340 45 L 340 98 L 340 188" pathLength={1} style={{ animationDelay: "0s", animationDuration: "3s" }} />
                <path className="sf-elec" d="M 285 155 L 190 155 Q 175 155 175 170 L 175 308 L 175 430 L 175 455" pathLength={1} style={{ animationDelay: "0.8s", animationDuration: "4s" }} />
                <path className="sf-elec" d="M 340 188 L 340 308 L 340 455 L 340 520" pathLength={1} style={{ animationDelay: "0.8s", animationDuration: "4s" }} />
                <path className="sf-elec" d="M 395 155 L 510 155 Q 525 155 525 170 L 525 308 L 525 455 L 525 520" pathLength={1} style={{ animationDelay: "0.8s", animationDuration: "4s" }} />
                <path className="sf-elec" d="M 340 560 L 340 620 Q 340 630 350 630 L 395 630" pathLength={1} style={{ animationDelay: "2.5s", animationDuration: "2s" }} />
                <path className="sf-elec" d="M 525 560 L 525 620 Q 525 630 515 630 L 480 630" pathLength={1} style={{ animationDelay: "2.5s", animationDuration: "2s" }} />
                <path className="sf-elec" d="M 437 650 L 437 700 Q 437 710 420 710 L 380 712" pathLength={1} style={{ animationDelay: "3.2s", animationDuration: "2s" }} />
              </g>

              {/* ===== LABELS ===== */}
              <g fill="#cbcbcb" fontSize="10" fontFamily="sans-serif" fontWeight="600">
                <text x="100" y="260">No</text>
                <text x="180" y="325">Yes</text>
                <text x="70" y="470">If Success</text>
                <text x="230" y="468">If Failed</text>
                <text x="420" y="260">No</text>
                <text x="345" y="360">Yes</text>
                <text x="530" y="325">Yes</text>
                <text x="345" y="510">Yes</text>
                <text x="530" y="510">Yes</text>
                <text x="575" y="413">No</text>
              </g>

              {/* ===== ENTER ===== */}
              <circle cx="340" cy="28" r="18" fill="#F5C542" />
              <text x="340" y="33" textAnchor="middle" fill="#263238" fontWeight="bold" fontSize="11" fontFamily="sans-serif">Enter</text>

              {/* ===== CONNECT WALLET ===== */}
              <rect x="285" y="65" width="110" height="33" rx="10" fill="#242731" stroke="#3a3f42" strokeWidth="1" />
              <text x="340" y="86" textAnchor="middle" fill="#cbcbcb" fontSize="11" fontFamily="sans-serif" fontWeight="500">Connect Wallet</text>

              {/* ===== DASHBOARD ===== */}
              <rect x="285" y="118" width="110" height="70" rx="10" fill="#242731" stroke="#3a3f42" strokeWidth="1" />
              <text textAnchor="middle" fill="#cbcbcb" fontSize="9" fontFamily="sans-serif" fontWeight="500">
                <tspan x="340" y="137">Show Dashboard :</tspan>
                <tspan x="340" dy="12">Balance, BabeToken,</tspan>
                <tspan x="340" dy="12">withdraw History,</tspan>
                <tspan x="340" dy="12">Claim Option...</tspan>
              </text>

              {/* ===== WITHDRAW? ===== */}
              <g transform="translate(175, 268)">
                <rect x="-30" y="-30" width="60" height="60" rx="8" fill="#242731" stroke="#AE7EDE" strokeWidth="1" transform="rotate(45)" />
                <text textAnchor="middle" fill="#cbcbcb" fontSize="9" fontFamily="sans-serif" fontWeight="600" dy="4">Withdraw?</text>
              </g>

              {/* ===== CANCEL WITHDRAW? ===== */}
              <g transform="translate(340, 268)">
                <rect x="-30" y="-30" width="60" height="60" rx="8" fill="#242731" stroke="#AE7EDE" strokeWidth="1" transform="rotate(45)" />
                <text textAnchor="middle" fill="#cbcbcb" fontSize="7" fontFamily="sans-serif" fontWeight="600">
                  <tspan x="0" dy="-3">Cancel</tspan>
                  <tspan x="0" dy="11">Withdraw?</tspan>
                </text>
              </g>

              {/* ===== CLAIM? ===== */}
              <g transform="translate(525, 268)">
                <rect x="-30" y="-30" width="60" height="60" rx="8" fill="#242731" stroke="#AE7EDE" strokeWidth="1" transform="rotate(45)" />
                <text textAnchor="middle" fill="#cbcbcb" fontSize="9" fontFamily="sans-serif" fontWeight="600" dy="4">Claim?</text>
              </g>

              {/* ===== SELECT VAULT ===== */}
              <rect x="120" y="330" width="110" height="100" rx="10" fill="#242731" stroke="#3a3f42" strokeWidth="1" />
              <text fill="#cbcbcb" fontSize="9" fontFamily="sans-serif" fontWeight="500">
                <tspan x="135" y="350">• Select Vault</tspan>
                <tspan x="135" dy="14">• Select Chain</tspan>
                <tspan x="135" dy="14">• Select Token</tspan>
                <tspan x="135" dy="14">• Add Amount</tspan>
                <tspan x="135" dy="14">• Txn overview</tspan>
              </text>

              {/* ===== TRANSACTION CONFIRMATION ===== */}
              <rect x="125" y="455" width="100" height="40" rx="10" fill="#242731" stroke="#A8E6CF" strokeWidth="1" />
              <text textAnchor="middle" fill="#A8E6CF" fontSize="8" fontFamily="sans-serif" fontWeight="600">
                <tspan x="175" y="472">Transaction</tspan>
                <tspan x="175" dy="12">Confirmation</tspan>
              </text>

              {/* ===== CONFIRM CANCELATION? ===== */}
              <g transform="translate(340, 420)">
                <rect x="-30" y="-30" width="60" height="60" rx="8" fill="#242731" stroke="#AE7EDE" strokeWidth="1" transform="rotate(45)" />
                <text textAnchor="middle" fill="#cbcbcb" fontSize="7" fontFamily="sans-serif" fontWeight="600">
                  <tspan x="0" dy="-3">Confirm</tspan>
                  <tspan x="0" dy="11">Cancel?</tspan>
                </text>
              </g>

              {/* ===== CONFIRM TRANSACTION? ===== */}
              <g transform="translate(525, 420)">
                <rect x="-30" y="-30" width="60" height="60" rx="8" fill="#242731" stroke="#AE7EDE" strokeWidth="1" transform="rotate(45)" />
                <text textAnchor="middle" fill="#cbcbcb" fontSize="7" fontFamily="sans-serif" fontWeight="600">
                  <tspan x="0" dy="-3">Confirm</tspan>
                  <tspan x="0" dy="11">Txn?</tspan>
                </text>
              </g>

              {/* ===== SUCCESS (left) ===== */}
              <rect x="295" y="520" width="90" height="40" rx="10" fill="#242731" stroke="#53B9AB" strokeWidth="1" />
              <text x="340" y="545" textAnchor="middle" fill="#cbcbcb" fontSize="9" fontFamily="sans-serif" fontWeight="600">Success Msg.</text>

              {/* ===== SUCCESS (right) ===== */}
              <rect x="480" y="520" width="90" height="40" rx="10" fill="#242731" stroke="#53B9AB" strokeWidth="1" />
              <text x="525" y="545" textAnchor="middle" fill="#cbcbcb" fontSize="9" fontFamily="sans-serif" fontWeight="600">Success Msg.</text>

              {/* ===== EVENT VIEW ===== */}
              <rect x="395" y="610" width="85" height="40" rx="10" fill="#242731" stroke="#F5C542" strokeWidth="1" />
              <text textAnchor="middle" fill="#F5C542" fontSize="8" fontFamily="sans-serif" fontWeight="600">
                <tspan x="437" y="628">Event View</tspan>
                <tspan x="437" dy="12">Process</tspan>
              </text>

              {/* ===== END ===== */}
              <circle cx="370" cy="730" r="18" fill="#F5C542" />
              <text x="370" y="735" textAnchor="middle" fill="#263238" fontWeight="bold" fontSize="11" fontFamily="sans-serif">End</text>
            </svg>
          </div>
          </MobileCollapsible>

          <div className="mt-10 flex justify-center">
            <a
              href="https://www.figma.com/board/KuMmZbEXpH3Hm9ibwR4krH/Backed-Overview?node-id=1-666&t=LmjxMr9McTzN4EIL-1"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1.5 px-4 py-2 rounded-[10px] border text-xs md:text-sm font-medium transition-all hover:bg-[rgba(83,185,171,0.08)]"
              style={{ borderColor: "rgba(83,185,171,0.4)", color: ACCENT }}
            >
              Explore more
              <ArrowUpRight size={14} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </div>
        </motion.div>
      </Sec>

      {/* ── Design System & UI Foundations ── */}
      <Sec id="visual-system" className="bg-[#1e2029]">
        <Title>Building the Visual System</Title>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
          <p className="text-sm md:text-base leading-relaxed text-white/70 mb-10">{backed.designSystem.intro}</p>

          {/* Typography */}
          <div className="flex flex-col lg:flex-row items-start gap-8 mb-12">
            <div className="flex-1">
              <h3 className="text-base md:text-lg lg:text-xl font-bold text-[#cbcbcb] mb-3">Typography</h3>
              <p className="text-sm md:text-base leading-relaxed text-white/70 mb-6">{backed.designSystem.typography.description}</p>
              <div className="space-y-4">
                {backed.designSystem.typography.fonts.map((f) => {
                  const fontClass = f.name === "Zen Dots" ? "font-[family-name:var(--font-zen-dots)]" : f.name === "Aldrich" ? "font-[family-name:var(--font-aldrich)]" : "font-[family-name:var(--font-manrope)]";
                  return (
                    <div key={f.name}>
                      <h4 className={`text-base md:text-lg font-bold text-white ${fontClass}`}>{f.name}</h4>
                      <p className="text-sm text-white/60">{f.usage}</p>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="flex-1">
              <img src="/projects/backed/Typography.webp" alt="Typography" className="w-full rounded-xl" />
            </div>
          </div>

          {/* Color System */}
          <h3 className="text-base md:text-lg lg:text-xl font-bold text-[#cbcbcb] mb-3">Color System</h3>
          <p className="text-sm md:text-base leading-relaxed text-white/70 mb-6">{backed.designSystem.colorSystem.description}</p>
          <div className="flex flex-col lg:flex-row items-start gap-8 mb-12">
            <div className="lg:w-[45%]">
              <img src="/projects/backed/ColorWheel.png" alt="Color System" className="w-full rounded-xl" />
            </div>
            <div className="lg:w-[55%]">
              <p className="text-sm leading-relaxed text-white/50 mb-8 italic">
                Supporting roles like <span className="text-white/80 font-semibold not-italic">warning</span>, <span className="text-white/80 font-semibold not-italic">danger</span>, and <span className="text-white/80 font-semibold not-italic">info</span> are omitted for brevity.
              </p>
              <ul className="space-y-10">
                {[
                  { name: "Primary", desc: "Used as the brand's main color across high-priority elements such as primary buttons, key actions, and highlights." },
                  { name: "Secondary", desc: "Supports secondary actions and is used in charts (e.g. APR graph) to differentiate layered data." },
                  { name: "Tertiary", desc: "Highlights general vault-related data and is applied in supporting graphs like staking/unstaking trends." },
                  { name: "NFT", desc: "Visually separates NFT-specific content and sections throughout the interface." },
                  { name: "Default (Neutral)", desc: "Builds the structural foundation: backgrounds, containers, and dividers." },
                ].map((c) => (
                  <li key={c.name} className="flex items-start gap-3">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full shrink-0 bg-white/40" />
                    <div>
                      <h4 className="text-sm md:text-base font-bold text-white">{c.name}</h4>
                      <p className="text-xs md:text-sm leading-relaxed text-white/50 italic">{c.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </Sec>

      {/* ── Component Library ── */}
      <Sec id="components">
        <Title>Component Architecture</Title>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
          <p className="text-sm md:text-base leading-relaxed text-white/70 mb-8">{backed.designSystem.componentLibrary.description}</p>
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1">
              <ul className="space-y-8">
                {backed.designSystem.componentLibrary.categories.map((cat) => (
                  <li key={cat.title} className="flex items-start gap-3">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full shrink-0 bg-white/40" />
                    <div>
                      <h4 className="text-sm md:text-base font-bold text-white">{cat.title}</h4>
                      <p className="text-xs md:text-sm leading-relaxed text-white/50 italic">{cat.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex-1">
              <img src="/projects/backed/Components.avif" alt="Component Library" className="w-full rounded-xl" />
            </div>
          </div>
        </motion.div>
      </Sec>

      {/* ── High-Fidelity UI ── */}
      <Sec id="final-designs" className="bg-[#1e2029]">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="flex items-start justify-between gap-3 mb-3">
            <h2 className="text-xl md:text-2xl lg:text-[32px] font-bold text-[#cbcbcb]">Final Designs</h2>
            <a
              href="https://www.figma.com/design/xcQ1YwCKrK7HfCyOyBgNqU/Backed-Overview?node-id=7-75939&t=ASIHCKznNcZhv3LN-1"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Explore in Figma"
              className="group inline-flex items-center justify-center sm:justify-start gap-1.5 p-2 sm:px-4 sm:py-2 rounded-[10px] border text-xs md:text-sm font-medium transition-all hover:bg-[rgba(83,185,171,0.08)] shrink-0"
              style={{ borderColor: "rgba(83,185,171,0.4)", color: ACCENT }}
            >
              <span className="hidden sm:inline">Explore in Figma</span>
              <ArrowUpRight size={16} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </div>
          <div className="w-[105px] h-[3px] rounded-full mb-8 md:mb-10" style={{ backgroundColor: ACCENT }} />
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
          <p className="text-sm md:text-base leading-relaxed text-white/70 mb-10">{backed.highFidelity.intro}</p>

          {/* Desktop: stacked cards */}
          <div className="hidden lg:flex flex-col gap-20">
            {backed.highFidelity.screens.map((screen, i) => (
              <motion.div
                key={screen.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={`flex gap-10 items-center ${i % 2 === 1 ? "flex-row-reverse" : ""}`}
              >
                <div className="w-[58%]">
                  <div className="relative">
                    <img src="/projects/laptop-frame.png" alt="" className="relative w-full pointer-events-none" />
                    <video
                      autoPlay loop muted playsInline
                      className="absolute z-[1]"
                      style={{ top: "2.3%", left: "13.5%", width: "73%", height: "86.2%", objectFit: "cover", borderRadius: "8px 8px 0 0" }}
                      src={screen.video}
                    />
                  </div>
                </div>
                <div className="w-[42%]">
                  <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-white mb-3">{screen.title}</h3>
                  <p className="text-sm leading-[20px] md:leading-[22px] text-white/70">{screen.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Mobile: slider */}
          <HiFiSlider />
        </motion.div>
      </Sec>

      {/* ── Project Status ── */}
      <Sec id="status">
        <Title>Where It Stands</Title>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
          <p className="text-sm md:text-base leading-relaxed text-white/80">{backed.projectStatus}</p>
        </motion.div>
      </Sec>

      {/* ── Key Learnings ── */}
      <Sec id="learnings" className="bg-[#1e2029]">
        <Title>What I Took Away</Title>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
          <ul className="space-y-4 mb-8">
            {backed.keyLearnings.map((learning, i) => (
              <li key={i} className="flex items-start gap-3 text-sm md:text-base leading-[22px] md:leading-[24px] text-white/80">
                <span className="mt-1 shrink-0" style={{ color: ACCENT }}>&#9679;</span>
                {learning}
              </li>
            ))}
          </ul>
          <p className="text-sm md:text-base leading-[22px] md:leading-[24px] text-white/60 italic">{backed.keyLearningsSummary}</p>
        </motion.div>
      </Sec>
    </>
  );
}
