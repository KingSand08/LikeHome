"use client";
import { z } from "zod";
import { hotelSearchParamsRefinedSchema } from "@/lib/rapid-hotel-api/zod/hotel-search-schemas";
import HotelSelect from "./HotelSelect"; // Import HotelSelect component

type HotelResultUICompleteProps = {
  bookingParams: z.infer<typeof hotelSearchParamsRefinedSchema>;
  validRegionId: boolean;
};

const HotelResultUIComplete: React.FC<HotelResultUICompleteProps> = ({
  bookingParams,
  validRegionId,
}) => {
  return (
    <div className="hotel-result-ui-complete">
      {/* Pass bookingParams to HotelSelect component */}
      <HotelSelect
        bookingParams={bookingParams}
        validRegionId={validRegionId}
      />
    </div>
  );
};

export default HotelResultUIComplete;
