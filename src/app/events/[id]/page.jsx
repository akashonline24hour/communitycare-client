import EventDetailsClient from "@/components/EventDetailsClient";

const API = (process.env.NEXT_PUBLIC_API_URL || "").replace(/\/$/, "");

// Sets the browser tab title and description for each event
export async function generateMetadata({ params }) {
  const { id } = await params;

  try {
    const res = await fetch(`${API}/events/${id}`, { cache: "no-store" });
    if (!res.ok) return { title: "Event | Community Events" };

    const event = await res.json();
    return {
      title: `${event.title} | Community Events`,
      description: String(event.description || "").slice(0, 150),
    };
  } catch {
    return { title: "Event | Community Events" };
  }
}

export default async function EventDetailsPage({ params }) {
  const { id } = await params;
  return <EventDetailsClient eventId={id} />;
}
