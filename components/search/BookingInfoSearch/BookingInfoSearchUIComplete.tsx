"use client";
import { useState } from "react";
import { generateDefaultDates } from "../APIs/GenerateDefaultDates";
import BookingDateRange from "./BookingDateRange";
import {
  DEFAULT_ADULTS_NUMBER,
  DEFAULT_BOOKING_NUM_DAYS,
} from "@/lib/rapid-hotel-api/zod/constants";
import AdultsNumberInput from "./SearchComponents/AdultsNumberInput";

const BookingInfoUISearchComplete: React.FC = () => {
  const { DEFAULT_CHECKIN_BOOKING_DATE, DEFAULT_CHECKOUT_BOOKING_DATE } =
    generateDefaultDates(DEFAULT_BOOKING_NUM_DAYS);

  const [bookingInfo, setBookingInfo] = useState<{
    checkinDate: string;
    checkoutDate: string;
    adultsNumber: number;
    numDays: number;
  }>({
    checkinDate: DEFAULT_CHECKIN_BOOKING_DATE,
    checkoutDate: DEFAULT_CHECKOUT_BOOKING_DATE,
    adultsNumber: DEFAULT_ADULTS_NUMBER,
    numDays: DEFAULT_BOOKING_NUM_DAYS,
  });

  const handleDateChange = (dates: {
    checkinDate: string;
    checkoutDate: string;
  }) => {
    const checkinDate = new Date(dates.checkinDate);
    const checkoutDate = new Date(dates.checkoutDate);

    setBookingInfo((prev) => ({
      ...prev,
      checkinDate: dates.checkinDate,
      checkoutDate: dates.checkoutDate,
      numDays: Math.ceil(
        (checkoutDate.getTime() - checkinDate.getTime()) / (1000 * 60 * 60 * 24)
      ),
    }));
  };

  // Update the adults number in the booking info state
  const handleAdultsNumberChange = (adults: number) => {
    setBookingInfo((prev) => ({ ...prev, adultsNumber: adults }));
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Booking Information</h2>

      {/* Inputs */}
      <div className="mt-4 p-4 border rounded bg-gray-100">
        <h3 className="text-lg font-semibold mb-2">Booking Info Inputs</h3>
        <ul className="list-disc list-inside text-black">
          <li>
            <strong>Check-in Date:</strong> {bookingInfo.checkinDate || "N/A"}
          </li>
          <li>
            <strong>Check-out Date:</strong> {bookingInfo.checkoutDate || "N/A"}
          </li>
          <li>
            <strong>Number of Days (not including checkout day):</strong> {bookingInfo.numDays}
          </li>
          <li>
            <strong>Number of Adults:</strong> {bookingInfo.adultsNumber}
          </li>
        </ul>
      </div>

      {/* Booking Date Range */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-4">Booking Dates</h3>
        <BookingDateRange
          numDays={DEFAULT_BOOKING_NUM_DAYS}
          onChange={handleDateChange}
        />
      </div>

      {/* Adults Number */}
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
