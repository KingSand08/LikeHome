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
import { useState, useContext } from "react";
import { RegionContext } from "../providers/RegionProvider";
import { CommandEmpty } from "cmdk";
import { usePathname, useRouter } from "next/navigation";
import { Region } from "@prisma/client";
import { getCachedRegions } from "@/server-actions/region-actions";

export default function LocationCombobox() {
  const [open, setOpen] = useState(false);
  const [ops, setOps] = useState<Omit<Region, "id">[]>([]);

  React.useEffect(() => {
    getCachedRegions().then((regions) => setOps(regions));
  }, []);

  const pathname = usePathname();
  const router = useRouter();

  const [value, setValue] = useContext(RegionContext);
  const [query, setQuery] = useState("");

  const dropdownRef = React.useRef<HTMLDivElement>(null);
  const handleBlur = (e: React.FocusEvent) => {
    // Check if focus is still within the dropdown
    if (!dropdownRef.current?.contains(e.relatedTarget as Node)) {
      setOpen(false);
    }
  };
  const handleSelection = (currentValue: string, loc: Omit<Region, "id">) => {
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
          if (e.key === "Enter") handleFindRegion(query, setOps);
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
            {ops.map((loc, index) => (
              <CommandItem
                key={index}
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
  setOps: React.Dispatch<React.SetStateAction<Omit<Region, "id">[]>>,
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

  const regionData: Omit<Region, "id">[] = await response.json();
  // remove duplicates by region_id
  setOps((prev: Omit<Region, "id">[]) =>
    [...prev, ...regionData].filter(
      (value, index, self) =>
        self.findIndex((t) => t.region_id === value.region_id) === index
    )
  );
};
