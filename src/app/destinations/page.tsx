import DestinationCard from "@/components/DestinationCard";
import React, { Suspense } from "react";

async function Destinations() {
  const res = await fetch(`${process.env.SERVER_URL}/destinations`);

  if (!res.ok) {
    throw new Error("Failed to fetch destinations");
  }

  const data = await res.json();

  return <DestinationCard destinations={data} />;
}

function DestinationsSkeleton() {
  return (
    <section className="w-full bg-background px-6 py-12">
      <div className="mx-auto max-w-7xl">
        <div className="h-12 w-96 max-w-full animate-pulse rounded-md bg-muted" />

        <div className="mt-4 h-4 w-72 max-w-full animate-pulse rounded-md bg-muted" />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-72 animate-pulse rounded-sm border border-border bg-muted/50"
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
      <Suspense fallback={<DestinationsSkeleton />}>
        <Destinations />
      </Suspense>
    </main>
  );
}