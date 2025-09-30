import React from "react";
import {
  MapPin,
  Clock,
  DollarSign,
  Users,
  Star,
  MessageCircle,
  ArrowLeft,
} from "lucide-react";
import { Link } from "react-router-dom";

const JobDetail = () => {
  const job = {
    id: 1,
    title: "Nhân viên phục vụ quán cà phê",
    company: "Highlands Coffee",
    location: "Quận 1, TP.HCM",
    salary: "150,000đ/ca",
    time: "8:00 - 17:00",
    rating: 4.8,
    totalSlots: 10,
    availableSlots: 3,
    urgent: true,
    description: `Highlands Coffee đang tuyển nhân viên phục vụ có kinh nghiệm để làm việc tại chi nhánh Quận 1. 
    
Yêu cầu công việc:
- Phục vụ khách hàng, nhận order
- Pha chế đồ uống cơ bản
- Vệ sinh quán, sắp xếp bàn ghế
- Thái độ thân thiện, nhiệt tình

Quyền lợi:
- Lương 150,000đ/ca (8 tiếng)
- Được đào tạo kỹ năng pha chế
- Môi trường làm việc năng động
- Có cơ hội thăng tiến`,
    requirements: [
      "Có kinh nghiệm làm F&B ưu tiên",
      "Thái độ tốt, giao tiếp khéo léo",
      "Có thể làm việc cuối tuần",
      "Sức khỏe tốt, ngoại hình ưa nhìn",
    ],
    benefits: [
      "Lương competitive theo ca",
      "Được training miễn phí",
      "Môi trường thân thiện",
      "Cơ hội học hỏi và phát triển",
    ],
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Link
          to="/jobs"
          className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft size={20} />
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">Chi tiết công việc</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Job Header */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {job.title}
                </h2>
                <div className="flex items-center space-x-4 text-gray-600">
                  <span className="font-medium">{job.company}</span>
                  <div className="flex items-center space-x-1">
                    <Star size={16} className="text-yellow-400 fill-current" />
                    <span>{job.rating}</span>
                  </div>
                </div>
              </div>
              {job.urgent && (
                <span className="bg-red-100 text-red-800 text-sm px-3 py-1 rounded-full font-medium">
                  Tuyển gấp
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="flex items-center text-gray-600">
                <MapPin size={20} className="mr-2 text-gray-400" />
                <span>{job.location}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Clock size={20} className="mr-2 text-gray-400" />
                <span>{job.time}</span>
              </div>
              <div className="flex items-center text-green-600 font-medium">
                <DollarSign size={20} className="mr-2" />
                <span>{job.salary}</span>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Users size={20} className="text-gray-400" />
                  <span className="text-gray-700 font-medium">
                    Số lượng tuyển dụng
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-bold text-blue-600">
                    {job.availableSlots}
                  </span>
                  <span className="text-gray-500">/{job.totalSlots}</span>
                  <p className="text-sm text-gray-500">còn lại</p>
                </div>
              </div>
            </div>
          </div>

          {/* Job Description */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Mô tả công việc
            </h3>
            <div className="prose max-w-none">
              <p className="text-gray-700 whitespace-pre-line">
                {job.description}
              </p>
            </div>
          </div>

          {/* Requirements and Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Yêu cầu công việc
              </h3>
              <ul className="space-y-2">
                {job.requirements.map((req, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700">{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Quyền lợi
              </h3>
              <ul className="space-y-2">
                {job.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Map Section */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Địa điểm làm việc
            </h3>
            <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center">
              <div className="text-center">
                <MapPin size={48} className="text-gray-400 mx-auto mb-2" />
                <p className="text-gray-600 font-medium">{job.location}</p>
                <p className="text-sm text-gray-500">
                  Bản đồ sẽ hiển thị tại đây
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Apply Button */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium text-lg mb-4">
              Xác nhận tham gia
            </button>
            <p className="text-sm text-gray-500 text-center">
              Bằng cách ứng tuyển, bạn đồng ý với các điều khoản của chúng tôi
            </p>
          </div>

          {/* AI Suggestion */}
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-6 border border-blue-200">
            <div className="flex items-center space-x-3 mb-3">
              <MessageCircle size={24} className="text-blue-600" />
              <h3 className="font-medium text-blue-900">AI Trợ lý</h3>
            </div>
            <p className="text-sm text-blue-800 mb-4">
              Bạn có muốn tôi thêm ca này vào lịch làm việc không?
            </p>
            <div className="space-y-2">
              <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm">
                Thêm vào lịch
              </button>
              <button className="w-full bg-white text-blue-600 border border-blue-600 py-2 rounded-lg hover:bg-blue-50 transition-colors text-sm">
                Để sau
              </button>
            </div>
          </div>

          {/* Company Info */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Thông tin nhà tuyển dụng
            </h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <span className="text-orange-600 font-bold">HC</span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">{job.company}</p>
                  <div className="flex items-center space-x-1">
                    <Star size={16} className="text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-600">
                      {job.rating} (234 đánh giá)
                    </span>
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-600">
                Chuỗi cà phê hàng đầu Việt Nam với hơn 300 chi nhánh trên toàn
                quốc.
              </p>
            </div>
          </div>

          {/* Similar Jobs */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Công việc tương tự
            </h3>
            <div className="space-y-3">
              {[
                {
                  title: "Nhân viên pha chế",
                  company: "Coffee Bean",
                  salary: "160,000đ",
                },
                {
                  title: "Phục vụ nhà hàng",
                  company: "Pizza Hut",
                  salary: "140,000đ",
                },
                {
                  title: "Cashier bán lẻ",
                  company: "Circle K",
                  salary: "135,000đ",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-lg p-3 hover:bg-gray-50 cursor-pointer transition-colors"
                >
                  <p className="font-medium text-gray-900 text-sm">
                    {item.title}
                  </p>
                  <p className="text-xs text-gray-600">{item.company}</p>
                  <p className="text-xs text-green-600 font-medium">
                    {item.salary}/ca
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetail;
