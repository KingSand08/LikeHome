import HotelSearchUIComplete from "@/components/search/HotelSearch/HotelSearchUIComplete";
import RegionSearchUIComplete from "@/components/search/RegionSearch/RegionSearchUIComplete";

const TestPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 text-black">
      <div className="w-full max-w-4xl p-4 border border-black">
        <RegionSearchUIComplete />
        <HotelSearchUIComplete />
      </div>
    </div>
  );
};

export default TestPage;
