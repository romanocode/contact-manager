import React from 'react';

export default function Header() {
  
  // Función para manejar el clic del botón
  const handleAddContact = () => {
    alert('¡Vamos a agregar un nuevo contacto!');
  };

  return (
    <header className="header">
      {/* Icono principal */}
      <div className="header-icon">📱</div>
      
      {/* Título */}
      <h1 className="header-title">Contact Manager</h1>
      
      {/* Descripción */}
      <p className="header-description">
        Save and organize your contacts easily
      </p>
    
      

      {/* Estilos CSS simples */}
      <style jsx>{`
        .header {
          background: linear-gradient(135deg, #00CC8F, #00A876);
          color: white;
          text-align: center;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
        }

        .header-icon {
          font-size: 50px;
          margin-bottom: 20px;
        }

        .header-title {
          font-size: 2.5rem;
          font-weight: bold;
          margin: 0 0 15px 0;
          text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
        }

        .header-description {
          font-size: 1.2rem;
          margin: 0 0 30px 0;
          opacity: 0.9;
        }

        

        /* Para pantallas pequeñas */
        @media (max-width: 768px) {
          .header-title {
            font-size: 2rem;
          }
          
          .header-description {
            font-size: 1.1rem;
          }
          
          .add-button {
            padding: 12px 25px;
            font-size: 1rem;
          }
        }
      `}</style>
    </header>
  );
};