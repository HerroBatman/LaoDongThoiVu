import { useNavigate } from "react-router-dom";
import React from "react";
import { Menu, MessageCircle, Bell, User } from "lucide-react";
import { logout, getCurrentUser } from "../lib/auth";

interface HeaderProps {
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const navigate = useNavigate();
  const user = getCurrentUser() as any;
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 px-4 py-3 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-md text-gray-600 hover:bg-gray-100 transition-colors"
        >
          <Menu size={20} />
        </button>
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">TW</span>
          </div>
          <span className="font-semibold text-gray-900 hidden sm:block">
            TimWork
          </span>
        </div>
      </div>

      <div className="flex items-center space-x-3">
        <button className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors relative">
          <MessageCircle size={20} />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full"></span>
          <span className="sr-only">AI Chatbot</span>
        </button>

        <button
          onClick={() => navigate("/notifications")} // ✅ thêm dòng này
          className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors relative"
        >
          <Bell size={20} />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        <div className="flex items-center space-x-2 pl-3 border-l border-gray-200">
          <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
            <User size={16} className="text-gray-600" />
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-medium text-gray-900">{user?.name || 'Người dùng'}</p>
            <p className="text-xs text-gray-500">Lao động thời vụ</p>
          </div>
          <button
            onClick={() => {
              logout();
              navigate('/login');
            }}
            className="ml-2 px-3 py-1 text-sm rounded-md border border-gray-200 text-gray-700 hover:bg-gray-100"
          >
            Đăng xuất
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
