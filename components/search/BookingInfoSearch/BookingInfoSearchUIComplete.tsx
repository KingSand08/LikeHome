"use client";

import { useState, useEffect } from "react";
import AdultsNumberInput from "./SearchComponents/AdultsNumberInput";
import { DatePickerWithRange } from "./DatePickerWithRange";
import { searchParamsType } from "@/app/page";
import { cn } from "@/lib/utils";
import LocationCombobox from "@/components/ui/location-combobox";

type BookingInfoUISearchCompleteProps = {
  bookingInfo: searchParamsType;
  setBookingInfo: (info: searchParamsType) => void;
  handleFindhotels: () => void;
};

const BookingInfoUISearchComplete: React.FC<
  BookingInfoUISearchCompleteProps
> = ({ bookingInfo, setBookingInfo, handleFindhotels }) => {
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
      handleFindhotels();
    }
  };


  return (
    <div>
      <h2 className="max-[900px]:text-lg text-2xl font-bold mb-5">
        Booking Information
      </h2>
      <div className="flex flex-wrap gap-5 items-stretch">
        {/* Booking Dates */}
        <div className="flex-1 flex flex-col">
          <h3 className="text-primary font-semibold text-base max-[900px]:text-sm mb-2">
            Booking Dates
          </h3>
          <DatePickerWithRange
            bookingInfo={bookingInfo}
            onChange={handleDateChange}
            onValidationChange={setIsDateValid}
          />
        </div>
        {/* Number of Adults */}
        <div className="flex-1 flex flex-col">
          <h3 className="text-primary font-semibold text-base max-[900px]:text-sm mb-2">
            Number of Adults
          </h3>
          <AdultsNumberInput
            selectedNumber={tempBookingInfo.adultsNumber}
            onChange={handleAdultsNumberChange}
          />
          {!isValid && (
            <p className="text-red-500 text-sm mt-1">
              Adults number is invalid. Please enter a valid number.
            </p>
          )}
        </div>
      </div>
      {/* Search Button */}
      <div className="my-5">
        <button
          onClick={handleApplyFilters}
          className={cn(
            "btn btn-primary w-full",
            (!isValid || !isDateValid) && "btn-disabled"
          )}
        >
          Search
        </button>
      </div>
  
      {/* Booking Dates */}
      <div className="flex-1 min-w-[250px]">
        <h3 className="text-primary font-semibold text-base max-[900px]:text-sm mb-2">
          Booking Dates
        </h3>
        <DatePickerWithRange
          bookingInfo={bookingInfo}
          onChange={handleDateChange}
          onValidationChange={setIsDateValid}
        />
      </div>
  
      {/* Number of Adults */}
      <div className="flex-1 min-w-[150px]">
        <h3 className="text-primary font-semibold text-base max-[900px]:text-sm mb-2">
          Number of Adults
        </h3>
        <AdultsNumberInput
          selectedNumber={tempBookingInfo.adultsNumber}
          onChange={handleAdultsNumberChange}
        />
      </div>
    </div>
  
    {/* Search Button */}
    <div className="my-5 flex justify-center">
      <button
        onClick={handleApplyFilters}
        className={cn(
          "btn btn-primary w-full md:w-1/2 lg:w-1/3",
          (!isValid || !isDateValid) && "btn-disabled"
        )}
      >
        Search
      </button>
    </div>
  </div>
  
  );
};

export default BookingInfoUISearchComplete;
