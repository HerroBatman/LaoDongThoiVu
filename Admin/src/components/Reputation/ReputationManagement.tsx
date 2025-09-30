import React, { useState } from "react";
import {
  Search,
  Filter,
  Star,
  TrendingUp,
  TrendingDown,
  Edit,
  Eye,
  User,
  Building2,
  AlertTriangle,
} from "lucide-react";

export default function ReputationManagement() {
  const [activeTab, setActiveTab] = useState("workers");
  const [searchTerm, setSearchTerm] = useState("");
  const [scoreFilter, setScoreFilter] = useState("all");

  const workers = [
    {
      id: 1,
      name: "Nguyễn Văn An",
      currentScore: 4.8,
      previousScore: 4.6,
      completedJobs: 45,
      violations: 0,
      trend: "up",
      lastUpdate: "2024-03-15",
    },
    {
      id: 2,
      name: "Trần Thị Bình",
      currentScore: 4.2,
      previousScore: 4.5,
      completedJobs: 23,
      violations: 1,
      trend: "down",
      lastUpdate: "2024-03-14",
    },
    {
      id: 3,
      name: "Lê Văn Cường",
      currentScore: 2.1,
      previousScore: 2.8,
      completedJobs: 12,
      violations: 3,
      trend: "down",
      lastUpdate: "2024-03-13",
    },
  ];

  const employers = [
    {
      id: 1,
      name: "Nhà hàng ABC",
      currentScore: 4.5,
      previousScore: 4.3,
      postedJobs: 23,
      violations: 0,
      trend: "up",
      lastUpdate: "2024-03-15",
    },
    {
      id: 2,
      name: "Công ty Logistics XYZ",
      currentScore: 3.8,
      previousScore: 4.0,
      postedJobs: 15,
      violations: 1,
      trend: "down",
      lastUpdate: "2024-03-14",
    },
  ];

  const getScoreColor = (score: number) => {
    if (score >= 4.0) return "text-green-600";
    if (score >= 3.0) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreBadge = (score: number) => {
    if (score >= 4.0) return "bg-green-100 text-green-800";
    if (score >= 3.0) return "bg-yellow-100 text-yellow-800";
    return "bg-red-100 text-red-800";
  };

  const getTrendIcon = (trend: string) => {
    return trend === "up" ? (
      <TrendingUp size={16} className="text-green-500" />
    ) : (
      <TrendingDown size={16} className="text-red-500" />
    );
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">
          Quản lý điểm uy tín
        </h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          Điều chỉnh thủ công
        </button>
      </div>

      {/* AI Suggestions */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 border border-blue-200">
        <div className="flex items-start space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
            <AlertTriangle size={16} className="text-white" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-1">AI Gợi ý</h3>
            <p className="text-sm text-gray-700">
              Có 3 lao động có điểm uy tín dưới 3.0 cần can thiệp: Lê Văn Cường
              (2.1), Phạm Thị Dung (2.8), Hoàng Văn Em (2.5). Bạn có muốn xem
              chi tiết và đưa ra biện pháp xử lý không?
            </p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab("workers")}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === "workers"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            <div className="flex items-center space-x-2">
              <User size={16} />
              <span>Người lao động</span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab("employers")}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === "employers"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            <div className="flex items-center space-x-2">
              <Building2 size={16} />
              <span>Nhà tuyển dụng</span>
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
            placeholder="Tìm kiếm theo tên..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
          />
        </div>
        <select
          value={scoreFilter}
          onChange={(e) => setScoreFilter(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="all">Tất cả điểm số</option>
          <option value="high">Cao (4.0+)</option>
          <option value="medium">Trung bình (3.0-3.9)</option>
          <option value="low">Thấp (&lt;3.0)</option>
        </select>
      </div>

      {/* Workers Table */}
      {activeTab === "workers" && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Lao động
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Điểm hiện tại
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Xu hướng
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Công việc
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Vi phạm
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Cập nhật
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Hành động
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {workers.map((worker) => (
                  <tr key={worker.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <User size={16} className="text-gray-400 mr-2" />
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {worker.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            ID: #{worker.id}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <Star className="text-yellow-400" size={16} />
                        <span
                          className={`text-sm font-medium ${getScoreColor(
                            worker.currentScore
                          )}`}
                        >
                          {worker.currentScore}
                        </span>
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded-full ${getScoreBadge(
                            worker.currentScore
                          )}`}
                        >
                          {worker.currentScore >= 4.0
                            ? "Tốt"
                            : worker.currentScore >= 3.0
                            ? "TB"
                            : "Kém"}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        {getTrendIcon(worker.trend)}
                        <span className="text-sm text-gray-600">
                          {worker.previousScore} → {worker.currentScore}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {worker.completedJobs}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`text-sm font-medium ${
                          worker.violations > 0
                            ? "text-red-600"
                            : "text-green-600"
                        }`}
                      >
                        {worker.violations}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {worker.lastUpdate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                          <Eye size={16} />
                        </button>
                        <button className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                          <Edit size={16} />
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

      {/* Employers Table */}
      {activeTab === "employers" && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nhà tuyển dụng
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Điểm hiện tại
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Xu hướng
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Công việc đã đăng
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Vi phạm
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Cập nhật
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Hành động
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {employers.map((employer) => (
                  <tr key={employer.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Building2 size={16} className="text-gray-400 mr-2" />
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {employer.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            ID: #{employer.id}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <Star className="text-yellow-400" size={16} />
                        <span
                          className={`text-sm font-medium ${getScoreColor(
                            employer.currentScore
                          )}`}
                        >
                          {employer.currentScore}
                        </span>
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded-full ${getScoreBadge(
                            employer.currentScore
                          )}`}
                        >
                          {employer.currentScore >= 4.0
                            ? "Tốt"
                            : employer.currentScore >= 3.0
                            ? "TB"
                            : "Kém"}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        {getTrendIcon(employer.trend)}
                        <span className="text-sm text-gray-600">
                          {employer.previousScore} → {employer.currentScore}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {employer.postedJobs}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`text-sm font-medium ${
                          employer.violations > 0
                            ? "text-red-600"
                            : "text-green-600"
                        }`}
                      >
                        {employer.violations}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {employer.lastUpdate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                          <Eye size={16} />
                        </button>
                        <button className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                          <Edit size={16} />
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

      {/* Summary Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-green-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-600">
                Điểm cao (4.0+)
              </p>
              <p className="text-2xl font-bold text-green-900">1,247</p>
            </div>
            <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
              <Star size={16} className="text-white" />
            </div>
          </div>
        </div>

        <div className="bg-yellow-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-yellow-600">
                Trung bình (3.0-3.9)
              </p>
              <p className="text-2xl font-bold text-yellow-900">856</p>
            </div>
            <div className="w-8 h-8 bg-yellow-500 rounded-lg flex items-center justify-center">
              <Star size={16} className="text-white" />
            </div>
          </div>
        </div>

        <div className="bg-red-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-red-600">Thấp (&lt;3.0)</p>
              <p className="text-2xl font-bold text-red-900">89</p>
            </div>
            <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center">
              <AlertTriangle size={16} className="text-white" />
            </div>
          </div>
        </div>

        <div className="bg-blue-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-600">
                Điểm trung bình
              </p>
              <p className="text-2xl font-bold text-blue-900">4.2</p>
            </div>
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
              <TrendingUp size={16} className="text-white" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
