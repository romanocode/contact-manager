
export default function Header() {
  return (
    <header style={{
      backgroundColor: '#00CC8F',
      color: 'white',
      padding: '2rem 1rem',
      textAlign: 'center',
      boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)'
    }}>
      <h1 style={{ margin: 0, fontSize: '2rem' }}>Agenda de Contactos</h1>
      <p style={{ marginTop: '0.5rem', fontSize: '1.1rem' }}>
        Guarda y organiza tus contactos fácilmente
      </p>
    </header>
  );
}
