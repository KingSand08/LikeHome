"use client";
import { useState } from "react";
import AdultsNumberInput from "./SearchComponents/AdultsNumberInput";
import { DatePickerWithRange } from "./DatePickerWithRange";

type BookingInfo = {
  checkinDate: string;
  checkoutDate: string;
  adultsNumber: number;
  numDays: number;
};

type BookingInfoUISearchCompleteProps = {
  bookingInfo: BookingInfo;
  setBookingInfo: (info: BookingInfo) => void;
};

const BookingInfoUISearchComplete: React.FC<
  BookingInfoUISearchCompleteProps
> = ({ bookingInfo, setBookingInfo }) => {
  const [tempBookingInfo, setTempBookingInfo] = useState(bookingInfo);
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
      <div className="gap-5">
        <h3 className="text-primary font-semibold">Booking Dates</h3>
        <DatePickerWithRange
          onChange={handleDateChange}
          defaultNumDays={tempBookingInfo.numDays}
        />
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
      <div className="mt-4 flex gap-2">
        <button
          onClick={handleApplyFilters}
          className="btn btn-primary w-1/2"
          disabled={!isValid}
        >
          Apply
        </button>
      </div>
    </div>
  );
};

export default BookingInfoUISearchComplete;
