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
      </div>
      <div className="join-item">
        <button
          onClick={handleApplyFilters}
          className="btn btn-primary w-1/2"
          disabled={!isValid || !isDateValid || bookingInfo === tempBookingInfo}
        >
          Apply
        </button>
      </div>
    </div>
  );
};

export default BookingInfoUISearchComplete;
