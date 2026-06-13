import { Linkedin, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <p className="text-lg font-semibold">
              <span className="gradient-text">Anahita</span> Aria
            </p>
            <p className="text-sm text-text-muted mt-1">Product Designer</p>
          </div>
          <div className="flex items-center gap-6 text-text-secondary">
            <a
              href="tel:+393513456916"
              className="hover:text-accent transition-colors flex items-center gap-2 text-sm"
            >
              <Phone size={14} />
              +39 351 3456916
            </a>
            <a
              href="https://linkedin.com/in/Anahita-Aria"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent transition-colors flex items-center gap-2 text-sm"
            >
              <Linkedin size={14} />
              LinkedIn
            </a>
            <span className="flex items-center gap-2 text-sm">
              <MapPin size={14} />
              Italy
            </span>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-border text-center text-xs text-text-muted">
          &copy; {new Date().getFullYear()} Anahita Aria. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
