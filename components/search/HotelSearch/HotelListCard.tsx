import { APIHotelSearchJSONFormatted } from "@/app/api/hotels/search/route";
import Image from "next/image";

type HotelListCardProps = {
  hotelData: APIHotelSearchJSONFormatted | null;
};

const HotelListCard = ({ hotelData }: HotelListCardProps) => {
  if (!hotelData) {
    return (
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold text-center">No results</h2>
        <p className="text-center text-gray-500">
          Please try a different search.
        </p>
      </div>
    );
  }
  const { priceRange, properties, summary } = hotelData;

  return (
    <div className="container mx-auto p-4">
      {/* Summary Section */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Summary</h2>
        <p>Matched Properties: {summary.matchedPropertiesSize}</p>
        <p>
          Price Range: ${priceRange.minPrice} - ${priceRange.maxPrice}
        </p>
      </div>

      {/* Hotel List Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((hotel) => (
          <div
            key={hotel.hotel_id}
            className="border rounded-lg shadow-md overflow-hidden"
          >
            <Image
              src={hotel.image.url}
              alt={hotel.image.alt ?? ""}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold">{hotel.name}</h3>
              <p className="text-sm text-gray-500">{hotel.image.description}</p>
              <p className="mt-2">
                Coordinates: ({hotel.coordinates.lat}, {hotel.coordinates.long})
              </p>
              <p>
                Reviews: {hotel.reviews.totalReviews} reviews,{" "}
                {hotel.reviews.starRating} stars, Score: {hotel.reviews.score}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
