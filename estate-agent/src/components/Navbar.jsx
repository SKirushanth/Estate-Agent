import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Heart } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-blue-900">
          <Home className="w-8 h-8" />
          <span>EstateAgent</span>
        </Link>
        <div className="flex gap-6">
          <Link to="/" className="text-slate-600 hover:text-blue-600 font-medium transition">Search</Link>
          <div className="flex items-center gap-1 text-slate-600">
             <Heart className="w-4 h-4" />
             <span className="font-medium">Favourites</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;