import {
  DEFAULT_BOOKING_NUM_DAYS,
  DEFAULT_DAYS_FROM_TODAY,
} from "@/lib/rapid-hotel-api/constants/USER_OPTIONS";

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
  // Calculate checkinDate to be X DEFAULT_DAYS_FROM_TODAY from today's date
  const today = new Date();
  const checkinDate = new Date(today);
  checkinDate.setDate(today.getDate() + DEFAULT_DAYS_FROM_TODAY);

  // Calculate checkoutDate to be numDays from today's date
  const checkoutDate = new Date(checkinDate);
  checkoutDate.setDate(checkinDate.getDate() + numDays); // Don't include the last day (checkout day)

  return {
    DEFAULT_CHECKIN_BOOKING_DATE: formatDate(checkinDate),
    DEFAULT_CHECKOUT_BOOKING_DATE: formatDate(checkoutDate),
  };
};

export const calculateNumDays = (
  checkinDate: Date | string,
  checkoutDate: Date | string
): number => {
  // Convert to Date if the input is a string
  const checkin =
    typeof checkinDate === "string" ? new Date(checkinDate) : checkinDate;
  const checkout =
    typeof checkoutDate === "string" ? new Date(checkoutDate) : checkoutDate;

  // Calculate the number of days
  return Math.ceil(
    (checkout.getTime() - checkin.getTime()) / (1000 * 60 * 60 * 24)
  );
};
