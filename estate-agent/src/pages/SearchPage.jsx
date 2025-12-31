import React, { useState } from "react";
import PropertyCard from "../components/PropertyCard";
import FavouritesSidebar from "../components/FavouritesSidebar";
import { properties } from "../data/properties";
import { Search, RefreshCw, Calendar, ChevronDown } from "lucide-react";

const SearchPage = ({
  addToFavourites,
  favourites,
  removeFromFavourites,
  clearFavourites,
}) => {
  const [filters, setFilters] = useState({
    type: "any",
    minPrice: "",
    maxPrice: "",
    minBedrooms: "",
    maxBedrooms: "",
    postcode: "",
    dateAfter: "",
    dateBefore: "",
  });

  // Filter Logic
  const filteredProperties = properties.filter((property) => {
    // Type
    if (filters.type !== "any" && property.type.toLowerCase() !== filters.type)
      return false;

    // Price
    if (filters.minPrice && property.price < parseInt(filters.minPrice))
      return false;
    if (filters.maxPrice && property.price > parseInt(filters.maxPrice))
      return false;

    // Bedrooms
    if (
      filters.minBedrooms &&
      property.bedrooms < parseInt(filters.minBedrooms)
    )
      return false;
    if (
      filters.maxBedrooms &&
      property.bedrooms > parseInt(filters.maxBedrooms)
    )
      return false;

    // Postcode (Matches start of postcode)
    if (
      filters.postcode &&
      !property.postcode
        .toLowerCase()
        .startsWith(filters.postcode.toLowerCase())
    )
      return false;

    // Date
    const propDate = new Date(property.dateAdded);
    if (filters.dateAfter && propDate < new Date(filters.dateAfter))
      return false;
    if (filters.dateBefore && propDate > new Date(filters.dateBefore))
      return false;

    return true;
  });

  const handleDragDrop = (item) => {
    addToFavourites(item);
  };

  const resetFilters = () => {
    setFilters({
      type: "any",
      minPrice: "",
      maxPrice: "",
      minBedrooms: "",
      maxBedrooms: "",
      postcode: "",
      dateAfter: "",
      dateBefore: "",
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-12">
      {/* 1. HERO SECTION (Blue Header) */}
      <div className="bg-blue-900 text-white py-16 px-4 text-center shadow-lg mb-8">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Find Your Dream Home
        </h1>
        <p className="text-blue-200 text-lg max-w-2xl mx-auto">
          Search through our extensive collection of properties to find your
          perfect match
        </p>
      </div>

      <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* 2. MAIN CONTENT AREA */}
        <div className="lg:col-span-3 space-y-6">
          {/* Search Filters Card */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-slate-800">
                Find Your Perfect Property
              </h2>
              <button
                onClick={resetFilters}
                className="text-sm text-slate-500 hover:text-blue-600 flex items-center gap-1 transition"
              >
                <RefreshCw className="w-4 h-4" /> Reset Filters
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Type */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-500 uppercase">
                  Property Type
                </label>
                <div className="relative">
                  <select
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={filters.type}
                    onChange={(e) =>
                      setFilters({ ...filters, type: e.target.value })
                    }
                  >
                    <option value="any">Any Type</option>
                    <option value="house">House</option>
                    <option value="flat">Flat</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-3.5 w-4 h-4 text-slate-400 pointer-events-none" />
                </div>
              </div>

              {/* Min Price */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-500 uppercase">
                  Min Price
                </label>
                <input
                  type="number"
                  placeholder="No min"
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={filters.minPrice}
                  onChange={(e) =>
                    setFilters({ ...filters, minPrice: e.target.value })
                  }
                />
              </div>

              {/* Max Price */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-500 uppercase">
                  Max Price
                </label>
                <input
                  type="number"
                  placeholder="No max"
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={filters.maxPrice}
                  onChange={(e) =>
                    setFilters({ ...filters, maxPrice: e.target.value })
                  }
                />
              </div>

              {/* Min Bedrooms */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-500 uppercase">
                  Min Bedrooms
                </label>
                <select
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={filters.minBedrooms}
                  onChange={(e) =>
                    setFilters({ ...filters, minBedrooms: e.target.value })
                  }
                >
                  <option value="">No min</option>
                  {[1, 2, 3, 4, 5].map((num) => (
                    <option key={num} value={num}>
                      {num}+
                    </option>
                  ))}
                </select>
              </div>

              {/* Max Bedrooms */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-500 uppercase">
                  Max Bedrooms
                </label>
                <select
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={filters.maxBedrooms}
                  onChange={(e) =>
                    setFilters({ ...filters, maxBedrooms: e.target.value })
                  }
                >
                  <option value="">No max</option>
                  {[1, 2, 3, 4, 5].map((num) => (
                    <option key={num} value={num}>
                      {num}
                    </option>
                  ))}
                </select>
              </div>

              {/* Postcode */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-500 uppercase">
                  Postcode Area
                </label>
                <input
                  type="text"
                  placeholder="E.G. BR1, NW1"
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={filters.postcode}
                  onChange={(e) =>
                    setFilters({ ...filters, postcode: e.target.value })
                  }
                />
              </div>

              {/* Date Added After */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-500 uppercase">
                  Added After
                </label>
                <div className="relative">
                  <input
                    type="date"
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={filters.dateAfter}
                    onChange={(e) =>
                      setFilters({ ...filters, dateAfter: e.target.value })
                    }
                  />
                  <Calendar className="absolute right-3 top-3.5 w-4 h-4 text-slate-400 pointer-events-none" />
                </div>
              </div>

              {/* Date Added Before */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-500 uppercase">
                  Added Before
                </label>
                <div className="relative">
                  <input
                    type="date"
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={filters.dateBefore}
                    onChange={(e) =>
                      setFilters({ ...filters, dateBefore: e.target.value })
                    }
                  />
                  <Calendar className="absolute right-3 top-3.5 w-4 h-4 text-slate-400 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className="flex justify-between items-center px-2">
            <h3 className="text-xl font-bold text-slate-800">Properties</h3>
            <span className="bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1 rounded-full">
              {filteredProperties.length} found
            </span>
          </div>

          {/* Property Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredProperties.length > 0 ? (
              filteredProperties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))
            ) : (
              <div className="col-span-full py-12 text-center text-slate-500 bg-white rounded-xl border border-dashed border-slate-300">
                <Search className="w-12 h-12 mx-auto mb-3 opacity-20" />
                <p className="text-lg">No properties match your filters.</p>
                <button
                  onClick={resetFilters}
                  className="text-blue-600 font-bold mt-2 hover:underline"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>

        {/* 3. SIDEBAR (Favourites) */}
        <div className="lg:col-span-1">
          <FavouritesSidebar
            favourites={favourites}
            onRemove={removeFromFavourites}
            onClear={clearFavourites}
            onDrop={handleDragDrop}
          />
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
