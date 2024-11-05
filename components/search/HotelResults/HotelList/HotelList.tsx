import HotelListItem from "./HotelListItem";
import { APIHotelSearchJSONFormatted } from "@/app/api/hotels/search/route";
import { bookingParamsType } from "../HotelSelect";

type HotelListProps = {
  hotelsData: APIHotelSearchJSONFormatted;
  bookingParams: bookingParamsType;
};

const HotelList: React.FC<HotelListProps> = ({ hotelsData, bookingParams }) => {
  if (!hotelsData || hotelsData.properties.length === 0) {
    return <p className="text-red-500">No hotels found.</p>;
  }

  return (
    <div>
      <p className="text-white mb-2">
        Found {hotelsData.summary.matchedPropertiesSize} properties within price
        range: ${hotelsData.priceRange.minPrice} - $
        {hotelsData.priceRange.maxPrice}
      </p>
      <ul className="list-disc list-inside text-black">
        {hotelsData.properties.map((hotel) => (
          <HotelListItem
            key={hotel.hotel_id}
            hotel={hotel}
            bookingParams={bookingParams}
          />
        ))}
      </ul>
    </div>
  );
};

export default HotelList;
