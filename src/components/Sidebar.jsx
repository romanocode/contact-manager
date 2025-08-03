// src/components/Sidebar.jsx
import { Search, Users, Star } from 'lucide-react';

const Sidebar = ({
  contacts = [],
  searchTerm,
  setSearchTerm,
  categories,
  selectedCategory,
  setSelectedCategory,
  showFavoritesOnly,
  setShowFavoritesOnly,
  filteredContacts,
  getCategoryColor,
  selectedContact,
  setSelectedContact
}) => (
  <div className="lg:w-1/3 space-y-4">
    {/* Aquí todo el sidebar original: search, filtros, lista */}
  </div>
);

export default Sidebar;
