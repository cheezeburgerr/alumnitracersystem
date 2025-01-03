"use client"

import React, { useState } from "react";
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

function CalendarDateRangePicker({ className, setSelectedDateRange }) {
  const [date, setDate] = useState({
    from: '',
    to: '',
  });

  const handleDateSelect = (selected) => {
    // Ensure the selected dates are valid Date objects
    const selectedFrom = selected?.from ? new Date(selected.from) : '';
    const selectedTo = selected?.to ? new Date(selected.to) : '';

    const normalizedDates = {
      from: selectedFrom,
      to: selectedTo,
    };

    setDate(normalizedDates);
    setSelectedDateRange(normalizedDates); // Update the date range in the parent

    // console.log(selectedFrom);
  };

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[260px] justify-start text-left font-normal",
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
