"use client";
import { useState, useEffect } from "react";
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
      <h2 className="text-2xl font-bold">Booking Information</h2>
      <div className="gap-5 join">
        <div className="join-item">
          <h3 className="text-primary font-semibold">Booking Dates</h3>
          <DatePickerWithRange
            bookingInfo={bookingInfo} // Use `tempBookingInfo` for updates
            onChange={handleDateChange}
            onValidationChange={setIsDateValid}
          />
        </div>
        <div className="join-item">
          <AdultsNumberInput
            selectedNumber={bookingInfo.adultsNumber} // Default to 1
            onChange={handleAdultsNumberChange}
          />
          {!isValid && (
            <p className="text-red-500 text-sm">
              Adults number is invalid. Please enter a valid number (at least 1).
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingInfoUISearchComplete;
