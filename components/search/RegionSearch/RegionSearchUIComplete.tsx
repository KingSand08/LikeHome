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
import SearchBar from "./SearchComponents/SearchBar";
import FindRegionAPI from "./FindRegionAPI";
import RegionListItem from "./RegionListItem";

const RegionSearchUIComplete: React.FC = () => {
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
  const [loading, setLoading] = useState<boolean>(false);

  // Handle state changes
  const handleDomainChange = (domain: RegionSearchDomainType) => {
    setRegionSearchInputs((prev) => ({ ...prev, domain }));
  };
  const handleLocaleChange = (locale: RegionSearchLocaleType) => {
    setRegionSearchInputs((prev) => ({ ...prev, locale }));
  };
  const handleQueryChange = (query: string) => {
    setRegionSearchInputs((prev) => ({ ...prev, query }));
  };

  const handleFindRegion = async () => {
    setLoading(true);
    try {
      const response = await FindRegionAPI(regionSearchInputs);
      if (response.regionList) {
        setRegionSearchOutput(response.regionList);
      } else {
        alert("Failed to fetch regions: " + response?.error);
      }
    } catch (error) {
      alert("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
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
      <SearchBar
        selectedQuery={regionSearchInputs.query}
        onChange={handleQueryChange}
      />

      {/* Find Region */}
      <button
        onClick={handleFindRegion}
        className="mt-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        disabled={loading}
      >
        {loading ? "Loading..." : "Find Region"}
      </button>

      {/* Loading */}
      {loading && <p className="mt-4 text-blue-600">Loading...</p>}

      {/* Output */}
      {regionSearchOutput && !loading && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Regions Found</h3>
          <ul className="list-disc list-inside text-black">
            {regionSearchOutput.map((region) => (
              <RegionListItem key={region.region_id} region={region} />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default RegionSearchUIComplete;
