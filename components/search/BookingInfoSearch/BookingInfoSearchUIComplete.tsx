"use client";

import { useState } from "react";
import AdultsNumberInput from "./SearchComponents/AdultsNumberInput";
import { DatePickerWithRange } from "./DatePickerWithRange";
import { searchParamsType } from "@/app/page";

type BookingInfoUISearchCompleteProps = {
  bookingInfo: searchParamsType;
  setBookingInfo: (info: searchParamsType) => void;
};

const BookingInfoUISearchComplete: React.FC<
  BookingInfoUISearchCompleteProps
> = ({ bookingInfo, setBookingInfo }) => {
  const [isDateValid, setIsDateValid] = useState(true);
  const [isValid, setIsValid] = useState(true);

  const handleDateChange = (dates: {
    checkinDate: string;
    checkoutDate: string;
    numDays: number;
  }) => {
    const { checkinDate, checkoutDate, numDays } = dates;
    if (isDateValid) {
      setIsDateValid(true);
      setBookingInfo({
        ...bookingInfo,
        checkinDate,
        checkoutDate,
        numDays,
      });
    } else {
      setIsDateValid(false);
    }
  };

  const handleAdultsNumberChange = (adults: number | null) => {
    if (adults !== null && adults >= 1) {
      // Ensure `adultsNumber` is always valid (e.g., minimum 1 adult)
      setIsValid(true);
      setBookingInfo({
        ...bookingInfo,
        adultsNumber: adults,
      });
    } else {
      setIsValid(false);
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
            selectedNumber={bookingInfo.adultsNumber}
            onChange={handleAdultsNumberChange}
          />
          {!isValid && (
            <p className="text-red-500 text-sm mt-1">
              Adults number is invalid. Please enter a valid number.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingInfoUISearchComplete;
