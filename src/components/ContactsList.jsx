import React from 'react';
import { Users, Star } from 'lucide-react';

const ContactsList = ({
  filteredContacts,
  selectedContact,
  setSelectedContact,
  categories,
  getCategoryColor
}) => {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-200/50 overflow-hidden">
      <div className="p-4 border-b border-gray-100">
        <h3 className="font-semibold text-gray-900">Contacts</h3>
      </div>
      <div className="max-h-96 overflow-y-auto">
        {filteredContacts.map(contact => (
          <div
            key={contact.id}
            onClick={() => setSelectedContact(contact)}
            className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-all ${
              selectedContact?.id === contact.id ? 'bg-indigo-50 border-indigo-200' : ''
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 ${getCategoryColor(contact.category)} rounded-full flex items-center justify-center text-white font-semibold shadow-sm`}>
                {contact.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h4 className="font-medium text-gray-900 truncate">{contact.name}</h4>
                  {contact.favorite && <Star className="w-4 h-4 text-yellow-500 fill-current" />}
                </div>
                <p className="text-sm text-gray-500 truncate">{contact.phone}</p>
                <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${getCategoryColor(contact.category)} text-white mt-1`}>
                  {categories.find(c => c.id === contact.category)?.name}
                </span>
              </div>
            </div>
          </div>
        ))}
        {filteredContacts.length === 0 && (
          <div className="p-8 text-center">
            <Users className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">No contacts found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactsList;