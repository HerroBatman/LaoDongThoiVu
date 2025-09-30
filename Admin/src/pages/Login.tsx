import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Shield, Lock, Mail, AlertCircle } from "lucide-react";
import { adminLogin } from "../lib/api";

export default function AdminLogin() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (error) setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await adminLogin(formData);
      
      if (response.success && response.token) {
        // Store auth data
        localStorage.setItem("admin_token", response.token);
        localStorage.setItem("admin_user", JSON.stringify(response.data));
        localStorage.setItem("isAdminLoggedIn", "true");
        
        navigate("/dashboard");
      } else {
        setError(response.message || "Đăng nhập thất bại");
      }
    } catch (error: any) {
      setError(error.message || "Có lỗi xảy ra khi đăng nhập");
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
            Admin Panel
          </h1>
          <p className="text-blue-200 text-lg">
            Quản trị hệ thống LaborHire
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-white mb-2">Đăng nhập</h2>
            <p className="text-blue-200">
              Nhập thông tin quản trị viên
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-xl">
              <div className="flex items-center space-x-2">
                <AlertCircle className="w-5 h-5 text-red-400" />
                <p className="text-red-200 text-sm font-medium">{error}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-blue-200 mb-2">
                Email quản trị
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-300" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full pl-11 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="admin@laborhire.com"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-blue-200 mb-2">
                Mật khẩu
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-300" />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className="w-full pl-11 pr-12 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Nhập mật khẩu"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-300 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 bg-white/10 border-white/20 rounded focus:ring-blue-500"
                />
                <span className="text-sm text-blue-200">Ghi nhớ đăng nhập</span>
              </label>
              <button
                type="button"
                className="text-sm text-blue-300 hover:text-white transition-colors"
              >
                Quên mật khẩu?
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-transparent transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                  Đang đăng nhập...
                </>
              ) : (
                "Đăng nhập"
              )}
            </button>
          </form>

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

        {/* Demo Credentials */}
        <div className="mt-6 bg-blue-500/20 border border-blue-500/50 rounded-xl p-4">
          <h3 className="text-blue-200 font-medium mb-2">Demo Credentials:</h3>
          <div className="text-sm text-blue-300 space-y-1">
            <p><strong>Email:</strong> admin@laborhire.com</p>
            <p><strong>Password:</strong> admin123</p>
          </div>
        </div>

        {/* Setup Link */}
        <div className="mt-4 text-center">
          <button
            onClick={() => navigate("/setup")}
            className="text-blue-300 hover:text-white text-sm font-medium transition-colors"
          >
            Chưa có admin? Tạo admin mặc định →
          </button>
        </div>
      </div>
    </div>
  );
}
