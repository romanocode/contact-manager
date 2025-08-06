import React, { useState, useEffect } from 'react';
import Header from './components/Header.jsx';
import SearchFilters from './components/SearchFilters.jsx';
import StatsPanel from './components/StatsPanel.jsx';
import ContactsList from './components/ContactsList.jsx';
import ContactDetails from './components/ContactDetails.jsx';
import ContactModal from './components/ContactModal.jsx';
import Footer from './components/Footer.jsx';
import SplashScreen from './components/SplashScreen.jsx';
import './index.css';
import { initializeApp } from './utils/initializer';
import {
  fetchContacts,
  createContact,
  updateContact,
  deleteContact as deleteContactAPI
} from './services/contactService';

function App() {
  // Estado de inicialización
  const [isInitializing, setIsInitializing] = useState(true);
  const [initError, setInitError] = useState(null);

  // Datos de contactos y UI
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const [contactsStats, setContactsStats] = useState({ total: 0, favorites: 0, work: 0 });

  // Modal y formulario
  const [showModal, setShowModal] = useState(false);
  const [editingContact, setEditingContact] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    category: 'trabajo'
  });

  const categories = [
    { id: 'familia', name: 'Family', color: 'bg-gradient-to-r from-rose-500 to-pink-600', icon: 'Heart' },
    { id: 'amigos', name: 'Friends', color: 'bg-gradient-to-r from-emerald-500 to-green-600', icon: 'Users' },
    { id: 'trabajo', name: 'Work', color: 'bg-gradient-to-r from-indigo-500 to-blue-600', icon: 'Building' }
  ];

  const getCategoryColor = (category) =>
    categories.find(c => c.id === category)?.color || 'bg-gradient-to-r from-slate-600 to-slate-700';

  // 🔁 Cargar contactos desde API
  useEffect(() => {
    async function loadContacts() {
      try {
        const data = await fetchContacts();
        setContacts(data);

        // Actualizar estadísticas
        setContactsStats({
          total: data.length,
          favorites: data.filter(c => c.favorite).length,
          work: data.filter(c => c.category === 'trabajo').length
        });
      } catch (error) {
        console.error('❌ Error al cargar contactos:', error.message);
      }
    }

    if (!isInitializing) {
      loadContacts();
    }
  }, [isInitializing]);

  // 🟡 Simular pantalla de carga
  useEffect(() => {
    async function startApp() {
      try {
        const result = await initializeApp(3000);
        setIsInitializing(result);
      } catch (error) {
        setInitError(error.message);
        setIsInitializing(false);
      }
    }
    startApp();
  }, []);

  // 🔵 Crear o editar contacto
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.email) {
      alert('Por favor, completa todos los campos obligatorios.');
      return;
    }

    try {
      if (editingContact) {
        const updated = await updateContact(editingContact.id, formData);
        setContacts(prev =>
          prev.map(c => (c.id === updated.id ? updated : c))
        );
        setSelectedContact(updated);
      } else {
        const created = await createContact(formData);
        setContacts(prev => [...prev, created]);
        setSelectedContact(created);
      }
    } catch (error) {
      console.error('❌ Error al guardar:', error);
      alert('Hubo un error al guardar el contacto.');
    } finally {
      resetForm();
    }
  };

  // 🧹 Resetear formulario y cerrar modal
  const resetForm = () => {
    setFormData({ name: '', phone: '', email: '', address: '', category: 'trabajo' });
    setEditingContact(null);
    setShowModal(false);
  };

  // ✏️ Editar contacto
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

  // 🗑️ Eliminar contacto
  const handleDelete = async (id) => {
    const confirmed = window.confirm('¿Estás seguro de que deseas eliminar este contacto?');
    if (!confirmed) return;

    try {
      await deleteContactAPI(id);
      setContacts(prev => prev.filter(c => c.id !== id));
      setSelectedContact(null);
    } catch (error) {
      console.error('❌ Error al eliminar:', error.message);
      alert('Hubo un error al eliminar el contacto.');
    }
  };

  // ⭐ Marcar como favorito (modo local)
  const toggleFavorite = (id) => {
    setContacts(prev =>
      prev.map(c => c.id === id ? { ...c, favorite: !c.favorite } : c)
    );
  };

  // 🎯 Aplicar filtros
  const filteredContacts = contacts.filter(c => {
    const matchSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCategory = selectedCategory === 'all' || c.category === selectedCategory;
    const matchFavorite = !showFavoritesOnly || c.favorite;
    return matchSearch && matchCategory && matchFavorite;
  });

  return (
    <div className="App">
      {isInitializing ? (
        <SplashScreen isLoading={isInitializing} error={initError} />
      ) : (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
          <Header
            onAddContact={() => setShowModal(true)}
            contactsCount={contactsStats.total}
            favoritesCount={contactsStats.favorites}
            workCount={contactsStats.work}
          />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <SearchFilters
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              showFavoritesOnly={showFavoritesOnly}
              setShowFavoritesOnly={setShowFavoritesOnly}
              categories={categories}
              contactsCount={contactsStats.total}
            />

            <div className="mt-4">
              <StatsPanel
                contactsCount={contactsStats.total}
                favoritesCount={contactsStats.favorites}
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
              <div className="lg:col-span-7">
                <ContactsList
                  contacts={filteredContacts}
                  selectedContact={selectedContact}
                  setSelectedContact={setSelectedContact}
                  categories={categories}
                  getCategoryColor={getCategoryColor}
                />
              </div>

              <div className="lg:col-span-5">
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
      )}
    </div>
  );
}

export default App;
