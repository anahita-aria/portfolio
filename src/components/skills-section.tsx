"use client";

import { motion } from "framer-motion";
import { personalInfo } from "@/data/portfolio";
import { Palette, Search, Code2, Wrench } from "lucide-react";

const toolGroups = [
  {
    label: "AI & Design-to-Code",
    items: ["Claude", "Figma MCP Server", "KlingAI"],
  },
  {
    label: "UI Design",
    items: ["Figma", "Sketch", "Adobe XD", "Adobe Illustrator"],
  },
  {
    label: "Design System",
    items: ["Tokens Studio", "Storybook", "Git"],
  },
  {
    label: "Research & Collaboration",
    items: ["Miro", "FigJam", "Maze", "Lookback"],
  },
];

export function SkillsSection() {
  return (
    <section id="skills" className="py-12 md:py-16 lg:py-20 xl:py-28">
      <div className="max-w-[1200px] mx-auto px-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 px-6 lg:px-0"
        >
          <p className="text-accent text-sm tracking-[0.3em] uppercase mb-3">
            Expertise
          </p>
          <h2 className="text-3xl lg:text-4xl font-bold">Skills & Tools</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-6 lg:px-0">
          {/* Design skills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-surface border border-border rounded-2xl p-6"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                <Palette size={20} className="text-accent" />
              </div>
              <h3 className="text-lg font-semibold">Design</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {personalInfo.skills.design.map((skill) => (
                <span
                  key={skill}
                  className="text-xs px-3 py-1.5 rounded-full border border-border text-text-secondary"
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Research & Strategy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="bg-surface border border-border rounded-2xl p-6"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                <Search size={20} className="text-accent" />
              </div>
              <h3 className="text-lg font-semibold">Research &amp; Strategy</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {personalInfo.skills.research.map((skill) => (
                <span
                  key={skill}
                  className="text-xs px-3 py-1.5 rounded-full border border-border text-text-secondary"
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Technical */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-surface border border-border rounded-2xl p-6"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                <Code2 size={20} className="text-accent" />
              </div>
              <h3 className="text-lg font-semibold">Technical</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {personalInfo.skills.technical.map((skill) => (
                <span
                  key={skill}
                  className="text-xs px-3 py-1.5 rounded-full border border-border text-text-secondary"
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Tools (full width) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="md:col-span-2 lg:col-span-3 bg-surface border border-border rounded-2xl p-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                <Wrench size={20} className="text-accent" />
              </div>
              <h3 className="text-lg font-semibold">Tools</h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-6">
              {toolGroups.map((group) => (
                <div key={group.label}>
                  <p className="text-[13px] font-semibold text-accent mb-3">
                    {group.label}
                  </p>
                  <ul className="space-y-1.5">
                    {group.items.map((item) => (
                      <li
                        key={item}
                        className="text-sm text-text-secondary"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
