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
import { APIRegion } from "@/app/api/hotels/region/route";
import { useState, useContext, useEffect } from "react";
import { RegionContext } from "../providers/RegionProvider";
import { CommandEmpty } from "cmdk";
import { usePathname, useRouter } from "next/navigation";
import { fetchRegionDetails } from "@/server-actions/api-actions";
import { retrieveCacheRegions } from "@/server-actions/cache-actions";

// TODO: Replace with a DB call to get the cached regions
const cachedLocationIds: string[] = [
  "602703", // San Jose, California, United States
  "4409939", // San Jose (SJC - Norman Y. Mineta San Jose Intl.), California, United States
  "652645981589159936", // Lake Tahoe, United States of America
  "2011", // Los Angeles, California, United States
  "3132", // San Francisco, California, United States
  "2621", // New York, New York, United States
  "2008", // Las Vegas, Nevada, United States
];

export default function LocationCombobox() {
  const [value, setValue] = useContext(RegionContext);
  const [open, setOpen] = useState(false);
  const [ops, setOps] = useState<APIRegion[]>([]);
  const [query, setQuery] = useState("");
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const retrieveCache = async () => {
      const dbCache = await retrieveCacheRegions(cachedLocationIds);
      if (dbCache && dbCache.length > 0) {
        setOps(dbCache);
      }
    };
    retrieveCache();
  }, []);

  const findRegion = () => {
    handleFindRegion(query, ops, setOps);
  };
  const dropdownRef = React.useRef<HTMLDivElement>(null);
  const handleBlur = (e: React.FocusEvent) => {
    if (!dropdownRef.current?.contains(e.relatedTarget as Node)) {
      setOpen(false);
    }
  };
  const handleSelection = (currentValue: string, loc: APIRegion) => {
    const isDeselect = currentValue === value?.name;
    if (isDeselect) {
      setValue(undefined);
      return;
    }
    setValue({
      region_id: loc.region_id,
      name: loc.regionNames.displayName,
    });
    setQuery(loc.regionNames.displayName);
    setOpen(false);

    if (pathname !== "/") {
      router.push("/");
    }
  };

  return (
    <Command
      ref={dropdownRef}
      onFocus={() => setOpen(true)}
      onBlur={handleBlur}
      className={`relative ${
        open ? "rounded-lg rounded-b-none" : "rounded-lg"
      } text-neutral dark:text-gray-100 dark:bg-gray-800 border-2 border-primary focus:outline-none focus:ring-2 focus:ring-blue-500`}
    >
      <CommandInput
        placeholder={value?.name ?? "Search locations..."}
        onValueChange={setQuery}
        onKeyDown={(e) => {
          if (e.key === "Enter") findRegion();
          else if (e.key === "Escape") setOpen(false);
        }}
      />
      {open && <hr />}
      {open && (
        <CommandList className="z-50 absolute top-full left-0 w-full bg-white dark:bg-gray-800 max-h-60 overflow-auto rounded-lg rounded-t-none border-2 border-t-0 border-primary">
          <CommandEmpty className="py-3 text-center text-sm w-full">
            Press Enter to search for more locations.
          </CommandEmpty>
          <CommandGroup>
            {ops.map((loc) => (
              <CommandItem
                key={loc.region_id}
                value={loc.regionNames.displayName}
                onSelect={(currentValue) => handleSelection(currentValue, loc)}
              >
                {loc.regionNames.displayName}
                <Check
                  className={cn(
                    "ml-auto",
                    value?.name === loc.regionNames.displayName
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
  ops: APIRegion[],
  setOps: React.Dispatch<APIRegion[]>,
  domain?: string,
  locale?: string
) => {
  const urlParams = JSONToURLSearchParams({
    query: query,
    domain: domain ?? DEFAULT_DOMAIN,
    locale: locale ?? DEFAULT_LOCALE,
  });

  const REGION_DATA = await fetchRegionDetails(
    query,
    urlParams.get("domain"),
    urlParams.get("locale")
  );

  if (!REGION_DATA) {
    alert(`Failed to fetch regions.`);
    return;
  }

  setOps([...REGION_DATA, ...ops]);
};
