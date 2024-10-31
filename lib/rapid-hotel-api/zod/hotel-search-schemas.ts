// Hotel Search API
// https://rapidapi.com/tipsters/api/hotels-com-provider/playground/apiendpoint_01161e64-954f-4a4e-a331-ffa662e04629
import { z, ZodObject, ZodRawShape } from "zod";
import { localeSchema, domainSchema } from "./region-search-schemas";

export const API_HOTEL_SEARCH_URL =
  "https://hotels-com-provider.p.rapidapi.com/v2/hotels/search" as const;

// Options
export const HotelsSearchAccessibilityOptions = [
  "SIGN_LANGUAGE_INTERPRETER",
  "STAIR_FREE_PATH",
  "SERVICE_ANIMAL",
  "IN_ROOM_ACCESSIBLE",
  "ROLL_IN_SHOWER",
  "ACCESSIBLE_BATHROOM",
  "ELEVATOR",
  "ACCESSIBLE_PARKING",
] as const;

export const HotelsSearchAmenitiesOptions = [
  "SPA_ON_SITE",
  "WIFI",
  "HOT_TUB",
  "FREE_AIRPORT_TRANSPORTATION",
  "POOL",
  "GYM",
  "OCEAN_VIEW",
  "WATER_PARK",
  "BALCONY_OR_TERRACE",
  "KITCHEN_KITCHENETTE",
  "ELECTRIC_CAR",
  "PARKING",
  "CRIB",
  "RESTAURANT_IN_HOTEL",
  "PETS",
  "WASHER_DRYER",
  "CASINO",
  "AIR_CONDITIONING",
] as const;

export const HotelSearchSortOrderOptions = [
  "REVIEW",
  "RECOMMENDED",
  "DISTANCE",
  "PRICE_LOW_TO_HIGH",
  "PROPERTY_CLASS",
  "PRICE_RELEVANT",
] as const;
type HotelSearchSortOrderOptionsType =
  (typeof HotelSearchSortOrderOptions)[number];
const DEFAULT_SORT_ORDER: HotelSearchSortOrderOptionsType = "DISTANCE" as const;

export const HotelsSearchLodgingOptions = [
  "HOSTAL",
  "APARTMENT",
  "APART_HOTEL",
  "CHALET",
  "HOTEL",
  "RYOKAN",
  "BED_AND_BREAKFAST",
] as const;

export const HotelsSearchMealPlanOptions = [
  "ALL_INCLUSIVE",
  "FULL_BOARD",
  "HALF_BOARD",
  "FREE_BREAKFAST",
] as const;

export const HotelsSearchAvailableFilterOptions = [
  "SHOW_AVAILABLE_ONLY",
] as const;

export const HotelsSearchPaymentTypeOptions = [
  "GIFT_CARD",
  "PAY_LATER",
  "FREE_CANCELLATION",
] as const;

// Schemas
const dateRegex = /^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/; // YYYY-MM-DD
export const dateFormatSchema = z
  .string()
  .min(1, { message: "Date is required." })
  .superRefine((val, ctx) => {
    if (!dateRegex.test(val)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `${ctx.path[0]} must be a valid date in the format YYYY-MM-DD.`,
        path: ctx.path,
      });
    }
  });

const sortOrderSchema = z
  .enum(HotelSearchSortOrderOptions)
  .nullable()
  .default(DEFAULT_SORT_ORDER)
  .transform((val) => val ?? DEFAULT_SORT_ORDER);

const mealPlanSchema = z.array(z.enum(HotelsSearchMealPlanOptions)).optional();

export const adultsNumberSchema = z
  .number()
  .min(1, "The 'adults_number' is required.");

export const childrenAgesSchema = z
  .array(
    z
      .number()
      .min(0, { message: "Children age(s) must be at least 0 years old." })
      .max(17, {
        message:
          "Children age(s) must not exceed 17 years old. That's not a child!",
      })
  )
  .optional();

export function refinePriceAndDateValidationZod<T extends ZodRawShape>(
  schema: ZodObject<T>
) {
  return schema
    .refine(
      (data) => {
        const checkin = new Date(data.checkin_date);
        const checkout = new Date(data.checkout_date);
        const today = new Date();

        if (checkin < today) {
          return false; // Check-in date is in the past
        }
        if (checkout < checkin) {
          return false; // Check-out date is before check-in date
        }
        return true;
      },
      {
        message:
          "Invalid date range: check-in date must be tomorrow from today's date, and check-out date must be on or after check-in.",
        path: ["checkin_date", "checkout_date"],
      }
    )
    .refine((data) => data.price_min === undefined || data.price_min >= 0, {
      message: "Minimum price must be equal to or greater than zero.",
      path: ["price_min"],
    })
    .refine((data) => data.price_max === undefined || data.price_max >= 0, {
      message: "Maximum price must be equal to or greater than zero.",
      path: ["price_max"],
    })
    .refine(
      (data) => {
        if (data.price_min !== undefined && data.price_max !== undefined) {
          return data.price_min <= data.price_max;
        }
        return true;
      },
      {
        message: "Minimum price cannot be greater than maximum price.",
        path: ["price_min", "price_max"],
      }
    );
}

export const hotelSearchParamsSchema = refinePriceAndDateValidationZod(
  z.object({
    // Required
    checkin_date: dateFormatSchema,
    checkout_date: dateFormatSchema,
    adults_number: adultsNumberSchema,
    region_id: z.string().min(1, "The 'region_id' is required."),

    // Required, but provided default values
    sort_order: sortOrderSchema,
    locale: localeSchema,
    domain: domainSchema,

    // Optional
    price_min: z.number().optional(),
    price_max: z.number().optional(),
    star_rating_ids: z.array(z.number()).optional(),
    guest_rating_min: z.number().optional(),
    children_ages: childrenAgesSchema,
    page_number: z.number().optional(),
    accessibility: z.array(z.enum(HotelsSearchAccessibilityOptions)).optional(),
    amenities: z.array(z.enum(HotelsSearchAmenitiesOptions)).optional(),
    lodging_type: z.array(z.enum(HotelsSearchLodgingOptions)).optional(),
    meal_plan: mealPlanSchema,
    payment_type: z.array(z.enum(HotelsSearchPaymentTypeOptions)).optional(),
    available_filter: z
      .array(z.enum(HotelsSearchAvailableFilterOptions))
      .optional(),
  })
);
