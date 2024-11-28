import { APIHotelDetailsJSONFormatted } from "@/app/api/hotels/details/route";
import { APIHotelRoomOffersJSONFormatted } from "@/app/api/hotels/search/rooms/route";

export type CompleteHotelInfo = {
    hotelDetails: APIHotelDetailsJSONFormatted | null;
    hotelRooms: APIHotelRoomOffersJSONFormatted | null;
} | null;