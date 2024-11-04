"use client";
import React from "react";
import {
  HotelsSearchMealPlanOptions,
  HotelsSearchMealPlanOptionsType,
} from "@/lib/rapid-hotel-api/zod/hotel-search-schemas";

type MealPlanCheckboxProps = {
  selectedOptions: HotelsSearchMealPlanOptionsType[];
  onChange: (options: HotelsSearchMealPlanOptionsType[]) => void;
};

const MealPlanCheckbox: React.FC<MealPlanCheckboxProps> = ({
  selectedOptions,
  onChange,
}) => {
  const handleCheckboxChange = (option: HotelsSearchMealPlanOptionsType) => {
    const updatedOptions = selectedOptions.includes(option)
      ? selectedOptions.filter((selected) => selected !== option)
      : [...selectedOptions, option];
    onChange(updatedOptions);
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-2 text-black">
        Select Meal Plan Options
      </label>
      <div className="border p-2 rounded bg-white max-h-60 overflow-y-auto">
        {HotelsSearchMealPlanOptions.map((option) => (
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

export default MealPlanCheckbox;
