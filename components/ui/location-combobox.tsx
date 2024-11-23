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
const cachedLocations: Location[] = [
  {
    name: "San Jose, California, United States",
    type: "CITY",
    regionId: "602703",
    coordinates: [37.3354, -121.891907],
    country: "United States",
    domain: "US",
  },

  {
    name: "San Jose (SJC - Norman Y. Mineta San Jose Intl.), California, United States",
    type: "AIRPORT",
    regionId: "4409939",
    coordinates: [37.369739, -121.929225],
    country: "United States",
    domain: "US",
  },

  {
    name: "San José, San José Province, Costa Rica",
    type: "CITY",
    regionId: "3177",
    coordinates: [9.93286, -84.079559],
    country: "Costa Rica",
    domain: "CR",
  },

  {
    name: "San José del Cabo, Baja California Sur, Mexico",
    type: "CITY",
    regionId: "8650",
    coordinates: [23.063656, -109.702438],
    country: "Mexico",
    domain: "MX",
  },

  {
    name: "San José (SJO - Juan Santamaría Intl.), Costa Rica",
    type: "AIRPORT",
    regionId: "5196371",
    coordinates: [9.9981, -84.2046],
    country: "Costa Rica",
    domain: "CR",
  },

  {
    name: "San Jose Convention Center, San Jose, California, United States",
    type: "POI",
    regionId: "6138778",
    coordinates: [37.329081, -121.889132],
    country: "United States",
    domain: "US",
  },

  {
    name: 'San José del Cabo ("San Jose Del Cabo Airport") (SJD - Los Cabos Intl.), Baja California Sur, Mexico',
    type: "AIRPORT",
    regionId: "4475475",
    coordinates: [23.162746, -109.717368],
    country: "Mexico",
    domain: "MX",
  },

  {
    name: "Downtown San Jose, San Jose, California, United States",
    type: "NEIGHBORHOOD",
    regionId: "553248633938970011",
    coordinates: [37.335095, -121.892883],
    country: "United States",
    domain: "US",
  },

  {
    name: "San Jose (SJO - All Airports), Costa Rica",
    type: "METROCODE",
    regionId: "6139076",
    coordinates: [9.93960791512362, -84.10325688819586],
    country: "Costa Rica",
    domain: "CR",
  },

  {
    name: "San Jose State University, San Jose, California, United States",
    type: "POI",
    regionId: "6069527",
    coordinates: [37.32890082806852, -121.8749250818403],
    country: "United States",
    domain: "US",
  },
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
