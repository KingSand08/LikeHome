// File: index.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/utils/db'; // Ensure you have a database utility

interface ReservationRequestBody {
    userId: string;
    roomId: string;
    startDate: string;
    endDate: string;
    guests: number;
}

interface ReservationResponse {
    reservationId: string;
    totalAmount: number;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { userId, roomId, startDate, endDate, guests } = req.body as ReservationRequestBody;

        // Check room availability (this would be a custom function)
        const isAvailable = await db.checkRoomAvailability(roomId, startDate, endDate);
        
        if (!isAvailable) {
            return res.status(400).json({ error: 'Room is unavailable.' });
        }

        // Create a pending reservation
        const reservation = await db.createReservation({
            userId,
            roomId,
            startDate,
            endDate,
            guests,
            status: 'pending' // Initially set to pending
        });

        if (reservation) {
            const response: ReservationResponse = {
                reservationId: reservation.id,
                totalAmount: reservation.totalAmount
            };
            return res.status(200).json(response);
        } else {
            return res.status(500).json({ error: 'Failed to create reservation.' });
        }
    } else {
        // Handle any other HTTP method
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
