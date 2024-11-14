const RAPIDAPI_HOTEL_API_KEY = process.env.RAPIDAPI_HOTEL_API_KEY || "";

export const API_OPTIONS: RequestInit = {
  method: "GET",
  headers: {
    "x-rapidapi-key": RAPIDAPI_HOTEL_API_KEY,
    "x-rapidapi-host": "hotels-com-provider.p.rapidapi.com",
  },
  cache: "no-store",
};

export function buildURLSearchParams(
  validatedData: Record<string, any>
): URLSearchParams {
  const combinedSearchParams = new URLSearchParams();

  Object.entries(validatedData).forEach(([key, value]) => {
    if (value !== undefined) {
      combinedSearchParams.append(
        key,
        Array.isArray(value)
          ? value.join(",")
          : encodeURIComponent(value.toString())
      );
    }
  });

  return combinedSearchParams;
}

export type validateSearchParamsOutput = {
  query: string | null;
  endpoint: string | null;
  error?: string | null;
};

// Payment System and Reservations/Bookings
export type FINAL_PAYMENT_INFO = {
  firstName: string;
  lastName: string;
  billingAddress: string;
  city: string;
  state: string;
  zipCode: string;
  email: string;
};

export type FINAL_STRIPE_TRANSACTION_INFO = {
  dateCreated: string;
  bookingId: string;
  stripePaymentId: string;
};

export type FINAL_BOOKING_INFO = {
  checkin_date: string;
  checkout_date: string;
  adults_number: string;
  numDays: string;
  hotel_id: string;
  room_id: string;
  payment_info: FINAL_PAYMENT_INFO;
  transaction_info: FINAL_STRIPE_TRANSACTION_INFO;
};
