import { useState } from "react";
import ContactForm from "./components/ContactForm";
import ContactCard from "./components/ContactCard";
import ContactList from "./components/ContactList";
import Footer from "./components/Footer";
import Header from "./components/Header";

import "./index.css"


export default function App() {
  const [selectedContact, setSelectedContact] = useState(null);
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);

  

  const [contacts, setContacts] = useState([
    {
      id: 1,
      name: "Bill Gates",
      phone: 444434533,
      email: "Bill@Enter.com",
      isFavorite: true,
    },
    {
      id: 2,
      name: "Marie Curie",
      phone: 666543354,
      email: "Marie@Enter.com",
      isFavorite: false,
    },
    {
      id: 3,
      name: "Luis Diaz",
      phone: 908764536,
      email: "luis@Enter.com",
      isFavorite: false,
    },

      {
      id: 4,
      name: "Sheldon Cooper",
      phone: 9054324536,
      email: "shelly@Enter.com",
      isFavorite: false,
    },
  ]);

  let contactsToShow = contacts;
  if (showOnlyFavorites) {
    contactsToShow = contacts.filter((contact) => contact.isFavorite);
  }

  const handleSelectContact = (contact) => {
    setSelectedContact(contact);
  };

  const handleChangeFavorite = (event) => {
    setShowOnlyFavorites(event.target.checked);
  };

  const handleNextContact = (selectedContact) => {
    const currentIndex = contactsToShow.findIndex(
      (contact) => contact.id === selectedContact.id
    );

    if(currentIndex === contactsToShow.length -1){
      setSelectedContact(contactsToShow[0]);
      return;
    }

    setSelectedContact(contactsToShow[currentIndex + 1])
  };

  const toggleFavorite = (id) => {
    const updatedContacts = contacts.map((contact) => {
      return {
        id: contact.id,
        name: contact.name,
        phone: contact.phone,
        email: contact.email,
        isFavorite: contact.id === id ? !contact.isFavorite : contact.isFavorite,
      };
    });

    if (selectedContact?.id === id) {
      setSelectedContact({
        ...selectedContact,
        isFavorite: !selectedContact.isFavorite,
      });
    }

    setContacts(updatedContacts);
  };

  const markAllAsFavorites = () => {
    const updatedContacts = contacts.map((contact) => ({
      ...contact,
      isFavorite: true,
    }));
    setContacts(updatedContacts);

    if (selectedContact) {
      const updatedSelected = updatedContacts.find(
        (c) => c.id === selectedContact.id
      );
      if (updatedSelected) {
        setSelectedContact(updatedSelected);
      }
    }
  };

  const resetAllFavorites = () => {
    const updatedContacts = contacts.map((contact) => ({
      ...contact,
      isFavorite: false,
    }));
    setContacts(updatedContacts);

    if (selectedContact) {
      const updatedSelected = updatedContacts.find(
        (c) => c.id === selectedContact.id
      );
      if (updatedSelected) {
        setSelectedContact(updatedSelected);
      }
    }
  };

  function handleAddContact(newContact) {
    const updatedContacts = [...contacts, newContact]; // Spread operator
    setContacts(updatedContacts);
  }

  const handleDeleteContact = (contactId) => {
  const updatedContacts = contacts.filter(contact => contact.id !== contactId);
  setContacts(updatedContacts);
  
  // Si el contacto eliminado es el que está seleccionado, limpiamos la selección
  if (selectedContact && selectedContact.id === contactId) {
    setSelectedContact(null);
  }
};

// Función con confirmación (opcional, más segura)
const handleDeleteWithConfirmation = (contactId, contactName) => {
  const confirmDelete = window.confirm(`¿Estás seguro de que quieres eliminar a ${contactName}?`);
  
  if (confirmDelete) {
    handleDeleteContact(contactId);
  }
};
  

  return (
    <div>
      <Header />
      <main>

        <ContactForm onAddContact={handleAddContact} />
    

        <section className="favorites-filter">
          <label>
            <h3>Favorite Contacts</h3>
            <input
              type="checkbox"
              checked={showOnlyFavorites}
              onChange={handleChangeFavorite}
            />
            Show all favorites
          </label>

          <span className="contact-count">
            {contactsToShow.length} de {contacts.length} contactos
          </span>

          <div className="button-group">
            <button className="btn-fav-all" onClick={markAllAsFavorites}>
              Mark all as favorites
            </button>

            <button className="btn-reset-all" onClick={resetAllFavorites}>
              Reset all favorites
            </button>
          </div>
        </section>

        {/* Botones de contacto para seleccionar */}
        <section className="contact-buttons">
          {contactsToShow.map((contact) => (
            <div key={contact.id} className="contact-item">
              <button 
                onClick={() => handleSelectContact(contact)}
                className="contact-btn"
              >
                {contact.name}
              </button>
            </div>
          ))}
        </section>

        {/* Mostrar contacto seleccionado o todas las tarjetas */}
        {selectedContact ? (
          <div className="selected-contact-container">
            <button 
              className="back-button" 
              onClick={() => setSelectedContact(null)}
            >
             ❌ Clean
            </button>
            <ContactCard 
              contact={selectedContact}
              toggleFavorite={toggleFavorite}
              handleNextContact={handleNextContact}
              onDeleteContact={handleDeleteWithConfirmation}
            />
          </div>
        ) : (
          <ContactList
            contactsToShow={showOnlyFavorites ? contactsToShow : contactsToShow.slice(0, 3)}
            toggleFavorite={toggleFavorite}
            onSelectContact={handleSelectContact}
            onDeleteContact={handleDeleteWithConfirmation}
        />
        )}

      
      </main>

      <Footer />
    </div>
  );
}