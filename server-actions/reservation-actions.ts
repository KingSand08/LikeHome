"use server";
import { Reservation } from "@prisma/client";
import { auth } from "@/auth";
import { updatePoints } from "./user-actions";

type PartialReservation = Omit<Reservation, "userId" | "verified">;
const POINT_MODIFIER = 0.1;

async function createReservation({bookingId, checkin_date, checkout_date, adults_number, numDays, hotel_id, room_id, payment_info, transaction_info, room_cost}: PartialReservation) {
    const session = await auth();
    if (!session) {
        throw new Error("Unauthorized");
    }
    
    return prisma.reservation.create({
        data: {
            bookingId,
            checkin_date,
            checkout_date,
            adults_number,
            numDays,
            hotel_id,
            room_id,
            payment_info,
            transaction_info,
            room_cost,
            verified : false,
            userId: session.user.id
        }
    })
}

async function validateReservation(bookingId: string, ) {
    const room_cost = prisma.reservation.findUnique({
        where: {
            bookingId
        },
        select: {
            room_cost: true
        }
    });


    // calculate and add points to user
    const pointChange = POINT_MODIFIER * room_cost;
    if (!updatePoints(bookingId, pointChange)) return false;

    return prisma.reservation.update({
        where: {
            bookingId
        },
        data: {
            verified: true
        }
    })    
}

async function cancelReservation(bookingId: string) {
    const room_cost = prisma.reservation.findUnique({
        where: {
            bookingId
        },
        select: {
            room_cost: true
        }
    });


    // calculate and remove points from user
    const pointChange = -1 * POINT_MODIFIER * room_cost;
    if (!updatePoints(bookingId, pointChange)) return false;

    return prisma.reservation.delete({
        where: {
            bookingId
        }
    })
}

async function getReservations() {
    return prisma.reservation.findMany({
        where: {
            userId: (await auth())?.user.id
        }
    })
}

async function updateReservation(bookingId: string, data: PartialReservation) {
    return prisma.reservation.update({
        where: {
            bookingId
        },
        data
    })
}