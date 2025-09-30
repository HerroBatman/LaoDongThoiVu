import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Shield, CheckCircle, AlertCircle, Loader2 } from "lucide-react";

export default function Setup() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const createDefaultAdmin = async () => {
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const response = await fetch('/api/v1/admin/create-default', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const result = await response.json();

      if (result.success) {
        setMessage("✅ Admin mặc định đã được tạo thành công!");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        setError(result.message || "Có lỗi xảy ra khi tạo admin");
      }
    } catch (error: any) {
      setError("Không thể kết nối đến server. Vui lòng kiểm tra kết nối.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <div className="mx-auto w-20 h-20 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-2xl mb-6">
            <Shield className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">
            Setup Admin
          </h1>
          <p className="text-blue-200 text-lg">
            Thiết lập tài khoản quản trị đầu tiên
          </p>
        </div>

        {/* Setup Card */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-white mb-2">Tạo Admin Mặc định</h2>
            <p className="text-blue-200">
              Tạo tài khoản quản trị viên đầu tiên cho hệ thống
            </p>
          </div>

          {/* Success Message */}
          {message && (
            <div className="mb-6 p-4 bg-green-500/20 border border-green-500/50 rounded-xl">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <p className="text-green-200 text-sm font-medium">{message}</p>
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-xl">
              <div className="flex items-center space-x-2">
                <AlertCircle className="w-5 h-5 text-red-400" />
                <p className="text-red-200 text-sm font-medium">{error}</p>
              </div>
            </div>
          )}

          <div className="space-y-6">
            {/* Admin Info */}
            <div className="bg-blue-500/20 border border-blue-500/50 rounded-xl p-4">
              <h3 className="text-blue-200 font-medium mb-3">Thông tin Admin sẽ được tạo:</h3>
              <div className="space-y-2 text-sm text-blue-300">
                <div className="flex justify-between">
                  <span>Email:</span>
                  <span className="font-medium">admin@laborhire.com</span>
                </div>
                <div className="flex justify-between">
                  <span>Password:</span>
                  <span className="font-medium">admin123</span>
                </div>
                <div className="flex justify-between">
                  <span>Tên:</span>
                  <span className="font-medium">Super Admin</span>
                </div>
                <div className="flex justify-between">
                  <span>Quyền:</span>
                  <span className="font-medium">Tất cả quyền</span>
                </div>
              </div>
            </div>

            {/* Setup Button */}
            <button
              onClick={createDefaultAdmin}
              disabled={loading || message}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-transparent transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Đang tạo Admin...
                </>
              ) : message ? (
                "✅ Hoàn thành"
              ) : (
                "Tạo Admin Mặc định"
              )}
            </button>

            {/* Login Link */}
            <div className="text-center">
              <button
                onClick={() => navigate("/login")}
                className="text-blue-300 hover:text-white text-sm font-medium transition-colors"
              >
                Đã có tài khoản? Đăng nhập →
              </button>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-sm text-blue-300">
              Hệ thống quản trị LaborHire v1.0
            </p>
            <p className="text-xs text-blue-400 mt-1">
              © 2024 LaborHire. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
