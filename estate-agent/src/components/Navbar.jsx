import React from 'react';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-blue-900">
          <Home className="w-8 h-8" />
          <span>EstateAgent</span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;