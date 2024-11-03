"use client";
import React, { useState } from "react";
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

const SearchUIComplete: React.FC = () => {
  // Inputs
  const [regionSearchInputs, setRegionSearchInputs] = useState<
    z.infer<typeof regionSearchParamsSchema>
  >({
    query: "",
    domain: DEFAULT_DOMAIN,
    locale: DEFAULT_LOCALE,
  });
  // Output
  const [regionSearchOutput, setRegionSearchOutput] =
    useState<APIRegionJSONFormatted | null>(null);
  const mockRegions: APIRegionJSONFormatted = [
    {
      region_id: "1",
      type: "City",
      regionNames: {
        displayName: "Sample City",
        fullName: "",
        shortName: "",
        primaryDisplayName: "",
        secondaryDisplayName: "",
        lastSearchName: "",
      },
      coordinates: {
        lat: "",
        long: "",
      },
      country: {
        name: "",
        domain: "",
      },
    },
  ];

  // Handle state changes
  const handleDomainChange = (domain: RegionSearchDomainType) => {
    setRegionSearchInputs((prev) => ({ ...prev, domain }));
  };
  const handleLocaleChange = (locale: RegionSearchLocaleType) => {
    setRegionSearchInputs((prev) => ({ ...prev, locale }));
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
        </ul>
      </div>

      {/* Domain Dropdown */}
      <DomainDropdown
        selectedDomain={regionSearchInputs.domain}
        onChange={handleDomainChange}
      />
      {/* Locale Dropdown */}
      <LocaleDropdown
        selectedLocale={regionSearchInputs.locale}
        onChange={handleLocaleChange}
      />

      {/* Search Bar */}
    </div>
  );
};

export default SearchUIComplete;
