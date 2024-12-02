"use client";

import { HotelRoomOffer } from "@/app/api/hotels/search/rooms/route";
import { calculateNumDays } from "@/lib/DateFunctions";
import { CUSTOM_HOTEL_ROOM_SLUG_URL } from "@/lib/rapid-hotel-api/constants/ROUTES";
import { JSONToURLSearchParams } from "@/lib/rapid-hotel-api/APIFunctions";
import {
  DEFAULT_DOMAIN,
  DEFAULT_LOCALE,
} from "@/lib/rapid-hotel-api/constants/USER_OPTIONS";
import { ImageSlider } from "@/components/ui/ImageSlider";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { toast } from "sonner";
import { retrieveAllReservations } from "@/server-actions/reservation-actions";
import { useSession } from "next-auth/react";
import { getOverlappingDaysInIntervals, toDate } from "date-fns";
type HotelRoomItemProps = {
  room: HotelRoomOffer;
};

const HotelRoomItem: React.FC<HotelRoomItemProps> = ({ room }) => {
  const searchParams = useSearchParams();
  const numDays = calculateNumDays(
    searchParams.get("checkin_date") ?? "",
    searchParams.get("checkout_date") ?? ""
  );
  // Construct final booking parameters JSON object
  const finalBookingParamsJSON = {
    checkin_date: searchParams.get("checkin_date") || "",
    checkout_date: searchParams.get("checkout_date") || "",
    adults_number: searchParams.get("adults_number") || "",
    numDays: numDays.toString(),
    locale: searchParams.get("locale") || DEFAULT_LOCALE, // Provide default if necessary
    domain: searchParams.get("domain") || DEFAULT_DOMAIN,
    region_id: searchParams.get("region_id") || "",
    hotel_id: room.hotel_id,
    hotel_room_id: room.hotel_room_id,
  };
  const urlParams = JSONToURLSearchParams(finalBookingParamsJSON);

  const CustomHotelRoomLink = CUSTOM_HOTEL_ROOM_SLUG_URL.replace(
    "{hotelId}",
    room.hotel_id
  ).replace("{roomId}", room.hotel_room_id);

  const router = useRouter();
  const path = usePathname();
  const { data: session } = useSession();

  const handleReserveClick = async () => {
    if (!session || !session.user.email) {
      toast(
        "You must be logged in to make a reservation. Try waiting a few seconds.",
        {
          action: {
            label: "Sign In",
            onClick: () =>
              router.push(
                "/signin?callbackUrl=" +
                encodeURIComponent(path + "?" + searchParams)
              ),
          },
        }
      );
      return;
    }
    // check if the user has any reservations on that date
    const reservations = await retrieveAllReservations(session.user.email);

    if (
      reservations.some(
        (reservation) =>
          !reservation.is_cancelled &&
          // check if date range overlaps
          getOverlappingDaysInIntervals(
            {
              start: toDate(finalBookingParamsJSON.checkin_date),
              end: toDate(finalBookingParamsJSON.checkout_date),
            },
            {
              start: toDate(reservation.checkin_date),
              end: toDate(reservation.checkout_date),
            }
          ) > 0 && reservation.hotel_id !== room.hotel_id
      )
    ) {
      toast("You already have a reservation in a different hotel", {
        action: {
          label: "View Reservation",
          onClick: () => router.push("/profile"),
        },
      });
      return;
    }

    router.push(`${CustomHotelRoomLink}?${urlParams}`);
  };

  return (
    <div className="flex flex-col gap-6 bg-slate-200 dark:bg-slate-800 rounded-box p-8 border-[2px] border-primary border-opacity-30 shadow">
      <div className="text-center text-base-content">
        <h2 className="text-2xl font-semibold">{room.name}</h2>
        <p
          className="text-lg text-base-content"
          dangerouslySetInnerHTML={{ __html: room.description }}
        ></p>
      </div>

      {/* Room Images */}
      <ImageSlider images={room.galleryImages || []} />

      {/* Pricing Section */}
      {room.pricePerNight.amount > 0 ? (
        <div className="text-center">
          <p className="text-3xl font-bold text-primary">
            {`${room.pricePerNight.currency.symbol}${(
              room.pricePerNight.amount * numDays
            ).toFixed(2)}`}
          </p>
          <p className="text-sm text-gray-400">
            Total for {numDays} {numDays === 1 ? "night" : "nights"}
          </p>
        </div>
      ) : (
        <div className="text-center">
          <p className="text-3xl font-bold text-gray-500">Unavailable</p>
        </div>
      )}

      {/* Reserve Button */}
      <div className="text-center">
        {room.pricePerNight.amount > 0 ? (
          <button className="btn btn-primary" onClick={handleReserveClick}>
            Reserve Now
          </button>
        ) : (
          <button className="btn btn-secondary" disabled>
            Unavailable
          </button>
        )}
      </div>
    </div>
  );
};

export default HotelRoomItem;
