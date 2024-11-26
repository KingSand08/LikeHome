"use client";

import * as React from "react";
import { format, isBefore, isEqual, isToday } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { z } from "zod";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  dateRegex,
  refinePriceAndDateValidationZod,
} from "@/lib/rapid-hotel-api/zod/hotel-search-schemas";
import { generateDefaultDates, calculateNumDays } from "../../../lib/DateFunctions";

// Zod validation schema for dates
const dateSchema = z.object({
  checkin_date: z.string().regex(dateRegex),
  checkout_date: z.string().regex(dateRegex),
});
const validatedDateSchema = refinePriceAndDateValidationZod(dateSchema);

type DatePickerWithRangeProps = {
  className?: string;
  onChange?: (dates: { checkinDate: string; checkoutDate: string; numDays: number }) => void;
  defaultNumDays?: number;
};

export function DatePickerWithRange({
  className,
  onChange,
  defaultNumDays = 7,
}: DatePickerWithRangeProps) {
  // Generate default check-in and check-out dates
  const { DEFAULT_CHECKIN_BOOKING_DATE, DEFAULT_CHECKOUT_BOOKING_DATE } =
    generateDefaultDates(defaultNumDays);

  const [dateRange, setDateRange] = React.useState<DateRange>({
    from: new Date(DEFAULT_CHECKIN_BOOKING_DATE),
    to: new Date(DEFAULT_CHECKOUT_BOOKING_DATE),
  });

  const [error, setError] = React.useState<string | null>(null);

  const validateDates = (from: Date | undefined, to: Date | undefined): boolean => {
    if (!from || !to) {
      setError("Please select a valid date range.");
      return false;
    }

    const validationResult = validatedDateSchema.safeParse({
      checkin_date: from.toISOString().split("T")[0],
      checkout_date: to.toISOString().split("T")[0],
    });

    if (!validationResult.success) {
      setError(validationResult.error.errors[0].message);
      return false;
    }

    setError(null);
    return true;
  };

  const handleDateRangeChange = (range: DateRange | undefined) => {
    if (!range?.from || !range.to) {
      setDateRange(range || { from: undefined, to: undefined });
      setError("Please select a valid date range.");
      return;
    }

    if (!validateDates(range.from, range.to)) {
      return;
    }

    const numDays = calculateNumDays(range.from, range.to);

    setDateRange(range);

    const formattedRange = {
      checkinDate: range.from.toISOString().split("T")[0],
      checkoutDate: range.to.toISOString().split("T")[0],
      numDays,
    };

    setError(null); // Clear any errors
    if (onChange) {
      onChange(formattedRange); // Notify parent component
    }
  };

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="outline"
            variant={"default"}
            className={cn(
              "btn btn-wide justify-start text-left font-normal text-base-content ",
              !dateRange && "text-muted-foreground"
            )}
          >
            <CalendarIcon />
            {dateRange?.from ? (
              dateRange.to ? (
                <>
                  {format(dateRange.from, "LLL dd, y")} -{" "}
                  {format(dateRange.to, "LLL dd, y")}
                </>
              ) : (
                format(dateRange.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={dateRange?.from}
            selected={dateRange}
            onSelect={handleDateRangeChange}
            numberOfMonths={2}
            disabled={(date)=> isBefore(date, new Date() || isEqual(date, new Date()))}
          />
        </PopoverContent>
      </Popover>
      {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
    </div>
  );
}
