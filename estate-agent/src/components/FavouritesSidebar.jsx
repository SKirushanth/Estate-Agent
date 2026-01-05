import React from 'react';
import { useDrop } from 'react-dnd';
import { Trash2, XCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const FavouritesSidebar = ({ favourites, onRemove, onClear, onDrop }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'PROPERTY',
    drop: (item) => onDrop(item.property),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <div className="sticky top-24">
      <div 
        ref={drop}
        className={`bg-white rounded-xl shadow-sm border p-4 transition-colors ${isOver ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200' : 'border-slate-200'}`}
      >
        <div className="flex justify-between items-center mb-4 pb-4 border-b border-slate-100">
          {/* UPDATED: Added font-serif to match the rest of the site */}
          <h2 className="text-xl font-serif font-bold text-slate-800">Favourites ({favourites.length})</h2>
          
          {favourites.length > 0 && (
            <button 
              onClick={onClear} 
              className="text-xs text-red-500 hover:text-red-700 font-medium"
            >
              Clear All
            </button>
          )}
        </div>

        {favourites.length === 0 ? (
          <div className="h-32 border-2 border-dashed border-slate-200 rounded-lg flex flex-col items-center justify-center text-slate-400 p-4 text-center">
            <span className="text-sm">Drag properties here to save them</span>
          </div>
        ) : (
          <div className="space-y-3 max-h-[600px] overflow-y-auto">
            {favourites.map(fav => (
              <div key={fav.id} className="flex gap-3 bg-slate-50 p-2 rounded-lg group relative">
                 <img 
                    src={fav.images[0]} 
                    alt="thumb" 
                    className="w-16 h-16 object-cover rounded-md" 
                    onError={(e) => {e.target.src = 'https://placehold.co/100'}}
                 />
                 <div className="flex-1 min-w-0">
                    <p className="font-bold text-slate-800 text-sm truncate">£{fav.price.toLocaleString()}</p>
                    {/* UPDATED: Description also looks nice in serif, or keep sans for readability. Kept standard here but slightly adjusted color. */}
                    <p className="text-xs text-slate-500 truncate">{fav.description}</p>
                    <Link to={`/property/${fav.id}`} className="text-xs text-blue-600 hover:underline mt-1 block">View</Link>
                 </div>
                 <button 
                    onClick={() => onRemove(fav.id)}
                    className="absolute top-2 right-2 text-slate-300 hover:text-red-500 transition"
                    title="Remove"
                 >
                    <XCircle className="w-4 h-4" />
                 </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FavouritesSidebar;