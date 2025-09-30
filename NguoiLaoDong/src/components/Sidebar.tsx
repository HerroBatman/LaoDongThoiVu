import React from "react";
import { NavLink } from "react-router-dom";
import {
  Home,
  User,
  Award,
  Briefcase,
  Calendar,
  History,
  DollarSign,
  Bell,
  HelpCircle,
  X,
} from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const menuItems = [
    { icon: Home, label: "Dashboard", path: "/" },
    { icon: User, label: "Hồ sơ cá nhân", path: "/profile" },
    { icon: Award, label: "Hồ sơ năng lực", path: "/skills" },
    { icon: Briefcase, label: "Danh sách việc làm", path: "/jobs" },
    { icon: Calendar, label: "Lịch làm việc", path: "/schedule" },
    { icon: History, label: "Lịch sử công việc", path: "/history" },
    { icon: DollarSign, label: "Lương & Uy tín", path: "/earnings" },
    { icon: Bell, label: "Thông báo", path: "/notifications" },
    { icon: HelpCircle, label: "Hỗ trợ & Khiếu nại", path: "/support" },
  ];

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 lg:hidden z-40"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
        fixed lg:static inset-y-0 left-0 z-50
        w-64 bg-white shadow-lg border-r border-gray-200
        transform ${isOpen ? "translate-x-0" : "-translate-x-full"} 
        lg:translate-x-0 transition-transform duration-300 ease-in-out
      `}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200 lg:hidden">
          <span className="text-lg font-semibold text-gray-900">Menu</span>
          <button
            onClick={onClose}
            className="p-2 rounded-md text-gray-600 hover:bg-gray-100"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="mt-4 px-3">
          <ul className="space-y-1">
            {menuItems.map((item, index) => (
              <li key={index}>
                <NavLink
                  to={item.path}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `flex items-center space-x-3 px-3 py-3 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-blue-50 text-blue-700 border-r-2 border-blue-700"
                        : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                    }`
                  }
                >
                  <item.icon size={20} />
                  <span>{item.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
