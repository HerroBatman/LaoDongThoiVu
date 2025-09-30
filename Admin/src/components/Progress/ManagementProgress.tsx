import React, { useState } from "react";
import {
  Search,
  Filter,
  Calendar,
  MapPin,
  User,
  AlertTriangle,
  CheckCircle,
  Clock,
  Send,
} from "lucide-react";

export default function ProgressManagement() {
  const [selectedDate, setSelectedDate] = useState("2024-03-15");
  const [locationFilter, setLocationFilter] = useState("all");
  const [employerFilter, setEmployerFilter] = useState("all");

  const workShifts = [
    {
      id: 1,
      jobTitle: "Phụ bếp nhà hàng ABC",
      employer: "Nhà hàng ABC",
      location: "Quận 1, TP.HCM",
      shift: "08:00 - 17:00",
      workers: [
        {
          id: 1,
          name: "Nguyễn Văn An",
          status: "checked-in",
          checkinTime: "07:55",
          checkoutTime: null,
        },
        {
          id: 2,
          name: "Trần Thị Bình",
          status: "checked-out",
          checkinTime: "08:02",
          checkoutTime: "17:05",
        },
        {
          id: 3,
          name: "Lê Văn Cường",
          status: "not-arrived",
          checkinTime: null,
          checkoutTime: null,
        },
        {
          id: 4,
          name: "Phạm Thị Dung",
          status: "checked-in",
          checkinTime: "08:10",
          checkoutTime: null,
        },
        {
          id: 5,
          name: "Hoàng Văn Em",
          status: "checked-in",
          checkinTime: "07:58",
          checkoutTime: null,
        },
      ],
    },
    {
      id: 2,
      jobTitle: "Bốc vác kho hàng",
      employer: "Công ty Logistics XYZ",
      location: "Quận 7, TP.HCM",
      shift: "06:00 - 14:00",
      workers: [
        {
          id: 6,
          name: "Võ Văn Phúc",
          status: "checked-out",
          checkinTime: "05:55",
          checkoutTime: "14:02",
        },
        {
          id: 7,
          name: "Đặng Thị Giang",
          status: "checked-out",
          checkinTime: "06:05",
          checkoutTime: "14:10",
        },
        {
          id: 8,
          name: "Bùi Văn Hải",
          status: "not-arrived",
          checkinTime: null,
          checkoutTime: null,
        },
      ],
    },
  ];

  const getWorkerStatusBadge = (status: string) => {
    switch (status) {
      case "checked-in":
        return (
          <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
            <CheckCircle size={12} className="mr-1" />
            Đã check-in
          </span>
        );
      case "checked-out":
        return (
          <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
            <CheckCircle size={12} className="mr-1" />
            Đã check-out
          </span>
        );
      case "not-arrived":
        return (
          <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full">
            <AlertTriangle size={12} className="mr-1" />
            Chưa đến
          </span>
        );
      default:
        return null;
    }
  };

  const getShiftStatus = (workers: any[]) => {
    const checkedIn = workers.filter((w) => w.status === "checked-in").length;
    const checkedOut = workers.filter((w) => w.status === "checked-out").length;
    const notArrived = workers.filter((w) => w.status === "not-arrived").length;

    if (notArrived > 0) {
      return {
        status: "warning",
        text: `${notArrived} người chưa đến`,
        color: "text-red-600",
      };
    } else if (checkedIn > 0) {
      return {
        status: "active",
        text: `${checkedIn} người đang làm`,
        color: "text-blue-600",
      };
    } else {
      return {
        status: "completed",
        text: "Ca làm hoàn thành",
        color: "text-green-600",
      };
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">
          Quản lý tiến độ lao động
        </h1>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm text-gray-600">Cập nhật real-time</span>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ngày
            </label>
            <div className="relative">
              <Calendar
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={16}
              />
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Khu vực
            </label>
            <select
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
            >
              <option value="all">Tất cả khu vực</option>
              <option value="q1">Quận 1</option>
              <option value="q7">Quận 7</option>
              <option value="q2">Quận 2</option>
              <option value="q3">Quận 3</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nhà tuyển dụng
            </label>
            <select
              value={employerFilter}
              onChange={(e) => setEmployerFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
            >
              <option value="all">Tất cả NTD</option>
              <option value="abc">Nhà hàng ABC</option>
              <option value="xyz">Công ty Logistics XYZ</option>
            </select>
          </div>

          <div className="flex items-end">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors w-full">
              Lọc kết quả
            </button>
          </div>
        </div>
      </div>

      {/* Work Shifts */}
      <div className="space-y-6">
        {workShifts.map((shift) => {
          const shiftStatus = getShiftStatus(shift.workers);

          return (
            <div
              key={shift.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200"
            >
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {shift.jobTitle}
                    </h3>
                    <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                      <div className="flex items-center">
                        <User size={16} className="mr-1" />
                        {shift.employer}
                      </div>
                      <div className="flex items-center">
                        <MapPin size={16} className="mr-1" />
                        {shift.location}
                      </div>
                      <div className="flex items-center">
                        <Clock size={16} className="mr-1" />
                        {shift.shift}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-sm font-medium ${shiftStatus.color}`}>
                      {shiftStatus.text}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {shift.workers.length} lao động
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-2 text-sm font-medium text-gray-700">
                          Lao động
                        </th>
                        <th className="text-left py-2 text-sm font-medium text-gray-700">
                          Trạng thái
                        </th>
                        <th className="text-left py-2 text-sm font-medium text-gray-700">
                          Check-in
                        </th>
                        <th className="text-left py-2 text-sm font-medium text-gray-700">
                          Check-out
                        </th>
                        <th className="text-left py-2 text-sm font-medium text-gray-700">
                          Hành động
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {shift.workers.map((worker) => (
                        <tr key={worker.id} className="hover:bg-gray-50">
                          <td className="py-3">
                            <div className="text-sm font-medium text-gray-900">
                              {worker.name}
                            </div>
                            <div className="text-xs text-gray-500">
                              ID: #{worker.id}
                            </div>
                          </td>
                          <td className="py-3">
                            {getWorkerStatusBadge(worker.status)}
                          </td>
                          <td className="py-3 text-sm text-gray-900">
                            {worker.checkinTime || "-"}
                          </td>
                          <td className="py-3 text-sm text-gray-900">
                            {worker.checkoutTime || "-"}
                          </td>
                          <td className="py-3">
                            <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                              Liên hệ
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200 flex items-center justify-between">
                  <div className="text-sm text-gray-600">
                    Cập nhật lần cuối: {new Date().toLocaleTimeString("vi-VN")}
                  </div>
                  <button className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors">
                    <Send size={16} className="mr-2" />
                    Can thiệp
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Summary Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-600">Đang làm việc</p>
              <p className="text-2xl font-bold text-blue-900">127</p>
            </div>
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
              <CheckCircle size={16} className="text-white" />
            </div>
          </div>
        </div>

        <div className="bg-green-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-600">Hoàn thành</p>
              <p className="text-2xl font-bold text-green-900">89</p>
            </div>
            <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
              <CheckCircle size={16} className="text-white" />
            </div>
          </div>
        </div>

        <div className="bg-red-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-red-600">Chưa đến</p>
              <p className="text-2xl font-bold text-red-900">8</p>
            </div>
            <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center">
              <AlertTriangle size={16} className="text-white" />
            </div>
          </div>
        </div>

        <div className="bg-yellow-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-yellow-600">
                Cần can thiệp
              </p>
              <p className="text-2xl font-bold text-yellow-900">3</p>
            </div>
            <div className="w-8 h-8 bg-yellow-500 rounded-lg flex items-center justify-center">
              <AlertTriangle size={16} className="text-white" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
