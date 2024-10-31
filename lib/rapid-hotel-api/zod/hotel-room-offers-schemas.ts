// Hotel Room Offers API
// https://rapidapi.com/tipsters/api/hotels-com-provider/playground/apiendpoint_513f7e8b-520e-465d-8aca-f50cc42e6969
import { z } from "zod";
import {
  refinePriceAndDateValidationZod,
  dateFormatSchema,
  adultsNumberSchema,
  childrenAgesSchema,
} from "./hotel-search-schemas";
import { localeSchema, domainSchema } from "./region-search-schemas";

export const API_HOTEL_ROOM_OFFERS_URL =
  "https://hotels-com-provider.p.rapidapi.com/v2/hotels/offers" as const;

export const hotelRoomOffersParamsSchema = refinePriceAndDateValidationZod(
  z.object({
    // Required
    checkin_date: dateFormatSchema,
    checkout_date: dateFormatSchema,
    adults_number: adultsNumberSchema,
    hotel_id: z.string().min(1, "The 'hotel_id' is required."),

    // Required, but provided default values
    locale: localeSchema,
    domain: domainSchema,

    // Optional
    children_ages: childrenAgesSchema,
  })
);
