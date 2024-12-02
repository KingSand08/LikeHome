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

  const handleRevertChanges = () => {
    const confirmRevert = window.confirm(
      "Are you sure you want to revert your booking changes?"
    );
    if (confirmRevert) {
      setTempBookingInfo(bookingInfo);
      setBookingInfo(tempBookingInfo);
    }
  };

  return (
    <div>
      <h2 className="max-[800px]:text-lg text-2xl font-bold">Booking Information</h2>
      <div className="gap-5 join">
        <div className="join-item">
          <h3 className="text-primary font-semibold text-base max-[800px]:text-sm">Booking Dates</h3>
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
      </div>
      {(bookingInfo.checkinDate !== tempBookingInfo.checkinDate ||
        bookingInfo.checkoutDate !== tempBookingInfo.checkoutDate ||
        bookingInfo.adultsNumber !== tempBookingInfo.adultsNumber) && (
          <div className="join-item flex gap-4">
            <button
              onClick={handleRevertChanges}
              className="btn btn-secondary w-1/2"
            >
              Revert changes
            </button>
            <button
              onClick={handleApplyFilters}
              className="btn btn-primary w-1/2"
              disabled={!isValid || !isDateValid}
            >
              Apply new booking info
            </button>
          </div>
        )}
    </div>
  );
};

export default BookingInfoUISearchComplete;
