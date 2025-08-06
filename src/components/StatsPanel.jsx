import React from 'react';
import { Users, Star } from 'lucide-react';

const StatsPanel = ({ contactsCount = 0, favoritesCount = 0 }) => {
  return (
    <div className="grid grid-cols-2 gap-3">
      <div className="bg-white/80 backdrop-blur-sm p-4 rounded-2xl shadow-sm border border-gray-200/50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
            <Users className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900">{contactsCount}</p>
            <p className="text-sm text-gray-500">Total</p>
          </div>
        </div>
      </div>
      <div className="bg-white/80 backdrop-blur-sm p-4 rounded-2xl shadow-sm border border-gray-200/50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center">
            <Star className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900">{favoritesCount}</p>
            <p className="text-sm text-gray-500">Favorites</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsPanel;