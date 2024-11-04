"use client";
import { useState } from "react";
import { APIRegionJSONFormatted } from "@/app/api/hotels/region/route";
import FindRegionAPI from "../APIs/FindRegionID";
import TemplateInput from "../Templates-UI/TemplateInput";
import RegionList from "./SearchComponents/RegionList/RegionList";
import RegionListItem from "./SearchComponents/RegionList/RegionListItem";
import {
  RegionSearchDomainType,
  RegionSearchLocaleType,
} from "@/lib/rapid-hotel-api/zod/region-search-schemas";

type RegionSelectProps = {
  query: string;
  domain: RegionSearchDomainType;
  locale: RegionSearchLocaleType;
  onQueryChange: (query: string) => void;
  onRegionSelect: (regionId: string | null) => void;
};

const searchRegex = /^[\s\S]*$/;

const RegionSelect: React.FC<RegionSelectProps> = ({
  query,
  domain,
  locale,
  onQueryChange,
  onRegionSelect,
}) => {
  const [regionSearchOutput, setRegionSearchOutput] =
    useState<APIRegionJSONFormatted | null>(null);
  const [selectedRegionDetails, setSelectedRegionDetails] = useState<
    APIRegionJSONFormatted[number] | null
  >(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleRegionClick = (region: APIRegionJSONFormatted[number]) => {
    setSelectedRegionDetails(region);
    onRegionSelect(region.region_id);
  };

  const handleBackToList = () => {
    setSelectedRegionDetails(null);
    onRegionSelect(null);
  };

  const handleFindRegion = async () => {
    setLoading(true);
    setSelectedRegionDetails(null);
    try {
      const response = await FindRegionAPI({ query, domain, locale });
      if (response.regionList) {
        setRegionSearchOutput(response.regionList);
      } else {
        alert("Failed to fetch regions: " + response?.error);
        setRegionSearchOutput(null);
      }
    } catch (error) {
      alert("An unexpected error occurred. Please try again.");
      setRegionSearchOutput(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="region-select">
      <TemplateInput
        title="Region Search Query"
        placeholder="Enter region search query"
        regex={searchRegex}
        value={query}
        onChange={onQueryChange}
        required
      />
      <button
        onClick={handleFindRegion}
        className="mt-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        disabled={loading}
      >
        {loading ? "Loading..." : "Find Region"}
      </button>

      {selectedRegionDetails ? (
        <div className="mt-6">
          <h3 className="text-lg font-semibold">Selected Region</h3>
          <RegionListItem region={selectedRegionDetails} onClick={() => {}} />
          <button
            onClick={handleBackToList}
            className="mt-4 p-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
          >
            Back to List
          </button>
        </div>
      ) : (
        <div className="mt-6">
          {loading ? (
            <p className="text-blue-600">Loading...</p>
          ) : regionSearchOutput && regionSearchOutput.length > 0 ? (
            <RegionList
              regions={regionSearchOutput}
              onRegionSelect={handleRegionClick}
            />
          ) : (
            <p className="text-gray-500">No regions found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default RegionSelect;
