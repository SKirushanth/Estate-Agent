import React from 'react';
import { Link } from 'react-router-dom';
import { useDrag } from 'react-dnd';
import { MapPin, Banknote } from 'lucide-react';

const PropertyCard = ({ property }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'PROPERTY',
    item: { id: property.id, property },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  // Format price
  const formattedPrice = `£${property.price.toLocaleString()}`;

  return (
    <div
      ref={drag}
      
      className={`group relative w-full bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 cursor-grab active:cursor-grabbing ${
        isDragging ? 'opacity-50' : 'opacity-100'
      }`}
    >
      {/* --- Image Section --- */}
      <div className="relative h-56 w-full overflow-hidden">
        {/* Main Image */}
        <Link to={`/property/${property.id}`}>
          <img
            src={property.images[0]}
            alt={property.type}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            onError={(e) => {
              e.target.src = 'https://placehold.co/400x300?text=No+Image';
            }}
          />
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