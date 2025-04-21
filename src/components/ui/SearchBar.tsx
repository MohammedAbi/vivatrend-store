import React from "react";
import { FiSearch } from "react-icons/fi";

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchQuery,
  onSearchChange,
}) => {
  return (
    <div className="flex justify-center mb-12">
      <div className="relative flex w-full max-w-xl">
        <FiSearch className="absolute top-4 left-3 text-gray-400" />
        <label htmlFor="search" className="sr-only text-white">
          Search products
        </label>
        <input
          id="search"
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full p-3 pl-10 rounded-l-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent"
        />
        <button className="btn btn-primary px-6 rounded-r-lg">Search</button>
      </div>
    </div>
  );
};

export default SearchBar;
