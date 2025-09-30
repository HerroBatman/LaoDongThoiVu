import React from "react";
import {
  TrendingUp,
  Calendar,
  Bell,
  Star,
  MapPin,
  Clock,
  DollarSign,
} from "lucide-react";

const Dashboard = () => {
  const stats = [
    {
      title: "Điểm uy tín",
      value: "4.8/5.0",
      progress: 96,
      icon: Star,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
    },
    {
      title: "Lương dự kiến tháng này",
      value: "12,500,000đ",
      icon: DollarSign,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Số ca sắp tới",
      value: "5 ca",
      icon: Calendar,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Thông báo việc làm mới",
      value: "3 việc mới",
      icon: Bell,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
  ];

  const recommendedJobs = [
    {
      id: 1,
      title: "Nhân viên phục vụ quán cà phê",
      company: "Highlands Coffee",
      location: "Quận 1, TP.HCM",
      salary: "150,000đ/ca",
      time: "8:00 - 17:00",
      urgent: true,
    },
    {
      id: 2,
      title: "Công nhân bốc vác kho hàng",
      company: "Viettel Post",
      location: "Quận 7, TP.HCM",
      salary: "200,000đ/ca",
      time: "6:00 - 14:00",
      urgent: false,
    },
    {
      id: 3,
      title: "Nhân viên bán hàng sự kiện",
      company: "Saigon Co.op",
      location: "Quận 3, TP.HCM",
      salary: "180,000đ/ca",
      time: "9:00 - 18:00",
      urgent: true,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Chào mừng trở lại, Nguyễn Văn An!</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  {stat.title}
                </p>
                <p className="text-2xl font-bold text-gray-900 mt-2">
                  {stat.value}
                </p>
                {stat.progress && (
                  <div className="mt-3">
                    <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
                      <span>Tiến độ</span>
                      <span>{stat.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${stat.progress}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>
              <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                <stat.icon size={24} className={stat.color} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* AI Chatbot Banner */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-6 text-white">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-white/20 rounded-lg">
            <TrendingUp size={24} />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold">AI Trợ lý việc làm</h3>
            <p className="text-blue-100 mt-1">
              Bạn có muốn tôi tìm job phù hợp cho tuần này không?
            </p>
          </div>
          <button className="bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-blue-50 transition-colors">
            Bắt đầu chat
          </button>
        </div>
      </div>

      {/* Recommended Jobs */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            Công việc được đề xuất cho bạn
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            Dựa trên kỹ năng và sở thích của bạn
          </p>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recommendedJobs.map((job) => (
              <div
                key={job.id}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow relative"
              >
                {job.urgent && (
                  <span className="absolute top-2 right-2 bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
                    Gấp
                  </span>
                )}
                <h3 className="font-semibold text-gray-900 mb-2">
                  {job.title}
                </h3>
                <p className="text-sm text-gray-600 mb-3">{job.company}</p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin size={16} className="mr-2" />
                    {job.location}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock size={16} className="mr-2" />
                    {job.time}
                  </div>
                  <div className="flex items-center text-sm font-medium text-green-600">
                    <DollarSign size={16} className="mr-2" />
                    {job.salary}
                  </div>
                </div>

                <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                  Ứng tuyển ngay
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
