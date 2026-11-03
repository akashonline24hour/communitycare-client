"use client";

import Image from "next/image";

export default function ImpactGallerySection() {
  const images = [
    "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=500",
    "https://images.unsplash.com/photo-1532629345422-7515f3d16bb9?w=500",
    "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=500",
    "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=500",
  ];

  return (
    <section className="py-20 px-6 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h2 className="text-3xl font-extrabold tracking-wide uppercase text-gray-900 dark:text-white">
          Impact in Action
        </h2>
        <div className="w-16 h-1 bg-[#f07b42] dark:bg-[#e06a35] mx-auto mt-3 rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
        {images.map((url, idx) => (
          <div
            key={idx}
            className="relative h-44 w-full rounded-xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-800 hover:scale-[1.02] transition-all duration-300"
          >
            <Image
              src={url}
              alt={`Impact Image ${idx + 1}`}
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
