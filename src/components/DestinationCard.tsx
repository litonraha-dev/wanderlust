

import { Calendar, MapPin, Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import type { Destination } from '@/lib/types';

const DestinationCard = ({destinations}: { destinations: Destination[] }) => {
    console.log(destinations,"from destinationCARD")
    
    return (
        <section className="w-full bg-background px-6 py-12">
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <h1 className="text-4xl font-light tracking-tight text-foreground md:text-5xl">
          Explore All Destinations
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Find your perfect travel experience from our curated collection
        </p>


        {/* Count */}
        <p className="mt-5 text-sm text-muted-foreground">
          Showing {destinations.length} destinations
        </p>

        {/* Cards */}
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {destinations.map((destination) => (
            <article
              key={destination._id}
              className="rounded-sm border border-border bg-white p-3 shadow-sm"
            >
              {/* Image */}
              <div className="relative h-44 w-full overflow-hidden rounded-md">
                {destination.imageUrl ? (
                  <Image
                    src={destination.imageUrl}
                    alt={destination.destinationName ?? "Destination"}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center bg-muted text-sm text-muted-foreground">
                    No image available
                  </div>
                )}
                <span className="absolute top-2 right-2 flex items-center gap-1 rounded-md bg-white px-2 py-1 text-xs font-semibold shadow-sm">
                  {/* {rating(destination._id)} */}
                  <Star className="size-3 fill-black text-black" />
                </span>
              </div>

              {/* Details */}
              <div className="px-1 pt-3 pb-1">
                <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <MapPin className="size-4" />
                  {destination.country}
                </p>
                <div className="mt-1 flex items-baseline justify-between gap-2">
                  <h2 className="truncate text-lg font-semibold text-foreground">
                    {destination.destinationName}
                  </h2>
                  <p className="shrink-0 font-semibold text-foreground">
                    ${destination.price}
                    <span className="text-xs font-normal text-muted-foreground">
                      /Person
                    </span>
                  </p>
                </div>
                <p className="mt-1.5 flex items-center gap-1.5 text-sm text-muted-foreground">
                  <Calendar className="size-4" />
                  {destination.duration}
                </p>
               
               <Link
                  href={`/destinations/${destination._id}`}>
                Book Now</Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
        // <div>
        //     <h1>{destinationName}</h1>
        //     <h1>{country}</h1>
        //     <h1>{price}</h1>
        //     <h1>{duration}</h1>
        //     <Image src={imageUrl} alt={destinationName} height={50} width={50}></Image>
        // </div>
    );
};

export default DestinationCard;