"use server";
import { Reservation } from "@prisma/client";
import { redeemRewards, updateUserRewards } from "./user-actions";
import { isWithinCancellationChargeThreshold } from "@/lib/DateFunctions";
import { stripe } from "@/lib/stripe";

export type PartialReservation = Omit<
  Reservation,
  "id" | "userId" | "verified"
>;
export type EditableReservationFields = Partial<
  Pick<Reservation, "checkin_date" | "checkout_date" | "adults_number">
>;

export async function createReservation(
  data: PartialReservation
): Promise<Reservation> {
  const reservation = await prisma.reservation.create({
    data: {
      ...data,
      verified: false,
    },
  });
  console.log("Reservation created successfully:", reservation);
  return reservation;
}

export async function redeemFreeStay(
  email: string,
  data: PartialReservation
): Promise<Reservation> {
  const updatedReservation = await prisma.reservation.create({
    data: {
      ...data,
      verified: true,
    },
  });

  console.log("Updated reservation:", updatedReservation);

  const updatedRewards = await redeemRewards(
    email,
    updatedReservation.room_cost
  );
  console.log("Updated rewards:", updatedRewards);
  return updatedReservation;
}

export async function verifyReservation(
  email: string,
  id: string,
  stripePaymentId: string
) {
  const updatedReservation = await prisma.reservation.update({
    where: {
      id,
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

export async function retrieveAllReservations(
  email: string
): Promise<Reservation[]> {
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

export async function retrieveSpecificReservation(id: string, email: string) {
  try {
    const reservation = await prisma.reservation.findUnique({
      where: {
        id,
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

export async function updateSpecificReservation(
  id: string,
  edit: EditableReservationFields
) {
  try {
    const editReservation = await prisma.reservation.update({
      where: { id },
      data: edit,
    });

    return editReservation;
  } catch (error: any) {
    console.error(
      `Error updating reservation ${id} with fields ${JSON.stringify(edit)}:`,
      error
    );
  }
}

const DEFAULT_CANCELLATION_PENALITY_CHARGE = 0.8 as const; // 20% penality

export async function cancelReservation(email: string, id: string) {
  try {
    const targetReservation: Reservation | null =
      await prisma.reservation.findUnique({
        where: { id },
      });

    if (!targetReservation) {
      throw new Error(`Reservation with ID ${id} not found.`);
    }

    let refundedAmount = targetReservation.room_cost;

    if (isWithinCancellationChargeThreshold(targetReservation.checkin_date)) {
      refundedAmount *= DEFAULT_CANCELLATION_PENALITY_CHARGE;
    }

    const refundedReservation = await refundSpecificReservation(
      targetReservation.transaction_info.stripePaymentId,
      refundedAmount
    );
    console.log("Refunded reservation:", refundedReservation);

    const deletedReservation: Reservation = await prisma.reservation.delete({
      where: { id },
    });
    console.log("Deleted reservation:", deletedReservation);

    const updatedRewards = await updateUserRewards(
      email,
      -deletedReservation.room_cost
    );
    console.log("Updated rewards:", updatedRewards);

    return true;
  } catch (error) {
    console.error("Failed to cancel reservation:", error);
  }
}

async function refundSpecificReservation(
  stripePaymentId: string,
  amount: number
) {
  const amountInCents = Math.round(amount * 100);

  try {
    const refund = await stripe.refunds.create({
      payment_intent: stripePaymentId,
      amount: amountInCents,
    });

    return refund;
  } catch (error) {
    console.error("Failed to issue refund:", error);
    throw error;
  }
}
