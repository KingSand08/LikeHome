import { useEffect, useState } from 'react';

interface Reservation {
    id: string;
    roomId: string;
    startDate: string;
    endDate: string;
    guests: number;
    status: string;
}

interface UserReservationsProps {
    userId: string;
}

const UserReservations: React.FC<UserReservationsProps> = ({ userId }) => {
    const [reservations, setReservations] = useState<Reservation[]>([]);

    useEffect(() => {
        async function fetchReservations() {
            try {
                const res = await fetch(`/api/reservations/${userId}`);
                if (!res.ok) throw new Error('Failed to fetch reservations');
                
                const data: Reservation[] = await res.json();
                setReservations(data);
            } catch (error) {
                console.error('Error fetching reservations:', error);
            }
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
};

export default UserReservations;

