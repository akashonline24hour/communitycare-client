import { Suspense } from "react";
import EventDetailsClient from "@/components/EventDetailsClient";

export const metadata = {
  title: "Event Details | Hermione Community Events",
};

async function AsyncEventDetails({ params }) {
  const { id } = await params;
  return <EventDetailsClient eventId={id} />;
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
      <AsyncEventDetails params={params} />
    </Suspense>
  );
}
