import { hotelRoomOffersParamsBasicSchema } from "./hotel-room-offers-schemas";

export const API_HOTEL_DETAILS_URL =
  "https://hotels-com-provider.p.rapidapi.com/v2/hotels/details" as const;

export const hotelDetailsParamsSchema = hotelRoomOffersParamsBasicSchema.pick({
  hotel_id: true,
  locale: true,
  domain: true,
});
