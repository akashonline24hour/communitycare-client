"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Sparkles,
  Clock,
  CheckCircle2,
  ChevronDown,
  MessageCircle,
} from "lucide-react";

const CONTACT_CARDS = [
  {
    icon: MapPin,
    title: "Visit Us",
    lines: [
      "Dhaka Community Hub, Level 4",
      "Gulshan Avenue, Dhaka, Bangladesh",
    ],
    tone: "bg-emerald-100 dark:bg-emerald-950/60 text-[#0b3c3d] dark:text-emerald-400",
  },
  {
    icon: Mail,
    title: "Email Us",
    lines: ["support@hermioneevents.org"],
    href: "mailto:support@hermioneevents.org",
    tone: "bg-orange-100 dark:bg-orange-950/60 text-[#f07b42]",
  },
  {
    icon: Phone,
    title: "Call Us",
    lines: ["+880 1700-000000"],
    href: "tel:+8801700000000",
    tone: "bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400",
  },
  {
    icon: Clock,
    title: "Office Hours",
    lines: ["Sunday – Thursday", "9:00 AM – 6:00 PM"],
    tone: "bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400",
  },
];

const TOPICS = [
  "General question",
  "Organize an event",
  "Volunteering",
  "Partnership",
  "Report a problem",
];

const FAQS = [
  {
    q: "How do I create an event?",
    a: "Log in, open your profile menu and choose Create Event. Fill in the details, pick a future date and publish.",
  },
  {
    q: "Can I edit or delete my event?",
    a: "Yes. Open Manage Events from your profile menu. You can only change or remove events that you created.",
  },
  {
    q: "How do I join an event?",
    a: "Open any event from the Upcoming Events page and press Join. You need to be logged in to join.",
  },
  {
    q: "Where can I see the events I joined?",
    a: "Your Joined Events page lists every event you have registered for, sorted by date.",
  },
];

const MAX_MESSAGE = 1000;

const fieldClass =
  "w-full px-4 py-3.5 rounded-2xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 focus:ring-2 focus:ring-[#0b3c3d] focus:border-transparent outline-none transition-all";

function validate({ name, email, subject, message }) {
  if (name.trim().length < 2) return "Please enter your name";
  if (!/^\S+@\S+\.\S+$/.test(email.trim()))
    return "Please enter a valid email address";
  if (subject.trim().length < 3) return "Please add a subject";
  if (message.trim().length < 10)
    return "Your message should be at least 10 characters";
  return null;
}

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  const update = (field) => (e) =>
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();

    const problem = validate(formData);
    if (problem) {
      toast.error(problem);
      return;
    }

    setSubmitting(true);

    // Simulated submission. Replace this with a call to your own backend or an email service.
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast.success("Message sent successfully! We will get back to you soon.");
    setFormData({ name: "", email: "", subject: "", message: "" });
    setSubmitting(false);
    setSent(true);
  };

  return (
    <div className="min-h-screen bg-gray-50/60 dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0b3c3d] via-[#0f5557] to-[#072425] text-white">
        <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-[#f07b42]/25 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-emerald-400/20 blur-3xl" />

        <div className="relative max-w-3xl mx-auto px-4 pt-20 pb-36 text-center space-y-5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur text-xs font-semibold uppercase tracking-wider">
            <Sparkles size={14} className="text-[#f07b42]" /> Get in Touch
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold uppercase tracking-wider">
            Contact Our Team
          </h1>
          <p className="text-emerald-50/80 text-sm sm:text-base leading-relaxed">
            Have questions about organizing an initiative, joining an event, or
            partnering with Hermione Community Events? We would love to hear
            from you.
          </p>
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-200">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60 animate-ping" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
            </span>
            We usually reply within 24 hours
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {/* Contact cards overlapping the hero */}
        <div className="-mt-20 relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {CONTACT_CARDS.map(({ icon: Icon, title, lines, href, tone }) => {
            const content = (
              <>
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center ${tone}`}
                >
                  <Icon size={22} />
                </div>
                <h3 className="mt-4 text-sm font-bold uppercase tracking-wider text-gray-900 dark:text-white">
                  {title}
                </h3>
                <div className="mt-1.5 space-y-0.5">
                  {lines.map((line) => (
                    <p
                      key={line}
                      className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed break-words"
                    >
                      {line}
                    </p>
                  ))}
                </div>
              </>
            );

            const cardClass =
              "block h-full bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl p-6 shadow-lg transition-all duration-300";

            return href ? (
              <a
                key={title}
                href={href}
                className={`${cardClass} hover:-translate-y-1 hover:shadow-2xl`}
              >
                {content}
              </a>
            ) : (
              <div key={title} className={cardClass}>
                {content}
              </div>
            );
          })}
        </div>

        {/* Form and sidebar */}
        <div className="mt-14 grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">
          {/* Form */}
          <div className="lg:col-span-3 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl p-6 sm:p-10 shadow-lg">
            {sent ? (
              <div className="text-center py-10 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 size={34} />
                </div>
                <h2 className="text-2xl font-extrabold uppercase tracking-wider text-gray-900 dark:text-white">
                  Thank You!
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 max-w-sm mx-auto">
                  Your message is on its way to our team. We will reply to the
                  email address you provided.
                </p>
                <button
                  onClick={() => setSent(false)}
                  className="inline-flex items-center gap-2 bg-[#0b3c3d] hover:bg-[#072a2b] dark:bg-emerald-600 dark:hover:bg-emerald-700 text-white px-7 py-3.5 rounded-2xl font-bold uppercase text-xs tracking-wider shadow-md transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-11 h-11 rounded-2xl bg-orange-100 dark:bg-orange-950/60 text-[#f07b42] flex items-center justify-center">
                    <MessageCircle size={20} />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                      Send Us a Message
                    </h2>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Fill in the form and we will get back to you.
                    </p>
                  </div>
                </div>

                <form onSubmit={handleSubmit} noValidate className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label
                        htmlFor="contact-name"
                        className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300"
                      >
                        Your Name
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        autoComplete="name"
                        placeholder="Your full name"
                        value={formData.name}
                        onChange={update("name")}
                        className={fieldClass}
                      />
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="contact-email"
                        className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300"
                      >
                        Email Address
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        autoComplete="email"
                        placeholder="you@example.com"
                        value={formData.email}
                        onChange={update("email")}
                        className={fieldClass}
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label
                      htmlFor="contact-subject"
                      className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300"
                    >
                      Subject
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {TOPICS.map((topic) => {
                        const active = formData.subject === topic;
                        return (
                          <button
                            key={topic}
                            type="button"
                            onClick={() =>
                              setFormData((prev) => ({
                                ...prev,
                                subject: topic,
                              }))
                            }
                            className={`px-3.5 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider border transition-colors ${
                              active
                                ? "bg-[#0b3c3d] dark:bg-emerald-600 text-white border-transparent"
                                : "bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:border-[#0b3c3d] dark:hover:border-emerald-500"
                            }`}
                          >
                            {topic}
                          </button>
                        );
                      })}
                    </div>
                    <input
                      id="contact-subject"
                      type="text"
                      placeholder="How can we help you?"
                      value={formData.subject}
                      onChange={update("subject")}
                      className={fieldClass}
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor="contact-message"
                        className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300"
                      >
                        Message
                      </label>
                      <span
                        className={`text-[11px] ${
                          formData.message.length > MAX_MESSAGE - 50
                            ? "text-[#f07b42]"
                            : "text-gray-400"
                        }`}
                      >
                        {formData.message.length}/{MAX_MESSAGE}
                      </span>
                    </div>
                    <textarea
                      id="contact-message"
                      rows={6}
                      maxLength={MAX_MESSAGE}
                      placeholder="Write your message here..."
                      value={formData.message}
                      onChange={update("message")}
                      className={`${fieldClass} resize-none`}
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
              </>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900 dark:text-white">
                Quick Answers
              </h3>
              <div className="space-y-2">
                {FAQS.map(({ q, a }) => (
                  <details
                    key={q}
                    className="group rounded-2xl bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800"
                  >
                    <summary className="flex items-center justify-between gap-3 cursor-pointer list-none px-4 py-3.5 text-xs font-bold text-gray-800 dark:text-gray-100">
                      {q}
                      <ChevronDown
                        size={16}
                        className="shrink-0 text-[#f07b42] transition-transform duration-200 group-open:rotate-180"
                      />
                    </summary>
                    <p className="px-4 pb-4 text-xs leading-relaxed text-gray-500 dark:text-gray-400">
                      {a}
                    </p>
                  </details>
                ))}
              </div>
            </div>

            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0b3c3d] to-[#072425] text-white p-6 sm:p-8 shadow-lg space-y-4">
              <div className="pointer-events-none absolute -top-10 -right-10 h-36 w-36 rounded-full bg-[#f07b42]/25 blur-2xl" />
              <h3 className="relative text-sm font-bold uppercase tracking-wider">
                Follow Our Journey
              </h3>
              <p className="relative text-xs text-emerald-50/80 leading-relaxed">
                See photos and updates from our latest community initiatives.
              </p>
              <div className="relative flex items-center gap-3">
                <a
                  href="https://x.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow us on X"
                  className="w-11 h-11 rounded-2xl bg-white/10 hover:bg-[#f07b42] border border-white/20 flex items-center justify-center transition-colors"
                >
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
                <a
                  href="https://github.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Find us on GitHub"
                  className="w-11 h-11 rounded-2xl bg-white/10 hover:bg-[#f07b42] border border-white/20 flex items-center justify-center transition-colors"
                >
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
