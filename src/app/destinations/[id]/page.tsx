import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import {
  ArrowLeft,
  Calendar,
  Check,
  MapPin,
  Star,
} from 'lucide-react';

import EditDestinationsDialog from '@/components/EditDestinationsDialog';
import DeleteDestinationDialog from '@/components/DeleteDestinationDialog';
import BookingCard from '@/components/booking/BookingCard';
import type { Destination } from '@/lib/types';
import { getTokenFromServer } from '@/lib/getTokenFromServer';

async function DestinationDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
// const jwtToken = await auth.api.getToken({
// headers: await headers(),
// })
const token = await getTokenFromServer()
  const res = await fetch(`${process.env.SERVER_URL}/destination/${id}`,{
    headers: {
      authorization: `Bearer ${token}`,
    }
  });

  if (!res.ok) {
    notFound();
  }

  const destination: Destination = await res.json();
  const title = destination.destinationName ?? destination.name ?? 'Untitled destination';
  const highlights = destination.highlights ?? [];

  return (
    <section className="w-full bg-background px-6 py-8">
      <div className="mx-auto max-w-7xl">
        {/* Top bar */}
        <div className="flex items-center justify-between">
          <Link
            href="/destinations"
            className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-4" />
            Back to Destinations
          </Link>
          <div className="flex items-center gap-2">
           
            <EditDestinationsDialog destination = {destination}/>
            <DeleteDestinationDialog id = {id}/>
           
          </div>
        </div>

        {/* Hero image */}
        <div className="relative mt-4 h-64 w-full overflow-hidden rounded-lg md:h-96">
          {destination.imageUrl ? (
            <Image
              src={destination.imageUrl}
              alt={title}
              fill
              priority
              sizes="(max-width: 1280px) 100vw, 1280px"
              className="object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-muted text-sm text-muted-foreground">
              No image available
            </div>
          )}
        </div>

        {/* Content */}
        <div className="mt-14 grid gap-10 lg:grid-cols-[minmax(0,1fr)_300px]">
          {/* Left column */}
          <div>
            <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <MapPin className="size-3.5" />
              {destination.country}
            </p>

            <h1 className="mt-2 text-4xl font-light tracking-tight text-foreground md:text-5xl">
              {title}
            </h1>

            {(destination.rating !== undefined || destination.duration) && (
              <div className="mt-3 flex flex-wrap items-center gap-3 text-sm">
                {destination.rating !== undefined && (
                  <>
                    <span className="flex items-center gap-1.5">
                      <Star className="size-4 fill-green-600 text-green-600" />
                      <span className="font-semibold text-foreground">
                        {destination.rating}
                      </span>
                      <span className="text-muted-foreground">
                        ({destination.reviews ?? 0} reviews)
                      </span>
                    </span>
                    <span aria-hidden className="h-4 w-px bg-border" />
                  </>
                )}
                {destination.duration && (
                  <span className="flex items-center gap-1.5 font-semibold text-foreground">
                    <Calendar className="size-4 text-muted-foreground" />
                    {destination.duration}
                  </span>
                )}
              </div>
            )}

            <h2 className="mt-8 text-xl font-medium text-foreground">
              Overview
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              {destination.description}
            </p>

            {highlights.length > 0 && (
              <>
                <h2 className="mt-8 text-xl font-medium text-foreground">
                  Highlights
                </h2>
                <ul className="mt-4 grid gap-x-10 gap-y-3 sm:grid-cols-2">
                  {highlights.map((highlight) => (
                    <li
                      key={highlight}
                      className="flex items-start gap-2 text-sm text-foreground"
                    >
                      <Check className="mt-0.5 size-4 shrink-0 text-green-600" />
                      {highlight}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>

          {/* Booking sidebar */}
        <BookingCard destination={destination} />
        </div>
      </div>
    </section>
  );
}

function DestinationDetailsSkeleton() {
  return (
    <section className="w-full bg-background px-6 py-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-center justify-between">
          <div className="h-4 w-40 animate-pulse rounded-md bg-muted" />
          <div className="flex gap-2">
            <div className="h-8 w-20 animate-pulse rounded-lg bg-muted" />
            <div className="h-8 w-24 animate-pulse rounded-lg bg-muted" />
          </div>
        </div>
        <div className="mt-4 h-64 w-full animate-pulse rounded-lg bg-muted md:h-96" />
        <div className="mt-14 grid gap-10 lg:grid-cols-[minmax(0,1fr)_300px]">
          <div>
            <div className="h-3 w-24 animate-pulse rounded-md bg-muted" />
            <div className="mt-3 h-10 w-72 max-w-full animate-pulse rounded-md bg-muted" />
            <div className="mt-8 h-5 w-32 animate-pulse rounded-md bg-muted" />
            <div className="mt-3 h-4 w-full max-w-2xl animate-pulse rounded-md bg-muted" />
            <div className="mt-2 h-4 w-2/3 max-w-xl animate-pulse rounded-md bg-muted" />
          </div>
          <div className="h-64 animate-pulse rounded-xl border border-border bg-muted/50" />
        </div>
      </div>
    </section>
  );
}

export default async function DestinationDetailsPage({
  params,
}: PageProps<'/destinations/[id]'>) {
  return (
    <main>
      <Suspense fallback={<DestinationDetailsSkeleton />}>
        <DestinationDetails params={params} />
      </Suspense>
    </main>
  );
}
