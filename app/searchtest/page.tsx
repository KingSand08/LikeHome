import SearchUIComplete from "@/components/search/SearchUIComplete";

const TestPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 text-black">
      <div className="w-full max-w-4xl p-4 border border-black">
        <SearchUIComplete />
      </div>
    </div>
  );
};

export default TestPage;
