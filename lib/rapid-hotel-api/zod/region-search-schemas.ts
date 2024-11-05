// Region Search API
// https://rapidapi.com/tipsters/api/hotels-com-provider/playground/apiendpoint_8decc805-015f-4163-95e4-f3e0d276eb06
import { z } from "zod";
import { DEFAULT_DOMAIN, DEFAULT_LOCALE } from "../constants";

export const API_REGION_SEARCH_URL =
  "https://hotels-com-provider.p.rapidapi.com/v2/regions" as const;

// Options
export const RegionSearchDomainOptions = [
  "AR",
  "AS",
  "AT",
  "AU",
  "BE",
  "BR",
  "CA",
  "CH",
  "CL",
  "CN",
  "CO",
  "DE",
  "DK",
  "ES",
  "FI",
  "FR",
  "GB",
  "GR",
  "HK",
  "HU",
  "ID",
  "IE",
  "IN",
  "IS",
  "IT",
  "JP",
  "KR",
  "MX",
  "MY",
  "NL",
  "NO",
  "NZ",
  "PE",
  "PH",
  "PT",
  "SE",
  "SG",
  "TH",
  "TR",
  "TW",
  "US",
  "VN",
  "XE",
  "ZA",
] as const;

export const RegionSearchLocaleOptions = [
  "es_AR",
  "en_GB",
  "en_US",
  "ar_AE",
  "cs_CZ",
  "da_DK",
  "de_AT",
  "de_BE",
  "de_CH",
  "de_DE",
  "el_GR",
  "en_AS",
  "en_AU",
  "en_CA",
  "en_CN",
  "en_HK",
  "en_ID",
  "en_IE",
  "en_IL",
  "en_IN",
  "en_JP",
  "en_KR",
  "en_LA",
  "en_MX",
  "en_MY",
  "en_NZ",
  "en_PH",
  "en_SG",
  "en_TH",
  "en_TW",
  "en_VN",
  "en_ZA",
  "es_BO",
  "es_BZ",
  "es_CL",
  "es_CO",
  "es_CR",
  "es_EC",
  "es_ES",
  "es_GT",
  "es_GY",
  "es_HN",
  "es_MX",
  "es_NI",
  "es_PA",
  "es_PE",
  "es_PY",
  "es_SV",
  "es_US",
  "es_UY",
  "es_VE",
  "et_EE",
  "fi_FI",
  "fr_BE",
  "fr_CA",
  "fr_CH",
  "fr_FR",
  "fr_GF",
  "hr_HR",
  "hu_HU",
  "in_ID",
  "is_IS",
  "it_CH",
  "it_IT",
  "iw_IL",
  "ja_JP",
  "ko_KR",
  "lt_LT",
  "lv_LV",
  "ms_MY",
  "nl_BE",
  "nl_NL",
  "nl_SR",
  "no_NO",
  "pl_PL",
  "pt_BR",
  "pt_PT",
  "ru_RU",
  "sk_SK",
  "sv_SE",
  "th_TH",
  "tr_TR",
  "uk_UA",
  "vi_VN",
  "zh_CN",
  "zh_HK",
  "zh_TW",
] as const;

export type RegionSearchDomainType = (typeof RegionSearchDomainOptions)[number];
export type RegionSearchLocaleType = (typeof RegionSearchLocaleOptions)[number];

// Schemas
export const domainSchema = z
  .enum(RegionSearchDomainOptions)
  .nullable()
  .default(DEFAULT_DOMAIN)
  .transform((val) => val ?? DEFAULT_DOMAIN);

export const localeSchema = z
  .enum(RegionSearchLocaleOptions)
  .nullable()
  .default(DEFAULT_LOCALE)
  .transform((val) => val ?? DEFAULT_LOCALE);

export const regionSearchParamsSchema = z.object({
  query: z.string().min(1, "The 'query' is required."),
  domain: domainSchema,
  locale: localeSchema,
});
