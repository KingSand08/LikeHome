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
      <div className="flex flex-row max-[800px]:flex-col w-full mb-6 shadow-lg rounded-lg overflow-hidden bg-slate-200 dark:bg-slate-700 cursor-pointer hover:shadow-xl transition-shadow duration-200 border-[2px] border-secondary border-opacity-30">
        {/* Image Section */}
        <div className="w-full min-[800px]:w-52 h-52 min-[800px]:h-50">
          <Image
            src={hotel.image.url}
            alt={hotel.image.alt ?? hotel.image.description ?? "Hotel Image"}
            width={200}
            height={200}
            className="h-full w-full object-cover sm:rounded-l-lg"
          />
        </div>

        {/* Content Section */}
        <div className="flex flex-col gap-4 p-4 sm:p-6 bg-slate-200 dark:bg-slate-700 flex-1">
          {/* Hotel Name and Review Section */}
          <div className="flex flex-col sm:flex-row justify-between">
            <p className="font-bold text-xl sm:text-2xl text-primary mb-2 sm:mb-0">
              {hotel.name}
            </p>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-base-content">
                {hotel.reviews.totalReviews} reviews
              </span>
              <span className="text-info font-bold text-xl min-[800px]:text-4xl">
                {hotel.reviews.score}
              </span>
            </div>
          </div>

          {/* Pricing and Duration Section */}
          <div className="flex flex-row max-[800px]:flex-col justify-between items-center min-[800px]:items-center text-center">
            <span className="font-medium text-lg min-[800px]:text-[1.1em] text-success">
              Starting at: {hotel.price.currency.symbol}
              {hotel.price.amount} / night
            </span>
            <p className="text-sm text-base-content mt-2 min-[800px]:mt-0">
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
