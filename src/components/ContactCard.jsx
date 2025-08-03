// src/components/ContactCard.jsx
import { Star, Phone, Trash2, Edit } from 'lucide-react';

const ContactCard = ({
  contact,
  onSelect,
  onEdit,
  onDelete,
  onToggleFavorite
}) => {
  return (
    <div
      className="bg-white rounded-2xl shadow-sm p-4 border border-gray-200 hover:shadow-md cursor-pointer transition"
      onClick={onSelect}
    >
      <div className="flex items-center justify-between mb-3">
        {/* Avatar */}
        <div
          className={`w-12 h-12 rounded-full bg-indigo-500 text-white font-bold text-xl flex items-center justify-center`}
        >
          {contact.avatar}
        </div>

        {/* Favorite icon */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite();
          }}
          className={`p-1 rounded-full ${
            contact.favorite ? 'bg-yellow-100 text-yellow-500' : 'bg-gray-100 text-gray-400'
          } hover:scale-105 transition`}
          title="Toggle Favorite"
        >
          <Star className="w-5 h-5" />
        </button>
      </div>

      {/* Contact Info */}
      <h3 className="text-lg font-semibold text-gray-900">{contact.name}</h3>
      <div className="text-sm text-gray-600 flex items-center gap-2 mt-1">
        <Phone className="w-4 h-4 text-indigo-400" />
        <span>{contact.phone}</span>
      </div>

      {/* Actions */}
      <div className="flex justify-end mt-4 gap-2">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onEdit();
          }}
          className="p-1.5 rounded-full bg-blue-100 text-blue-600 hover:scale-105 transition"
          title="Edit"
        >
          <Edit className="w-4 h-4" />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          className="p-1.5 rounded-full bg-red-100 text-red-600 hover:scale-105 transition"
          title="Delete"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default ContactCard;
