"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { caseStudies } from "@/data/portfolio";

const UPCOMING_CASE_STUDIES = ["AzkiSeller", "Vibe"];
const BEHANCE_URL = "https://www.behance.net/anahitaaria2";
const BEHANCE_COUNT = 7;

/* ── Case Study Card — 3 stacked layers, hover reveals title + description ── */
function CaseStudyCard({
  title,
  subtitle,
  description,
  color,
  slug,
  image,
}: {
  title: string;
  subtitle: string;
  description: string;
  color: string;
  slug: string;
  image?: string;
}) {
  return (
    <Link href={`/case-study/${slug}`} className="group block">
      <div className="relative w-full aspect-[9/12]">
        {/* Layer 3 (back) — 20% opacity → collapses on hover */}
        <div className="absolute rounded-[28px] overflow-hidden transition-all duration-500 ease-out top-0 left-[24px] right-0 bottom-[16px] opacity-20 group-hover:top-[16px] group-hover:left-0 group-hover:right-[24px] group-hover:bottom-0 group-hover:opacity-100">
          {image ? (
            <img src={image} alt="" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full" style={{ backgroundColor: color }} />
          )}
        </div>

        {/* Layer 2 (middle) — 50% opacity → collapses on hover */}
        <div className="absolute rounded-[28px] overflow-hidden transition-all duration-500 ease-out top-[8px] left-[12px] right-[12px] bottom-[8px] opacity-50 group-hover:top-[16px] group-hover:left-0 group-hover:right-[24px] group-hover:bottom-0 group-hover:opacity-100">
          {image ? (
            <img src={image} alt="" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full" style={{ backgroundColor: color }} />
          )}
        </div>

        {/* Layer 1 (front) — 100% opacity */}
        <div className="absolute rounded-[28px] overflow-hidden transition-all duration-500 ease-out top-[16px] left-0 right-[24px] bottom-0">

          {/* Card background — image or color placeholder */}
          <div
            className="absolute inset-0 transition-transform duration-500 ease-out group-hover:scale-[1.05]"
            style={{ backgroundColor: color }}
          >
            {image ? (
              <img src={image} alt={title} className="w-full h-full object-cover" />
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 px-4">
                <span className="text-[18px] font-bold text-white/90 text-center leading-tight">
                  {title}
                </span>
                <span className="text-[11px] font-medium text-white/60 text-center">
                  {subtitle}
                </span>
              </div>
            )}
          </div>

          {/* Hover overlay — dark gradient from bottom */}
          <div
            className="absolute bottom-0 left-0 right-0 transition-all duration-500 ease-out opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0"
            style={{
              height: "50%",
              background:
                "linear-gradient(180deg, transparent 0%, rgba(36,39,49,0.7) 30%, rgb(36,39,49) 65%)",
            }}
          />

          {/* Hover text — title + description */}
          <div className="absolute bottom-0 left-0 right-0 px-[16px] pb-[16px] pt-[48px] transition-all duration-500 ease-out opacity-0 translate-y-6 group-hover:opacity-100 group-hover:translate-y-0">
            <p className="text-[14px] leading-[18px] font-semibold text-[#dbdce1] mb-[4px]">
              {title}
            </p>
            <p className="text-[11px] leading-[16px] font-semibold text-white line-clamp-3">
              {description}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}

/* ── In Progress teaser card — shown alongside real case studies ── */
function InProgressCard() {
  return (
    <a
      href={BEHANCE_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="group block"
    >
      <div className="relative w-full aspect-[9/12]">
        <div className="absolute top-[16px] left-0 right-[24px] bottom-0 rounded-[28px] overflow-hidden border-2 border-dashed border-[#a2ffd2]/40 bg-[#2d313d]/60 transition-all duration-500 ease-out group-hover:border-[#a2ffd2]/80 group-hover:bg-[#2d313d]/90 group-hover:border-solid">
          <div
            className="absolute inset-0 opacity-50 pointer-events-none"
            style={{
              background:
                "radial-gradient(circle at 50% 30%, rgba(162,255,210,0.12) 0%, transparent 60%)",
            }}
          />

          <div className="relative h-full flex flex-col items-center justify-center px-5 text-center">
            <p className="text-[#a2ffd2] text-[11px] font-semibold tracking-[0.3em] uppercase mb-3">
              In Progress
            </p>
            <h3 className="text-white text-[18px] md:text-[20px] font-bold leading-tight mb-6">
              More work,<br />more places
            </h3>

            <div className="space-y-4 mb-6 w-full">
              <div>
                <p className="text-[10px] tracking-[0.2em] uppercase text-[#6e7286] mb-1.5">
                  Coming here
                </p>
                <p className="text-[13px] text-[#dbdce1] font-medium">
                  {UPCOMING_CASE_STUDIES.join(", ")}
                </p>
              </div>
              <div>
                <p className="text-[10px] tracking-[0.2em] uppercase text-[#6e7286] mb-1.5">
                  Already on Behance
                </p>
                <p className="text-[13px] text-[#dbdce1] font-medium">
                  {BEHANCE_COUNT} more case studies
                </p>
              </div>
            </div>

            <span className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-[#a2ffd2] group-hover:gap-2.5 transition-all duration-300">
              See on Behance
              <ArrowUpRight
                size={14}
                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </span>
          </div>
        </div>
      </div>
    </a>
  );
}

export function WorkGrid() {
  return (
    <section id="work" className="py-12 md:py-16 lg:py-20 xl:py-28 relative z-[1]">
      <div className="max-w-[1200px] mx-auto px-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 px-6 lg:px-0"
        >
          <p className="text-[#a2ffd2] text-[12px] font-semibold tracking-[0.3em] uppercase mb-2">
            Selected Work
          </p>
          <h2 className="text-[28px] leading-[36px] font-bold text-white">
            Case studies that show<br />how I think & work
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 px-6 lg:px-0">
          {caseStudies.map((study, i) => (
            <motion.div
              key={study.slug}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
            >
              <CaseStudyCard
                title={study.title}
                subtitle={study.subtitle}
                description={study.description}
                color={study.color}
                slug={study.slug}
                image={study.image}
              />
            </motion.div>
          ))}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: caseStudies.length * 0.12 }}
          >
            <InProgressCard />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
