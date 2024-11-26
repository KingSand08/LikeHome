"use client";
import React, { useState } from "react";
import TemplateInput from "../../Templates-UI/TemplateInput";

type PriceRange = {
  price_min: number | null;
  price_max: number | null;
};

type PriceRangeInputProps = {
  selectedPriceRange: PriceRange;
  onChange: (values: PriceRange) => void;
};

const numberRegex = /^-?\d*$/;

const PriceRangeInput: React.FC<PriceRangeInputProps> = ({
  selectedPriceRange: { price_min, price_max },
  onChange,
}) => {
  const [values, setValues] = useState<PriceRange>({
    price_min,
    price_max,
  });

  const handleInputChange = (value: string, isMin: boolean) => {
    if (!numberRegex.test(value)) return;
    const intValue = value === "" ? null : parseInt(value, 10);

    const updatedValues = isMin
      ? { ...values, price_min: intValue }
      : { ...values, price_max: intValue };

    setValues(updatedValues);
    onChange(updatedValues);
  };

  return (
    <div className="flex flex-row gap-4">
      <TemplateInput
        title="Min Value"
        placeholder="Enter minimum price"
        regex={numberRegex}
        value={values.price_min === null ? "" : values.price_min.toString()}
        onChange={(value) => handleInputChange(value, true)}
        required
      />
      <TemplateInput
        title="Max Value"
        placeholder="Enter maximum price"
        regex={numberRegex}
        value={values.price_max === null ? "" : values.price_max.toString()}
        onChange={(value) => handleInputChange(value, false)}
        required
      />
    </div>
  );
};

export default PriceRangeInput;
