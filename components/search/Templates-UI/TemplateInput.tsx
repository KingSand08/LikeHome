"use client";
import React, { useState, useEffect } from "react";

type TemplateInputProps = {
  title: string;
  placeholder: string;
  regex: RegExp;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
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
      <label className="block text-sm font-medium mb-2 text-black">
        {title}
      </label>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        className={`w-full p-2 border rounded text-white ${
          error ? "border-red-500" : "border-gray-300"
        }`}
        required={required}
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default TemplateInput;
