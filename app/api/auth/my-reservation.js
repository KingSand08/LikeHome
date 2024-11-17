//File: pages/my-reservations.js
import UserReservations from '../components/UserReservations';

export default function MyReservationsPage() {
  const userId = 'sample-user-id';  // You would likely get this from user authentication

  return (
    <div>
      <h1>My Reservations</h1>
      <UserReservations userId={userId} />
    </div>
  );
}
