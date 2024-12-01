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
