"use server";
import { Reservation } from "@prisma/client";
import { redeemRewards, updateUserRewards } from "./user-actions";

export type PartialReservation = Omit<
  Reservation,
  "id" | "userId" | "verified"
>;

export async function createReservation(data: PartialReservation) {
  const reservation: PartialReservation[] | [] =
    await prisma.reservation.create({
      data: {
        ...data,
        verified: false,
      },
    });
  console.log("Reservation created successfully:", reservation);
  return reservation;
}

export async function redeemFreeStay(email: string, bookingId: string) {
  const updatedReservation = await prisma.reservation.update({
    where: {
      bookingId: bookingId,
    },
    data: {
      verified: true,
    },
  });

  console.log("Updated reservation:", updatedReservation);

  const updatedRewards = await redeemRewards(
    email,
    updatedReservation.room_cost
  );
  console.log("Updated rewards:", updatedRewards);
  return true;
}

export async function verifyReservation(
  email: string,
  bookingId: string,
  stripePaymentId: string
) {
  const updatedReservation = await prisma.reservation.update({
    where: {
      bookingId: bookingId,
    },
    data: {
      transaction_info: {
        set: {
          stripePaymentId: stripePaymentId,
          dateCreated: new Date().toISOString(),
        },
      },
      verified: true,
    },
  });
  console.log("Updated reservation:", updatedReservation);
  const updatedRewards = await updateUserRewards(
    email,
    updatedReservation.room_cost
  );
  console.log("Updated rewards:", updatedRewards);
  return true;
}

// TODO: @ryanhtang use this function in a cancel reservation button that charges a constant fee
export async function cancelReservation(email: string, bookingId: string) {
  const deletedReservation = await prisma.reservation.delete({
    where: {
      bookingId: bookingId,
    },
  });
  console.log("Deleted reservation:", deletedReservation);
  const updatedRewards = await updateUserRewards(
    email,
    -deletedReservation.room_cost
  );
  console.log("Updated rewards:", updatedRewards);
  return true;
}

export async function retrieveAllReservations(email: string) {
  const reservations = await prisma.reservation.findMany({
    where: {
      userEmail: email,
    },
    orderBy: {
      checkin_date: "asc", // Optional: Order reservations by check-in date
    },
  });

  return reservations;
}

export async function retrieveSpecificReservation(
  bookingId: string,
  email: string
) {
  try {
    const reservation = await prisma.reservation.findUnique({
      where: {
        bookingId: bookingId, // Filter by bookingId
      },
    });

    // Throw forbidden error if no reservation is found or email doesn't match
    if (reservation.userEmail !== email) {
      throw new Error(
        "Forbidden: You are not authorized to view this reservation."
      );
    }

    return reservation;
  } catch (error: any) {
    console.error("Error retrieving specific reservation:", error.message);
  }
}
