type RegionSearchInputs = {
  query: string;
  domain: string;
  locale: string;
};

type RegionSearchDisplayProps = {
  regionSearchInputs: RegionSearchInputs;
  selectedRegionId: string | null;
};

const RegionSearchDisplay: React.FC<RegionSearchDisplayProps> = ({
  regionSearchInputs,
  selectedRegionId,
}) => {
  return (
    <div className="mt-4 p-4 border rounded bg-gray-100">
      <h3 className="text-lg font-semibold mb-2 text-black">Region Search Inputs</h3>
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
          <strong>Selected Region ID:</strong> {selectedRegionId || "N/A"}
        </li>
      </ul>
    </div>
  );
};

export default RegionSearchDisplay;
