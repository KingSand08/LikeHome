import { APIRegionJSONFormatted } from "@/app/api/hotels/region/route";
import { REGION_SEARCH_API_URL } from "@/lib/rapid-hotel-api/api-setup";
import { regionSearchParamsSchema } from "@/lib/rapid-hotel-api/zod/region-search-schemas";
import { z } from "zod";

type FindRegionAPIProps = z.infer<typeof regionSearchParamsSchema>;

const FindRegionAPI = async ({ query, domain, locale }: FindRegionAPIProps) => {
  try {
    const validatedInput = regionSearchParamsSchema.parse({
      query,
      domain,
      locale,
    });
    const searchParams = new URLSearchParams();
    searchParams.append("query", query);
    searchParams.append("domain", domain);
    searchParams.append("locale", locale);

    const regionSearchEndpoint = `${REGION_SEARCH_API_URL}?${searchParams.toString()}`;

    const response = await fetch(regionSearchEndpoint);
    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }
    
    const JSON_DATA: APIRegionJSONFormatted = await response.json();
    if (!JSON_DATA || JSON_DATA === undefined) {
      throw new Error(
        `API error: ${response.status} ${response.statusText} | EMPTY OUTPUT`
      );
    }
    return {
      inputs: validatedInput,
      endpoint: regionSearchEndpoint,
      regionList: JSON_DATA,
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("Validation failed:", error.errors);
      return {
        error:
          "Invalid input: " + error.errors.map((err) => err.message).join(", "),
      };
    }
    console.error("Unexpected error:", error);
    return {
      error: "Unexpected validation error.",
    };
  }
};

export default FindRegionAPI;
