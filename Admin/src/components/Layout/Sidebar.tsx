import React from "react";
import {
  LayoutDashboard,
  Users,
  Briefcase,
  Clock,
  FileText,
  Star,
  MessageSquare,
  Settings,
  BarChart3,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
}

const menuItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "accounts", label: "Quản lý tài khoản", icon: Users },
  { id: "jobs", label: "Quản lý công việc", icon: Briefcase },
  { id: "progress", label: "Tiến độ lao động", icon: Clock },
  { id: "contracts", label: "Hợp đồng & Thanh toán", icon: FileText },
  { id: "reputation", label: "Điểm uy tín", icon: Star },
  { id: "complaints", label: "Xử lý khiếu nại", icon: MessageSquare },
  { id: "content", label: "Nội dung, Danh mục & Kỹ năng", icon: Settings },
  { id: "reports", label: "Thống kê & Báo cáo", icon: BarChart3 },
];

export default function Sidebar({
  activeTab,
  setActiveTab,
  isCollapsed,
  setIsCollapsed,
}: SidebarProps) {
  return (
    <div
      className={`bg-slate-900 text-white transition-all duration-300 ${
        isCollapsed ? "w-16" : "w-64"
      } min-h-screen relative`}
    >
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-6 bg-slate-900 border border-slate-700 rounded-full p-1 hover:bg-slate-800 transition-colors"
      >
        {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
      </button>

      <div className="p-4">
        <div className="flex items-center space-x-3 mb-8">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <Briefcase size={20} />
          </div>
          {!isCollapsed && (
            <div>
              <h1 className="font-bold text-lg">LaborAdmin</h1>
              <p className="text-xs text-slate-400">Quản trị hệ thống</p>
            </div>
          )}
        </div>

        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-colors ${
                  activeTab === item.id
                    ? "bg-blue-600 text-white"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`}
                title={isCollapsed ? item.label : ""}
              >
                <Icon size={20} />
                {!isCollapsed && (
                  <span className="text-sm font-medium">{item.label}</span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
