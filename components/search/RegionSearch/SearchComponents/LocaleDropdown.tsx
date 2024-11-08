"use client";
import {
  localeSchema,
  RegionSearchLocaleOptions,
  RegionSearchLocaleType,
} from "@/lib/rapid-hotel-api/zod/region-search-schemas";
import TemplateDropdown from "../../Templates-UI/TemplateDropdown";

type LocaleDropdownProps = {
  selectedLocale: RegionSearchLocaleType;
  onChange: (locale: RegionSearchLocaleType) => void;
};

const LocaleDropdown: React.FC<LocaleDropdownProps> = ({
  selectedLocale,
  onChange,
}) => {
  const handleChange = (locale: RegionSearchLocaleType) => {
    try {
      const validatedLocale = localeSchema.parse(locale);
      onChange(validatedLocale);
    } catch (error) {
      console.error("Invalid locale selection:", error);
    }
  };

  return (
    <TemplateDropdown
      title="Select Locale (Language)"
      placeholder="Select a locale"
      options={[...RegionSearchLocaleOptions] as RegionSearchLocaleType[]}
      selectedOption={selectedLocale}
      onChange={handleChange}
    />
  );
};

export default LocaleDropdown;
