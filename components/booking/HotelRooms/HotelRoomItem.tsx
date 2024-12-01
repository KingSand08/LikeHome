"use client";

import { HotelRoomOffer } from "@/app/api/hotels/search/rooms/route";
import { calculateNumDays } from "@/lib/DateFunctions";
import { CUSTOM_HOTEL_ROOM_SLUG_URL } from "@/lib/rapid-hotel-api/constants/ROUTES";
import { JSONToURLSearchParams } from "@/lib/rapid-hotel-api/APIFunctions";
import {
  DEFAULT_DOMAIN,
  DEFAULT_LOCALE,
} from "@/lib/rapid-hotel-api/constants/USER_OPTIONS";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

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

  return (
    <div className="flex flex-col gap-6 bg-base-200 rounded-box p-8 border border-primary shadow">
      <div className="text-center text-base-content">
        <h2 className="text-2xl font-semibold">{room.name}</h2>
        <p className="text-lg text-base-content" dangerouslySetInnerHTML={{ __html: room.description }}>
        </p>
      </div>

      {/* Room Images */}
      <div className="carousel carousel-center bg-neutral rounded-box space-x-4 h-96 p-4">
      {room.galleryImages.map((image) => (
          <div key={image.index} className="carousel-item">
            <Image
              src={image.url}
              alt={image.description}
              width={500}
              height={500}
              className="w-full h-auto rounded-lg"
            />
          </div>
        ))}
      </div>


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
          <Link href={`${CustomHotelRoomLink}?${urlParams}`}>
            <button className="btn btn-primary">Reserve Now</button>
          </Link>
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
