//File: pages/api/reservations/cancel/[reservationId].js
import { db } from '../../../lib/db';  //Database connection

export default async function handler(req, res) {
  const { reservationId } = req.query;

  if (req.method === 'DELETE') {
    const result = await db.collection('reservations').updateOne(
      { _id: reservationId },
      { $set: { status: 'cancelled' } }
    );

    if (result.modifiedCount === 1) {
      return res.status(200).json({ message: 'Reservation cancelled successfully!' });
    } else {
      return res.status(404).json({ message: 'Reservation not found' });
    }
  } else {
    res.setHeader('Allow', ['DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
