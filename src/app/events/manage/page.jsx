"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import {
  Calendar,
  MapPin,
  PlusCircle,
  Eye,
  Edit,
  Trash2,
  Sparkles,
  AlertCircle,
  X,
  Users,
  ArrowRight,
} from "lucide-react";

export default function ManageEventsPage() {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal states for Delete and Edit
  const [eventToDelete, setEventToDelete] = useState(null);
  const [eventToEdit, setEventToEdit] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  // Edit form state
  const [editForm, setEditForm] = useState({
    title: "",
    description: "",
    location: "",
    eventDate: "",
    eventType: "Donation",
  });

  const API_URL =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

  const eventTypes = [
    "Donation",
    "Cleanup",
    "Plantation",
    "Winter Relief",
    "Food Drive",
    "Health Camp",
    "Education",
  ];

  useEffect(() => {
    if (!isPending && !session) {
      toast.error("Please log in to manage your events");
      router.push("/login");
      return;
    }

    if (session?.user?.email) {
      fetch(`${API_URL}/events/organizer/${session.user.email}`)
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
  }, [session, isPending, router, API_URL]);

  // Open Edit Modal & Populate Form
  const handleOpenEdit = (event) => {
    setEventToEdit(event);
    setEditForm({
      title: event.title || "",
      description: event.description || "",
      location: event.location || "",
      eventDate: event.eventDate
        ? new Date(event.eventDate).toISOString().slice(0, 16)
        : "",
      eventType: event.eventType || event.category || "Donation",
    });
  };

  // Submit Edit Form
  const handleSaveEdit = async (e) => {
    e.preventDefault();
    if (!eventToEdit) return;

    setActionLoading(true);

    try {
      const res = await fetch(`${API_URL}/events/${eventToEdit._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editForm),
      });

      if (!res.ok) throw new Error("Failed to update event");

      setEvents((prev) =>
        prev.map((item) =>
          item._id === eventToEdit._id ? { ...item, ...editForm } : item,
        ),
      );

      toast.success("Event updated successfully!");
      setEventToEdit(null);
    } catch (err) {
      console.error(err);
      toast.error("Could not update event details.");
    } finally {
      setActionLoading(false);
    }
  };

  // Confirm Delete Action
  const handleConfirmDelete = async () => {
    if (!eventToDelete) return;

    setActionLoading(true);

    try {
      const res = await fetch(`${API_URL}/events/${eventToDelete}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete event");

      setEvents((prev) => prev.filter((event) => event._id !== eventToDelete));
      toast.success("Event deleted successfully");
      setEventToDelete(null);
    } catch (err) {
      console.error(err);
      toast.error("Could not delete event");
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
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-6 rounded-3xl shadow-sm">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-[#0b3c3d] dark:text-emerald-300 text-[11px] font-semibold uppercase tracking-wider">
              <Sparkles size={13} className="text-[#f07b42]" /> Organizer
              Control Panel
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-wide text-gray-900 dark:text-white">
              Manage My Events
            </h1>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Control, edit details, or remove community initiatives you have
              organized.
            </p>
          </div>

          <Link
            href="/events/create"
            className="inline-flex items-center gap-2 bg-[#f07b42] hover:bg-[#e06a35] dark:bg-[#e06a35] dark:hover:bg-[#c95926] text-white px-6 py-3 rounded-2xl font-bold uppercase text-xs tracking-wider shadow-md hover:shadow-orange-500/20 transition-all shrink-0"
          >
            <PlusCircle size={16} /> Create Event
          </Link>
        </div>

        {/* Events Card Grid / Empty State */}
        {events.length === 0 ? (
          <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl p-12 text-center space-y-4 max-w-md mx-auto shadow-sm">
            <div className="w-14 h-14 rounded-full bg-orange-100 dark:bg-orange-950/60 text-[#f07b42] flex items-center justify-center mx-auto">
              <Calendar size={28} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              No Created Events
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              You haven't organized any community events yet.
            </p>
            <Link
              href="/events/create"
              className="inline-block bg-[#0b3c3d] hover:bg-[#072a2b] dark:bg-emerald-600 dark:hover:bg-emerald-700 text-white px-6 py-3 rounded-full font-bold uppercase text-xs tracking-wider shadow-md transition-colors"
            >
              Create Your First Event
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event) => {
              const rawDate = event.eventDate || event.date;
              const formattedDate = rawDate
                ? new Date(rawDate).toLocaleDateString("en-US", {
                    weekday: "short",
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })
                : "Upcoming";

              const eventType = event.eventType || event.category || "General";
              const attendeesCount = event.attendees?.length || 0;

              return (
                <div
                  key={event._id}
                  className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col group hover:-translate-y-1.5 justify-between"
                >
                  <div>
                    {/* Thumbnail & Badge */}
                    <div className="relative h-52 w-full overflow-hidden bg-gray-100 dark:bg-gray-800">
                      <Image
                        src={
                          event.thumbnail ||
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
                          <span className="truncate">{event.location}</span>
                        </div>
                      </div>

                      <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-[#0b3c3d] dark:group-hover:text-emerald-400 transition-colors leading-snug line-clamp-2">
                        {event.title}
                      </h3>

                      <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2 leading-relaxed">
                        {event.description}
                      </p>

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

                  {/* Footer Action Toolbar */}
                  <div className="p-6 pt-0 flex items-center gap-2">
                    <Link
                      href={`/events/${event._id}`}
                      className="flex-1 inline-flex items-center justify-center gap-1 bg-[#0b3c3d] hover:bg-[#072a2b] dark:bg-emerald-600 dark:hover:bg-emerald-700 text-white py-3 rounded-2xl text-xs font-bold uppercase tracking-wider shadow transition-colors"
                    >
                      <Eye size={14} /> View
                    </Link>
                    <button
                      onClick={() => handleOpenEdit(event)}
                      className="inline-flex items-center justify-center gap-1 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 px-4 py-3 rounded-2xl text-xs font-bold uppercase tracking-wider transition-colors"
                      title="Edit Event"
                    >
                      <Edit size={14} /> Edit
                    </button>
                    <button
                      onClick={() => setEventToDelete(event._id)}
                      className="inline-flex items-center justify-center gap-1 bg-red-50 hover:bg-red-500 dark:bg-red-950/50 dark:hover:bg-red-600 text-red-600 hover:text-white px-3.5 py-3 rounded-2xl text-xs font-bold uppercase tracking-wider transition-colors"
                      title="Delete Event"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Custom Edit Modal Pop-up */}
        {eventToEdit && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
            <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-gray-900 dark:text-white font-bold text-lg uppercase tracking-wider">
                  <Edit size={18} className="text-[#f07b42]" /> Edit Initiative
                  Details
                </div>
                <button
                  onClick={() => setEventToEdit(null)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSaveEdit} className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">
                    Event Title
                  </label>
                  <input
                    type="text"
                    required
                    value={editForm.title}
                    onChange={(e) =>
                      setEditForm({ ...editForm, title: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-2xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#0b3c3d] outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">
                      Event Type
                    </label>
                    <select
                      value={editForm.eventType}
                      onChange={(e) =>
                        setEditForm({ ...editForm, eventType: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-2xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#0b3c3d] outline-none cursor-pointer"
                    >
                      {eventTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">
                      Location
                    </label>
                    <input
                      type="text"
                      required
                      value={editForm.location}
                      onChange={(e) =>
                        setEditForm({ ...editForm, location: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-2xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#0b3c3d] outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">
                    Date & Time
                  </label>
                  <input
                    type="datetime-local"
                    required
                    value={editForm.eventDate}
                    onChange={(e) =>
                      setEditForm({ ...editForm, eventDate: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-2xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#0b3c3d] outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">
                    Description
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={editForm.description}
                    onChange={(e) =>
                      setEditForm({ ...editForm, description: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-2xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#0b3c3d] outline-none"
                  />
                </div>

                <div className="flex items-center gap-3 pt-3">
                  <button
                    type="button"
                    onClick={() => setEventToEdit(null)}
                    className="flex-1 py-3 rounded-2xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-bold uppercase tracking-wider hover:bg-gray-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={actionLoading}
                    className="flex-1 py-3 rounded-2xl bg-[#0b3c3d] hover:bg-[#072a2b] dark:bg-emerald-600 dark:hover:bg-emerald-700 text-white font-bold uppercase tracking-wider shadow transition-colors disabled:opacity-50"
                  >
                    {actionLoading ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Custom Confirmation Delete Pop-up Modal */}
        {eventToDelete && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
            <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-6">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-red-100 dark:bg-red-950/60 text-red-500 flex items-center justify-center shrink-0">
                  <AlertCircle size={24} />
                </div>
                <button
                  onClick={() => setEventToDelete(null)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white uppercase tracking-wider">
                  Delete Initiative?
                </h3>
                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                  Are you sure you want to delete this event? This action cannot
                  be undone and will remove all attendee registrations for this
                  event.
                </p>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={() => setEventToDelete(null)}
                  disabled={actionLoading}
                  className="flex-1 py-3 rounded-2xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-bold uppercase text-xs tracking-wider hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmDelete}
                  disabled={actionLoading}
                  className="flex-1 py-3 rounded-2xl bg-red-500 hover:bg-red-600 text-white font-bold uppercase text-xs tracking-wider shadow-md shadow-red-500/20 transition-colors disabled:opacity-50"
                >
                  {actionLoading ? "Deleting..." : "Yes, Delete"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
