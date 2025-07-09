import ContactCard from './ContactCard';

export default function ContactList({ contacts, toggleFavorite }) {
  return (
    <div style={{
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      gap: '1.5rem',
      padding: '2rem'
    }}>
      {contacts.map(contact => (
        <ContactCard key={contact.id} contact={contact} toggleFavorite={toggleFavorite} />
      ))}
    </div>
  );
}
