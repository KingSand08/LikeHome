import {
    RegionSearchDomainType,
    RegionSearchDomainOptions,
    RegionSearchLocaleType,
    RegionSearchLocaleOptions,
  } from "@/lib/rapid-hotel-api/zod/region-search-schemas";
  
  export const isValidDomain = (domain: string): domain is RegionSearchDomainType => {
    return RegionSearchDomainOptions.includes(domain as RegionSearchDomainType);
  };
  
  export const isValidLocale = (locale: string): locale is RegionSearchLocaleType => {
    return RegionSearchLocaleOptions.includes(locale as RegionSearchLocaleType);
  };
  