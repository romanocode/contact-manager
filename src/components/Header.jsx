import React, { useState } from 'react';
import { Phone, Plus, Upload, Download, Menu, X, Users, Star, Building, ChevronDown, ChevronUp } from 'lucide-react';

const Header = ({ onAddContact, contactsCount = 0, favoritesCount = 0, workCount = 0 }) => {
  const [panelOpen, setPanelOpen] = useState(false);

  return (
    <header className="bg-white/80 backdrop-blur-sm shadow-sm border-b border-gray-200/50 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <Phone className="w-6 h-6 text-white" />
            </div>
            <div className="ml-3">
              <h1 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                Contact Manager
              </h1>
              <p className="text-sm text-gray-500 hidden sm:block">Manage your important contacts ⭐</p>
            </div>
          </div>

          {/* Dropdown Toggle Button */}
          <button
            onClick={() => setPanelOpen(!panelOpen)}
            className="text-gray-500 hover:text-gray-700 p-2 hover:bg-gray-100 rounded-lg transition-all flex items-center gap-2"
          >
            {panelOpen ? <ChevronUp className="w-6 h-6" /> : <ChevronDown className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Dropdown Panel - Toggleable */}
      {panelOpen && (
        <div className="bg-white/90 backdrop-blur-sm border-t border-gray-200/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 mb-4">
              <div className="text-center p-3 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl">
                <p className="text-lg font-bold text-indigo-600">{contactsCount}</p>
                <p className="text-xs text-gray-600">Total</p>
              </div>
              <div className="text-center p-3 bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl">
                <p className="text-lg font-bold text-emerald-600">{favoritesCount}</p>
                <p className="text-xs text-gray-600">Favorites</p>
              </div>
              <div className="text-center p-3 bg-gradient-to-r from-rose-50 to-pink-50 rounded-xl">
                <p className="text-lg font-bold text-rose-600">{workCount}</p>
                <p className="text-xs text-gray-600">Work</p>
              </div>
            </div>
                     
            {/* Action Buttons */}
            <div className="flex gap-2">
              <button className="flex-1 p-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-all flex items-center justify-center gap-2">
                <Upload className="w-4 h-4" />
                Import
              </button>
              <button className="flex-1 p-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-all flex items-center justify-center gap-2">
                <Download className="w-4 h-4" />
                Export
              </button>
            </div>
                     
            <button
              onClick={() => {
                onAddContact();
                setPanelOpen(false);
              }}
              className="w-full mt-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-3 rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-2 font-medium"
            >
              <Plus className="w-4 h-4" />
              Add Contact
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;