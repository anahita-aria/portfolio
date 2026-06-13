"use client";

import { motion } from "framer-motion";
import { ArrowRight, MapPin, Mail, Linkedin, Globe } from "lucide-react";

/* ── Floating skill tag with gentle hover animation ── */
function SkillTag({
  label,
  rotate,
  size = "sm",
  style,
  delay,
  floatOffset = 6,
  floatDuration = 3,
}: {
  label: string;
  rotate: number;
  size?: "sm" | "md";
  style: React.CSSProperties;
  delay: number;
  floatOffset?: number;
  floatDuration?: number;
}) {
  const px = size === "md" ? "px-3 py-2" : "px-2.5 py-1.5";
  const text =
    size === "md" ? "text-[13px] leading-[18px]" : "text-[11px] leading-[14px]";
  return (
    <motion.div
      className="absolute"
      style={{ ...style }}
      initial={{ opacity: 0, scale: 0.8, rotate }}
      animate={{
        opacity: 1,
        scale: 1,
        rotate,
        y: [0, -floatOffset, 0, floatOffset * 0.5, 0],
      }}
      transition={{
        opacity: { delay, duration: 0.5 },
        scale: { delay, duration: 0.5 },
        y: {
          delay: delay + 0.5,
          duration: floatDuration,
          repeat: Infinity,
          ease: "easeInOut",
        },
      }}
    >
      <div
        className={`relative ${px} rounded-[10px] overflow-hidden font-semibold ${text} text-white whitespace-nowrap`}
      >
        <div className="absolute inset-0 bg-[#2a2e39] rounded-[10px]" />
        <span className="relative z-10">{label}</span>
        <div className="absolute inset-0 rounded-[10px] shadow-[inset_0px_2px_0px_0px_rgba(255,255,255,0.07)]" />
      </div>
    </motion.div>
  );
}

/* ── Shining star ── */
function ShiningStar({
  size,
  style,
  delay,
}: {
  size: number;
  style: React.CSSProperties;
  delay: number;
}) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      className="absolute"
      style={style}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{
        opacity: [0, 0.9, 0.3, 1, 0.4, 0.8, 0],
        scale: [0.5, 1.2, 0.8, 1.3, 0.7, 1.1, 0.5],
        rotate: [0, 30, -10, 20, -20, 10, 0],
      }}
      transition={{
        delay,
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <path
        d="M8 0l2 6 6 2-6 2-2 6-2-6-6-2 6-2z"
        fill="#6e7286"
      />
    </motion.svg>
  );
}

/* ── Comet — visible streak, tilted -25deg, from top-center toward tags ── */
function CometStream({ totalCycle }: { totalCycle: number }) {
  const comets = [
    { left: "48%" },
    { left: "50%" },
    { left: "46%" },
    { left: "52%" },
  ];
  const dur = 2.4;
  const gap = totalCycle / comets.length;

  return (
    <>
      {comets.map((c, i) => (
        <motion.div
          key={i}
          className="absolute pointer-events-none"
          style={{ left: c.left, top: -100 }}
          initial={{ opacity: 0, x: 0, y: 0 }}
          animate={{ opacity: [0, 0.5, 0.6, 0.35, 0], x: 300, y: 600 }}
          transition={{
            delay: i * gap,
            duration: dur,
            repeat: Infinity,
            repeatDelay: totalCycle - dur,
            ease: "linear",
            opacity: { delay: i * gap, duration: dur, repeat: Infinity, repeatDelay: totalCycle - dur, times: [0, 0.15, 0.4, 0.75, 1] },
          }}
        >
          <div
            style={{
              width: 2,
              height: 120,
              borderRadius: 4,
              background: "linear-gradient(to bottom, transparent 0%, rgba(180,185,195,0.15) 30%, rgba(210,215,220,0.5) 80%, rgba(255,255,255,0.9) 100%)",
              transform: "rotate(-25deg)",
            }}
          />
        </motion.div>
      ))}
    </>
  );
}

export function Hero() {
  return (
    <section className="relative min-h-screen lg:h-screen overflow-visible lg:overflow-hidden">
      {/* Nav is now global via layout */}

      {/* ── Upper content: profile + about — stacks on mobile/tablet, side-by-side on lg ── */}
      <div
        className="relative z-10 mx-auto px-4 md:px-8 flex flex-col lg:flex-row items-center lg:items-start pt-[72px] lg:pt-[80px] gap-6 lg:gap-16"
        style={{ maxWidth: 1264 }}
      >
        {/* Profile photo — scales down on smaller breakpoints */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="relative shrink-0"
        >
          <div className="absolute top-0 left-0 w-[120px] h-[120px] sm:w-[160px] sm:h-[160px] md:w-[200px] md:h-[200px] lg:w-[232px] lg:h-[232px] rounded-[28px] sm:rounded-[34px] md:rounded-[40px] lg:rounded-[46px] overflow-hidden opacity-40">
            <img src="/hero/profile.png" alt="" className="w-full h-full object-cover object-top" />
          </div>
          <div className="relative w-[120px] h-[120px] sm:w-[160px] sm:h-[160px] md:w-[200px] md:h-[200px] lg:w-[232px] lg:h-[232px] rounded-[28px] sm:rounded-[34px] md:rounded-[40px] lg:rounded-[46px] overflow-hidden translate-x-[10px] translate-y-[10px]">
            <img src="/hero/profile.png" alt="Anahita Aria" className="w-full h-full object-cover object-top" />
          </div>
        </motion.div>

        {/* About — full-width and centered on mobile, fixed-width left-aligned on lg */}
        <div className="flex flex-col w-full max-w-[540px] lg:w-[540px] pt-0 lg:pt-[4px] gap-4 text-center lg:text-left items-center lg:items-start">
          <div className="flex flex-col w-full" style={{ gap: 14 }}>
            {/* Eyebrow */}
            <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="text-[12px] md:text-[13px] leading-[20px] font-semibold text-[#6e7286] tracking-[0.2em] uppercase">
              Senior Product Designer
            </motion.p>

            {/* Name */}
            <motion.h1 initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
              className="text-[32px] sm:text-[38px] lg:text-[44px] leading-[1.05] font-bold text-white tracking-tight">
              Anahita Aria
            </motion.h1>

            {/* Tagline */}
            <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
              className="text-[14px] sm:text-[15px] lg:text-[16px] leading-[22px] lg:leading-[24px] font-semibold text-[#dbdce1]">
              AI-Native Designer with an Engineering Mind
            </motion.p>

            {/* Description — desktop only; on mobile/tablet this content moves into the Personal Statement card below */}
            <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
              className="hidden lg:block text-[14px] leading-[22px] text-[#a8aab2] mt-2">
              Engineering taught me how things are built. AI taught me how they think. Design taught me why they matter. I bridge all three to ship products that engineers love to build and users love to use.
            </motion.p>
          </div>

          {/* Contact links inline */}
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
            className="flex flex-wrap items-center justify-center lg:justify-start gap-x-5 gap-y-2 text-[12px] lg:text-[13px] text-[#a8aab2]">
            <span className="flex items-center gap-1.5">
              <MapPin size={14} className="text-[#a2ffd2]" />
              Milan, Italy
            </span>
            <a href="mailto:aanahita.aaria@gmail.com" className="flex items-center gap-1.5 hover:text-white transition-colors">
              <Mail size={14} className="text-[#a2ffd2]" />
              <span className="hidden sm:inline">aanahita.aaria@gmail.com</span>
              <span className="sm:hidden">Email</span>
            </a>
            <a href="https://linkedin.com/in/anahita-aria" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-white transition-colors">
              <Linkedin size={14} className="text-[#a2ffd2]" />
              <span className="hidden sm:inline">in/anahita-aria</span>
              <span className="sm:hidden">LinkedIn</span>
            </a>
            <a href="https://www.behance.net/anahitaaria2" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-white transition-colors">
              <Globe size={14} className="text-[#a2ffd2]" />
              Behance
            </a>
          </motion.div>
        </div>
      </div>


      {/* ── Floating skill tags — desktop only (decorative, would clutter mobile/tablet) ── */}
      <div className="hidden lg:block absolute top-[6vh] left-1/2 -translate-x-1/2 w-full max-w-[1440px] h-[52%] pointer-events-none z-10 px-8">
        <SkillTag label="Prototyping" rotate={-21.82} delay={0.6} floatOffset={5} floatDuration={3.2} style={{ top: "28%", right: "18%" }} />
        <SkillTag label="User Research" rotate={11.64} delay={0.7} floatOffset={7} floatDuration={3.8} style={{ top: "26%", right: "0" }} />
        <SkillTag label="Design Systems" rotate={-25.8} delay={0.75} floatOffset={6} floatDuration={4.0} size="md" style={{ top: "48%", right: "14%" }} />
        <SkillTag label="Figma MCP" rotate={8.49} delay={0.8} floatOffset={4} floatDuration={3.5} size="md" style={{ top: "44%", right: "0" }} />
        <SkillTag label="Design-to-Code" rotate={-25.36} delay={0.85} floatOffset={8} floatDuration={4.2} size="md" style={{ top: "66%", right: "8%" }} />
        <SkillTag label="Claude AI" rotate={18.13} delay={0.9} floatOffset={5} floatDuration={3.6} style={{ top: "76%", right: "0" }} />

        {/* Shining stars */}
        <ShiningStar size={12} delay={1.0} style={{ top: "63%", right: "22%" }} />
        <ShiningStar size={15} delay={2.5} style={{ top: "14%", right: "0" }} />
        <ShiningStar size={10} delay={4.0} style={{ top: "38%", right: "6%" }} />
        <ShiningStar size={8} delay={3.2} style={{ top: "80%", right: "24%" }} />
      </div>

      {/* ── Comets — thin diagonal streaks from top-center ── */}
      <div className="hidden lg:block absolute inset-0 pointer-events-none z-[5]">
        <CometStream totalCycle={8} />
      </div>

      {/* ── Personal Statement Card — moves down on smaller screens to avoid overlap ── */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.7 }}
        className="relative w-[calc(100%-32px)] sm:w-[calc(100%-48px)] md:w-[calc(100%-64px)] mx-auto mt-10 mb-12 max-w-[1200px] lg:absolute lg:left-1/2 lg:-translate-x-1/2 lg:z-10 lg:mx-0 lg:mt-0 lg:mb-0 lg:top-[60%] lg:-bottom-[100px]"
      >
        <div className="relative rounded-t-[40px] overflow-hidden shadow-[0px_-1px_108px_0px_rgba(36,39,49,0.74)] h-full">
          {/* Use the pre-rendered card background image */}
          <img
            src="/hero/card-bg.png"
            alt=""
            className="absolute inset-0 w-full h-full object-cover object-top rounded-t-[40px]"
          />

          {/* Content */}
          <div className="relative z-10 pt-5 px-5 pb-7 sm:pt-[18px] sm:px-7 sm:pb-8 md:pt-[20px] md:px-10 md:pb-10 lg:px-[40px] lg:pb-0">
            <div className="flex items-start justify-between mb-[clamp(14px,1.8vh,24px)]">
              <div>
                <h2 className="text-[16px] sm:text-[18px] leading-[24px] font-bold text-[#dbdce1]">
                  Personal Statement
                </h2>
                <div className="mt-[10px] relative w-[60px] h-[3px]">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#a2ffd2] via-[#a2ffd2] to-[#a2ffd2]/30" />
                  <div className="absolute inset-0 rounded-full shadow-[0_0_12px_rgba(162,255,210,0.4)]" />
                </div>
              </div>
              <div className="relative w-[44px] h-[42px] shrink-0">
                <svg viewBox="0 0 52 50" fill="none" className="absolute inset-0 w-full h-full">
                  <ellipse cx="26" cy="25" rx="24" ry="23" stroke="#a2ffd2" strokeWidth="1.3" opacity="0.5" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-[18px] text-[#a2ffd2] tracking-[-0.5px] leading-none"
                    style={{ fontFamily: "'Original Surfer', cursive" }}>
                    A.A
                  </span>
                </div>
              </div>
            </div>

            {/* Statement intro — desktop only on mobile this would duplicate the card body below */}
            <p className="hidden lg:block text-[clamp(13px,1.05vw,16px)] leading-[clamp(20px,2.1vh,24px)] font-normal text-[#a8aab2] text-justify">
              Engineer turned AI researcher, turned product designer.
            </p>

            {/* Body — mobile/tablet uses the engineering+AI+design framing (same text that's in the upper description on desktop) */}
            <p className="lg:hidden text-[13px] sm:text-[14px] leading-[20px] text-[#a8aab2] text-justify mt-2">
              Engineering taught me how things are built. AI taught me how they think. Design taught me why they matter. I bridge all three to ship products that engineers love to build and users love to use.
            </p>

            {/* Body — desktop uses the B2B/B2C product detail */}
            <p className="hidden lg:block text-[clamp(13px,1.05vw,16px)] leading-[clamp(20px,2.1vh,24px)] font-normal text-[#a8aab2] text-justify mt-[clamp(8px,1.2vh,14px)]">
              I design complex, technical B2B and B2C products that feel
              intuitive. Crypto wallets. Banking flows. Insurance platforms.
              B2B cockpits. Anywhere the problem is hard and the stakes are
              high, that&apos;s where I want to design.
            </p>

            {/* Impact stats strip */}
            <div className="mt-[clamp(14px,1.8vh,22px)] grid grid-cols-3 gap-4 md:gap-6">
              <div className="text-center lg:text-left">
                <p className="text-[clamp(24px,2.6vw,38px)] leading-none font-bold text-[#a2ffd2]">6+</p>
                <p className="text-[12px] md:text-[14px] text-[#dbdce1] mt-2 font-semibold leading-tight">Years designing</p>
                <p className="hidden lg:block text-[11px] md:text-[12px] text-[#6e7286] mt-1 leading-tight">Products that shipped</p>
              </div>
              <div className="text-center lg:text-left">
                <p className="text-[clamp(24px,2.6vw,38px)] leading-none font-bold text-[#a2ffd2]">10+</p>
                <p className="text-[12px] md:text-[14px] text-[#dbdce1] mt-2 font-semibold leading-tight">Products launched</p>
                <p className="hidden lg:block text-[11px] md:text-[12px] text-[#6e7286] mt-1 leading-tight">Across 7+ industries</p>
              </div>
              <div className="text-center lg:text-left">
                <p className="text-[clamp(24px,2.6vw,38px)] leading-none font-bold text-[#a2ffd2]">80%</p>
                <p className="text-[12px] md:text-[14px] text-[#dbdce1] mt-2 font-semibold leading-tight">Faster<br className="lg:hidden" /> handoff</p>
                <p className="hidden lg:block text-[11px] md:text-[12px] text-[#6e7286] mt-1 leading-tight">Figma MCP + Claude</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
