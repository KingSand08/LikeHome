"use client";

import { useState } from "react";
import { Reservation } from "@prisma/client";
import { updateSpecificReservation } from "@/server-actions/reservation-actions";
import AdultsNumberInput from "../search/BookingInfoSearch/SearchComponents/AdultsNumberInput";

type EditAdultsNumberProps = {
  reservation: Reservation;
  onUpdate: (updatedReservation: Reservation) => void;
};

const EditAdultsNumber: React.FC<EditAdultsNumberProps> = ({
  reservation,
  onUpdate,
}) => {
  const [loading, setLoading] = useState(false);

  const handleAdultsNumberChange = async (newNumber: number) => {
    if (reservation.adults_number === newNumber) return;
  
    setLoading(true);
    try {
      const updatedReservation = await updateSpecificReservation(
        reservation.id,
        { adults_number: newNumber }
      );
      onUpdate(updatedReservation);
    } catch (error) {
      console.error("Error updating adults number:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mb-4">
      <h3 className="font-bold text-lg mb-2">Edit Number of Adults</h3>
      <AdultsNumberInput
        selectedNumber={reservation.adults_number}
        onChange={handleAdultsNumberChange}
      />
      {loading && <p className="text-sm text-gray-500 mt-2">Updating...</p>}
    </div>
  );
};

export default EditAdultsNumber;
