import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  User,
  Plus,
  FileText,
  BarChart3,
  Contact as FileContract,
  Star,
  Bell,
  Building2,
} from "lucide-react";

const Sidebar: React.FC = () => {
  const location = useLocation();

  const menuItems = [
    { path: "/", icon: LayoutDashboard, label: "Dashboard" },
    { path: "/profile", icon: User, label: "Hồ sơ NTD" },
    { path: "/create-job", icon: Plus, label: "Tạo yêu cầu tuyển dụng" },
    { path: "/manage-jobs", icon: FileText, label: "Quản lý đơn yêu cầu" },
    { path: "/job-progress", icon: BarChart3, label: "Tiến độ công việc" },
    { path: "/contracts", icon: FileContract, label: "Hợp đồng & TT" },
    { path: "/reviews", icon: Star, label: "Đánh giá LĐ" },
    { path: "/notifications", icon: Bell, label: "Thông báo & HT" },
  ];

  return (
    <div className="w-64 bg-white shadow-lg border-r border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <Building2 className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">TimWork</h2>
            <p className="text-sm text-gray-500">Nhà tuyển dụng</p>
          </div>
        </div>
      </div>

      <nav className="mt-6">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center px-6 py-3 text-sm font-medium transition-colors duration-200 ${
                isActive
                  ? "text-blue-600 bg-blue-50 border-r-2 border-blue-600"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              <Icon className="w-5 h-5 mr-3" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;
