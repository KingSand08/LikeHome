"use client";
import { useState } from "react";
import TemplateInput from "../../Templates-UI/TemplateInput";
import { dateRegex } from "@/lib/rapid-hotel-api/zod/hotel-search-schemas";

type BookingDateInputProps = {
  selectedDate: string;
  onChange: (date: string) => void;
  title: string;
};

const BookingDateInput: React.FC<BookingDateInputProps> = ({
  selectedDate,
  onChange,
  title = "Booking Date",
}) => {
  const [value, setValue] = useState<string>(selectedDate);

  const handleInputChange = (inputValue: string) => {
    setValue(inputValue);
    onChange(inputValue);
  };

  return (
    <TemplateInput
      title={title}
      placeholder="Enter booking date (YYYY-MM-DD)"
      regex={dateRegex}
      value={value}
      onChange={handleInputChange}
      required
    />
  );
};

export default BookingDateInput;
