"use client";
import { useState } from "react";
import {
  RegionSearchDomainType,
  RegionSearchLocaleType,
  regionSearchParamsSchema,
} from "@/lib/rapid-hotel-api/zod/region-search-schemas";
import {
  DEFAULT_DOMAIN,
  DEFAULT_LOCALE,
} from "@/lib/rapid-hotel-api/zod/constants";
import { APIRegionJSONFormatted } from "@/app/api/hotels/region/route";
import { z } from "zod";
import DomainDropdown from "./SearchComponents/DomainDropdown";
import LocaleDropdown from "./SearchComponents/LocaleDropdown";
import RegionSelect from "./RegionSelect";

const RegionSearchUIComplete: React.FC = () => {
  // Inputs
  const [regionSearchInputs, setRegionSearchInputs] = useState<
    z.infer<typeof regionSearchParamsSchema>
  >({
    query: "",
    domain: DEFAULT_DOMAIN,
    locale: DEFAULT_LOCALE,
  });
  const [selectedRegionId, setSelectedRegionId] = useState<string | null>(null);

  const handleDomainChange = (domain: RegionSearchDomainType) => {
    setRegionSearchInputs((prev) => ({ ...prev, domain }));
  };
  const handleLocaleChange = (locale: RegionSearchLocaleType) => {
    setRegionSearchInputs((prev) => ({ ...prev, locale }));
  };
  const handleQueryChange = (query: string) => {
    setRegionSearchInputs((prev) => ({ ...prev, query }));
  };
  const handleRegionSelect = (regionId: string | null) => {
    setSelectedRegionId(regionId);
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Region Search</h2>

      {/* Inputs */}
      <div className="mt-4 p-4 border rounded bg-gray-100">
        <h3 className="text-lg font-semibold mb-2">Region Search Inputs</h3>
        <ul className="list-disc list-inside text-black">
          <li>
            <strong>Query:</strong> {regionSearchInputs.query || "N/A"}
          </li>
          <li>
            <strong>Domain:</strong> {regionSearchInputs.domain}
          </li>
          <li>
            <strong>Locale:</strong> {regionSearchInputs.locale}
          </li>
          <li>
            <strong>Selected Region ID:</strong> {selectedRegionId}
          </li>
        </ul>
      </div>
      <div className="flex flex-row justify-between space-x-4">
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

      {/* Region Select */}
      <RegionSelect
        query={regionSearchInputs.query}
        domain={regionSearchInputs.domain}
        locale={regionSearchInputs.locale}
        onQueryChange={handleQueryChange}
        onRegionSelect={handleRegionSelect} // Pass callback to update selected region
      />
    </div>
  );
};

export default RegionSearchUIComplete;
