import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useDrag } from "react-dnd";
import { MapPin, Banknote } from "lucide-react";

const PropertyCard = ({ property }) => {
  const cardRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "PROPERTY",
    item: { id: property.id, property },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  // Format price
  const formattedPrice = `£${property.price.toLocaleString()}`;

  return (
    <div
      ref={(node) => {
        drag(node);
        cardRef.current = node;
      }}
      className={`group relative w-full bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 cursor-grab active:cursor-grabbing transform-gpu ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      } ${isDragging ? "opacity-50" : "hover:-translate-y-2"}`}
    >
      {/* --- Image Section --- */}
      <div className="relative h-56 w-full overflow-hidden">
        {/* Main Image */}
        <Link to={`/property/${property.id}`}>
          <img
            src={property.images[0]}
            alt={property.type}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            onError={(e) => {
              e.target.src = "https://placehold.co/400x300?text=No+Image";
            }}
          />

          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-900/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <div className="absolute inset-x-0 bottom-0 p-4 flex items-end justify-between text-white opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-white/80 mb-1">
                {property.tenure}
              </p>
              <p className="text-sm font-semibold">{property.bedrooms} Beds</p>
            </div>
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-white/20 border border-white/30 backdrop-blur-sm">
              View Details
            </span>
          </div>
        </Link>
      </div>

      {/* --- Content Section --- */}
      <div className="p-6">
        {/* Category (Type) */}
        <p className="text-gray-400 text-[10px] font-bold tracking-[0.2em] uppercase mb-3">
          {property.type}
        </p>

        <Link to={`/property/${property.id}`} className="block">
          <h3 className="font-serif text-2xl text-gray-800 leading-tight mb-6 line-clamp-2 hover:text-[#E37D32] transition-colors">
            {property.description}
          </h3>
        </Link>

        {/* Details Grid */}
        <div className="space-y-4">
          {/* Location Row */}
          <div className="flex items-center justify-between border-b border-gray-100 pb-2">
            <div className="flex items-center text-gray-500 gap-3">
              <MapPin size={16} />
              <span className="text-[10px] font-bold tracking-widest uppercase">
                Location
              </span>
            </div>
            <span className="text-gray-700 text-sm font-semibold uppercase">
              {property.postcode}
            </span>
          </div>

          {/* Price Row */}
          <div className="flex items-center justify-between">
            <div className="flex items-center text-gray-500 gap-3">
              <Banknote size={16} />
              <span className="text-[10px] font-bold tracking-widest uppercase">
                Price
              </span>
            </div>
            <span className="text-gray-800 text-sm font-bold">
              {formattedPrice}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
