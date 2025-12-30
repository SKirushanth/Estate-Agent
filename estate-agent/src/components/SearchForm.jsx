import React, { useState } from 'react';
import { Search, RotateCcw } from 'lucide-react';

const SearchForm = ({ onSearch }) => {
  const [filters, setFilters] = useState({
    type: 'any',
    minPrice: '',
    maxPrice: '',
    minBedrooms: '',
    maxBedrooms: '',
    postcodeArea: '',
    dateAfter: '',
    dateBefore: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Convert empty strings to appropriate types for filtering logic
    const processedFilters = {
      type: filters.type,
      minPrice: Number(filters.minPrice) || 0,
      maxPrice: Number(filters.maxPrice) || 10000000,
      minBedrooms: Number(filters.minBedrooms) || 0,
      maxBedrooms: Number(filters.maxBedrooms) || 10,
      postcodeArea: filters.postcodeArea.trim(),
      dateAfter: filters.dateAfter,
      dateBefore: filters.dateBefore
    };
    onSearch(processedFilters);
  };

  const handleReset = () => {
    const initialstate = {
      type: 'any',
      minPrice: '',
      maxPrice: '',
      minBedrooms: '',
      maxBedrooms: '',
      postcodeArea: '',
      dateAfter: '',
      dateBefore: ''
    };
    setFilters(initialstate);
    onSearch({
        type: 'any',
        minPrice: 0,
        maxPrice: 10000000,
        minBedrooms: 0,
        maxBedrooms: 10,
        postcodeArea: '',
        dateAfter: '',
        dateBefore: ''
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-slate-800">Filter Properties</h3>
        <button type="button" onClick={handleReset} className="text-sm text-slate-500 hover:text-red-500 flex items-center gap-1">
          <RotateCcw className="w-3 h-3" /> Reset
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Type */}
        <div className="space-y-1">
          <label className="text-xs font-medium text-slate-500 uppercase">Property Type</label>
          <select name="type" value={filters.type} onChange={handleChange} className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none">
            <option value="any">Any Type</option>
            <option value="House">House</option>
            <option value="Flat">Flat</option>
          </select>
        </div>

        {/* Postcode */}
        <div className="space-y-1">
          <label className="text-xs font-medium text-slate-500 uppercase">Postcode Area</label>
          <input 
            type="text" 
            name="postcodeArea" 
            placeholder="e.g. BR1, NW1" 
            value={filters.postcodeArea} 
            onChange={handleChange} 
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        {/* Price Range */}
        <div className="space-y-1">
          <label className="text-xs font-medium text-slate-500 uppercase">Min Price</label>
          <input type="number" name="minPrice" placeholder="Min £" value={filters.minPrice} onChange={handleChange} className="w-full p-2 border rounded-lg" />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-slate-500 uppercase">Max Price</label>
          <input type="number" name="maxPrice" placeholder="Max £" value={filters.maxPrice} onChange={handleChange} className="w-full p-2 border rounded-lg" />
        </div>

        {/* Bedrooms */}
        <div className="space-y-1">
          <label className="text-xs font-medium text-slate-500 uppercase">Min Beds</label>
          <select name="minBedrooms" value={filters.minBedrooms} onChange={handleChange} className="w-full p-2 border rounded-lg">
            <option value="">No Min</option>
            {[1,2,3,4,5].map(num => <option key={num} value={num}>{num}+</option>)}
          </select>
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-slate-500 uppercase">Max Beds</label>
          <select name="maxBedrooms" value={filters.maxBedrooms} onChange={handleChange} className="w-full p-2 border rounded-lg">
            <option value="">No Max</option>
            {[1,2,3,4,5].map(num => <option key={num} value={num}>{num}</option>)}
          </select>
        </div>

        {/* Dates */}
        <div className="space-y-1">
          <label className="text-xs font-medium text-slate-500 uppercase">Added After</label>
          <input type="date" name="dateAfter" value={filters.dateAfter} onChange={handleChange} className="w-full p-2 border rounded-lg text-sm" />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-slate-500 uppercase">Added Before</label>
          <input type="date" name="dateBefore" value={filters.dateBefore} onChange={handleChange} className="w-full p-2 border rounded-lg text-sm" />
        </div>
      </div>

      <div className="mt-6">
        <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg flex justify-center items-center gap-2 transition">
          <Search className="w-5 h-5" /> Search Properties
        </button>
      </div>
    </form>
  );
};

export default SearchForm;