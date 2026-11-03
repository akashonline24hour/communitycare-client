"use client";

import Link from "next/link";
import Image from "next/image";

export default function HeroBanner() {
  return (
    <section className="relative bg-[#0b3c3d] dark:bg-[#072425] text-white py-28 px-6 text-center overflow-hidden transition-colors duration-300">
      {/* Background Overlay */}
      <div className="absolute inset-0 opacity-20 dark:opacity-10">
        <Image
          src="https://images.unsplash.com/photo-1593113598332-cd288d649433?w=1200"
          alt="Community Service Banner"
          fill
          priority
          className="object-cover"
        />
      </div>

      <div className="relative max-w-4xl mx-auto space-y-6">
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight uppercase leading-tight text-white dark:text-gray-100">
          Building a Stronger Community, Together
        </h1>
        <p className="text-base sm:text-lg text-emerald-100 dark:text-emerald-200/90 max-w-2xl mx-auto font-light">
          Discover, Join, and Create Impactful Local Service Events in Your Area
        </p>
        <div className="pt-4">
          <Link
            href="/events"
            className="bg-[#f07b42] hover:bg-[#e06a35] dark:bg-[#e06a35] dark:hover:bg-[#c95926] text-white px-8 py-3.5 rounded-full font-bold uppercase tracking-wider shadow-lg transition-all inline-block hover:scale-105"
          >
            Explore Upcoming Events
          </Link>
        </div>
      </div>
    </section>
  );
}
