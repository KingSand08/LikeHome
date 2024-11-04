import React, { useState } from "react";

type PriceRange = {
  price_min: number;
  price_max: number;
};

type PriceRangeInputProps = {
  selectedPriceRange: PriceRange;
  onChange: (values: PriceRange) => void;
};

const PriceRangeInput: React.FC<PriceRangeInputProps> = ({
  selectedPriceRange: { price_min, price_max },
  onChange,
}) => {
  const [values, setValues] = useState<PriceRange>({
    price_min,
    price_max,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    isMin: boolean
  ) => {
    const value = e.target.value;
    if (value === "") {
      const updatedValues = isMin
        ? { ...values, price_min: value === "" ? 0 : values.price_min }
        : { ...values, price_max: value === "" ? 0 : values.price_max };

      setValues(updatedValues);
      return;
    }
    if (!/^-?\d*$/.test(value)) return;
    const intValue = parseInt(value, 10);
    if (!isNaN(intValue)) {
      const updatedValues = isMin
        ? { ...values, price_min: intValue }
        : { ...values, price_max: intValue };

      setValues(updatedValues);
      onChange(updatedValues);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="flex flex-col">
        Min Value:
        <input
          type="text"
          value={values.price_min}
          onChange={(e) => handleInputChange(e, true)}
          className="border p-1 rounded text-white"
        />
      </label>
      <label className="flex flex-col">
        Max Value:
        <input
          type="text"
          value={values.price_max}
          onChange={(e) => handleInputChange(e, false)}
          className="border p-1 rounded text-white"
        />
      </label>
    </div>
  );
};

export default PriceRangeInput;
