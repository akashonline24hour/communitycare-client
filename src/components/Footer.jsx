"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#0b3c3d] text-white py-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 text-sm">
        <div>
          <h3 className="font-bold text-base mb-3 uppercase tracking-wider">
            Platform
          </h3>
          <ul className="space-y-2 text-emerald-100">
            <li>
              <Link
                href="/events"
                className="hover:text-white transition-colors"
              >
                Upcoming Events
              </Link>
            </li>
            <li>
              <Link
                href="/events/create"
                className="hover:text-white transition-colors"
              >
                Create Event
              </Link>
            </li>
            <li>
              <Link
                href="/events/manage"
                className="hover:text-white transition-colors"
              >
                Manage Events
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold text-base mb-3 uppercase tracking-wider">
            About
          </h3>
          <ul className="space-y-2 text-emerald-100">
            <li>
              <Link
                href="/about"
                className="hover:text-white transition-colors"
              >
                Our Mission
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="hover:text-white transition-colors"
              >
                Contact Us
              </Link>
            </li>
            <li>
              <Link
                href="/privacy"
                className="hover:text-white transition-colors"
              >
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto pt-6 border-t border-emerald-800 text-center text-xs text-emerald-200">
        © 2026 Hermione Community Events. All Rights Reserved.
      </div>
    </footer>
  );
}
