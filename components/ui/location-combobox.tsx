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

type Location = {
  name: string;
  type: string;
  regionId: string;
  coordinates: [number, number];
  country: string;
  domain: string;
};

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
  }
];

type LocationComboboxProps = {
  searchLocations: (query: string) => void;
  setRegionId: (regionId: string) => void;
};

export default function LocationCombobox(props: LocationComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const handleSearch = (value: string) => {
      setValue(value);
      props.searchLocations(value);
  };

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
            ? cachedLocations.find((loc) => loc.name === value)?.name
            : "Select Location..."}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search locations..." />
          <CommandList>
            <CommandEmpty>
              <button onClick={handleSearch}>
                No location found. Click to search.
              </button>
            </CommandEmpty>
            <CommandGroup>
              {cachedLocations.map((loc) => (
                <CommandItem
                  key={loc.regionId}
                  value={loc.name}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    props.setRegionId(loc.regionId);
                    setOpen(false);
                  }}
                >
                  {loc.name}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === loc.name ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
