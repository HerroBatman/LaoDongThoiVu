import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Mail, Lock, Eye, EyeOff, Users, Loader2 } from 'lucide-react'
import { loginApi, registerApi, LoginRequest, RegisterRequest } from '../services/authApi'

export default function Login() {
  const [mode, setMode] = useState<'login' | 'register'>('login')
  const [email, setEmail] = useState('')
  const [recruiterName, setRecruiterName] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      if (mode === 'login') {
        // Handle login
        const loginData: LoginRequest = {
          email,
          password
        }

        const response = await loginApi(loginData)
        
        if (response.success && response.token) {
          // Store auth data
          localStorage.setItem('isLoggedIn', 'true')
          localStorage.setItem('authToken', response.token)
          localStorage.setItem('userEmail', email)
          localStorage.setItem('recruiterName', recruiterName)
          
          // Store user data if provided
          if (response.data) {
            localStorage.setItem('userData', JSON.stringify(response.data))
          }
          
          navigate('/dashboard')
        } else {
          setError(response.message || 'Đăng nhập thất bại')
        }
      } else {
        // Handle register
        const registerData: RegisterRequest = {
          email,
          password,
          name: recruiterName
        }

        const response = await registerApi(registerData)
        
        if (response.success) {
          setError('')
          alert('Đăng ký thành công! Vui lòng đăng nhập.')
          setMode('login')
          // Clear form
          setEmail('')
          setRecruiterName('')
          setPassword('')
        } else {
          setError(response.message || 'Đăng ký thất bại')
        }
      }
    } catch (error: any) {
      console.error('Auth error:', error)
      setError(error.message || 'Có lỗi xảy ra')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg mb-4">
            <Users className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {mode === 'login' ? 'Đăng nhập' : 'Đăng ký'}
          </h1>
          <p className="text-gray-600">
            {mode === 'login' ? 'Chào mừng bạn trở lại!' : 'Tạo tài khoản mới để bắt đầu'}
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
              <p className="text-red-700 text-sm font-medium">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder:text-gray-400"
                  placeholder="nhatuyendung@congty.com"
                />
              </div>
            </div>

            {/* Name Field */}
            <div>
              <label htmlFor="recruiterName" className="block text-sm font-medium text-gray-700 mb-2">
                {mode === 'login' ? 'Tên nhà tuyển dụng' : 'Họ và tên'}
              </label>
              <div className="relative">
                <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="recruiterName"
                  type="text"
                  value={recruiterName}
                  onChange={(e) => setRecruiterName(e.target.value)}
                  required
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder:text-gray-400"
                  placeholder={mode === 'login' ? 'VD: Nguyễn Văn A / Công ty ABC' : 'Nhập họ và tên'}
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Mật khẩu
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-11 pr-12 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder:text-gray-400"
                  placeholder="Nhập mật khẩu"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  {mode === 'login' ? 'Đang đăng nhập...' : 'Đang đăng ký...'}
                </>
              ) : (
                mode === 'login' ? 'Đăng nhập' : 'Đăng ký'
              )}
            </button>

            {/* Toggle Mode */}
            <div className="text-center">
              <button
                type="button"
                onClick={() => {
                  setMode(mode === 'login' ? 'register' : 'login')
                  setError('')
                }}
                className="text-blue-600 hover:text-blue-700 font-semibold text-sm"
              >
                {mode === 'login' ? 'Chưa có tài khoản? Đăng ký' : 'Đã có tài khoản? Đăng nhập'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
