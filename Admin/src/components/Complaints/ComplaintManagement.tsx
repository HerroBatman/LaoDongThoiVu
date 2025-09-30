import React, { useState } from "react";
import {
  Search,
  Filter,
  Eye,
  MessageSquare,
  CheckCircle,
  Clock,
  AlertTriangle,
  User,
  Building2,
  FileText,
  Phone,
} from "lucide-react";

export default function ComplaintManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");

  const complaints = [
    {
      id: 1,
      ticketNumber: "KN001",
      title: "Không được trả lương đúng hạn",
      complainant: "Nguyễn Văn An",
      complainantType: "worker",
      respondent: "Nhà hàng ABC",
      priority: "high",
      status: "pending",
      createdDate: "2024-03-15",
      description:
        "Đã hoàn thành công việc từ ngày 10/3 nhưng đến nay chưa được trả lương.",
      evidence: ["evidence1.jpg", "contract.pdf"],
    },
    {
      id: 2,
      ticketNumber: "KN002",
      title: "Lao động không đến làm việc",
      complainant: "Công ty Logistics XYZ",
      complainantType: "employer",
      respondent: "Trần Thị Bình",
      priority: "medium",
      status: "processing",
      createdDate: "2024-03-14",
      description:
        "Lao động đã xác nhận tham gia nhưng không đến làm việc vào ngày hẹn.",
      evidence: ["screenshot.png"],
    },
    {
      id: 3,
      ticketNumber: "KN003",
      title: "Điều kiện làm việc không đúng mô tả",
      complainant: "Lê Văn Cường",
      complainantType: "worker",
      respondent: "Công ty Xây dựng DEF",
      priority: "high",
      status: "resolved",
      createdDate: "2024-03-12",
      description:
        "Công việc thực tế khác xa so với mô tả ban đầu, không có đồ bảo hộ.",
      evidence: ["photo1.jpg", "photo2.jpg", "video.mp4"],
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">
            Chờ xử lý
          </span>
        );
      case "processing":
        return (
          <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
            Đang xử lý
          </span>
        );
      case "resolved":
        return (
          <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
            Đã xử lý
          </span>
        );
      default:
        return null;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return (
          <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full">
            Cao
          </span>
        );
      case "medium":
        return (
          <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">
            Trung bình
          </span>
        );
      case "low":
        return (
          <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
            Thấp
          </span>
        );
      default:
        return null;
    }
  };

  const getComplainantIcon = (type: string) => {
    return type === "worker" ? (
      <User size={16} className="text-blue-500" />
    ) : (
      <Building2 size={16} className="text-green-500" />
    );
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Xử lý khiếu nại</h1>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
          <span className="text-sm text-gray-600">3 khiếu nại khẩn cấp</span>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Tìm kiếm khiếu nại..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">Tất cả trạng thái</option>
            <option value="pending">Chờ xử lý</option>
            <option value="processing">Đang xử lý</option>
            <option value="resolved">Đã xử lý</option>
          </select>

          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">Tất cả mức độ</option>
            <option value="high">Cao</option>
            <option value="medium">Trung bình</option>
            <option value="low">Thấp</option>
          </select>

          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            Lọc kết quả
          </button>
        </div>
      </div>

      {/* Complaints List */}
      <div className="space-y-4">
        {complaints.map((complaint) => (
          <div
            key={complaint.id}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {complaint.title}
                  </h3>
                  {getPriorityBadge(complaint.priority)}
                  {getStatusBadge(complaint.status)}
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <span className="font-medium">#{complaint.ticketNumber}</span>
                  <span>{complaint.createdDate}</span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                  <Eye size={16} />
                </button>
                <button className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                  <MessageSquare size={16} />
                </button>
                <button className="p-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors">
                  <Phone size={16} />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">
                  Người khiếu nại
                </h4>
                <div className="flex items-center space-x-2">
                  {getComplainantIcon(complaint.complainantType)}
                  <span className="text-sm text-gray-900">
                    {complaint.complainant}
                  </span>
                  <span className="text-xs text-gray-500">
                    (
                    {complaint.complainantType === "worker"
                      ? "Lao động"
                      : "Nhà tuyển dụng"}
                    )
                  </span>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">
                  Bên liên quan
                </h4>
                <div className="flex items-center space-x-2">
                  {getComplainantIcon(
                    complaint.complainantType === "worker"
                      ? "employer"
                      : "worker"
                  )}
                  <span className="text-sm text-gray-900">
                    {complaint.respondent}
                  </span>
                </div>
              </div>
            </div>

            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Mô tả</h4>
              <p className="text-sm text-gray-600 bg-gray-50 rounded-lg p-3">
                {complaint.description}
              </p>
            </div>

            {complaint.evidence.length > 0 && (
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">
                  Bằng chứng ({complaint.evidence.length})
                </h4>
                <div className="flex items-center space-x-2">
                  {complaint.evidence.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-1 bg-gray-100 rounded-lg px-3 py-1"
                    >
                      <FileText size={14} className="text-gray-500" />
                      <span className="text-xs text-gray-600">{file}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <div className="text-sm text-gray-500">
                Cập nhật lần cuối: {complaint.createdDate}
              </div>
              <div className="flex items-center space-x-2">
                {complaint.status === "pending" && (
                  <>
                    <button className="px-3 py-1 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                      Tiếp nhận
                    </button>
                    <button className="px-3 py-1 text-sm font-medium text-green-600 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                      Liên hệ 2 bên
                    </button>
                  </>
                )}
                {complaint.status === "processing" && (
                  <button className="px-3 py-1 text-sm font-medium text-purple-600 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
                    Ra quyết định
                  </button>
                )}
                {complaint.status === "resolved" && (
                  <span className="px-3 py-1 text-sm font-medium text-green-600 bg-green-50 rounded-lg">
                    Đã hoàn thành
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Summary Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-yellow-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-yellow-600">Chờ xử lý</p>
              <p className="text-2xl font-bold text-yellow-900">23</p>
            </div>
            <div className="w-8 h-8 bg-yellow-500 rounded-lg flex items-center justify-center">
              <Clock size={16} className="text-white" />
            </div>
          </div>
        </div>

        <div className="bg-blue-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-600">Đang xử lý</p>
              <p className="text-2xl font-bold text-blue-900">15</p>
            </div>
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
              <MessageSquare size={16} className="text-white" />
            </div>
          </div>
        </div>

        <div className="bg-green-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-600">Đã xử lý</p>
              <p className="text-2xl font-bold text-green-900">156</p>
            </div>
            <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
              <CheckCircle size={16} className="text-white" />
            </div>
          </div>
        </div>

        <div className="bg-red-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-red-600">Khẩn cấp</p>
              <p className="text-2xl font-bold text-red-900">3</p>
            </div>
            <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center">
              <AlertTriangle size={16} className="text-white" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
