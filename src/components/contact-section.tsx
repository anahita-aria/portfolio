"use client";

import { motion } from "framer-motion";
import { Mail, Linkedin, Phone, MapPin, ExternalLink } from "lucide-react";
import { personalInfo } from "@/data/portfolio";

export function ContactSection() {
  const { contact } = personalInfo;
  // lookingFor still in personalInfo for the (currently commented) recruiter CTA below
  const phoneHref = `tel:${contact.phone.replace(/\s+/g, "")}`;
  const emailHref = `mailto:${contact.email}`;
  const linkedinHref = `https://linkedin.com/in/${contact.linkedin}`;

  return (
    <section id="contact" className="py-12 md:py-16 lg:py-20 xl:py-28 relative z-[1]">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto"
        >
          <p className="text-accent text-sm tracking-[0.3em] uppercase mb-3">
            Get in Touch
          </p>
          <h2 className="text-3xl lg:text-5xl font-bold mb-6">
            Let&apos;s Work{" "}
            <span className="gradient-text">Together</span>
          </h2>

          {/* Let's talk if you're — recruiter CTA (commented out, kept for reference) */}
          {/*
          <div className="mb-12 text-left bg-surface/50 border border-border rounded-2xl p-6">
            <p className="text-sm font-semibold text-accent mb-3 tracking-wider uppercase">
              Let&apos;s talk if you&apos;re
            </p>
            <ul className="space-y-2">
              {lookingFor.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-text-secondary leading-relaxed">
                  <span className="text-accent mt-1 shrink-0">→</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          */}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md mx-auto">
            <a
              href={phoneHref}
              className="flex items-center gap-3 p-4 rounded-xl border border-border bg-surface hover:border-accent/30 transition-all group"
            >
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                <Phone size={18} className="text-accent" />
              </div>
              <div className="text-left">
                <p className="text-xs text-text-muted">Phone</p>
                <p className="text-sm text-text-secondary group-hover:text-accent transition-colors">
                  {contact.phone}
                </p>
              </div>
            </a>

            <a
              href={linkedinHref}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 rounded-xl border border-border bg-surface hover:border-accent/30 transition-all group"
            >
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                <Linkedin size={18} className="text-accent" />
              </div>
              <div className="text-left">
                <p className="text-xs text-text-muted">LinkedIn</p>
                <p className="text-sm text-text-secondary group-hover:text-accent transition-colors">
                  {contact.linkedin}
                </p>
              </div>
            </a>

            <a
              href={emailHref}
              className="flex items-center gap-3 p-4 rounded-xl border border-border bg-surface hover:border-accent/30 transition-all group"
            >
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                <Mail size={18} className="text-accent" />
              </div>
              <div className="text-left">
                <p className="text-xs text-text-muted">Email</p>
                <p className="text-sm text-text-secondary group-hover:text-accent transition-colors break-all">
                  {contact.email}
                </p>
              </div>
            </a>

            <div className="flex items-center gap-3 p-4 rounded-xl border border-border bg-surface">
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                <MapPin size={18} className="text-accent" />
              </div>
              <div className="text-left">
                <p className="text-xs text-text-muted">Location</p>
                <p className="text-sm text-text-secondary">{contact.location}</p>
                <p className="text-[11px] text-accent mt-0.5">{contact.relocation}</p>
              </div>
            </div>
          </div>

          {/* Portfolio link */}
          <a
            href={contact.portfolio}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-8 text-sm text-text-muted hover:text-accent transition-colors"
          >
            <ExternalLink size={14} />
            Also on Behance
          </a>
        </motion.div>
      </div>
    </section>
  );
}
