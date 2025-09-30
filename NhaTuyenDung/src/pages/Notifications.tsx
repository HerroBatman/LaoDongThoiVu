import React, { useState } from "react";
import {
  Bell,
  AlertTriangle,
  CheckCircle,
  Info,
  Calendar,
  Users,
  DollarSign,
  MessageSquare,
  Search,
  Filter,
  ExternalLink,
  Trash2,
  BookMarked as MarkAsRead,
} from "lucide-react";

const Notifications: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"notifications" | "support">(
    "notifications"
  );
  const [filterType, setFilterType] = useState<string>("all");

  const notifications = [
    {
      id: 1,
      type: "warning",
      title: 'Job "Phụ bếp - Nhà hàng ABC" sắp hết slot',
      message: "Chỉ còn 1/3 vị trí. Job bắt đầu trong 2 giờ nữa.",
      time: "2 giờ trước",
      read: false,
      category: "job",
      action: "Xem chi tiết",
    },
    {
      id: 2,
      type: "success",
      title: "Thanh toán thành công",
      message:
        'Thanh toán cho job "Bốc vác kho hàng" đã được xử lý thành công.',
      time: "4 giờ trước",
      read: false,
      category: "payment",
      action: "Xem hóa đơn",
    },
    {
      id: 3,
      type: "info",
      title: "Job mới sắp bắt đầu",
      message: 'Job "Phục vụ sự kiện" sẽ bắt đầu vào 8:00 ngày mai.',
      time: "6 giờ trước",
      read: true,
      category: "schedule",
      action: "Xem lịch",
    },
    {
      id: 4,
      type: "error",
      title: "Lao động báo nghỉ việc",
      message:
        'Nguyễn Văn A đã báo không thể tham gia job "Dọn dẹp văn phòng".',
      time: "1 ngày trước",
      read: true,
      category: "worker",
      action: "Tìm thay thế",
    },
    {
      id: 5,
      type: "info",
      title: "Hợp đồng sắp hết hạn",
      message: "Hợp đồng dịch vụ của bạn sẽ hết hạn vào ngày 31/12/2024.",
      time: "2 ngày trước",
      read: false,
      category: "contract",
      action: "Gia hạn",
    },
  ];

  const supportTickets = [
    {
      id: "ST001",
      title: "Lao động bỏ ca không báo trước",
      category: "worker-issue",
      priority: "high",
      status: "processing",
      statusText: "Đang xử lý",
      description:
        "Lao động Trần Văn B đã bỏ ca làm việc mà không thông báo trước, gây ảnh hưởng đến tiến độ công việc.",
      createdAt: "23/12/2024 09:30",
      updatedAt: "23/12/2024 14:20",
      response:
        "Chúng tôi đang liên hệ với lao động và sẽ có biện pháp xử lý phù hợp.",
    },
    {
      id: "ST002",
      title: "Lỗi thanh toán qua VNPay",
      category: "payment",
      priority: "medium",
      status: "resolved",
      statusText: "Đã xử lý",
      description:
        "Giao dịch thanh toán bị lỗi, tiền đã bị trừ nhưng trạng thái job chưa được cập nhật.",
      createdAt: "22/12/2024 16:45",
      updatedAt: "23/12/2024 10:00",
      response:
        "Giao dịch đã được xử lý thành công. Trạng thái job đã được cập nhật và tiền đã được hoàn trả.",
    },
    {
      id: "ST003",
      title: "Yêu cầu thay đổi thông tin hóa đơn",
      category: "billing",
      priority: "low",
      status: "pending",
      statusText: "Chờ xử lý",
      description: "Cần thay đổi thông tin công ty trên hóa đơn điện tử.",
      createdAt: "21/12/2024 11:20",
      updatedAt: "21/12/2024 11:20",
      response: null,
    },
  ];

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "warning":
        return { icon: AlertTriangle, color: "text-orange-500 bg-orange-50" };
      case "success":
        return { icon: CheckCircle, color: "text-green-500 bg-green-50" };
      case "error":
        return { icon: AlertTriangle, color: "text-red-500 bg-red-50" };
      case "info":
      default:
        return { icon: Info, color: "text-blue-500 bg-blue-50" };
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "resolved":
        return "bg-green-100 text-green-800";
      case "processing":
        return "bg-blue-100 text-blue-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-orange-100 text-orange-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredNotifications = notifications.filter((notification) => {
    if (filterType === "all") return true;
    if (filterType === "unread") return !notification.read;
    return notification.category === filterType;
  });

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Thông báo & Hỗ trợ</h1>
        <p className="text-gray-600 mt-2">
          Quản lý thông báo hệ thống và yêu cầu hỗ trợ
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Chưa đọc</p>
              <p className="text-2xl font-bold text-orange-600">
                {unreadCount}
              </p>
            </div>
            <Bell className="w-8 h-8 text-orange-500" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Tổng TB</p>
              <p className="text-2xl font-bold text-blue-600">
                {notifications.length}
              </p>
            </div>
            <MessageSquare className="w-8 h-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Ticket đang xử lý</p>
              <p className="text-2xl font-bold text-yellow-600">
                {supportTickets.filter((t) => t.status === "processing").length}
              </p>
            </div>
            <AlertTriangle className="w-8 h-8 text-yellow-500" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Đã giải quyết</p>
              <p className="text-2xl font-bold text-green-600">
                {supportTickets.filter((t) => t.status === "resolved").length}
              </p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab("notifications")}
              className={`py-4 text-sm font-medium border-b-2 transition-colors ${
                activeTab === "notifications"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              Thông báo ({unreadCount})
            </button>
            <button
              onClick={() => setActiveTab("support")}
              className={`py-4 text-sm font-medium border-b-2 transition-colors ${
                activeTab === "support"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              Hỗ trợ (
              {supportTickets.filter((t) => t.status === "processing").length})
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === "notifications" ? (
            <div className="space-y-6">
              {/* Filters */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Filter className="w-4 h-4 text-gray-500" />
                  <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">Tất cả</option>
                    <option value="unread">Chưa đọc</option>
                    <option value="job">Công việc</option>
                    <option value="payment">Thanh toán</option>
                    <option value="worker">Lao động</option>
                    <option value="schedule">Lịch trình</option>
                  </select>
                </div>

                <button className="flex items-center space-x-2 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                  <MarkAsRead className="w-4 h-4" />
                  <span>Đánh dấu tất cả đã đọc</span>
                </button>
              </div>

              {/* Notifications List */}
              <div className="space-y-4">
                {filteredNotifications.map((notification) => {
                  const { icon: Icon, color } = getNotificationIcon(
                    notification.type
                  );

                  return (
                    <div
                      key={notification.id}
                      className={`p-4 border rounded-lg transition-all hover:shadow-md ${
                        !notification.read
                          ? "border-blue-200 bg-blue-50/30"
                          : "border-gray-200 bg-white"
                      }`}
                    >
                      <div className="flex items-start space-x-4">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${color}`}
                        >
                          <Icon className="w-5 h-5" />
                        </div>

                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="font-medium text-gray-900 mb-1">
                                {notification.title}
                                {!notification.read && (
                                  <span className="w-2 h-2 bg-blue-500 rounded-full inline-block ml-2"></span>
                                )}
                              </h3>
                              <p className="text-sm text-gray-600 mb-2">
                                {notification.message}
                              </p>
                              <p className="text-xs text-gray-500">
                                {notification.time}
                              </p>
                            </div>

                            <div className="flex items-center space-x-2">
                              <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                                {notification.action}
                              </button>
                              <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Support Form */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Gửi yêu cầu hỗ trợ mới
                </h3>
                <form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Danh mục
                      </label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option>Chọn danh mục</option>
                        <option>Vấn đề lao động</option>
                        <option>Lỗi thanh toán</option>
                        <option>Vấn đề hóa đơn</option>
                        <option>Lỗi hệ thống</option>
                        <option>Khác</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Mức độ ưu tiên
                      </label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option>Thấp</option>
                        <option>Trung bình</option>
                        <option>Cao</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Tiêu đề
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Mô tả ngắn gọn vấn đề"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Mô tả chi tiết
                    </label>
                    <textarea
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Mô tả chi tiết vấn đề bạn gặp phải..."
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    Gửi yêu cầu
                  </button>
                </form>
              </div>

              {/* Support Tickets */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Danh sách ticket hỗ trợ
                </h3>

                {supportTickets.map((ticket) => (
                  <div
                    key={ticket.id}
                    className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center space-x-3 mb-2">
                          <h4 className="text-lg font-semibold text-gray-900">
                            {ticket.title}
                          </h4>
                          <span
                            className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                              ticket.status
                            )}`}
                          >
                            {ticket.statusText}
                          </span>
                          <span
                            className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(
                              ticket.priority
                            )}`}
                          >
                            {ticket.priority === "high"
                              ? "Cao"
                              : ticket.priority === "medium"
                              ? "Trung bình"
                              : "Thấp"}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500 mb-2">
                          #{ticket.id}
                        </p>
                        <p className="text-sm text-gray-700">
                          {ticket.description}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                      <div>
                        <span className="text-gray-500">Tạo:</span>
                        <p className="font-medium">{ticket.createdAt}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Cập nhật:</span>
                        <p className="font-medium">{ticket.updatedAt}</p>
                      </div>
                    </div>

                    {ticket.response && (
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                        <p className="text-sm font-medium text-blue-900 mb-1">
                          Phản hồi từ hỗ trợ:
                        </p>
                        <p className="text-sm text-blue-800">
                          {ticket.response}
                        </p>
                      </div>
                    )}

                    <div className="flex items-center space-x-3">
                      <button className="flex items-center space-x-2 px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                        <MessageSquare className="w-4 h-4" />
                        <span>Trả lời</span>
                      </button>
                      <button className="flex items-center space-x-2 px-3 py-1 text-sm text-blue-600 hover:text-blue-700 transition-colors">
                        <ExternalLink className="w-4 h-4" />
                        <span>Xem chi tiết</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notifications;
