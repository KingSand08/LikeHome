"use client";
import React from "react";
import {
  HotelsSearchAccessibilityOptions,
  HotelsSearchAccessibilityOptionsType,
} from "@/lib/rapid-hotel-api/zod/hotel-search-schemas";

type AccessibilityCheckboxProps = {
  selectedOptions: HotelsSearchAccessibilityOptionsType[];
  onChange: (options: HotelsSearchAccessibilityOptionsType[]) => void;
};

const AccessibilityCheckbox: React.FC<AccessibilityCheckboxProps> = ({
  selectedOptions,
  onChange,
}) => {
  const handleCheckboxChange = (option: HotelsSearchAccessibilityOptionsType) => {
    const updatedOptions = selectedOptions.includes(option)
      ? selectedOptions.filter((selected) => selected !== option)
      : [...selectedOptions, option];
    onChange(updatedOptions);
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-2 text-black">
        Select Accessibility Options
      </label>
      <div className="border p-2 rounded bg-white max-h-60 overflow-y-auto">
        {HotelsSearchAccessibilityOptions.map((option) => (
          <div key={option} className="flex items-center mb-2">
            <input
              type="checkbox"
              id={option}
              value={option}
              checked={selectedOptions.includes(option)}
              onChange={() => handleCheckboxChange(option)}
              className="mr-2"
            />
            <label htmlFor={option} className="text-sm text-black">
              {option.replace(/_/g, " ")}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AccessibilityCheckbox;
