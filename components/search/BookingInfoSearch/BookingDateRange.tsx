"use client";
import {
  dateRegex,
  refinePriceAndDateValidationZod,
} from "@/lib/rapid-hotel-api/zod/hotel-search-schemas";
import React, { useState } from "react";
import { z } from "zod";
import { generateDefaultDates } from "../../../lib/DateFunctions";
import BookingDateInput from "./SearchComponents/BookingDateInput";
import { DEFAULT_BOOKING_NUM_DAYS } from "@/lib/rapid-hotel-api/constants/USER_OPTIONS";

// Date validation using Zod
const dateSchema = z.object({
  checkin_date: z.string().regex(dateRegex),
  checkout_date: z.string().regex(dateRegex),
});
const validatedDateSchema = refinePriceAndDateValidationZod(dateSchema);

type BookingDateRangeProps = {
  onChange: (dates: { checkinDate: string; checkoutDate: string }) => void;
};

const BookingDateRange: React.FC<BookingDateRangeProps> = ({
  onChange,
}) => {
  const { DEFAULT_CHECKIN_BOOKING_DATE, DEFAULT_CHECKOUT_BOOKING_DATE } =
    generateDefaultDates(DEFAULT_BOOKING_NUM_DAYS);

  const [dateRange, setDateRange] = useState<{
    checkinDate: string;
    checkoutDate: string;
  }>({
    checkinDate: DEFAULT_CHECKIN_BOOKING_DATE,
    checkoutDate: DEFAULT_CHECKOUT_BOOKING_DATE,
  });

  const [error, setError] = useState<string | null>(null);

  const validateDates = (checkinDate: string, checkoutDate: string) => {
    const validationResult = validatedDateSchema.safeParse({
      checkin_date: checkinDate,
      checkout_date: checkoutDate,
    });

    if (!validationResult.success) {
      setError(validationResult.error.errors[0].message);
      return false;
    }

    setError(null);
    return true;
  };

  const handleCheckinDateChange = (newCheckinDate: string) => {
    const newDateRange = { ...dateRange, checkinDate: newCheckinDate };
    setDateRange(newDateRange);
    if (validateDates(newCheckinDate, newDateRange.checkoutDate)) {
      onChange(newDateRange);
    }
  };

  const handleCheckoutDateChange = (newCheckoutDate: string) => {
    const newDateRange = { ...dateRange, checkoutDate: newCheckoutDate };
    setDateRange(newDateRange);
    if (validateDates(newDateRange.checkinDate, newCheckoutDate)) {
      onChange(newDateRange);
    }
  };

  return (
    <div>
      <div className="flex flex-row gap-2">
        <div className="flex-1">
          <BookingDateInput
            selectedDate={dateRange.checkinDate}
            onChange={handleCheckinDateChange}
            title="Check-in Date"
          />
        </div>
        <div className="flex-1">
          <BookingDateInput
            selectedDate={dateRange.checkoutDate}
            onChange={handleCheckoutDateChange}
            title="Check-out Date"
          />
        </div>
      </div>
      {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
    </div>
  );
};

export default BookingDateRange;
