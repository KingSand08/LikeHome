"use client";
import React from "react";

type SearchBarProps = {
  selectedQuery: string;
  onChange: (query: string) => void;
};

const SearchBar: React.FC<SearchBarProps> = ({ selectedQuery, onChange }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-2 text-black">Region Search Query</label>
      <input
        type="text"
        value={selectedQuery}
        onChange={handleInputChange}
        placeholder="Enter region search query"
        className="w-full p-2 border rounded text-white"
      />
    </div>
  );
};

export default SearchBar;
