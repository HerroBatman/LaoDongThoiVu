# Admin Panel - LaborHire

Giao diện quản trị cho hệ thống LaborHire.

## 🚀 Cài đặt và chạy

### 1. Cài đặt dependencies
```bash
cd Admin
npm install
```

### 2. Cấu hình môi trường
Tạo file `.env` trong thư mục Admin:
```env
VITE_API_BASE_URL=http://localhost:8080/api/v1
```

### 3. Chạy ứng dụng
```bash
npm run dev
```

Ứng dụng sẽ chạy tại: `http://localhost:5173`

## 🔐 Đăng nhập Admin

### Tạo Admin mặc định
Trước khi đăng nhập, cần tạo admin mặc định trong database:

```bash
# Từ thư mục server
npm run create-admin
```

### Thông tin đăng nhập mặc định
- **Email**: `admin@laborhire.com`
- **Password**: `admin123`
- **Role**: Super Admin (có tất cả quyền)

## 📱 Tính năng

### Dashboard
- Thống kê tổng quan hệ thống
- Biểu đồ và báo cáo
- Hoạt động gần đây
- AI Assistant

### Quản lý tài khoản
- Quản lý người lao động
- Quản lý nhà tuyển dụng
- Duyệt/khoá tài khoản
- Reset mật khẩu

### Quản lý công việc
- Xem danh sách công việc
- Chỉnh sửa/xóa công việc
- Theo dõi trạng thái

### Theo dõi tiến độ
- Check-in/check-out realtime
- Quản lý ca làm việc
- Can thiệp khi cần

### Hợp đồng & Thanh toán
- Quản lý hợp đồng dịch vụ
- Theo dõi thanh toán
- Báo cáo doanh thu

### Xử lý khiếu nại
- Danh sách khiếu nại
- Phân loại mức độ
- Giải quyết khiếu nại

### Điểm uy tín
- Đánh giá người lao động
- Đánh giá nhà tuyển dụng
- Báo cáo vi phạm

### Thống kê & Báo cáo
- Báo cáo doanh thu
- Thống kê người dùng
- Xuất báo cáo

## 🛠️ Công nghệ sử dụng

- **React 18** + **TypeScript**
- **TailwindCSS** cho UI
- **Lucide React** cho icons
- **React Router** cho navigation
- **Recharts** cho biểu đồ

## 🔒 Bảo mật

- JWT Authentication
- Protected Routes
- Role-based permissions
- Account lockout after failed attempts
- Password hashing với bcrypt

## 📁 Cấu trúc thư mục

```
Admin/
├── src/
│   ├── components/          # React components
│   │   ├── Dashboard/       # Dashboard components
│   │   ├── Layout/          # Layout components
│   │   ├── Accounts/        # Account management
│   │   ├── Jobs/           # Job management
│   │   └── ...
│   ├── lib/                # Utilities và API
│   ├── pages/              # Page components
│   └── App.tsx             # Main app component
├── public/                 # Static files
└── package.json
```
