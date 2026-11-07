"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { apiFetch } from "@/lib/api";
import { toast } from "react-toastify";
import {
  FileText,
  MapPin,
  Calendar,
  ImageIcon,
  Mail,
  Sparkles,
  ArrowLeft,
  PlusCircle,
  Tag,
} from "lucide-react";
import Link from "next/link";

// Must match the server's allowed event types
const eventTypes = [
  "Donation",
  "Cleanup",
  "Plantation",
  "Winter Relief",
  "Food Drive",
  "Health Camp",
  "Education",
];

const formatDate = (d) => {
  const pad = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
};
const todayString = () => formatDate(new Date());
const maxDateString = () => {
  const d = new Date();
  d.setFullYear(d.getFullYear() + 5);
  return formatDate(d);
};

// Returns the first error message, or null when everything is valid
function validateForm({
  title,
  eventType,
  location,
  eventDate,
  thumbnail,
  description,
}) {
  const t = title.trim();
  const l = location.trim();
  const d = description.trim();

  if (t.length < 3 || t.length > 100)
    return "Title must be between 3 and 100 characters";
  if (!eventTypes.includes(eventType))
    return "Please select a valid event type";
  if (l.length < 3 || l.length > 150)
    return "Location must be between 3 and 150 characters";
  if (!eventDate) return "Please choose an event date";
  if (eventDate < todayString()) return "Event date must be in the future";
  if (eventDate > maxDateString())
    return "Event date cannot be more than 5 years ahead";

  let url;
  try {
    url = new URL(thumbnail.trim());
  } catch {
    return "Enter a valid thumbnail image URL";
  }
  if (url.protocol !== "https:")
    return "Thumbnail URL must start with https://";

  if (d.length < 10 || d.length > 2000)
    return "Description must be between 10 and 2000 characters";

  return null;
}

export default function CreateEventPage() {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventType, setEventType] = useState(""); // Initialized empty so placeholder displays
  const [thumbnail, setThumbnail] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (isPending) {
    return (
      <div className="min-h-[75vh] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#0b3c3d] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-[75vh] flex flex-col items-center justify-center px-4 text-center">
        <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl shadow-xl p-8 max-w-md w-full space-y-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white uppercase tracking-wider">
            Authentication Required
          </h2>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            You must be logged into your account to organize and publish
            community events.
          </p>
          <Link
            href="/login?redirect=/events/create"
            className="block w-full bg-[#f07b42] hover:bg-[#e06a35] text-white py-3 rounded-full font-bold uppercase text-xs tracking-wider shadow transition-all"
          >
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const message = validateForm({
      title,
      eventType,
      location,
      eventDate,
      thumbnail,
      description,
    });
    if (message) {
      toast.error(message);
      return;
    }

    setSubmitting(true);

    try {
      // The organizer's email, name and photo come from the token on the server
      await apiFetch("/events", {
        method: "POST",
        auth: true,
        body: {
          title: title.trim(),
          description: description.trim(),
          location: location.trim(),
          eventDate,
          eventType,
          thumbnail: thumbnail.trim(),
        },
      });

      toast.success("Community Event created successfully!");

      // Reset form states
      setTitle("");
      setDescription("");
      setLocation("");
      setEventDate("");
      setEventType("");
      setThumbnail("");

      // Redirect to events feed
      router.push("/events");
    } catch (err) {
      console.error(err);
      if (err.status === 401) {
        toast.error("Your session expired. Please log in again.");
        router.replace("/login?redirect=/events/create");
      } else {
        toast.error(err.message || "Error creating event. Please try again.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <div className="mb-6">
        <Link
          href="/events"
          className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-700 dark:text-emerald-400 hover:underline uppercase tracking-wider"
        >
          <ArrowLeft size={16} /> Back to Events
        </Link>
      </div>

      <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl shadow-xl p-8 sm:p-10 space-y-6 transition-colors">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-[#0b3c3d] dark:text-emerald-300 text-xs font-semibold uppercase tracking-wider">
            <Sparkles size={14} className="text-[#f07b42]" /> Organizer Studio
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-wider text-gray-900 dark:text-white">
            Create Community Event
          </h1>
          <p className="text-xs text-gray-500 dark:text-gray-400 max-w-md mx-auto">
            Organize an event to bring people together and serve your community.
          </p>
        </div>

        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          {/* Title */}
          <div>
            <label className="block text-xs font-semibold uppercase text-gray-700 dark:text-gray-300 mb-1">
              Event Title
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                <FileText size={18} />
              </span>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Winter Clothes Distribution - Mirpur 10"
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0b3c3d] text-sm"
              />
            </div>
          </div>

          {/* Event Type & Location Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Event Type Selection */}
            <div>
              <label className="block text-xs font-semibold uppercase text-gray-700 dark:text-gray-300 mb-1">
                Event Type *
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <Tag size={18} />
                </span>
                <select
                  required
                  value={eventType}
                  onChange={(e) => setEventType(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0b3c3d] text-sm appearance-none cursor-pointer"
                >
                  <option value="" disabled>
                    Select Event
                  </option>
                  {eventTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Location */}
            <div>
              <label className="block text-xs font-semibold uppercase text-gray-700 dark:text-gray-300 mb-1">
                Location
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <MapPin size={18} />
                </span>
                <input
                  type="text"
                  required
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Mirpur, Dhaka"
                  className="w-full pl-11 pr-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0b3c3d] text-sm"
                />
              </div>
            </div>
          </div>

          {/* Event Date */}
          <div>
            <label className="block text-xs font-semibold uppercase text-gray-700 dark:text-gray-300 mb-1">
              Event Date (Future Date Required)
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                <Calendar size={18} />
              </span>
              <input
                type="date"
                required
                min={todayString()}
                max={maxDateString()}
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0b3c3d] text-sm cursor-pointer"
              />
            </div>
          </div>

          {/* Thumbnail Image URL */}
          <div>
            <label className="block text-xs font-semibold uppercase text-gray-700 dark:text-gray-300 mb-1">
              Thumbnail Banner Image URL
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                <ImageIcon size={18} />
              </span>
              <input
                type="url"
                required
                value={thumbnail}
                onChange={(e) => setThumbnail(e.target.value)}
                placeholder="https://images.unsplash.com/..."
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0b3c3d] text-sm"
              />
            </div>
          </div>

          {/* Organizer Email */}
          <div>
            <label className="block text-xs font-semibold uppercase text-gray-700 dark:text-gray-300 mb-1">
              Organizer Email
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                <Mail size={18} />
              </span>
              <input
                type="email"
                disabled
                value={session.user.email}
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 text-sm cursor-not-allowed"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold uppercase text-gray-700 dark:text-gray-300 mb-1">
              Event Description
            </label>
            <textarea
              required
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the goals and details of this event..."
              className="w-full p-4 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0b3c3d] text-sm resize-none"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-[#f07b42] hover:bg-[#e06a35] dark:bg-[#e06a35] dark:hover:bg-[#c95926] text-white py-3.5 rounded-full font-bold uppercase text-xs tracking-wider shadow-lg hover:shadow-orange-500/20 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 mt-2"
          >
            {submitting ? (
              "Publishing Event..."
            ) : (
              <>
                <PlusCircle size={16} /> Publish Event
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
