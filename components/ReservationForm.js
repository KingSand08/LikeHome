import { useRouter } from 'next/router';
import { useState } from 'react';

function ReservationForm({ userId, roomId }) {
    const router = useRouter();
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [guests, setGuests] = useState(1);

    const handleSubmit = async (event) => {
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
                <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
            </label>
            <label>
                End Date:
                <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} required />
            </label>
            <label>
                Guests:
                <input type="number" value={guests} onChange={(e) => setGuests(e.target.value)} min="1" required />
            </label>
            <button type="submit">Reserve Now</button>
        </form>
    );
}

export default ReservationForm;
