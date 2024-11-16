import { useRouter } from 'next/router';
import { useState, FormEvent, ChangeEvent } from 'react';

// Define prop types for the component
interface ReservationFormProps {
    userId: string;
    roomId: string;
}

function ReservationForm({ userId, roomId }: ReservationFormProps) {
    const router = useRouter();
    const [startDate, setStartDate] = useState<string>('');
    const [endDate, setEndDate] = useState<string>('');
    const [guests, setGuests] = useState<number>(1);

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        const response = await fetch('/api/reservations', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                userId,
                roomId,
                startDate,
                endDate,
                guests,
            }),
        });

        const data = await response.json();
        if (response.ok) {
            // Redirect to payment page with reservationId and totalAmount
            router.push(`/payment?reservationId=${data.reservationId}&totalAmount=${data.totalAmount}`);
        } else {
            // Handle error (e.g., display error message)
            alert(data.error || 'Failed to create reservation');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Reserve This Room</h2>
            <label>
                Start Date:
                <input
                    type="date"
                    value={startDate}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setStartDate(e.target.value)}
                    required
                />
            </label>
            <label>
                End Date:
                <input
                    type="date"
                    value={endDate}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setEndDate(e.target.value)}
                    required
                />
            </label>
            <label>
                Guests:
                <input
                    type="number"
                    value={guests}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setGuests(Number(e.target.value))}
                    min="1"
                    required
                />
            </label>
            <button type="submit">Reserve Now</button>
        </form>
    );
}

export default ReservationForm;



