"use client";

import { useState } from "react";

type TestFlightData = {
  type: string;
  origin: string;
  destination: string;
  departureDate: string;
  returnDate: string;
  price: {
    total: string;
  };
  links: {
    flightDates: string;
    flightOffers: string;
  };
};

export default function TestAPIPage() {
  const [flights, setFlights] = useState<TestFlightData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchFlightDestinations = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/hotels/testapi");
      if (!response.ok) {
        throw new Error("Failed to fetch test data");
      }

      const data = await response.json();
      setFlights(data.data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 text-black">
      <h1 className="text-xl font-bold mb-4 text-white">Flight Destinations</h1>
      <button
        onClick={fetchFlightDestinations}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
        disabled={loading}
      >
        {loading ? "Loading..." : "Fetch Flights"}
      </button>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <div className="overflow-auto">
        <table className="table-auto w-full border border-collapse text-white">
          <thead>
            <tr className="bg-gray-200 text-black">
              <th className="p-2 border">Origin</th>
              <th className="p-2 border">Destination</th>
              <th className="p-2 border">Departure Date</th>
              <th className="p-2 border">Return Date</th>
              <th className="p-2 border">Price (EUR)</th>
              <th className="p-2 border">Flight Dates Link</th>
              <th className="p-2 border">Flight Offers Link</th>
            </tr>
          </thead>
          <tbody>
            {flights.map((flight, index) => (
              <tr key={index}>
                <td className="p-2 border">{flight.origin}</td>
                <td className="p-2 border">{flight.destination}</td>
                <td className="p-2 border">{flight.departureDate}</td>
                <td className="p-2 border">{flight.returnDate}</td>
                <td className="p-2 border">{flight.price.total}</td>
                <td className="p-2 border">
                  <a
                    href={flight.links.flightDates}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    View Dates
                  </a>
                </td>
                <td className="p-2 border">
                  <a
                    href={flight.links.flightOffers}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    View Offers
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
