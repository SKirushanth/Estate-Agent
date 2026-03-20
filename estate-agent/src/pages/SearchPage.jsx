import React, { useEffect, useRef, useState } from "react";
import PropertyCard from "../components/PropertyCard";
import FavouritesSidebar from "../components/FavouritesSidebar";
// Asset import for the background image
import heroBg from "../assets/hero-bg.avif";
import properties from "../data/properties";
import { Search, RefreshCw, ChevronDown } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const SearchPage = ({
  addToFavourites,
  favourites,
  removeFromFavourites,
  clearFavourites,
}) => {
  const heroSectionRef = useRef(null);
  const heroImageRef = useRef(null);

  const [filters, setFilters] = useState({
    type: "any",
    minPrice: "",
    maxPrice: "",
    minBedrooms: "",
    maxBedrooms: "",
    postcode: "",
  });

  // Filter Logic
  const filteredProperties = properties.filter((property) => {
    if (filters.type !== "any" && property.type.toLowerCase() !== filters.type)
      return false;
    if (filters.minPrice && property.price < parseInt(filters.minPrice))
      return false;
    if (filters.maxPrice && property.price > parseInt(filters.maxPrice))
      return false;
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
    if (
      filters.postcode &&
      !property.postcode
        .toLowerCase()
        .startsWith(filters.postcode.toLowerCase())
    )
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
    });
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!heroSectionRef.current || !heroImageRef.current) {
      return undefined;
    }

    const context = gsap.context(() => {
      gsap.set(heroImageRef.current, {
        scale: 1.2,
        transformOrigin: "center center",
      });

      gsap.to(heroImageRef.current, {
        scale: 1,
        ease: "none",
        scrollTrigger: {
          trigger: heroSectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, heroSectionRef);

    return () => {
      context.revert();
    };
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 pb-12">
      {/* 1. HERO SECTION */}
      <section
        id="hero"
        ref={heroSectionRef}
        className="relative min-h-screen px-4 text-white shadow-lg mb-10 overflow-hidden flex items-center justify-center"
      >
        <img
          ref={heroImageRef}
          src={heroBg}
          alt="Luxury homes hero"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-900/35 to-slate-900/10" />

        <div className="relative z-10 w-full max-w-4xl text-center">
          <h1 className="text-4xl md:text-6xl font-serif font-medium mb-4 drop-shadow-2xl">
            Find Your Dream Home
          </h1>
          <p className="text-white text-lg md:text-xl max-w-2xl mx-auto drop-shadow-lg font-serif opacity-90">
            Search through our extensive collection of properties to find your
            perfect match
          </p>
        </div>
      </section>

      <div
        id="properties"
        className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-4 gap-8"
      >
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-serif font-bold text-slate-800">
                Find Your Perfect Property
              </h2>
              <button
                onClick={resetFilters}
                className="text-sm text-slate-500 hover:text-blue-600 flex items-center gap-1 transition"
              >
                <RefreshCw className="w-4 h-4" /> Reset Filters
              </button>
            </div>

            {/* Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
            </div>
          </div>

          <div className="flex justify-between items-center px-2">
            <h3 className="text-xl font-serif font-bold text-slate-800">
              Properties
            </h3>
            <span className="bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1 rounded-full">
              {filteredProperties.length} found
            </span>
          </div>

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
