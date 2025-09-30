import { useState, FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { employerRegister } from '../lib/api'

export default function Register() {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [gender, setGender] = useState<'male' | 'female' | 'other'>('male')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const validate = () => {
    if (!fullName || !email || !password || !confirmPassword) {
      setMessage('Vui lòng điền đầy đủ thông tin.')
      return false
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setMessage('Email không hợp lệ.')
      return false
    }
    if (password.length < 6) {
      setMessage('Mật khẩu phải có ít nhất 6 ký tự.')
      return false
    }
    if (password !== confirmPassword) {
      setMessage('Mật khẩu xác nhận không khớp.')
      return false
    }
    setMessage('')
    return true
  }

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    try {
      setLoading(true)
      const res = await employerRegister({ name: fullName, email, password, gender })
      if (res?.success !== false) {
        navigate('/')
      } else {
        setMessage(res?.message || 'Đăng ký thất bại')
      }
    } catch (err: any) {
      setMessage(err?.message || 'Đăng ký thất bại')
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
          <h1 className="text-center text-2xl font-bold mb-1">Đăng ký</h1>
          <p className="text-center text-sm text-gray-500 mb-6">Tạo tài khoản mới để bắt đầu</p>

          {message && (
            <div className="mb-4 text-sm text-blue-700 bg-blue-50 border border-blue-200 rounded px-3 py-2 text-center">
              {message}
            </div>
          )}

          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">Họ và tên</label>
              <input
                id="fullName"
                type="text"
                className="block w-full h-12 rounded-lg border border-gray-200 bg-gray-50 px-4 placeholder-gray-400 shadow-sm transition focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                placeholder="Nhập họ và tên"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                id="email"
                type="email"
                className="block w-full h-12 rounded-lg border border-gray-200 bg-gray-50 px-4 placeholder-gray-400 shadow-sm transition focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                placeholder="Nhập địa chỉ email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">Giới tính</label>
              <select
                id="gender"
                className="block w-full h-12 rounded-lg border border-gray-200 bg-gray-50 px-4 shadow-sm transition focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                value={gender}
                onChange={(e) => setGender(e.target.value as any)}
              >
                <option value="male">Nam</option>
                <option value="female">Nữ</option>
                <option value="other">Khác</option>
              </select>
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

            <div>
              <label htmlFor="confirm" className="block text-sm font-medium text-gray-700 mb-1">Xác nhận mật khẩu</label>
              <div className="relative">
                <input
                  id="confirm"
                  type={showConfirm ? 'text' : 'password'}
                  className="block w-full h-12 rounded-lg border border-gray-200 bg-gray-50 pr-10 pl-4 placeholder-gray-400 shadow-sm transition focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  placeholder="Nhập lại mật khẩu"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button type="button" className="absolute inset-y-0 right-0 px-3 text-gray-500 hover:text-gray-700" onClick={() => setShowConfirm(v => !v)}>
                  {showConfirm ? '🙈' : '👁️'}
                </button>
              </div>
            </div>

            <button type="submit" className="w-full inline-flex justify-center items-center px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-60" disabled={loading}>
              {loading ? 'Đang xử lý...' : 'Đăng ký'}
            </button>
          </form>

          <div className="text-center text-sm text-gray-600 mt-4">
            Đã có tài khoản? <Link to="/login" className="text-blue-600 hover:underline">Đăng nhập ngay</Link>
          </div>
        </div>

        <div className="text-center text-sm text-blue-600 mt-4">
          <Link to="/" className="hover:underline">← Quay lại trang chủ</Link>
        </div>
      </div>
    </div>
  )
}


