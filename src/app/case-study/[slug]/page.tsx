"use client";

import { use } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import dynamic from "next/dynamic";
import { ArrowRight } from "lucide-react";
import { caseStudies } from "@/data/portfolio";
import { notFound } from "next/navigation";

const CarbazaarCaseStudy = dynamic(
  () => import("@/components/case-studies/carbazaar").then((m) => m.CarbazaarCaseStudy),
  { loading: () => <div className="py-20 text-center text-text-muted">Loading...</div> }
);

const RoomieMatchCaseStudy = dynamic(
  () => import("@/components/case-studies/roomie-match").then((m) => m.RoomieMatchCaseStudy),
  { loading: () => <div className="py-20 text-center text-text-muted">Loading...</div> }
);

const BackedCaseStudy = dynamic(
  () => import("@/components/case-studies/backed").then((m) => m.BackedCaseStudy),
  { loading: () => <div className="py-20 text-center text-text-muted">Loading...</div> }
);

export default function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const study = caseStudies.find((s) => s.slug === slug);
  if (!study) notFound();

  const currentIndex = caseStudies.findIndex((s) => s.slug === slug);
  const nextStudy = caseStudies[(currentIndex + 1) % caseStudies.length];

  if (slug === "roomie-match") {
    return (
      <div className="min-h-screen pt-16 relative z-[1]">
        <RoomieMatchCaseStudy />
        <NextProject nextStudy={nextStudy} />
      </div>
    );
  }

  /* ── CarBazaar & Backed shared hero ── */
  const isCarbazaar = slug === "carbazaar";
  const isBacked = slug === "backed";

  return (
    <div className="min-h-screen relative z-[1]">
      {/* ═══ HERO — full viewport on desktop, content-fit height on mobile/tablet ═══ */}
      <section className="relative h-[680px] sm:h-[760px] md:h-[860px] lg:h-screen overflow-visible">

        {/* ── Background ghost text ── */}
        <div className="absolute inset-0 z-[5] pointer-events-none select-none overflow-hidden">
          {/* First line — spans full page width, image overlaps from below */}
          <span
            className="absolute top-[6%] md:top-[7%] left-0 right-0 text-center font-bold leading-none whitespace-nowrap"
            style={{
              fontSize: "clamp(70px, 17vw, 260px)",
              color: "transparent",
              WebkitTextStroke: "1.5px rgba(203,203,203,0.08)",
              letterSpacing: isBacked ? "0.08em" : "0.02em",
              fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro", "Segoe UI", "Inter", sans-serif',
            }}
          >
            {isBacked ? "Protocol" : "Dealership"}
          </span>

          {/* Second line — vertically centered with the image, parts flush to viewport edges */}
          <span
            className="absolute top-[26%] sm:top-[30%] md:top-[34%] lg:top-[36%] left-0 font-bold leading-none"
            style={{
              fontSize: "clamp(90px, 22vw, 400px)",
              color: "transparent",
              WebkitTextStroke: "1.5px rgba(203,203,203,0.06)",
              fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro", "Segoe UI", "Inter", sans-serif',
            }}
          >
            {isBacked ? "De" : "C"}
          </span>
          <span
            className="absolute top-[26%] sm:top-[30%] md:top-[34%] lg:top-[36%] right-0 font-bold leading-none"
            style={{
              fontSize: "clamp(90px, 22vw, 400px)",
              color: "transparent",
              WebkitTextStroke: "1.5px rgba(203,203,203,0.06)",
              fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro", "Segoe UI", "Inter", sans-serif',
            }}
          >
            {isBacked ? "Fi" : "ar"}
          </span>
        </div>

        {/* ── Cover image in frame ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="absolute z-10 left-1/2 -translate-x-1/2 w-[calc(100%-32px)] md:w-auto"
          style={{ top: "12%" }}
        >
          <div className="relative w-full md:w-[clamp(480px,58vw,880px)]">
            {isBacked ? (
              <img
                src="/projects/backed/Cover.webp"
                alt="Backed Cover"
                className="w-full h-auto rounded-[24px]"
              />
            ) : (
              <>
                <img
                  src="/projects/carbazaar-frame.png"
                  alt=""
                  className="w-full h-auto rounded-[24px]"
                />
                <div className="absolute inset-0 flex items-start justify-center pt-[1.5%] pb-[5%] px-[3%]">
                  <img
                    src={isCarbazaar ? "/projects/carbazaar-cover.png" : (study.image || "")}
                    alt={study.title}
                    className="w-full h-full object-contain rounded-[24px]"
                  />
                </div>
              </>
            )}
          </div>
        </motion.div>

        {/* ── About card — overlays cover image on mobile/tablet; peeks below section on desktop ── */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7 }}
          className="absolute left-1/2 -translate-x-1/2 z-20 w-[calc(100%-32px)] md:w-[calc(100%-64px)] max-w-[1100px] top-[36%] sm:top-[40%] md:top-[44%] lg:top-auto lg:bottom-[var(--desktop-bottom)]"
          style={{ "--desktop-bottom": isBacked ? "-145px" : "-260px" } as React.CSSProperties}
        >
          <div className="relative rounded-[24px] md:rounded-[40px] pt-6 px-5 pb-6 md:pt-[36px] md:px-[48px] md:pb-[36px] overflow-hidden shadow-[0px_-1px_108px_0px_rgba(36,39,49,0.74)]">
            {/* Card bg */}
            <div className="absolute inset-0 bg-[#2d313d] rounded-[40px]" />
            {/* Noise texture */}
            <div
              className="absolute inset-0 rounded-[40px] mix-blend-overlay"
              style={{ backgroundImage: "url('/hero/card-noise.png')", backgroundSize: "1024px 1024px" }}
            />
            {/* Car image at 5% opacity */}
            {isCarbazaar && (
              <div className="absolute inset-0 rounded-[40px] overflow-hidden">
                <img
                  src="/projects/carbazaar-car.png"
                  alt=""
                  className="w-full h-full object-cover opacity-[0.05]"
                />
              </div>
            )}

            {/* Content */}
            <div className="relative z-10 flex flex-col">
              {/* Header row */}
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[14px] md:text-[18px] leading-[24px] font-medium text-[#6e7286]">About</span>
                    <span className="text-[16px] md:text-[20px] leading-[26px] font-bold text-[#dbdce1]">{study.title}</span>
                  </div>
                  <div className="mt-[12px] w-[60px] h-[3px] rounded-full" style={{ backgroundColor: isBacked ? "#53B9AB" : "#F5F590" }} />
                </div>
                <span className="text-[12px] md:text-[16px] lg:text-[18px] leading-[24px] font-semibold text-[#6e7286] shrink-0 text-right">
                  UI/UX Case Study
                </span>
              </div>

              {/* Logo + text row */}
              <div className="flex flex-col items-center mt-[28px]">
                {/* Logo row: icon left, text right */}
                <div className="flex flex-col sm:flex-row items-center gap-4 md:gap-[20px] mb-5 md:mb-[28px]">
                  {isCarbazaar ? (
                    <img
                      src="/projects/carbazaar-logo.svg"
                      alt="CarBazaar24"
                      className="h-[60px] md:h-[85px] w-auto shrink-0"
                    />
                  ) : isBacked ? (
                    <img
                      src="/projects/backed/logo.png"
                      alt="Backed"
                      className="w-[50px] h-[60px] md:w-[65px] md:h-[85px] object-contain shrink-0"
                    />
                  ) : study.image ? (
                    <img
                      src={study.image}
                      alt={study.title}
                      className="w-[60px] h-[60px] md:w-[85px] md:h-[85px] object-contain shrink-0"
                    />
                  ) : null}
                  <div className="flex flex-col text-center sm:text-left">
                    <p className={`text-[20px] md:text-[26px] leading-[28px] md:leading-[32px] font-bold text-[#dbdce1] tracking-wide ${isBacked ? "font-[family-name:var(--font-zen-dots)]" : ""}`}>
                      {study.title.toUpperCase()}
                    </p>
                    <p className="text-[14px] md:text-[16px] font-medium text-[#6e7286] mt-[4px]">
                      {study.subtitle}
                    </p>
                    <p className="text-[12px] md:text-[14px] text-[#6e7286] mt-[2px]">
                      {isBacked ? "2024 – Present" : "June – August 2023"}
                    </p>
                  </div>
                </div>

                {/* Description */}
                <p className="text-[14px] md:text-[18px] leading-[26px] md:leading-[36px] font-medium text-[#dbdce1] text-center max-w-[860px]">
                  {study.description}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Spacer for overflowing card — only needed on lg+ where the About card extends below the hero into this gap */}
      <div className="hidden lg:block lg:h-[240px]" />

      {/* Case study content */}
      {slug === "carbazaar" && <CarbazaarCaseStudy />}
      {slug === "backed" && <BackedCaseStudy />}
      {!["carbazaar", "backed", "roomie-match"].includes(slug) && <GenericPlaceholder />}

      <NextProject nextStudy={nextStudy} />
    </div>
  );
}

function NextProject({ nextStudy }: { nextStudy: { slug: string; title: string } }) {
  const logoSrc =
    nextStudy.slug === "carbazaar"
      ? "/projects/carbazaar-logo.svg"
      : nextStudy.slug === "backed"
      ? "/projects/backed/logo.png"
      : null;

  const logoClass =
    nextStudy.slug === "backed"
      ? "h-8 lg:h-10 w-auto object-contain"
      : "h-7 lg:h-9 w-auto object-contain";

  return (
    <section className="py-24 border-t border-border">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <p className="text-text-muted text-sm mb-3">Next Project</p>
        <Link
          href={`/case-study/${nextStudy.slug}`}
          className="inline-flex items-center gap-3 text-2xl lg:text-3xl font-bold hover:text-accent transition-colors group"
        >
          {logoSrc && (
            <img
              src={logoSrc}
              alt=""
              className={logoClass}
            />
          )}
          {nextStudy.title}
          <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </section>
  );
}

function GenericPlaceholder() {
  return (
    <>
      {["The Challenge", "The Process", "The Solution"].map((title, i) => (
        <section key={title} className={`py-16 ${i % 2 === 0 ? "bg-surface/50" : ""}`}>
          <div className="max-w-4xl mx-auto px-6">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="text-2xl font-bold mb-6">{title}</h2>
              <div className="h-40 rounded-xl border border-dashed border-border flex items-center justify-center text-text-muted text-sm">
                Share your Figma case study to populate this section
              </div>
            </motion.div>
          </div>
        </section>
      ))}
    </>
  );
}
