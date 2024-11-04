"use client";
import {
  HotelSearchSortOrderOptionsType,
  HotelSearchSortOrderOptions,
  sortOrderSchema,
} from "@/lib/rapid-hotel-api/zod/hotel-search-schemas";

type SortOrderDropdownProps = {
  selectedSortOrder: HotelSearchSortOrderOptionsType;
  onChange: (sortOrder: HotelSearchSortOrderOptionsType) => void;
};

const SortOrderDropdown: React.FC<SortOrderDropdownProps> = ({
  selectedSortOrder,
  onChange,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value as HotelSearchSortOrderOptionsType;
    try {
      const validatedSortOrder = sortOrderSchema.parse(selectedValue);
      onChange(validatedSortOrder);
    } catch (error) {
      console.error("Invalid sort order selection:", error);
    }
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-2 text-black">
        Select Sort Order
      </label>
      <select
        value={selectedSortOrder}
        onChange={handleChange}
        className="w-full p-2 border rounded text-white"
      >
        <option value="">Select a sort order</option>
        {HotelSearchSortOrderOptions.map((sortOrder) => (
          <option key={sortOrder} value={sortOrder}>
            {sortOrder}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SortOrderDropdown;
