export default function ContactCard() {
  return (
    <div style={{
      border: '1px solid #00CC8F',
      padding: '1rem',
      borderRadius: '8px',
      marginBottom: '1rem',
      maxWidth: '300px',
      backgroundColor: '#fefefe',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <h3 style={{ color: '#00CC8F', marginBottom: '0.5rem' }}>Carlos</h3>
      <p>Teléfono: 444-4444</p>
      <p>Email: carlos1996romano@gmail.com</p>
    </div>
  );
}