import React, { useState, useEffect, useMemo } from 'react';
import { Users, Star } from 'lucide-react';
import { fetchContacts } from '../services/contactService.js';

const ContactsList = ({
  selectedContact,
  setSelectedContact,
  categories = [],
  getCategoryColor,
  searchTerm = '',
  selectedCategory = 'all',
  showFavoritesOnly = false,
  onFilteredCountChange // Callback para comunicar el número de contactos filtrados
}) => {
  const [contacts, setContacts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadContacts = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const data = await fetchContacts();
      setContacts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadContacts();
  }, []);

  // Filtrado de contactos basado en las props del componente padre
  const filteredContacts = useMemo(() => {
    let filtered = contacts;

    // Filtrar por término de búsqueda
    if (searchTerm) {
      filtered = filtered.filter(contact =>
        contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.phone.includes(searchTerm) ||
        contact.email?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtrar por categoría
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(contact => contact.category === selectedCategory);
    }

    // Filtrar por favoritos
    if (showFavoritesOnly) {
      filtered = filtered.filter(contact => contact.favorite);
    }

    return filtered;
  }, [contacts, searchTerm, selectedCategory, showFavoritesOnly]);

  // Comunicar estadísticas al componente padre
  useEffect(() => {
    if (onFilteredCountChange) {
      const stats = {
        total: filteredContacts.length,
        favorites: filteredContacts.filter(c => c.favorite).length,
        work: filteredContacts.filter(c => c.category === 'trabajo').length
      };
      onFilteredCountChange(stats);
    }
  }, [filteredContacts, onFilteredCountChange]);
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-200/50 overflow-hidden">
      <div className="p-4 border-b border-gray-100 flex justify-between items-center">
        <h3 className="font-semibold text-gray-900">
          Contacts {filteredContacts.length > 0 && `(${filteredContacts.length})`}
        </h3>
        <button
          onClick={loadContacts}
          className="text-sm text-indigo-600 hover:underline"
          disabled={isLoading}
        >
          {isLoading ? 'Cargando...' : '🔄 Recargar'}
        </button>
      </div>
      
      <div className="max-h-96 overflow-y-auto">
        {isLoading && (
          <div className="p-8 text-center text-gray-500">🔄 Cargando contactos...</div>
        )}
        
        {error && (
          <div className="p-8 text-center text-red-500">
            ❌ Error: {error}
            <button
              className="ml-2 text-indigo-600 underline"
              onClick={loadContacts}
            >
              Reintentar
            </button>
          </div>
        )}
        
        {!isLoading && !error && filteredContacts.map(contact => (
          <div
            key={contact.id}
            onClick={() => setSelectedContact(contact)}
            className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-all ${
              selectedContact?.id === contact.id ? 'bg-indigo-50 border-indigo-200' : ''
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 ${getCategoryColor(contact.category)} rounded-full flex items-center justify-center text-white font-semibold shadow-sm`}>
                {contact.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h4 className="font-medium text-gray-900 truncate">{contact.name}</h4>
                  {contact.favorite && <Star className="w-4 h-4 text-yellow-500 fill-current" />}
                </div>
                <p className="text-sm text-gray-500 truncate">{contact.phone}</p>
                <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${getCategoryColor(contact.category)} text-white mt-1`}>
                  {categories.find(c => c.id === contact.category)?.name || 'Sin categoría'}
                </span>
              </div>
            </div>
          </div>
        ))}
        
        {!isLoading && !error && filteredContacts.length === 0 && contacts.length > 0 && (
          <div className="p-8 text-center">
            <Users className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">No se encontraron contactos con los filtros aplicados</p>
          </div>
        )}
        
        {!isLoading && !error && contacts.length === 0 && (
          <div className="p-8 text-center">
            <Users className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">No hay contactos disponibles</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactsList;