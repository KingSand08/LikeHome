"use client"

import React, { useState } from 'react'
import { DatePickerWithRange } from '../DatePickerWithRange'
import { DateRange } from 'react-day-picker'

export default function SearchBox() {
  const [location, setLocation] = useState("")
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined)

  const handleSearch = () => {
    // Logic to handle the search with location and date range
    console.log("Searching for hotels in:", location)
    console.log("Date range:", dateRange)
    // You would likely make a call to an API or perform a filter action here
  }

  return (
    <div className="flex justify-center mb-3">
      <div className="flex flex-wrap items-center max-w-4xl gap-6 p-6 bg-base-200 rounded-lg shadow-md w-full">
        <div className="w-full md:w-1/4">
          <input
            type="text"
            placeholder="Enter Location"
            className="input input-bordered w-full text-base-content border-black"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        
        {/* Pass dateRange and setDateRange to DatePickerWithRange */}
        <DatePickerWithRange dateRange={dateRange} setDateRange={setDateRange} />

        <button className="btn btn-primary w-full md:w-auto" onClick={handleSearch}>
          Search
        </button>
      </div>
    </div>
  )
}
