// File: [reservationID].ts
import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../../utils/db'; // Adjust as per your DB utility path

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { reservationId } = req.query;

        // Ensure reservationId is a string
        if (typeof reservationId !== 'string') {
            return res.status(400).json({ error: 'Invalid reservation ID' });
        }

        // Update reservation status to confirmed
        const updatedReservation = await db.updateReservationStatus(reservationId, 'confirmed');

        if (updatedReservation) {
            return res.status(200).json({ message: 'Reservation confirmed' });
        } else {
            return res.status(400).json({ error: 'Failed to confirm reservation' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
