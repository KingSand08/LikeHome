"use client";
import { useParams, useSearchParams } from "next/navigation";

const Page: React.FC = () => {
  const params = useParams();
  const searchParams = useSearchParams();

  const hotelId = params.hotelId;
  const queryParams = Array.from(searchParams.entries());

  return (
    <div>
      <h1>Temporary redirect (for testing)</h1>
      <p>This is where you would retrieve room data from another API call using the provided hotelId slug and searchParams</p>
      <p>Hotel: {hotelId}</p>
      <p>Search Params:</p>
      <ul>
        {queryParams.map(([key, value]) => (
          <li key={key}>
            {key}: {value}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Page;
