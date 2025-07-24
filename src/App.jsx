import React, { useState } from 'react';
import Header from './components/Header.jsx';
import SearchFilters from './components/SearchFilters.jsx';
import StatsPanel from './components/StatsPanel.jsx';
import ContactsList from './components/ContactsList.jsx';
import ContactDetails from './components/ContactDetails.jsx';
import ContactModal from './components/ContactModal.jsx';
import Footer from './components/Footer.jsx';
import './index.css';

const App = () => {
  const [contacts, setContacts] = useState([
    {
      id: 1,
      name: "Ana García",
      phone: "+1 (555) 123-4567",
      email: "ana.garcia@company.com",
      address: "123 Business Ave, NYC",
      category: "familia",
      favorite: true,
      avatar: "AG"
    },
    {
      id: 2,
      name: "Carlos Rodríguez",
      phone: "+1 (555) 987-6543",
      email: "carlos.rodriguez@enterprise.com", 
      address: "456 Corporate Blvd, LA",
      category: "trabajo",
      favorite: false,
      avatar: "CR"
    },
    {
      id: 3,
      name: "María López",
      phone: "+1 (555) 456-7890",
      email: "maria.lopez@business.com",
      address: "789 Professional St, Chicago", 
      category: "amigos",
      favorite: true,
      avatar: "ML"
    },
    {
      id: 4,
      name: "Luis Díaz",
      phone: "+1 (555) 321-9876",
      email: "luis@company.com",
      address: "321 Executive Way, Miami",
      category: "trabajo",
      favorite: false,
      avatar: "LD"
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('todos');
  const [showModal, setShowModal] = useState(false);
  const [editingContact, setEditingContact] = useState(null);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);

  const [formData, setFormData] = useState({
    name: '', phone: '', email: '', address: '', category: 'trabajo'
  });

  const categories = [
    { id: 'todos', name: 'All', color: 'bg-gradient-to-r from-slate-600 to-slate-700', icon: 'Users' },
    { id: 'familia', name: 'Family', color: 'bg-gradient-to-r from-rose-500 to-pink-600', icon: 'Heart' },
    { id: 'amigos', name: 'Friends', color: 'bg-gradient-to-r from-emerald-500 to-green-600', icon: 'Users' },
    { id: 'trabajo', name: 'Work', color: 'bg-gradient-to-r from-indigo-500 to-blue-600', icon: 'Building' }
  ];

  // Funciones de utilidad
  const getCategoryColor = (category) => categories.find(c => c.id === category)?.color || 'bg-gradient-to-r from-slate-600 to-slate-700';
  const generateAvatar = (name) => name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.phone.includes(searchTerm) ||
                         contact.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'todos' || contact.category === selectedCategory;
    const matchesFavorites = !showFavoritesOnly || contact.favorite;
    
    return matchesSearch && matchesCategory && matchesFavorites;
  });

  // Handlers
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.email) {
      alert('Please complete all required fields');
      return;
    }
    
    if (editingContact) {
      setContacts(contacts.map(contact => 
        contact.id === editingContact.id 
          ? { ...contact, ...formData, avatar: generateAvatar(formData.name) }
          : contact
      ));
    } else {
      const newContact = {
        id: Date.now(),
        ...formData,
        favorite: false,
        avatar: generateAvatar(formData.name)
      };
      setContacts([...contacts, newContact]);
    }
    resetForm();
  };

  const resetForm = () => {
    setFormData({ name: '', phone: '', email: '', address: '', category: 'trabajo' });
    setEditingContact(null);
    setShowModal(false);
  };

  const handleEdit = (contact) => {
    setFormData({
      name: contact.name,
      phone: contact.phone,
      email: contact.email,
      address: contact.address,
      category: contact.category
    });
    setEditingContact(contact);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      setContacts(contacts.filter(contact => contact.id !== id));
      setSelectedContact(null);
    }
  };

  const toggleFavorite = (id) => {
    setContacts(contacts.map(contact => 
      contact.id === id ? { ...contact, favorite: !contact.favorite } : contact
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Header onAddContact={() => setShowModal(true)} contacts={contacts} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Search and Filters - Full Width */}
        <SearchFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          showFavoritesOnly={showFavoritesOnly}
          setShowFavoritesOnly={setShowFavoritesOnly}
          filteredContacts={filteredContacts}
          categories={categories}
        />
        
        {/* Stats Panel - Full Width */}
        <div className="mt-4">
          <StatsPanel contacts={contacts} />
        </div>

        {/* Horizontal Layout: Contacts List + Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
          {/* Left: Contacts List */}
          <div className="lg:col-span-5">
            <ContactsList
              filteredContacts={filteredContacts}
              selectedContact={selectedContact}
              setSelectedContact={setSelectedContact}
              categories={categories}
              getCategoryColor={getCategoryColor}
            />
          </div>

          {/* Right: Contact Details */}
          <div className="lg:col-span-7">
            <ContactDetails
              selectedContact={selectedContact}
              categories={categories}
              getCategoryColor={getCategoryColor}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onToggleFavorite={toggleFavorite}
            />
          </div>
        </div>
      </div>

      <ContactModal
        showModal={showModal}
        editingContact={editingContact}
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleSubmit}
        onClose={resetForm}
      />

      <Footer />
    </div>
  );
};

export default App;