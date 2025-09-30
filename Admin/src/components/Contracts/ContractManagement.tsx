import React, { useState } from "react";
import {
  Search,
  Filter,
  Eye,
  FileText,
  DollarSign,
  Calendar,
  Building2,
  User,
  CheckCircle,
  Clock,
  AlertTriangle,
  Download,
} from "lucide-react";

export default function ContractManagement() {
  const [activeTab, setActiveTab] = useState("contracts");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const contracts = [
    {
      id: 1,
      contractNumber: "HD001",
      employer: "Nhà hàng ABC",
      type: "Dịch vụ thuê lao động",
      startDate: "2024-01-01",
      endDate: "2024-12-31",
      value: "50,000,000",
      status: "active",
      signedDate: "2023-12-15",
    },
    {
      id: 2,
      contractNumber: "HD002",
      employer: "Công ty Logistics XYZ",
      type: "Dịch vụ thuê lao động",
      startDate: "2024-02-01",
      endDate: "2024-07-31",
      value: "120,000,000",
      status: "active",
      signedDate: "2024-01-20",
    },
    {
      id: 3,
      contractNumber: "HD003",
      employer: "Công ty Xây dựng DEF",
      type: "Dịch vụ thuê lao động",
      startDate: "2023-06-01",
      endDate: "2023-12-31",
      value: "80,000,000",
      status: "expired",
      signedDate: "2023-05-15",
    },
  ];

  const payments = [
    {
      id: 1,
      worker: "Nguyễn Văn An",
      job: "Phụ bếp nhà hàng ABC",
      amount: "200,000",
      date: "2024-03-15",
      status: "paid",
      method: "VNPay",
    },
    {
      id: 2,
      worker: "Trần Thị Bình",
      job: "Bốc vác kho hàng",
      amount: "250,000",
      date: "2024-03-14",
      status: "pending",
      method: "Momo",
    },
    {
      id: 3,
      worker: "Lê Văn Cường",
      job: "Thi công xây dựng",
      amount: "300,000",
      date: "2024-03-13",
      status: "paid",
      method: "Ngân hàng",
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
            Đang hiệu lực
          </span>
        );
      case "expired":
        return (
          <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full">
            Hết hạn
          </span>
        );
      case "pending":
        return (
          <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">
            Chờ xử lý
          </span>
        );
      case "paid":
        return (
          <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
            Đã thanh toán
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">
          Hợp đồng & Thanh toán
        </h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          Tạo hợp đồng mới
        </button>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab("contracts")}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === "contracts"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            <div className="flex items-center space-x-2">
              <FileText size={16} />
              <span>Hợp đồng dịch vụ</span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab("payments")}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === "payments"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            <div className="flex items-center space-x-2">
              <DollarSign size={16} />
              <span>Thanh toán lao động</span>
            </div>
          </button>
        </nav>
      </div>

      {/* Filters */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-md">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={20}
          />
          <input
            type="text"
            placeholder="Tìm kiếm..."
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
          <option value="active">Đang hiệu lực</option>
          <option value="expired">Hết hạn</option>
          <option value="pending">Chờ xử lý</option>
        </select>
      </div>

      {/* Contracts Table */}
      {activeTab === "contracts" && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Hợp đồng
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nhà tuyển dụng
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Thời hạn
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Giá trị
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Trạng thái
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Hành động
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {contracts.map((contract) => (
                  <tr key={contract.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {contract.contractNumber}
                        </div>
                        <div className="text-sm text-gray-500">
                          {contract.type}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Building2 size={16} className="text-gray-400 mr-2" />
                        <span className="text-sm text-gray-900">
                          {contract.employer}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {contract.startDate}
                      </div>
                      <div className="text-sm text-gray-500">
                        đến {contract.endDate}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {contract.value} VNĐ
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(contract.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                          <Eye size={16} />
                        </button>
                        <button className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                          <Download size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Payments Table */}
      {activeTab === "payments" && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Lao động
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Công việc
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Số tiền
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ngày
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Phương thức
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Trạng thái
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {payments.map((payment) => (
                  <tr key={payment.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <User size={16} className="text-gray-400 mr-2" />
                        <span className="text-sm font-medium text-gray-900">
                          {payment.worker}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {payment.job}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {payment.amount} VNĐ
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {payment.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {payment.method}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(payment.status)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Revenue Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-600">
                Doanh thu tháng
              </p>
              <p className="text-2xl font-bold text-blue-900">2.4 tỷ</p>
            </div>
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
              <DollarSign size={16} className="text-white" />
            </div>
          </div>
        </div>

        <div className="bg-green-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-600">
                Đã thanh toán
              </p>
              <p className="text-2xl font-bold text-green-900">1,247</p>
            </div>
            <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
              <CheckCircle size={16} className="text-white" />
            </div>
          </div>
        </div>

        <div className="bg-yellow-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-yellow-600">
                Chờ thanh toán
              </p>
              <p className="text-2xl font-bold text-yellow-900">89</p>
            </div>
            <div className="w-8 h-8 bg-yellow-500 rounded-lg flex items-center justify-center">
              <Clock size={16} className="text-white" />
            </div>
          </div>
        </div>

        <div className="bg-red-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-red-600">
                Hợp đồng hết hạn
              </p>
              <p className="text-2xl font-bold text-red-900">5</p>
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
