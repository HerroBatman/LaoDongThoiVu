import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Bell,
  Search,
  MessageCircle,
  User,
  LogOut,
  Settings,
} from "lucide-react";
import { adminLogout, getCurrentAdmin } from "../../lib/api";
import { getCurrentUser } from "../../lib/auth";

export default function Header() {
  const [showProfile, setShowProfile] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const navigate = useNavigate();
  const adminUser = getCurrentUser();

  const handleLogout = async () => {
    try {
      await adminLogout();
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
      // Force logout even if API call fails
      navigate("/login");
    }
  };

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Tìm kiếm..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-80"
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {/* AI Chatbot */}
          <button className="relative p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
            <MessageCircle size={20} />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full"></span>
          </button>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            >
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                3
              </span>
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                <div className="p-4 border-b border-gray-200">
                  <h3 className="font-semibold text-gray-900">Thông báo</h3>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  <div className="p-4 hover:bg-gray-50 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-900">
                      Khiếu nại mới
                    </p>
                    <p className="text-xs text-gray-600 mt-1">
                      Có 2 khiếu nại mới cần xử lý
                    </p>
                    <p className="text-xs text-gray-400 mt-1">5 phút trước</p>
                  </div>
                  <div className="p-4 hover:bg-gray-50 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-900">
                      Tài khoản chờ duyệt
                    </p>
                    <p className="text-xs text-gray-600 mt-1">
                      15 tài khoản NTD mới cần phê duyệt
                    </p>
                    <p className="text-xs text-gray-400 mt-1">1 giờ trước</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Profile */}
          <div className="relative">
            <button
              onClick={() => setShowProfile(!showProfile)}
              className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <User size={16} className="text-white" />
              </div>
              <div className="text-left">
                <p className="text-sm font-medium text-gray-900">
                  {adminUser?.name || "Admin User"}
                </p>
                <p className="text-xs text-gray-500">
                  {adminUser?.role === "super_admin" ? "Super Admin" : "Quản trị viên"}
                </p>
              </div>
            </button>

            {showProfile && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                <div className="p-2">
                  <div className="px-3 py-2 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-900">
                      {adminUser?.name}
                    </p>
                    <p className="text-xs text-gray-500">{adminUser?.email}</p>
                  </div>
                  <button className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md">
                    <Settings size={16} />
                    <span>Cài đặt</span>
                  </button>
                  <button 
                    onClick={handleLogout}
                    className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md"
                  >
                    <LogOut size={16} />
                    <span>Đăng xuất</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
