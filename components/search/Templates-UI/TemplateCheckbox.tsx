"use client";
type TemplateCheckboxProps<T> = {
  title: string;
  options: T[];
  selectedOptions: T[];
  onChange: (options: T[]) => void;
};

const TemplateCheckbox = <T extends string>({
  title,
  options,
  selectedOptions,
  onChange,
}: TemplateCheckboxProps<T>) => {
  const handleCheckboxChange = (option: T) => {
    const updatedOptions = selectedOptions.includes(option)
      ? selectedOptions.filter((selected) => selected !== option)
      : [...selectedOptions, option];
    onChange(updatedOptions);
  };

  return (
    <div className="mb-4">
      <label className="block form-control text-md font-medium mb-2 text-neutral-content">
        {title}
      </label>
      <div>
        {options.map((option) => (
          <div key={option} className="flex items-center mb-2">
            <input
              type="checkbox"
              id={option}
              value={option}
              checked={selectedOptions.includes(option)}
              onChange={() => handleCheckboxChange(option)}
              className="mr-2"
            />
            <label htmlFor={option} className="text-sm text-neutral">
              {option.replace(/_/g, " ")}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TemplateCheckbox;
