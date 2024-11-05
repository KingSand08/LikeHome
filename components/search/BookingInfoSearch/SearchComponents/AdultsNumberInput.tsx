"use client";
import { useState } from "react";
import TemplateInput from "../../Templates-UI/TemplateInput";
import {
  DEFAULT_MAX_ADULTS_NUMBER,
  DEFAULT_MIN_ADULTS_NUMBER,
} from "@/lib/rapid-hotel-api/zod/constants";

type AdultsNumberInputProps = {
  selectedNumber: number;
  onChange: (number: number) => void;
};

const numberRegex = /^\d*$/;

const AdultsNumberInput: React.FC<AdultsNumberInputProps> = ({
  selectedNumber,
  onChange,
}) => {
  const [value, setValue] = useState<string>(selectedNumber.toString());

  const handleInputChange = (inputValue: string) => {
    if (numberRegex.test(inputValue)) {
      const intValue = parseInt(inputValue, 10);
      if (
        intValue >= DEFAULT_MIN_ADULTS_NUMBER &&
        intValue <= DEFAULT_MAX_ADULTS_NUMBER
      ) {
        setValue(inputValue);
        onChange(intValue);
      } else if (inputValue === "") {
        setValue(inputValue);
        onChange(0);
      }
    }
  };

  return (
    <TemplateInput
      title="Number of Adults"
      placeholder={`Enter number of adults (${DEFAULT_MIN_ADULTS_NUMBER}-${DEFAULT_MAX_ADULTS_NUMBER})`}
      regex={numberRegex}
      value={value}
      onChange={handleInputChange}
      required
    />
  );
};

export default AdultsNumberInput;
