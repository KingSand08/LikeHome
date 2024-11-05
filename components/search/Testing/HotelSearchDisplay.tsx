type HotelSearchInputs = {
  accessibilityOptions: string[];
  amenitiesOptions: string[];
  mealPlanOptions: string[];
  lodgingOptions: string[];
  paymentType: string[];
  availableOnly: string[];
  price_min: number;
  price_max: number;
  sortOrder: string;
};

type HotelSearchDisplayProps = {
  hotelSearchInputs: HotelSearchInputs;
};

const HotelSearchDisplay: React.FC<HotelSearchDisplayProps> = ({
  hotelSearchInputs,
}) => {
  return (
    <div className="mt-4 p-4 border rounded bg-gray-100">
      <h3 className="text-lg font-semibold mb-2 text-black">Hotel Search Inputs</h3>
      <ul className="list-disc list-inside text-black">
        <li>
          <strong>Accessibility Optiosns:</strong>{" "}
          {hotelSearchInputs.accessibilityOptions.join(", ") || "N/A"}
        </li>
        <li>
          <strong>Amenities Options:</strong>{" "}
          {hotelSearchInputs.amenitiesOptions.join(", ") || "N/A"}
        </li>
        <li>
          <strong>Meal Plan Options:</strong>{" "}
          {hotelSearchInputs.mealPlanOptions.join(", ") || "N/A"}
        </li>
        <li>
          <strong>Lodging Options:</strong>{" "}
          {hotelSearchInputs.lodgingOptions.join(", ") || "N/A"}
        </li>
        <li>
          <strong>Payment Type Options:</strong>{" "}
          {hotelSearchInputs.paymentType.join(", ") || "N/A"}
        </li>
        <li>
          <strong>Availability Options:</strong>{" "}
          {hotelSearchInputs.availableOnly.join(", ") || "N/A"}
        </li>
        <li>
          <strong>Price Range:</strong> ${hotelSearchInputs.price_min} - $
          {hotelSearchInputs.price_max}
        </li>
        <li>
          <strong>Sort Order:</strong> {hotelSearchInputs.sortOrder}
        </li>
      </ul>
    </div>
  );
};

export default HotelSearchDisplay;
