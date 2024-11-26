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
import SidebarFilters from "./SidebarFilters";

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
    <div className="drawer lg:drawer-open">
      {/* Drawer Toggle */}
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      {/* Main Content */}
      <div className="drawer-content flex flex-col items-center justify-center">
        <label
          htmlFor="my-drawer-2"
          className="btn btn-primary drawer-button lg:hidden"
        >
          Open Filters
        </label>
        {children}
      </div>
      {/* Sidebar Content */}
      <div className="drawer-side">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
        <SidebarFilters
          hotelSearchInputs={hotelSearchInputs}
          setHotelSearchInputs={setHotelSearchInputs}
        />
      </div>
    </div>
  );
};

export default DrawerComponent;
