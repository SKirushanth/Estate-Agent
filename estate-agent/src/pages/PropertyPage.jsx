import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import properties from '../data/properties.json';
import { Heart, ArrowLeft, MapPin, Bed, Info, Map as MapIcon, Image as ImageIcon } from 'lucide-react';

const PropertyPage = ({ addToFavourites, favourites }) => {
  const { id } = useParams();
  const property = properties.find(p => p.id === id);
  const [activeTab, setActiveTab] = useState('description');
  const [mainImage, setMainImage] = useState('');
  
  useEffect(() => {
    if (property) setMainImage(property.images[0]);
  }, [property]);

  if (!property) return <div className="p-10 text-center">Property not found</div>;

  const isFavourite = favourites.some(f => f.id === property.id);

  return (
    <div className="container mx-auto px-4 py-8">
      <Link to="/" className="inline-flex items-center text-slate-500 hover:text-blue-600 mb-6 transition">
        <ArrowLeft className="w-4 h-4 mr-1" /> Back to Search
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          <div className="space-y-4">
             <div className="h-[400px] w-full bg-slate-200 rounded-xl overflow-hidden shadow-sm">
                <img 
                   src={mainImage} 
                   alt="Main View" 
                   className="w-full h-full object-cover"
                   onError={(e) => {e.target.src = 'https://placehold.co/800x600?text=No+Image'}} 
                />
             </div>
             <div className="grid grid-cols-6 gap-2">
                {property.images.map((img, idx) => (
                   <button 
                     key={idx} 
                     onClick={() => setMainImage(img)}
                     className={`h-20 rounded-lg overflow-hidden border-2 transition ${mainImage === img ? 'border-blue-600 opacity-100' : 'border-transparent opacity-70 hover:opacity-100'}`}
                   >
                     <img 
                        src={img} 
                        alt={`Thumbnail ${idx}`} 
                        className="w-full h-full object-cover" 
                        onError={(e) => {e.target.src = 'https://placehold.co/100'}}
                     />
                   </button>
                ))}
             </div>
          </div>

          <div className="flex justify-between items-start">
             <div>
                <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2 py-1 rounded uppercase mb-2 inline-block">{property.type}</span>
                <h1 className="text-3xl font-bold text-slate-900 mb-2">{property.description}</h1>
                <p className="text-slate-500 flex items-center gap-2">
                   <MapPin className="w-4 h-4" /> {property.location}
                </p>
             </div>
             <div className="text-right">
                <p className="text-3xl font-bold text-blue-600">£{property.price.toLocaleString()}</p>
                <p className="text-slate-400 text-sm">{property.tenure}</p>
             </div>
          </div>

          <button 
            onClick={() => addToFavourites(property)}
            disabled={isFavourite}
            className={`w-full py-4 rounded-xl font-bold flex justify-center items-center gap-2 transition ${isFavourite ? 'bg-green-100 text-green-700 cursor-default' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
          >
            <Heart className={`w-5 h-5 ${isFavourite ? 'fill-current' : ''}`} />
            {isFavourite ? 'Saved to Favourites' : 'Add to Favourites'}
          </button>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden sticky top-24">
             <div className="flex border-b border-slate-100">
                <button 
                  onClick={() => setActiveTab('description')} 
                  className={`flex-1 py-4 text-sm font-medium flex justify-center items-center gap-2 border-b-2 transition ${activeTab === 'description' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
                >
                  <Info className="w-4 h-4" /> Info
                </button>
                <button 
                  onClick={() => setActiveTab('floorplan')} 
                  className={`flex-1 py-4 text-sm font-medium flex justify-center items-center gap-2 border-b-2 transition ${activeTab === 'floorplan' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
                >
                  <ImageIcon className="w-4 h-4" /> Plan
                </button>
                <button 
                  onClick={() => setActiveTab('map')} 
                  className={`flex-1 py-4 text-sm font-medium flex justify-center items-center gap-2 border-b-2 transition ${activeTab === 'map' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
                >
                  <MapIcon className="w-4 h-4" /> Map
                </button>
             </div>

             <div className="p-6 min-h-[300px]">
                {activeTab === 'description' && (
                  <div className="animate-in fade-in duration-300">
                    <h3 className="font-bold text-slate-800 mb-4">Property Details</h3>
                    <p className="text-slate-600 leading-relaxed mb-6">{property.longDescription}</p>
                    
                    {/* UPDATED SECTION: Removed 'Added On' and changed grid to single column */}
                    <div className="grid grid-cols-1 gap-4">
                       <div className="bg-slate-50 p-3 rounded-lg">
                          <span className="block text-xs text-slate-400 uppercase">Bedrooms</span>
                          <span className="font-semibold text-slate-800 flex items-center gap-2">
                             <Bed className="w-4 h-4" /> {property.bedrooms}
                          </span>
                       </div>
                    </div>
                  </div>
                )}

                {activeTab === 'floorplan' && (
                  <div className="animate-in fade-in duration-300 flex flex-col items-center">
                    <h3 className="font-bold text-slate-800 mb-4">Floor Plan</h3>
                    <img 
                       src={property.floorPlan} 
                       alt="Floor Plan" 
                       className="w-full border border-slate-200 rounded-lg"
                       onError={(e) => {e.target.src = 'https://placehold.co/400x300?text=Floor+Plan'}} 
                    />
                  </div>
                )}

                {activeTab === 'map' && (
                  <div className="animate-in fade-in duration-300">
                    <h3 className="font-bold text-slate-800 mb-4">Location</h3>
                    <div className="w-full h-[250px] bg-slate-100 rounded-lg flex items-center justify-center relative overflow-hidden">
                       <iframe 
                         width="100%" 
                         height="100%" 
                         frameBorder="0" 
                         style={{border:0}} 
                         src={`https://maps.google.com/maps?q=${property.lat},${property.lng}&z=15&output=embed`}
                         allowFullScreen
                       ></iframe>
                    </div>
                    <p className="mt-4 text-sm text-slate-500 text-center">{property.location}</p>
                  </div>
                )}
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyPage;