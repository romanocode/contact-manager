import React from 'react';
import { Phone, Mail, MapPin, Star, Edit, Trash2, Users } from 'lucide-react';

const ContactDetails = ({
  selectedContact,
  categories,
  getCategoryColor,
  onEdit,
  onDelete,
  onToggleFavorite
}) => {
  if (!selectedContact) {
    return (
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-200/50 min-h-[600px]">
        <div className="flex items-center justify-center h-full p-8">
          <div className="text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Users className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No contact selected</h3>
            <p className="text-gray-500">Select a contact from the list to view details</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-200/50 min-h-[600px]">
      <div className="p-6">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className={`w-16 h-16 ${getCategoryColor(selectedContact.category)} rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg`}>
              {selectedContact.avatar}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{selectedContact.name}</h2>
              <span className={`inline-block px-3 py-1 text-sm font-medium rounded-full ${getCategoryColor(selectedContact.category)} text-white mt-1`}>
                {categories.find(c => c.id === selectedContact.category)?.name}
              </span>
            </div>
          </div>
          
          <button
            onClick={() => onToggleFavorite(selectedContact.id)}
            className={`p-3 rounded-xl transition-all ${
              selectedContact.favorite 
                ? 'text-yellow-500 bg-yellow-50 hover:bg-yellow-100' 
                : 'text-gray-400 hover:text-yellow-500 hover:bg-yellow-50'
            }`}
          >
            <Star className={`w-6 h-6 ${selectedContact.favorite ? 'fill-current' : ''}`} />
          </button>
        </div>

        <div className="grid gap-6 mb-8">
          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
            <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
              <Phone className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Phone</p>
              <p className="font-medium text-gray-900">{selectedContact.phone}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
              <Mail className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-medium text-gray-900">{selectedContact.email}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
            <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
              <MapPin className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Address</p>
              <p className="font-medium text-gray-900">{selectedContact.address}</p>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => onEdit(selectedContact)}
            className="flex-1 bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700 py-3 px-4 rounded-xl hover:from-indigo-100 hover:to-purple-100 transition-all flex items-center justify-center gap-2 font-medium"
          >
            <Edit className="w-4 h-4" />
            Edit Contact
          </button>
          <button
            onClick={() => onDelete(selectedContact.id)}
            className="bg-red-50 text-red-700 py-3 px-4 rounded-xl hover:bg-red-100 transition-all"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactDetails;