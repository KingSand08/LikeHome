import { APIRegionJSONFormatted } from "@/app/api/hotels/region/route";

type RegionListItemProps = {
  region: APIRegionJSONFormatted[number];
};

const RegionListItem: React.FC<RegionListItemProps> = ({ region }) => {
  return (
    <li key={region.region_id} className="mb-2">
      <strong>{region.regionNames.displayName}</strong> - {region.type}
      <p className="text-sm text-gray-600">Region ID: {region.region_id}</p>
      <p className="text-sm text-gray-600">
        Coordinates: ({region.coordinates.lat}, {region.coordinates.long})
      </p>
      <p className="text-sm text-gray-600">Country: {region.country.name}</p>
      <p className="text-sm text-gray-600">Domain: {region.country.domain}</p>
    </li>
  );
};

export default RegionListItem;
