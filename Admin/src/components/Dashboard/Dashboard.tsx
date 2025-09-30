import React from "react";
import {
  Users,
  Building2,
  Clock,
  Briefcase,
  DollarSign,
  AlertTriangle,
} from "lucide-react";
import StatsCard from "./StatsCard";
import Charts from "./Charts";
import AIAssistant from "./AIAssistant";

export default function Dashboard() {
  const stats = [
    {
      title: "Tổng số Người lao động",
      value: "12,847",
      change: "+12% so với tháng trước",
      changeType: "increase" as const,
      icon: Users,
      color: "bg-blue-500",
    },
    {
      title: "Tổng số Nhà tuyển dụng",
      value: "2,156",
      change: "+8% so với tháng trước",
      changeType: "increase" as const,
      icon: Building2,
      color: "bg-green-500",
    },
    {
      title: "Tài khoản chờ duyệt",
      value: "47",
      change: "Cần xử lý",
      changeType: "neutral" as const,
      icon: Clock,
      color: "bg-yellow-500",
    },
    {
      title: "Công việc đang mở",
      value: "324",
      change: "89 đã hoàn thành",
      changeType: "neutral" as const,
      icon: Briefcase,
      color: "bg-purple-500",
    },
    {
      title: "Doanh thu tháng này",
      value: "2.4 tỷ VNĐ",
      change: "+15% so với tháng trước",
      changeType: "increase" as const,
      icon: DollarSign,
      color: "bg-emerald-500",
    },
    {
      title: "Khiếu nại chưa xử lý",
      value: "12",
      change: "3 khẩn cấp",
      changeType: "decrease" as const,
      icon: AlertTriangle,
      color: "bg-red-500",
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Hệ thống</h1>
        <div className="flex items-center space-x-3">
          <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm">
            <option>30 ngày qua</option>
            <option>7 ngày qua</option>
            <option>Hôm nay</option>
          </select>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      {/* Charts and AI Assistant */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Charts />
        </div>
        <div>
          <AIAssistant />
        </div>
      </div>

      {/* Recent Activities */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            Hoạt động gần đây
          </h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">
                  Công việc "Phụ bếp nhà hàng ABC" đã hoàn thành
                </p>
                <p className="text-xs text-gray-500">5 phút trước</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">
                  Tài khoản NTD "Công ty XYZ" đã được phê duyệt
                </p>
                <p className="text-xs text-gray-500">15 phút trước</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">
                  Khiếu nại mới từ NLĐ Nguyễn Văn A
                </p>
                <p className="text-xs text-gray-500">30 phút trước</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">
                  Công việc "Bốc vác kho hàng" bị báo cáo vi phạm
                </p>
                <p className="text-xs text-gray-500">1 giờ trước</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
