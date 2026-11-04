"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Sparkles,
  MessageSquare,
  Clock,
} from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    // Simulate form submission (or connect to your backend / email API endpoint)
    setTimeout(() => {
      toast.success("Message sent successfully! We will get back to you soon.");
      setFormData({ name: "", email: "", subject: "", message: "" });
      setSubmitting(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50/60 dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-300 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header Section */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-[#0b3c3d] dark:text-emerald-300 text-xs font-semibold uppercase tracking-wider">
            <Sparkles size={14} className="text-[#f07b42]" /> Get in Touch
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold uppercase tracking-wider text-gray-900 dark:text-white">
            Contact Our Team
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base leading-relaxed">
            Have questions about organizing an initiative, joining an event, or
            partnering with Hermione Community Events? We would love to hear
            from you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
          {/* Contact Info Cards */}
          <div className="space-y-6 lg:col-span-1">
            <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 text-[#0b3c3d] dark:text-emerald-400 shrink-0">
                  <MapPin size={22} />
                </div>
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900 dark:text-white">
                    Our Location
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 leading-relaxed">
                    Dhaka Community Hub, Level 4, Gulshan Avenue, Dhaka,
                    Bangladesh
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 rounded-2xl bg-orange-100 dark:bg-orange-950/60 text-[#f07b42] shrink-0">
                  <Mail size={22} />
                </div>
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900 dark:text-white">
                    Email Us
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    support@hermioneevents.org
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 rounded-2xl bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 shrink-0">
                  <Phone size={22} />
                </div>
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900 dark:text-white">
                    Call Us
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    +880 1700-000000
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 pt-2 border-t border-gray-100 dark:border-gray-800">
                <div className="p-3 rounded-2xl bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 shrink-0">
                  <Clock size={22} />
                </div>
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900 dark:text-white">
                    Office Hours
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Sunday – Thursday: 9:00 AM – 6:00 PM
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl p-6 sm:p-10 shadow-lg lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Akash Chandra Paul"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-4 py-3.5 rounded-2xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-[#0b3c3d] outline-none transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="akashonline24hours@gmail.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full px-4 py-3.5 rounded-2xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-[#0b3c3d] outline-none transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                  Subject
                </label>
                <input
                  type="text"
                  required
                  placeholder="How can we help you?"
                  value={formData.subject}
                  onChange={(e) =>
                    setFormData({ ...formData, subject: e.target.value })
                  }
                  className="w-full px-4 py-3.5 rounded-2xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-[#0b3c3d] outline-none transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                  Message
                </label>
                <textarea
                  rows={5}
                  required
                  placeholder="Write your message here..."
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="w-full px-4 py-3.5 rounded-2xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-[#0b3c3d] outline-none transition-all resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#f07b42] hover:bg-[#e06a35] dark:bg-[#e06a35] dark:hover:bg-[#c95926] text-white px-8 py-4 rounded-2xl font-bold uppercase text-xs tracking-wider shadow-md hover:shadow-orange-500/20 transition-all disabled:opacity-50 cursor-pointer"
              >
                {submitting ? (
                  "Sending Message..."
                ) : (
                  <>
                    Send Message <Send size={15} />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
