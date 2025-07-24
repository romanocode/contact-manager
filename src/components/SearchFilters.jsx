import React from 'react';
import { Search, Users, Heart, Building } from 'lucide-react';

const SearchFilters = ({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  showFavoritesOnly,
  setShowFavoritesOnly,
  filteredContacts,
  categories
}) => {
  const getIcon = (iconName) => {
    const icons = { Users, Heart, Building };
    return icons[iconName] || Users;
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-200/50 p-4">
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search contacts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all bg-gray-50/50"
        />
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap gap-2 mb-4">
        {categories.map(category => {
          const IconComponent = getIcon(category.icon);
          return (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-3 py-2 rounded-xl font-medium transition-all flex items-center gap-2 text-sm ${
                selectedCategory === category.id
                  ? `${category.color} text-white shadow-md`
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <IconComponent className="w-4 h-4" />
              {category.name}
            </button>
          );
        })}
      </div>

      {/* Favorites Toggle */}
      <div className="flex items-center justify-between">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={showFavoritesOnly}
            onChange={(e) => setShowFavoritesOnly(e.target.checked)}
            className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
          />
          <span className="ml-2 text-sm text-gray-700">Show favorites</span>
        </label>
        <span className="text-sm text-gray-500">{filteredContacts.length} contacts</span>
      </div>
    </div>
  );
};

export default SearchFilters;