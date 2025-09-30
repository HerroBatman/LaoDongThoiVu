import React, { useState } from "react";
import {
  DollarSign,
  TrendingUp,
  Award,
  Plus,
  Minus,
  Clock,
  CheckCircle,
} from "lucide-react";

const EarningsReputation = () => {
  const [activeTab, setActiveTab] = useState<"earnings" | "reputation">(
    "earnings"
  );

  const earningsData = {
    totalHours: 156,
    thisMonth: 2850000,
    lastMonth: 2200000,
    weeklyData: [
      { week: "Tuần 1", amount: 650000 },
      { week: "Tuần 2", amount: 780000 },
      { week: "Tuần 3", amount: 920000 },
      { week: "Tuần 4", amount: 500000 },
    ],
    paymentHistory: [
      {
        id: 1,
        date: "2024-01-15",
        amount: 150000,
        company: "Highlands Coffee",
        status: "paid",
      },
      {
        id: 2,
        date: "2024-01-14",
        amount: 200000,
        company: "Viettel Post",
        status: "paid",
      },
      {
        id: 3,
        date: "2024-01-12",
        amount: 180000,
        company: "Saigon Co.op",
        status: "pending",
      },
    ],
  };

  const reputationData = {
    currentScore: 4.8,
    totalReviews: 47,
    scoreHistory: [
      {
        id: 1,
        date: "2024-01-15",
        change: "+0.1",
        reason: "Hoàn thành công việc xuất sắc",
        company: "Highlands Coffee",
        type: "positive",
      },
      {
        id: 2,
        date: "2024-01-12",
        change: "+0.2",
        reason: "Đến sớm và làm việc chăm chỉ",
        company: "Viettel Post",
        type: "positive",
      },
      {
        id: 3,
        date: "2024-01-10",
        change: "-0.1",
        reason: "Đến muộn 15 phút",
        company: "ABC Company",
        type: "negative",
      },
    ],
    suggestions: [
      "Luôn đến đúng giờ để tăng điểm uy tín",
      "Hoàn thành công việc với chất lượng cao",
      "Có thái độ tích cực với đồng nghiệp và khách hàng",
      "Tham gia thêm các khóa đào tạo kỹ năng",
    ],
  };

  const getPaymentStatusConfig = (status: string) => {
    switch (status) {
      case "paid":
        return {
          text: "Đã nhận",
          color: "text-green-600",
          bgColor: "bg-green-100",
          icon: CheckCircle,
        };
      case "pending":
        return {
          text: "Chờ thanh toán",
          color: "text-yellow-600",
          bgColor: "bg-yellow-100",
          icon: Clock,
        };
      default:
        return {
          text: "Không xác định",
          color: "text-gray-600",
          bgColor: "bg-gray-100",
          icon: Clock,
        };
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Lương & Uy tín</h1>
      </div>

      {/* Tab Navigation */}
      <div className="flex bg-gray-100 rounded-lg p-1">
        <button
          onClick={() => setActiveTab("earnings")}
          className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            activeTab === "earnings"
              ? "bg-white text-gray-900 shadow-sm"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          <DollarSign size={16} className="inline mr-2" />
          Lương
        </button>
        <button
          onClick={() => setActiveTab("reputation")}
          className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            activeTab === "reputation"
              ? "bg-white text-gray-900 shadow-sm"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          <Award size={16} className="inline mr-2" />
          Uy tín
        </button>
      </div>

      {activeTab === "earnings" ? (
        <div className="space-y-6">
          {/* Earnings Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Tổng số giờ công
                  </p>
                  <p className="text-2xl font-bold text-gray-900 mt-2">
                    {earningsData.totalHours}h
                  </p>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg">
                  <Clock size={24} className="text-blue-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Thu nhập tháng này
                  </p>
                  <p className="text-2xl font-bold text-gray-900 mt-2">
                    {earningsData.thisMonth.toLocaleString()}đ
                  </p>
                  <div className="flex items-center text-green-600 text-sm mt-1">
                    <TrendingUp size={16} className="mr-1" />+
                    {Math.round(
                      ((earningsData.thisMonth - earningsData.lastMonth) /
                        earningsData.lastMonth) *
                        100
                    )}
                    %
                  </div>
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
                    Thu nhập tháng trước
                  </p>
                  <p className="text-2xl font-bold text-gray-900 mt-2">
                    {earningsData.lastMonth.toLocaleString()}đ
                  </p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <DollarSign size={24} className="text-gray-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Weekly Chart */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Thu nhập theo tuần
            </h3>
            <div className="space-y-4">
              {earningsData.weeklyData.map((week, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-600">
                    {week.week}
                  </span>
                  <div className="flex items-center space-x-3 flex-1 ml-4">
                    <div className="flex-1 bg-gray-200 rounded-full h-3 overflow-hidden">
                      <div
                        className="h-full bg-blue-600 transition-all duration-500"
                        style={{
                          width: `${
                            (week.amount /
                              Math.max(
                                ...earningsData.weeklyData.map((w) => w.amount)
                              )) *
                            100
                          }%`,
                        }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-gray-900 min-w-24 text-right">
                      {week.amount.toLocaleString()}đ
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Payment History */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                Lịch sử thanh toán
              </h3>
            </div>
            <div className="divide-y divide-gray-200">
              {earningsData.paymentHistory.map((payment) => {
                const statusConfig = getPaymentStatusConfig(payment.status);
                return (
                  <div
                    key={payment.id}
                    className="p-6 flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-4">
                      <statusConfig.icon
                        size={20}
                        className={statusConfig.color}
                      />
                      <div>
                        <p className="font-medium text-gray-900">
                          {payment.company}
                        </p>
                        <p className="text-sm text-gray-600">
                          {new Date(payment.date).toLocaleDateString("vi-VN")}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">
                        {payment.amount.toLocaleString()}đ
                      </p>
                      <span
                        className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${statusConfig.color} ${statusConfig.bgColor}`}
                      >
                        {statusConfig.text}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Reputation Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="text-center">
                <div className="mx-auto w-24 h-24 bg-yellow-50 rounded-full flex items-center justify-center mb-4">
                  <span className="text-3xl font-bold text-yellow-600">
                    {reputationData.currentScore}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Điểm uy tín hiện tại
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  Dựa trên {reputationData.totalReviews} đánh giá
                </p>
                <div className="mt-3 bg-gray-200 rounded-full h-3 overflow-hidden">
                  <div
                    className="h-full bg-yellow-400 transition-all duration-500"
                    style={{
                      width: `${(reputationData.currentScore / 5) * 100}%`,
                    }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Phân tích uy tín
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">
                    Xuất sắc (4.5-5.0)
                  </span>
                  <div className="flex items-center space-x-2">
                    <div className="w-16 bg-gray-200 rounded-full h-2">
                      <div className="w-14 h-2 bg-green-500 rounded-full"></div>
                    </div>
                    <span className="text-sm text-gray-900">87%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Tốt (4.0-4.4)</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-16 bg-gray-200 rounded-full h-2">
                      <div className="w-4 h-2 bg-blue-500 rounded-full"></div>
                    </div>
                    <span className="text-sm text-gray-900">10%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Khác (dưới 4.0)</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-16 bg-gray-200 rounded-full h-2">
                      <div className="w-1 h-2 bg-red-500 rounded-full"></div>
                    </div>
                    <span className="text-sm text-gray-900">3%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Score History */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                Lịch sử thay đổi điểm uy tín
              </h3>
            </div>
            <div className="divide-y divide-gray-200">
              {reputationData.scoreHistory.map((record) => (
                <div key={record.id} className="p-6 flex items-start space-x-4">
                  <div
                    className={`p-2 rounded-full ${
                      record.type === "positive" ? "bg-green-50" : "bg-red-50"
                    }`}
                  >
                    {record.type === "positive" ? (
                      <Plus size={16} className="text-green-600" />
                    ) : (
                      <Minus size={16} className="text-red-600" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <p className="font-medium text-gray-900">
                        {record.reason}
                      </p>
                      <span
                        className={`font-semibold ${
                          record.type === "positive"
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {record.change}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{record.company}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(record.date).toLocaleDateString("vi-VN")}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI Suggestions */}
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-6 border border-blue-200">
            <div className="flex items-center space-x-3 mb-4">
              <Award size={24} className="text-blue-600" />
              <h3 className="text-lg font-semibold text-blue-900">
                Gợi ý cải thiện từ AI
              </h3>
            </div>
            <div className="space-y-3">
              {reputationData.suggestions.map((suggestion, index) => (
                <div key={index} className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-sm text-blue-800">{suggestion}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EarningsReputation;
