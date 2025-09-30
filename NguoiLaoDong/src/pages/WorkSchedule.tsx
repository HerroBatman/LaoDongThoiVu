import React, { useState, useEffect } from "react";
import {
  Calendar,
  List,
  MapPin,
  Clock,
  CheckCircle,
  PlayCircle,
  AlertCircle,
  Bell,
  X,
  DollarSign,
} from "lucide-react";

const WorkSchedule = () => {
  const [viewMode, setViewMode] = useState<"calendar" | "list">("calendar");
  const [showReminder, setShowReminder] = useState(false);
  const [upcomingShift, setUpcomingShift] = useState<any>(null);

  const workSchedule = [
    {
      id: 1,
      title: "Nhân viên phục vụ",
      company: "Highlands Coffee",
      location: "Quận 1, TP.HCM",
      startTime: "08:00",
      endTime: "17:00",
      date: "2024-01-15",
      salary: "150,000đ",
      status: "upcoming",
    },
    {
      id: 2,
      title: "Công nhân bốc vác",
      company: "Viettel Post",
      location: "Quận 7, TP.HCM",
      startTime: "06:00",
      endTime: "14:00",
      date: "2024-01-16",
      salary: "200,000đ",
      status: "upcoming",
    },
    {
      id: 3,
      title: "Nhân viên bán hàng",
      company: "Saigon Co.op",
      location: "Quận 3, TP.HCM",
      startTime: "09:00",
      endTime: "18:00",
      date: "2024-01-17",
      salary: "180,000đ",
      status: "in-progress",
    },
    {
      id: 4,
      title: "Shipper giao đồ ăn",
      company: "GrabFood",
      location: "Quận 5, TP.HCM",
      startTime: "11:00",
      endTime: "14:00",
      date: "2024-01-13",
      salary: "180,000đ",
      status: "completed",
    },
    {
      id: 5,
      title: "Nhân viên dọn vệ sinh",
      company: "Clean Pro",
      location: "Quận 1, TP.HCM",
      startTime: "18:00",
      endTime: "22:00",
      date: "2024-01-18",
      salary: "120,000đ",
      status: "upcoming",
    },
  ];

  // Simulate reminder popup for upcoming shifts
  useEffect(() => {
    const checkUpcomingShifts = () => {
      const now = new Date();
      const upcomingShifts = workSchedule.filter((shift) => {
        if (shift.status !== "upcoming") return false;

        const shiftDate = new Date(shift.date);
        const [hours, minutes] = shift.startTime.split(":").map(Number);
        shiftDate.setHours(hours, minutes, 0, 0);

        // Show reminder 2 hours before shift
        const reminderTime = new Date(shiftDate.getTime() - 2 * 60 * 60 * 1000);

        return now >= reminderTime && now < shiftDate;
      });

      if (upcomingShifts.length > 0 && !showReminder) {
        setUpcomingShift(upcomingShifts[0]);
        setShowReminder(true);
      }
    };

    // Check every minute
    const interval = setInterval(checkUpcomingShifts, 60000);
    checkUpcomingShifts(); // Check immediately

    return () => clearInterval(interval);
  }, [showReminder]);

  const getStatusConfig = (status: string) => {
    switch (status) {
      case "upcoming":
        return {
          icon: Clock,
          color: "text-blue-600",
          bgColor: "bg-blue-50",
          text: "Sắp tới",
          borderColor: "border-blue-200",
        };
      case "in-progress":
        return {
          icon: PlayCircle,
          color: "text-green-600",
          bgColor: "bg-green-50",
          text: "Đang làm",
          borderColor: "border-green-200",
        };
      case "completed":
        return {
          icon: CheckCircle,
          color: "text-gray-600",
          bgColor: "bg-gray-50",
          text: "Hoàn thành",
          borderColor: "border-gray-200",
        };
      default:
        return {
          icon: AlertCircle,
          color: "text-gray-600",
          bgColor: "bg-gray-50",
          text: "Không xác định",
          borderColor: "border-gray-200",
        };
    }
  };

  const upcomingShifts = workSchedule.filter(
    (shift) => shift.status === "upcoming"
  );
  const todayShifts = workSchedule.filter((shift) => {
    const today = new Date().toISOString().split("T")[0];
    return shift.date === today;
  });

  const handleCheckIn = (shiftId: number) => {
    // Handle check-in logic
    console.log("Check-in for shift:", shiftId);
  };

  const handleCheckOut = (shiftId: number) => {
    // Handle check-out logic
    console.log("Check-out for shift:", shiftId);
  };

  const ReminderPopup = () => {
    if (!showReminder || !upcomingShift) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 animate-pulse">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-amber-100 rounded-full">
                <Bell size={24} className="text-amber-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">
                Nhắc nhở ca làm việc
              </h3>
            </div>
            <button
              onClick={() => setShowReminder(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X size={20} />
            </button>
          </div>

          <div className="space-y-3 mb-6">
            <p className="text-gray-700">
              <strong>Bạn có ca làm việc sắp bắt đầu trong 2 giờ nữa!</strong>
            </p>
            <div className="bg-gray-50 rounded-lg p-4 space-y-2">
              <h4 className="font-medium text-gray-900">
                {upcomingShift.title}
              </h4>
              <p className="text-sm text-gray-600">{upcomingShift.company}</p>
              <div className="flex items-center text-sm text-gray-600">
                <MapPin size={16} className="mr-2" />
                {upcomingShift.location}
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Clock size={16} className="mr-2" />
                {upcomingShift.startTime} - {upcomingShift.endTime}
              </div>
              <div className="flex items-center text-sm font-medium text-green-600">
                <DollarSign size={16} className="mr-2" />
                {upcomingShift.salary}
              </div>
            </div>
          </div>

          <div className="flex space-x-3">
            <button
              onClick={() => setShowReminder(false)}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Để sau
            </button>
            <button
              onClick={() => {
                setShowReminder(false);
                // Navigate to shift details or preparation
              }}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Chuẩn bị ngay
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Lịch làm việc</h1>
        <div className="flex bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setViewMode("calendar")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              viewMode === "calendar"
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <Calendar size={16} className="inline mr-2" />
            Lịch
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              viewMode === "list"
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <List size={16} className="inline mr-2" />
            Danh sách ca
          </button>
        </div>
      </div>

      {/* Today's Shifts Quick View */}
      {todayShifts.length > 0 && (
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-4 border border-blue-200">
          <div className="flex items-center space-x-3 mb-3">
            <Clock size={20} className="text-blue-600" />
            <h3 className="font-semibold text-blue-900">Ca làm việc hôm nay</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {todayShifts.map((shift) => (
              <div key={shift.id} className="bg-white rounded-lg p-3 shadow-sm">
                <h4 className="font-medium text-gray-900 text-sm">
                  {shift.title}
                </h4>
                <p className="text-xs text-gray-600">{shift.company}</p>
                <p className="text-xs text-blue-600 font-medium">
                  {shift.startTime} - {shift.endTime}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Reminder Notification */}
      {upcomingShifts.length > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <AlertCircle size={20} className="text-amber-600" />
            <div>
              <h3 className="font-medium text-amber-800">
                Nhắc nhở ca làm việc
              </h3>
              <p className="text-sm text-amber-700 mt-1">
                Bạn có {upcomingShifts.length} ca làm việc sắp tới. Nhớ chuẩn bị
                và đến đúng giờ nhé!
              </p>
            </div>
          </div>
        </div>
      )}

      {viewMode === "calendar" ? (
        /* Calendar View */
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">
                Tháng 1, 2024
              </h2>
              <div className="flex space-x-2">
                <button className="px-3 py-1 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors">
                  ← Trước
                </button>
                <button className="px-3 py-1 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors">
                  Sau →
                </button>
              </div>
            </div>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-7 gap-2 mb-4">
              {["CN", "T2", "T3", "T4", "T5", "T6", "T7"].map((day) => (
                <div
                  key={day}
                  className="text-center text-sm font-medium text-gray-500 py-2"
                >
                  {day}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-2">
              {Array.from({ length: 35 }, (_, i) => {
                const dayNumber = i - 6 + 1;
                const isCurrentMonth = dayNumber > 0 && dayNumber <= 31;
                const dayShifts = workSchedule.filter((shift) => {
                  const shiftDay = new Date(shift.date).getDate();
                  return shiftDay === dayNumber && isCurrentMonth;
                });

                return (
                  <div
                    key={i}
                    className={`min-h-20 border border-gray-200 rounded p-1 ${
                      isCurrentMonth
                        ? "bg-white hover:bg-gray-50"
                        : "bg-gray-50"
                    } ${
                      dayShifts.length > 0 ? "bg-blue-50 border-blue-200" : ""
                    } transition-colors cursor-pointer`}
                  >
                    {isCurrentMonth && (
                      <>
                        <div className="text-sm font-medium text-gray-900 mb-1">
                          {dayNumber}
                        </div>
                        {dayShifts.map((shift, index) => (
                          <div key={index} className="text-xs mb-1">
                            <div
                              className={`px-1 py-0.5 rounded text-white text-center ${
                                shift.status === "upcoming"
                                  ? "bg-blue-500"
                                  : shift.status === "in-progress"
                                  ? "bg-green-500"
                                  : "bg-gray-500"
                              }`}
                            >
                              {shift.startTime}
                            </div>
                          </div>
                        ))}
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        /* List View */
        <div className="space-y-4">
          {workSchedule.map((shift) => {
            const statusConfig = getStatusConfig(shift.status);
            return (
              <div
                key={shift.id}
                className={`bg-white rounded-lg shadow-sm border ${statusConfig.borderColor} p-6 hover:shadow-md transition-shadow`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <statusConfig.icon
                      size={20}
                      className={statusConfig.color}
                    />
                    <span
                      className={`text-sm font-medium px-2 py-1 rounded-full ${statusConfig.color} ${statusConfig.bgColor}`}
                    >
                      {statusConfig.text}
                    </span>
                  </div>
                  <span className="text-sm text-gray-500">
                    {new Date(shift.date).toLocaleDateString("vi-VN")}
                  </span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
                  <div className="lg:col-span-2">
                    <h3 className="font-semibold text-gray-900 text-lg mb-1">
                      {shift.title}
                    </h3>
                    <p className="text-gray-600 mb-3">{shift.company}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin size={16} className="mr-2 text-gray-400" />
                        {shift.location}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Clock size={16} className="mr-2 text-gray-400" />
                        {shift.startTime} - {shift.endTime}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col justify-between">
                    <div className="text-right mb-3">
                      <p className="text-lg font-semibold text-green-600">
                        {shift.salary}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      {shift.status === "upcoming" && (
                        <>
                          <button
                            onClick={() => handleCheckIn(shift.id)}
                            className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
                          >
                            Check-in
                          </button>
                          <button className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                            Chi tiết
                          </button>
                        </>
                      )}
                      {shift.status === "in-progress" && (
                        <>
                          <button
                            onClick={() => handleCheckOut(shift.id)}
                            className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
                          >
                            Check-out
                          </button>
                          <button className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                            Tạm nghỉ
                          </button>
                        </>
                      )}
                      {shift.status === "completed" && (
                        <button className="w-full border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                          Xem chi tiết
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Reminder Popup */}
      <ReminderPopup />
    </div>
  );
};

export default WorkSchedule;
