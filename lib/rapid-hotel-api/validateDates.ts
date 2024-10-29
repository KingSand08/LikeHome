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
