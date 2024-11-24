"use server";
import { PrismaClient, Reservation } from "@prisma/client";
import { auth } from "@/auth";
import { updatePoints } from "./user-actions";

const prisma = new PrismaClient();

export type PartialReservation = Omit<
  Reservation,
  "id" | "userId" | "verified"
> & {
  userEmail: string;
};

const POINT_MODIFIER = 0.1;

export async function createReservation(data: PartialReservation) {
  console.log("Reservation Data:", data); // Debugging log

  return prisma.reservation.create({
    data: {
      bookingId: data.bookingId,
      userEmail: data.userEmail, // Decoupled from `User` model
      checkin_date: data.checkin_date,
      checkout_date: data.checkout_date,
      adults_number: data.adults_number,
      numDays: data.numDays,
      hotel_id: data.hotel_id,
      room_id: data.room_id,
      payment_info: data.payment_info,
      transaction_info: data.transaction_info,
      room_cost: data.room_cost,
      verified: false, // Default value
    },
  });
}

export async function validateReservation(bookingId: string) {
  const reservation = await prisma.reservation.findUnique({
    where: { bookingId },
    select: { room_cost: true },
  });

  if (!reservation) {
    throw new Error("Reservation not found");
  }

  const pointChange = POINT_MODIFIER * reservation.room_cost;

  if (!(await updatePoints(bookingId, pointChange))) {
    return false;
  }

  return prisma.reservation.update({
    where: { bookingId },
    data: { verified: true },
  });
}

export async function cancelReservation(bookingId: string) {
  const reservation = await prisma.reservation.findUnique({
    where: { bookingId },
    select: { room_cost: true },
  });

  if (!reservation) {
    throw new Error("Reservation not found");
  }

  const pointChange = -POINT_MODIFIER * reservation.room_cost;

  if (!(await updatePoints(bookingId, pointChange))) {
    return false;
  }

  return prisma.reservation.delete({
    where: { bookingId },
  });
}

export async function getReservations() {
  const session = await auth();
  if (!session) {
    throw new Error("Unauthorized");
  }

  return prisma.reservation.findMany({
    where: { userEmail: session.user.email! },
  });
}

export async function updateReservation(
  bookingId: string,
  data: PartialReservation
) {
  const session = await auth();
  if (!session) {
    throw new Error("Unauthorized");
  }

  return prisma.reservation.update({
    where: { bookingId },
    data,
  });
}

// For payment redirect page
export async function updateReservationStripePaymentId(
  bookingId: string,
  stripePaymentId: string
) {
  const session = await auth();
  if (!session) {
    throw new Error("Unauthorized");
  }

  // Find the reservation to ensure it exists
  const reservation = await prisma.reservation.findUnique({
    where: { bookingId },
  });

  if (!reservation) {
    throw new Error("Reservation not found");
  }

  return prisma.reservation.update({
    where: { bookingId },
    data: {
      transaction_info: {
        ...reservation.transaction_info,
        stripePaymentId, // Update the Stripe Payment ID
      },
    },
  });
}

export async function getReservationByBookingId(bookingId: string) {
  try {
    if (!bookingId) {
      throw new Error("Booking ID is required to fetch a reservation.");
    }

    const reservation = await prisma.reservation.findUnique({
      where: { bookingId },
      include: {
        user: true, // Include user details if needed
      },
    });

    if (!reservation) {
      throw new Error("Reservation not found.");
    }

    return reservation;
  } catch (error) {
    console.error("Error retrieving reservation:", error);
    throw new Error("Failed to retrieve reservation.");
  }
}
