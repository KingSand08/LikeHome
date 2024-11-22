"use client";
import { useState } from "react";
import { APIRegionArrayFormatted } from "@/app/api/hotels/region/route";
import TemplateInput from "../Templates-UI/TemplateInput";
import RegionList from "./SearchComponents/RegionList/RegionList";
import RegionListItem from "./SearchComponents/RegionList/RegionListItem";
import {
  RegionSearchDomainType,
  RegionSearchLocaleType,
} from "@/lib/rapid-hotel-api/zod/region-search-schemas";
import { REGION_SEARCH_API_URL } from "@/lib/rapid-hotel-api/constants/ROUTES";
import { JSONToURLSearchParams } from "@/lib/rapid-hotel-api/APIFunctions";
import LocationCombobox from "@/components/ui/location-combobox";

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
    useState<APIRegionArrayFormatted | null>(null);
  const [selectedRegionDetails, setSelectedRegionDetails] = useState<
    APIRegionArrayFormatted[number] | null
  >(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleRegionClick = (region: APIRegionArrayFormatted[number]) => {
    setSelectedRegionDetails(region);
    onRegionSelect(region.region_id);
  };

  const handleBackToList = () => {
    setSelectedRegionDetails(null);
    onRegionSelect(null);
  };

  const handleFindRegion = async (
    _query?: string,
    _domain?: string,
    _locale?: string
  ) => {
    setLoading(true);
    setSelectedRegionDetails(null);
    try {
      const urlParams = JSONToURLSearchParams({
        query: _query ?? query,
        domain: _domain ?? domain,
        locale: _locale ?? locale,
      });

      const response = await fetch(
        `${REGION_SEARCH_API_URL}?${urlParams.toString()}`
      );
      if (!response.ok) {
        alert(
          `Failed to fetch regions. Status: ${response?.status}. StatusText: ${response?.statusText}`
        );
        setRegionSearchOutput(null);
      } else {
        const REGION_DATA: APIRegionArrayFormatted = await response.json();

        setRegionSearchOutput(REGION_DATA);
      }
    } catch (error) {
      alert("An unexpected error occurred. Please try again.");
      setRegionSearchOutput(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <LocationCombobox searchLocations={handleFindRegion} setRegionId={onRegionSelect} />
      <TemplateInput
        title="Region Search Query"
        placeholder="Enter region search query"
        regex={searchRegex}
        value={query}
        onChange={onQueryChange}
        required
      />
      {!selectedRegionDetails?.region_id ? (
        <button
          onClick={() => handleFindRegion()}
          className="mt-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? "Loading..." : "Find Region"}
        </button>
      ) : null}

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
          {loading ? null : regionSearchOutput &&
            regionSearchOutput.length > 0 ? (
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
