// Regex to validate dates in YYYY-MM-DD format
const dateRegex = /^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/;

// Validates the date format to ensure it matches YYYY-MM-DD.
export function validateDateFormat(
  date: string | null,
  searchParam: string
): string | null {
  if (!date) return null;
  if (!dateRegex.test(date)) {
    return `Invalid ${searchParam} format. Use YYYY-MM-DD. Use only numbers.`;
  }
  return null;
}

// Validates that the check-out date is the same as or after the check-in date.
export function validateDateRange(
  checkinDate: string | null,
  checkoutDate: string | null
): string | null {
  if (!checkinDate || !checkoutDate) return null;

  const checkin = new Date(checkinDate);
  const checkout = new Date(checkoutDate);

  if (checkout < checkin) {
    return "Check-out date must be after or the same as the check-in date.";
  }
  return null;
}

export function validateDateFormatAndDateRange(
  checkinDate: string | null,
  checkoutDate: string | null
): string[] | null {
  let errors: string[] = [];

  const checkinDateFormatError = validateDateFormat(
    checkinDate,
    "checkin_date"
  );
  const checkoutDateFormatError = validateDateFormat(
    checkoutDate,
    "checkout_date"
  );
  if (checkinDateFormatError) errors.push(checkinDateFormatError);
  if (checkoutDateFormatError) errors.push(checkoutDateFormatError);
  // Validate date range between check-in and check-out dates
  const dateRangeError = validateDateRange(checkinDate, checkoutDate);
  if (dateRangeError) errors.push(dateRangeError);

  return errors.length > 0 ? errors : null;
}
