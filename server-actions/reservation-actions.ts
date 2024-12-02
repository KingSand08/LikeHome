"use server";
import { Reservation } from "@prisma/client";
import { redeemRewards, updateUserRewards } from "./user-actions";
import { isWithinCancellationChargeThreshold } from "@/lib/DateFunctions";
import { stripe } from "@/lib/stripe";
import {
  DEFAULT_CANCELLATION_PENALITY_CHARGE,
  DEFAULT_DOMAIN,
  DEFAULT_LOCALE,
} from "@/lib/rapid-hotel-api/constants/USER_OPTIONS";
import { fetchHotelRoomOffer } from "./api-actions";
import { createReadonlyURLSearchParams } from "@/lib/utils";

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
    const targetReservation: Reservation | null =
      await prisma.reservation.findUnique({
        where: { id },
      });

    if (!targetReservation) {
      throw new Error("Failed to get specific reservation");
    }

    const searchParams = createReadonlyURLSearchParams({
      checkin_date: edit.checkin_date
        ? edit.checkin_date
        : targetReservation.checkin_date,
      checkout_date: edit.checkout_date
        ? edit.checkout_date
        : targetReservation.checkout_date,
      adults_number: edit.adults_number
        ? edit.adults_number
        : targetReservation.adults_number,
      domain: DEFAULT_DOMAIN,
      locale: DEFAULT_LOCALE,
    });

    // Grab new hotel room price directly from API
    const hotelRoom = await fetchHotelRoomOffer(
      targetReservation.hotel_id,
      targetReservation.room_id,
      searchParams
    );
    if (!hotelRoom) {
      throw new Error("Failed to get hotel room");
    }

    // Compare prices
    const originalPrice = targetReservation.room_cost;
    const updatedPrice = hotelRoom.pricePerNight.amount;
    let setVerified = originalPrice === updatedPrice ? true : false;
    let costDifference = 0;

    // Decide on what to do if prices are different
    if (originalPrice > updatedPrice) {
      costDifference = updatedPrice - originalPrice; // Keep track if refund fails
      const refundReservation = await refundSpecificReservation(
        targetReservation.transaction_info.stripePaymentId,
        costDifference
      );
      costDifference = 0;
      setVerified = true;
    } else if (originalPrice < updatedPrice) {
      costDifference = originalPrice - updatedPrice;
      setVerified = false;
    }

    // Finally update reservation
    const updatedReservation = await prisma.reservation.update({
      where: { id },
      data: {
        checkin_date: edit.checkin_date || targetReservation.checkin_date,
        checkout_date: edit.checkout_date || targetReservation.checkout_date,
        adults_number: edit.adults_number || targetReservation.adults_number,
        room_cost: updatedPrice,
        cost_difference: costDifference,
        verified: setVerified,
      },
    });

    return updatedReservation;
  } catch (error: any) {
    console.error(
      `Error updating reservation ${id} with fields ${JSON.stringify(edit)}:`,
      error
    );
    throw new Error(`Failed to update reservation: ${error.message}`);
  }
}

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

    // Mark as cancelled instead of deleting it.
    const cancelledReservation: Reservation = await prisma.reservation.update({
      where: { id },
      data: {
        is_cancelled: true,
      },
    });

    // const deletedReservation: Reservation = await prisma.reservation.delete({
    //   where: { id },
    // });
    // console.log("Deleted reservation:", deletedReservation);

    const updatedRewards = await updateUserRewards(
      email,
      -cancelledReservation.room_cost
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
