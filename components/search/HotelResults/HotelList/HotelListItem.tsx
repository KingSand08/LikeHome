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
      {/* <div className="px-6 py-8 bg-blue-500/50 backdrop-blur-lg shadow-xl rounded-xl hover:bg-gradient-to-br hover:from-blue-700 hover:to-indigo-900 hover:text-white hover:shadow-2xl transition-transform duration-300 transform hover:-translate-y-1 mb-6 cursor-pointer hover:border-blue-200">
        <div className="flex items-start">
          <Image
            src={hotel.image.url}
            alt={hotel.image.alt ?? hotel.image.description ?? "Hotel image"}
            width={120}
            height={120}
            className="w-28 h-28 rounded-xl mr-6 object-cover shadow-xl"
          />
          <div className="flex-1">
            <h2 className="text-xl font-semibold text-base-content">
              {hotel.name}
            </h2>
            <p className="text-sm text-base-content mt-2">
              <span className="font-medium">Review Score: </span>
              {hotel.reviews.score}
              <span className="">
                {" "}
                ({hotel.reviews.totalReviews} reviews)
              </span>
            </p>
            <p className="text-sm text-base-content mt-2">
              <span className="font-medium">Starting at </span>
              {`${hotel.price.currency.symbol}${hotel.price.amount}`} per night
            </p>
            <p className="text-sm text-base-content mt-2">
              <span className="font-medium">Currency: </span>
              {`${hotel.price.currency.code}`}
            </p>
          </div>
        </div>
        <div className="flex justify-between items-center mt-4">
          <p className="text-xs text-base-content italic">
            <span className="underline text-base-content">Testing URL:</span>{" "}
            {CustomHotelLink}
          </p>
          <p className="text-sm text-base-content bg-base-200 bg-opacity-65 px-4 py-2 rounded-lg shadow">
            Duration of stay: <span className="font-medium">{numDays}</span>{" "}
            {numDays > 1 ? "nights" : "night"}
          </p>
        </div> */}
      <div className="flex w-full mb-6 shadow-lg rounded-box overflow-hidden cursor-pointer hover:shadow-xl transition-shadow duration-200 border border-secondary">
        {/* Left Side - Image */}
        <div className="w-48 h-48">
          <Image
            src={hotel.image.url}
            alt={hotel.image.alt ?? hotel.image.description ?? "Hotel Image"}
            width={200}
            height={200}
            className="h-full w-full object-cover rounded-l-box"
          />
        </div>

        {/* Right Side - Content */}
        <div className="flex flex-col gap-4 p-6 bg-base-200 rounded-r-box flex-1">
          {/* Hotel Name */}
          <span className="flex justify-between mb-auto">
            <p className="font-bold text-2xl text-primary ">{hotel.name}</p>
            {/* Review Section */}
            <span className="flex items-center space-x-2">
              <span className="text-base-content text-sm relative top-[6px]">
                {hotel.reviews.totalReviews} reviews
              </span>
              <span className="text-info font-bold text-4xl self-start">{hotel.reviews.score}</span>
            </span>
          </span>

          {/* Pricing */}
          <div className="flex justify-between mt-auto text-center">
            <span className="font-medium text-2xl text-success">
              Starting at: {hotel.price.currency.symbol}
              {hotel.price.amount} / night
            </span>
            <p className="text-sm text-base-content">
              Duration: <span className="font-medium">{numDays}</span>{" "}
              {numDays > 1 ? "nights" : "night"}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};


export default HotelListItem;
