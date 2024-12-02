import React from "react";
import HotelRoomList from "../booking/HotelRooms/HotelRoomList";
import { APIHotelRoomOffersJSONFormatted } from "@/app/api/hotels/search/rooms/route";

const RoomOffers: React.FC<{ hotelRooms: APIHotelRoomOffersJSONFormatted }> = ({
  hotelRooms,
}) => {
  return (
    <>
      <div className="mb-8 bg-gradient-to-r from-slate-700 to-slate-600 shadow-lg rounded-xl p-6">
        {hotelRooms ? (
          <HotelRoomList rooms={hotelRooms.hotelRoomOffers} />
        ) : (
          <p className="text-gray-100">No rooms available</p>
        )}
      </div>
    </>
  );
};

export default RoomOffers;
