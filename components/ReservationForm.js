//File: components/ReservationForm.js
import { useState } from 'react';

export default function ReservationForm() {
  const [formData, setFormData] = useState({
    roomId: '',
    startDate: '',
    endDate: '',
    guests: 1,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/reservations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    if (res.ok) {
      alert('Reservation Successful!');
    } else {
      alert(data.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Room ID:
        <input type="text" name="roomId" value={formData.roomId} onChange={handleChange} />
      </label>
      <label>
        Start Date:
        <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} />
      </label>
      <label>
        End Date:
        <input type="date" name="endDate" value={formData.endDate} onChange={handleChange} />
      </label>
      <label>
        Guests:
        <input type="number" name="guests" value={formData.guests} onChange={handleChange} />
      </label>
      <button type="submit">Reserve</button>
    </form>
  );
}
