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
    <div className="p-4 bg-white dark:bg-slate-800 shadow-md rounded-lg">
      <h3 className="font-bold text-xl mb-4 text-primary">
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
