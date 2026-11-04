"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { toast } from "react-toastify";
import { Calendar, MapPin, ArrowRight, Sparkles, Users } from "lucide-react";

export default function RecentEventsSection() {
  const [recentEvents, setRecentEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

  useEffect(() => {
    fetch(`${API_URL}/events/recent-upcoming`)
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
  }, [API_URL]);

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full transition-colors duration-300">
      {/* Section Header */}
      <div className="text-center space-y-3 mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-[#0b3c3d] dark:text-emerald-300 text-xs font-semibold uppercase tracking-wider">
          <Sparkles size={14} className="text-[#f07b42]" /> Featured Initiatives
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-wide uppercase text-gray-900 dark:text-white">
          Recent Upcoming Events
        </h2>
        <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm max-w-lg mx-auto">
          Explore upcoming community gatherings and join hands to make a real
          difference.
        </p>
      </div>

      {/* Loading Skeleton Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <div
              key={n}
              className="h-96 bg-gray-200 dark:bg-gray-800/60 rounded-3xl animate-pulse"
            />
          ))}
        </div>
      ) : recentEvents.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm space-y-4 max-w-md mx-auto">
          <Calendar size={32} className="text-gray-400 mx-auto" />
          <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm">
            No upcoming events scheduled at the moment.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recentEvents.map((event) => {
            const rawDate = event.eventDate || event.date;
            const formattedDate = rawDate
              ? new Date(rawDate).toLocaleDateString("en-US", {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })
              : "Upcoming";

            const eventType =
              event.eventType || event.category || "Community Event";
            const attendeesCount = event.attendees?.length || 0;

            return (
              <div
                key={event._id}
                className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col group hover:-translate-y-1.5 justify-between"
              >
                <div>
                  {/* Image & Badge Overlay */}
                  <div className="relative h-56 w-full overflow-hidden bg-gray-100 dark:bg-gray-800">
                    <Image
                      src={
                        event.thumbnail ||
                        event.image ||
                        "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800"
                      }
                      alt={event.title}
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
                      <div className="flex items-center gap-1 truncate max-w-[150px]">
                        <MapPin size={14} />
                        <span className="truncate">
                          {event.location || "Dhaka"}
                        </span>
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-[#0b3c3d] dark:group-hover:text-emerald-400 transition-colors leading-snug line-clamp-2">
                      {event.title}
                    </h3>

                    {event.description && (
                      <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2 leading-relaxed">
                        {event.description}
                      </p>
                    )}

                    <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 pt-1">
                      <Users
                        size={14}
                        className="text-[#0b3c3d] dark:text-emerald-400"
                      />
                      <span>
                        <strong className="text-gray-900 dark:text-white">
                          {attendeesCount}
                        </strong>{" "}
                        volunteers registered
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card Action Button */}
                <div className="p-6 pt-0">
                  <Link
                    href={`/events/${event._id}`}
                    className="w-full inline-flex items-center justify-center gap-2 bg-[#f07b42] hover:bg-[#e06a35] dark:bg-[#e06a35] dark:hover:bg-[#c95926] text-white py-3 rounded-2xl font-bold uppercase text-xs tracking-wider shadow-md hover:shadow-orange-500/20 transition-all"
                  >
                    View Event <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
