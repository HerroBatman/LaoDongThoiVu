import React, { useState } from "react";
import {
  Star,
  MapPin,
  Calendar,
  DollarSign,
  Filter,
  Search,
} from "lucide-react";

const WorkHistory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const workHistory = [
    {
      id: 1,
      title: "Nhân viên phục vụ quán cà phê",
      company: "Highlands Coffee",
      location: "Quận 1, TP.HCM",
      date: "2024-01-10",
      salary: "150,000đ",
      paymentStatus: "paid",
      rating: null,
      duration: "8 giờ",
    },
    {
      id: 2,
      title: "Công nhân bốc vác kho hàng",
      company: "Viettel Post",
      location: "Quận 7, TP.HCM",
      date: "2024-01-08",
      salary: "200,000đ",
      paymentStatus: "paid",
      rating: 5,
      duration: "8 giờ",
    },
    {
      id: 3,
      title: "Nhân viên bán hàng sự kiện",
      company: "Saigon Co.op",
      location: "Quận 3, TP.HCM",
      date: "2024-01-05",
      salary: "180,000đ",
      paymentStatus: "pending",
      rating: null,
      duration: "9 giờ",
    },
    {
      id: 4,
      title: "Shipper giao đồ ăn",
      company: "GrabFood",
      location: "Quận 5, TP.HCM",
      date: "2024-01-03",
      salary: "180,000đ",
      paymentStatus: "paid",
      rating: 4,
      duration: "3 giờ",
    },
    {
      id: 5,
      title: "Nhân viên dọn vệ sinh văn phòng",
      company: "Clean Pro",
      location: "Quận 1, TP.HCM",
      date: "2023-12-28",
      salary: "120,000đ",
      paymentStatus: "paid",
      rating: 5,
      duration: "4 giờ",
    },
  ];

  const getPaymentStatusConfig = (status: string) => {
    switch (status) {
      case "paid":
        return {
          text: "Đã thanh toán",
          color: "text-green-600",
          bgColor: "bg-green-100",
        };
      case "pending":
        return {
          text: "Chờ thanh toán",
          color: "text-yellow-600",
          bgColor: "bg-yellow-100",
        };
      default:
        return {
          text: "Không xác định",
          color: "text-gray-600",
          bgColor: "bg-gray-100",
        };
    }
  };

  const filteredHistory = workHistory.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || item.paymentStatus === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalEarnings = workHistory.reduce((total, item) => {
    return total + parseInt(item.salary.replace(/[,đ]/g, ""));
  }, 0);

  const RatingModal = ({
    isOpen,
    onClose,
    job,
  }: {
    isOpen: boolean;
    onClose: () => void;
    job: any;
  }) => {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");

    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Đánh giá nhà tuyển dụng
          </h3>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-600 mb-2">
                Công việc: {job?.title}
              </p>
              <p className="text-sm text-gray-600 mb-4">
                Công ty: {job?.company}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Đánh giá của bạn
              </label>
              <div className="flex space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setRating(star)}
                    className={`p-1 ${
                      star <= rating ? "text-yellow-400" : "text-gray-300"
                    }`}
                  >
                    <Star size={24} className="fill-current" />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nhận xét (không bắt buộc)
              </label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Chia sẻ trải nghiệm làm việc của bạn..."
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />
            </div>

            <div className="flex space-x-3">
              <button
                onClick={onClose}
                className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Hủy
              </button>
              <button
                onClick={onClose}
                className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Gửi đánh giá
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const [ratingModal, setRatingModal] = useState({ isOpen: false, job: null });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Lịch sử công việc</h1>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Tổng công việc đã hoàn thành
              </p>
              <p className="text-2xl font-bold text-gray-900 mt-2">
                {workHistory.length}
              </p>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <Calendar size={24} className="text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Tổng thu nhập</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">
                {totalEarnings.toLocaleString()}đ
              </p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <DollarSign size={24} className="text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Đánh giá trung bình
              </p>
              <div className="flex items-center mt-2">
                <p className="text-2xl font-bold text-gray-900">4.7</p>
                <div className="flex ml-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={16}
                      className="text-yellow-400 fill-current"
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className="p-3 bg-yellow-50 rounded-lg">
              <Star size={24} className="text-yellow-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Tìm kiếm công việc..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">Tất cả trạng thái</option>
            <option value="paid">Đã thanh toán</option>
            <option value="pending">Chờ thanh toán</option>
          </select>
        </div>
      </div>

      {/* Work History List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            Danh sách công việc ({filteredHistory.length})
          </h2>
        </div>
        <div className="divide-y divide-gray-200">
          {filteredHistory.map((job) => {
            const paymentStatus = getPaymentStatusConfig(job.paymentStatus);
            return (
              <div
                key={job.id}
                className="p-6 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 text-lg mb-1">
                      {job.title}
                    </h3>
                    <p className="text-gray-600 mb-2">{job.company}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <MapPin size={16} className="mr-1" />
                        {job.location}
                      </div>
                      <div className="flex items-center">
                        <Calendar size={16} className="mr-1" />
                        {new Date(job.date).toLocaleDateString("vi-VN")}
                      </div>
                      <div>{job.duration}</div>
                    </div>
                  </div>
                  <div className="text-right space-y-2">
                    <p className="text-lg font-semibold text-green-600">
                      {job.salary}
                    </p>
                    <span
                      className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${paymentStatus.color} ${paymentStatus.bgColor}`}
                    >
                      {paymentStatus.text}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    {job.rating ? (
                      <div className="flex items-center space-x-1">
                        <span className="text-sm text-gray-600">
                          Đã đánh giá:
                        </span>
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              size={16}
                              className={`${
                                star <= job.rating!
                                  ? "text-yellow-400 fill-current"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    ) : (
                      <button
                        onClick={() => setRatingModal({ isOpen: true, job })}
                        className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                      >
                        Đánh giá nhà tuyển dụng
                      </button>
                    )}
                  </div>
                  <button className="text-gray-600 hover:text-gray-900 text-sm">
                    Xem chi tiết
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <RatingModal
        isOpen={ratingModal.isOpen}
        onClose={() => setRatingModal({ isOpen: false, job: null })}
        job={ratingModal.job}
      />
    </div>
  );
};

export default WorkHistory;
