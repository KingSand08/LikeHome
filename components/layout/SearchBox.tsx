import React from 'react'
import { FaCalendarAlt } from 'react-icons/fa'


export default function SearchBox () {
    {/* Search Bar Section */}
    return (
    <div className="flex justify-center mb-8">
    <div className="flex flex-wrap items-center max-w-4xl gap-6 p-6 bg-base-200 rounded-lg shadow-md w-full">
    <div className="w-full md:w-1/4">
        <label className="block mb-1 text-base font-semibold text-base-content">
        Location
        </label>
        <input
        type="text"
        placeholder="Enter Location"
        className="input input-bordered w-full text-base-content"
        />
    </div>
    <div className="w-full md:w-1/4">
        <label className="block mb-1 text-base font-semibold text-base-content">
        Start Date
        </label>
        <div className="relative">
        <input
            type="date"
            className="input input-bordered w-full text-base-content pr-4"
        />
        <FaCalendarAlt
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-base-content pointer-events-none"
        />
        </div>
    </div>
    <div className="w-full md:w-1/4">
        <label className="block mb-1 text-base font-semibold text-base-content">
        End Date
        </label>
        <div className="relative">
        <input
            type="date"
            className="input input-bordered w-full text-base-content pr-4"
        />
        <FaCalendarAlt
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-base-content pointer-events-none"
        />
        </div>
    </div>
    <div className="flex-grow"></div>
    <button className="btn btn-primary w-full md:w-auto">Search</button>
    </div>
    </div>
    )
}
    
    