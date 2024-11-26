"use client";

import { DEFAULT_MAX_SELECTED_OPTIONS_LIMIT } from "@/lib/rapid-hotel-api/constants/USER_OPTIONS";

type TemplateCheckboxProps<T> = {
  title: string;
  options: T[];
  selectedOptions: T[];
  onChange: (options: T[]) => void;
  selectedOptionsLimit?: number;
};

const TemplateCheckbox = <T extends string>({
  title,
  options,
  selectedOptions,
  onChange,
  selectedOptionsLimit = DEFAULT_MAX_SELECTED_OPTIONS_LIMIT,
}: TemplateCheckboxProps<T>) => {
  const handleCheckboxChange = (option: T) => {
    const updatedOptions = selectedOptions.includes(option)
      ? selectedOptions.filter((selected) => selected !== option)
      : [...selectedOptions, option];
    onChange(updatedOptions);
  };

  const isMaxSelected = selectedOptions.length >= selectedOptionsLimit;

  return (
    <div className="bg-base-100 shadow-md rounded-lg p-4">
      <h3 className="text-lg font-semibold text-primary mb-4">{title}</h3>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {options.map((option) => (
          <div key={option} className="flex items-center">
            <input
              type="checkbox"
              id={option}
              value={option}
              checked={selectedOptions.includes(option)}
              onChange={() => handleCheckboxChange(option)}
              disabled={!selectedOptions.includes(option) && isMaxSelected}
              className="checkbox checkbox-primary mr-2"
            />
            <label
              htmlFor={option}
              className={`text-sm font-medium ${
                !selectedOptions.includes(option) && isMaxSelected
                  ? "text-gray-400"
                  : "text-base-content"
              }`}
            >
              {option.replace(/_/g, " ")}
            </label>
          </div>
        ))}
      </div>
      {isMaxSelected && (
        <p className="mt-3 text-sm text-error">
          You can only select up to {selectedOptionsLimit} options.
        </p>
      )}
    </div>
  );
};

export default TemplateCheckbox;
