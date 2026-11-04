"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Search,
  MapPin,
  Calendar,
  Sparkles,
  ArrowRight,
  RotateCcw,
  CalendarCheck,
  PlusCircle,
  Users,
} from "lucide-react";

export default function EventsListingPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("All");

  const API_URL =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

  const eventTypes = [
    "All",
    "Donation",
    "Cleanup",
    "Plantation",
    "Winter Relief",
    "Food Drive",
    "Health Camp",
    "Education",
  ];

  const fallbackEvents = [
    {
      _id: "1",
      title: "Winter Clothes Distribution",
      description:
        "Collecting and distributing warm clothes, jackets, sweaters, and shawls to underprivileged families, rickshaw pullers, and...",
      eventDate: "2026-11-15T09:00",
      location: "Mirpur 10, Dhaka",
      eventType: "Donation",
      thumbnail:
        "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800",
      organizerName: "Mirpur Youth Volunteers",
    },
    {
      _id: "2",
      title: "Blanket Distribution for the Needy",
      description:
        "Night-time blanket distribution drive across pavement dwellers, orphanages, and senior citizens across Mohammadpur and...",
      eventDate: "2026-11-20T20:00",
      location: "Mohammadpur, Dhaka",
      eventType: "Winter Relief",
      thumbnail:
        "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800",
      organizerName: "Mohammadpur Care Circle",
    },
    {
      _id: "3",
      title: "Dhanmondi Lake Clean-Up Campaign",
      description:
        "Join us this Saturday morning with gloves, bags, and tools to clear plastic waste from walkways and lake borders.",
      eventDate: "2026-11-25T07:30",
      location: "Dhanmondi Lake, Dhaka",
      eventType: "Cleanup",
      thumbnail:
        "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800",
      organizerName: "Green Dhaka Youth",
    },
  ];

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch(`${API_URL}/events`);
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            setEvents(data);
          } else {
            setEvents(fallbackEvents);
          }
        } else {
          setEvents(fallbackEvents);
        }
      } catch (err) {
        setEvents(fallbackEvents);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [API_URL]);

  // Helper to determine if an event date is scheduled for the future
  const isFutureEvent = (dateStr) => {
    if (!dateStr) return true;
    const eventTime = new Date(dateStr).getTime();
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return eventTime >= today.getTime();
  };

  // Filter events: Keyword match + Event Type filter + Future dates only
  const filteredEvents = events.filter((event) => {
    const eventDateVal = event.eventDate || event.date;
    if (!isFutureEvent(eventDateVal)) return false;

    const matchesSearch =
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (event.location &&
        event.location.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesType =
      selectedType === "All" ||
      event.eventType === selectedType ||
      event.category === selectedType;

    return matchesSearch && matchesType;
  });

  return (
    <div className="min-h-screen bg-gray-50/60 dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-300 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Top Navigation Filter Pills & Search Bar Layout */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-4 sm:p-5 rounded-3xl shadow-sm">
          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
            {eventTypes.map((type) => {
              const isActive = selectedType === type;
              return (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide whitespace-nowrap transition-all shadow-sm ${
                    isActive
                      ? "bg-[#0b3c3d] dark:bg-emerald-600 text-white shadow-md shadow-emerald-900/10"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                  }`}
                >
                  {type}
                </button>
              );
            })}
          </div>

          {/* Right Toolbar: Search & Create Event Button */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="relative w-full sm:w-64">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                <Search size={16} />
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search events or areas..."
                className="w-full pl-10 pr-9 py-2.5 rounded-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0b3c3d] text-xs transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  title="Clear search"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                >
                  <RotateCcw size={14} />
                </button>
              )}
            </div>

            <Link
              href="/events/create"
              className="inline-flex items-center gap-1.5 bg-[#f07b42] hover:bg-[#e06a35] dark:bg-[#e06a35] dark:hover:bg-[#c95926] text-white px-4 py-2.5 rounded-full font-bold uppercase text-[11px] tracking-wider shadow-md hover:shadow-orange-500/20 transition-all shrink-0"
            >
              <PlusCircle size={15} /> Create
            </Link>
          </div>
        </div>

        {/* Events Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-96 rounded-3xl bg-gray-200 dark:bg-gray-800/60 animate-pulse"
              />
            ))}
          </div>
        ) : filteredEvents.length === 0 ? (
          <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl p-12 text-center space-y-4 max-w-md mx-auto shadow-sm">
            <div className="w-14 h-14 rounded-full bg-orange-100 dark:bg-orange-950/60 text-[#f07b42] flex items-center justify-center mx-auto">
              <CalendarCheck size={28} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              No Events Found
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              There are no upcoming events matching your selected category or
              keyword.
            </p>
            {(searchQuery || selectedType !== "All") && (
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedType("All");
                }}
                className="bg-[#0b3c3d] hover:bg-[#072a2b] dark:bg-emerald-600 dark:hover:bg-emerald-700 text-white px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-colors"
              >
                Reset Filters
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.map((event) => {
              const rawDate = event.eventDate || event.date;
              const formattedDate = new Date(rawDate).toLocaleDateString(
                "en-US",
                {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                },
              );

              const currentEventType =
                event.eventType || event.category || "General";

              return (
                <div
                  key={event._id}
                  className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col group hover:-translate-y-1"
                >
                  {/* Card Image & Badge */}
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

                    {/* Event Type Floating Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="px-3.5 py-1 rounded-full bg-black/50 backdrop-blur-md text-white text-[11px] font-semibold tracking-wide border border-white/20 shadow-sm flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                        {currentEventType}
                      </span>
                    </div>

                    {/* Date Badge Overlay on Bottom Left of Image */}
                    <div className="absolute bottom-3 left-4">
                      <span className="px-3 py-1 rounded-xl bg-black/70 backdrop-blur-md text-white text-xs font-medium shadow flex items-center gap-1.5">
                        <Calendar size={13} className="text-[#f07b42]" />
                        {formattedDate}
                      </span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2.5">
                      {/* Location */}
                      <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 font-medium">
                        <MapPin
                          size={14}
                          className="text-[#0b3c3d] dark:text-emerald-400 shrink-0"
                        />
                        <span className="truncate">{event.location}</span>
                      </div>

                      {/* Title */}
                      <h2 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-[#0b3c3d] dark:group-hover:text-emerald-400 transition-colors leading-snug line-clamp-2">
                        {event.title}
                      </h2>

                      {/* Description */}
                      <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-3 leading-relaxed">
                        {event.description}
                      </p>
                    </div>

                    {/* Footer Section */}
                    <div className="pt-4 border-t border-gray-100 dark:border-gray-800 space-y-4">
                      <div className="flex items-center gap-1.5 text-[11px] text-gray-500 dark:text-gray-400">
                        <Users size={13} className="text-gray-400" />
                        <span className="truncate">
                          By {event.organizerName || "Community Member"}
                        </span>
                      </div>

                      <Link
                        href={`/events/${event._id}`}
                        className="w-full flex items-center justify-center gap-2 bg-[#0b3c3d] hover:bg-[#072a2b] dark:bg-emerald-600 dark:hover:bg-emerald-700 text-white py-3 rounded-2xl text-xs font-bold uppercase tracking-wider shadow transition-all duration-200"
                      >
                        View Event <ArrowRight size={14} />
                      </Link>
                    </div>
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
