import React, { useState } from "react";
import {
  Calendar,
  Download,
  TrendingUp,
  Users,
  Building2,
  Briefcase,
  DollarSign,
  MessageSquare,
  BarChart3,
  PieChart,
} from "lucide-react";

export default function ReportsManagement() {
  const [dateRange, setDateRange] = useState("30days");
  const [reportType, setReportType] = useState("overview");

  const monthlyData = [
    {
      month: "T1",
      workers: 1200,
      employers: 180,
      jobs: 450,
      revenue: 1.8,
      complaints: 12,
    },
    {
      month: "T2",
      workers: 1350,
      employers: 195,
      jobs: 520,
      revenue: 2.1,
      complaints: 8,
    },
    {
      month: "T3",
      workers: 1480,
      employers: 210,
      jobs: 580,
      revenue: 2.3,
      complaints: 15,
    },
    {
      month: "T4",
      workers: 1620,
      employers: 225,
      jobs: 620,
      revenue: 2.5,
      complaints: 10,
    },
    {
      month: "T5",
      workers: 1750,
      employers: 240,
      jobs: 680,
      revenue: 2.8,
      complaints: 6,
    },
    {
      month: "T6",
      workers: 1890,
      employers: 255,
      jobs: 720,
      revenue: 3.1,
      complaints: 9,
    },
  ];

  const industryData = [
    {
      name: "Nhà hàng - Khách sạn",
      percentage: 35,
      jobs: 324,
      color: "bg-blue-500",
    },
    { name: "Xây dựng", percentage: 25, jobs: 231, color: "bg-green-500" },
    { name: "Logistics", percentage: 20, jobs: 185, color: "bg-yellow-500" },
    { name: "Bán lẻ", percentage: 15, jobs: 139, color: "bg-purple-500" },
    { name: "Khác", percentage: 5, jobs: 46, color: "bg-gray-500" },
  ];

  const completionRates = [
    { category: "Nhà hàng - Khách sạn", rate: 92, total: 324, completed: 298 },
    { category: "Xây dựng", rate: 88, total: 231, completed: 203 },
    { category: "Logistics", rate: 95, total: 185, completed: 176 },
    { category: "Bán lẻ", rate: 90, total: 139, completed: 125 },
    { category: "Sự kiện", rate: 85, total: 46, completed: 39 },
  ];

  const maxRevenue = Math.max(...monthlyData.map((item) => item.revenue));
  const maxWorkers = Math.max(...monthlyData.map((item) => item.workers));

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Thống kê & Báo cáo</h1>
        <div className="flex items-center space-x-3">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="7days">7 ngày qua</option>
            <option value="30days">30 ngày qua</option>
            <option value="3months">3 tháng qua</option>
            <option value="6months">6 tháng qua</option>
            <option value="1year">1 năm qua</option>
          </select>
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2">
            <Download size={16} />
            <span>Xuất Excel</span>
          </button>
          <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2">
            <Download size={16} />
            <span>Xuất PDF</span>
          </button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Tổng NLĐ mới</p>
              <p className="text-2xl font-bold text-gray-900">+1,247</p>
              <p className="text-sm text-green-600 mt-1">
                +12% so với tháng trước
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
              <Users size={24} className="text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Tổng NTD mới</p>
              <p className="text-2xl font-bold text-gray-900">+156</p>
              <p className="text-sm text-green-600 mt-1">
                +8% so với tháng trước
              </p>
            </div>
            <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
              <Building2 size={24} className="text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Công việc hoàn thành
              </p>
              <p className="text-2xl font-bold text-gray-900">89.5%</p>
              <p className="text-sm text-green-600 mt-1">
                +2.3% so với tháng trước
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
              <Briefcase size={24} className="text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Doanh thu tháng
              </p>
              <p className="text-2xl font-bold text-gray-900">3.1 tỷ</p>
              <p className="text-sm text-green-600 mt-1">
                +15% so với tháng trước
              </p>
            </div>
            <div className="w-12 h-12 bg-emerald-500 rounded-lg flex items-center justify-center">
              <DollarSign size={24} className="text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Doanh thu theo tháng (tỷ VNĐ)
            </h3>
            <BarChart3 size={20} className="text-gray-400" />
          </div>
          <div className="flex items-end space-x-2 h-64">
            {monthlyData.map((item, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div
                  className="w-full bg-gray-200 rounded-t-lg relative"
                  style={{ height: "200px" }}
                >
                  <div
                    className="bg-blue-500 rounded-t-lg absolute bottom-0 w-full transition-all duration-500"
                    style={{ height: `${(item.revenue / maxRevenue) * 100}%` }}
                  ></div>
                </div>
                <div className="mt-2 text-center">
                  <p className="text-sm font-medium text-gray-900">
                    {item.revenue}
                  </p>
                  <p className="text-xs text-gray-500">{item.month}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Workers Growth Chart */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Tăng trưởng NLĐ theo tháng
            </h3>
            <TrendingUp size={20} className="text-gray-400" />
          </div>
          <div className="flex items-end space-x-2 h-64">
            {monthlyData.map((item, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div
                  className="w-full bg-gray-200 rounded-t-lg relative"
                  style={{ height: "200px" }}
                >
                  <div
                    className="bg-green-500 rounded-t-lg absolute bottom-0 w-full transition-all duration-500"
                    style={{ height: `${(item.workers / maxWorkers) * 100}%` }}
                  ></div>
                </div>
                <div className="mt-2 text-center">
                  <p className="text-sm font-medium text-gray-900">
                    {item.workers}
                  </p>
                  <p className="text-xs text-gray-500">{item.month}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Industry Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Phân bố ngành nghề (%)
            </h3>
            <PieChart size={20} className="text-gray-400" />
          </div>
          <div className="space-y-4">
            {industryData.map((industry, index) => (
              <div key={index} className="flex items-center space-x-4">
                <div className="w-20 text-sm text-gray-600 text-right">
                  {industry.name}
                </div>
                <div className="flex-1 bg-gray-200 rounded-full h-4 relative">
                  <div
                    className={`${industry.color} h-4 rounded-full transition-all duration-500`}
                    style={{ width: `${industry.percentage}%` }}
                  ></div>
                </div>
                <div className="w-12 text-sm font-medium text-gray-900">
                  {industry.percentage}%
                </div>
                <div className="w-16 text-xs text-gray-500">
                  {industry.jobs} jobs
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Completion Rates */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Tỷ lệ hoàn thành công việc
            </h3>
            <BarChart3 size={20} className="text-gray-400" />
          </div>
          <div className="space-y-4">
            {completionRates.map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">
                    {item.category}
                  </span>
                  <span className="text-sm font-bold text-gray-900">
                    {item.rate}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${item.rate}%` }}
                  ></div>
                </div>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>{item.completed} hoàn thành</span>
                  <span>{item.total} tổng cộng</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Complaints Timeline */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">
            Khiếu nại theo thời gian
          </h3>
          <MessageSquare size={20} className="text-gray-400" />
        </div>
        <div className="flex items-end space-x-4 h-32">
          {monthlyData.map((item, index) => (
            <div key={index} className="flex-1 flex flex-col items-center">
              <div
                className="w-full bg-gray-200 rounded-t-lg relative"
                style={{ height: "80px" }}
              >
                <div
                  className="bg-red-500 rounded-t-lg absolute bottom-0 w-full transition-all duration-500"
                  style={{ height: `${(item.complaints / 15) * 100}%` }}
                ></div>
              </div>
              <div className="mt-2 text-center">
                <p className="text-sm font-medium text-gray-900">
                  {item.complaints}
                </p>
                <p className="text-xs text-gray-500">{item.month}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Export Options */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 border border-blue-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Tùy chọn xuất báo cáo
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <h4 className="font-medium text-gray-900 mb-2">
              Báo cáo tổng quan
            </h4>
            <p className="text-sm text-gray-600 mb-3">
              Thống kê tổng thể về người dùng, công việc và doanh thu
            </p>
            <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Xuất báo cáo
            </button>
          </div>

          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <h4 className="font-medium text-gray-900 mb-2">
              Báo cáo tài chính
            </h4>
            <p className="text-sm text-gray-600 mb-3">
              Chi tiết về doanh thu, thanh toán và hoa hồng
            </p>
            <button className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors">
              Xuất báo cáo
            </button>
          </div>

          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <h4 className="font-medium text-gray-900 mb-2">
              Báo cáo hoạt động
            </h4>
            <p className="text-sm text-gray-600 mb-3">
              Thống kê về hoạt động người dùng và hiệu suất hệ thống
            </p>
            <button className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors">
              Xuất báo cáo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
