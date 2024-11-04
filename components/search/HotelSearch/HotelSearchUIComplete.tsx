"use client";
import React, { useState } from "react";
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
} from "@/lib/rapid-hotel-api/zod/constants";
import AmenitiesCheckbox from "./HotelSearchComponents/AmenitiesCheckbox";
import MealPlanCheckbox from "./HotelSearchComponents/MealPlanCheckbox";
import LodgingOptionsCheckbox from "./HotelSearchComponents/LodgingOptionsCheckbox";
import PaymentTypeCheckbox from "./HotelSearchComponents/PaymentTypeCheckBox";
import PriceRangeInput from "./HotelSearchComponents/PriceRangeInput";

const HotelSearchUIComplete: React.FC = () => {
  // Inputs
  const [hotelSearchInputs, setHotelSearchInputs] = useState<{
    accessibilityOptions: HotelsSearchAccessibilityOptionsType[];
    amenitiesOptions: HotelsSearchAmenitiesOptionsType[];
    mealPlanOptions: HotelsSearchMealPlanOptionsType[];
    lodgingOptions: HotelsSearchLodgingOptionsType[];
    paymentType: HotelsSearchPaymentTypeOptionsType[];
    sortOrder: HotelSearchSortOrderOptionsType;
    availableOnly: HotelsSearchAvailableFilterOptionsType[];
    price_min: number;
    price_max: number;
  }>({
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

  // Handle state changes
  const handleAccessibilityChange = (
    options: HotelsSearchAccessibilityOptionsType[]
  ) => {
    setHotelSearchInputs((prev) => ({
      ...prev,
      accessibilityOptions: options,
    }));
  };
  const handleAmenitiesChange = (
    options: HotelsSearchAmenitiesOptionsType[]
  ) => {
    setHotelSearchInputs((prev) => ({ ...prev, amenitiesOptions: options }));
  };
  const handleMealPlanChange = (options: HotelsSearchMealPlanOptionsType[]) => {
    setHotelSearchInputs((prev) => ({ ...prev, mealPlanOptions: options }));
  };
  const handleLodgingChange = (options: HotelsSearchLodgingOptionsType[]) => {
    setHotelSearchInputs((prev) => ({ ...prev, lodgingOptions: options }));
  };
  const handlePaymentTypeChange = (
    options: HotelsSearchPaymentTypeOptionsType[]
  ) => {
    setHotelSearchInputs((prev) => ({ ...prev, paymentType: options }));
  };
  const handlePriceRangeChange = (priceRange: {
    price_min: number | null;
    price_max: number | null;
  }) => {
    setHotelSearchInputs((prev) => ({
      ...prev,
      price_min:
        priceRange.price_min !== null ? priceRange.price_min : prev.price_min,
      price_max:
        priceRange.price_max !== null ? priceRange.price_max : prev.price_max,
    }));
  };

  const handleSortOrderChange = (
    sortOrder: HotelSearchSortOrderOptionsType
  ) => {
    setHotelSearchInputs((prev) => ({ ...prev, sortOrder }));
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Hotel Search</h2>

      {/* Inputs */}
      <div className="mt-4 p-4 border rounded bg-gray-100">
        <h3 className="text-lg font-semibold mb-2">Hotel Search Inputs</h3>
        <ul className="list-disc list-inside text-black">
          <li>
            <strong>Accessibility Options:</strong>{" "}
            {hotelSearchInputs.accessibilityOptions.join(", ") || "N/A"}
          </li>
          <li>
            <strong>Amenities Options:</strong>{" "}
            {hotelSearchInputs.amenitiesOptions.join(", ") || "N/A"}
          </li>
          <li>
            <strong>Meal Plan Options:</strong>{" "}
            {hotelSearchInputs.mealPlanOptions.join(", ") || "N/A"}
          </li>
          <li>
            <strong>Lodging Options:</strong>{" "}
            {hotelSearchInputs.lodgingOptions.join(", ") || "N/A"}
          </li>
          <li>
            <strong>Payment Type Options:</strong>{" "}
            {hotelSearchInputs.paymentType.join(", ") || "N/A"}
          </li>
          <li>
            <strong>Availability Options:</strong>{" "}
            {hotelSearchInputs.availableOnly.join(", ") || "N/A"}
          </li>
          <li>
            <strong>Price Range:</strong> ${hotelSearchInputs.price_min} - $
            {hotelSearchInputs.price_max}
          </li>
          <li>
            <strong>Min Price:</strong> ${hotelSearchInputs.price_min}
          </li>
          <li>
            <strong>Max Price:</strong> ${hotelSearchInputs.price_max}
          </li>
          <li>
            <strong>Sort Order:</strong> {hotelSearchInputs.sortOrder}
          </li>
        </ul>
      </div>
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
