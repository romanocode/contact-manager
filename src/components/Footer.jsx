
import Copyright from './Copyright';

export default function Footer() {
  const handleEmailClick = () => {
    window.location.href = 'mailto:carlos@correo.com';
  };

  const handlePhoneClick = () => {
    window.location.href = 'tel:999-888-777';
  };

  const handleInfoClick = () => {
    alert('Gracias por usar nuestra Agenda de Contactos 📱');
  };

  return (
    <footer className="footer">
      <div className="footer-content">
        <h3 className="footer-title">¿Necesitas ayuda?</h3>

        <div className="contact-info">
          <div className="contact-item" onClick={handlePhoneClick}>
            <span className="contact-icon">📞</span>
            <span className="contact-text">999-888-777</span>
          </div>
          <div className="contact-item" onClick={handleEmailClick}>
            <span className="contact-icon">📧</span>
            <span className="contact-text">carlos@correo.com</span>
          </div>
          <div className="contact-item" onClick={handleInfoClick}>
            <span className="contact-icon">ℹ️</span>
            <span className="contact-text">Información</span>
          </div>
        </div>
      </div>

      <div className="footer-divider"></div>

      <div className="footer-copyright">
        <Copyright />
      </div>
   

      <style jsx>{`
  .footer {
  background: linear-gradient(135deg, #f8f9fa, #e9ecef);
  padding: 2rem 1.5rem;
  text-align: center;
  border-top: 3px solid #00cc8f;
  margin-top: 2rem;
}

.footer-content {
  max-width: 800px;
  margin: 0 auto;
}

.footer-title {
  color: #00cc8f;
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
}

.contact-info {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1.5rem;
  flex-direction: row;
}

.contact-item {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background: #fff;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease, background 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  min-width: 180px;
  max-width: 300px;
}

.contact-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 10px rgba(0, 204, 143, 0.2);
  background: #f8f9fa;
}

.contact-icon {
  font-size: 1rem;
}

.contact-text {
  color: #666;
  font-size: 0.9rem;
  font-weight: 500;
}

.footer-divider {
  height: 1px;
  background: linear-gradient(90deg, transparent, #00cc8f, transparent);
  margin: 1rem 0;
}

.footer-copyright {
  color: #888;
  font-size: 0.85rem;
}

/* 🔄 Responsive */
@media (max-width: 600px) {
  .contact-info {
    flex-direction: column;
    align-items: center;
  }

  .footer-title {
    font-size: 1.2rem;
  }
}
      `}</style>
    </footer>
  );
};