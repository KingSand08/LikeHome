"use client";

import React, { useState } from "react";
import { Reservation } from "@prisma/client";
import EditAdultsNumber from "./EditAdultsNumber";
import DeleteReservation from "./EditCancelReservation";
import { updateSpecificReservation } from "@/server-actions/reservation-actions";
import PayDifferenceForm from "./PayDifferenceForm";

type EditSectionProps = {
  reservation: Reservation;
};

const EditReservationSection: React.FC<EditSectionProps> = ({
  reservation,
}) => {
  const [tempReservation, setTempReservation] =
    useState<Reservation>(reservation);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleAdultsNumberChange = (newNumber: number | null) => {
    if (newNumber !== null) {
      setTempReservation((prev) => ({
        ...prev,
        adults_number: newNumber,
      }));
      setSuccessMessage(null); // Clear previous success message
      setErrorMessage(null); // Clear previous error message
    }
  };

  const isReservationModified = (): boolean => {
    return tempReservation.adults_number !== reservation.adults_number;
  };

  const handleConfirmUpdate = async () => {
    setLoading(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      const updatedReservation = await updateSpecificReservation(
        tempReservation.id,
        {
          checkin_date:
            tempReservation.checkin_date !== reservation.checkin_date
              ? tempReservation.checkin_date
              : undefined,
          checkout_date:
            tempReservation.checkout_date !== reservation.checkout_date
              ? tempReservation.checkout_date
              : undefined,
          adults_number:
            tempReservation.adults_number !== reservation.adults_number
              ? tempReservation.adults_number
              : undefined,
        }
      );

      setTempReservation(updatedReservation);
      setSuccessMessage("Reservation updated successfully.");
    } catch (error) {
      console.error("Error updating reservation:", error);
      setErrorMessage(
        `Failed to update the reservation. Not available for ${tempReservation.adults_number} adults.`
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="edit-section p-4 bg-gray-100 rounded-lg shadow-md">
      {/* <TestReservationDetailsDisplay reservation={tempReservation} /> */}
      {reservation.verified && (
        <div>
          <div>
            <EditAdultsNumber
              reservation={tempReservation}
              onUpdateTemp={handleAdultsNumberChange}
            />
          </div>
          <button
            className="btn btn-primary mr-4"
            onClick={handleConfirmUpdate}
            disabled={loading || !isReservationModified()}
          >
            {loading ? "Saving..." : "Confirm Changes"}
          </button>
        </div>
      )}
      <div className="edit-section__actions mb-6">
        {errorMessage && (
          <p className="text-sm text-red-500 mt-2">{errorMessage}</p>
        )}
        {successMessage && (
          <p className="text-sm text-green-500 mt-2">{successMessage}</p>
        )}
      </div>
      {reservation.cost_difference > 0 ? (
        <PayDifferenceForm reservation={reservation} />
      ) : (
        <DeleteReservation reservation={reservation} />
      )}
    </div>
  );
};

export default EditReservationSection;
