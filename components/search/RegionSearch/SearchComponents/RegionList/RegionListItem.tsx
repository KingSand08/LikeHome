"use client";
import { APIRegionArrayFormatted } from "@/app/api/hotels/region/route";

type RegionListItemProps = {
  region: APIRegionArrayFormatted[number];
  onClick: () => void;
};

const RegionListItem: React.FC<RegionListItemProps> = ({ region, onClick }) => {
  return (
    <div className="mb-2 cursor-pointer border rounded bg-white text-black px-2 py-3" onClick={onClick}>
      <strong>{region.regionNames.displayName}</strong> - {region.type}
      <p className="text-sm text-gray-600">Region ID: {region.region_id}</p>
      <p className="text-sm text-gray-600">
        Coordinates: ({region.coordinates.lat}, {region.coordinates.long})
      </p>
      <p className="text-sm text-gray-600">Country: {region.country.name}</p>
      <p className="text-sm text-gray-600">Domain: {region.country.domain}</p>
    </div>
  );
};

export default RegionListItem;
