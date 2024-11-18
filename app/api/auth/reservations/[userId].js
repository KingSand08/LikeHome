//File: pages/api/reservations/[userId].js
import { db } from '../../../lib/db';  //Database connection

export default async function handler(req, res) {
  const { userId } = req.query;

  if (req.method === 'GET') {
    const reservations = await db.collection('reservations').find({ userId }).toArray();
    return res.status(200).json(reservations);
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
