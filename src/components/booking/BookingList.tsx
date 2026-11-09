import Link from "next/link";
import { Calendar, MapPin } from "lucide-react";

import type { Booking } from "@/lib/types";

function formatDate(value?: string) {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

const BookingList = ({ bookings }: { bookings: unknown }) => {
  const list = Array.isArray(bookings) ? (bookings as Booking[]) : [];

  return (
    <section className="w-full bg-background px-6 py-12">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-4xl font-light tracking-tight text-foreground md:text-5xl">
          My Bookings
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Manage all your booked travel experiences
        </p>

        {list.length === 0 ? (
          <p className="mt-12 text-sm text-muted-foreground">
            You have no bookings yet.{" "}
            <Link
              href="/destinations"
              className="font-medium text-teal-600 underline-offset-4 hover:underline"
            >
              Explore destinations
            </Link>{" "}
            to book your next trip.
          </p>
        ) : (
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((booking) => (
              <article
                key={booking._id}
                className="rounded-sm border border-border bg-white p-4 shadow-sm"
              >
                <h2 className="truncate text-lg font-semibold text-foreground">
                  {booking.destinationName ?? "Booked destination"}
                </h2>
                <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
                  <MapPin className="size-4" />
                  {booking.country ?? "—"}
                </p>
                <div className="mt-3 space-y-1.5 text-sm text-foreground">
                  <p className="flex items-center gap-1.5">
                    <Calendar className="size-4 text-muted-foreground" />
                    Departure: {formatDate(booking.departureDate)}
                  </p>
                  <p>
                    Booked on: {formatDate(booking.bookingData)} for{" "}
                    <span className="font-semibold text-teal-600">
                      ${booking.price ?? "—"}
                    </span>
                  </p>
                  <p className="text-muted-foreground">
                    Traveler: {booking.name ?? "Guest"} ({booking.email ?? "no email"})
                  </p>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default BookingList;
