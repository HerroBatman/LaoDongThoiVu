import React, { useState } from "react";
import {
  Building2,
  User,
  Upload,
  CheckCircle,
  Clock,
  AlertCircle,
  Phone,
  Mail,
  MapPin,
  FileText,
} from "lucide-react";

const Profile: React.FC = () => {
  const [profileType, setProfileType] = useState<"personal" | "business">(
    "business"
  );
  const [verificationStatus, setVerificationStatus] = useState<
    "pending" | "approved" | "rejected"
  >("pending");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Hồ sơ Nhà tuyển dụng
        </h1>
        <p className="text-gray-600 mt-2">
          Quản lý thông tin và xác thực hồ sơ
        </p>
      </div>

      {/* Profile Type Selector */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Loại hình tuyển dụng
        </h2>
        <div className="flex space-x-4">
          <button
            onClick={() => setProfileType("personal")}
            className={`flex items-center space-x-3 p-4 rounded-lg border-2 transition-all ${
              profileType === "personal"
                ? "border-blue-500 bg-blue-50 text-blue-700"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <User className="w-6 h-6" />
            <div className="text-left">
              <div className="font-medium">Cá nhân</div>
              <div className="text-sm text-gray-500">
                Tuyển dụng cho hộ gia đình
              </div>
            </div>
          </button>
          <button
            onClick={() => setProfileType("business")}
            className={`flex items-center space-x-3 p-4 rounded-lg border-2 transition-all ${
              profileType === "business"
                ? "border-blue-500 bg-blue-50 text-blue-700"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <Building2 className="w-6 h-6" />
            <div className="text-left">
              <div className="font-medium">Doanh nghiệp</div>
              <div className="text-sm text-gray-500">Công ty, tổ chức</div>
            </div>
          </button>
        </div>
      </div>

      {/* Verification Status */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">
            Trạng thái xác thực
          </h2>
          <div
            className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium ${
              verificationStatus === "approved"
                ? "bg-green-100 text-green-800"
                : verificationStatus === "pending"
                ? "bg-yellow-100 text-yellow-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {verificationStatus === "approved" && (
              <CheckCircle className="w-4 h-4" />
            )}
            {verificationStatus === "pending" && <Clock className="w-4 h-4" />}
            {verificationStatus === "rejected" && (
              <AlertCircle className="w-4 h-4" />
            )}
            <span>
              {verificationStatus === "approved"
                ? "Đã duyệt"
                : verificationStatus === "pending"
                ? "Chờ duyệt"
                : "Bị từ chối"}
            </span>
          </div>
        </div>

        {verificationStatus === "pending" && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-yellow-800 text-sm">
              Hồ sơ của bạn đang được xem xét. Thời gian xử lý thường từ 1-3
              ngày làm việc.
            </p>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Profile Information */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            {profileType === "personal"
              ? "Thông tin cá nhân"
              : "Thông tin doanh nghiệp"}
          </h2>

          <form className="space-y-4">
            {profileType === "personal" ? (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Họ và tên <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Nhập họ và tên"
                    defaultValue="Nguyễn Văn An"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Số CCCD <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Nhập số CCCD"
                    defaultValue="001234567890"
                  />
                </div>
              </>
            ) : (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tên công ty <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Nhập tên công ty"
                    defaultValue="Công ty TNHH ABC"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Mã số thuế <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Nhập mã số thuế"
                    defaultValue="0123456789"
                  />
                </div>
              </>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Số điện thoại <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="tel"
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Nhập số điện thoại"
                  defaultValue="0901234567"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="email"
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Nhập email"
                  defaultValue="contact@company.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Địa chỉ <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <textarea
                  rows={3}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Nhập địa chỉ đầy đủ"
                  defaultValue="123 Đường ABC, Quận 1, TP.HCM"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Cập nhật thông tin
            </button>
          </form>
        </div>

        {/* Document Upload */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Giấy tờ xác thực
          </h2>

          <div className="space-y-4">
            {profileType === "personal" ? (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                <FileText className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-900 mb-1">
                  CCCD/CMND
                </p>
                <p className="text-xs text-gray-500 mb-3">
                  Tải lên ảnh mặt trước và mặt sau
                </p>
                <button className="flex items-center space-x-2 mx-auto px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-sm">
                  <Upload className="w-4 h-4" />
                  <span>Chọn file</span>
                </button>
              </div>
            ) : (
              <>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                  <FileText className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm font-medium text-gray-900 mb-1">
                    Giấy phép kinh doanh
                  </p>
                  <p className="text-xs text-gray-500 mb-3">
                    File PDF, JPG, PNG (Max 5MB)
                  </p>
                  <button className="flex items-center space-x-2 mx-auto px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-sm">
                    <Upload className="w-4 h-4" />
                    <span>Chọn file</span>
                  </button>
                </div>

                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                  <FileText className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm font-medium text-gray-900 mb-1">
                    Giấy chứng nhận MST
                  </p>
                  <p className="text-xs text-gray-500 mb-3">
                    File PDF, JPG, PNG (Max 5MB)
                  </p>
                  <button className="flex items-center space-x-2 mx-auto px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-sm">
                    <Upload className="w-4 h-4" />
                    <span>Chọn file</span>
                  </button>
                </div>
              </>
            )}

            {/* Uploaded Files */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-sm font-medium text-gray-900 mb-3">
                Tài liệu đã tải lên
              </h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-2 bg-white rounded border">
                  <div className="flex items-center space-x-2">
                    <FileText className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-700">
                      giay_phep_kd.pdf
                    </span>
                  </div>
                  <CheckCircle className="w-4 h-4 text-green-500" />
                </div>
                <div className="flex items-center justify-between p-2 bg-white rounded border">
                  <div className="flex items-center space-x-2">
                    <FileText className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-700">
                      chung_nhan_mst.pdf
                    </span>
                  </div>
                  <Clock className="w-4 h-4 text-yellow-500" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
