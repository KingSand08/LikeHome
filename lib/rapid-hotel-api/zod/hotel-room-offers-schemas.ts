// Hotel Room Offers API
// https://rapidapi.com/tipsters/api/hotels-com-provider/playground/apiendpoint_513f7e8b-520e-465d-8aca-f50cc42e6969
import { z } from "zod";
import {
  refinePriceAndDateValidationZod,
  hotelSearchParamsBasicSchema,
} from "./hotel-search-schemas";

export const API_HOTEL_ROOM_OFFERS_URL =
  "https://hotels-com-provider.p.rapidapi.com/v2/hotels/offers" as const;

export const hotelRoomOffersParamsBasicSchema = hotelSearchParamsBasicSchema
  .pick({
    checkin_date: true,
    checkout_date: true,
    adults_number: true,
    locale: true,
    domain: true,
  })
  .extend({
    hotel_id: z.string().min(1, "The 'hotel_id' is required."),
  });
export const hotelRoomOffersParamsRefinedSchema =
  refinePriceAndDateValidationZod(hotelRoomOffersParamsBasicSchema);

export const bookingInfoBasicSchema = hotelSearchParamsBasicSchema
  .pick({
    checkin_date: true,
    checkout_date: true,
    adults_number: true,
    region_id: true,
  })
  .extend({
    hotel_id: z.string().min(1, "The 'hotel_id' is required."),
    room_id: z.string().min(1, "The 'room_id' is required."),
    numDays: z.number(),
  });
export const bookingInfoRefinedSchema = refinePriceAndDateValidationZod(
  bookingInfoBasicSchema
);
