"use client";

import { useState, useEffect } from "react";
import AdultsNumberInput from "./SearchComponents/AdultsNumberInput";
import { DatePickerWithRange } from "./DatePickerWithRange";
import { searchParamsType } from "@/app/page";
import { cn } from "@/lib/utils";

type BookingInfoUISearchCompleteProps = {
  bookingInfo: searchParamsType;
  setBookingInfo: (info: searchParamsType) => void;
};

const BookingInfoUISearchComplete: React.FC<
  BookingInfoUISearchCompleteProps
> = ({ bookingInfo, setBookingInfo }) => {
  const [tempBookingInfo, setTempBookingInfo] = useState(bookingInfo);
  const [isDateValid, setIsDateValid] = useState(true);
  const [isValid, setIsValid] = useState(true);

  const handleDateChange = (dates: {
    checkinDate: string;
    checkoutDate: string;
    numDays: number;
  }) => {
    setTempBookingInfo((prev) => ({ ...prev, ...dates }));
  };

  const handleAdultsNumberChange = (adults: number | null) => {
    if (adults !== null) {
      setIsValid(true);
      setTempBookingInfo((prev) => ({ ...prev, adultsNumber: adults }));
    } else {
      setIsValid(false);
    }
  };

  const handleApplyFilters = () => {
    if (isValid) {
      setBookingInfo(tempBookingInfo);
    }
  };


  return (
    <div>
      <h2 className="text-2xl font-bold">Booking Information</h2>
      <div className="gap-5 join">
        <div className="join-item">
          <h3 className="text-primary font-semibold">Booking Dates</h3>
          <DatePickerWithRange
            bookingInfo={bookingInfo}
            onChange={handleDateChange}
            onValidationChange={setIsDateValid}
          />
        </div>
        <div className="join-item">
          <AdultsNumberInput
            selectedNumber={tempBookingInfo.adultsNumber}
            onChange={handleAdultsNumberChange}
          />
          {!isValid && (
            <p className="text-red-500 text-sm">
              Adults number is invalid. Please enter a valid number.
            </p>
          )}
        </div>
          <div className="join-item self-center">
            <button
              onClick={handleApplyFilters}
              className={cn("btn btn-primary w-full", ((!isValid || !isDateValid) || null) ? "btn-disabled " : "")}
            >
              Search
            </button>
          </div>
      </div>
    </div>
  );
};

export default BookingInfoUISearchComplete;
