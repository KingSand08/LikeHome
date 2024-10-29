// Hotel Room Offers API
// https://rapidapi.com/tipsters/api/hotels-com-provider/playground/apiendpoint_513f7e8b-520e-465d-8aca-f50cc42e6969

// api/hotels/search/rooms API route
// Find input in hotel-room-offers-types.ts

// Output use postman API client or use rapidAPI link above to see structure
// API output

export type ApiHotelRoomOffersResponseJSON = {
  __typename: string;
  id: string;
  soldOut: boolean;
  units: any[];
  stickyBar: {
    __typename: string;
    displayPrice: string;
    price: {
      __typename: string;
      strikeOut: string;
      disclaimer: string;
      formattedDisplayPrice: string;
    };
    qualifier: string;
    subText: string;
  };
  listings: any;
  categorizedListings: categorizedListing[];
  unitsCarousel: any;
  legalBanner: any;
  errorMessage: any;
  shoppingContext: any;
  propertyHighlightSection: any;
  singleUnitOffer: any;
  spaceDetails: any;
};

type categorizedListing = {
  __typename: string;
  unitId: string;
  header: {
    __typename: string;
    text: string;
    subText: string;
  };
  featureHeader: {
    __typename: string;
    text: string;
    headingType: string;
  };
  features: any[];
  footerActions: any;
  highlightedMessages: string[];
  includedPerks: any;
  primaryHeader: any;
  secondaryHeader: any;
  tertiaryHeader: any;
  primarySelections: PrimarySelection[];
};

type PrimarySelection = {
  __typename: string;
  primarySelection: any;
  secondarySelections: any[];
  propertyUnit: {
    __typename: string;
    description: string;
    id: string;
    header: {
      __typename: string;
      text: string;
    };
    unitGallery: UnitGallery;
    ratePlans: RatePlan[]; // Hotels have dynamic pricing models, so will have to go back to this later
    roomAmenities: any;
    features: any[];
    detailsDialog: any;
    availabilityCallToAction: string;
    spaceDetails: string;
  };
};

type UnitGallery = {
  __typename: string;
  gallery: PropertyImage[];
};

type PropertyImage = {
  __typename: string;
  image: {
    __typename: string;
    aspectRatio: number;
    description: string;
    url: string;
  };
};

// Hotels have dynamic pricing models, so will have to go back to this later
type RatePlan = {
  __typename: string;
  id: string;
  name: string | null;
  description: string | null;
  badge: {
    __typename: string;
    text: string | null;
    theme_temp: string | null;
    icon_temp: string | null;
    mark: string | null;
  } | null;
  amenities: any[];
  highlightedMessages: any[];
  priceDetails: PriceDetail[];
  confidenceMessage: string | null;
  loyaltyMessage: string | null;
  paymentPolicy: any[];
  reserveCallToAction: any | null;
  etpDialogTopMessage: string | null;
};

type PriceDetail = {
  __typename: string;
  availability: any;
  cancellationPolicy: any;
  deposit: any | null;
  depositPolicies: any[];
  etpModalPolicies: any[];
  dynamicRateRule: any;
  fees: any[];
  mandatoryFees: any | null;
  noCreditCard: boolean;
  offerBookButton: any;
  paymentModel: string | null;
  priceBreakDownSummary: any | null;
  pricePresentation: any | null;
  pricePresentationDialog: any | null;
  pointsApplied: any | null;
  price: {
    total: {
        __typename: string;
        amount: number; 
    }
  };
  priceAfterLoyaltyPointsApplied: any;
  pricingScheme: any;
  propertyNaturalKeys: any[];
  roomTypeId: string | null;
  showTotalPrice: boolean;
  sourceType: string | null;
  totalPriceMessage: string | null;
};