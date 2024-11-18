type BookingInfo = {
  checkinDate: string;
  checkoutDate: string;
  adultsNumber: number;
  numDays: number;
};

type BookingInfoDisplayProps = {
  bookingInfo: BookingInfo;
};

const BookingInfoDisplay: React.FC<BookingInfoDisplayProps> = ({
  bookingInfo,
}) => {
  return (
    <div className="mt-4 p-4 border rounded bg-gray-100">
      <h3 className="text-lg font-semibold mb-2 text-black">Booking Info Inputs</h3>
      <ul className="list-disc list-inside text-black">
        <li>
          <strong>Check-in Date:</strong> {bookingInfo.checkinDate || "N/A"}
        </li>
        <li>
          <strong>Check-out Date:</strong> {bookingInfo.checkoutDate || "N/A"}
        </li>
        <li>
          <strong>Number of Days (not including checkout day):</strong>{" "}
          {bookingInfo.numDays}
        </li>
        <li>
          <strong>Number of Adults:</strong> {bookingInfo.adultsNumber}
        </li>
      </ul>
    </div>
  );
};

export default BookingInfoDisplay;
