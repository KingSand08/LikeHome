import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Server script to handle room availability check
export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { check_in, check_out, region_id } = req.body;

      // Validate required fields
      if (!check_in || !check_out || !region_id) {
        return res.status(400).json({ message: 'Missing required fields: check_in, check_out, or region_id' });
      }

      const checkInDate = new Date(check_in);
      const checkOutDate = new Date(check_out);

      // Check if there are any overlapping bookings for the given room and dates
      const overlappingBookings = await prisma.booking.findMany({
        where: {
          hotel_room_id: region_id,
          AND: [
            {
              check_out: {
                gt: checkInDate,
              },
            },
            {
              check_in: {
                lt: checkOutDate,
              },
            },
          ],
        },
      });

      const isBooked = overlappingBookings.length > 0;

      if (isBooked) {
        // Find an alternative available room
        const availableRoom = await prisma.hotelRoom.findFirst({
          where: {
            hotel_room_id: {
              not: region_id,
            },
            bookings: {
              none: {
                AND: [
                  {
                    check_out: {
                      gt: checkInDate,
                    },
                  },
                  {
                    check_in: {
                      lt: checkOutDate,
                    },
                  },
                ],
              },
            },
          },
        });

        if (availableRoom) {
          return res.status(200).json({
            room_id: availableRoom.hotel_room_id,
            isBooked: false,
            message: 'The requested room is booked, but another room is available',
          });
        } else {
          return res.status(200).json({
            room_id: region_id,
            isBooked: true,
            message: 'Room is already booked for the selected dates, and no alternative rooms are available',
          });
        }
      }

      res.status(200).json({
        room_id: region_id,
        isBooked,
        message: 'Room is available',
      });
    } catch (error) {
      console.error('Error checking room availability:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
