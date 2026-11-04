"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Sparkles,
  Heart,
  Users,
  Target,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";

export default function AboutPage() {
  const values = [
    {
      icon: <Heart className="w-6 h-6 text-[#f07b42]" />,
      title: "Community First",
      description:
        "Every event and initiative on our platform is designed to bring positive change and social impact to local neighborhoods.",
    },
    {
      icon: <Users className="w-6 h-6 text-[#0b3c3d] dark:text-emerald-400" />,
      title: "Inclusive Collaboration",
      description:
        "We foster an open environment where volunteers, organizers, and partners work hand in hand without barriers.",
    },
    {
      icon: <Target className="w-6 h-6 text-blue-500" />,
      title: "Action-Oriented Impact",
      description:
        "From food drives to cleanups, we measure success by the tangible good done in real-world communities.",
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-purple-500" />,
      title: "Transparency & Trust",
      description:
        "Full operational transparency for all events, registration updates, and organizer credentials.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50/60 dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-300 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-20">
        {/* Hero Banner */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-[#0b3c3d] dark:text-emerald-300 text-xs font-semibold uppercase tracking-wider">
            <Sparkles size={14} className="text-[#f07b42]" /> Our Mission &
            Vision
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold uppercase tracking-wider text-gray-900 dark:text-white">
            Connecting Hearts to Empower Communities
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base leading-relaxed">
            Hermione Community Events is a digital movement bridging passionate
            volunteers with meaningful civic initiatives, charity drives, and
            environmental projects.
          </p>
        </div>

        {/* Mission Card Showcase */}
        <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl p-8 sm:p-12 shadow-lg grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-wide text-gray-900 dark:text-white">
              Building Stronger Neighborhoods Together
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              Founded with the belief that small collective actions create
              monumental social shifts, our platform provides community leaders
              with intuitive tools to manage events while enabling participants
              to easily find and join nearby drives.
            </p>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              Whether it’s tree plantation drives, winter relief distribution,
              or youth education workshops, we empower every individual to take
              part in positive change.
            </p>
            <div className="pt-2">
              <Link
                href="/events"
                className="inline-flex items-center gap-2 bg-[#f07b42] hover:bg-[#e06a35] dark:bg-[#e06a35] dark:hover:bg-[#c95926] text-white px-6 py-3 rounded-2xl font-bold uppercase text-xs tracking-wider shadow-md transition-all"
              >
                Explore Events <ArrowRight size={15} />
              </Link>
            </div>
          </div>

          <div className="relative h-72 sm:h-96 w-full rounded-2xl overflow-hidden shadow-md bg-gray-100 dark:bg-gray-800">
            <Image
              src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800"
              alt="Community Volunteers"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Core Values Section */}
        <div className="space-y-10">
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-wider text-gray-900 dark:text-white">
              Our Core Principles
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 max-w-md mx-auto">
              The foundational values guiding every feature and community
              initiative.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((val, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all space-y-3"
              >
                <div className="p-3 rounded-2xl bg-gray-50 dark:bg-gray-800 w-fit">
                  {val.icon}
                </div>
                <h3 className="text-base font-bold text-gray-900 dark:text-white">
                  {val.title}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                  {val.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
