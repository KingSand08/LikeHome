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
    <div className="">
      <label className="font-semibold text-primary">
        {title}
      </label>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        className={`input input-bordered input-secondary w-full p-3 rounded-md shadow-sm`}
        required={required}
      />
      {error && <p className="mt-2 text-sm text-error">{error}</p>}
    </div>
  );
};

export default TemplateInput;
