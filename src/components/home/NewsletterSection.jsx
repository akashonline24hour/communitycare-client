"use client";

import { toast } from "react-toastify";

export default function NewsletterSection() {
  return (
    <section className="py-20 px-6 bg-linear-to-r from-[#d97746] to-[#7c3aed] text-white text-center">
      <div className="max-w-xl mx-auto space-y-4">
        <h2 className="text-3xl font-extrabold uppercase tracking-wide">
          Stay Connected
        </h2>
        <p className="text-purple-100 text-sm">Subscribe to Our Newsletter</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center mt-6">
          <input
            type="email"
            placeholder="Email"
            className="px-6 py-3.5 rounded-full text-gray-900 bg-white/90 focus:outline-none w-full sm:w-80 shadow-inner"
            disabled
          />
          <button
            onClick={() => toast.info("Newsletter subscription is static!")}
            className="bg-[#0b3c3d] hover:bg-[#072a2b] text-white px-8 py-3.5 rounded-full font-bold uppercase text-xs tracking-wider shadow-md transition-colors"
          >
            Subscribe
          </button>
        </div>
      </div>
    </section>
  );
}
