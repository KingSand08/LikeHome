// Hotel Room Offers API
// https://rapidapi.com/tipsters/api/hotels-com-provider/playground/apiendpoint_513f7e8b-520e-465d-8aca-f50cc42e6969

import { HotelTravelerBookingInfo } from "./hotel-search-types";

export const HOTEL_ROOM_OFFERS_URL = "https://hotels-com-provider.p.rapidapi.com/v2/hotels/offers" as const;

export interface HotelRoomOffers extends HotelTravelerBookingInfo {
  hotel_id: number;
}
