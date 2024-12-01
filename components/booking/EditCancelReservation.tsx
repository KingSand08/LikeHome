"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Reservation } from "@prisma/client";
import { cancelReservation } from "@/server-actions/reservation-actions";
import {
  calculateDaysUntilPenalty,
  isWithinCancellationChargeThreshold,
} from "@/lib/DateFunctions";

type DeleteReservationProps = {
  reservation: Reservation;
};

export const DEFAULT_DAYS_THRESHOLD_FOR_PENALTY_CHARGE: number = 3 as const;

const DeleteReservation: React.FC<DeleteReservationProps> = ({
  reservation,
}) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
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

  return (
    <div>
      <button className="btn btn-danger" onClick={() => setIsPopupOpen(true)}>
        Cancel Reservation
      </button>

      {isPopupOpen && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h2 className="font-bold text-xl mb-4">Confirm Cancellation</h2>
            <p className="mb-4">
              Are you sure you want to cancel this reservation?
              {penaltyChargeApplies ? (
                <span className="text-red-500">
                  {" "}
                  Canceling this reservation will result in a 20% penalty
                  charge.
                </span>
              ) : daysUntilPenalty > 0 ? (
                <span className="text-green-500">
                  {" "}
                  You can cancel this reservation without penalty for the next{" "}
                  {daysUntilPenalty} day
                  {daysUntilPenalty !== 1 ? "s" : ""}.
                </span>
              ) : (
                <span className="text-green-500">
                  {" "}
                  You can cancel this reservation without penalty.
                </span>
              )}
            </p>
            <div className="flex justify-end gap-4">
              <button
                className="btn btn-secondary"
                onClick={() => setIsPopupOpen(false)}
                disabled={isLoading}
              >
                No
              </button>
              <button
                className="btn btn-primary"
                onClick={handleDeleteClick}
                disabled={isLoading}
              >
                {isLoading ? "Processing..." : "Yes"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeleteReservation;
