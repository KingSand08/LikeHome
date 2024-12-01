import React from 'react'
import HotelRoomList from '../booking/HotelRooms/HotelRoomList'
import { APIHotelRoomOffersJSONFormatted } from '@/app/api/hotels/search/rooms/route'

const RoomOffers: React.FC<{ hotelRooms: APIHotelRoomOffersJSONFormatted }> = ({ hotelRooms }) => {
    return (
        <>
            <div className="mb-8 bg-gradient-to-r from-slate-700 to-slate-600 shadow-lg rounded-xl p-6">
                <h2 className="text-2xl font-semibold mb-4 text-white">Room Offers</h2>
                {hotelRooms ? (
                    <div>
                        <p className="text-slate-200 mb-6 font-bold">
                            Base Price Per Night:{" "}
                            <span className="font-semibold">
                                {hotelRooms.basePricePerNight}
                            </span>
                        </p>
                        <div>
                            <h3 className="text-xl text-slate-200 font-semibold mb-4">Room List</h3>
                            <HotelRoomList rooms={hotelRooms.hotelRoomOffers} />
                        </div>
                    </div>
                ) : (
                    <p className="text-gray-100">No rooms available</p>
                )}
            </div>
        </>
    )
}

export default RoomOffers