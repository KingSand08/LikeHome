"use client";

import React from "react";
import {
  HotelsSearchAccessibilityOptionsType,
  HotelSearchSortOrderOptionsType,
  HotelsSearchAmenitiesOptionsType,
  HotelsSearchMealPlanOptionsType,
  HotelsSearchAvailableFilterOptionsType,
  HotelsSearchLodgingOptionsType,
  HotelsSearchPaymentTypeOptionsType,
} from "@/lib/rapid-hotel-api/zod/hotel-search-schemas";
import SidebarFilters from "./SidebarFilters";
import FilterButton from "./FilterButton";

type DrawerComponentProps = {
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
  children: React.ReactNode;
};

const DrawerComponent: React.FC<DrawerComponentProps> = ({
  hotelSearchInputs,
  setHotelSearchInputs,
  children,
}) => {
  return (
    <div className="drawer">
      {/* Drawer Toggle */}
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />

      {/* Main Content */}
      <div className="drawer-content flex flex-col items-center justify-center">
        {/* Use the dynamic FilterButton */}
        <FilterButton />
        {children}
      </div>

      {/* Sidebar Content */}
      <div className="drawer-side z-50">
        <label htmlFor="my-drawer" aria-label="close-sidebar" className="drawer-overlay"></label>
        <SidebarFilters
          hotelSearchInputs={hotelSearchInputs}
          setHotelSearchInputs={setHotelSearchInputs}
        />
      </div>
    </div>
  );
};

export default DrawerComponent;
