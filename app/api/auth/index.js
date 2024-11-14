//File: pages/api/reservations/index.js
import { db } from '../../../lib/db';  //Database connection

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { userId, roomId, startDate, endDate, guests } = req.body;

    //Check if room is available for the selected dates
    const existingReservation = await db.collection('reservations').findOne({
      roomId,
      $or: [
        { startDate: { $lt: endDate }, endDate: { $gt: startDate } }
      ],
    });

    if (existingReservation) {
      return res.status(400).json({ message: 'Room is not available for the selected dates.' });
    }

    //Create a new reservation
    const newReservation = {
      userId,
      roomId,
      startDate,
      endDate,
      guests,
      status: 'confirmed',
      createdAt: new Date(),
    };

    const result = await db.collection('reservations').insertOne(newReservation);

    return res.status(201).json({ message: 'Reservation successful!', reservation: result.ops[0] });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
