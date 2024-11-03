import {
  RegionSearchDomainType,
  RegionSearchLocaleType,
} from "./region-search-schemas";
import { HotelSearchSortOrderOptionsType } from "./hotel-search-schemas";

// Region search
export const DEFAULT_DOMAIN: RegionSearchDomainType = "US" as const;
export const DEFAULT_LOCALE: RegionSearchLocaleType = "en_US" as const;

// Hotel search
export const DEFAULT_SORT_ORDER: HotelSearchSortOrderOptionsType =
  "REVIEW" as const;
