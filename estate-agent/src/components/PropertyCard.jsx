import React from 'react';
import { Link } from 'react-router-dom';
import { useDrag } from 'react-dnd';
import { Bed, MapPin, Calendar } from 'lucide-react';

const PropertyCard = ({ property }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'PROPERTY',
    item: { id: property.id, property },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div 
      ref={drag}
      className={`bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition cursor-grab active:cursor-grabbing ${isDragging ? 'opacity-50' : 'opacity-100'}`}
    >
      <div className="relative h-48 w-full bg-slate-200">
        <img 
          src={property.images[0]} 
          alt={property.type} 
          className="w-full h-full object-cover"
          onError={(e) => {e.target.src = 'https://placehold.co/400x300?text=No+Image'}}
        />
        <div className="absolute top-3 left-3 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase">
          {property.type}
        </div>
      </div>
      
      <div className="p-5">
        <h3 className="text-2xl font-bold text-blue-900 mb-1">£{property.price.toLocaleString()}</h3>
        <p className="text-slate-600 mb-4 line-clamp-1">{property.description}</p>
        
        <div className="flex items-center gap-4 text-sm text-slate-500 mb-4">
          <div className="flex items-center gap-1">
            <Bed className="w-4 h-4" />
            <span>{property.bedrooms}</span>
          </div>
          <div className="flex items-center gap-1">
             <MapPin className="w-4 h-4" />
             <span>{property.postcode}</span>
          </div>
        </div>
        <Link 
          to={`/property/${property.id}`}
          className="block w-full text-center bg-slate-100 hover:bg-slate-200 text-slate-800 font-medium py-2 rounded-lg transition"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default PropertyCard;