"use client";

import { useEffect } from "react";
import Link from "next/link";
import { toast } from "react-toastify";

export default function GlobalError({ error, reset }) {
  useEffect(() => {
    console.error("Unhandled runtime error:", error);
    toast.error("Something went wrong!");
  }, [error]);

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-16 bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      <div className="max-w-md w-full bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl shadow-xl p-8 sm:p-12 text-center space-y-6">
        {/* Error Warning Badge */}
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-50 dark:bg-red-950/50 border border-red-100 dark:border-red-800/50 text-red-600 dark:text-red-400 font-extrabold text-3xl shadow-inner">
          ⚠️
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-wide text-gray-900 dark:text-white">
            Something Went Wrong
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
            An unexpected error occurred while loading this section. Please try
            again.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => reset()}
            className="bg-[#f07b42] hover:bg-[#e06a35] dark:bg-[#e06a35] dark:hover:bg-[#c95926] text-white px-6 py-3 rounded-full font-bold uppercase text-xs tracking-wider shadow transition-colors"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="bg-[#0b3c3d] hover:bg-[#072425] text-white px-6 py-3 rounded-full font-bold uppercase text-xs tracking-wider shadow transition-colors"
          >
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}
