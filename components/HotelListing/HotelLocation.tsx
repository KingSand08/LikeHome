import React from "react";
import { APIHotelDetailsJSONFormatted } from "@/app/api/hotels/details/route";

const HotelLocation: React.FC<{ hotelDetails: APIHotelDetailsJSONFormatted }> = ({
  hotelDetails,
}) => {
  return (
    <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
      {/* Location Icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 16 16"
        className="w-5 h-5 text-primary mr-2"
      >
        <path d="M8 0a5.53 5.53 0 0 0-5.5 5.5c0 3.04 5.5 9.344 5.5 9.344s5.5-6.304 5.5-9.344A5.53 5.53 0 0 0 8 0zm0 7.7a2.2 2.2 0 1 1 0-4.4 2.2 2.2 0 0 1 0 4.4z" />
      </svg>

      {/* Address */}
      <div>
        {hotelDetails.location.address.addressLine}, {hotelDetails.location.address.city},{" "}
        {hotelDetails.location.address.province}, {hotelDetails.location.address.countryCode}
      </div>
    </div>
  );
};

export default HotelLocation;
