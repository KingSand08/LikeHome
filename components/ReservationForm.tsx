'use client';

import React, { useState } from 'react';
import { FaCalendarAlt } from 'react-icons/fa';

type ReservationFormProps = {
  pricePerNight: number;
  singleRoomsAvailable: number;
  doubleRoomsAvailable: number;
};

export default function ReservationForm({
  pricePerNight,
  singleRoomsAvailable,
  doubleRoomsAvailable,
}: ReservationFormProps) {
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [roomType, setRoomType] = useState<string>('single');

  return (
    <div className="space-y-6">
      {/* Room Type Selector */}
      <div className="form-control w-full max-w-xs">
        <label htmlFor="roomType" className="label">
          <span className="label-text text-base-content">Choose Room Type</span>
        </label>
        <select
          id="roomType"
          name="roomType"
          className="select select-bordered w-full text-base-content"
          value={roomType}
          onChange={(e) => setRoomType(e.target.value)}
        >
          <option disabled selected>Room Type</option>
          <option value="single">Single Room (Available: {singleRoomsAvailable})</option>
          <option value="double">Double Room (Available: {doubleRoomsAvailable})</option>
        </select>
      </div>

      {/* Date Selection with Calendar Icon */}
      <div className="flex space-x-6">
        <div className="form-control w-full max-w-xs">
          <label htmlFor="startDate" className="block mb-1 text-base font-semibold text-base-content">
            Start Date
          </label>
          <div className="relative">
            <input
              type="date"
              id="startDate"
              name="startDate"
              className="input input-bordered w-full text-base-content pr-4"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
            <FaCalendarAlt
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-base-content pointer-events-none"
            />
          </div>
        </div>

        <div className="form-control w-full max-w-xs">
          <label htmlFor="endDate" className="block mb-1 text-base font-semibold text-base-content">
            End Date
          </label>
          <div className="relative">
            <input
              type="date"
              id="endDate"
              name="endDate"
              className="input input-bordered w-full text-base-content pr-4"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
            <FaCalendarAlt
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-base-content pointer-events-none"
            />
          </div>
        </div>
      </div>

      {/* Reserve Now Button */}
      <button
        className="btn btn-primary w-full"
        onClick={() => alert(`Reserving ${roomType} room from ${startDate} to ${endDate}`)}
      >
        Reserve Now
      </button>
    </div>
  );
}
