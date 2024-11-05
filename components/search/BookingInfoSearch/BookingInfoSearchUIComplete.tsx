"use client";
import BookingDateRange from "./BookingDateRange";
import AdultsNumberInput from "./SearchComponents/AdultsNumberInput";
import BookingInfoDisplay from "../Testing/BookingInfoDisplay";
import { calculateNumDays } from "../../../lib/DateFunctions";

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
  const handleDateChange = (dates: {
    checkinDate: string;
    checkoutDate: string;
  }) => {
    const checkinDate = new Date(dates.checkinDate);
    const checkoutDate = new Date(dates.checkoutDate);

    setBookingInfo({
      ...bookingInfo,
      checkinDate: dates.checkinDate,
      checkoutDate: dates.checkoutDate,
      numDays: calculateNumDays(checkinDate, checkoutDate),
    });
  };

  const handleAdultsNumberChange = (adults: number) => {
    setBookingInfo({ ...bookingInfo, adultsNumber: adults });
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Booking Information</h2>

      {/* Display Current Booking Info */}
      <BookingInfoDisplay bookingInfo={bookingInfo} />

      {/* Booking Date Range Input */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-4">Booking Dates</h3>
        <BookingDateRange
          onChange={handleDateChange}
        />
      </div>

      {/* Adults Number Input */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">Number of Adults</h3>
        <AdultsNumberInput
          selectedNumber={bookingInfo.adultsNumber}
          onChange={handleAdultsNumberChange}
        />
      </div>
    </div>
  );
};

export default BookingInfoUISearchComplete;
