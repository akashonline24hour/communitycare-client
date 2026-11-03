"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function JoinedEventsPage() {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();
  const [joinedEvents, setJoinedEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isPending && !session) {
      toast.error("Please log in to view your joined events");
      router.push("/login");
      return;
    }

    if (session?.user?.email) {
      fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/events/joined/${session.user.email}`,
      )
        .then((res) => {
          if (!res.ok) throw new Error("Failed to load joined events");
          return res.json();
        })
        .then((data) => {
          setJoinedEvents(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          toast.error("Could not fetch joined events");
          setLoading(false);
        });
    }
  }, [session, isPending, router]);

  const handleLeaveEvent = async (eventId) => {
    if (
      !confirm(
        "Are you sure you want to cancel your registration for this event?",
      )
    )
      return;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/events/leave`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            eventId,
            userEmail: session.user.email,
          }),
        },
      );

      if (!res.ok) throw new Error("Failed to leave event");

      setJoinedEvents((prev) =>
        prev.filter((item) => item.eventId !== eventId && item._id !== eventId),
      );
      toast.success("Registration cancelled successfully");
    } catch (err) {
      console.error(err);
      toast.error("Could not cancel registration");
    }
  };

  if (isPending || loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-[#0b3c3d] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-800 dark:text-gray-100 transition-colors duration-300 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-wide text-gray-900 dark:text-white">
            My Joined Events
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Events you have registered to participate in
          </p>
        </div>

        {/* Joined Events List */}
        {joinedEvents.length === 0 ? (
          <div className="text-center py-20 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm space-y-4">
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              You haven't registered for any events yet.
            </p>
            <Link
              href="/events"
              className="inline-block bg-[#f07b42] hover:bg-[#e06a35] dark:bg-[#e06a35] dark:hover:bg-[#c95926] text-white px-6 py-2.5 rounded-full font-bold uppercase text-xs tracking-wider shadow transition-colors"
            >
              Explore Upcoming Events
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {joinedEvents.map((item) => {
              const event = item.eventDetails || item;
              return (
                <div
                  key={item._id}
                  className="bg-white dark:bg-gray-900 rounded-2xl shadow-md overflow-hidden border border-gray-100 dark:border-gray-800 flex flex-col justify-between hover:shadow-xl transition-all duration-300 group"
                >
                  <div>
                    <div className="relative w-full h-48 overflow-hidden">
                      <Image
                        src={
                          event.thumbnail ||
                          "https://images.unsplash.com/photo-1532629345422-7515f3d16bb9?w=500"
                        }
                        alt={event.title || "Event Image"}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-6 space-y-2">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white line-clamp-1">
                        {event.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-1">
                        📍 {event.location || "Dhaka"}
                      </p>
                      <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                        📅{" "}
                        {event.eventDate
                          ? new Date(event.eventDate).toLocaleDateString()
                          : "Upcoming"}
                      </p>
                    </div>
                  </div>

                  <div className="p-6 pt-0 flex gap-3">
                    <Link
                      href={`/events/${event._id || item.eventId}`}
                      className="flex-1 text-center bg-[#0b3c3d] hover:bg-[#072425] text-white py-2.5 rounded-full font-semibold uppercase text-xs tracking-wider transition-colors"
                    >
                      Details
                    </Link>
                    <button
                      onClick={() =>
                        handleLeaveEvent(event._id || item.eventId)
                      }
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2.5 rounded-full font-semibold uppercase text-xs tracking-wider transition-colors"
                    >
                      Leave
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
