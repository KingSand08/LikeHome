"use client";
import {
  domainSchema,
  RegionSearchDomainOptions,
  RegionSearchDomainType,
} from "@/lib/rapid-hotel-api/zod/region-search-schemas";
import React from "react";

type DomainDropdownProps = {
  selectedDomain: RegionSearchDomainType;
  onChange: (domain: RegionSearchDomainType) => void;
};

const DomainDropdown: React.FC<DomainDropdownProps> = ({
  selectedDomain,
  onChange,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value as RegionSearchDomainType;

    try {
      const validatedDomain = domainSchema.parse(selectedValue);
      onChange(validatedDomain);
    } catch (error) {
      console.error("Invalid domain selection:", error);
    }
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-2 text-black">
        Select Domain (Country)
      </label>
      <select
        value={selectedDomain}
        onChange={handleChange}
        className="w-full p-2 border rounded text-white"
      >
        <option value="">Select a domain</option>
        {RegionSearchDomainOptions.map((domain) => (
          <option key={domain} value={domain}>
            {domain}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DomainDropdown;
