"use client";

import React from "react";
import SidebarFilters from "./SidebarFilters";
import FilterButton from "./FilterButton";
import { searchParamsType } from "@/app/page";

type DrawerComponentProps = {
  hotelSearchInputs: searchParamsType;
  setHotelSearchInputs: (inputs: searchParamsType) => void;
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
        <label
          htmlFor="my-drawer"
          aria-label="close-sidebar"
          className="drawer-overlay"
        ></label>
        <SidebarFilters
          hotelSearchInputs={hotelSearchInputs}
          setHotelSearchInputs={setHotelSearchInputs}
        />
      </div>
    </div>
  );
};

export default DrawerComponent;
