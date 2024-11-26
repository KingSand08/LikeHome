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
    <div >
      <h2 className="text-2xl font-bold">Booking Information</h2>

      <div className="gap-5 join">
        {/* Booking Date Range Input */}
          <div className="join-item">
            <h3 className="text-lg font-semibold">Booking Dates</h3>
            <DatePickerWithRange
              onChange={handleDateChange} // Update parent state when date range changes
              defaultNumDays={bookingInfo.numDays} // Default number of days
            />
          </div>
          {/* Adults Number Input */}
          <div className="join-item">
            <AdultsNumberInput
              selectedNumber={bookingInfo.adultsNumber}
              onChange={handleAdultsNumberChange}
            />
          </div>
      </div>

    </div>
  );
};

export default BookingInfoUISearchComplete;
