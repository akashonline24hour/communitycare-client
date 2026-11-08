"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Camera,
  ChevronLeft,
  ChevronRight,
  Expand,
  X,
  ArrowRight,
} from "lucide-react";

// To add a photo, add one more object here. Categories and filters update by themselves.
// Use https:// image links only.
const PHOTOS = [
  {
    id: 1,
    title: "Community Clean Drive",
    category: "Cleanup",
    url: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=600",
  },
  {
    id: 2,
    title: "Tech & Networking Meetup",
    category: "Community",
    url: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=600",
  },
  {
    id: 3,
    title: "Youth Leadership Workshop",
    category: "Education",
    url: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600",
  },
  {
    id: 4,
    title: "Charity Food Marathon",
    category: "Food Drive",
    url: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600",
  },
];

// Larger version of the same photo for the full-screen viewer
const largeUrl = (url) => url.replace("w=600", "w=1600");

export default function GalleryPage() {
  const [category, setCategory] = useState("All");
  const [activeIndex, setActiveIndex] = useState(null);

  const categories = useMemo(
    () => ["All", ...new Set(PHOTOS.map((photo) => photo.category))],
    [],
  );

  const visible = useMemo(
    () =>
      category === "All"
        ? PHOTOS
        : PHOTOS.filter((photo) => photo.category === category),
    [category],
  );

  const close = useCallback(() => setActiveIndex(null), []);
  const showNext = useCallback(
    () => setActiveIndex((i) => (i === null ? i : (i + 1) % visible.length)),
    [visible.length],
  );
  const showPrev = useCallback(
    () =>
      setActiveIndex((i) =>
        i === null ? i : (i - 1 + visible.length) % visible.length,
      ),
    [visible.length],
  );

  const selectCategory = (next) => {
    setCategory(next);
    setActiveIndex(null);
  };

  // Keyboard controls and page scroll lock while the viewer is open
  useEffect(() => {
    if (activeIndex === null) return;

    const onKey = (e) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") showNext();
      if (e.key === "ArrowLeft") showPrev();
    };

    window.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [activeIndex, close, showNext, showPrev]);

  const active = activeIndex !== null ? visible[activeIndex] : null;

  return (
    <div className="min-h-screen bg-gray-50/60 dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0b3c3d] via-[#0f5557] to-[#072425] text-white">
        <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-[#f07b42]/25 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-emerald-400/20 blur-3xl" />

        <div className="relative max-w-3xl mx-auto px-4 py-20 text-center space-y-5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur text-xs font-semibold uppercase tracking-wider">
            <Camera size={14} className="text-[#f07b42]" /> {PHOTOS.length}{" "}
            Moments Captured
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold uppercase tracking-wider">
            Community Gallery
          </h1>
          <p className="text-emerald-50/80 text-sm sm:text-base leading-relaxed">
            Highlights and memorable moments from our past community events and
            gatherings.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        {/* Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {categories.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => selectCategory(item)}
              aria-pressed={category === item}
              className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider border transition-colors ${
                category === item
                  ? "bg-[#0b3c3d] dark:bg-emerald-600 text-white border-transparent shadow"
                  : "bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-800 hover:border-[#0b3c3d] dark:hover:border-emerald-500"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        {/* Photo grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {visible.map((photo, index) => (
            <button
              key={photo.id}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`View ${photo.title}`}
              className="group relative aspect-[4/5] overflow-hidden rounded-3xl bg-gray-200 dark:bg-gray-800 shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 text-left focus:outline-none focus-visible:ring-4 focus-visible:ring-[#f07b42]/60"
            >
              <Image
                src={photo.url}
                alt={photo.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />

              <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/50 backdrop-blur-md text-white text-[10px] font-semibold tracking-wide border border-white/20 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                {photo.category}
              </span>

              <span className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/90 text-[#0b3c3d] flex items-center justify-center opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 transition-all">
                <Expand size={16} />
              </span>

              <div className="absolute bottom-0 inset-x-0 p-5">
                <h3 className="text-base font-bold text-white leading-snug">
                  {photo.title}
                </h3>
              </div>
            </button>
          ))}
        </div>

        {/* Call to action */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0b3c3d] to-[#072425] text-white p-8 sm:p-12 text-center shadow-lg">
          <div className="pointer-events-none absolute -top-16 -right-16 h-48 w-48 rounded-full bg-[#f07b42]/25 blur-3xl" />
          <div className="relative space-y-4 max-w-xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-wider">
              Be Part of the Next Story
            </h2>
            <p className="text-sm text-emerald-50/80 leading-relaxed">
              Join an upcoming event or organize your own, and your moments
              could be on this wall next.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <Link
                href="/events"
                className="inline-flex items-center justify-center gap-2 bg-[#f07b42] hover:bg-[#e06a35] text-white px-7 py-3.5 rounded-2xl font-bold uppercase text-xs tracking-wider shadow-md transition-colors"
              >
                Explore Events <ArrowRight size={15} />
              </Link>
              <Link
                href="/events/create"
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/25 text-white px-7 py-3.5 rounded-2xl font-bold uppercase text-xs tracking-wider transition-colors"
              >
                Create an Event
              </Link>
            </div>
          </div>
        </section>
      </div>

      {/* Full-screen viewer */}
      {active && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
          role="dialog"
          aria-modal="true"
          aria-label={active.title}
          onClick={close}
        >
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              close();
            }}
            aria-label="Close viewer"
            className="absolute top-5 right-5 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
          >
            <X size={22} />
          </button>

          {visible.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  showPrev();
                }}
                aria-label="Previous photo"
                className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-[#f07b42] text-white flex items-center justify-center transition-colors"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  showNext();
                }}
                aria-label="Next photo"
                className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-[#f07b42] text-white flex items-center justify-center transition-colors"
              >
                <ChevronRight size={24} />
              </button>
            </>
          )}

          <figure
            className="relative w-full max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-[65vh] rounded-2xl overflow-hidden bg-black">
              <Image
                key={active.id}
                src={largeUrl(active.url)}
                alt={active.title}
                fill
                sizes="(max-width: 1024px) 100vw, 896px"
                className="object-contain"
                priority
              />
            </div>
            <figcaption className="mt-4 text-center text-white space-y-1">
              <p className="text-lg font-bold">{active.title}</p>
              <p className="text-xs uppercase tracking-wider text-emerald-200">
                {active.category} · {activeIndex + 1} / {visible.length}
              </p>
            </figcaption>
          </figure>
        </div>
      )}
    </div>
  );
}
