import React from 'react';

export default function ContactCard({contact, toggleFavorite}) {
  
  // Función para manejar clic en editar
  const handleEdit = () => {
    alert(`Editando contacto: ${contact.name}`);
  };

  // Función para manejar clic en eliminar
  const handleDelete = () => {
    if (window.confirm(`¿Estás seguro de eliminar a ${contact.name}?`)) {
      alert(`Contacto ${contact.name} eliminado`);
    }
  };

  return (
    <div className="contact-card">
      {/* Header verde con avatar */}
      <div className="card-header">
        <div className="avatar">👤</div>
        
        {/* Botones de acción */}
        <div className="action-buttons">
          <button onClick={handleEdit} className="edit-btn">✏️</button>
          <button onClick={handleDelete} className="delete-btn">🗑️</button>
        </div>

        <span>{contact?.isFavorite ? '⭐' : '☆'}</span>
        
      </div>

      
      
      {/* Información del contacto */}
      <div className="card-content">
        <h3 className="contact-name">{contact.name}</h3>
        
        <div className="contact-info-card">
          <div className="info-item">
            <span className="icon">📞</span>
            <span className="text">{contact.phone}</span>
          </div>
          
          <div className="info-item">
            <span className="icon">📧</span>
            <span className="text">{contact.email}</span>
          </div>
        </div>

        <button className='favorite-btn' onClick={() => toggleFavorite(contact.id)}>
          {contact.isFavorite ? "remove favorite" : "Add Favorite"}
        </button>
      </div>

      {/* Estilos CSS dentro del componente */}
      <style jsx>{`
        .contact-card {
        
          background: white;
          border-radius: 15px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
          max-width: 300px;
          margin: 20px;
          overflow: hidden;
          transition: transform 0.3s ease;
        }

        .contact-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
        }

        .card-header {
          background: linear-gradient(135deg, #00CC8F, #00A876);
          height: 80px;
          position: relative;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          padding: 5px;
        }

        .avatar {
          background: white;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          position: absolute;
          bottom: -25px;
          left: 20px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        .action-buttons {
          display: flex;
          gap: 8px;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .contact-card:hover .action-buttons {
          opacity: 1;
        }

        

        .edit-btn, .delete-btn {
          background: rgba(255, 255, 255, 0.9);
          border: none;
          width: 35px;
          height: 35px;
          border-radius: 50%;
          cursor: pointer;
          font-size: 16px;
          transition: all 0.2s ease;
        }

        .edit-btn:hover, .delete-btn:hover {
          background: white;
          transform: scale(1.1);
        }

        .favorite-btn {
  background-color: transparent;
  border: 1px solid #00cc8f;
  color: #00cc8f;
  font-size: 0.75rem;
  padding: 6px 10px;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-top: 15px;
}

.favorite-btn:hover {
  background-color: #00cc8f;
  color: white;
  transform: translateY(-1px);
  box-shadow: 0 2px 5px rgba(0, 204, 143, 0.2);
}
        .card-content {
          padding: 30px 20px 20px;
        }

        .contact-name {
          color: #333;
          font-size: 22px;
          font-weight: bold;
          margin-bottom: 20px;
          text-transform: capitalize;
        }

        .contact-info-card {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .info-item {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .icon {
          background: #f0fdf4;
          width: 35px;
          height: 35px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
        }

        .text {
          color: #666;
          font-size: 14px;
          font-weight: 500;
        }
      `}</style>
    </div>
  );
};