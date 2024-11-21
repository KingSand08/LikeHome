"use client";
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

const BookingInfoUISearchComplete: React.FC<BookingInfoUISearchCompleteProps> = ({
  bookingInfo,
  setBookingInfo,
}) => {
  const handleDateChange = (dates: {
    checkinDate: string;
    checkoutDate: string;
    numDays: number;
  }) => {
    setBookingInfo({ ...bookingInfo, ...dates });
  };

  const handleAdultsNumberChange = (adults: number) => {
    setBookingInfo({ ...bookingInfo, adultsNumber: adults });
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Booking Information</h2>

      {/* Booking Date Range Input */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-4">Booking Dates</h3>
        <DatePickerWithRange
          onChange={handleDateChange} // Update parent state when date range changes
          defaultNumDays={bookingInfo.numDays} // Default number of days
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
