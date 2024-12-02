"use client";

import { HotelRoomOffer } from "@/app/api/hotels/search/rooms/route";
import { calculateNumDays } from "@/lib/DateFunctions";
import { CUSTOM_HOTEL_ROOM_SLUG_URL } from "@/lib/rapid-hotel-api/constants/ROUTES";
import { JSONToURLSearchParams } from "@/lib/rapid-hotel-api/APIFunctions";
import {
  DEFAULT_DOMAIN,
  DEFAULT_LOCALE,
} from "@/lib/rapid-hotel-api/constants/USER_OPTIONS";
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
      <div className="carousel w-full rounded-box">
        {room.galleryImages.map((image, index) => (
        <div
            id={`slide${index + 1}`}
            key={index}
            className="carousel-item relative w-full"
          >
          <img
            src={image.url}
            alt={image.description || `Slide ${index + 1}`}
            className="w-full"
          />
          <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
            <a
              href={`#slide${index === 0 ? room.galleryImages.length : index}`}
              className="btn btn-circle"
            >
              ❮
            </a>
            <a
              href={`#slide${(index + 1) % room.galleryImages.length + 1}`}
              className="btn btn-circle"
            >
              ❯
            </a>
          </div>
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
