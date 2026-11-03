"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import { Mail, Send, Sparkles } from "lucide-react";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();

    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid email address!");
      return;
    }

    setSubmitting(true);

    // Simulate subscription feedback
    setTimeout(() => {
      toast.success("Thank you for subscribing to Hermione Community Events!");
      setEmail("");
      setSubmitting(false);
    }, 600);
  };

  return (
    <section className="relative py-20 px-6 bg-gradient-to-r from-[#0b3c3d] via-[#082e2f] to-[#124d4e] dark:from-[#051a1b] dark:via-[#072425] dark:to-[#093031] text-white text-center transition-colors duration-300 overflow-hidden">
      {/* Background Decorative Glow */}
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#f07b42]/20 dark:bg-[#e06a35]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-2xl mx-auto space-y-6 z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 dark:bg-emerald-950/50 backdrop-blur-md text-emerald-300 text-xs font-semibold uppercase tracking-wider border border-white/10">
          <Sparkles size={14} className="text-[#f07b42]" /> Stay In The Loop
        </div>

        <h2 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-wide text-white">
          Subscribe to Our Newsletter
        </h2>

        <p className="text-emerald-100/80 dark:text-gray-300 text-sm sm:text-base max-w-lg mx-auto">
          Get weekly updates on upcoming community events, workshops, and
          exclusive gatherings right in your inbox.
        </p>

        <form
          onSubmit={handleSubscribe}
          className="flex flex-col sm:flex-row gap-3 justify-center items-center max-w-md mx-auto mt-6"
        >
          <div className="relative w-full">
            <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
              <Mail size={18} />
            </span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="w-full pl-11 pr-4 py-3.5 rounded-full text-gray-900 dark:text-white bg-white/95 dark:bg-gray-900/90 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#f07b42] shadow-inner text-sm border border-transparent dark:border-gray-700 transition-all"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#f07b42] hover:bg-[#e06a35] dark:bg-[#e06a35] dark:hover:bg-[#c95926] text-white px-8 py-3.5 rounded-full font-bold uppercase text-xs tracking-wider shadow-lg hover:shadow-orange-500/25 transition-all duration-200 shrink-0 disabled:opacity-50"
          >
            {submitting ? (
              "Subscribing..."
            ) : (
              <>
                Subscribe <Send size={14} />
              </>
            )}
          </button>
        </form>
      </div>
    </section>
  );
}
