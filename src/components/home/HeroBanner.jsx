"use client";

import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  PlusCircle,
  Users,
  Calendar,
  HeartHandshake,
  ShieldCheck,
} from "lucide-react";

export default function HeroBanner() {
  return (
    <section className="relative bg-gradient-to-b from-emerald-50/60 via-white to-gray-50/60 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 py-20 px-6 text-center overflow-hidden transition-colors duration-300">
      <div className="relative max-w-5xl mx-auto space-y-8">
        {/* Top Platform Tag Pill */}
        <div className="flex justify-center">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100/80 dark:bg-emerald-950/60 text-[#0b3c3d] dark:text-emerald-400 text-xs font-semibold tracking-wide shadow-sm border border-emerald-200/50 dark:border-emerald-800/50">
            <Sparkles
              size={14}
              className="text-emerald-600 dark:text-emerald-400"
            />
            Community-Driven Social Development Platform
          </span>
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-tight text-gray-900 dark:text-white max-w-4xl mx-auto">
          Gather for Good.{" "}
          <span className="bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
            Transform Your Neighborhood.
          </span>
        </h1>

        {/* Description */}
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 max-w-2xl mx-auto font-normal leading-relaxed">
          Create, discover, and join local social service drives in your
          neighborhood. From winter clothes and blanket distributions to urban
          tree plantations and cleanups.
        </p>

        {/* Dual Call-to-Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <Link
            href="/events"
            className="inline-flex items-center gap-2 bg-[#0b3c3d] hover:bg-[#072a2b] dark:bg-emerald-600 dark:hover:bg-emerald-700 text-white px-7 py-3.5 rounded-full font-bold text-xs uppercase tracking-wider shadow-lg transition-all hover:scale-105"
          >
            Explore Upcoming Events <ArrowRight size={16} />
          </Link>

          <Link
            href="/events/create"
            className="inline-flex items-center gap-2 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-800 px-7 py-3.5 rounded-full font-bold text-xs uppercase tracking-wider shadow-sm transition-all hover:scale-105"
          >
            <PlusCircle size={16} className="text-[#f07b42]" /> Create an Event
          </Link>
        </div>

        {/* Statistics Counter Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-12 max-w-4xl mx-auto">
          {/* Stat 1 */}
          <div className="bg-white dark:bg-gray-900/80 border border-gray-100 dark:border-gray-800 rounded-3xl p-6 shadow-sm flex flex-col items-center justify-center space-y-1">
            <p className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">
              1,450+
            </p>
            <p className="text-[11px] sm:text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider flex items-center gap-1">
              <Users
                size={14}
                className="text-emerald-600 dark:text-emerald-400"
              />{" "}
              Active Volunteers
            </p>
          </div>

          {/* Stat 2 */}
          <div className="bg-white dark:bg-gray-900/80 border border-gray-100 dark:border-gray-800 rounded-3xl p-6 shadow-sm flex flex-col items-center justify-center space-y-1">
            <p className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">
              180+
            </p>
            <p className="text-[11px] sm:text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider flex items-center gap-1">
              <Calendar size={14} className="text-[#f07b42]" /> Events Completed
            </p>
          </div>

          {/* Stat 3 */}
          <div className="bg-white dark:bg-gray-900/80 border border-gray-100 dark:border-gray-800 rounded-3xl p-6 shadow-sm flex flex-col items-center justify-center space-y-1">
            <p className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">
              24,000+
            </p>
            <p className="text-[11px] sm:text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider flex items-center gap-1">
              <HeartHandshake
                size={14}
                className="text-emerald-600 dark:text-emerald-400"
              />{" "}
              Lives Impacted
            </p>
          </div>

          {/* Stat 4 */}
          <div className="bg-white dark:bg-gray-900/80 border border-gray-100 dark:border-gray-800 rounded-3xl p-6 shadow-sm flex flex-col items-center justify-center space-y-1">
            <p className="text-2xl sm:text-3xl font-extrabold text-emerald-600 dark:text-emerald-400">
              100%
            </p>
            <p className="text-[11px] sm:text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider flex items-center gap-1">
              <ShieldCheck size={14} className="text-[#f07b42]" /> Community
              Driven
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
