"use client";

import { useEffect, useState, use } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";

export default function EventDetailsPage({ params }) {
  const resolvedParams = use(params);
  const eventId = resolvedParams.id;

  const { data: session } = authClient.useSession();
  const router = useRouter();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [joining, setJoining] = useState(false);

  useEffect(() => {
    fetch(
      `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/events/${eventId}`,
    )
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch event details");
        return res.json();
      })
      .then((data) => {
        setEvent(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Could not load event details");
        setLoading(false);
      });
  }, [eventId]);

  const handleJoinEvent = async () => {
    if (!session) {
      toast.error("Please log in to join this event");
      router.push("/login");
      return;
    }

    setJoining(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/events/join`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            eventId: event._id,
            userEmail: session.user.email,
            userName: session.user.name,
          }),
        },
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to join event");

      toast.success("Successfully joined the event!");
      router.push("/events/joined");
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Could not join event");
    } finally {
      setJoining(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-[#0b3c3d] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <p className="text-gray-500 dark:text-gray-400">Event not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-800 dark:text-gray-100 transition-colors duration-300 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl shadow-xl overflow-hidden">
        {/* Event Banner */}
        <div className="relative w-full h-80 sm:h-96">
          <Image
            src={
              event.thumbnail ||
              "https://images.unsplash.com/photo-1532629345422-7515f3d16bb9?w=1000"
            }
            alt={event.title}
            fill
            priority
            className="object-cover"
          />
        </div>

        {/* Content Section */}
        <div className="p-8 sm:p-12 space-y-8">
          <div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-wide uppercase">
              {event.title}
            </h1>
            <div className="flex flex-wrap items-center gap-6 mt-4 text-sm text-gray-600 dark:text-gray-300 font-medium">
              <span className="flex items-center gap-1">
                📍 {event.location || "Dhaka"}
              </span>
              <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                📅{" "}
                {event.eventDate
                  ? new Date(event.eventDate).toLocaleDateString()
                  : "Upcoming"}
              </span>
              {event.organizerName && (
                <span className="flex items-center gap-1">
                  👤 Organized by {event.organizerName}
                </span>
              )}
            </div>
          </div>

          <div className="border-t border-b border-gray-100 dark:border-gray-800 py-6 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">
              About This Event
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm sm:text-base whitespace-pre-line">
              {event.description}
            </p>
          </div>

          {/* Action Button */}
          <div className="flex justify-end">
            <button
              onClick={handleJoinEvent}
              disabled={joining}
              className="bg-[#f07b42] hover:bg-[#e06a35] dark:bg-[#e06a35] dark:hover:bg-[#c95926] text-white px-10 py-4 rounded-full font-bold uppercase text-xs tracking-wider shadow-lg transition-all transform hover:scale-105 disabled:opacity-50"
            >
              {joining ? "Joining Event..." : "Join Event"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
