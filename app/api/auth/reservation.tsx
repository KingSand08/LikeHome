// File: pages/reservation.tsx
import ReservationForm from '@/components/ReservationForm';

export default function ReservationPage() {
  // Mock data for userId and roomId
  const userId = "123"; // Replace with actual user ID source (e.g., from auth context)
  const roomId = "456"; // Replace with actual room ID source (e.g., room context or route params)

  return (
    <div>
      <h1>Make a Reservation</h1>
      <ReservationForm userId={userId} roomId={roomId} />
    </div>
  );
}

