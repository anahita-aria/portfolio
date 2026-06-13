import { MapPin, Mail, Phone, Linkedin, Globe, ArrowUpRight, Sparkles, Code2, Layers, Users } from "lucide-react";
import { personalInfo, experiences } from "@/data/portfolio";

export const metadata = {
  title: "Anahita Aria — CV",
  description: "Senior Product Designer | AI-Native Designer with an Engineering Mind",
};

export default function CVPage() {
  return (
    <div className="relative min-h-screen pt-[80px] pb-[120px]">
      {/* Subtle grid background */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #a2ffd2 1px, transparent 1px), linear-gradient(to bottom, #a2ffd2 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          maskImage: "radial-gradient(ellipse at center top, black 20%, transparent 70%)",
        }}
      />

      <main className="relative z-10 mx-auto max-w-[1200px] px-8">
        {/* ── 1. HERO ─────────────────────────────────────────── */}
        <section className="grid grid-cols-12 gap-10 pt-[40px]">
          {/* Left — portrait */}
          <div className="col-span-4">
            <div className="relative">
              <div className="absolute top-0 left-0 w-[280px] h-[340px] rounded-[32px] overflow-hidden opacity-30">
                <img src="/hero/profile.png" alt="" className="w-full h-full object-cover object-top" />
              </div>
              <div className="relative w-[280px] h-[340px] rounded-[32px] overflow-hidden translate-x-[14px] translate-y-[14px] border border-[#3a3f4f]">
                <img src="/hero/profile.png" alt="Anahita Aria" className="w-full h-full object-cover object-top" />
              </div>
              {/* Badge overlay */}
              <div className="absolute -bottom-4 left-6 z-10 flex items-center gap-2 rounded-full border border-[#a2ffd2]/30 bg-[#242731] px-4 py-2">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#a2ffd2] opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[#a2ffd2]" />
                </span>
                <span className="text-[12px] font-semibold tracking-wide text-[#a2ffd2]">
                  Open to Berlin · Senior / Lead roles
                </span>
              </div>
            </div>
          </div>

          {/* Right — headline */}
          <div className="col-span-8 flex flex-col justify-center pl-4">
            <p className="text-[14px] font-semibold uppercase tracking-[2.4px] text-[#6e7286]">
              Curriculum Vitae · 2026
            </p>
            <h1 className="mt-3 text-[72px] font-bold leading-[1.02] tracking-tight text-white">
              Anahita Aria
            </h1>
            <p className="mt-5 max-w-[620px] text-[20px] leading-[30px] font-medium text-[#dbdce1]">
              Senior Product Designer <span className="text-[#a2ffd2]">|</span> AI-Native Designer with an Engineering Mind
            </p>
            <p className="mt-4 max-w-[620px] text-[15px] leading-[26px] text-[#9aa0b0]">
              I design fintech and crypto products that ship, scale, and move metrics — and I translate them directly into production code with Claude and the Figma MCP server.
            </p>

            {/* Identity row */}
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-[13px] text-[#dbdce1]">
              <span className="flex items-center gap-1.5"><MapPin size={14} className="text-[#a2ffd2]" />{personalInfo.contact.location}</span>
              <span className="h-3 w-px bg-[#3a3f4f]" />
              <a href={`mailto:${personalInfo.contact.email}`} className="flex items-center gap-1.5 hover:text-[#a2ffd2] transition-colors">
                <Mail size={14} className="text-[#a2ffd2]" />{personalInfo.contact.email}
              </a>
              <span className="h-3 w-px bg-[#3a3f4f]" />
              <a href={`https://linkedin.com/in/${personalInfo.contact.linkedin}`} className="flex items-center gap-1.5 hover:text-[#a2ffd2] transition-colors">
                <Linkedin size={14} className="text-[#a2ffd2]" />in/{personalInfo.contact.linkedin}
              </a>
              <span className="h-3 w-px bg-[#3a3f4f]" />
              <a href={personalInfo.contact.portfolio} className="flex items-center gap-1.5 hover:text-[#a2ffd2] transition-colors">
                <Globe size={14} className="text-[#a2ffd2]" />Behance
              </a>
            </div>
          </div>
        </section>

        {/* ── 2. IMPACT METRICS ───────────────────────────────── */}
        <section className="mt-[96px] grid grid-cols-5 gap-[2px] overflow-hidden rounded-[20px] border border-[#3a3f4f] bg-[#3a3f4f]">
          {[
            { v: "6+", l: "Years designing", s: "Products that shipped" },
            { v: "10+", l: "Products launched", s: "Across 7+ industries" },
            { v: "80%", l: "Faster handoff", s: "Figma MCP + Claude" },
            { v: "3×", l: "Insurance conversion", s: "20% → 60% at Azki" },
            { v: "40+", l: "Components shipped", s: "Figma-to-code via AI" },
          ].map((m) => (
            <div key={m.l} className="bg-[#2d313d] p-6">
              <p className="text-[36px] leading-none font-bold text-[#a2ffd2]">{m.v}</p>
              <p className="mt-3 text-[13px] font-semibold text-white leading-tight">{m.l}</p>
              <p className="mt-1 text-[11px] text-[#6e7286] leading-snug">{m.s}</p>
            </div>
          ))}
        </section>

        {/* ── 3. POSITIONING PILLARS ──────────────────────────── */}
        <section className="mt-[120px]">
          <SectionLabel number="01" label="Why me" />
          <h2 className="mt-4 max-w-[900px] text-[40px] leading-[1.2] font-bold text-white tracking-tight">
            Most designers stop at Figma. <span className="text-[#a2ffd2]">I ship to production</span> — and I've been doing it since before AI made it fashionable.
          </h2>
          <div className="mt-14 grid grid-cols-3 gap-6">
            <Pillar
              icon={<Code2 size={20} className="text-[#a2ffd2]" />}
              title="Engineering mind"
              body="Master's in AI, Bachelor's in Software Engineering. I design with the grain of how systems actually work — which means fewer handoff loops, fewer impossible requests, and specs engineers respect."
            />
            <Pillar
              icon={<Sparkles size={20} className="text-[#a2ffd2]" />}
              title="AI-native workflow"
              body="I translate Figma directly to code via Claude + the Figma MCP server. At MORS, that cut component implementation from ~2 weeks to 1–2 days. 40+ components shipped, 80% faster handoff."
            />
            <Pillar
              icon={<Layers size={20} className="text-[#a2ffd2]" />}
              title="Complex made obvious"
              body="DeFi vaults, insurance marketplaces, B2B cockpits, crypto wallets. The products most designers avoid — because simplifying them takes patience, systems thinking, and domain fluency."
            />
          </div>
        </section>

        {/* ── 4. EXPERIENCE ───────────────────────────────────── */}
        <section className="mt-[120px]">
          <SectionLabel number="02" label="Experience" />
          <h2 className="mt-4 text-[40px] leading-[1.2] font-bold text-white tracking-tight">
            From solo designer to team lead — across <span className="text-[#a2ffd2]">7 industries</span>.
          </h2>

          <div className="mt-14 space-y-[2px] overflow-hidden rounded-[20px] border border-[#3a3f4f] bg-[#3a3f4f]">
            {experiences.map((exp) => (
              <article key={exp.company} className="bg-[#2d313d] px-8 py-7">
                <div className="grid grid-cols-12 gap-6">
                  <div className="col-span-3">
                    <p className="text-[11px] font-semibold uppercase tracking-[1.5px] text-[#6e7286]">{exp.duration}</p>
                    <p className="mt-2 text-[18px] font-bold text-white">{exp.company}</p>
                    <p className="mt-1 text-[12px] text-[#9aa0b0]">{exp.location}</p>
                  </div>
                  <div className="col-span-9">
                    <h3 className="text-[20px] font-semibold text-[#a2ffd2] leading-tight">{exp.role}</h3>
                    <p className="mt-3 text-[14px] leading-[24px] text-[#dbdce1]">{exp.description}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {exp.skills.slice(0, 6).map((s) => (
                        <span key={s} className="rounded-full border border-[#3a3f4f] bg-[#242731] px-3 py-1 text-[11px] font-medium text-[#9aa0b0]">
                          {s}
                        </span>
                      ))}
                    </div>
                    {exp.products && (
                      <p className="mt-4 text-[11px] uppercase tracking-[1.5px] text-[#6e7286]">
                        Products: <span className="text-[#dbdce1] normal-case tracking-normal font-medium">{exp.products.join(" · ")}</span>
                      </p>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ── 5. SKILLS & TOOLS ───────────────────────────────── */}
        <section className="mt-[120px]">
          <SectionLabel number="03" label="Craft" />
          <h2 className="mt-4 text-[40px] leading-[1.2] font-bold text-white tracking-tight">
            The stack I work in.
          </h2>

          <div className="mt-14 grid grid-cols-2 gap-6">
            <SkillBlock title="Design" items={personalInfo.skills.design} />
            <SkillBlock title="Research" items={personalInfo.skills.research} />
            <SkillBlock title="AI & Engineering" items={personalInfo.skills.technical} highlighted />
            <SkillBlock title="Leadership" items={["Team Lead of 4 designers","Cross-functional collaboration","Mentorship","Engineering partnership","Design critique","Stakeholder alignment"]} />
          </div>

          {/* Tools row */}
          <div className="mt-10 rounded-[20px] border border-[#3a3f4f] bg-[#2d313d] p-8">
            <p className="text-[11px] font-semibold uppercase tracking-[2px] text-[#6e7286]">Tools</p>
            <div className="mt-5 grid grid-cols-4 gap-8">
              {Object.entries(personalInfo.tools).map(([cat, tools]) => (
                <div key={cat}>
                  <p className="text-[12px] font-semibold text-[#a2ffd2] mb-2">{cat}</p>
                  <ul className="space-y-1">
                    {tools.map((t) => (
                      <li key={t} className="text-[13px] text-[#dbdce1]">{t}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 6. EDUCATION & RECOGNITION ──────────────────────── */}
        <section className="mt-[120px] grid grid-cols-12 gap-6">
          <div className="col-span-7">
            <SectionLabel number="04" label="Education" />
            <h2 className="mt-4 text-[32px] leading-[1.2] font-bold text-white tracking-tight">
              Trained in the logic behind the interface.
            </h2>
            <div className="mt-8 space-y-[2px] overflow-hidden rounded-[20px] border border-[#3a3f4f] bg-[#3a3f4f]">
              {personalInfo.education.map((e) => (
                <div key={e.degree} className="bg-[#2d313d] p-6">
                  <p className="text-[11px] font-semibold uppercase tracking-[1.5px] text-[#6e7286]">{e.years}</p>
                  <p className="mt-2 text-[16px] font-semibold text-white">{e.degree}</p>
                  <p className="mt-1 text-[13px] text-[#9aa0b0]">{e.school}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="col-span-5">
            <SectionLabel number="05" label="Recognition" />
            <h2 className="mt-4 text-[32px] leading-[1.2] font-bold text-white tracking-tight">
              Published research.
            </h2>
            <div className="mt-8 rounded-[20px] border border-[#a2ffd2]/20 bg-gradient-to-br from-[#2d313d] to-[#242731] p-6">
              <div className="flex items-center gap-2">
                <Sparkles size={14} className="text-[#a2ffd2]" />
                <p className="text-[11px] font-semibold uppercase tracking-[1.5px] text-[#a2ffd2]">IEEE Publication</p>
              </div>
              <p className="mt-3 text-[16px] font-semibold text-white leading-snug">
                {personalInfo.publications[0].title}
              </p>
              <p className="mt-2 text-[13px] text-[#9aa0b0]">{personalInfo.publications[0].venue}</p>
            </div>

            <div className="mt-6">
              <p className="text-[11px] font-semibold uppercase tracking-[2px] text-[#6e7286]">Languages</p>
              <div className="mt-4 space-y-2">
                {personalInfo.languages.map((l) => (
                  <div key={l.name} className="flex items-center justify-between border-b border-[#3a3f4f]/50 pb-2">
                    <span className="text-[14px] font-medium text-white">{l.name}</span>
                    <span className="text-[12px] text-[#9aa0b0]">{l.level}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── 7. WHAT I'M LOOKING FOR — CTA ───────────────────── */}
        <section className="mt-[120px] relative overflow-hidden rounded-[32px] border border-[#a2ffd2]/20 bg-gradient-to-br from-[#2d313d] via-[#242731] to-[#2d313d] p-16">
          <div className="absolute -top-20 -right-20 w-[300px] h-[300px] rounded-full bg-[#a2ffd2]/5 blur-3xl" />
          <div className="relative grid grid-cols-12 gap-8 items-center">
            <div className="col-span-7">
              <SectionLabel number="06" label="What's next" />
              <h2 className="mt-4 text-[44px] leading-[1.1] font-bold text-white tracking-tight">
                Looking for a <span className="text-[#a2ffd2]">Senior or Lead</span> role in Berlin.
              </h2>
              <p className="mt-6 max-w-[520px] text-[16px] leading-[26px] text-[#dbdce1]">
                Fintech, crypto, or AI-first products. Teams that care about craft <em className="text-[#a2ffd2] not-italic font-semibold">and</em> shipping. Ideally something complex that needs to feel simple — and a room where my engineering background is an asset, not a curiosity.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                {personalInfo.lookingFor.map((item) => (
                  <span key={item} className="rounded-full border border-[#a2ffd2]/30 bg-[#a2ffd2]/5 px-4 py-2 text-[12px] font-medium text-[#a2ffd2]">
                    {item}
                  </span>
                ))}
              </div>
            </div>
            <div className="col-span-5 flex flex-col gap-3">
              <a href={`mailto:${personalInfo.contact.email}`} className="group flex items-center justify-between rounded-[16px] bg-[#a2ffd2] px-6 py-5 text-[#01030d] font-semibold text-[15px] hover:brightness-110 transition-all shadow-[0px_3px_0px_0px_rgba(162,255,210,0.2)]">
                <span className="flex items-center gap-3"><Mail size={18} />Email me</span>
                <ArrowUpRight size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
              <a href={`https://linkedin.com/in/${personalInfo.contact.linkedin}`} className="group flex items-center justify-between rounded-[16px] border border-[#a2ffd2]/40 bg-transparent px-6 py-5 text-[#a2ffd2] font-semibold text-[15px] hover:bg-[#a2ffd2]/5 transition-all">
                <span className="flex items-center gap-3"><Linkedin size={18} />Connect on LinkedIn</span>
                <ArrowUpRight size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
              <a href={`tel:${personalInfo.contact.phone}`} className="group flex items-center justify-between rounded-[16px] border border-[#3a3f4f] bg-transparent px-6 py-5 text-white font-semibold text-[15px] hover:border-[#a2ffd2]/40 transition-all">
                <span className="flex items-center gap-3"><Phone size={18} className="text-[#a2ffd2]" />{personalInfo.contact.phone}</span>
                <ArrowUpRight size={18} className="text-[#a2ffd2] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </div>
        </section>

        {/* Footer signature */}
        <div className="mt-[96px] flex items-center justify-between border-t border-[#3a3f4f] pt-8">
          <p className="text-[12px] text-[#6e7286]">Anahita Aria · Curriculum Vitae · Updated April 2026</p>
          <p className="text-[12px] text-[#6e7286]">Designed & coded by me · with Claude</p>
        </div>
      </main>
    </div>
  );
}

/* ─ Helpers ─ */

function SectionLabel({ number, label }: { number: string; label: string }) {
  return (
    <div className="flex items-center gap-4">
      <span className="font-mono text-[13px] text-[#a2ffd2]">{number}</span>
      <span className="h-px w-10 bg-[#a2ffd2]/40" />
      <span className="text-[12px] font-semibold uppercase tracking-[2px] text-[#9aa0b0]">{label}</span>
    </div>
  );
}

function Pillar({ icon, title, body }: { icon: React.ReactNode; title: string; body: string }) {
  return (
    <div className="rounded-[20px] border border-[#3a3f4f] bg-[#2d313d] p-7 hover:border-[#a2ffd2]/30 transition-colors">
      <div className="flex h-10 w-10 items-center justify-center rounded-[10px] border border-[#a2ffd2]/30 bg-[#a2ffd2]/5">
        {icon}
      </div>
      <h3 className="mt-5 text-[18px] font-semibold text-white leading-tight">{title}</h3>
      <p className="mt-3 text-[14px] leading-[22px] text-[#9aa0b0]">{body}</p>
    </div>
  );
}

function SkillBlock({ title, items, highlighted }: { title: string; items: string[]; highlighted?: boolean }) {
  return (
    <div className={`rounded-[20px] border p-7 ${highlighted ? "border-[#a2ffd2]/30 bg-gradient-to-br from-[#a2ffd2]/[0.04] to-[#2d313d]" : "border-[#3a3f4f] bg-[#2d313d]"}`}>
      <p className={`text-[11px] font-semibold uppercase tracking-[2px] ${highlighted ? "text-[#a2ffd2]" : "text-[#6e7286]"}`}>{title}</p>
      <div className="mt-5 flex flex-wrap gap-2">
        {items.map((s) => (
          <span key={s} className={`rounded-[8px] border px-3 py-1.5 text-[12px] font-medium ${highlighted ? "border-[#a2ffd2]/20 bg-[#a2ffd2]/5 text-white" : "border-[#3a3f4f] bg-[#242731] text-[#dbdce1]"}`}>
            {s}
          </span>
        ))}
      </div>
    </div>
  );
}
