import {
  DEFAULT_BOOKING_NUM_DAYS,
  DEFAULT_DAYS_FROM_TODAY_OFFSET,
} from "@/lib/rapid-hotel-api/constants/USER_OPTIONS";

// Format to YYYY-MM-DD
const formatDate = (date: Date): string => {
  return date.toISOString().split("T")[0];
};

export const generateDefaultDates = (
  numDaysBetween = DEFAULT_BOOKING_NUM_DAYS,
  daysFromToday = DEFAULT_DAYS_FROM_TODAY_OFFSET
): {
  DEFAULT_CHECKIN_BOOKING_DATE: string;
  DEFAULT_CHECKOUT_BOOKING_DATE: string;
  DEFAULT_NUM_DAYS: number;
} => {
  // Calculate checkinDate to be X daysFromToday from today's date
  const checkinDate = new Date();
  checkinDate.setDate(checkinDate.getDate() + daysFromToday);

  // Calculate checkoutDate to be numDaysBetween after checkinDate
  const checkoutDate = new Date(checkinDate);
  checkoutDate.setDate(checkinDate.getDate() + numDaysBetween);

  return {
    DEFAULT_CHECKIN_BOOKING_DATE: formatDate(checkinDate),
    DEFAULT_CHECKOUT_BOOKING_DATE: formatDate(checkoutDate),
    DEFAULT_NUM_DAYS: calculateNumDays(checkinDate, checkoutDate),
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
