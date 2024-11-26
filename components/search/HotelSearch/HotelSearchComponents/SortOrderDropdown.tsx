"use client";
import {
  HotelSearchSortOrderOptionsType,
  HotelSearchSortOrderOptions,
  sortOrderSchema,
} from "@/lib/rapid-hotel-api/zod/hotel-search-schemas";
import TemplateDropdown from "../../Templates-UI/TemplateDropdown";

type SortOrderDropdownProps = {
  selectedSortOrder: HotelSearchSortOrderOptionsType;
  onChange: (sortOrder: HotelSearchSortOrderOptionsType) => void;
};

const SortOrderDropdown: React.FC<SortOrderDropdownProps> = ({
  selectedSortOrder,
  onChange,
}) => {
  const handleChange = (sortOrder: HotelSearchSortOrderOptionsType) => {
    try {
      const validatedSortOrder = sortOrderSchema.parse(sortOrder);
      onChange(validatedSortOrder);
    } catch (error) {
      console.error("Invalid sort order selection:", error);
    }
  };

  return (
    <TemplateDropdown
      title="Sort Order"
      placeholder="Select a sort order"
      options={
        [...HotelSearchSortOrderOptions] as HotelSearchSortOrderOptionsType[]
      }
      selectedOption={selectedSortOrder}
      onChange={handleChange}
    />
  );
};

export default SortOrderDropdown;
