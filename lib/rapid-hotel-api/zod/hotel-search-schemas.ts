// Hotel Search API
// https://rapidapi.com/tipsters/api/hotels-com-provider/playground/apiendpoint_01161e64-954f-4a4e-a331-ffa662e04629
import { z, ZodObject, ZodRawShape } from "zod";
import { localeSchema, domainSchema } from "./region-search-schemas";
import {
  DEFAULT_MAX_PRICE,
  DEFAULT_MIN_PRICE,
  DEFAULT_SORT_ORDER,
} from "../constants/USER_OPTIONS";
import { isBefore, isEqual, startOfDay } from "date-fns";

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
export type HotelsSearchAccessibilityOptionsType =
  (typeof HotelsSearchAccessibilityOptions)[number];

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
export type HotelsSearchAmenitiesOptionsType =
  (typeof HotelsSearchAmenitiesOptions)[number];

export const HotelSearchSortOrderOptions = [
  "REVIEW",
  "RECOMMENDED",
  "DISTANCE",
  "PRICE_LOW_TO_HIGH",
  "PROPERTY_CLASS",
  "PRICE_RELEVANT",
] as const;
export type HotelSearchSortOrderOptionsType =
  (typeof HotelSearchSortOrderOptions)[number];

export const HotelsSearchLodgingOptions = [
  "HOSTAL",
  "APARTMENT",
  "APART_HOTEL",
  "CHALET",
  "HOTEL",
  "RYOKAN",
  "BED_AND_BREAKFAST",
] as const;
export type HotelsSearchLodgingOptionsType =
  (typeof HotelsSearchLodgingOptions)[number];

export const HotelsSearchMealPlanOptions = [
  "ALL_INCLUSIVE",
  "FULL_BOARD",
  "HALF_BOARD",
  "FREE_BREAKFAST",
] as const;
export type HotelsSearchMealPlanOptionsType =
  (typeof HotelsSearchMealPlanOptions)[number];

export const HotelsSearchAvailableFilterOptions = [
  "SHOW_AVAILABLE_ONLY",
] as const;
export type HotelsSearchAvailableFilterOptionsType =
  (typeof HotelsSearchAvailableFilterOptions)[number];

export const HotelsSearchPaymentTypeOptions = [
  "GIFT_CARD",
  "PAY_LATER",
  "FREE_CANCELLATION",
] as const;
export type HotelsSearchPaymentTypeOptionsType =
  (typeof HotelsSearchPaymentTypeOptions)[number];

// Schemas
export const dateRegex = /^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/; // YYYY-MM-DD
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

export const sortOrderSchema = z
  .enum(HotelSearchSortOrderOptions)
  .nullable()
  .default(DEFAULT_SORT_ORDER)
  .transform((val) => val ?? DEFAULT_SORT_ORDER);

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
        const today = startOfDay(new Date());
        const [checkinYear, checkinMonth, checkinDay] = data.checkin_date.split("-");
        const checkin = new Date(checkinYear, checkinMonth - 1, checkinDay);
        const [checkoutYear, checkoutMonth, checkoutDay] = data.checkout_date.split("-");
        const checkout = new Date(checkoutYear, checkoutMonth -  1, checkoutDay);

        if (checkin < today) {
          return false; // Check-in date is in the past
        }
        if (checkout < checkin) {
          return false; // Check-out date is before check-in date
        }
        if (isEqual(checkin, checkout)) {
          return false;
        }
        if (isEqual(checkin, checkout)) {
          return false;
        }
        return true;
      },
      {
        message: `Invalid date range: check-in date must be tomorrow or later, and check-out date must be on or after check-in. check-in and check-out dates cannot be the same`,
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

export const hotelSearchParamsBasicSchema = z.object({
  // Required
  checkin_date: dateFormatSchema, // Part of booking
  checkout_date: dateFormatSchema, // Part of booking
  adults_number: adultsNumberSchema, // Part of booking
  region_id: z.string().min(1, "The 'region_id' is required."),

  // Required, but provided default values
  sort_order: sortOrderSchema,
  locale: localeSchema,
  domain: domainSchema,

  // Optional
  price_min: z.number().default(DEFAULT_MIN_PRICE),
  price_max: z.number().default(DEFAULT_MAX_PRICE),
  star_rating_ids: z.array(z.number()).optional(), // Ignored for frontend
  guest_rating_min: z.number().optional(), // Ignored for frontend
  children_ages: childrenAgesSchema, // Part of booking
  page_number: z.number().optional(), // Ignored for frontend
  accessibility: z.array(z.enum(HotelsSearchAccessibilityOptions)).optional(),
  amenities: z.array(z.enum(HotelsSearchAmenitiesOptions)).optional(),
  lodging_type: z.array(z.enum(HotelsSearchLodgingOptions)).optional(),
  meal_plan: z.array(z.enum(HotelsSearchMealPlanOptions)).optional(),
  payment_type: z.array(z.enum(HotelsSearchPaymentTypeOptions)).optional(),
  available_filter: z
    .array(z.enum(HotelsSearchAvailableFilterOptions))
    .optional(),
});
export const hotelSearchParamsRefinedSchema = refinePriceAndDateValidationZod(
  hotelSearchParamsBasicSchema
);
