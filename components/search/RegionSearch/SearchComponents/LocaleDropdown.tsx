"use client";
import {
  localeSchema,
  RegionSearchLocaleOptions,
  RegionSearchLocaleType,
} from "@/lib/rapid-hotel-api/zod/region-search-schemas";
import React from "react";

type LocaleDropdownProps = {
  selectedLocale: RegionSearchLocaleType;
  onChange: (locale: RegionSearchLocaleType) => void;
};

const LocaleDropdown: React.FC<LocaleDropdownProps> = ({
  selectedLocale,
  onChange,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value as RegionSearchLocaleType;

    try {
      const validatedLocale = localeSchema.parse(selectedValue);
      onChange(validatedLocale);
    } catch (error) {
      console.error("Invalid locale selection:", error);
    }
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-2 text-black">
        Select Locale (Language)
      </label>
      <select
        value={selectedLocale}
        onChange={handleChange}
        className="w-full p-2 border rounded text-white"
      >
        <option value="">Select a locale</option>
        {RegionSearchLocaleOptions.map((locale) => (
          <option key={locale} value={locale}>
            {locale}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LocaleDropdown;
