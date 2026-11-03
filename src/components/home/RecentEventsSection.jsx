"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { toast } from "react-toastify";

export default function RecentEventsSection() {
  const [recentEvents, setRecentEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/events/recent-upcoming`,
    )
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch recent events");
        return res.json();
      })
      .then((data) => {
        setRecentEvents(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Could not load recent events");
        setLoading(false);
      });
  }, []);

  return (
    <section className="py-20 px-6 max-w-7xl mx-auto w-full">
      <div className="text-center mb-14">
        <h2 className="text-3xl font-extrabold tracking-wide uppercase text-gray-900 dark:text-white">
          Recent Upcoming Events
        </h2>
        <div className="w-16 h-1 bg-[#f07b42] mx-auto mt-3 rounded-full" />
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <div
              key={n}
              className="h-80 bg-gray-200 dark:bg-gray-800 rounded-2xl animate-pulse"
            />
          ))}
        </div>
      ) : recentEvents.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400 py-10">
          No upcoming events found at the moment.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recentEvents.map((event) => (
            <div
              key={event._id}
              className="bg-white dark:bg-gray-900 rounded-2xl shadow-md overflow-hidden border border-gray-200 dark:border-gray-800 flex flex-col justify-between hover:shadow-xl transition-all duration-300 group"
            >
              <div>
                <div className="relative w-full h-52 overflow-hidden">
                  <Image
                    src={
                      event.thumbnail ||
                      "https://images.unsplash.com/photo-1532629345422-7515f3d16bb9?w=500"
                    }
                    alt={event.title}
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
              <div className="p-6 pt-0">
                <Link
                  href={`/events/${event._id}`}
                  className="block text-center bg-[#f07b42] hover:bg-[#e06a35] text-white py-3 rounded-full font-semibold uppercase text-xs tracking-wider shadow transition-colors"
                >
                  View Event
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
