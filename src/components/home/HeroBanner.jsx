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
    <section className="relative bg-gradient-to-br from-[#0b3c3d] via-[#083031] to-[#041617] text-white py-24 px-6 text-center overflow-hidden transition-colors duration-300">
      {/* Decorative Background Glow Elements */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gradient-to-tr from-emerald-500/20 to-[#f07b42]/20 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative max-w-5xl mx-auto space-y-8">
        {/* Top Platform Tag Pill */}
        <div className="flex justify-center">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-emerald-300 text-xs font-semibold tracking-wide shadow-sm border border-white/10">
            <Sparkles size={14} className="text-[#f07b42]" />
            Community-Driven Social Development Platform
          </span>
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-tight text-white max-w-4xl mx-auto">
          Gather for Good.{" "}
          <span className="bg-gradient-to-r from-[#f07b42] via-orange-400 to-amber-300 bg-clip-text text-transparent">
            Transform Your Neighborhood.
          </span>
        </h1>

        {/* Description */}
        <p className="text-sm sm:text-base text-gray-300 max-w-2xl mx-auto font-light leading-relaxed">
          Create, discover, and join local social service drives in your
          neighborhood. From winter clothes and blanket distributions to urban
          tree plantations and cleanups.
        </p>

        {/* Dual Call-to-Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <Link
            href="/events"
            className="inline-flex items-center gap-2 bg-[#f07b42] hover:bg-[#e06a35] text-white px-7 py-3.5 rounded-full font-bold text-xs uppercase tracking-wider shadow-lg transition-all hover:scale-105"
          >
            Explore Upcoming Events <ArrowRight size={16} />
          </Link>

          <Link
            href="/events/create"
            className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/20 px-7 py-3.5 rounded-full font-bold text-xs uppercase tracking-wider shadow-sm transition-all hover:scale-105"
          >
            <PlusCircle size={16} className="text-emerald-400" /> Create an
            Event
          </Link>
        </div>

        {/* Statistics Counter Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-12 max-w-4xl mx-auto">
          {/* Stat 1 */}
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 shadow-sm flex flex-col items-center justify-center space-y-1">
            <p className="text-2xl sm:text-3xl font-extrabold text-white">
              1,450+
            </p>
            <p className="text-[11px] sm:text-xs font-medium text-gray-300 uppercase tracking-wider flex items-center gap-1">
              <Users size={14} className="text-emerald-400" /> Active Volunteers
            </p>
          </div>

          {/* Stat 2 */}
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 shadow-sm flex flex-col items-center justify-center space-y-1">
            <p className="text-2xl sm:text-3xl font-extrabold text-white">
              180+
            </p>
            <p className="text-[11px] sm:text-xs font-medium text-gray-300 uppercase tracking-wider flex items-center gap-1">
              <Calendar size={14} className="text-[#f07b42]" /> Events Completed
            </p>
          </div>

          {/* Stat 3 */}
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 shadow-sm flex flex-col items-center justify-center space-y-1">
            <p className="text-2xl sm:text-3xl font-extrabold text-white">
              24,000+
            </p>
            <p className="text-[11px] sm:text-xs font-medium text-gray-300 uppercase tracking-wider flex items-center gap-1">
              <HeartHandshake size={14} className="text-emerald-400" /> Lives
              Impacted
            </p>
          </div>

          {/* Stat 4 */}
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 shadow-sm flex flex-col items-center justify-center space-y-1">
            <p className="text-2xl sm:text-3xl font-extrabold text-emerald-400">
              100%
            </p>
            <p className="text-[11px] sm:text-xs font-medium text-gray-300 uppercase tracking-wider flex items-center gap-1">
              <ShieldCheck size={14} className="text-[#f07b42]" /> Community
              Driven
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
