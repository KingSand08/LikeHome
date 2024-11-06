"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Region {
  region_id: string;
  regionNames: {
    displayName: string;
  };
}

const RegionSelector: React.FC<{ onSelectRegion: (regionId: string) => void }> = ({ onSelectRegion }) => {
  const [regions, setRegions] = useState<Region[]>([]);

  useEffect(() => {
    const fetchRegions = async () => {
      try {
        const response = await axios.get('/api/hotels/region'); 
        setRegions(response.data);
      } catch (error) {
        console.error('Failed to fetch regions:', error);
      }
    };

    fetchRegions();
  }, []);

  return (
    <select onChange={(e) => onSelectRegion(e.target.value)} defaultValue="">
      <option value="" disabled>Select a region</option>
      {regions.map((region) => (
        <option key={region.region_id} value={region.region_id}>
          {region.regionNames.displayName}
        </option>
      ))}
    </select>
  );
};

export default RegionSelector;
