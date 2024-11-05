"use client";
import {
  HotelsSearchAccessibilityOptionsType,
  HotelSearchSortOrderOptionsType,
  HotelsSearchAmenitiesOptionsType,
  HotelsSearchMealPlanOptionsType,
  HotelsSearchAvailableFilterOptionsType,
  HotelsSearchLodgingOptionsType,
  HotelsSearchPaymentTypeOptionsType,
} from "@/lib/rapid-hotel-api/zod/hotel-search-schemas";
import AccessibilityCheckbox from "./HotelSearchComponents/AccessibilityCheckbox";
import SortOrderDropdown from "./HotelSearchComponents/SortOrderDropdown";
import AmenitiesCheckbox from "./HotelSearchComponents/AmenitiesCheckbox";
import MealPlanCheckbox from "./HotelSearchComponents/MealPlanCheckbox";
import LodgingOptionsCheckbox from "./HotelSearchComponents/LodgingOptionsCheckbox";
import PaymentTypeCheckbox from "./HotelSearchComponents/PaymentTypeCheckBox";
import PriceRangeInput from "./HotelSearchComponents/PriceRangeInput";
import HotelSearchDisplay from "../Testing/HotelSearchDisplay";

type HotelSearchInputs = {
  accessibilityOptions: HotelsSearchAccessibilityOptionsType[];
  amenitiesOptions: HotelsSearchAmenitiesOptionsType[];
  mealPlanOptions: HotelsSearchMealPlanOptionsType[];
  lodgingOptions: HotelsSearchLodgingOptionsType[];
  paymentType: HotelsSearchPaymentTypeOptionsType[];
  sortOrder: HotelSearchSortOrderOptionsType;
  availableOnly: HotelsSearchAvailableFilterOptionsType[];
  price_min: number;
  price_max: number;
};

export type HotelSearchUICompleteProps = {
  hotelSearchInputs: HotelSearchInputs;
  setHotelSearchInputs: (inputs: HotelSearchInputs) => void;
};

const HotelSearchUIComplete: React.FC<HotelSearchUICompleteProps> = ({
  hotelSearchInputs,
  setHotelSearchInputs,
}) => {
  // Handlers for updating each section of the state
  const handleAccessibilityChange = (
    options: HotelsSearchAccessibilityOptionsType[]
  ) => {
    setHotelSearchInputs({
      ...hotelSearchInputs,
      accessibilityOptions: options,
    });
  };

  const handleAmenitiesChange = (
    options: HotelsSearchAmenitiesOptionsType[]
  ) => {
    setHotelSearchInputs({ ...hotelSearchInputs, amenitiesOptions: options });
  };

  const handleMealPlanChange = (options: HotelsSearchMealPlanOptionsType[]) => {
    setHotelSearchInputs({ ...hotelSearchInputs, mealPlanOptions: options });
  };

  const handleLodgingChange = (options: HotelsSearchLodgingOptionsType[]) => {
    setHotelSearchInputs({ ...hotelSearchInputs, lodgingOptions: options });
  };

  const handlePaymentTypeChange = (
    options: HotelsSearchPaymentTypeOptionsType[]
  ) => {
    setHotelSearchInputs({ ...hotelSearchInputs, paymentType: options });
  };

  const handlePriceRangeChange = (priceRange: {
    price_min: number | null;
    price_max: number | null;
  }) => {
    setHotelSearchInputs({
      ...hotelSearchInputs,
      price_min: priceRange.price_min ?? hotelSearchInputs.price_min,
      price_max: priceRange.price_max ?? hotelSearchInputs.price_max,
    });
  };

  const handleSortOrderChange = (
    sortOrder: HotelSearchSortOrderOptionsType
  ) => {
    setHotelSearchInputs({ ...hotelSearchInputs, sortOrder });
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Hotel Search</h2>

      {/* Display current hotel search inputs */}
      <HotelSearchDisplay
        hotelSearchInputs={{
          accessibilityOptions: hotelSearchInputs.accessibilityOptions,
          amenitiesOptions: hotelSearchInputs.amenitiesOptions,
          mealPlanOptions: hotelSearchInputs.mealPlanOptions,
          lodgingOptions: hotelSearchInputs.lodgingOptions,
          paymentType: hotelSearchInputs.paymentType,
          availableOnly: hotelSearchInputs.availableOnly,
          price_min: hotelSearchInputs.price_min,
          price_max: hotelSearchInputs.price_max,
          sortOrder: hotelSearchInputs.sortOrder,
        }}
      />

      {/* Interactive Inputs */}
      <div className="flex flex-row justify-between space-x-4">
        <div className="flex-1">
          <AccessibilityCheckbox
            selectedOptions={hotelSearchInputs.accessibilityOptions}
            onChange={handleAccessibilityChange}
          />
        </div>
        <div className="flex-1">
          <AmenitiesCheckbox
            selectedOptions={hotelSearchInputs.amenitiesOptions}
            onChange={handleAmenitiesChange}
          />
        </div>
      </div>
      <div className="flex flex-row justify-between space-x-4">
        <div className="flex-1">
          <MealPlanCheckbox
            selectedOptions={hotelSearchInputs.mealPlanOptions}
            onChange={handleMealPlanChange}
          />
        </div>
        <div className="flex-1">
          <LodgingOptionsCheckbox
            selectedOptions={hotelSearchInputs.lodgingOptions}
            onChange={handleLodgingChange}
          />
        </div>
      </div>
      <div className="flex flex-row justify-between space-x-4">
        <div className="flex-1">
          <PaymentTypeCheckbox
            selectedOptions={hotelSearchInputs.paymentType}
            onChange={handlePaymentTypeChange}
          />
        </div>
        <PriceRangeInput
          selectedPriceRange={{
            price_min: hotelSearchInputs.price_min,
            price_max: hotelSearchInputs.price_max,
          }}
          onChange={handlePriceRangeChange}
        />
      </div>
      <SortOrderDropdown
        selectedSortOrder={hotelSearchInputs.sortOrder}
        onChange={handleSortOrderChange}
      />
    </div>
  );
};

export default HotelSearchUIComplete;
