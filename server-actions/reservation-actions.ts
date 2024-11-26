"use server";
import { Reservation } from "@prisma/client";
import { updateUserRewards } from "./user-actions";

export type PartialReservation = Omit<
  Reservation,
  "id" | "userId" | "verified"
> & {
  userEmail: string;
};

export async function createReservation(data: PartialReservation) {
  try {
    const reservation: PartialReservation[] | [] =
      await prisma.reservation.create({
        data: {
          bookingId: data.bookingId,
          userEmail: data.userEmail,
          checkin_date: data.checkin_date,
          checkout_date: data.checkout_date,
          adults_number: data.adults_number,
          numDays: data.numDays,
          hotel_id: data.hotel_id,
          room_id: data.room_id,
          payment_info: data.payment_info,
          transaction_info: data.transaction_info,
          room_cost: data.room_cost,
          verified: false,
        },
      });
    console.log("Reservation created successfully:", reservation);
    return reservation;
  } catch (error: any) {
    console.error("Error creating reservation:", error.message);
    throw new Error(`Failed to create reservation: ${error.message}`);
  }
}

export async function updateReservationPaymentAndRewards(
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
  return {
    success: true,
    message: "Reservation and rewards updated successfully.",
  };
}

export async function retrieveAllReservations(email: string) {
  try {
    const reservations = await prisma.reservation.findMany({
      where: {
        userEmail: email,
      },
      orderBy: {
        checkin_date: "asc", // Optional: Order reservations by check-in date
      },
    });

    return reservations;
  } catch (error: any) {
    console.error("Error fetching reservations:", error.message);
  }
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
