import React from "react";
import {
  Users,
  Briefcase,
  TrendingUp,
  DollarSign,
  Calendar,
  AlertCircle,
  CheckCircle,
  Clock,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const Dashboard: React.FC = () => {
  const stats = [
    {
      title: "Job đã đăng",
      value: "24",
      change: "+12%",
      icon: Briefcase,
      color: "blue",
    },
    {
      title: "LĐ đã xác nhận",
      value: "186",
      change: "+8%",
      icon: Users,
      color: "teal",
    },
    {
      title: "Đang thực hiện",
      value: "12",
      change: "+5%",
      icon: Clock,
      color: "orange",
    },
    {
      title: "Chi phí T.Toán",
      value: "45.2M",
      change: "+15%",
      icon: DollarSign,
      color: "green",
    },
  ];

  const chartData = [
    { name: "T2", jobs: 4, workers: 24 },
    { name: "T3", jobs: 6, workers: 36 },
    { name: "T4", jobs: 3, workers: 18 },
    { name: "T5", jobs: 8, workers: 48 },
    { name: "T6", jobs: 5, workers: 30 },
    { name: "T7", jobs: 7, workers: 42 },
    { name: "CN", jobs: 2, workers: 12 },
  ];

  const pieData = [
    { name: "Đang tuyển", value: 8, color: "#3B82F6" },
    { name: "Đủ người", value: 12, color: "#10B981" },
    { name: "Hoàn thành", value: 4, color: "#6B7280" },
  ];

  const notifications = [
    {
      type: "warning",
      title: 'Job "Phụ bếp - Nhà hàng ABC" sắp hết slot',
      time: "2 giờ trước",
      icon: AlertCircle,
    },
    {
      type: "success",
      title: 'Thanh toán job "Bốc vác kho hàng" thành công',
      time: "4 giờ trước",
      icon: CheckCircle,
    },
    {
      type: "info",
      title: "Job mới sắp bắt đầu vào ngày mai",
      time: "6 giờ trước",
      icon: Calendar,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">
          Tổng quan hoạt động tuyển dụng của bạn
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          const colors = {
            blue: "bg-blue-500",
            teal: "bg-teal-500",
            orange: "bg-orange-500",
            green: "bg-green-500",
          };

          return (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold text-gray-900 mt-2">
                    {stat.value}
                  </p>
                  <p className="text-sm text-green-600 mt-1">{stat.change}</p>
                </div>
                <div
                  className={`w-12 h-12 ${
                    colors[stat.color as keyof typeof colors]
                  } rounded-lg flex items-center justify-center`}
                >
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Charts */}
        <div className="lg:col-span-2 space-y-6">
          {/* Bar Chart */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Lao động theo ngày trong tuần
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="workers" fill="#3B82F6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Pie Chart */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Phân bổ trạng thái công việc
            </h3>
            <div className="flex items-center justify-center">
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* AI Assistant */}
          <div className="bg-gradient-to-br from-blue-50 to-teal-50 border border-blue-200 p-6 rounded-xl">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">AI</span>
              </div>
              <h3 className="font-semibold text-gray-900">Gợi ý từ AI</h3>
            </div>
            <p className="text-sm text-gray-700 mb-4">
              Bạn có muốn tôi tìm nhanh 10 lao động phù hợp cho ca ngày mai
              không?
            </p>
            <button className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium">
              Tìm lao động ngay
            </button>
          </div>

          {/* Notifications */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Thông báo gần đây
            </h3>
            <div className="space-y-4">
              {notifications.map((notification, index) => {
                const Icon = notification.icon;
                const colors = {
                  warning: "text-orange-500 bg-orange-50",
                  success: "text-green-500 bg-green-50",
                  info: "text-blue-500 bg-blue-50",
                };

                return (
                  <div key={index} className="flex space-x-3">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        colors[notification.type as keyof typeof colors]
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">
                        {notification.title}
                      </p>
                      <p className="text-xs text-gray-500">
                        {notification.time}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
            <button className="w-full mt-4 text-sm text-blue-600 hover:text-blue-700 font-medium">
              Xem tất cả thông báo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
