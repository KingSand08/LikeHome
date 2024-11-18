export const generateBookingId = () => {
  return `BK${Date.now().toString(36).toUpperCase()}${Math.floor(
    Math.random() * 1000
  )
    .toString(36)
    .toUpperCase()}`;
};
