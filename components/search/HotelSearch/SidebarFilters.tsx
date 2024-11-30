"use client";

import React, { useState } from "react";
import AccessibilityCheckbox from "./HotelSearchComponents/AccessibilityCheckbox";
import AmenitiesCheckbox from "./HotelSearchComponents/AmenitiesCheckbox";
import MealPlanCheckbox from "./HotelSearchComponents/MealPlanCheckbox";
import LodgingOptionsCheckbox from "./HotelSearchComponents/LodgingOptionsCheckbox";
import SortOrderDropdown from "./HotelSearchComponents/SortOrderDropdown";
import PriceRangeInput from "./HotelSearchComponents/PriceRangeInput";
import {
  HotelsSearchAccessibilityOptionsType,
  HotelSearchSortOrderOptionsType,
  HotelsSearchAmenitiesOptionsType,
  HotelsSearchMealPlanOptionsType,
  HotelsSearchAvailableFilterOptionsType,
  HotelsSearchLodgingOptionsType,
  HotelsSearchPaymentTypeOptionsType,
} from "@/lib/rapid-hotel-api/zod/hotel-search-schemas";
import {
  DEFAULT_ACCESSIBILITY_OPTIONS,
  DEFAULT_AMENITIES_OPTIONS,
  DEFAULT_AVAILABILITY_FILTER_OPTIONS,
  DEFAULT_LODGING_OPTIONS,
  DEFAULT_MAX_PRICE,
  DEFAULT_MEAL_PLAN_OPTIONS,
  DEFAULT_MIN_PRICE,
  DEFAULT_PAYMENT_TYPE_OPTIONS,
  DEFAULT_SORT_ORDER,
} from "@/lib/rapid-hotel-api/constants/USER_OPTIONS";

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
  const [tempFilters, setTempFilters] = useState(hotelSearchInputs);
  const [isValid, setIsValid] = useState(true);

  const handleApplyFilters = () => {
    setHotelSearchInputs(tempFilters);
  };

  const handleResetFilters = () => {
    if (window.confirm("Are you sure you want to reset all filters?")) {
      setTempFilters({
        accessibilityOptions: DEFAULT_ACCESSIBILITY_OPTIONS,
        amenitiesOptions: DEFAULT_AMENITIES_OPTIONS,
        mealPlanOptions: DEFAULT_MEAL_PLAN_OPTIONS,
        lodgingOptions: DEFAULT_LODGING_OPTIONS,
        paymentType: DEFAULT_PAYMENT_TYPE_OPTIONS,
        sortOrder: DEFAULT_SORT_ORDER,
        availableOnly: DEFAULT_AVAILABILITY_FILTER_OPTIONS,
        price_min: DEFAULT_MIN_PRICE,
        price_max: DEFAULT_MAX_PRICE,
      });
    }
  };

  return (
    <div className="bg-base-200 text-base-content min-h-full w-80 p-4 z-auto flex flex-col">
      <ul className="flex-grow">
        <li>
          <SortOrderDropdown
            selectedSortOrder={tempFilters.sortOrder}
            onChange={(sortOrder) =>
              setTempFilters({ ...tempFilters, sortOrder })
            }
          />
        </li>
        <li>
          <AccessibilityCheckbox
            selectedOptions={tempFilters.accessibilityOptions}
            onChange={(options) =>
              setTempFilters({ ...tempFilters, accessibilityOptions: options })
            }
          />
        </li>
        <li>
          <AmenitiesCheckbox
            selectedOptions={tempFilters.amenitiesOptions}
            onChange={(options) =>
              setTempFilters({ ...tempFilters, amenitiesOptions: options })
            }
          />
        </li>
        <li>
          <MealPlanCheckbox
            selectedOptions={tempFilters.mealPlanOptions}
            onChange={(options) =>
              setTempFilters({ ...tempFilters, mealPlanOptions: options })
            }
          />
        </li>
        <li>
          <LodgingOptionsCheckbox
            selectedOptions={tempFilters.lodgingOptions}
            onChange={(options) =>
              setTempFilters({ ...tempFilters, lodgingOptions: options })
            }
          />
        </li>
        <li>
          <PriceRangeInput
            selectedPriceRange={{
              price_min: tempFilters.price_min,
              price_max: tempFilters.price_max,
            }}
            onChange={(range) => {
              let valid = true;
              setTempFilters((prev) => {
                const newPriceMin = range.price_min ?? prev.price_min;
                const newPriceMax = range.price_max ?? prev.price_max;

                if (range.price_min === null || range.price_max === null) {
                  valid = false;
                }

                return {
                  ...prev,
                  price_min: newPriceMin,
                  price_max: newPriceMax,
                };
              });
              setIsValid(valid);
            }}
          />
        </li>
      </ul>
      <div className="mt-4 flex gap-2">
        <button
          onClick={handleResetFilters}
          className="btn btn-warning w-1/2"
          disabled={tempFilters === hotelSearchInputs}
        >
          Reset
        </button>
        <button
          onClick={handleApplyFilters}
          className="btn btn-primary w-1/2"
          disabled={!isValid}
        >
          Apply
        </button>
      </div>
    </div>
  );
};

export default SidebarFilters;
