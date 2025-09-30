import React, { useState } from "react";
import {
  FileText,
  DollarSign,
  CreditCard,
  Calendar,
  Download,
  Eye,
  CheckCircle,
  Clock,
  AlertTriangle,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Contracts: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"contracts" | "payments">(
    "contracts"
  );

  const contracts = [
    {
      id: "CT001",
      title: "Hợp đồng dịch vụ tháng 12/2024",
      startDate: "01/12/2024",
      endDate: "31/12/2024",
      status: "active",
      statusText: "Đang hiệu lực",
      platformFee: "5%",
      totalJobs: 12,
      description: "Hợp đồng sử dụng nền tảng tuyển dụng lao động thời vụ",
    },
    {
      id: "CT002",
      title: "Hợp đồng dịch vụ tháng 11/2024",
      startDate: "01/11/2024",
      endDate: "30/11/2024",
      status: "completed",
      statusText: "Đã hoàn thành",
      platformFee: "5%",
      totalJobs: 8,
      description: "Hợp đồng sử dụng nền tảng tuyển dụng lao động thời vụ",
    },
  ];

  const payments = [
    {
      id: "TT001",
      jobTitle: "Phụ bếp nhà hàng - Ca tối",
      date: "25/12/2024",
      workerCost: 450000,
      platformFee: 22500,
      total: 472500,
      status: "completed",
      statusText: "Đã thanh toán",
      paymentMethod: "VNPay",
    },
    {
      id: "TT002",
      jobTitle: "Bốc vác kho hàng",
      date: "26/12/2024",
      workerCost: 400000,
      platformFee: 20000,
      total: 420000,
      status: "pending",
      statusText: "Chờ thanh toán",
      paymentMethod: null,
    },
    {
      id: "TT003",
      jobTitle: "Phục vụ sự kiện cuối năm",
      date: "31/12/2024",
      workerCost: 1800000,
      platformFee: 90000,
      total: 1890000,
      status: "pending",
      statusText: "Chờ thanh toán",
      paymentMethod: null,
    },
  ];

  const chartData = [
    { month: "T10", amount: 2.5 },
    { month: "T11", amount: 3.2 },
    { month: "T12", amount: 4.8 },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "completed":
        return "bg-blue-100 text-blue-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "expired":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const totalPending = payments
    .filter((p) => p.status === "pending")
    .reduce((sum, p) => sum + p.total, 0);
  const totalPaid = payments
    .filter((p) => p.status === "completed")
    .reduce((sum, p) => sum + p.total, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Hợp đồng & Thanh toán
        </h1>
        <p className="text-gray-600 mt-2">
          Quản lý hợp đồng dịch vụ và thanh toán
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Tổng cần TT</p>
              <p className="text-2xl font-bold text-red-600">
                {(totalPending / 1000000).toFixed(1)}M
              </p>
            </div>
            <AlertTriangle className="w-8 h-8 text-red-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Đã thanh toán</p>
              <p className="text-2xl font-bold text-green-600">
                {(totalPaid / 1000000).toFixed(1)}M
              </p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Số giao dịch</p>
              <p className="text-2xl font-bold text-gray-900">
                {payments.length}
              </p>
            </div>
            <CreditCard className="w-8 h-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Phí nền tảng</p>
              <p className="text-2xl font-bold text-orange-600">5%</p>
            </div>
            <FileText className="w-8 h-8 text-orange-500" />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab("contracts")}
              className={`py-4 text-sm font-medium border-b-2 transition-colors ${
                activeTab === "contracts"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              Hợp đồng
            </button>
            <button
              onClick={() => setActiveTab("payments")}
              className={`py-4 text-sm font-medium border-b-2 transition-colors ${
                activeTab === "payments"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              Thanh toán
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === "contracts" ? (
            <div className="space-y-4">
              {contracts.map((contract) => (
                <div
                  key={contract.id}
                  className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-3">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {contract.title}
                        </h3>
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                            contract.status
                          )}`}
                        >
                          {contract.statusText}
                        </span>
                      </div>

                      <p className="text-gray-600 mb-4">
                        {contract.description}
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 text-gray-400 mr-2" />
                          <span>
                            Từ {contract.startDate} đến {contract.endDate}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <FileText className="w-4 h-4 text-gray-400 mr-2" />
                          <span>Số job: {contract.totalJobs}</span>
                        </div>
                        <div className="flex items-center">
                          <DollarSign className="w-4 h-4 text-gray-400 mr-2" />
                          <span>Phí nền tảng: {contract.platformFee}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex space-x-2 ml-4">
                      <button className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors">
                        <Eye className="w-5 h-5" />
                      </button>
                      <button className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-lg transition-colors">
                        <Download className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-6">
              {/* Payment Chart */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Chi phí theo tháng
                </h3>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip
                      formatter={(value) => [`${value}M VNĐ`, "Chi phí"]}
                    />
                    <Bar
                      dataKey="amount"
                      fill="#3B82F6"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Payment List */}
              <div className="space-y-4">
                {payments.map((payment) => (
                  <div
                    key={payment.id}
                    className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-3">
                          <h3 className="text-lg font-semibold text-gray-900">
                            {payment.jobTitle}
                          </h3>
                          <span
                            className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                              payment.status
                            )}`}
                          >
                            {payment.statusText}
                          </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <span className="text-gray-500">Ngày:</span>
                            <p className="font-medium">{payment.date}</p>
                          </div>
                          <div>
                            <span className="text-gray-500">Chi phí LĐ:</span>
                            <p className="font-medium">
                              {payment.workerCost.toLocaleString()} VNĐ
                            </p>
                          </div>
                          <div>
                            <span className="text-gray-500">Phí nền tảng:</span>
                            <p className="font-medium">
                              {payment.platformFee.toLocaleString()} VNĐ
                            </p>
                          </div>
                          <div>
                            <span className="text-gray-500">Tổng cộng:</span>
                            <p className="font-semibold text-lg text-blue-600">
                              {payment.total.toLocaleString()} VNĐ
                            </p>
                          </div>
                        </div>

                        {payment.paymentMethod && (
                          <div className="mt-3 text-sm text-gray-600">
                            Thanh toán qua: {payment.paymentMethod}
                          </div>
                        )}
                      </div>

                      <div className="ml-4">
                        {payment.status === "pending" ? (
                          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                            Thanh toán ngay
                          </button>
                        ) : (
                          <button className="p-2 text-green-600 hover:text-green-800 hover:bg-green-50 rounded-lg transition-colors">
                            <CheckCircle className="w-6 h-6" />
                          </button>
                        )}
                      </div>
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

export default Contracts;
