import React, { useState } from "react";
import { Camera, Upload, CheckCircle, AlertCircle, Clock } from "lucide-react";

const PersonalProfile = () => {
  const [profileStatus, setProfileStatus] = useState<
    "incomplete" | "pending" | "approved"
  >("pending");
  const [formData, setFormData] = useState({
    name: "Nguyễn Văn An",
    dateOfBirth: "1995-05-15",
    idNumber: "023456789012",
    phone: "0901234567",
    email: "nguyenvanan@email.com",
    address: "123 Nguyễn Văn Linh, Quận 7, TP.HCM",
  });

  const statusConfig = {
    incomplete: {
      icon: AlertCircle,
      color: "text-red-600",
      bgColor: "bg-red-50",
      text: "Hồ sơ chưa hoàn thiện",
      description: "Vui lòng hoàn thiện thông tin để có thể ứng tuyển việc làm",
    },
    pending: {
      icon: Clock,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
      text: "Đang chờ duyệt",
      description:
        "Hồ sơ của bạn đang được xem xét, chúng tôi sẽ phản hồi trong 24h",
    },
    approved: {
      icon: CheckCircle,
      color: "text-green-600",
      bgColor: "bg-green-50",
      text: "Đã được duyệt",
      description:
        "Hồ sơ của bạn đã được phê duyệt và có thể ứng tuyển việc làm",
    },
  };

  const currentStatus = statusConfig[profileStatus];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Hồ sơ cá nhân</h1>
      </div>

      {/* Status Bar */}
      <div
        className={`rounded-lg p-4 ${currentStatus.bgColor} border border-gray-200`}
      >
        <div className="flex items-center space-x-3">
          <currentStatus.icon size={24} className={currentStatus.color} />
          <div>
            <h3 className={`font-semibold ${currentStatus.color}`}>
              {currentStatus.text}
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              {currentStatus.description}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            Thông tin cá nhân
          </h2>
        </div>

        <div className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Avatar Section */}
            <div className="flex flex-col items-center space-y-4">
              <div className="relative">
                <div className="w-32 h-32 bg-gray-300 rounded-full flex items-center justify-center overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-3xl font-bold">
                    AN
                  </div>
                </div>
                <button className="absolute bottom-0 right-0 p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors">
                  <Camera size={16} />
                </button>
              </div>
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                Thay đổi ảnh đại diện
              </button>
            </div>

            {/* Form Section */}
            <div className="flex-1">
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Họ và tên *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Ngày sinh *
                    </label>
                    <input
                      type="date"
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Số CMND/CCCD *
                  </label>
                  <input
                    type="text"
                    name="idNumber"
                    value={formData.idNumber}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Số điện thoại *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Địa chỉ *
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Giấy tờ tùy thân
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                    <Upload className="mx-auto h-12 w-12 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-600">
                      Kéo thả file hoặc{" "}
                      <span className="text-blue-600 font-medium cursor-pointer hover:underline">
                        chọn file
                      </span>
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      PNG, JPG, PDF (Max: 5MB)
                    </p>
                  </div>
                </div>

                <div className="flex justify-end space-x-3 pt-4">
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
                    Lưu thông tin
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalProfile;
