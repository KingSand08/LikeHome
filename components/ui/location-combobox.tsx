import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  DEFAULT_DOMAIN,
  DEFAULT_LOCALE,
} from "@/lib/rapid-hotel-api/constants/USER_OPTIONS";
import { JSONToURLSearchParams } from "@/lib/rapid-hotel-api/APIFunctions";
import { REGION_SEARCH_API_URL } from "@/lib/rapid-hotel-api/constants/ROUTES";
import { APIRegionArrayFormatted } from "@/app/api/hotels/region/route";
import { useState, use } from "react";

// TODO: Replace with a DB call to get the cached regions
const cachedLocations: APIRegionArrayFormatted = [
  {
    region_id: "602703",
    type: "CITY",
    regionNames: {
      fullName: "San Jose, California, United States",
      shortName: "San Jose",
      displayName: "San Jose, California, United States",
      primaryDisplayName: "San Jose",
      secondaryDisplayName: "California, United States",
      lastSearchName: "San Jose, California, United States",
    },
    coordinates: {
      lat: "37.3354",
      long: "-121.891907",
    },
    country: {
      name: "United States",
      domain: "US",
    },
  },
  {
    region_id: "4409939",
    type: "AIRPORT",
    regionNames: {
      fullName:
        "San Jose (SJC - Norman Y. Mineta San Jose Intl.), California, United States",
      shortName: "SJC",
      displayName: "San Jose Airport",
      primaryDisplayName: "Norman Y. Mineta San Jose Intl.",
      secondaryDisplayName: "San Jose, California, United States",
      lastSearchName: "San Jose (SJC - Norman Y. Mineta San Jose Intl.)",
    },
    coordinates: {
      lat: "37.369739",
      long: "-121.929225",
    },
    country: {
      name: "United States",
      domain: "US",
    },
  },
  {
    region_id: "3177",
    type: "CITY",
    regionNames: {
      fullName: "San José, San José Province, Costa Rica",
      shortName: "San José",
      displayName: "San José, Costa Rica",
      primaryDisplayName: "San José",
      secondaryDisplayName: "San José Province, Costa Rica",
      lastSearchName: "San José, Costa Rica",
    },
    coordinates: {
      lat: "9.93286",
      long: "-84.079559",
    },
    country: {
      name: "Costa Rica",
      domain: "CR",
    },
  },
];

export default function LocationCombobox({
  setRegionId,
}: {
  setRegionId: React.Dispatch<string>;
}) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [ops, setOps] = useState(cachedLocations);
  const [query, setQuery] = useState("");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? ops.find((loc) => loc.regionNames.displayName === value)
                ?.regionNames.displayName
            : "Select Location..."}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput
            placeholder="Search locations..."
            onValueChange={setQuery}
          />
          <CommandList>
            <CommandEmpty>
              <button onClick={() => handleFindRegion(query, ops, setOps)}>
                No location found. Click to search.
              </button>
            </CommandEmpty>
            <CommandGroup>
              {ops.map((loc) => (
                <CommandItem
                  key={loc.region_id}
                  value={loc.regionNames.displayName}
                  onSelect={(currentValue) => {
                    setRegionId(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  {loc.regionNames.displayName}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === loc.regionNames.displayName
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
              <button onClick={() => handleFindRegion(query, ops, setOps)}>
                Click to search for more.
              </button>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

const handleFindRegion = async (
  query: string,
  ops: APIRegionArrayFormatted,
  setOps: React.Dispatch<APIRegionArrayFormatted>,
  domain?: string,
  locale?: string
) => {
  const urlParams = JSONToURLSearchParams({
    query: query,
    domain: domain ?? DEFAULT_DOMAIN,
    locale: locale ?? DEFAULT_LOCALE,
  });

  const response = await fetch(
    `${REGION_SEARCH_API_URL}?${urlParams.toString()}`
  );
  if (!response.ok) alert(`Failed to fetch regions.`);

  const REGION_DATA: APIRegionArrayFormatted = await response.json();
  setOps([...REGION_DATA, ...ops]);
};
