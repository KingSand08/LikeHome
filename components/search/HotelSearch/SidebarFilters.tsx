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
import React from "react";
import AccessibilityCheckbox from "./HotelSearchComponents/AccessibilityCheckbox";
import AmenitiesCheckbox from "./HotelSearchComponents/AmenitiesCheckbox";
import MealPlanCheckbox from "./HotelSearchComponents/MealPlanCheckbox";
import LodgingOptionsCheckbox from "./HotelSearchComponents/LodgingOptionsCheckbox";
import SortOrderDropdown from "./HotelSearchComponents/SortOrderDropdown";
import PriceRangeInput from "./HotelSearchComponents/PriceRangeInput";

type SidebarFiltersProps = {
  hotelSearchInputs: {
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
  setHotelSearchInputs: (inputs: any) => void;
};

const SidebarFilters: React.FC<SidebarFiltersProps> = ({
  hotelSearchInputs,
  setHotelSearchInputs,
}) => {
  return (
    <ul className="bg-base-200 text-base-content min-h-full w-80 p-4 z-auto">
      <li>
        <SortOrderDropdown
          selectedSortOrder={hotelSearchInputs.sortOrder}
          onChange={(sortOrder) =>
            setHotelSearchInputs({ ...hotelSearchInputs, sortOrder })
          }
        />
      </li>
      <li>
        <AccessibilityCheckbox
          selectedOptions={hotelSearchInputs.accessibilityOptions}
          onChange={(options) =>
            setHotelSearchInputs({ ...hotelSearchInputs, accessibilityOptions: options })
          }
        />
      </li>
      <li>
        <AmenitiesCheckbox
          selectedOptions={hotelSearchInputs.amenitiesOptions}
          onChange={(options) =>
            setHotelSearchInputs({ ...hotelSearchInputs, amenitiesOptions: options })
          }
        />
      </li>
      <li>
        <MealPlanCheckbox
          selectedOptions={hotelSearchInputs.mealPlanOptions}
          onChange={(options) =>
            setHotelSearchInputs({ ...hotelSearchInputs, mealPlanOptions: options })
          }
        />
      </li>
      <li>
        <LodgingOptionsCheckbox
          selectedOptions={hotelSearchInputs.lodgingOptions}
          onChange={(options) =>
            setHotelSearchInputs({ ...hotelSearchInputs, lodgingOptions: options })
          }
        />
      </li>
      <li>
        <PriceRangeInput
          selectedPriceRange={{
            price_min: hotelSearchInputs.price_min,
            price_max: hotelSearchInputs.price_max,
          }}
          onChange={(range) =>
            setHotelSearchInputs({
              ...hotelSearchInputs,
              price_min: range.price_min,
              price_max: range.price_max,
            })
          }
        />
      </li>

    </ul>
  );
};

export default SidebarFilters;
