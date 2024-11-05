"use client";
import { DEFAULT_BOOKING_NUM_DAYS } from "@/lib/rapid-hotel-api/zod/constants";

// Format to YYYY-MM-DD
const formatDate = (date: Date): string => {
  return date.toISOString().split("T")[0];
};

export const generateDefaultDates = (
  numDays = DEFAULT_BOOKING_NUM_DAYS
): {
  DEFAULT_CHECKIN_BOOKING_DATE: string;
  DEFAULT_CHECKOUT_BOOKING_DATE: string;
} => {
  // Calculate checkinDate to be tomorrow from today's date
  const today = new Date();
  const checkinDate = new Date(today);
  checkinDate.setDate(today.getDate() + 1);

  // Calculate checkoutDate to be numDays from today's date
  const checkoutDate = new Date(checkinDate);
  checkoutDate.setDate(checkinDate.getDate() + numDays); // Don't include the last day (checkout day)

  return {
    DEFAULT_CHECKIN_BOOKING_DATE: formatDate(checkinDate),
    DEFAULT_CHECKOUT_BOOKING_DATE: formatDate(checkoutDate),
  };
};
