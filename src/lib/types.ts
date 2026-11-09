export type Destination = {
  _id: string;
  destinationName?: string;
  name?: string;
  country: string;
  category?: string;
  price: number | string;
  duration?: string;
  departureDate?: string;
  imageUrl?: string;
  description?: string;
  rating?: number;
  reviews?: number;
  highlights?: string[];
};

export type Booking = {
  _id: string;
  name?: string;
  email?: string;
  image?: string;
  destinationName?: string;
  country?: string;
  category?: string;
  price?: number | string;
  duration?: string;
  departureDate?: string;
  bookingData?: string;
};
