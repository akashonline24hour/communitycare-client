"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function ManageEventsPage() {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isPending && !session) {
      toast.error("Please log in to manage your events");
      router.push("/login");
      return;
    }

    if (session?.user?.email) {
      fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/events/organizer/${session.user.email}`,
      )
        .then((res) => {
          if (!res.ok) throw new Error("Failed to load your events");
          return res.json();
        })
        .then((data) => {
          setEvents(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          toast.error("Error fetching events");
          setLoading(false);
        });
    }
  }, [session, isPending, router]);

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this event?")) return;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/events/${id}`,
        { method: "DELETE" },
      );

      if (!res.ok) throw new Error("Failed to delete event");

      setEvents((prev) => prev.filter((event) => event._id !== id));
      toast.success("Event deleted successfully");
    } catch (err) {
      console.error(err);
      toast.error("Could not delete event");
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-wide text-gray-900 dark:text-white">
            Manage My Events
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            View, edit, or remove events you have created
          </p>
        </div>
        <Link
          href="/events/create"
          className="bg-[#0b3c3d] hover:bg-[#072425] text-white px-6 py-2.5 rounded-full font-bold uppercase text-xs tracking-wider shadow transition-colors"
        >
          + Create New Event
        </Link>
      </div>

      {events.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm space-y-4">
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            You haven't created any events yet.
          </p>
          <Link
            href="/events/create"
            className="inline-block bg-[#f07b42] hover:bg-[#e06a35] text-white px-6 py-2.5 rounded-full font-bold uppercase text-xs tracking-wider shadow"
          >
            Create Your First Event
          </Link>
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-md border border-gray-100 dark:border-gray-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-100 dark:border-gray-800 text-xs font-semibold uppercase text-gray-600 dark:text-gray-400">
                  <th className="py-4 px-6">Event</th>
                  <th className="py-4 px-6">Location</th>
                  <th className="py-4 px-6">Date</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800 text-sm">
                {events.map((event) => (
                  <tr
                    key={event._id}
                    className="hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-colors"
                  >
                    <td className="py-4 px-6 flex items-center space-x-3">
                      <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                          src={
                            event.thumbnail ||
                            "https://images.unsplash.com/photo-1532629345422-7515f3d16bb9?w=150"
                          }
                          alt={event.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <span className="font-semibold text-gray-900 dark:text-white line-clamp-1">
                        {event.title}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-gray-600 dark:text-gray-300 whitespace-nowrap">
                      {event.location}
                    </td>
                    <td className="py-4 px-6 text-gray-600 dark:text-gray-300 whitespace-nowrap">
                      {new Date(event.eventDate).toLocaleDateString()}
                    </td>
                    <td className="py-4 px-6 text-right space-x-2 whitespace-nowrap">
                      <button
                        onClick={() => handleDelete(event._id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold uppercase transition-colors"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
