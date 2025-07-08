
import ContactCard from './ContactCard';

export default function ContactList({contact, toggleFavorite}) {
  return (
    <div style={{
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      gap: '1.5rem',
      padding: '2rem'
    }}>
      <ContactCard contact = {contact} toggleFavorite={toggleFavorite} />
     
    </div>
  );
}
