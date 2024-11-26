"use client";
import React, { useState, useEffect } from "react";

type TemplateInputProps = {
  title: string;
  placeholder: string;
  regex: RegExp;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  className?: string;
};

const TemplateInput: React.FC<TemplateInputProps> = ({
  title,
  placeholder,
  regex,
  value,
  onChange,
  required = false,
}) => {
  const [touched, setTouched] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (touched && required && value === "") {
      setError("This field is required.");
    } else if (value && !regex.test(value)) {
      setError("Input does not match the required format.");
    } else {
      setError(null);
    }
  }, [value, required, regex, touched]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const handleBlur = () => {
    setTouched(true);
  };

  return (
    <div className="mb-4">
      <label className="text-lg block font-semibold text-base-content">
        {title}
      </label>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        className={`input input-bordered input-secondary bg-gray-800 w-full p-2 border-primary rounded-md text-base-content${
          error ? "border-red-500" : "border-gray-300 shadow"
        }`}
        required={required}
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default TemplateInput;
