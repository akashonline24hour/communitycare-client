"use client";

import { toast } from "react-toastify";

export default function NewsletterSection() {
  return (
    <section className="py-20 px-6 bg-linear-to-r from-[#d97746] to-[#7c3aed] dark:from-[#b85b2b] dark:to-[#5b21b6] text-white text-center transition-colors duration-300">
      <div className="max-w-xl mx-auto space-y-4">
        <h2 className="text-3xl font-extrabold uppercase tracking-wide text-white dark:text-gray-100">
          Stay Connected
        </h2>
        <p className="text-purple-100 dark:text-purple-200 text-sm">
          Subscribe to Our Newsletter
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center mt-6">
          <input
            type="email"
            placeholder="Email"
            className="px-6 py-3.5 rounded-full text-gray-900 dark:text-white bg-white/90 dark:bg-gray-900/90 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none w-full sm:w-80 shadow-inner border border-transparent dark:border-gray-700"
            disabled
          />
          <button
            onClick={() => toast.info("Newsletter subscription is static!")}
            className="bg-[#0b3c3d] hover:bg-[#072a2b] dark:bg-[#072425] dark:hover:bg-[#041617] text-white px-8 py-3.5 rounded-full font-bold uppercase text-xs tracking-wider shadow-md transition-colors duration-200"
          >
            Subscribe
          </button>
        </div>
      </div>
    </section>
  );
}
