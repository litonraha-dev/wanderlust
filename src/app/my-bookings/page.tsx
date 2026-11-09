import BookingList from "@/components/booking/BookingList";
import React, { Suspense } from "react";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

async function Bookings() {
  let bookings: unknown = [];

  try {
    const res = await fetch(`${API_BASE_URL}/booking`, {
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      bookings = await res.json();
    }
  } catch (error) {
    if (!(error instanceof TypeError)) {
      throw error;
    }
    // The server is unreachable; show the empty state below.
  }

  return <BookingList bookings={bookings} />;
}

function BookingsSkeleton() {
  return (
    <section className="w-full bg-background px-6 py-12">
      <div className="mx-auto max-w-7xl">
        <div className="h-12 w-80 max-w-full animate-pulse rounded-md bg-muted" />

        <div className="mt-4 h-4 w-64 max-w-full animate-pulse rounded-md bg-muted" />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="h-56 animate-pulse rounded-sm border border-border bg-muted/50"
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default function MyBookingsPage() {
  return (
    <main>
      <Suspense fallback={<BookingsSkeleton />}>
        <Bookings />
      </Suspense>
    </main>
  );
}
