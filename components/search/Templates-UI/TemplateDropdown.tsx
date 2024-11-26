"use client";
type TemplateDropdownProps<T> = {
  title: string;
  placeholder: string;
  options: T[];
  selectedOption: T;
  onChange: (option: T) => void;
};

const TemplateDropdown = <T extends string>({
  title,
  placeholder,
  options,
  selectedOption,
  onChange,
}: TemplateDropdownProps<T>) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value as T;
    onChange(selectedValue);
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-2 text-base-content">
        {title}
      </label>
      <select
        value={selectedOption}
        onChange={handleChange}
        className="w-full p-2 border rounded text-base-content"
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default TemplateDropdown;
