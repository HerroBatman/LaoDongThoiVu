import React, { useState } from "react";
import {
  Bell,
  Calendar,
  DollarSign,
  AlertCircle,
  Check,
  Settings,
  BellOff,
} from "lucide-react";

const Notifications = () => {
  const [filter, setFilter] = useState("all");
  const [notificationSettings, setNotificationSettings] = useState({
    newJobs: true,
    scheduleReminders: true,
    paymentUpdates: true,
    systemUpdates: false,
  });

  const notifications = [
    {
      id: 1,
      type: "schedule",
      title: "Nhắc nhở ca làm việc",
      message: "Bạn có ca làm việc tại Highlands Coffee vào 8:00 sáng mai",
      timestamp: "2024-01-16T06:00:00Z",
      isRead: false,
      priority: "high",
    },
    {
      id: 2,
      type: "payment",
      title: "Thanh toán đã được xử lý",
      message: "Bạn đã nhận được 150,000đ từ Highlands Coffee",
      timestamp: "2024-01-15T14:30:00Z",
      isRead: false,
      priority: "medium",
    },
    {
      id: 3,
      type: "job",
      title: "Công việc mới phù hợp",
      message: "3 công việc mới phù hợp với hồ sơ của bạn",
      timestamp: "2024-01-15T10:15:00Z",
      isRead: true,
      priority: "medium",
    },
    {
      id: 4,
      type: "schedule",
      title: "Check-in thành công",
      message: "Bạn đã check-in ca làm việc tại Viettel Post",
      timestamp: "2024-01-14T06:00:00Z",
      isRead: true,
      priority: "low",
    },
    {
      id: 5,
      type: "payment",
      title: "Chờ thanh toán",
      message: "Lương của bạn từ Saigon Co.op đang được xử lý",
      timestamp: "2024-01-13T18:00:00Z",
      isRead: true,
      priority: "medium",
    },
  ];

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "schedule":
        return Calendar;
      case "payment":
        return DollarSign;
      case "job":
        return Bell;
      default:
        return AlertCircle;
    }
  };

  const getNotificationColor = (type: string, priority: string) => {
    if (priority === "high") return "text-red-600 bg-red-50";
    switch (type) {
      case "schedule":
        return "text-blue-600 bg-blue-50";
      case "payment":
        return "text-green-600 bg-green-50";
      case "job":
        return "text-purple-600 bg-purple-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  const filteredNotifications = notifications.filter((notification) => {
    if (filter === "unread") return !notification.isRead;
    if (filter === "read") return notification.isRead;
    return true;
  });

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMinutes = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60)
    );

    if (diffInMinutes < 60) {
      return `${diffInMinutes} phút trước`;
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)} giờ trước`;
    } else {
      return `${Math.floor(diffInMinutes / 1440)} ngày trước`;
    }
  };

  const handleSettingToggle = (setting: string) => {
    setNotificationSettings((prev) => ({
      ...prev,
      [setting]: !prev[setting as keyof typeof prev],
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Thông báo</h1>
          {unreadCount > 0 && (
            <p className="text-sm text-gray-600 mt-1">
              Bạn có {unreadCount} thông báo chưa đọc
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Notifications List */}
        <div className="lg:col-span-3 space-y-4">
          {/* Filter Tabs */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex space-x-4">
              <button
                onClick={() => setFilter("all")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filter === "all"
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                }`}
              >
                Tất cả ({notifications.length})
              </button>
              <button
                onClick={() => setFilter("unread")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filter === "unread"
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                }`}
              >
                Chưa đọc ({unreadCount})
              </button>
              <button
                onClick={() => setFilter("read")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filter === "read"
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                }`}
              >
                Đã đọc ({notifications.length - unreadCount})
              </button>
            </div>
          </div>

          {/* Notifications */}
          <div className="space-y-2">
            {filteredNotifications.map((notification) => {
              const Icon = getNotificationIcon(notification.type);
              const colorClass = getNotificationColor(
                notification.type,
                notification.priority
              );

              return (
                <div
                  key={notification.id}
                  className={`bg-white rounded-lg shadow-sm border border-gray-200 p-4 transition-colors hover:bg-gray-50 ${
                    !notification.isRead ? "border-l-4 border-l-blue-500" : ""
                  }`}
                >
                  <div className="flex items-start space-x-4">
                    <div className={`p-2 rounded-lg ${colorClass}`}>
                      <Icon size={20} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3
                          className={`text-sm font-medium ${
                            !notification.isRead
                              ? "text-gray-900"
                              : "text-gray-700"
                          }`}
                        >
                          {notification.title}
                        </h3>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs text-gray-500">
                            {formatTimestamp(notification.timestamp)}
                          </span>
                          {!notification.isRead && (
                            <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                          )}
                        </div>
                      </div>
                      <p
                        className={`text-sm ${
                          !notification.isRead
                            ? "text-gray-700"
                            : "text-gray-600"
                        }`}
                      >
                        {notification.message}
                      </p>
                      {!notification.isRead && (
                        <button className="mt-2 text-xs text-blue-600 hover:text-blue-700">
                          Đánh dấu đã đọc
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}

            {filteredNotifications.length === 0 && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
                <BellOff size={48} className="text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {filter === "unread"
                    ? "Không có thông báo chưa đọc"
                    : "Không có thông báo"}
                </h3>
                <p className="text-gray-600">
                  {filter === "unread"
                    ? "Tất cả thông báo đã được đọc"
                    : "Chưa có thông báo nào được gửi đến bạn"}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Settings Sidebar */}
        <div className="space-y-4">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-2 mb-4">
              <Settings size={20} className="text-gray-600" />
              <h3 className="text-lg font-semibold text-gray-900">
                Cài đặt thông báo
              </h3>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    Công việc mới
                  </p>
                  <p className="text-xs text-gray-600">
                    Thông báo khi có việc phù hợp
                  </p>
                </div>
                <button
                  onClick={() => handleSettingToggle("newJobs")}
                  className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    notificationSettings.newJobs ? "bg-blue-600" : "bg-gray-200"
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                      notificationSettings.newJobs
                        ? "translate-x-5"
                        : "translate-x-0"
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    Nhắc lịch làm việc
                  </p>
                  <p className="text-xs text-gray-600">
                    Nhắc nhở trước ca làm việc
                  </p>
                </div>
                <button
                  onClick={() => handleSettingToggle("scheduleReminders")}
                  className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    notificationSettings.scheduleReminders
                      ? "bg-blue-600"
                      : "bg-gray-200"
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                      notificationSettings.scheduleReminders
                        ? "translate-x-5"
                        : "translate-x-0"
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    Thanh toán
                  </p>
                  <p className="text-xs text-gray-600">
                    Cập nhật về lương và thanh toán
                  </p>
                </div>
                <button
                  onClick={() => handleSettingToggle("paymentUpdates")}
                  className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    notificationSettings.paymentUpdates
                      ? "bg-blue-600"
                      : "bg-gray-200"
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                      notificationSettings.paymentUpdates
                        ? "translate-x-5"
                        : "translate-x-0"
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    Cập nhật hệ thống
                  </p>
                  <p className="text-xs text-gray-600">Thông báo từ hệ thống</p>
                </div>
                <button
                  onClick={() => handleSettingToggle("systemUpdates")}
                  className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    notificationSettings.systemUpdates
                      ? "bg-blue-600"
                      : "bg-gray-200"
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                      notificationSettings.systemUpdates
                        ? "translate-x-5"
                        : "translate-x-0"
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">
              Tùy chọn nhanh
            </h3>
            <div className="space-y-2">
              <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                Đánh dấu tất cả đã đọc
              </button>
              <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                Xóa thông báo đã đọc
              </button>
              <button className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                Xóa tất cả thông báo
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
