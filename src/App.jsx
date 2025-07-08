
import {useState} from "react";
import ContactCard from "./components/ContactCard";
import ContactList from "./components/ContactList";
import Footer from "./components/Footer";
import Header from "./components/Header";



export default function App(){

const [selectedContact, setSelectedContact] = useState ();

const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);
//({

// id : 1,
// name: "Daniel Montero",
// phone: 444434533,
// email: "carlos@Enter.com",
// isFavorite: true,

// });


const [contacts, setContacts] = useState([
  {
    id : 1,
name: "Bill Gates",
phone: 444434533,
email: "Bill@Enter.com",
isFavorite: true,
  },

    {
    id : 2,
name: "Marie Curry",
phone: 666543354,
email: "Marie@Enter.com",
isFavorite: false,
  },

    {
    id : 3,
name: "Luis Diaz",
phone: 908764536,
email: "luis@Enter.com",
isFavorite: false,
  },
]);

const handleSelectContact = (contact) => {
  setSelectedContact(contact);
};

const toggleFavorite = (id) => {
  const updatedContacts =  contacts.map((contact) =>{
    return {
      id : contact.id,
      name: contact.name,
      phone: contact.phone,
      email: contact.email,
      isFavorite: contact.id === id ? !contact.isFavorite : contact.isFavorite,
    };
  });

  if (selectedContact.id === id) {
      setSelectedContact({
        id: selectedContact.id,
        name: selectedContact.name,
        phone: selectedContact.phone,
        email: selectedContact.email,
        isFavorite: !selectedContact.isFavorite,
      });
    }

    setContacts(updatedContacts);
  
};

  return (
    <div>

     <Header />

     <main>
      <section>
        {contacts.map((contact) =>(
          
          <div key={contact.id}>
            <button
            onClick={() => handleSelectContact(contact)}
            
            >Contact {contact.id}</button>
          </div>
          
        ))}
      </section>
   

     <style jsx>{`
      section {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
  padding: 2rem 1rem;
}

section div {
  display: flex;
  justify-content: center;
}

section button {
  background-color: #00cc8f;
  color: #fff;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s ease, transform 0.2s ease;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

section button:hover {
  background-color: #00b37a;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 204, 143, 0.2);
}

@media (max-width: 600px) {
  section {
    flex-direction: column;
    align-items: center;
  }
}


     `}</style>
  </main>

      {selectedContact ? <ContactList contact ={selectedContact} toggleFavorite={toggleFavorite} /> : null}

      
      

      <Footer />

    </div>
  );
};