"use client";
import { APIRegionArrayFormatted } from "@/app/api/hotels/region/route";
import RegionListItem from "./RegionListItem";

type RegionListProps = {
  regions: APIRegionArrayFormatted;
  onRegionSelect: (region: APIRegionArrayFormatted[number]) => void;
};

const RegionList: React.FC<RegionListProps> = ({ regions, onRegionSelect }) => {
  if (!regions || regions.length === 0) {
    return <p className="text-gray-500">No regions found.</p>;
  }

  return (
    <div className="list-disc list-inside text-black">
      {regions.map((region) => (
        <RegionListItem
          key={region.region_id}
          region={region}
          onClick={() => onRegionSelect(region)}
        />
      ))}
    </div>
  );
};

export default RegionList;
