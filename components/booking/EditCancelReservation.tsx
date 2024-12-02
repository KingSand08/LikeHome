"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Reservation } from "@prisma/client";
import { cancelReservation } from "@/server-actions/reservation-actions";
import { DEFAULT_CANCELLATION_PENALITY_CHARGE } from "@/lib/rapid-hotel-api/constants/USER_OPTIONS";
import {
  calculateDaysUntilPenalty,
  isWithinCancellationChargeThreshold,
} from "@/lib/DateFunctions";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { Dialog, DialogContent, DialogFooter } from "../ui/dialog";
import { Button } from "../ui/button";

type DeleteReservationProps = {
  reservation: Reservation;
};

export const DEFAULT_DAYS_THRESHOLD_FOR_PENALTY_CHARGE: number = 3 as const;

const DeleteReservation: React.FC<DeleteReservationProps> = ({
  reservation,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleDeleteClick = async () => {
    setIsLoading(true);
    try {
      await cancelReservation(reservation.userEmail, reservation.id);
      router.push("/bookings");
    } catch (error) {
      console.error("Error canceling reservation:", error);
      alert("Failed to cancel the reservation. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const penaltyChargeApplies = isWithinCancellationChargeThreshold(
    reservation.checkin_date
  );

  const daysUntilPenalty = calculateDaysUntilPenalty(
    reservation.checkin_date,
    DEFAULT_DAYS_THRESHOLD_FOR_PENALTY_CHARGE
  );

  const [open, onOpenChange] = useState(false);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button>Cancel Reservation</Button>
      </DialogTrigger>

      <DialogContent>
        <h2 className="font-bold text-xl mb-4">Confirm Cancellation</h2>
        <p className="mb-4">
          Are you sure you want to cancel this reservation?
          {penaltyChargeApplies ? (
            <p className="text-red-500">
              {" "}
              Canceling this reservation will result in a{" "}
              {reservation.room_cost * 0.2}(20%) penalty charge, charged to the
              card on file.
              Partial refund: ${reservation.room_cost * DEFAULT_CANCELLATION_PENALITY_CHARGE}
            </p>
          ) : daysUntilPenalty > 0 ? (
            <p className="text-green-500">
              {" "}
              You can cancel this reservation without penalty for the next{" "}
              {daysUntilPenalty} day
              {daysUntilPenalty !== 1 ? "s" : ""}.
            </p>
          ) : (
            <p className="text-green-500">
              {" "}
              You can cancel this reservation without penalty.
            </p>
          )}
        </p>
        <DialogFooter className="flex justify-end gap-4">
          <button
            type="submit"
            className="btn btn-secondary"
            disabled={isLoading}
            onClick={() => onOpenChange(false)}
          >
            No
          </button>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isLoading}
            onClick={() => handleDeleteClick()}
          >
            {isLoading ? "Processing..." : "Yes"}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteReservation;
