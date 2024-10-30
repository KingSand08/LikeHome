//File: components/UserReservations.js
import { useEffect, useState } from 'react';

export default function UserReservations({ userId }) {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    async function fetchReservations() {
      const res = await fetch(`/api/reservations/${userId}`);
      const data = await res.json();
      setReservations(data);
    }

    fetchReservations();
  }, [userId]);

  return (
    <div>
      <h2>Your Reservations</h2>
      {reservations.length === 0 ? (
        <p>No reservations yet.</p>
      ) : (
        <ul>
          {reservations.map((res) => (
            <li key={res.id}>
              Room {res.roomId} from {res.startDate} to {res.endDate}, Guests: {res.guests}
              {res.status === 'cancelled' && ' (Cancelled)'}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
