import React from "react";
import { IoIosCheckmark } from "react-icons/io";

interface PriceSummaryProps {
  costPerNight: number;
  numNights: number;
}

const PriceSummary = () => {
  return (
    <div className="flex justify-end flex-col text-right p-2">
      <p>$149 per night</p>
      <p>$338 total</p>
      <div className="flex flex-row gap-2 text-green-500">
        <IoIosCheckmark />
        <p>All taxes and fees included in total</p>
      </div>
    </div>
  );
};

export default PriceSummary;
