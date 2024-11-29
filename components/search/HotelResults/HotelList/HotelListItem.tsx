import { APIHotelSearchHotelInfo } from "@/app/api/hotels/search/route";
import { CUSTOM_HOTEL_DETAILS_SLUG_URL } from "@/lib/rapid-hotel-api/constants/ROUTES";
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
  const CustomHotelLink = CUSTOM_HOTEL_DETAILS_SLUG_URL.replace(
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
      <div className="p-5 bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-200 mb-6 cursor-pointer border border-gray-200 hover:border-gray-300">
        <div className="flex items-start">
          <Image
            src={hotel.image.url ?? ""}
            alt={hotel.image.alt ?? hotel.image.description ?? ""}
            width={100}
            height={100}
            className="w-24 h-24 rounded-xl mr-6 object-cover"
          />
          <div className="flex-1">
            <strong className="text-xl font-semibold text-gray-900">
              {hotel.name}
            </strong>
            <p className="text-sm text-gray-700 mt-2">
              <span className="font-medium text-gray-900">Review Score: </span>
              {hotel.reviews.score}
              <span className="text-gray-500">
                {" "}
                ({hotel.reviews.totalReviews} reviews)
              </span>
            </p>
            <p className="text-sm text-gray-700 mt-2">
              <span className="font-medium text-gray-900">Starting at </span>
              {`${hotel.price.currency.symbol}${hotel.price.amount}`} per night
            </p>
            <p className="text-sm text-gray-700 mt-2">
              <span className="font-medium text-gray-900">Currency: </span>
              {`${hotel.price.currency.code}`}
            </p>
            <p className="text-xs text-gray-400 mt-3 italic">
              <span className="underline text-blue-500">Testing URL:</span>{" "}
              {CustomHotelLink}
            </p>
          </div>
        </div>
        <div className="flex justify-end mt-4">
          <p className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-lg">
            Duration of stay: <span className="font-medium">{numDays}</span>{" "}
            {numDays > 1 ? "nights" : "night"}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default HotelListItem;
