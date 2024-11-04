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
  DEFAULT_MEAL_PLAN_OPTIONS,
  DEFAULT_PAYMENT_TYPE_OPTIONS,
  DEFAULT_SORT_ORDER,
} from "@/lib/rapid-hotel-api/zod/constants";
import AmenitiesCheckbox from "./HotelSearchComponents/AmenitiesCheckbox";
import MealPlanCheckbox from "./HotelSearchComponents/MealPlanCheckbox";
import LodgingOptionsCheckbox from "./HotelSearchComponents/LodgingOptionsCheckbox";
import PaymentTypeCheckbox from "./HotelSearchComponents/PaymentTypeCheckBox";

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
  }>({
    accessibilityOptions: DEFAULT_ACCESSIBILITY_OPTIONS,
    amenitiesOptions: DEFAULT_AMENITIES_OPTIONS,
    mealPlanOptions: DEFAULT_MEAL_PLAN_OPTIONS,
    lodgingOptions: DEFAULT_LODGING_OPTIONS,
    paymentType: DEFAULT_PAYMENT_TYPE_OPTIONS,
    sortOrder: DEFAULT_SORT_ORDER,
    availableOnly: DEFAULT_AVAILABILITY_FILTER_OPTIONS,
  });

  // Output
  //   const [hotelSearchOutput, setHotelSearchOutput] =
  //     useState<APIHotelJSONFormatted[] | null>(null);
  //   const [loading, setLoading] = useState<boolean>(false);

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

  const handleSortOrderChange = (
    sortOrder: HotelSearchSortOrderOptionsType
  ) => {
    setHotelSearchInputs((prev) => ({ ...prev, sortOrder }));
  };

  const handleFindHotels = async () => {
    // setLoading(true);
    // try {
    //   const response = await HotelSearchAPI(hotelSearchInputs);
    //   if (response.hotels) {
    //     setHotelSearchOutput(response.hotels);
    //   } else {
    //     alert("Failed to fetch hotels: " + response?.error);
    //   }
    // } catch (error) {
    //   alert("An unexpected error occurred. Please try again.");
    // } finally {
    //   setLoading(false);
    // }
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
            <strong>Sort Order:</strong> {hotelSearchInputs.sortOrder || "N/A"}
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
        <div className="flex-1">
          <SortOrderDropdown
            selectedSortOrder={hotelSearchInputs.sortOrder}
            onChange={handleSortOrderChange}
          />
        </div>
      </div>

      {/* Find Hotels */}
      {/* <button
        onClick={handleFindHotels}
        className="mt-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        disabled={loading}
      >
        {loading ? "Loading..." : "Find Hotels"}
      </button> */}

      {/* Loading */}
      {/* {loading && <p className="mt-4 text-blue-600">Loading...</p>} */}

      {/* Output */}
      {/* {hotelSearchOutput && !loading && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Hotels Found</h3>
          <ul className="list-disc list-inside text-black">
            {hotelSearchOutput.map((hotel) => (
              <li key={hotel.hotel_id} className="mb-2">
                {hotel.name} - {hotel.address.city}
              </li>
            ))}
          </ul>
        </div>
      )} */}
    </div>
  );
};

export default HotelSearchUIComplete;
