"use client";

import { motion } from "framer-motion";
import { personalInfo } from "@/data/portfolio";
import { GraduationCap, Sparkles, ExternalLink } from "lucide-react";

export function FoundationSection() {
  return (
    <section id="foundation" className="py-12 md:py-16 lg:py-20 xl:py-28">
      <div className="max-w-[1200px] mx-auto px-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 px-6 lg:px-0"
        >
          <p className="text-accent text-sm tracking-[0.3em] uppercase mb-3">
            Foundation
          </p>
          <h2 className="text-3xl lg:text-4xl font-bold">
            The credentials behind the engineering mind.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-6 lg:px-0">
          {/* Education */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-surface border border-border rounded-2xl p-6"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                <GraduationCap size={20} className="text-accent" />
              </div>
              <h3 className="text-lg font-semibold">Education</h3>
            </div>
            <ul className="space-y-6">
              {personalInfo.education.map((edu) => (
                <li key={edu.degree}>
                  <p className="text-text-muted text-xs tracking-[0.2em] uppercase mb-2">
                    {edu.years}
                  </p>
                  <p className="text-base font-bold text-white leading-snug mb-1">
                    {edu.degree}
                  </p>
                  <p className="text-sm text-text-muted">{edu.school}</p>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Publications + Languages (stacked) */}
          <div className="flex flex-col gap-6">
            {/* Publications card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 }}
            >
              {personalInfo.publications.map((pub) => (
                <a
                  key={pub.title}
                  href={pub.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block bg-surface border border-border rounded-2xl p-6 transition-all duration-300 hover:border-accent/40 hover:bg-surface/80 hover:shadow-[0_0_40px_-10px_rgba(162,255,210,0.25)]"
                >
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <div className="flex items-center gap-2">
                      <Sparkles size={16} className="text-accent" />
                      <p className="text-accent text-xs tracking-[0.25em] uppercase font-semibold">
                        {pub.label}
                      </p>
                    </div>
                    <ExternalLink
                      size={14}
                      className="text-text-muted opacity-0 group-hover:opacity-100 group-hover:text-accent transition-all duration-300"
                    />
                  </div>
                  <h3 className="text-lg font-bold text-white leading-snug mb-2 group-hover:text-accent transition-colors">
                    {pub.title}
                  </h3>
                  <p className="text-sm text-text-muted">{pub.venue}</p>
                </a>
              ))}
            </motion.div>

            {/* Languages (no card chrome) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="px-2"
            >
              <p className="text-text-muted text-xs tracking-[0.3em] uppercase mb-4">
                Languages
              </p>
              <ul>
                {personalInfo.languages.map((lang, idx) => (
                  <li
                    key={lang.name}
                    className={`flex items-baseline justify-between gap-4 py-3 ${
                      idx < personalInfo.languages.length - 1
                        ? "border-b border-border/60"
                        : ""
                    }`}
                  >
                    <span className="text-sm font-semibold text-white">
                      {lang.name}
                    </span>
                    <span className="text-sm text-text-muted text-right">
                      {lang.level}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
