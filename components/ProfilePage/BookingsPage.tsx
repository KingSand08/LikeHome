"use client";

import { useState, useEffect } from "react";
import { Reservation, CachedHotel, CachedHotelRoomOffer } from "@prisma/client";
import { retrieveAllReservations } from "@/server-actions/reservation-actions";
import {
    retrieveCacheHotelDetails,
    retrieveCacheHotelRoomOffer,
} from "@/server-actions/cache-actions";
import Link from "next/link";
import User from "@/types/User";
import { ImageSlider } from "../ui/ImageSlider";

type CachedData = {
    hotels: Record<string, CachedHotel>;
    roomOffers: Record<string, CachedHotelRoomOffer>;
};

const Bookings = ({ user }: { user: User }) => {
    const userEmail = user.email;

    const [reservations, setReservations] = useState<Reservation[]>([]);
    const [cachedData, setCachedData] = useState<CachedData>({
        hotels: {},
        roomOffers: {},
    });

    useEffect(() => {
        if (userEmail) {
            const fetchReservations = async () => {
                try {
                    const reservationsData = await retrieveAllReservations(userEmail);

                    if (reservationsData) {
                        const hotelsCache: Record<string, CachedHotel> = {};
                        const roomOffersCache: Record<string, CachedHotelRoomOffer> = {};

                        for (const reservation of reservationsData) {
                            if (!hotelsCache[reservation.hotel_id]) {
                                const hotelDetails = await retrieveCacheHotelDetails(
                                    reservation.hotel_id
                                );
                                if (hotelDetails) {
                                    hotelsCache[reservation.hotel_id] = hotelDetails;
                                }
                            }

                            if (!roomOffersCache[reservation.room_id]) {
                                const roomOffer = await retrieveCacheHotelRoomOffer(
                                    reservation.room_id
                                );
                                if (roomOffer) {
                                    roomOffersCache[reservation.room_id] = roomOffer;
                                }
                            }
                        }

                        setReservations(reservationsData);
                        setCachedData({ hotels: hotelsCache, roomOffers: roomOffersCache });
                    }
                } catch (error) {
                    console.error("Error fetching reservations:", error);
                }
            };

            fetchReservations();
        }
    }, [userEmail]);

    return (
        <div className="p-4 sm:p-6">
            <h1 className="text-xl sm:text-2xl font-bold mb-6">Your Reservations</h1>
            <div className="overflow-x-auto">
                {reservations.length > 0 ? (
                    <div className="flex flex-wrap gap-6 justify-center sm:justify-start">
                        {reservations.map((reservation) => {
                            const hotel = cachedData.hotels[reservation.hotel_id];
                            const roomOffer = cachedData.roomOffers[reservation.room_id];
                            const images =
                                roomOffer?.galleryImages.slice(0, 5).map(({ url, description }) => ({
                                    url,
                                    description: description || "Sample Image",
                                }));

                            return (
                                <div
                                    key={reservation.id}
                                    className="w-full max-w-sm max-[1300px]:max-w-full flex-shrink-0 bg-white dark:bg-slate-800 shadow-xl rounded-lg overflow-hidden border-[3px] border-gray-200 dark:border-[#313f57]"
                                >
                                    {/* Hotel Tagline */}
                                    <div className="text-center bg-gradient-to-r from-blue-800 to-indigo-600 text-white p-4">
                                        <h2 className="text-lg font-bold">
                                            {hotel?.tagline || "Hotel details not available"}
                                        </h2>
                                    </div>

                                    {/* Room Images */}
                                    <div className="px-3 pt-4">
                                        <ImageSlider images={images || []} />
                                    </div>

                                    {/* Details Section */}
                                    <div className="p-4 flex flex-col gap-2">
                                        <p className="text-sm font-medium">
                                            Room:{" "}
                                            <span className="text-gray-700 dark:text-gray-400">
                                                {roomOffer?.name || "Room details not available"}
                                            </span>
                                        </p>

                                        <p className="text-sm font-medium">
                                            Check-in:{" "}
                                            <span className="text-info font-semibold">
                                                {reservation.checkin_date}
                                            </span>
                                        </p>
                                        <p className="text-sm font-medium">
                                            Check-out:{" "}
                                            <span className="text-info font-semibold">
                                                {reservation.checkout_date}
                                            </span>
                                        </p>

                                        <p className="text-lg font-bold text-success">
                                            Total Cost: ${reservation.room_cost.toFixed(2)}
                                        </p>
                                    </div>

                                    {/* Booking Details Button */}
                                    <div className="p-4 bg-gray-50 dark:bg-slate-900">
                                        <Link
                                            href={`/bookings/${reservation.id}`}
                                            className="btn btn-primary w-full text-sm sm:text-base"
                                        >
                                            View Booking Details
                                        </Link>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <p className="text-lg text-gray-600 dark:text-gray-400 text-center my-7">
                        You have no bookings! Go to <Link href={"/"} className="underline">home and search</Link> to get another booking!
                    </p>
                )}
            </div>
        </div>
    );
};

export default Bookings;
