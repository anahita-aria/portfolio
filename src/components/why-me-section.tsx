"use client";

import { motion } from "framer-motion";
import { Code2, Sparkles, Layers } from "lucide-react";

const cards = [
  {
    icon: Layers,
    title: "Complex made obvious",
    description:
      "DeFi vaults, insurance marketplaces, B2B cockpits, crypto wallets. The products most designers avoid, because simplifying them takes patience, systems thinking, and domain fluency.",
    proof: "20% → 60% conversion on Azki insurance B2B2C platform",
  },
  {
    icon: Code2,
    title: "Engineering mind",
    description:
      "Master's in AI, Bachelor's in Software Engineering. I design with the grain of how systems actually work, which means fewer handoff loops, fewer impossible requests, and specs engineers respect.",
    proof: "Redesigned 3 enterprise SaaS products at Neperia in 6 months",
  },
  {
    icon: Sparkles,
    title: "AI-native workflow",
    description:
      "I translate Figma directly to code via Claude + the Figma MCP server. At MORS, that cut component implementation from ~2 weeks to 1–2 days.",
    proof: "40+ Backed components shipped, 80% faster handoff",
  },
];

export function WhyMeSection() {
  return (
    <section className="py-12 md:py-16 lg:py-20 xl:py-28 relative z-[1]">
      <div className="max-w-[1200px] mx-auto px-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 px-6 lg:px-0"
        >
          <p className="text-accent text-sm tracking-[0.3em] uppercase mb-4">
            Why Me
          </p>
          <h2 className="text-2xl md:text-3xl lg:text-[36px] leading-[1.3] font-bold text-white max-w-3xl">
            Most designers stop at Figma. I ship to production. I was doing it
            before AI made it fashionable.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 px-6 lg:px-0">
          {cards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative flex bg-surface/60 border border-border rounded-2xl p-6 transition-all duration-300 hover:border-accent/40 hover:bg-surface/80 hover:shadow-[0_0_40px_-10px_rgba(162,255,210,0.25)]"
            >
              {/* Subtle accent glow on hover */}
              <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{
                background: "radial-gradient(circle at 50% 0%, rgba(162,255,210,0.08), transparent 70%)",
              }} />

              <div className="relative flex flex-col w-full">
                <div className="w-11 h-11 rounded-xl bg-accent/10 flex items-center justify-center mb-5 group-hover:bg-accent/20 transition-colors">
                  <card.icon size={20} className="text-accent" />
                </div>
                <h3 className="text-[18px] font-semibold text-white mb-3">
                  {card.title}
                </h3>
                <p className="text-[14px] leading-[22px] text-text-secondary mb-4 flex-1">
                  {card.description}
                </p>
                <div className="pt-4 border-t border-border/60 mt-auto">
                  <p className="text-[11px] uppercase tracking-[0.15em] text-accent font-semibold mb-1">
                    In practice
                  </p>
                  <p className="text-[13px] leading-[20px] text-text-secondary min-h-[40px]">
                    {card.proof}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
