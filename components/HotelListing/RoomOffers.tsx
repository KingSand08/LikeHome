import React from 'react'
import HotelRoomList from '../booking/HotelRooms/HotelRoomList'
import { APIHotelRoomOffersJSONFormatted } from '@/app/api/hotels/search/rooms/route'

const RoomOffers: React.FC<{ hotelRooms: APIHotelRoomOffersJSONFormatted }> = ({ hotelRooms }) => {
    return (
        <>
            <div className="mb-8 bg-slate-300 dark:bg-slate-700 shadow-lg rounded-xl p-6">
                <h2 className="text-2xl font-semibold mb-4 text-base-content">Room Offers</h2>
                {hotelRooms ? (
                    <div>
                        <p className="text-base-content mb-6 font-bold">
                            Base Price Per Night:{" "}
                            <span className="font-semibold">
                                {hotelRooms.basePricePerNight}
                            </span>
                        </p>
                        <div>
                            <h3 className="text-xl text-base-content font-semibold mb-4">Room List</h3>
                            <HotelRoomList rooms={hotelRooms.hotelRoomOffers} />
                        </div>
                    </div>
                ) : (
                    <p className="text-base-content">No rooms available</p>
                )}
            </div>
        </>
    )
}

export default RoomOffers