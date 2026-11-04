"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";
import {
  Calendar,
  MapPin,
  Mail,
  User,
  ArrowLeft,
  CheckCircle2,
  Users,
  Sparkles,
  Share2,
  ShieldCheck,
  Check,
} from "lucide-react";

export default function EventDetailsPage({ params }) {
  const resolvedParams = use(params);
  const eventId = resolvedParams.id;

  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [isJoined, setIsJoined] = useState(false);

  const API_URL =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const res = await fetch(`${API_URL}/events/${eventId}`);
        if (!res.ok) throw new Error("Failed to fetch event details");
        const data = await res.json();
        setEvent(data);

        // Check if current user is among attendees
        if (
          session?.user?.email &&
          data.attendees?.includes(session.user.email)
        ) {
          setIsJoined(true);
        }
      } catch (err) {
        console.error(err);
        toast.error("Could not load event details.");
      } finally {
        setLoading(false);
      }
    };

    if (eventId) {
      fetchEventDetails();
    }
  }, [eventId, session, API_URL]);

  const handleToggleJoin = async () => {
    if (!session) {
      toast.error("Please log in to join this initiative!");
      router.push("/login");
      return;
    }

    setActionLoading(true);

    try {
      const endpoint = isJoined
        ? `${API_URL}/events/leave`
        : `${API_URL}/events/join`;
      const payload = isJoined
        ? { eventId, userEmail: session.user.email }
        : {
            eventId,
            userEmail: session.user.email,
            userName: session.user.name,
          };

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to update participation");

      if (isJoined) {
        setIsJoined(false);
        setEvent((prev) => ({
          ...prev,
          attendees:
            prev.attendees?.filter((email) => email !== session.user.email) ||
            [],
        }));
        toast.success("Successfully left the initiative.");
      } else {
        setIsJoined(true);
        setEvent((prev) => ({
          ...prev,
          attendees: [...(prev.attendees || []), session.user.email],
        }));
        toast.success("Successfully joined the initiative! 🎉");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error updating participation status. Please try again.");
    } finally {
      setActionLoading(false);
    }
  };

  if (loading || isPending) {
    return (
      <div className="min-h-[75vh] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#0b3c3d] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-[75vh] flex flex-col items-center justify-center text-center px-4 space-y-4">
        <div className="w-16 h-16 rounded-full bg-orange-100 dark:bg-orange-950/60 text-[#f07b42] flex items-center justify-center mx-auto shadow-sm">
          <Calendar size={30} />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white uppercase tracking-wider">
          Event Not Found
        </h2>
        <p className="text-xs text-gray-500 dark:text-gray-400 max-w-sm">
          The event you are looking for does not exist or has been removed.
        </p>
        <Link
          href="/events"
          className="bg-[#0b3c3d] hover:bg-[#072a2b] dark:bg-emerald-600 dark:hover:bg-emerald-700 text-white px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider shadow transition-colors"
        >
          Back to Events
        </Link>
      </div>
    );
  }

  const rawDate = event.date || event.eventDate;
  const formattedDate = new Date(rawDate).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const eventType = event.eventType || event.category || "Donation";
  const attendeesCount = event.attendees?.length || 0;

  return (
    <div className="min-h-screen bg-gray-50/60 dark:bg-gray-950 py-10 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Top Back Navigation */}
        <div className="mb-2">
          <Link
            href="/events"
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#0b3c3d] dark:text-emerald-400 hover:underline uppercase tracking-wider"
          >
            <ArrowLeft size={16} /> Back to Events
          </Link>
        </div>

        {/* Hero Banner Container */}
        <div className="relative h-80 sm:h-[400px] w-full rounded-3xl overflow-hidden shadow-xl bg-gray-900">
          <Image
            src={
              event.image ||
              event.thumbnail ||
              "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1200"
            }
            alt={event.title}
            fill
            priority
            className="object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

          {/* Category Badge */}
          <div className="absolute top-6 left-6">
            <span className="px-4 py-1.5 rounded-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-md text-[#0b3c3d] dark:text-emerald-400 text-xs font-bold uppercase tracking-wider shadow flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              {eventType}
            </span>
          </div>

          {/* Title & Metadata Overlay */}
          <div className="absolute bottom-8 left-6 right-6 space-y-3">
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-wide leading-tight">
              {event.title}
            </h1>
            <div className="flex flex-wrap items-center gap-6 text-xs sm:text-sm font-medium text-gray-200">
              <div className="flex items-center gap-1.5">
                <MapPin size={16} className="text-[#f07b42]" />
                <span>{event.location}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar size={16} className="text-[#f07b42]" />
                <span>{formattedDate}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Status Bar (Participants & Join/Leave CTA) */}
        <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl p-5 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 text-[#0b3c3d] dark:text-emerald-400 flex items-center justify-center shrink-0">
              <Users size={20} />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-900 dark:text-white">
                {attendeesCount}{" "}
                {attendeesCount === 1 ? "Volunteer" : "Volunteers"} Joined
              </p>
              <p className="text-[11px] text-gray-500 dark:text-gray-400">
                {isJoined
                  ? "You are confirmed for this initiative"
                  : "Join this community effort today!"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <button
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                toast.success("Event link copied to clipboard!");
              }}
              title="Share event"
              className="p-3 rounded-2xl bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              <Share2 size={18} />
            </button>

            {isJoined ? (
              <button
                onClick={handleToggleJoin}
                disabled={actionLoading}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-2xl font-bold text-xs uppercase tracking-wider shadow-md transition-all disabled:opacity-50"
              >
                <CheckCircle2 size={16} /> Joined (Click to Leave)
              </button>
            ) : (
              <button
                onClick={handleToggleJoin}
                disabled={actionLoading}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#f07b42] hover:bg-[#e06a35] text-white px-6 py-3 rounded-2xl font-bold text-xs uppercase tracking-wider shadow-md transition-all disabled:opacity-50"
              >
                {actionLoading ? "Processing..." : "Join Initiative"}
              </button>
            )}
          </div>
        </div>

        {/* Main Content Grid: Description & Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: About & Guidelines */}
          <div className="lg:col-span-2 space-y-6">
            {/* About Card */}
            <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900 dark:text-white flex items-center gap-2">
                <Sparkles size={16} className="text-[#f07b42]" /> About this
                Social Initiative
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                {event.description}
              </p>
            </div>

            {/* Volunteer Guidelines */}
            <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400">
                Volunteer Guidelines
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                <li className="flex items-start gap-2.5">
                  <span className="p-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-[#0b3c3d] dark:text-emerald-400 mt-0.5 shrink-0">
                    <Check size={12} />
                  </span>
                  <span>
                    Please arrive 15 minutes before the scheduled time at the
                    designated location.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="p-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-[#0b3c3d] dark:text-emerald-400 mt-0.5 shrink-0">
                    <Check size={12} />
                  </span>
                  <span>
                    Wear comfortable clothing suitable for physical social work
                    and distribution.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="p-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-[#0b3c3d] dark:text-emerald-400 mt-0.5 shrink-0">
                    <Check size={12} />
                  </span>
                  <span>
                    Bring any pre-coordinated relief packages or distributor
                    items if requested.
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column: Organizer & Confirmed Volunteers */}
          <div className="space-y-6">
            {/* Initiative Organizer Card */}
            <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl p-6 shadow-sm space-y-4">
              <h4 className="text-[11px] font-bold uppercase tracking-widest text-gray-400">
                Initiative Organizer
              </h4>
              <div className="flex items-center gap-3">
                {event.organizerImage ? (
                  <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0 shadow-inner">
                    <Image
                      src={event.organizerImage}
                      alt={event.organizerName || "Organizer"}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-12 h-12 rounded-full bg-[#0b3c3d] text-white flex items-center justify-center font-bold text-base uppercase shrink-0 shadow-inner">
                    {event.organizerName ? event.organizerName[0] : "O"}
                  </div>
                )}
                <div className="overflow-hidden">
                  <p className="text-xs sm:text-sm font-bold text-gray-900 dark:text-white truncate">
                    {event.organizerName || "Community Organizer"}
                  </p>
                  <p className="text-[11px] text-gray-500 dark:text-gray-400 truncate">
                    {event.organizerEmail || "organizer@goodgather.org"}
                  </p>
                </div>
              </div>
              <div className="pt-2 border-t border-gray-100 dark:border-gray-800 flex items-center gap-1.5 text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
                <ShieldCheck size={14} /> Verified Platform Member
              </div>
            </div>

            {/* Confirmed Volunteers List */}
            <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl p-6 shadow-sm space-y-4">
              <h4 className="text-[11px] font-bold uppercase tracking-widest text-gray-400">
                Confirmed Volunteers ({attendeesCount})
              </h4>

              {attendeesCount === 0 ? (
                <p className="text-xs text-gray-400 italic">
                  No volunteers joined yet. Be the first!
                </p>
              ) : (
                <div className="space-y-2.5 max-h-48 overflow-y-auto pr-1">
                  {event.attendees.map((email, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2.5 text-xs text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/50 p-2.5 rounded-2xl"
                    >
                      <div className="w-7 h-7 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px] font-bold uppercase shrink-0">
                        {email[0]}
                      </div>
                      <span className="truncate">{email}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
