import React from 'react';
import { Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white/90 backdrop-blur-sm border-t border-gray-200 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center mr-3 shadow-lg">
              <Phone className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900">Contact Manager</h3>
              <p className="text-sm text-gray-500">Professional contact management solution</p>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row items-center gap-6 text-sm text-gray-500">
            <span className="font-medium">© 2025 Contact Manager. All rights reserved.</span>
            <div className="flex items-center gap-6">
              <button className="hover:text-indigo-600 transition-colors font-medium">Privacy</button>
              <button className="hover:text-indigo-600 transition-colors font-medium">Terms</button>
              <button className="hover:text-indigo-600 transition-colors font-medium">Support</button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;