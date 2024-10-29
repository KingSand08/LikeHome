// Validates that the min price is not greater than the max price.
export function validatePriceRange(
  minPrice: string | null,
  maxPrice: string | null
): string | null {
  if (minPrice && maxPrice && parseInt(minPrice) > parseInt(maxPrice)) {
    return "Minimum price cannot be greater than maximum price.";
  }
  return null;
}
