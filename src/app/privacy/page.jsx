"use client";

import { Shield, Lock, Eye, FileText, CheckCircle } from "lucide-react";

export default function PrivacyPage() {
  const sections = [
    {
      icon: <Eye className="w-5 h-5 text-[#f07b42]" />,
      title: "1. Information We Collect",
      content:
        "When you register or log in via email or social OAuth providers (Google and GitHub), we store basic identity information such as your name, email address, and profile picture. We also keep track of events you create or join to present your dashboard analytics accurately.",
    },
    {
      icon: <Lock className="w-5 h-5 text-[#0b3c3d] dark:text-emerald-400" />,
      title: "2. How We Use Your Information",
      content:
        "Your data is used solely to facilitate community event registrations, facilitate organizer-to-participant notifications, and maintain user session security. We never sell or rent your personal data to third-party advertisers.",
    },
    {
      icon: <Shield className="w-5 h-5 text-blue-500" />,
      title: "3. Data Security & Storage",
      content:
        "We utilize industry-standard encryption protocols (TLS/SSL), secure adapter-based authentication via Better-Auth, and protected MongoDB instances to safeguard your personal credentials against unauthorized access.",
    },
    {
      icon: <CheckCircle className="w-5 h-5 text-purple-500" />,
      title: "4. Your Data Rights & Choices",
      content:
        "You retain complete rights over your account data. You may unregister from any event, update your organizer details, or contact our support team at any time to request complete account data deletion.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50/60 dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-300 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-[#0b3c3d] dark:text-emerald-300 text-xs font-semibold uppercase tracking-wider">
            <Shield size={14} className="text-[#f07b42]" /> Legal & Trust
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold uppercase tracking-wider text-gray-900 dark:text-white">
            Privacy Policy
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 max-w-lg mx-auto">
            Last updated: October 2026. Learn how we handle, protect, and
            respect your personal information.
          </p>
        </div>

        {/* Content Section */}
        <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl p-6 sm:p-10 shadow-lg space-y-8">
          <div className="flex items-center gap-3 p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900/50 text-xs sm:text-sm text-gray-700 dark:text-gray-300">
            <FileText
              size={20}
              className="text-[#0b3c3d] dark:text-emerald-400 shrink-0"
            />
            <span>
              By accessing or using <strong>Hermione Community Events</strong>,
              you agree to the collection and use of information in accordance
              with this policy.
            </span>
          </div>

          <div className="space-y-8">
            {sections.map((sec, idx) => (
              <div
                key={idx}
                className="space-y-2 border-b border-gray-100 dark:border-gray-800 pb-6 last:border-0 last:pb-0"
              >
                <div className="flex items-center gap-2 text-base font-bold text-gray-900 dark:text-white">
                  {sec.icon}
                  <h3>{sec.title}</h3>
                </div>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed pl-7">
                  {sec.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
