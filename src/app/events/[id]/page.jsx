import EventDetailsClient from "@/components/EventDetailsClient";

export default async function EventDetailsPage({ params }) {
  const resolvedParams = await params;
  const eventId = resolvedParams.id;

  return <EventDetailsClient eventId={eventId} />;
}