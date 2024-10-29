import {
  RegionSearchDomainOptions,
  RegionSearchDomainType,
  RegionSearchLocaleOptions,
  RegionSearchLocaleType,
} from "@/types/rapid-hotels-api/region-search-types";

// Validates that the domain is in RegionSearchDomainOptions.
export function validateDomain(domain: string | null): string | null {
  if (
    domain &&
    !RegionSearchDomainOptions.includes(domain as RegionSearchDomainType)
  ) {
    return `Invalid domain. Must be one of: ${RegionSearchDomainOptions.join(
      ", "
    )}.`;
  }
  return null;
}

// Validates that the locale is in RegionSearchLocaleOptions.
export function validateLocale(locale: string | null): string | null {
  if (
    locale &&
    !RegionSearchLocaleOptions.includes(locale as RegionSearchLocaleType)
  ) {
    return `Invalid locale. Must be one of: ${RegionSearchLocaleOptions.join(
      ", "
    )}.`;
  }
  return null;
}
