"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import RegionSelector from '../../components/regionSelector';

interface Hotel {
  hotel_id: string;
  name: string;
  image: {
    description: string;
    url: string;
    alt: string;
  };
}

const BookingPage: React.FC = () => {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  //const [regionId, setRegionId] = useState<string>('602703');
  const [regionId, setRegionId] = useState<string>(''); // State for selected region ID

  useEffect(() => {
    const fetchHotels = async () => {
      if (!regionId) return;
      try {
        const response = await axios.get(`/api/hotels/search?region_id=${regionId}`);
        // const response = await fetch(`/api/hotels/search?region_id=${regionId}`);
        //   if (!response.ok) {
        //     return new Response("response",{status:200})
        //   } This is for when I change to nextjs fetching instead of axios
        setHotels(response.data.properties);
      } catch (error) {
        console.error('Failed to fetch hotels:', error);
      }
    };

    fetchHotels();
  }, [regionId]);

  return (
    <div>
      <h1>Available Hotels</h1>
      <RegionSelector onSelectRegion={setRegionId} />
      <div>
        {hotels.length > 0 ? (
          hotels.map((hotel) => (
            <div key={hotel.hotel_id}>
              <h3>{hotel.name}</h3>
              <Link href={`/hotel/${hotel.hotel_id}/reservation`}>
                <a>Book Now</a>
              </Link>
            </div>
          ))
        ) : (
          <p>No hotels available.</p>
        )}
      </div>
    </div>
  );
};

export default BookingPage;
