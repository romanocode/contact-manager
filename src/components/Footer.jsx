import Copyright from './Copyright';

export default function Footer() {
  return (
    <footer style={{
      backgroundColor: '#f0f0f0',
      padding: '1.5rem',
      textAlign: 'center',
      borderTop: '2px solid #00CC8F'
    }}>
      <h3 style={{ color: '#00CC8F' }}>Contacto</h3>
      <p>Teléfono: 999-888-777</p>
      <p>Email: carlos@correo.com</p>
      
      <Copyright />
    </footer>
  );
}