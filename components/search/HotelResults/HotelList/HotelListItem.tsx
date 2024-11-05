import { APIHotelSearchHotelInfo } from "@/app/api/hotels/search/route";
import { CUSTOM_HOTEL_SLUG_URL } from "@/lib/rapid-hotel-api/api-setup";
import Image from "next/image";
import Link from "next/link";
import { calculateNumDays } from "@/lib/DateFunctions";
import { bookingParamsType } from "../HotelSelect";

type HotelListItemProps = {
  hotel: APIHotelSearchHotelInfo;
  bookingParams: bookingParamsType;
};

const HotelListItem: React.FC<HotelListItemProps> = ({
  hotel,
  bookingParams,
}) => {
  const CustomHotelLink = CUSTOM_HOTEL_SLUG_URL.replace(
    "{hotelId}",
    hotel.hotel_id
  );
  const numDays = calculateNumDays(
    bookingParams.checkin_date,
    bookingParams.checkout_date
  );
  const finalBookingParams = new URLSearchParams({
    checkin_date: bookingParams.checkin_date,
    checkout_date: bookingParams.checkout_date,
    adults_number: bookingParams.adults_number.toString(),
    numDays: numDays.toString(),
    locale: bookingParams.locale,
    domain: bookingParams.domain,
    region_id: bookingParams.region_id,
    hotel_id: hotel.hotel_id,
  });

  return (
    <Link href={`${CustomHotelLink}?${finalBookingParams.toString()}`}>
      <li className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow mb-4 cursor-pointer">
        <strong className="text-lg font-semibold text-gray-800">
          {hotel.name}
        </strong>
        <div className="flex items-center mt-2">
          <Image
            src={hotel.image.url}
            alt={hotel.image.alt ?? hotel.image.description ?? ""}
            width={100}
            height={100}
            className="w-20 h-20 rounded-lg mr-4 object-cover"
          />
          <div>
            <p className="text-sm text-gray-600">
              Review Score: {hotel.reviews.score} ({hotel.reviews.totalReviews}{" "}
              reviews)
            </p>
            <p className="text-sm text-gray-600">
              Custom URL (for testing only): {CustomHotelLink}
            </p>
          </div>
        </div>
        <p className="text-sm text-gray-500 mt-2">
          Duration of stay: {numDays} {numDays > 1 ? "nights" : "night"}
        </p>
      </li>
    </Link>
  );
};

export default HotelListItem;
