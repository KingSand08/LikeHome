// api/hotels/region API route

// API output response JSON
export type APIRegionSearchResponseJSON = {
  query?: string;
  data?: APIRegionSearchResults[];
  [key: string]: any;
};

export type APIRegionSearchResults = {
  "@type"?: "gaiaRegionResult";
  index?: string;
  gaiaId?: string; // This is regionId used in api/hotel/search API route
  type?: "CITY" | "AIRPORT" | "POI" | "NEIGHBORHOOD" | "MULTICITY" | string; // Include in Frontend as an Icon?
  regionNames?: {
    fullName?: string;
    shortName?: string;
    displayName?: string; // Recommended as the name
    primaryDisplayName?: string;
    secondaryDisplayName?: string;
    lastSearchName?: string;
  };
  essId?: {
    sourceName?: "GAI";
    sourceId?: string;
  };
  coordinates?: {
    // Geocode
    lat?: string;
    long?: string;
  };
  hierarchyInfo?: {
    country?: {
      name?: string;
      isoCode2?: string; // Same as domain, make sure to set domain appropriately before any hotel search query.
      isoCode3?: string;
    };
    airport?: {
      airportCode?: string;
      airportId?: string;
      metrocode?: string;
      multicity?: string;
    };
    relation?: string[];
  };
  isMinorAirport?: "false"; // Only applies to type "AIRPORT"
  [key: string]: any;
};
