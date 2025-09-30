import React, { useState } from "react";
import {
  HelpCircle,
  MessageSquare,
  Camera,
  Send,
  Clock,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

const Support = () => {
  const [activeTab, setActiveTab] = useState<"faq" | "complaint" | "tickets">(
    "faq"
  );
  const [complaintForm, setComplaintForm] = useState({
    title: "",
    category: "",
    description: "",
    priority: "medium",
  });

  const faqs = [
    {
      question: "Khi nào tôi sẽ nhận được lương?",
      answer:
        "Lương sẽ được thanh toán trong vòng 24-48 giờ sau khi hoàn thành ca làm việc và được nhà tuyển dụng xác nhận.",
    },
    {
      question: "Làm thế nào để check-in ca làm việc?",
      answer:
        'Bạn có thể check-in bằng cách vào mục "Lịch làm việc" và nhấn nút "Check-in" khi đến nơi làm việc. Hệ thống sẽ xác minh vị trí của bạn.',
    },
    {
      question: "Tôi có thể hủy ca làm việc đã đăng ký không?",
      answer:
        "Bạn có thể hủy ca làm việc trước 2 giờ bắt đầu mà không bị phạt. Việc hủy muộn có thể ảnh hưởng đến điểm uy tín của bạn.",
    },
    {
      question: "Làm sao để tăng điểm uy tín?",
      answer:
        "Điểm uy tín tăng khi bạn: đến đúng giờ, hoàn thành công việc tốt, nhận được đánh giá tích cực từ nhà tuyển dụng.",
    },
    {
      question: "Tôi không nhận được thông báo việc làm mới?",
      answer:
        'Vào "Cài đặt thông báo" để kiểm tra và bật thông báo. Đảm bảo hồ sơ năng lực của bạn đã hoàn thiện để nhận được gợi ý phù hợp.',
    },
    {
      question: "Làm thế nào để liên hệ với nhà tuyển dụng?",
      answer:
        "Bạn có thể liên hệ qua chatbot AI hoặc thông tin liên hệ trong chi tiết công việc. Hệ thống sẽ hỗ trợ kết nối với nhà tuyển dụng.",
    },
  ];

  const supportTickets = [
    {
      id: "TK001",
      title: "Không nhận được lương từ ABC Company",
      category: "Thanh toán",
      status: "processing",
      priority: "high",
      createdAt: "2024-01-14",
      lastUpdate: "2024-01-15",
    },
    {
      id: "TK002",
      title: "Lỗi check-in tại Highlands Coffee",
      category: "Kỹ thuật",
      status: "resolved",
      priority: "medium",
      createdAt: "2024-01-12",
      lastUpdate: "2024-01-13",
    },
    {
      id: "TK003",
      title: "Cập nhật thông tin hồ sơ",
      category: "Tài khoản",
      status: "pending",
      priority: "low",
      createdAt: "2024-01-10",
      lastUpdate: "2024-01-10",
    },
  ];

  const getStatusConfig = (status: string) => {
    switch (status) {
      case "pending":
        return {
          text: "Chờ xử lý",
          color: "text-yellow-600",
          bgColor: "bg-yellow-100",
          icon: Clock,
        };
      case "processing":
        return {
          text: "Đang xử lý",
          color: "text-blue-600",
          bgColor: "bg-blue-100",
          icon: AlertCircle,
        };
      case "resolved":
        return {
          text: "Đã xử lý",
          color: "text-green-600",
          bgColor: "bg-green-100",
          icon: CheckCircle,
        };
      default:
        return {
          text: "Không xác định",
          color: "text-gray-600",
          bgColor: "bg-gray-100",
          icon: HelpCircle,
        };
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-red-600";
      case "medium":
        return "text-yellow-600";
      case "low":
        return "text-green-600";
      default:
        return "text-gray-600";
    }
  };

  const handleComplaintSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle complaint submission
    console.log("Complaint submitted:", complaintForm);
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setComplaintForm({
      ...complaintForm,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Hỗ trợ & Khiếu nại</h1>
      </div>

      {/* Tab Navigation */}
      <div className="flex bg-gray-100 rounded-lg p-1">
        <button
          onClick={() => setActiveTab("faq")}
          className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            activeTab === "faq"
              ? "bg-white text-gray-900 shadow-sm"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          <HelpCircle size={16} className="inline mr-2" />
          Câu hỏi thường gặp
        </button>
        <button
          onClick={() => setActiveTab("complaint")}
          className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            activeTab === "complaint"
              ? "bg-white text-gray-900 shadow-sm"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          <MessageSquare size={16} className="inline mr-2" />
          Gửi khiếu nại
        </button>
        <button
          onClick={() => setActiveTab("tickets")}
          className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            activeTab === "tickets"
              ? "bg-white text-gray-900 shadow-sm"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          <AlertCircle size={16} className="inline mr-2" />
          Ticket của tôi
        </button>
      </div>

      {activeTab === "faq" && (
        <div className="space-y-4">
          {/* AI Chatbot Section */}
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-6 border border-blue-200">
            <div className="flex items-center space-x-3 mb-4">
              <MessageSquare size={24} className="text-blue-600" />
              <h3 className="text-lg font-semibold text-blue-900">
                AI Trợ lý hỗ trợ
              </h3>
            </div>
            <p className="text-blue-800 mb-4">
              Tôi có thể giúp bạn giải đáp các câu hỏi về việc làm, lương bổng,
              và cách sử dụng ứng dụng.
            </p>
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="Hỏi tôi bất cứ điều gì..."
                className="flex-1 px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/70"
              />
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <Send size={16} />
              </button>
            </div>
            <div className="flex flex-wrap gap-2 mt-3">
              {[
                "Khi nào nhận lương?",
                "Cách check-in ca làm?",
                "Tăng điểm uy tín?",
              ].map((suggestion, index) => (
                <button
                  key={index}
                  className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full hover:bg-blue-200 transition-colors"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>

          {/* FAQ List */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">
                Câu hỏi thường gặp
              </h2>
            </div>
            <div className="divide-y divide-gray-200">
              {faqs.map((faq, index) => (
                <details key={index} className="group">
                  <summary className="px-6 py-4 cursor-pointer hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-gray-900">
                        {faq.question}
                      </h3>
                      <div className="transform transition-transform group-open:rotate-180">
                        <svg
                          className="w-5 h-5 text-gray-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </div>
                    </div>
                  </summary>
                  <div className="px-6 pb-4">
                    <p className="text-gray-700 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === "complaint" && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              Gửi khiếu nại
            </h2>
            <p className="text-sm text-gray-600">
              Vui lòng mô tả chi tiết vấn đề của bạn. Chúng tôi sẽ xử lý trong
              vòng 24-48 giờ.
            </p>
          </div>

          <form onSubmit={handleComplaintSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tiêu đề khiếu nại *
              </label>
              <input
                type="text"
                name="title"
                value={complaintForm.title}
                onChange={handleInputChange}
                placeholder="Mô tả ngắn gọn vấn đề của bạn"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Danh mục *
                </label>
                <select
                  name="category"
                  value={complaintForm.category}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">Chọn danh mục</option>
                  <option value="payment">Vấn đề thanh toán</option>
                  <option value="employer">Vấn đề với nhà tuyển dụng</option>
                  <option value="technical">Lỗi kỹ thuật</option>
                  <option value="account">Vấn đề tài khoản</option>
                  <option value="other">Khác</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mức độ ưu tiên
                </label>
                <select
                  name="priority"
                  value={complaintForm.priority}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="low">Thấp</option>
                  <option value="medium">Trung bình</option>
                  <option value="high">Cao</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mô tả chi tiết *
              </label>
              <textarea
                name="description"
                value={complaintForm.description}
                onChange={handleInputChange}
                rows={6}
                placeholder="Vui lòng mô tả chi tiết vấn đề, bao gồm thời gian, địa điểm, và các thông tin liên quan khác..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Đính kèm ảnh chứng minh (tùy chọn)
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors cursor-pointer">
                <Camera className="mx-auto h-12 w-12 text-gray-400 mb-2" />
                <p className="text-sm text-gray-600">
                  Kéo thả ảnh hoặc{" "}
                  <span className="text-blue-600 font-medium">chọn file</span>
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  PNG, JPG (Max: 5MB mỗi ảnh)
                </p>
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Hủy bỏ
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Gửi khiếu nại
              </button>
            </div>
          </form>
        </div>
      )}

      {activeTab === "tickets" && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              Ticket hỗ trợ của tôi
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Theo dõi trạng thái xử lý các khiếu nại của bạn
            </p>
          </div>
          <div className="divide-y divide-gray-200">
            {supportTickets.map((ticket) => {
              const statusConfig = getStatusConfig(ticket.status);
              return (
                <div
                  key={ticket.id}
                  className="p-6 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="font-semibold text-gray-900">
                          {ticket.title}
                        </h3>
                        <span className="text-xs text-gray-500">
                          #{ticket.id}
                        </span>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span>{ticket.category}</span>
                        <span
                          className={`font-medium ${getPriorityColor(
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
                    </div>
                    <div className="flex items-center space-x-2">
                      <statusConfig.icon
                        size={16}
                        className={statusConfig.color}
                      />
                      <span
                        className={`text-xs px-2 py-1 rounded-full font-medium ${statusConfig.color} ${statusConfig.bgColor}`}
                      >
                        {statusConfig.text}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>
                      Tạo:{" "}
                      {new Date(ticket.createdAt).toLocaleDateString("vi-VN")}
                    </span>
                    <span>
                      Cập nhật:{" "}
                      {new Date(ticket.lastUpdate).toLocaleDateString("vi-VN")}
                    </span>
                  </div>
                </div>
              );
            })}

            {supportTickets.length === 0 && (
              <div className="p-8 text-center">
                <HelpCircle size={48} className="text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Chưa có ticket hỗ trợ nào
                </h3>
                <p className="text-gray-600">
                  Khi bạn gửi khiếu nại, chúng sẽ hiển thị tại đây
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Support;
