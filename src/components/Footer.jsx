"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#0b3c3d] dark:bg-[#072425] text-white py-12 px-6 border-t border-emerald-900/40 dark:border-emerald-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 text-sm">
        <div>
          <h3 className="font-bold text-base mb-3 uppercase tracking-wider text-white dark:text-emerald-100">
            Platform
          </h3>
          <ul className="space-y-2 text-emerald-100/90 dark:text-emerald-200/80">
            <li>
              <Link
                href="/events"
                className="hover:text-white dark:hover:text-emerald-300 transition-colors"
              >
                Upcoming Events
              </Link>
            </li>
            <li>
              <Link
                href="/events/create"
                className="hover:text-white dark:hover:text-emerald-300 transition-colors"
              >
                Create Event
              </Link>
            </li>
            <li>
              <Link
                href="/events/manage"
                className="hover:text-white dark:hover:text-emerald-300 transition-colors"
              >
                Manage Events
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-base mb-3 uppercase tracking-wider text-white dark:text-emerald-100">
            About
          </h3>
          <ul className="space-y-2 text-emerald-100/90 dark:text-emerald-200/80">
            <li>
              <Link
                href="/about"
                className="hover:text-white dark:hover:text-emerald-300 transition-colors"
              >
                Our Mission
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="hover:text-white dark:hover:text-emerald-300 transition-colors"
              >
                Contact Us
              </Link>
            </li>
            <li>
              <Link
                href="/privacy"
                className="hover:text-white dark:hover:text-emerald-300 transition-colors"
              >
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-6 border-t border-emerald-800/60 dark:border-emerald-900/50 text-center text-xs text-emerald-200/70 dark:text-emerald-300/60">
        © 2026 Hermione Community Events. All Rights Reserved.
      </div>
    </footer>
  );
}
