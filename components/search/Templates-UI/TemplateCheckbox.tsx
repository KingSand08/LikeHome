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
    <div className="mb-4">
      <label className="block text-sm font-medium mb-2 text-white">
        {title}
      </label>
      <div className="border p-2 rounded bg-white max-h-60 overflow-y-auto">
        {options.map((option) => (
          <div key={option} className="flex items-center mb-2">
            <input
              type="checkbox"
              id={option}
              value={option}
              checked={selectedOptions.includes(option)}
              onChange={() => handleCheckboxChange(option)}
              disabled={!selectedOptions.includes(option) && isMaxSelected}
              className="mr-2"
            />
            <label
              htmlFor={option}
              className={`text-sm ${
                !selectedOptions.includes(option) && isMaxSelected
                  ? "text-gray-400"
                  : "text-black"
              }`}
            >
              {option.replace(/_/g, " ")}
            </label>
          </div>
        ))}
      </div>
      {isMaxSelected && (
        <p className="mt-2 text-xs text-red-500">
          Maximum of {selectedOptionsLimit} options can be selected.
        </p>
      )}
    </div>
  );
};

export default TemplateCheckbox;
