"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { apiFetch } from "@/lib/api";
import { toast } from "react-toastify";
import {
  Calendar,
  MapPin,
  ArrowLeft,
  CheckCircle2,
  Users,
  Sparkles,
  Share2,
  ShieldCheck,
  Check,
  AlertCircle,
} from "lucide-react";

const HERO_FALLBACK =
  "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1200";

const pad = (n) => String(n).padStart(2, "0");
const todayString = () => {
  const d = new Date();
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
};

// next/image only allows https images, so anything else falls back to a safe image
const safeImage = (url, fallback) =>
  typeof url === "string" && url.startsWith("https://") ? url : fallback;

// Shows "ak***@gmail.com" so public visitors never see full emails
const maskEmail = (value = "") => {
  const [name, domain] = String(value).split("@");
  if (!domain) return value;
  return `${name.slice(0, 2)}***@${domain}`;
};

export default function EventDetailsClient({ eventId }) {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [reloadKey, setReloadKey] = useState(0);
  const [actionLoading, setActionLoading] = useState(false);

  const email = session?.user?.email;

  // Load the event (public, so no token is needed)
  useEffect(() => {
    if (!eventId) return;

    let cancelled = false;

    apiFetch(`/events/${eventId}`)
      .then((data) => {
        if (cancelled) return;
        setEvent(data);
        setLoadError("");
      })
      .catch((err) => {
        if (cancelled) return;
        console.error(err);
        setEvent(null);
        setLoadError(
          err.status === 404 || err.status === 400
            ? "not-found"
            : err.message || "Could not load this event.",
        );
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [eventId, reloadKey]);

  // Show the event's name in the browser tab once it has loaded
  useEffect(() => {
    if (event?.title) {
      document.title = `${event.title} | Hermione Community Events`;
    }
  }, [event?.title]);

  const handleRetry = () => {
    setLoadError("");
    setLoading(true);
    setReloadKey((k) => k + 1);
  };

  const attendees = event?.attendees || [];
  const isJoined = !!email && attendees.includes(email);

  const handleToggleJoin = async () => {
    // The page is public, but joining needs a login
    if (!session) {
      toast.info("Please log in to join this initiative!");
      router.push(`/login?redirect=/events/${eventId}`);
      return;
    }

    setActionLoading(true);

    try {
      // The user comes from the token on the server, so only the event ID is sent
      if (isJoined) {
        await apiFetch("/events/leave", {
          method: "POST",
          auth: true,
          body: { eventId },
        });
        setEvent((prev) => ({
          ...prev,
          attendees: (prev.attendees || []).filter((e) => e !== email),
        }));
        toast.success("You have left this initiative.");
      } else {
        await apiFetch("/events/join", {
          method: "POST",
          auth: true,
          body: { eventId },
        });
        setEvent((prev) => ({
          ...prev,
          attendees: [...(prev.attendees || []), email],
        }));
        toast.success("You have joined this initiative!");
      }
    } catch (err) {
      console.error(err);
      if (err.status === 401) {
        toast.error("Your session expired. Please log in again.");
        router.push(`/login?redirect=/events/${eventId}`);
      } else {
        // If the screen was out of date, sync it with the server's answer
        if (err.message === "You have already joined this event") {
          setEvent((prev) => ({
            ...prev,
            attendees: [...new Set([...(prev.attendees || []), email])],
          }));
        }
        toast.error(err.message || "Could not update your participation.");
      }
    } finally {
      setActionLoading(false);
    }
  };

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success("Event link copied to clipboard!");
    } catch {
      toast.error(
        "Could not copy the link. Please copy it from the address bar.",
      );
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50/60 dark:bg-gray-950 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-6 animate-pulse">
          <div className="h-4 w-32 rounded bg-gray-200 dark:bg-gray-800" />
          <div className="h-80 sm:h-[400px] w-full rounded-3xl bg-gray-200 dark:bg-gray-800" />
          <div className="h-20 w-full rounded-3xl bg-gray-200 dark:bg-gray-800" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 h-56 rounded-3xl bg-gray-200 dark:bg-gray-800" />
            <div className="h-56 rounded-3xl bg-gray-200 dark:bg-gray-800" />
          </div>
        </div>
      </div>
    );
  }

  if (loadError === "not-found") {
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

  if (loadError || !event) {
    return (
      <div className="min-h-[75vh] flex flex-col items-center justify-center text-center px-4 space-y-4">
        <div className="w-16 h-16 rounded-full bg-red-100 dark:bg-red-950/60 text-red-500 flex items-center justify-center mx-auto shadow-sm">
          <AlertCircle size={30} />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white uppercase tracking-wider">
          Could Not Load Event
        </h2>
        <p className="text-xs text-gray-500 dark:text-gray-400 max-w-sm">
          {loadError || "Something went wrong while loading this event."}
        </p>
        <button
          onClick={handleRetry}
          className="bg-[#0b3c3d] hover:bg-[#072a2b] dark:bg-emerald-600 dark:hover:bg-emerald-700 text-white px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider shadow transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  const rawDate = event.eventDate || event.date;
  const parsedDate = rawDate ? new Date(rawDate) : null;
  const formattedDate =
    parsedDate && !Number.isNaN(parsedDate.getTime())
      ? parsedDate.toLocaleDateString("en-US", {
          weekday: "short",
          month: "short",
          day: "numeric",
          year: "numeric",
          timeZone: "UTC",
        })
      : "Date to be announced";

  const hasEnded = !!rawDate && String(rawDate).slice(0, 10) < todayString();
  const eventType = event.eventType || event.category || "Community Event";
  const attendeesCount = attendees.length;
  const isOrganizer = !!email && event.organizerEmail === email;
  const organizerPhoto = safeImage(event.organizerImage, "");

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
            src={safeImage(event.thumbnail || event.image, HERO_FALLBACK)}
            alt={event.title || "Event image"}
            fill
            priority
            sizes="(max-width: 1200px) 100vw, 1200px"
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
                {hasEnded
                  ? "This initiative has already taken place"
                  : isJoined
                    ? "You are confirmed for this initiative"
                    : "Join this community effort today!"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <button
              onClick={handleShare}
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
                <CheckCircle2 size={16} />
                {actionLoading ? "Processing..." : "Joined (Click to Leave)"}
              </button>
            ) : (
              <button
                onClick={handleToggleJoin}
                disabled={actionLoading || isPending || hasEnded}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#f07b42] hover:bg-[#e06a35] text-white px-6 py-3 rounded-2xl font-bold text-xs uppercase tracking-wider shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {actionLoading
                  ? "Processing..."
                  : hasEnded
                    ? "Event Ended"
                    : "Join Initiative"}
              </button>
            )}
          </div>
        </div>

        {/* Main Content Grid: Description & Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: About & Guidelines */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900 dark:text-white flex items-center gap-2">
                <Sparkles size={16} className="text-[#f07b42]" /> About this
                Social Initiative
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                {event.description}
              </p>
            </div>

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
            <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl p-6 shadow-sm space-y-4">
              <h4 className="text-[11px] font-bold uppercase tracking-widest text-gray-400">
                Initiative Organizer
              </h4>
              <div className="flex items-center gap-3">
                {organizerPhoto ? (
                  <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0 shadow-inner">
                    <Image
                      src={organizerPhoto}
                      alt={event.organizerName || "Organizer"}
                      fill
                      sizes="48px"
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
                    {isOrganizer
                      ? "You organized this event"
                      : maskEmail(event.organizerEmail)}
                  </p>
                </div>
              </div>
              <div className="pt-2 border-t border-gray-100 dark:border-gray-800 flex items-center gap-1.5 text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
                <ShieldCheck size={14} /> Verified Platform Member
              </div>
              {isOrganizer && (
                <Link
                  href="/events/manage"
                  className="block text-center text-[11px] font-bold uppercase tracking-wider text-[#0b3c3d] dark:text-emerald-400 hover:underline"
                >
                  Manage your events
                </Link>
              )}
            </div>

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
                  {attendees.map((attendee) => (
                    <div
                      key={attendee}
                      className="flex items-center gap-2.5 text-xs text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/50 p-2.5 rounded-2xl"
                    >
                      <div className="w-7 h-7 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px] font-bold uppercase shrink-0">
                        {attendee[0]}
                      </div>
                      <span className="truncate">
                        {attendee === email ? "You" : maskEmail(attendee)}
                      </span>
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
