"use client";
import * as React from "react";
import { Check } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  DEFAULT_DOMAIN,
  DEFAULT_LOCALE,
} from "@/lib/rapid-hotel-api/constants/USER_OPTIONS";
import { JSONToURLSearchParams } from "@/lib/rapid-hotel-api/APIFunctions";
import { REGION_SEARCH_API_URL } from "@/lib/rapid-hotel-api/constants/ROUTES";
import { APIRegionArrayFormatted } from "@/app/api/hotels/region/route";
import { useState, useContext } from "react";
import { RegionContext } from "../providers/RegionProvider";
import { CommandEmpty } from "cmdk";

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

export default function LocationCombobox() {
  const [value, setValue] = useContext(RegionContext);
  const [open, setOpen] = useState(false);
  const [ops, setOps] = useState(cachedLocations);
  const [query, setQuery] = useState("");
  const findRegion = () => handleFindRegion(query, ops, setOps);

  return (
    <Command
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
      className={`relative ${
        open ? "rounded-lg rounded-b-none" : "rounded-lg"
      } text-neutral dark:text-gray-100 dark:bg-gray-800 border-2 border-primary focus:outline-none focus:ring-2 focus:ring-blue-500`}
    >
      <CommandInput
        placeholder="Search locations..."
        onValueChange={setQuery}
        onKeyDown={(e) => {
          if (e.key == "Enter") findRegion();
          else if (e.key == "Escape") setOpen(false);
        }}
      />
      {open && <hr />}
      {open && (
        <CommandList className="absolute top-full left-0 w-full bg-white dark:bg-gray-800 max-h-60 overflow-auto rounded-lg rounded-t-none border-2 border-t-0 border-primary">
          <CommandEmpty className="py-3 text-center text-sm w-full">
            Press Enter to search for more locations.
          </CommandEmpty>
          <CommandGroup>
            {ops.map((loc) => (
              <CommandItem
                key={loc.region_id}
                value={loc.regionNames.displayName}
                onSelect={(currentValue) => {
                  const isDeselect = currentValue == value;
                  if (isDeselect) {
                    setValue({});
                    return;
                  }
                  setValue({
                    region_id: loc.region_id,
                    name: loc.regionNames.displayName,
                  });
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
          </CommandGroup>
        </CommandList>
      )}
    </Command>
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
  console.log(response);
  if (!response.ok) alert(`Failed to fetch regions.`);

  const REGION_DATA: APIRegionArrayFormatted = await response.json();
  setOps([...REGION_DATA, ...ops]);
};