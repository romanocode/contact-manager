import ContactCard from './ContactCard';

export default function ContactList({ contactsToShow, toggleFavorite, handleSelectContact, onDeleteContact }) {
  return (
    <section className="contact-list-container">
      {contactsToShow.map((contact) => (
        <div key={contact.id} className="contact-item" onClick={() => handleSelectContact(contact)}>
          <ContactCard 
            contact={contact} 
            toggleFavorite={toggleFavorite}
            onDeleteContact={onDeleteContact}
          />
        </div>
      ))}

      <style >{`
        .contact-list-container {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 20px;
          padding: 2rem 1rem;
          max-width: 1200px;
          margin: 0 auto;
        }

        .contact-item {
          display: flex;
          justify-content: center;
          cursor: pointer;
        }

        @media (max-width: 768px) {
          .contact-list-container {
            grid-template-columns: 1fr;
            gap: 15px;
            padding: 1rem;
          }
        }

        @media (max-width: 480px) {
          .contact-list-container {
            padding: 0.5rem;
          }
        }
      `}</style>
    </section>
  );
}