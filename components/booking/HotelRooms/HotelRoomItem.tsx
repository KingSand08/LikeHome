"use client";
import { HotelRoomOffer } from "@/app/api/hotels/search/rooms/route";
import { calculateNumDays } from "@/lib/DateFunctions";
import { CUSTOM_HOTEL_ROOM_SLUG_URL } from "@/lib/rapid-hotel-api/api-setup";
import { JSONToURLSearchParams } from "@/lib/rapid-hotel-api/APIFunctions";
import {
  DEFAULT_DOMAIN,
  DEFAULT_LOCALE,
} from "@/lib/rapid-hotel-api/constants";
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
    <div className="border rounded-lg p-4 shadow-md mb-4">
      <h2 className="text-xl font-semibold mb-2 text-black">{room.name}</h2>

      {/* Render the HTML description safely */}
      <div
        className="text-gray-700 mb-4"
        dangerouslySetInnerHTML={{ __html: room.description }}
      ></div>

      {/* Price Per Night Section */}
      <div className="text-lg font-medium text-black mb-4">
        Price per night: {room.pricePerNight.currency.symbol}
        {room.pricePerNight.amount} {room.pricePerNight.currency.code}
      </div>

      {/* Room ID */}
      <div className="text-sm text-gray-600 mb-4">
        Room ID: {room.hotel_room_id}
      </div>

      {/* Gallery Images */}
      <div className="grid grid-cols-2 gap-2 mb-4">
        {room.galleryImages.map((image) => (
          <div key={image.index} className="flex flex-col items-center">
            <Image
              src={image.url}
              alt={image.description}
              width={500}
              height={500}
              className="w-full h-auto rounded-lg"
            />
            <p className="text-sm text-gray-500 mt-1">{image.description}</p>
          </div>
        ))}
      </div>

      {/* Centered Custom Link and Reserve Now Button */}
      <div className="text-center">
        <Link href={`${CustomHotelRoomLink}?${urlParams}`}>
          <div
            className="inline-block bg-blue-600 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700 transition-colors"
            aria-label="Reserve Now"
          >
            Reserve Now
          </div>
        </Link>
      </div>
    </div>
  );
};

export default HotelRoomItem;
