// File: pages/api/reservations/cancel/[reservationId].ts
import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../lib/db';  // Database connection

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { reservationId } = req.query;

  // Ensure reservationId is a string
  if (typeof reservationId !== 'string') {
    return res.status(400).json({ error: 'Invalid reservation ID' });
  }

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
