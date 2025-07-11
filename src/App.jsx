import { useState } from "react";
import ContactCard from "./components/ContactCard";
import ContactList from "./components/ContactList";
import Footer from "./components/Footer";
import Header from "./components/Header";

export default function App() {
  const [selectedContact, setSelectedContact] = useState();
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

  return (
    <div>
      <Header />
      <main>
        <section className="favorites-filter">
          <label>
            <h3>Favorite Contacts</h3>
            <input
              type="checkbox"
              checked={showOnlyFavorites}
              onChange={handleChangeFavorite}
            />
            Mostrar solo favoritos
          </label>

          <span className="contact-count">
            {contactsToShow.length} de {contacts.length} contactos
          </span>

          <div className="button-group">
            <button className="btn-fav-all" onClick={markAllAsFavorites}>
              Marcar todos como favoritos
            </button>

            <button className="btn-reset-all" onClick={resetAllFavorites}>
              Resetear todos los favoritos
            </button>
          </div>
        </section>

        <ContactList
          contactsToShow={contactsToShow}
          toggleFavorite={toggleFavorite}
          handleSelectContact={handleSelectContact}
        />

        <style >{`
          .favorites-filter {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 0.75rem;
            padding: 1.5rem 2rem;
            background-color: #f9f9f9;
            border-radius: 10px;
            margin-top: 1rem;
            text-align: center;
          }

          .favorites-filter label {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 0.5rem;
          }

          .favorites-filter input[type="checkbox"] {
            margin-right: 0.5rem;
            accent-color: #00cc8f;
            width: 16px;
            height: 16px;
          }

          .contact-count {
            font-size: 0.9rem;
            color: #333;
            background: #e6fffa;
            padding: 6px 12px;
            border-radius: 10px;
            font-weight: 600;
            box-shadow: 0 2px 4px rgba(0, 204, 143, 0.1);
          }

          .button-group {
            display: flex;
            gap: 1rem;
            flex-wrap: wrap;
            justify-content: center;
          }

          .btn-fav-all,
          .btn-reset-all {
            border: none;
            padding: 0.75rem 1.5rem;
            border-radius: 0.5rem;
            font-size: 0.95rem;
            font-weight: 600;
            cursor: pointer;
            transition: background 0.3s ease, transform 0.2s ease;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
            min-width: 200px;
          }

          .btn-fav-all {
            background-color: #00cc8f;
            color: white;
          }

          .btn-fav-all:hover {
            background-color: #00b37a;
            transform: translateY(-2px);
            box-shadow: 0 4px 10px rgba(0, 204, 143, 0.3);
          }

          .btn-reset-all {
            background-color: #ef4444;
            color: white;
          }

          .btn-reset-all:hover {
            background-color: #dc2626;
            transform: translateY(-2px);
            box-shadow: 0 4px 10px rgba(239, 68, 68, 0.3);
          }

          @media (max-width: 600px) {
            .favorites-filter {
              flex-direction: column;
              align-items: center;
            }

            .button-group {
              flex-direction: column;
              gap: 0.5rem;
            }

            .btn-fav-all,
            .btn-reset-all {
              width: 100%;
            }
          }
        `}</style>
      </main>

      <Footer />
    </div>
  );
}