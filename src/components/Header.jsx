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
      
      {/* Botón para agregar contacto */}
      <button onClick={handleAddContact} className="add-button">
        ➕ Add Contact
      </button>
      

      {/* Estilos CSS simples */}
      <style jsx>{`
        .header {
          background: linear-gradient(135deg, #00CC8F, #00A876);
          color: white;
          padding: 10px 10px;
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

        .add-button {
          background: white;
          color: #00CC8F;
          border: none;
          padding: 10px 20px;
          font-size: 1rem;
          font-weight: bold;
          border-radius: 25px;
          cursor: pointer;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
          transition: all 0.3s ease;
        }

        .add-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
          background: #f8f9fa;
        }

        .add-button:active {
          transform: translateY(0);
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