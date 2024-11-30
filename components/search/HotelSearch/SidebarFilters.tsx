"use client";

import React, { useState } from "react";
import AccessibilityCheckbox from "./HotelSearchComponents/AccessibilityCheckbox";
import AmenitiesCheckbox from "./HotelSearchComponents/AmenitiesCheckbox";
import MealPlanCheckbox from "./HotelSearchComponents/MealPlanCheckbox";
import LodgingOptionsCheckbox from "./HotelSearchComponents/LodgingOptionsCheckbox";
import SortOrderDropdown from "./HotelSearchComponents/SortOrderDropdown";
import PriceRangeInput from "./HotelSearchComponents/PriceRangeInput";
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
import { searchParamsType } from "@/app/page";

type SidebarFiltersProps = {
  hotelSearchInputs: searchParamsType;
  setHotelSearchInputs: (inputs: searchParamsType) => void;
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
    if (
      window.confirm("Are you sure you want to reset all filters to default?")
    ) {
      setTempFilters((prev) => ({
        ...prev,
        accessibilityOptions: DEFAULT_ACCESSIBILITY_OPTIONS,
        amenitiesOptions: DEFAULT_AMENITIES_OPTIONS,
        mealPlanOptions: DEFAULT_MEAL_PLAN_OPTIONS,
        lodgingOptions: DEFAULT_LODGING_OPTIONS,
        paymentType: DEFAULT_PAYMENT_TYPE_OPTIONS,
        sortOrder: DEFAULT_SORT_ORDER,
        availableOnly: DEFAULT_AVAILABILITY_FILTER_OPTIONS,
        price_min: DEFAULT_MIN_PRICE,
        price_max: DEFAULT_MAX_PRICE,
      }));
    }
  };

  const areFiltersEqual = (
    filters1: searchParamsType,
    filters2: searchParamsType
  ): boolean => {
    return (
      filters1.accessibilityOptions === filters2.accessibilityOptions &&
      filters1.amenitiesOptions === filters2.amenitiesOptions &&
      filters1.mealPlanOptions === filters2.mealPlanOptions &&
      filters1.lodgingOptions === filters2.lodgingOptions &&
      filters1.paymentType === filters2.paymentType &&
      filters1.sortOrder === filters2.sortOrder &&
      filters1.availableOnly === filters2.availableOnly &&
      filters1.price_min === filters2.price_min &&
      filters1.price_max === filters2.price_max
    );
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
          disabled={areFiltersEqual(tempFilters, hotelSearchInputs)}
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
