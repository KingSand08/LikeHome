import HotelListItem from "./HotelListItem";
import { APIHotelSearchJSONFormatted } from "@/app/api/hotels/search/route";
import { bookingParamsType } from "../HotelSelect";
import { toast } from "sonner";


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
      <div className="list-disc list-inside text-black pt-4">
        {hotelsData.properties.map((hotel) => (
          <HotelListItem
            key={hotel.hotel_id}
            hotel={hotel}
            bookingParams={bookingParams}
          />
        ))}
      </div>
    </div>
  );
};

export default HotelList;
