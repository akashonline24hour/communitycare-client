import { Suspense } from "react";
import EventDetailsClient from "@/components/EventDetailsClient";

function EventDetailsWrapper({ params }) {
  return <AsyncEventDetails params={params} />;
}

async function AsyncEventDetails({ params }) {
  const resolvedParams = await params;
  const eventId = resolvedParams.id;
  return <EventDetailsClient eventId={eventId} />;
}

export default function EventDetailsPage({ params }) {
  return (
    <Suspense
      fallback={
        <div className="min-h-[75vh] flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-[#0b3c3d] border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <EventDetailsWrapper params={params} />
    </Suspense>
  );
}
