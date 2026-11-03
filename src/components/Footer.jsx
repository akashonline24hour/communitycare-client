"use client";

import Link from "next/link";
import { Star, Heart, ArrowUpRight, Mail } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[#072425] dark:bg-[#041617] text-white pt-16 pb-12 px-6 border-t border-emerald-900/60 dark:border-emerald-950 overflow-hidden transition-colors duration-300">
      {/* Top Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-gradient-to-r from-emerald-500/10 via-[#f07b42]/20 to-teal-500/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Main 4-Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand Info */}
          <div className="space-y-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2.5 text-lg font-bold tracking-wider uppercase group"
            >
              <div className="p-2 rounded-xl bg-emerald-900/40 dark:bg-emerald-950/60 border border-emerald-700/40 shadow-inner group-hover:scale-105 transition-transform">
                <Star className="w-5 h-5 text-emerald-400 fill-emerald-400/20" />
              </div>
              <span className="bg-gradient-to-r from-emerald-300 via-teal-200 to-orange-400 bg-clip-text text-transparent font-extrabold">
                HERMIONE
              </span>
            </Link>

            <p className="text-xs text-emerald-100/70 dark:text-emerald-200/60 leading-relaxed max-w-xs">
              Empowering communities by connecting people through impactful
              local events, workshops, and shared experiences.
            </p>

            {/* Social Links using Inline SVGs */}
            <div className="flex items-center gap-3 pt-2">
              {/* GitHub */}
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-full bg-emerald-950/60 border border-emerald-800/40 text-emerald-300 hover:text-white hover:bg-[#f07b42] hover:border-[#f07b42] transition-all duration-200 shadow-sm"
                aria-label="GitHub"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
              </a>

              {/* Twitter / X */}
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-full bg-emerald-950/60 border border-emerald-800/40 text-emerald-300 hover:text-white hover:bg-[#f07b42] hover:border-[#f07b42] transition-all duration-200 shadow-sm"
                aria-label="Twitter"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>

              {/* LinkedIn */}
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-full bg-emerald-950/60 border border-emerald-800/40 text-emerald-300 hover:text-white hover:bg-[#f07b42] hover:border-[#f07b42] transition-all duration-200 shadow-sm"
                aria-label="LinkedIn"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Platform Navigation */}
          <div>
            <h3 className="font-bold text-xs uppercase tracking-widest text-emerald-300 dark:text-emerald-400 mb-4 flex items-center gap-1.5">
              Platform Navigation
            </h3>
            <ul className="space-y-2.5 text-xs text-emerald-100/80 dark:text-emerald-200/70">
              {[
                { label: "Upcoming Events", href: "/events" },
                { label: "Create New Event", href: "/events/create" },
                { label: "Manage My Events", href: "/events/manage" },
                { label: "Joined Events", href: "/events/joined" },
              ].map((link, idx) => (
                <li key={idx}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-1 hover:text-orange-400 transition-colors"
                  >
                    <span>{link.label}</span>
                    <ArrowUpRight
                      size={12}
                      className="opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Community & Info */}
          <div>
            <h3 className="font-bold text-xs uppercase tracking-widest text-emerald-300 dark:text-emerald-400 mb-4">
              Community & Info
            </h3>
            <ul className="space-y-2.5 text-xs text-emerald-100/80 dark:text-emerald-200/70">
              {[
                { label: "Impact Gallery", href: "/gallery" },
                { label: "Community Newsletter", href: "/newsletter" },
                { label: "Our Mission", href: "/about" },
                { label: "Privacy Policy", href: "/privacy" },
              ].map((link, idx) => (
                <li key={idx}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-1 hover:text-orange-400 transition-colors"
                  >
                    <span>{link.label}</span>
                    <ArrowUpRight
                      size={12}
                      className="opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Direct Support Card */}
          <div className="bg-emerald-950/40 border border-emerald-800/40 p-5 rounded-2xl space-y-3 shadow-inner">
            <div className="flex items-center gap-2 text-orange-400 font-semibold text-xs uppercase tracking-wider">
              <Mail size={16} /> Need Support?
            </div>
            <p className="text-xs text-emerald-100/70 dark:text-emerald-200/60">
              Have questions about organizing an event or connecting with us?
            </p>
            <Link
              href="/contact"
              className="inline-block w-full text-center bg-[#f07b42] hover:bg-[#e06a35] text-white text-xs font-bold py-2.5 rounded-xl uppercase tracking-wider shadow transition-colors"
            >
              Contact Support
            </Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-emerald-900/60 dark:border-emerald-950/80 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-emerald-200/60 dark:text-emerald-300/50">
          <p>© {currentYear} Hermione Community Events. All Rights Reserved.</p>
          <p className="flex items-center gap-1">
            Built with{" "}
            <Heart
              size={13}
              className="text-red-500 fill-red-500 animate-pulse"
            />{" "}
            using Next.js & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}
