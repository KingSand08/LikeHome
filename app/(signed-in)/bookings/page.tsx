import { PartialReservation, retrieveAllReservations } from "@/server-actions/reservation-actions";
import Link from "next/link";
import { auth } from "@/auth";

const BookingsPage = async () => {
  const session = await auth();

  if (!session || !session.user?.email) {
    return <div>Please sign in to view your reservations.</div>;
  }
  const reservations = await retrieveAllReservations(session.user.email);

  if (!reservations || reservations.length === 0) {
    return <div>You have no reservations.</div>;
  }

  return (
    <div>
      <h1>Your Reservations</h1>
      <ul className="list-disc pl-6">
        {reservations.map((reservation: PartialReservation) => (
          <li key={reservation.bookingId} className="mb-4">
            <div>
              <strong>Booking ID:</strong> {reservation.bookingId}
            </div>
            <div>
              <strong>Hotel ID:</strong> {reservation.hotel_id}
            </div>
            <div>
              <strong>Room ID:</strong> {reservation.room_id}
            </div>
            <div>
              <strong>Check-in Date:</strong> {reservation.checkin_date}
            </div>
            <div>
              <strong>Check-out Date:</strong> {reservation.checkout_date}
            </div>
            <div>
              <strong>Number of Adults:</strong> {reservation.adults_number}
            </div>
            <div>
              <strong>Total Cost:</strong> ${reservation.room_cost.toFixed(2)}
            </div>
            <Link
              href={`/bookings/${reservation.bookingId}`}
              className="p-2 bg-green-500 text-white"
            >
              Link to specific booking
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookingsPage;
