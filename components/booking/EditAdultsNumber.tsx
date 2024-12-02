"use client";

import { useState } from "react";
import AdultsNumberInput from "../search/BookingInfoSearch/SearchComponents/AdultsNumberInput";

type EditAdultsNumberProps = {
  reservation: { adults_number: number };
  onUpdateTemp: (newNumber: number | null) => void;
};

const EditAdultsNumber: React.FC<EditAdultsNumberProps> = ({
  reservation,
  onUpdateTemp,
}) => {
  const [localValue, setLocalValue] = useState(reservation.adults_number);

  const handleAdultsNumberChange = (newNumber: number | null) => {
    if (newNumber !== null) {
      setLocalValue(newNumber);
      onUpdateTemp(newNumber);
    }
  };

  return (
    <div className="mb-4">
      <h3 className="font-bold text-lg mb-2 text-gray-800">
        Edit Number of Adults
      </h3>
      <AdultsNumberInput
        selectedNumber={localValue}
        onChange={handleAdultsNumberChange}
      />
    </div>
  );
};

export default EditAdultsNumber;
