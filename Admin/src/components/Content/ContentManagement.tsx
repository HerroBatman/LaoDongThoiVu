import { useState } from "react";
import SkillManagement from "./SkillManagement";
import {
  Search,
  Plus,
  Edit,
  Trash2,
  Eye,
  Tag,
  FileText,
  Megaphone,
  Settings,
} from "lucide-react";

export default function ContentManagement() {
  const [activeTab, setActiveTab] = useState("skills");
  const [searchTerm, setSearchTerm] = useState("");

  const categories = [
    {
      id: 1,
      name: "Nhà hàng - Khách sạn",
      description: "Các công việc trong lĩnh vực dịch vụ ăn uống và lưu trú",
      jobCount: 324,
      status: "active",
      createdDate: "2024-01-15",
    },
    {
      id: 2,
      name: "Xây dựng",
      description: "Công việc thi công, xây dựng các công trình",
      jobCount: 156,
      status: "active",
      createdDate: "2024-01-10",
    },
    {
      id: 3,
      name: "Logistics",
      description: "Vận chuyển, bốc vác, kho bãi",
      jobCount: 89,
      status: "active",
      createdDate: "2024-01-08",
    },
    {
      id: 4,
      name: "Sự kiện",
      description: "Phục vụ các sự kiện, hội nghị, triển lãm",
      jobCount: 45,
      status: "inactive",
      createdDate: "2024-01-05",
    },
  ];

  const contents = [
    {
      id: 1,
      title: "Quy định về an toàn lao động",
      type: "policy",
      status: "published",
      author: "Admin",
      createdDate: "2024-03-10",
      views: 1250,
    },
    {
      id: 2,
      title: "Hướng dẫn sử dụng ứng dụng cho NLĐ",
      type: "guide",
      status: "published",
      author: "Admin",
      createdDate: "2024-03-08",
      views: 890,
    },
    {
      id: 3,
      title: "Thông báo bảo trì hệ thống",
      type: "announcement",
      status: "draft",
      author: "Admin",
      createdDate: "2024-03-15",
      views: 0,
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
            Hoạt động
          </span>
        );
      case "inactive":
        return (
          <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">
            Không hoạt động
          </span>
        );
      case "published":
        return (
          <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
            Đã xuất bản
          </span>
        );
      case "draft":
        return (
          <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">
            Bản nháp
          </span>
        );
      default:
        return null;
    }
  };

  const getContentTypeIcon = (type: string) => {
    switch (type) {
      case "policy":
        return <Settings size={16} className="text-blue-500" />;
      case "guide":
        return <FileText size={16} className="text-green-500" />;
      case "announcement":
        return <Megaphone size={16} className="text-purple-500" />;
      default:
        return <FileText size={16} className="text-gray-500" />;
    }
  };

  const getContentTypeName = (type: string) => {
    switch (type) {
      case "policy":
        return "Chính sách";
      case "guide":
        return "Hướng dẫn";
      case "announcement":
        return "Thông báo";
      default:
        return "Khác";
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">
          Quản lý nội dung & danh mục
        </h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          <Plus size={16} className="mr-2 inline" />
          Thêm mới
        </button>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab("skills")}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === "skills"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Kỹ năng
          </button>
          <button
            onClick={() => setActiveTab("categories")}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === "categories"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            <div className="flex items-center space-x-2">
              <Tag size={16} />
              <span>Danh mục công việc</span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab("content")}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === "content"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            <div className="flex items-center space-x-2">
              <FileText size={16} />
              <span>Nội dung hệ thống</span>
            </div>
          </button>
        </nav>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
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

      {/* Skills Tab */}
      {activeTab === "skills" && <SkillManagement />}

      {/* Categories Table */}
      {activeTab === "categories" && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Danh mục
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Mô tả
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Số công việc
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Trạng thái
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ngày tạo
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Hành động
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {categories.map((category) => (
                  <tr key={category.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Tag size={16} className="text-blue-500 mr-2" />
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {category.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            ID: #{category.id}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 max-w-xs truncate">
                        {category.description}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {category.jobCount}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(category.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {category.createdDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                          <Eye size={16} />
                        </button>
                        <button className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                          <Edit size={16} />
                        </button>
                        <button className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                          <Trash2 size={16} />
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

      {/* Content Table */}
      {activeTab === "content" && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tiêu đề
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Loại
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Trạng thái
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tác giả
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Lượt xem
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ngày tạo
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Hành động
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {contents.map((content) => (
                  <tr key={content.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {getContentTypeIcon(content.type)}
                        <div className="ml-2">
                          <div className="text-sm font-medium text-gray-900">
                            {content.title}
                          </div>
                          <div className="text-sm text-gray-500">
                            ID: #{content.id}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">
                        {getContentTypeName(content.type)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(content.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {content.author}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {content.views.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {content.createdDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                          <Eye size={16} />
                        </button>
                        <button className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                          <Edit size={16} />
                        </button>
                        <button className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                          <Trash2 size={16} />
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
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-600">
                Danh mục hoạt động
              </p>
              <p className="text-2xl font-bold text-blue-900">12</p>
            </div>
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
              <Tag size={16} className="text-white" />
            </div>
          </div>
        </div>

        <div className="bg-green-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-600">
                Nội dung đã xuất bản
              </p>
              <p className="text-2xl font-bold text-green-900">45</p>
            </div>
            <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
              <FileText size={16} className="text-white" />
            </div>
          </div>
        </div>

        <div className="bg-yellow-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-yellow-600">Bản nháp</p>
              <p className="text-2xl font-bold text-yellow-900">8</p>
            </div>
            <div className="w-8 h-8 bg-yellow-500 rounded-lg flex items-center justify-center">
              <Edit size={16} className="text-white" />
            </div>
          </div>
        </div>

        <div className="bg-purple-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-purple-600">
                Tổng lượt xem
              </p>
              <p className="text-2xl font-bold text-purple-900">15.2K</p>
            </div>
            <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
              <Eye size={16} className="text-white" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
