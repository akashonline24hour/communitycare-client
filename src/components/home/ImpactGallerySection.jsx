"use client";

import { useState } from "react";
import Image from "next/image";
import { Maximize2, X, Sparkles } from "lucide-react";

export default function ImpactGallerySection() {
  const [selectedImage, setSelectedImage] = useState(null);

  // Static items array
  const galleryItems = [
    {
      url: "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=800",
      title: "Community Clean Drive",
      tag: "Environmental",
    },
    {
      url: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800",
      title: "Charity Food Marathon",
      tag: "Relief Work",
    },
    {
      url: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800",
      title: "Youth Tech Workshop",
      tag: "Education",
    },
    {
      url: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800",
      title: "Healthcare Awareness",
      tag: "Wellness",
    },
  ];

  return (
    <section className="py-24 px-4 sm:px-6 bg-white dark:bg-gray-950 border-t border-gray-100 dark:border-gray-800 transition-colors duration-300 overflow-hidden">
      {/* Header */}
      <div className="max-w-7xl mx-auto text-center mb-16 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 dark:bg-orange-950/60 text-[#f07b42] dark:text-[#e06a35] text-xs font-semibold uppercase tracking-wider">
          <Sparkles size={14} /> Our Community Footprint
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-wide uppercase text-gray-900 dark:text-white">
          Impact in Action
        </h2>
        <div className="w-16 h-1 bg-[#f07b42] dark:bg-[#e06a35] mx-auto rounded-full" />
      </div>

      {/* Gallery Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {galleryItems.map((item, idx) => (
          <div
            key={idx}
            onClick={() => setSelectedImage(item)}
            className="group relative h-64 sm:h-72 w-full rounded-2xl overflow-hidden cursor-pointer shadow-md border border-gray-100 dark:border-gray-800 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1.5"
          >
            <Image
              src={item.url}
              alt={item.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />

            <div className="absolute top-4 left-4">
              <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider border border-white/20">
                {item.tag}
              </span>
            </div>

            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="p-2 rounded-full bg-black/40 text-white backdrop-blur-md hover:bg-black/60">
                <Maximize2 size={16} />
              </div>
            </div>

            <div className="absolute bottom-4 left-4 right-4 space-y-1 transform translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
              <h3 className="text-white font-bold text-base sm:text-lg leading-snug">
                {item.title}
              </h3>
              <p className="text-gray-300 text-xs flex items-center gap-1 font-medium">
                Click to view photo
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-fadeIn"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative max-w-4xl w-full max-h-[85vh] h-full rounded-2xl overflow-hidden shadow-2xl border border-gray-800 bg-black"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-full min-h-[50vh]">
              <Image
                src={selectedImage.url}
                alt={selectedImage.title}
                fill
                sizes="(max-width: 1024px) 100vw, 1200px"
                className="object-contain"
              />
            </div>

            <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-10">
              <span className="px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md text-white text-xs font-semibold">
                {selectedImage.tag}
              </span>
              <button
                onClick={() => setSelectedImage(null)}
                className="p-2 rounded-full bg-black/60 text-white hover:bg-black/90 backdrop-blur-md transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="absolute bottom-0 inset-x-0 p-6 bg-gradient-to-t from-black via-black/70 to-transparent text-white space-y-1 z-10">
              <h3 className="text-xl font-bold">{selectedImage.title}</h3>
              <p className="text-xs text-gray-300">
                Hermione Community Events — Impact Highlights
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
