"use client";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { ArrowRight, Check } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { Form } from "@base-ui/react";
import type { FormEvent } from "react";
import type { Destination } from "@/lib/types";

const PERKS = [
  "Free cancellation up to 7 days",
  "Travel insurance included",
  "24/7 customer support",
];

const BookingCard = ({ destination }: { destination: Destination }) => {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const handleBooking = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const departureDate = formData.get("departureDate") as string;
    const data = {
      name: user?.name,
      email: user?.email,
      image: user?.image,
      ...destination,
      departureDate,
      bookingData: new Date(),
    };
    const res = await fetch(`${process.env.SERVER_URL}/booking`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const bookingData = await res.json();
    console.log(bookingData);
  };
  return (
    <div>
      <aside className="h-fit rounded-xl border border-border bg-card p-5 shadow-sm lg:sticky lg:top-8">
        <p className="text-xs text-muted-foreground">Starting from</p>
        <p className="mt-1 text-3xl font-semibold text-teal-600">
          ${destination.price}
        </p>
        <p className="mt-0.5 text-xs text-muted-foreground">per person</p>

        <Form onSubmit={handleBooking}>
          <Input
            type="date"
            name="departureDate"
            defaultValue={destination.departureDate}
            aria-label="Departure date"
            className="mt-5 bg-muted"
          />

          <Button type="submit" className="mt-3 w-full bg-teal-600 text-white hover:bg-teal-700">
            Book Now
            <ArrowRight data-icon="inline-end" />
          </Button>
        </Form>

        <ul className="mt-4 grid gap-2">
          {PERKS.map((perk) => (
            <li
              key={perk}
              className="flex items-start gap-2 text-xs text-foreground"
            >
              <Check className="mt-0.5 size-3.5 shrink-0 text-green-600" />
              {perk}
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
};

export default BookingCard;
