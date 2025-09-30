import React, { useState } from "react";
import {
  Users,
  Clock,
  CheckCircle,
  AlertCircle,
  MessageSquare,
  Star,
  MapPin,
  Calendar,
  BarChart3,
} from "lucide-react";

const JobProgress: React.FC = () => {
  const [selectedJob, setSelectedJob] = useState<number>(1);

  const jobs = [
    {
      id: 1,
      title: "Phụ bếp nhà hàng - Ca tối",
      date: "25/12/2024",
      time: "17:00 - 23:00",
      location: "123 Đường Nguyễn Thị Minh Khai, Q.1, TP.HCM",
      status: "active",
      workers: [
        {
          id: 1,
          name: "Nguyễn Văn An",
          avatar:
            "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
          rating: 4.8,
          status: "checked-in",
          statusText: "Đã check-in",
          checkinTime: "16:50",
        },
        {
          id: 2,
          name: "Trần Thị Bình",
          avatar:
            "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
          rating: 4.6,
          status: "checked-in",
          statusText: "Đã check-in",
          checkinTime: "16:55",
        },
        {
          id: 3,
          name: "Lê Minh Cường",
          avatar:
            "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
          rating: 4.9,
          status: "not-arrived",
          statusText: "Chưa đến",
          checkinTime: null,
        },
      ],
    },
    {
      id: 2,
      title: "Bốc vác kho hàng",
      date: "26/12/2024",
      time: "08:00 - 17:00",
      location: "456 Đường Lê Văn Sỹ, Q.3, TP.HCM",
      status: "scheduled",
      workers: [
        {
          id: 4,
          name: "Phạm Văn Đức",
          avatar:
            "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
          rating: 4.7,
          status: "confirmed",
          statusText: "Đã xác nhận",
          checkinTime: null,
        },
        {
          id: 5,
          name: "Hoàng Thị Lan",
          avatar:
            "https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
          rating: 4.5,
          status: "confirmed",
          statusText: "Đã xác nhận",
          checkinTime: null,
        },
      ],
    },
  ];

  const currentJob = jobs.find((job) => job.id === selectedJob) || jobs[0];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "checked-in":
        return "bg-green-100 text-green-800";
      case "checked-out":
        return "bg-blue-100 text-blue-800";
      case "not-arrived":
        return "bg-red-100 text-red-800";
      case "confirmed":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const completionRate =
    (currentJob.workers.filter(
      (w) => w.status === "checked-in" || w.status === "checked-out"
    ).length /
      currentJob.workers.length) *
    100;
  const attendanceRate =
    (currentJob.workers.filter((w) => w.status !== "not-arrived").length /
      currentJob.workers.length) *
    100;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Theo dõi tiến độ công việc
        </h1>
        <p className="text-gray-600 mt-2">
          Giám sát lao động và tiến độ thực hiện công việc
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Job List */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-4">
            Danh sách công việc
          </h3>
          <div className="space-y-3">
            {jobs.map((job) => (
              <button
                key={job.id}
                onClick={() => setSelectedJob(job.id)}
                className={`w-full text-left p-3 rounded-lg border transition-all ${
                  selectedJob === job.id
                    ? "border-blue-500 bg-blue-50 text-blue-700"
                    : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                }`}
              >
                <div className="font-medium text-sm mb-1">{job.title}</div>
                <div className="text-xs text-gray-500 flex items-center">
                  <Calendar className="w-3 h-3 mr-1" />
                  {job.date}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3 space-y-6">
          {/* Job Overview */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  {currentJob.title}
                </h2>
                <div className="space-y-1 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    {currentJob.date} • {currentJob.time}
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-2" />
                    {currentJob.location}
                  </div>
                </div>
              </div>
              <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <MessageSquare className="w-4 h-4" />
                <span>Gửi thông báo</span>
              </button>
            </div>

            {/* Progress Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-blue-600">
                      Tỷ lệ hoàn thành
                    </p>
                    <p className="text-2xl font-bold text-blue-700">
                      {completionRate.toFixed(0)}%
                    </p>
                  </div>
                  <BarChart3 className="w-8 h-8 text-blue-500" />
                </div>
              </div>

              <div className="bg-green-50 p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-green-600">
                      Tỷ lệ có mặt
                    </p>
                    <p className="text-2xl font-bold text-green-700">
                      {attendanceRate.toFixed(0)}%
                    </p>
                  </div>
                  <Users className="w-8 h-8 text-green-500" />
                </div>
              </div>

              <div className="bg-orange-50 p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-orange-600">
                      Lao động
                    </p>
                    <p className="text-2xl font-bold text-orange-700">
                      {currentJob.workers.length}
                    </p>
                  </div>
                  <Clock className="w-8 h-8 text-orange-500" />
                </div>
              </div>
            </div>
          </div>

          {/* Workers List */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Danh sách lao động
            </h3>
            <div className="space-y-4">
              {currentJob.workers.map((worker) => (
                <div
                  key={worker.id}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={worker.avatar}
                      alt={worker.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <h4 className="font-medium text-gray-900">
                        {worker.name}
                      </h4>
                      <div className="flex items-center space-x-3 mt-1">
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-sm text-gray-600 ml-1">
                            {worker.rating}
                          </span>
                        </div>
                        {worker.checkinTime && (
                          <div className="text-sm text-gray-500">
                            Check-in: {worker.checkinTime}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <span
                      className={`inline-flex px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(
                        worker.status
                      )}`}
                    >
                      {worker.statusText}
                    </span>

                    {worker.status === "not-arrived" && (
                      <button className="p-1 text-red-600 hover:text-red-800 hover:bg-red-50 rounded transition-colors">
                        <AlertCircle className="w-5 h-5" />
                      </button>
                    )}

                    {worker.status === "checked-in" && (
                      <button className="p-1 text-green-600 hover:text-green-800 hover:bg-green-50 rounded transition-colors">
                        <CheckCircle className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Timeline */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Timeline hoạt động
            </h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    Trần Thị Bình đã check-in
                  </p>
                  <p className="text-xs text-gray-500">16:55 - 5 phút trước</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    Nguyễn Văn An đã check-in
                  </p>
                  <p className="text-xs text-gray-500">16:50 - 10 phút trước</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    Công việc bắt đầu trong 1 giờ
                  </p>
                  <p className="text-xs text-gray-500">16:00 - 1 giờ trước</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobProgress;
