"use client";
import {
  RegionSearchDomainType,
  RegionSearchLocaleType,
  regionSearchParamsSchema,
} from "@/lib/rapid-hotel-api/zod/region-search-schemas";
import DomainDropdown from "./SearchComponents/DomainDropdown";
import LocaleDropdown from "./SearchComponents/LocaleDropdown";
import RegionSelect from "./RegionSelect";
import { z } from "zod";
import RegionSearchDisplay from "../Testing/RegionSearchDisplay";

type RegionSearchInputs = z.infer<typeof regionSearchParamsSchema>;

type RegionSearchUICompleteProps = {
  regionSearchInputs: RegionSearchInputs;
  selectedRegionId: string | null;
  setRegionSearchInputs: (inputs: RegionSearchInputs) => void;
  setSelectedRegionId: (regionId: string | null) => void;
};

const RegionSearchUIComplete: React.FC<RegionSearchUICompleteProps> = ({
  regionSearchInputs,
  selectedRegionId,
  setRegionSearchInputs,
  setSelectedRegionId,
}) => {
  const handleDomainChange = (domain: RegionSearchDomainType) => {
    setRegionSearchInputs({ ...regionSearchInputs, domain });
  };

  const handleLocaleChange = (locale: RegionSearchLocaleType) => {
    setRegionSearchInputs({ ...regionSearchInputs, locale });
  };

  const handleQueryChange = (query: string) => {
    setRegionSearchInputs({ ...regionSearchInputs, query });
  };

  const handleRegionSelect = (regionId: string | null) => {
    setSelectedRegionId(regionId);
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Region Search</h2>

      {/* Display Current Inputs */}
      <RegionSearchDisplay
        regionSearchInputs={regionSearchInputs}
        selectedRegionId={selectedRegionId}
      />

      {/* Dropdown Inputs */}
      <div className="flex flex-row justify-between space-x-4 mt-4">
        <div className="flex-1">
          <DomainDropdown
            selectedDomain={regionSearchInputs.domain}
            onChange={handleDomainChange}
          />
        </div>
        <div className="flex-1">
          <LocaleDropdown
            selectedLocale={regionSearchInputs.locale}
            onChange={handleLocaleChange}
          />
        </div>
      </div>

      {/* Region Select Component */}
      <RegionSelect
        query={regionSearchInputs.query}
        domain={regionSearchInputs.domain}
        locale={regionSearchInputs.locale}
        onQueryChange={handleQueryChange}
        onRegionSelect={handleRegionSelect}
      />
    </div>
  );
};

export default RegionSearchUIComplete;
