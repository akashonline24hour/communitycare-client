"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-16 bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      <div className="max-w-md w-full bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl shadow-xl p-8 sm:p-12 text-center space-y-6">
        {/* Large Decorative 404 Badge */}
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-100 dark:border-emerald-800/50 text-[#0b3c3d] dark:text-emerald-400 font-extrabold text-3xl shadow-inner">
          404
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-wide text-gray-900 dark:text-white">
            Page Not Found
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
            The page or community event you are looking for doesn't exist or has
            been moved.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="bg-[#0b3c3d] hover:bg-[#072425] text-white px-6 py-3 rounded-full font-bold uppercase text-xs tracking-wider shadow transition-colors"
          >
            Back to Home
          </Link>
          <Link
            href="/events"
            className="bg-[#f07b42] hover:bg-[#e06a35] dark:bg-[#e06a35] dark:hover:bg-[#c95926] text-white px-6 py-3 rounded-full font-bold uppercase text-xs tracking-wider shadow transition-colors"
          >
            Explore Events
          </Link>
        </div>
      </div>
    </div>
  );
}
