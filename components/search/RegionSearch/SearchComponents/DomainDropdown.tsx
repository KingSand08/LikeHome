"use client";
import {
  domainSchema,
  RegionSearchDomainOptions,
  RegionSearchDomainType,
} from "@/lib/rapid-hotel-api/zod/region-search-schemas";
import TemplateDropdown from "../../Templates-UI/TemplateDropdown";

type DomainDropdownProps = {
  selectedDomain: RegionSearchDomainType;
  onChange: (domain: RegionSearchDomainType) => void;
};

const DomainDropdown: React.FC<DomainDropdownProps> = ({
  selectedDomain,
  onChange,
}) => {
  const handleChange = (domain: RegionSearchDomainType) => {
    try {
      const validatedDomain = domainSchema.parse(domain);
      onChange(validatedDomain);
    } catch (error) {
      console.error("Invalid domain selection:", error);
    }
  };

  return (
    <TemplateDropdown
      title="Select Domain (Country)"
      placeholder="Select a domain"
      options={[...RegionSearchDomainOptions] as RegionSearchDomainType[]}
      selectedOption={selectedDomain}
      onChange={handleChange}
    />
  );
};

export default DomainDropdown;
