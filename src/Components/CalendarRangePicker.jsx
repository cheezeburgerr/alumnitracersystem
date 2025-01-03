"use client";

import React, { useState, useEffect } from "react";
import { addDays, format, parseISO } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

function CalendarDateRangePicker({ className, setSelectedDateRange, initialSelectedDateRange }) {
  const [date, setDate] = useState({
    from: initialSelectedDateRange?.from || '',
    to: initialSelectedDateRange?.to || '',
  });

  useEffect(() => {
    // Update the state if initialSelectedDateRange changes
    if (initialSelectedDateRange?.from && initialSelectedDateRange?.to) {
      setDate({
        from: new Date(initialSelectedDateRange.from),
        to: new Date(initialSelectedDateRange.to),
      });
    }
  }, [initialSelectedDateRange]);

  const handleDateSelect = (selected) => {
    // Ensure the selected dates are valid Date objects
    const selectedFrom = selected?.from ? new Date(selected.from) : null;
    const selectedTo = selected?.to ? new Date(selected.to) : null;

    // Format dates to 'YYYY-MM-DD' in local time zone
    const formattedFrom = selectedFrom ? format(selectedFrom, "yyyy-MM-dd") : '';
    const formattedTo = selectedTo ? format(selectedTo, "yyyy-MM-dd") : '';

    // Validate date range
    if (formattedFrom && formattedTo && formattedTo < formattedFrom) {
        alert("End date must be after start date");
        return;
    }

    const normalizedDates = {
        from: formattedFrom,
        to: formattedTo,
    };

    setDate(normalizedDates);
    setSelectedDateRange(normalizedDates); // Update the parent component with normalized dates
};

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-full justify-start text-left font-normal",
              !date?.from && "text-muted-foreground"
            )}
            size="sm"
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="end">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={handleDateSelect}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default CalendarDateRangePicker;
