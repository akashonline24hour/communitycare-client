"use client";

import {
  Users,
  MousePointerClick,
  ShieldCheck,
  CalendarCheck,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";

export default function PlatformFeatures() {
  const features = [
    {
      icon: Users,
      badgeBg: "bg-emerald-100 dark:bg-emerald-950/60",
      iconColor: "text-[#0b3c3d] dark:text-emerald-400",
      accentBorder: "group-hover:border-emerald-500/50",
      title: "Community-Led Drives",
      description:
        "Every citizen can organize cleanups, winter drives, and food distributions in their local neighborhood within minutes.",
    },
    {
      icon: MousePointerClick,
      badgeBg: "bg-orange-100 dark:bg-orange-950/60",
      iconColor: "text-[#f07b42]",
      accentBorder: "group-hover:border-orange-500/50",
      title: "One-Click Participation",
      description:
        "Join verified social initiatives instantly with a single click and coordinate directly with local volunteer leaders.",
    },
    {
      icon: ShieldCheck,
      badgeBg: "bg-emerald-100 dark:bg-emerald-950/60",
      iconColor: "text-[#0b3c3d] dark:text-emerald-400",
      accentBorder: "group-hover:border-emerald-500/50",
      title: "Creator Controls",
      description:
        "Manage, update, and track attendee rosters for your initiatives with built-in organizer authorization tools.",
    },
    {
      icon: CalendarCheck,
      badgeBg: "bg-orange-100 dark:bg-orange-950/60",
      iconColor: "text-[#f07b42]",
      accentBorder: "group-hover:border-orange-500/50",
      title: "Active-Only Discovery",
      description:
        "Strict real-time filters guarantee you will always discover upcoming active initiatives that urgently need volunteers.",
    },
  ];

  return (
    <section className="py-24 px-6 bg-gray-50/70 dark:bg-gray-950 transition-colors duration-300">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Header Section */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-emerald-100/80 dark:bg-emerald-950/60 text-[#0b3c3d] dark:text-emerald-400 text-[11px] font-bold uppercase tracking-widest shadow-sm">
            <Sparkles
              size={14}
              className="text-emerald-600 dark:text-emerald-400"
            />
            Platform Features
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Built for Grassroots Action
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-normal leading-relaxed">
            A frictionless platform connecting compassionate citizens with
            direct local community initiatives.
          </p>
        </div>

        {/* Features 4-Column Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className={`group relative bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl p-7 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between ${item.accentBorder}`}
              >
                <div className="space-y-5">
                  {/* Icon Container with subtle hover zoom */}
                  <div className="flex items-center justify-between">
                    <div
                      className={`w-12 h-12 rounded-2xl ${item.badgeBg} ${item.iconColor} flex items-center justify-center shrink-0 shadow-inner group-hover:scale-110 transition-transform duration-300`}
                    >
                      <Icon size={24} />
                    </div>
                    <ArrowUpRight
                      size={18}
                      className="text-gray-300 dark:text-gray-600 group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors"
                    />
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-2">
                    <h3 className="text-base font-bold text-gray-900 dark:text-white tracking-tight">
                      {item.title}
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed font-normal">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Subtle Decorative Bottom Accent Bar */}
                <div className="mt-6 w-8 h-1 rounded-full bg-gray-200 dark:bg-gray-800 group-hover:w-16 group-hover:bg-[#0b3c3d] dark:group-hover:bg-emerald-500 transition-all duration-300" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
