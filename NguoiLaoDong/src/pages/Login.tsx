import { useState, FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { employerLogin } from '../lib/api'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setMessage('')
    if (!email || !password) {
      setMessage('Vui lòng nhập email và mật khẩu.')
      return
    }
    if (password.length < 6) {
      setMessage('Mật khẩu phải có ít nhất 6 ký tự.')
      return
    }
    try {
      setLoading(true)
      const res = await employerLogin({ email, password })
      if (res?.success !== false) {
        navigate('/')
      } else {
        setMessage(res?.message || 'Đăng nhập thất bại')
      }
    } catch (err: any) {
      setMessage(err?.message || 'Đăng nhập thất bại')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#eef5ff] px-4">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center text-2xl font-bold">👤</div>
          <div className="mt-2 text-2xl font-semibold text-gray-900">LaborHire</div>
        </div>

        <div className="bg-white shadow-lg rounded-xl p-6">
          <h1 className="text-center text-2xl font-bold mb-1">Đăng nhập</h1>
          <p className="text-center text-sm text-gray-500 mb-6">Chào mừng bạn trở lại!</p>

          {message && (
            <div className="mb-4 text-sm text-blue-700 bg-blue-50 border border-blue-200 rounded px-3 py-2 text-center">
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <div className="relative">
                <input
                  id="email"
                  type="email"
                  className="block w-full h-12 rounded-lg border border-gray-200 bg-gray-50 pl-10 pr-4 placeholder-gray-400 shadow-sm transition focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  placeholder="Nhập email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">✉️</span>
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Mật khẩu</label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  className="block w-full h-12 rounded-lg border border-gray-200 bg-gray-50 pr-10 pl-4 placeholder-gray-400 shadow-sm transition focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  placeholder="Nhập mật khẩu"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button type="button" className="absolute inset-y-0 right-0 px-3 text-gray-500 hover:text-gray-700" onClick={() => setShowPassword(v => !v)}>
                  {showPassword ? '🙈' : '👁️'}
                </button>
              </div>
            </div>

            <div className="text-right -mt-2">
              <button type="button" className="text-sm text-blue-600 hover:underline">Quên mật khẩu?</button>
            </div>

            <button
              type="submit"
              className="w-full inline-flex justify-center items-center px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-60"
              disabled={loading}
            >
              {loading ? 'Đang xử lý...' : 'Đăng nhập'}
            </button>
          </form>

          <div className="text-center text-sm text-gray-600 mt-4">
            Chưa có tài khoản? <Link to="/register" className="text-blue-600 hover:underline">Đăng ký ngay</Link>
          </div>
        </div>

        <div className="text-center text-sm text-blue-600 mt-4">
          <Link to="/" className="hover:underline">← Quay lại trang chủ</Link>
        </div>
      </div>
    </div>
  )
}
