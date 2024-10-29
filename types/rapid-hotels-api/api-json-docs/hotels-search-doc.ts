// Refer to types/rapid-hotels-api/hotel-search-types.ts for API input searchParams. See HotelsSearchQuery.\
// Otherwise, check possible searchParams in requiredSearchParams, requiredWithDefaultSearchParams (required, but gives default value if not provided), optionalSearchParams in function validateSearchParams.

// api/hotels/search API route
// Hotel Search API output:

// Level 0 - API output
export type ApiHotelSearchResponseJSON = {
  __typename: "PropertySearchResults";
  filterMetadata: PropertyFilterMetadata;
  properties: Property[];
  universalSortAndFilter: any;
  propertySearchListings: any;
  summary: {
    matchedPropertiesSize: number;
  };
  searchCriteria: any;
  shoppingContext: any;
  map: any;
  clickstream: any;
  [key: string]: any;
};

// Level 1 - filterMetadata
type PropertyFilterMetadata = {
  __typename: "PropertyFilterMetadata";
  priceRange: PriceRange; // Set minPrice and maxPrice absolute limits.
  [key: string]: any;
};
// Level 2 - filterMetadata attributes
type PriceRange = {
  __typename: "PriceRange";
  max: number;
  min: number;
  [key: string]: any;
};

// Level 1 - properties (hotels)
export type Property = {
  __typename: "Property";
  id: string; // hotelId, required for HotelRoomOffers api
  name: string;
  featuredMessages: any[];
  availability: PropertyAvailability;
  propertyImage: PropertyImage;
  destinationInfo: PropertyDestinationInfo;
  legalDisclaimer: string | null;
  listingFooter: string | null;
  mapMarker: MapMarker;
  neighborhood: Region;
  offerBadge: string | null;
  offerSummary: OfferSummary;
  pinnedDetails: string;
  price: PropertyPrice; // Price of hotel
  priceAfterLoyaltyPointsApplied: PropertyPrice;
  propertyFees: any[];
  reviews: PropertyReviewsSummary;
  star: number | null;
  supportingMessages: string | null;
  regionId: string;
  priceMetadata: PropertyPriceMetadata;
  saveTripItem: string | null;
  [key: string]: any;
};

// Level 2 - Property (hotel) attributes
type PropertyAvailability = {
  __typename: "PropertyAvailability";
  available: boolean;
  minRoomsLeft: number | null;
};

type PropertyImage = {
  __typename: "PropertyImage";
  alt: string;
  fallbackImage: string | null;
  image: Image;
  subjectId: number;
};

type Image = {
  __typename: "Image";
  description: string;
  url: string;
};

type PropertyDestinationInfo = {
  __typename: "PropertyDestinationInfo";
  distanceFromDestination: Distance;
  distanceFromMessaging: string;
  regionId: string;
};

type Distance = {
  __typename: "Distance";
  unit: string;
  value: number;
};

type MapMarker = {
  __typename: "MapMarker";
  label: string;
  latLong: Coordinates;
};

type Coordinates = {
  __typename: "Coordinates";
  latitude: number;
  longitude: number;
};

type Region = {
  __typename: "Region";
  name: string;
};

type OfferSummary = {
  __typename: "OfferSummary";
  messages: OfferSummaryMessage[];
  attributes: OfferAttribute[];
};

type OfferSummaryMessage = {
  __typename: "OfferSummaryMessage";
  message: string;
  theme: string;
  type: string;
  mark: string | null;
};

type OfferAttribute = {
  __typename: "OfferAttribute";
  type: string;
};

type PropertyPrice = {
  __typename: "PropertyPrice";
  options: PropertyPriceOption[];
  priceMessaging: string | null;
  lead: Money;
  strikeOut: Money;
  displayMessages: PriceDisplayMessage[];
  strikeOutType: string;
  priceMessages: LodgingPlainMessage[];
};

type PropertyPriceOption = {
  __typename: "PropertyPriceOption";
  strikeOut: Money;
  disclaimer: LodgingPlainMessage;
  formattedDisplayPrice: string;
};

type Money = {
  __typename: "Money";
  amount: number;
  formatted: string;
  currencyInfo?: Currency; // Optional if needed in some contexts
};

type Currency = {
  __typename: "Currency";
  code: string;
  symbol: string;
};

type PriceDisplayMessage = {
  __typename: "PriceDisplayMessage";
  lineItems: (LodgingEnrichedMessage | DisplayPrice)[];
};

type LodgingEnrichedMessage = {
  __typename: "LodgingEnrichedMessage";
  accessibilityLabel: string | null;
  mark: string | null;
  state: string;
  value: string;
  badge: string | null;
};

type DisplayPrice = {
  __typename: "DisplayPrice";
  disclaimer: LodgingPlainDialog | null;
  price: FormattedMoney;
  role: string;
};

type LodgingPlainDialog = {
  __typename: "LodgingPlainDialog";
  content: string[];
  title: string | null;
};

type FormattedMoney = {
  __typename: "FormattedMoney";
  formatted: string;
  accessibilityLabel: string;
};

type LodgingPlainMessage = {
  __typename: "LodgingPlainMessage";
  value: string;
};

type PropertyReviewsSummary = {
  __typename: "PropertyReviewsSummary";
  score: number;
  total: number;
};

type PropertyPriceMetadata = {
  __typename: "PropertyPriceMetadata";
  discountType: string;
  rateDiscount: RateDiscount;
  totalDiscountPercentage: number;
};

type RateDiscount = {
  __typename: "RateDiscount";
  description: string;
};
