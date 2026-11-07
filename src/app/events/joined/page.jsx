"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { apiFetch } from "@/lib/api";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import {
  Calendar,
  MapPin,
  CalendarCheck,
  ArrowRight,
  LogOut,
  Sparkles,
  AlertCircle,
  X,
} from "lucide-react";

export default function JoinedEventsPage() {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();
  const [joinedEvents, setJoinedEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [reloadKey, setReloadKey] = useState(0);

  // Modal state for custom confirmation pop-up
  const [eventToLeave, setEventToLeave] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  const email = session?.user?.email;
  const hasSession = !!session;

  useEffect(() => {
    if (isPending) return;

    if (!hasSession) {
      toast.error("Please log in to view your joined events");
      router.replace("/login?redirect=/events/joined");
      return;
    }

    let cancelled = false;
    setLoading(true);
    setLoadError("");

    apiFetch(`/events/joined/${encodeURIComponent(email)}`, { auth: true })
      .then((data) => {
        if (cancelled) return;

        if (process.env.NODE_ENV !== "production") {
          console.log("[Joined events] response for", email, data);
        }

        const list = Array.isArray(data) ? data : [];
        // Sorted by event date (soonest first)
        const sorted = [...list].sort(
          (a, b) =>
            new Date(a.eventDetails?.eventDate) -
            new Date(b.eventDetails?.eventDate),
        );
        setJoinedEvents(sorted);
      })
      .catch((err) => {
        if (cancelled) return;
        console.error(err);
        if (err.status === 401) {
          toast.error("Your session expired. Please log in again.");
          router.replace("/login?redirect=/events/joined");
          return;
        }
        setLoadError(err.message || "Could not fetch joined events");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [isPending, hasSession, email, router, reloadKey]);

  const handleConfirmLeave = async () => {
    if (!eventToLeave) return;

    setActionLoading(true);

    try {
      // The user comes from the token on the server, so only the event ID is sent
      await apiFetch("/events/leave", {
        method: "POST",
        auth: true,
        body: { eventId: eventToLeave },
      });

      setJoinedEvents((prev) =>
        prev.filter((item) => String(item.eventId) !== String(eventToLeave)),
      );
      toast.success("Registration cancelled successfully");
      setEventToLeave(null);
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Could not cancel registration");
      if (err.status === 401) {
        router.replace("/login?redirect=/events/joined");
      }
    } finally {
      setActionLoading(false);
    }
  };

  if (isPending || loading) {
    return (
      <div className="min-h-[75vh] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#0b3c3d] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/60 dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-300 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Header Section */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-[#0b3c3d] dark:text-emerald-300 text-xs font-semibold uppercase tracking-wider">
            <Sparkles size={14} className="text-[#f07b42]" /> Participant
            Dashboard
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold uppercase tracking-wider text-gray-900 dark:text-white">
            My Joined Events
          </h1>
          <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto text-sm sm:text-base">
            Manage the community initiatives and gatherings you have registered
            to attend.
          </p>
        </div>

        {/* Error State */}
        {loadError ? (
          <div className="bg-white dark:bg-gray-900 border border-red-100 dark:border-red-950 rounded-3xl p-12 text-center space-y-4 max-w-md mx-auto shadow-sm">
            <div className="w-14 h-14 rounded-full bg-red-100 dark:bg-red-950/60 text-red-500 flex items-center justify-center mx-auto">
              <AlertCircle size={28} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              Could Not Load Events
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {loadError}
            </p>
            <button
              onClick={() => setReloadKey((k) => k + 1)}
              className="inline-block bg-[#0b3c3d] hover:bg-[#072a2b] dark:bg-emerald-600 dark:hover:bg-emerald-700 text-white px-6 py-3 rounded-full font-bold uppercase text-xs tracking-wider shadow-md transition-colors"
            >
              Try Again
            </button>
          </div>
        ) : joinedEvents.length === 0 ? (
          /* Empty State */
          <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl p-12 text-center space-y-4 max-w-md mx-auto shadow-sm">
            <div className="w-14 h-14 rounded-full bg-orange-100 dark:bg-orange-950/60 text-[#f07b42] flex items-center justify-center mx-auto">
              <CalendarCheck size={28} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              No Registered Events
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              You haven't registered to participate in any community initiatives
              yet.
            </p>
            <Link
              href="/events"
              className="inline-block bg-[#f07b42] hover:bg-[#e06a35] dark:bg-[#e06a35] dark:hover:bg-[#c95926] text-white px-6 py-3 rounded-full font-bold uppercase text-xs tracking-wider shadow-md transition-colors"
            >
              Explore Upcoming Events
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {joinedEvents.map((item) => {
              const event = item.eventDetails || item;
              const rawDate = event.eventDate || event.date;
              const formattedDate = rawDate
                ? new Date(rawDate).toLocaleDateString("en-US", {
                    weekday: "short",
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                    timeZone: "UTC",
                  })
                : "Upcoming";

              const eventType =
                event.eventType || event.category || "Community Event";
              const targetEventId = String(event._id || item.eventId);

              return (
                <div
                  key={item._id}
                  className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col group hover:-translate-y-1.5 justify-between"
                >
                  <div>
                    {/* Thumbnail & Badge */}
                    <div className="relative h-52 w-full overflow-hidden bg-gray-100 dark:bg-gray-800">
                      <Image
                        src={
                          event.thumbnail ||
                          event.image ||
                          "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800"
                        }
                        alt={event.title || "Event Image"}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="px-3.5 py-1 rounded-full bg-black/50 backdrop-blur-md text-white text-[11px] font-semibold tracking-wide border border-white/20 shadow-sm flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                          {eventType}
                        </span>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-6 space-y-3">
                      <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-gray-500 dark:text-gray-400">
                        <div className="flex items-center gap-1 text-[#f07b42]">
                          <Calendar size={14} />
                          <span>{formattedDate}</span>
                        </div>
                        <div className="flex items-center gap-1 truncate max-w-40">
                          <MapPin size={14} />
                          <span className="truncate">
                            {event.location || "Dhaka"}
                          </span>
                        </div>
                      </div>

                      <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-[#0b3c3d] dark:group-hover:text-emerald-400 transition-colors leading-snug line-clamp-2">
                        {event.title}
                      </h3>

                      <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2 leading-relaxed">
                        {event.description}
                      </p>
                    </div>
                  </div>

                  {/* Footer Actions */}
                  <div className="p-6 pt-0 flex items-center gap-3">
                    <Link
                      href={`/events/${targetEventId}`}
                      className="flex-1 inline-flex items-center justify-center gap-1 bg-[#0b3c3d] hover:bg-[#072a2b] dark:bg-emerald-600 dark:hover:bg-emerald-700 text-white py-3 rounded-2xl text-xs font-bold uppercase tracking-wider shadow transition-colors"
                    >
                      Details <ArrowRight size={14} />
                    </Link>
                    <button
                      onClick={() => setEventToLeave(targetEventId)}
                      className="inline-flex items-center justify-center gap-1 bg-red-500 hover:bg-red-600 text-white px-4 py-3 rounded-2xl text-xs font-bold uppercase tracking-wider shadow transition-colors"
                      title="Leave Event"
                    >
                      <LogOut size={14} /> Leave
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Custom Confirmation Pop-up Modal */}
        {eventToLeave && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
            <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-6">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-red-100 dark:bg-red-950/60 text-red-500 flex items-center justify-center shrink-0">
                  <AlertCircle size={24} />
                </div>
                <button
                  onClick={() => setEventToLeave(null)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white uppercase tracking-wider">
                  Cancel Registration?
                </h3>
                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                  Are you sure you want to cancel your registration for this
                  community initiative? You can always rejoin later if spots are
                  available.
                </p>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={() => setEventToLeave(null)}
                  disabled={actionLoading}
                  className="flex-1 py-3 rounded-2xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-bold uppercase text-xs tracking-wider hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  Keep Registration
                </button>
                <button
                  onClick={handleConfirmLeave}
                  disabled={actionLoading}
                  className="flex-1 py-3 rounded-2xl bg-red-500 hover:bg-red-600 text-white font-bold uppercase text-xs tracking-wider shadow-md shadow-red-500/20 transition-colors disabled:opacity-50"
                >
                  {actionLoading ? "Cancelling..." : "Yes, Leave"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
