// File: pages/api/reservations/[userId].ts
import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../lib/db';  // Database connection

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { userId } = req.query;

    if (req.method === 'GET') {
        // Ensure userId is a string
        if (typeof userId !== 'string') {
            return res.status(400).json({ error: 'Invalid user ID' });
        }

        const reservations = await db.collection('reservations').find({ userId }).toArray();
        return res.status(200).json(reservations);
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
