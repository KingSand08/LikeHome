import { db } from '../../../../utils/db'; // Adjust as per your DB utility path

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { reservationId } = req.query;

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
