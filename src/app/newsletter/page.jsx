"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import { Mail } from "lucide-react";

export default function NewsletterPage() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;

    setSubscribed(true);
    toast.success("Thank you for subscribing to our newsletter!");
    setEmail("");
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      <div className="max-w-lg w-full bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl shadow-xl p-8 sm:p-12 text-center space-y-6">
        <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-950/60 text-[#0b3c3d] dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto shadow-inner">
          <Mail size={32} />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-bold uppercase tracking-wider text-gray-900 dark:text-white">
            Stay Connected
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Subscribe to our official newsletter to get regular updates on
            upcoming Hermione Community Events.
          </p>
        </div>

        {subscribed ? (
          <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl text-emerald-800 dark:text-emerald-300 text-sm font-medium">
            🎉 You are subscribed! We will notify you when new events launch.
          </div>
        ) : (
          <form onSubmit={handleSubscribe} className="space-y-4">
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                <Mail size={18} />
              </span>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full pl-10 pr-4 py-3.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0b3c3d] text-sm"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#f07b42] hover:bg-[#e06a35] dark:bg-[#e06a35] dark:hover:bg-[#c95926] text-white py-3.5 rounded-full font-bold uppercase text-xs tracking-wider shadow transition-all duration-200"
            >
              Subscribe Now
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
