import { searchParamsType } from "@/app/(test)/searchtest/page";
import RegionSearchDisplay from "./RegionSearchDisplay";
import BookingInfoDisplay from "./BookingInfoDisplay";
import HotelSearchDisplay from "./HotelSearchDisplay";

type SearchParamsDisplayProps = {
  searchParams: searchParamsType;
};

const SearchParamsDisplay: React.FC<SearchParamsDisplayProps> = ({
  searchParams,
}) => {
  return (
    <div className="container mx-auto p-4">
      <h3 className="text-lg font-semibold mb-4 text-white">
        Current Search Parameters
      </h3>

      {/* Region Search Display */}
      <RegionSearchDisplay
        regionSearchInputs={{
          query: searchParams.query,
          domain: searchParams.domain,
          locale: searchParams.locale,
        }}
        selectedRegionId={searchParams.selectedRegionId}
      />

      {/* Booking Info Display */}
      <BookingInfoDisplay
        bookingInfo={{
          checkinDate: searchParams.checkinDate,
          checkoutDate: searchParams.checkoutDate,
          adultsNumber: searchParams.adultsNumber,
          numDays: searchParams.numDays,
        }}
      />

      {/* Hotel Search Display */}
      <HotelSearchDisplay
        hotelSearchInputs={{
          accessibilityOptions: searchParams.accessibilityOptions,
          amenitiesOptions: searchParams.amenitiesOptions,
          mealPlanOptions: searchParams.mealPlanOptions,
          lodgingOptions: searchParams.lodgingOptions,
          paymentType: searchParams.paymentType,
          availableOnly: searchParams.availableOnly,
          price_min: searchParams.price_min,
          price_max: searchParams.price_max,
          sortOrder: searchParams.sortOrder,
        }}
      />
    </div>
  );
};

export default SearchParamsDisplay;
