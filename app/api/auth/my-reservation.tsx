// File: pages/my-reservations.tsx
import UserReservations from '@/components/UserReservations';

export default function MyReservationsPage() {
  const userId: string = 'sample-user-id';  // In a real app, this would come from the authentication context

  return (
    <div>
      <h1>My Reservations</h1>
      <UserReservations userId={userId} />
    </div>
  );
}
