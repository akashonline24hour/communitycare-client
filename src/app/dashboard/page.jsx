"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";
import { apiFetch } from "@/lib/api";
import {
  LayoutDashboard,
  User as UserIcon,
  CalendarPlus,
  CalendarCheck,
  Calendar,
  MapPin,
  Users,
  Mail,
  Camera,
  Save,
  ArrowRight,
  AlertCircle,
  Sparkles,
  Clock,
} from "lucide-react";

const DEFAULT_AVATAR =
  "https://images.unsplash.com/photo-1740252117044-2af197eea287?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D";
const FALLBACK_THUMB =
  "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800";

const TABS = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "profile", label: "Profile", icon: UserIcon },
  { id: "created", label: "My Events", icon: CalendarPlus },
  { id: "joined", label: "Joined Events", icon: CalendarCheck },
];

// ---------- helpers ----------
const pad = (n) => String(n).padStart(2, "0");
const todayString = () => {
  const d = new Date();
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
};
const dayOf = (value) => (value ? String(value).slice(0, 10) : "");
const isEnded = (value) => !!dayOf(value) && dayOf(value) < todayString();
const formatDate = (value) => {
  const d = value ? new Date(value) : null;
  if (!d || Number.isNaN(d.getTime())) return "Date to be announced";
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
};

// ---------- small components (kept outside the page so React doesn't recreate them) ----------
function StatCard({ icon: Icon, label, value, tone }) {
  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl p-5 shadow-sm flex items-center gap-4">
      <div
        className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${tone}`}
      >
        <Icon size={22} />
      </div>
      <div>
        <p className="text-2xl font-extrabold text-gray-900 dark:text-white leading-none">
          {value}
        </p>
        <p className="text-[11px] uppercase font-semibold tracking-wider text-gray-500 dark:text-gray-400 mt-1">
          {label}
        </p>
      </div>
    </div>
  );
}

function EventRow({ event, children }) {
  const ended = isEnded(event.eventDate);
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl shadow-sm">
      <div className="h-24 sm:h-20 w-full sm:w-32 shrink-0 rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={event.thumbnail || FALLBACK_THUMB}
          alt={event.title || "Event"}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="flex-1 min-w-0 space-y-1.5">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-[#0b3c3d] dark:text-emerald-300 text-[10px] font-bold uppercase tracking-wider">
            {event.eventType || "Community Event"}
          </span>
          <span
            className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
              ended
                ? "bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400"
                : "bg-orange-100 dark:bg-orange-950/60 text-[#f07b42]"
            }`}
          >
            {ended ? "Ended" : "Upcoming"}
          </span>
        </div>

        <h3 className="text-sm font-bold text-gray-900 dark:text-white truncate">
          {event.title}
        </h3>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-500 dark:text-gray-400">
          <span className="flex items-center gap-1">
            <Calendar size={13} className="text-[#f07b42]" />
            {formatDate(event.eventDate)}
          </span>
          <span className="flex items-center gap-1 min-w-0">
            <MapPin size={13} className="shrink-0" />
            <span className="truncate">{event.location}</span>
          </span>
          <span className="flex items-center gap-1">
            <Users size={13} />
            {event.attendees?.length || 0} volunteers
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0">{children}</div>
    </div>
  );
}

function ViewLink({ id }) {
  return (
    <Link
      href={`/events/${id}`}
      className="inline-flex items-center justify-center gap-1 bg-[#0b3c3d] hover:bg-[#072a2b] dark:bg-emerald-600 dark:hover:bg-emerald-700 text-white px-4 py-2.5 rounded-xl text-[11px] font-bold uppercase tracking-wider shadow transition-colors"
    >
      View <ArrowRight size={13} />
    </Link>
  );
}

function EmptyState({ icon: Icon, title, text, href, cta }) {
  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl p-10 text-center space-y-4 max-w-md mx-auto shadow-sm">
      <div className="w-14 h-14 rounded-full bg-orange-100 dark:bg-orange-950/60 text-[#f07b42] flex items-center justify-center mx-auto">
        <Icon size={28} />
      </div>
      <h3 className="text-lg font-bold text-gray-900 dark:text-white">
        {title}
      </h3>
      <p className="text-xs text-gray-500 dark:text-gray-400">{text}</p>
      <Link
        href={href}
        className="inline-block bg-[#f07b42] hover:bg-[#e06a35] text-white px-6 py-3 rounded-full font-bold uppercase text-xs tracking-wider shadow-md transition-colors"
      >
        {cta}
      </Link>
    </div>
  );
}

function SectionTitle({ children }) {
  return (
    <h2 className="text-sm font-bold uppercase tracking-wider text-gray-900 dark:text-white">
      {children}
    </h2>
  );
}

function DashboardSkeleton() {
  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-pulse">
      <div className="h-28 rounded-3xl bg-gray-200 dark:bg-gray-800" />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-24 rounded-3xl bg-gray-200 dark:bg-gray-800"
          />
        ))}
      </div>
      <div className="h-24 rounded-2xl bg-gray-200 dark:bg-gray-800" />
      <div className="h-24 rounded-2xl bg-gray-200 dark:bg-gray-800" />
    </div>
  );
}

// ---------- page ----------
export default function DashboardPage() {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();

  const [tab, setTab] = useState("overview");
  const [created, setCreated] = useState([]);
  const [joined, setJoined] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [reloadKey, setReloadKey] = useState(0);

  // null means "not edited yet", so the field shows the saved value from the session
  const [draftName, setDraftName] = useState(null);
  const [draftImage, setDraftImage] = useState(null);
  const [saving, setSaving] = useState(false);

  const email = session?.user?.email;
  const hasSession = !!session;
  const savedName = session?.user?.name || "";
  const savedImage = session?.user?.image || "";
  const nameValue = draftName ?? savedName;
  const imageValue = draftImage ?? savedImage;

  // Load created and joined events
  useEffect(() => {
    if (isPending) return;

    if (!hasSession) {
      router.replace("/login?redirect=/dashboard");
      return;
    }

    let cancelled = false;
    const encoded = encodeURIComponent(email);

    Promise.all([
      apiFetch(`/events/organizer/${encoded}`, { auth: true }),
      apiFetch(`/events/joined/${encoded}`, { auth: true }),
    ])
      .then(([mine, registrations]) => {
        if (cancelled) return;
        setCreated(Array.isArray(mine) ? mine : []);
        setJoined(Array.isArray(registrations) ? registrations : []);
        setLoadError("");
      })
      .catch((err) => {
        if (cancelled) return;
        console.error(err);
        if (err.status === 401) {
          toast.error("Your session expired. Please log in again.");
          router.replace("/login?redirect=/dashboard");
          return;
        }
        setLoadError(err.message || "Could not load your dashboard");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [isPending, hasSession, email, router, reloadKey]);

  const stats = useMemo(() => {
    const joinedEvents = joined.map((r) => r.eventDetails).filter(Boolean);
    const upcomingJoined = joinedEvents
      .filter((e) => !isEnded(e.eventDate))
      .sort((a, b) => dayOf(a.eventDate).localeCompare(dayOf(b.eventDate)));
    const upcomingCreated = created.filter((e) => !isEnded(e.eventDate));
    const volunteers = created.reduce(
      (sum, e) => sum + (e.attendees?.length || 0),
      0,
    );
    return { joinedEvents, upcomingJoined, upcomingCreated, volunteers };
  }, [created, joined]);

  const handleRetry = () => {
    setLoadError("");
    setLoading(true);
    setReloadKey((k) => k + 1);
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();

    const name = nameValue.trim();
    const image = imageValue.trim();

    if (name.length < 2 || name.length > 50) {
      toast.error("Name must be between 2 and 50 characters");
      return;
    }
    if (image) {
      let url;
      try {
        url = new URL(image);
      } catch {
        toast.error("Enter a valid photo URL");
        return;
      }
      if (url.protocol !== "https:") {
        toast.error("Photo URL must start with https://");
        return;
      }
    }

    setSaving(true);
    try {
      const finalImage = image || DEFAULT_AVATAR;

      const { error } = await authClient.updateUser({
        name,
        image: finalImage,
      });
      if (error) throw new Error(error.message || "Could not update profile");

      // Keep the organizer name and photo on existing events up to date (best effort)
      try {
        await apiFetch("/events/sync-profile", {
          method: "POST",
          auth: true,
          body: { name, image: finalImage },
        });
      } catch (syncError) {
        console.error("Profile sync failed:", syncError);
      }

      setDraftName(null);
      setDraftImage(null);
      toast.success("Profile updated successfully!");
      setReloadKey((k) => k + 1);
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Could not update profile");
    } finally {
      setSaving(false);
    }
  };

  if (isPending || loading) {
    return (
      <div className="min-h-screen bg-gray-50/60 dark:bg-gray-950 py-10 px-4 sm:px-6 lg:px-8">
        <DashboardSkeleton />
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="min-h-[75vh] flex items-center justify-center px-4">
        <div className="bg-white dark:bg-gray-900 border border-red-100 dark:border-red-950 rounded-3xl p-10 text-center space-y-4 max-w-md w-full shadow-sm">
          <div className="w-14 h-14 rounded-full bg-red-100 dark:bg-red-950/60 text-red-500 flex items-center justify-center mx-auto">
            <AlertCircle size={28} />
          </div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Could Not Load Dashboard
          </h2>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {loadError}
          </p>
          <button
            onClick={handleRetry}
            className="bg-[#0b3c3d] hover:bg-[#072a2b] dark:bg-emerald-600 dark:hover:bg-emerald-700 text-white px-6 py-3 rounded-full font-bold uppercase text-xs tracking-wider shadow-md transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const inputClass =
    "w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0b3c3d] text-sm";

  return (
    <div className="min-h-screen bg-gray-50/60 dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-300 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl p-6 shadow-sm">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={savedImage || DEFAULT_AVATAR}
            alt={savedName || "Profile photo"}
            className="w-20 h-20 rounded-full object-cover border-4 border-emerald-100 dark:border-emerald-950 shadow"
          />
          <div className="flex-1 min-w-0 space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-[#0b3c3d] dark:text-emerald-300 text-[11px] font-semibold uppercase tracking-wider">
              <Sparkles size={13} className="text-[#f07b42]" /> My Dashboard
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white truncate">
              {savedName || "Welcome"}
            </h1>
            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
              {email}
            </p>
          </div>
          <Link
            href="/events/create"
            className="inline-flex items-center gap-2 bg-[#f07b42] hover:bg-[#e06a35] text-white px-6 py-3 rounded-2xl font-bold uppercase text-xs tracking-wider shadow-md transition-all shrink-0"
          >
            <CalendarPlus size={16} /> Create Event
          </Link>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-1">
          {TABS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-colors ${
                tab === id
                  ? "bg-[#0b3c3d] dark:bg-emerald-600 text-white shadow"
                  : "bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
            >
              <Icon size={15} /> {label}
            </button>
          ))}
        </div>

        {/* Overview */}
        {tab === "overview" && (
          <div className="space-y-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard
                icon={CalendarPlus}
                label="Events created"
                value={created.length}
                tone="bg-orange-100 dark:bg-orange-950/60 text-[#f07b42]"
              />
              <StatCard
                icon={CalendarCheck}
                label="Events joined"
                value={stats.joinedEvents.length}
                tone="bg-emerald-100 dark:bg-emerald-950/60 text-[#0b3c3d] dark:text-emerald-400"
              />
              <StatCard
                icon={Clock}
                label="Upcoming (mine)"
                value={stats.upcomingCreated.length}
                tone="bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400"
              />
              <StatCard
                icon={Users}
                label="Volunteers reached"
                value={stats.volunteers}
                tone="bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400"
              />
            </div>

            <div className="space-y-3">
              <SectionTitle>Your next events</SectionTitle>
              {stats.upcomingJoined.length === 0 ? (
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  You have no upcoming joined events.{" "}
                  <Link
                    href="/events"
                    className="font-semibold text-[#0b3c3d] dark:text-emerald-400 hover:underline"
                  >
                    Browse upcoming events
                  </Link>
                  .
                </p>
              ) : (
                stats.upcomingJoined.slice(0, 3).map((event) => (
                  <EventRow key={event._id} event={event}>
                    <ViewLink id={event._id} />
                  </EventRow>
                ))
              )}
            </div>

            <div className="space-y-3">
              <SectionTitle>Your latest events</SectionTitle>
              {created.length === 0 ? (
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  You haven't created any events yet.{" "}
                  <Link
                    href="/events/create"
                    className="font-semibold text-[#0b3c3d] dark:text-emerald-400 hover:underline"
                  >
                    Create your first event
                  </Link>
                  .
                </p>
              ) : (
                created.slice(0, 3).map((event) => (
                  <EventRow key={event._id} event={event}>
                    <ViewLink id={event._id} />
                  </EventRow>
                ))
              )}
            </div>
          </div>
        )}

        {/* Profile */}
        {tab === "profile" && (
          <div className="max-w-xl mx-auto bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
            <div className="flex items-center gap-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={imageValue.trim() || DEFAULT_AVATAR}
                alt="Profile preview"
                onError={(e) => {
                  if (e.currentTarget.src !== DEFAULT_AVATAR) {
                    e.currentTarget.src = DEFAULT_AVATAR;
                  }
                }}
                className="w-20 h-20 rounded-full object-cover border-4 border-emerald-100 dark:border-emerald-950 shadow"
              />
              <div>
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                  Edit Profile
                </h2>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Update your display name and photo.
                </p>
              </div>
            </div>

            <form onSubmit={handleSaveProfile} noValidate className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase text-gray-700 dark:text-gray-300 mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    <UserIcon size={16} />
                  </span>
                  <input
                    type="text"
                    value={nameValue}
                    onChange={(e) => setDraftName(e.target.value)}
                    placeholder="Your name"
                    className={inputClass}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-gray-700 dark:text-gray-300 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    <Mail size={16} />
                  </span>
                  <input
                    type="email"
                    disabled
                    value={email || ""}
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 text-sm cursor-not-allowed"
                  />
                </div>
                <p className="mt-1 text-[11px] text-gray-400">
                  Your email can't be changed.
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-gray-700 dark:text-gray-300 mb-1">
                  Photo URL
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    <Camera size={16} />
                  </span>
                  <input
                    type="url"
                    value={imageValue}
                    onChange={(e) => setDraftImage(e.target.value)}
                    placeholder="https://..."
                    className={inputClass}
                  />
                </div>
                <p className="mt-1 text-[11px] text-gray-400">
                  Use an https:// link. Leave empty for the default photo.
                </p>
              </div>

              <button
                type="submit"
                disabled={saving}
                className="w-full bg-[#f07b42] hover:bg-[#e06a35] text-white py-3.5 rounded-full font-bold uppercase text-xs tracking-wider shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {saving ? (
                  "Saving..."
                ) : (
                  <>
                    <Save size={16} /> Save Changes
                  </>
                )}
              </button>
            </form>
          </div>
        )}

        {/* My Events (created) */}
        {tab === "created" && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <SectionTitle>Events you created ({created.length})</SectionTitle>
              {created.length > 0 && (
                <Link
                  href="/events/manage"
                  className="text-xs font-bold uppercase tracking-wider text-[#0b3c3d] dark:text-emerald-400 hover:underline"
                >
                  Edit or delete
                </Link>
              )}
            </div>

            {created.length === 0 ? (
              <EmptyState
                icon={CalendarPlus}
                title="No Created Events"
                text="You haven't organized any community events yet."
                href="/events/create"
                cta="Create Your First Event"
              />
            ) : (
              created.map((event) => (
                <EventRow key={event._id} event={event}>
                  <ViewLink id={event._id} />
                </EventRow>
              ))
            )}
          </div>
        )}

        {/* Joined Events */}
        {tab === "joined" && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <SectionTitle>
                Events you joined ({stats.joinedEvents.length})
              </SectionTitle>
              {stats.joinedEvents.length > 0 && (
                <Link
                  href="/events/joined"
                  className="text-xs font-bold uppercase tracking-wider text-[#0b3c3d] dark:text-emerald-400 hover:underline"
                >
                  Leave an event
                </Link>
              )}
            </div>

            {stats.joinedEvents.length === 0 ? (
              <EmptyState
                icon={CalendarCheck}
                title="No Registered Events"
                text="You haven't registered to participate in any community initiatives yet."
                href="/events"
                cta="Explore Upcoming Events"
              />
            ) : (
              stats.joinedEvents.map((event) => (
                <EventRow key={event._id} event={event}>
                  <ViewLink id={event._id} />
                </EventRow>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
