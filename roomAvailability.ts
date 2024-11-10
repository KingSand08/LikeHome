
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const prisma = new PrismaClient();

// Define schemas for input validation
const hotelRoomOffersParamsSchema = z.object({
  check_in: z.string(),
  check_out: z.string(),
  region_id: z.string(),
});

// POST handler for checking room availability
export async function POST(req: NextRequest) {
  try {
    // Parse and validate the request body
    const parsedBody = hotelRoomOffersParamsSchema.safeParse(await req.json());

    if (!parsedBody.success) {
      return NextResponse.json(
        { success: false, error: 'Invalid input data', details: parsedBody.error.errors },
        { status: 400 }
      );
    }

    const { check_in, check_out, region_id } = parsedBody.data;

    const checkInDate = new Date(check_in);
    const checkOutDate = new Date(check_out);

    // Check if the requested room is booked for the given dates
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
        return NextResponse.json({
          success: true,
          data: {
            room_id: availableRoom.hotel_room_id,
            isBooked: false,
            message: 'The requested room is booked, but another room is available',
          },
        });
      } else {
        return NextResponse.json({
          success: true,
          data: {
            room_id: region_id,
            isBooked: true,
            message: 'Room is already booked for the selected dates, and no alternative rooms are available',
          },
        });
      }
    }

    return NextResponse.json({
      success: true,
      data: {
        room_id: region_id,
        isBooked: false,
        message: 'Room is available',
      },
    });
  } catch (error) {
    console.error('Error checking room availability:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
