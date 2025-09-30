import React from "react";
import { useNavigate } from 'react-router-dom';
import { MessageCircle, Search, User, Settings, LogOut } from "lucide-react";
import { logout } from '../services/authApi';

const Header: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold text-gray-900">Công ty TNHH ABC</h1>
        </div>

        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Tìm kiếm..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
            />
          </div>

          {/* AI Chatbot */}
          <div className="relative">
            <button className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-teal-500 text-white rounded-lg hover:from-blue-600 hover:to-teal-600 transition-all duration-200 shadow-md hover:shadow-lg">
              <MessageCircle className="w-4 h-4" />
              <span className="text-sm font-medium">AI Assistant</span>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-orange-500 rounded-full animate-pulse"></div>
            </button>
          </div>

          {/* User Menu */}
          <div className="flex items-center space-x-2">
            <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors">
              <Settings className="w-5 h-5" />
            </button>
            <button 
              onClick={handleLogout}
              className="p-2 text-gray-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors"
              title="Đăng xuất"
            >
              <LogOut className="w-5 h-5" />
            </button>
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-gray-600" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
