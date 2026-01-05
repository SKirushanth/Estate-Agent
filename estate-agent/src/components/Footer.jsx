import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, Home } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        
        {/* Top Section: 2 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          
          {/* Column 1: Brand Info */}
          <div>
            <div className="flex items-center gap-2 mb-4 text-blue-400">
              <Home className="w-6 h-6" />
              <span className="text-xl font-bold">Prestige</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              Find your dream home with Prestige. We provide the most accurate and up-to-date property listings to help you make the best choice.
            </p>
          </div>

          {/* Column 2: Contact Info */}
          {/* md:pl-20 adds some spacing on desktop screens to separate it from the text */}
          <div className="md:pl-20">
            <h3 className="text-lg font-semibold mb-4 text-slate-200">Contact Us</h3>
            <ul className="space-y-3 text-slate-400 text-sm">
              <li className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <span>Colombo, Sri Lanka</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <span>070 139 6578</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <span>prestige@gmail.com</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Divider */}
        <div className="border-t border-slate-800 my-8"></div>

        {/* Bottom Section: Copyright & Socials */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
          <p>© {new Date().getFullYear()} Prestige Estates. All rights reserved.</p>
          
          <div className="flex gap-6">
            <a href="#" className="hover:text-blue-400 transition-colors"><Facebook className="w-5 h-5" /></a>
            <a href="#" className="hover:text-blue-400 transition-colors"><Twitter className="w-5 h-5" /></a>
            <a href="#" className="hover:text-blue-400 transition-colors"><Instagram className="w-5 h-5" /></a>
            <a href="#" className="hover:text-blue-400 transition-colors"><Linkedin className="w-5 h-5" /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;