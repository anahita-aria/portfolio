"use client";

import { motion } from "framer-motion";
import { experiences, personalInfo } from "@/data/portfolio";
import { ArrowUpRight } from "lucide-react";

export function ExperienceSection() {
  return (
    <section id="experience" className="py-12 md:py-16 lg:py-20 xl:py-28 relative z-[1]">
      <div className="max-w-[1200px] mx-auto px-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 px-6 lg:px-0 flex flex-col md:flex-row md:items-end md:justify-between gap-4"
        >
          <div>
            <p className="text-accent text-sm tracking-[0.3em] uppercase mb-3">
              Career
            </p>
            <h2 className="text-3xl lg:text-4xl font-bold">
              Where I&apos;ve shipped.
            </h2>
          </div>
          <p className="text-sm text-text-muted max-w-xs">
            Six years across fintech, crypto, insurance, and enterprise SaaS.
            The full story lives in the case studies.
          </p>
        </motion.div>

        <div className="px-6 lg:px-0">
          <ul className="border-t border-border">
            {experiences.map((exp, i) => {
              const rowClassName =
                "grid grid-cols-[1fr_auto] md:grid-cols-[120px_1fr_auto_auto] items-baseline gap-x-6 gap-y-1 py-5 md:py-6 transition-colors duration-300 hover:bg-surface/40 px-2 md:px-4 -mx-2 md:-mx-4 rounded-xl";

              const rowInner = (
                <>
                  {/* Year (desktop only, on the left) */}
                  <p className="hidden md:block text-xs tracking-[0.2em] uppercase text-text-muted">
                    {extractYears(exp.duration)}
                  </p>

                  {/* Role + Company */}
                  <div className="min-w-0">
                    <p className="text-base md:text-lg font-semibold text-white leading-snug truncate">
                      {exp.role}
                    </p>
                    <p className="text-sm text-accent mt-0.5">{exp.company}</p>
                    {/* Year (mobile only, under company) */}
                    <p className="md:hidden text-[11px] tracking-[0.2em] uppercase text-text-muted mt-1">
                      {extractYears(exp.duration)}
                    </p>
                  </div>

                  {/* Location */}
                  <p className="hidden md:block text-sm text-text-muted text-right whitespace-nowrap">
                    {extractLocation(exp.location)}
                  </p>

                  {/* Hover arrow */}
                  <ArrowUpRight
                    size={18}
                    className="text-text-muted opacity-0 group-hover:opacity-100 group-hover:text-accent group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all duration-300 col-start-2 md:col-start-4 row-start-1 self-center"
                  />
                </>
              );

              return (
                <motion.li
                  key={`${exp.company}-${i}`}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className="group border-b border-border"
                >
                  {exp.companyUrl ? (
                    <a
                      href={exp.companyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={rowClassName}
                    >
                      {rowInner}
                    </a>
                  ) : (
                    <div className={rowClassName}>{rowInner}</div>
                  )}
                </motion.li>
              );
            })}

            {/* Earlier roles → LinkedIn CTA row */}
            <motion.li
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: experiences.length * 0.06 }}
              className="group border-b border-border"
            >
              <a
                href={`https://www.linkedin.com/in/${personalInfo.contact.linkedin}`}
                target="_blank"
                rel="noopener noreferrer"
                className="grid grid-cols-[1fr_auto] md:grid-cols-[120px_1fr_auto_auto] items-baseline gap-x-6 gap-y-1 py-5 md:py-6 transition-colors duration-300 hover:bg-surface/40 px-2 md:px-4 -mx-2 md:-mx-4 rounded-xl"
              >
                <p className="hidden md:block text-xs tracking-[0.2em] uppercase text-text-muted">
                  Pre-2021
                </p>

                <div className="min-w-0">
                  <p className="text-base md:text-lg font-semibold text-accent leading-snug">
                    Earlier roles &amp; full timeline
                  </p>
                  <p className="text-sm text-text-muted mt-0.5">
                    Continued on LinkedIn
                  </p>
                  <p className="md:hidden text-[11px] tracking-[0.2em] uppercase text-text-muted mt-1">
                    Pre-2021
                  </p>
                </div>

                <p className="hidden md:block text-sm text-text-muted text-right whitespace-nowrap">
                  linkedin.com/in/{personalInfo.contact.linkedin}
                </p>

                <ArrowUpRight
                  size={18}
                  className="text-accent group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all duration-300 col-start-2 md:col-start-4 row-start-1 self-center"
                />
              </a>
            </motion.li>
          </ul>
        </div>
      </div>
    </section>
  );
}

function extractYears(duration: string): string {
  // Pulls "2024 – Present" / "2022 – 2024" out of "January 2024 – Present"
  const match = duration.match(/(\d{4})\s*[–-]\s*(Present|\d{4})/i);
  if (!match) return duration;
  return `${match[1]} – ${match[2]}`;
}

function extractLocation(location: string): string {
  // "Milan, Italy (Remote)" → "Milan, Italy"
  return location.replace(/\s*\(.*?\)\s*$/, "").trim();
}

/* ------------------------------------------------------------------ */
/* PREVIOUS DETAILED VERSION (kept for reference, not currently used) */
/* ------------------------------------------------------------------ */
/*
export function ExperienceSectionDetailed() {
  return (
    <section id="experience" className="py-24 lg:py-32 relative z-[1]">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <p className="text-accent text-sm tracking-[0.3em] uppercase mb-3">
            Career
          </p>
          <h2 className="text-3xl lg:text-4xl font-bold">Experience</h2>
        </motion.div>

        <div className="relative">
          <div className="absolute left-0 md:left-8 top-0 bottom-0 w-px bg-border" />

          <div className="space-y-12">
            {experiences.map((exp, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative pl-8 md:pl-20"
              >
                <div className="absolute left-0 md:left-8 top-2 w-px">
                  <div className="w-3 h-3 rounded-full bg-accent -translate-x-1.5 ring-4 ring-background" />
                </div>

                <div className="bg-surface border border-border rounded-2xl p-6 lg:p-8">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-2 mb-4">
                    <div>
                      <h3 className="text-xl font-semibold">{exp.role}</h3>
                      <p className="text-accent">{exp.company}</p>
                    </div>
                    <div className="text-sm text-text-muted lg:text-right shrink-0">
                      <p>{exp.location}</p>
                      <p>{exp.duration}</p>
                    </div>
                  </div>

                  <p className="text-sm text-text-secondary leading-relaxed mb-5">
                    {exp.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {exp.skills.map((skill) => (
                      <span
                        key={skill}
                        className="text-xs px-3 py-1.5 rounded-full border border-border text-text-secondary hover:border-accent/30 hover:text-accent transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  {exp.products && (
                    <div className="pt-4 border-t border-border">
                      <p className="text-xs text-text-muted mb-2">
                        Key Products
                      </p>
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                        {exp.products.map((product, idx) => (
                          <span
                            key={product}
                            className="flex items-center gap-3 text-sm font-medium text-text-secondary"
                          >
                            {product}
                            {idx < exp.products!.length - 1 && (
                              <span className="text-border">|</span>
                            )}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
*/
