import React, { useState, useEffect } from "react";
import {
  Search,
  Eye,
  Check,
  X,
  RotateCcw,
  Star,
  Clock,
  User,
  Building2,
  Loader2,
  AlertCircle,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import {
  getWorkers,
  getEmployers,
  approveAccount,
  rejectAccount,
  WorkerDto,
  EmployerDto,
  UserType,
} from "../../lib/api";

export default function AccountManagement() {
  const [activeTab, setActiveTab] = useState("workers");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [workers, setWorkers] = useState<WorkerDto[]>([]);
  const [employers, setEmployers] = useState<EmployerDto[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    pages: 0,
  });
  const [stats, setStats] = useState<any>(null);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<{id: string, userType: UserType} | null>(null);
  const [rejectReason, setRejectReason] = useState("");

  // Load data when component mounts or filters change
  useEffect(() => {
    loadData();
  }, [activeTab, searchTerm, statusFilter, pagination.page, pagination.limit]);

  const loadData = async () => {
    setLoading(true);
    setError("");
    try {
      if (activeTab === "workers") {
        const response = await getWorkers({
          page: pagination.page,
          limit: pagination.limit,
          search: searchTerm || undefined,
          status: statusFilter !== "all" ? statusFilter : undefined,
        });
        if (response.success) {
          setWorkers(response.data);
          setPagination(response.pagination);
          setStats(response.stats);
        } else {
          setError(response.message || "Lỗi khi tải danh sách người lao động");
        }
      } else {
        const response = await getEmployers({
          page: pagination.page,
          limit: pagination.limit,
          search: searchTerm || undefined,
          status: statusFilter !== "all" ? statusFilter : undefined,
        });
        if (response.success) {
          setEmployers(response.data);
          setPagination(response.pagination);
          setStats(response.stats);
        } else {
          setError(response.message || "Lỗi khi tải danh sách nhà tuyển dụng");
        }
      }
    } catch (err: any) {
      setError(err.message || "Lỗi khi tải dữ liệu");
    } finally {
      setLoading(false);
    }
  };

  const handleApproveAccount = async (id: string, userType: UserType) => {
    try {
      const response = await approveAccount(id, userType);
      if (response.success) {
        loadData(); // Reload data
      } else {
        setError(response.message || "Lỗi khi phê duyệt tài khoản");
      }
    } catch (err: any) {
      setError(err.message || "Lỗi khi phê duyệt tài khoản");
    }
  };

  const handleRejectAccount = async () => {
    if (!selectedAccount || !rejectReason.trim()) {
      setError("Vui lòng nhập lý do từ chối");
      return;
    }

    try {
      const response = await rejectAccount(selectedAccount.id, selectedAccount.userType, rejectReason);
      if (response.success) {
        setShowRejectModal(false);
        setRejectReason("");
        setSelectedAccount(null);
        loadData(); // Reload data
      } else {
        setError(response.message || "Lỗi khi từ chối tài khoản");
      }
    } catch (err: any) {
      setError(err.message || "Lỗi khi từ chối tài khoản");
    }
  };

  const handlePageChange = (newPage: number) => {
    setPagination(prev => ({ ...prev, page: newPage }));
  };

  const handleRefresh = () => {
    loadData();
  };

  const getStatusBadge = (status: boolean) => {
    if (status) {
      return (
        <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
          Hoạt động
        </span>
      );
    } else {
      return (
        <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">
          Chờ duyệt
        </span>
      );
    }
  };

  const ActionButton = ({ icon: Icon, label, color, onClick, variant = "icon" }: any) => (
    <button
      onClick={onClick}
      className={`${variant === "icon" 
        ? `p-2 rounded-lg ${color} transition-colors` 
        : `px-3 py-1 rounded-lg text-sm font-medium transition-colors ${color}`
      }`}
      title={label}
    >
      {variant === "icon" ? <Icon size={16} /> : (
        <div className="flex items-center space-x-1">
          <Icon size={14} />
          <span>{label}</span>
        </div>
      )}
    </button>
  );

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Quản lý tài khoản</h1>
          {stats && (
            <p className="text-sm text-gray-600 mt-1">
              Tổng: {stats.total} • Hoạt động: {stats.active} • Chờ duyệt: {stats.pending}
              {activeTab === "workers" && stats.avgTrustScore && (
                <span className="ml-2">• Điểm TB: {stats.avgTrustScore.toFixed(1)}</span>
              )}
            </p>
          )}
        </div>
        <button
          onClick={handleRefresh}
          disabled={loading}
          className="flex items-center space-x-2 px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
        >
          <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
          <span>Làm mới</span>
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center space-x-3">
          <AlertCircle className="text-red-500" size={20} />
          <span className="text-red-700">{error}</span>
          <button
            onClick={() => setError("")}
            className="text-red-500 hover:text-red-700 ml-auto"
          >
            <X size={16} />
          </button>
        </div>
      )}

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab("workers")}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === "workers"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            <div className="flex items-center space-x-2">
              <User size={16} />
              <span>Người lao động</span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab("employers")}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === "employers"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            <div className="flex items-center space-x-2">
              <Building2 size={16} />
              <span>Nhà tuyển dụng</span>
            </div>
          </button>
        </nav>
      </div>

      {/* Filters */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative flex-1 max-w-md">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Tìm kiếm theo tên, email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">Tất cả trạng thái</option>
            <option value="active">Hoạt động</option>
            <option value="pending">Chờ duyệt</option>
            <option value="blocked">Bị khóa</option>
          </select>
        </div>
        
        {/* Pending accounts count */}
        <div className="flex items-center space-x-2">
          <Clock className="text-yellow-500" size={20} />
          <span className="text-sm text-gray-600">
            Tài khoản chờ duyệt: 
            <span className={`font-semibold ml-1 ${
              (activeTab === "workers" 
                ? workers.filter(w => !w.status).length 
                : employers.filter(e => !e.status).length) > 0 
                ? "text-yellow-600" 
                : "text-green-600"
            }`}>
              {(activeTab === "workers" 
                ? workers.filter(w => !w.status).length 
                : employers.filter(e => !e.status).length)}
            </span>
          </span>
        </div>
      </div>

      {/* No pending accounts notification */}
      {!loading && (activeTab === "workers" 
        ? workers.filter(w => !w.status).length === 0 
        : employers.filter(e => !e.status).length === 0) && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center space-x-3">
          <Check className="text-green-500" size={20} />
          <span className="text-green-700">
            Tất cả tài khoản đã được phê duyệt! Không có tài khoản nào chờ duyệt.
          </span>
        </div>
      )}

      {/* Workers Table */}
      {activeTab === "workers" && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Thông tin
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Liên hệ
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Trạng thái
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Điểm uy tín
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Công việc
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Hành động
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {loading ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center">
                      <Loader2 className="mx-auto h-8 w-8 animate-spin text-blue-500" />
                      <p className="mt-2 text-gray-500">Đang tải dữ liệu...</p>
                    </td>
                  </tr>
                ) : workers.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center">
                      <p className="text-gray-500">Không có dữ liệu</p>
                    </td>
                  </tr>
                ) : (
                  workers.map((worker) => (
                    <tr key={worker._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {worker.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            ID: #{worker._id.slice(-8)}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {worker.email}
                        </div>
                        <div className="text-sm text-gray-500">
                          {worker.phone}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(worker.status)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <Star className="text-yellow-400 mr-1" size={16} />
                          <span className="text-sm font-medium">
                            {worker.trustScore || 0}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {new Date(worker.createdAt).toLocaleDateString('vi-VN')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          <ActionButton
                            icon={Eye}
                            label="Xem chi tiết"
                            color="text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                            onClick={() => {
                              // TODO: Implement view details modal
                            }}
                          />
                          {!worker.status && (
                            <>
                              <ActionButton
                                icon={Check}
                                label="Phê duyệt"
                                color="bg-green-500 hover:bg-green-600 text-white"
                                variant="button"
                                onClick={() => handleApproveAccount(worker._id, "worker")}
                              />
                              <ActionButton
                                icon={X}
                                label="Từ chối"
                                color="bg-red-500 hover:bg-red-600 text-white"
                                variant="button"
                                onClick={() => {
                                  setSelectedAccount({id: worker._id, userType: "worker"});
                                  setShowRejectModal(true);
                                }}
                              />
                            </>
                          )}
                          <ActionButton
                            icon={RotateCcw}
                            label="Reset mật khẩu"
                            color="text-gray-600 hover:text-yellow-600 hover:bg-yellow-50"
                            onClick={() => {
                              // TODO: Implement reset password
                            }}
                          />
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          
          {/* Pagination for Workers */}
          {activeTab === "workers" && pagination.pages > 1 && (
            <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
              <div className="flex-1 flex justify-between sm:hidden">
                <button
                  onClick={() => handlePageChange(pagination.page - 1)}
                  disabled={pagination.page <= 1}
                  className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                >
                  Trước
                </button>
                <button
                  onClick={() => handlePageChange(pagination.page + 1)}
                  disabled={pagination.page >= pagination.pages}
                  className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                >
                  Sau
                </button>
              </div>
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700">
                    Hiển thị <span className="font-medium">{((pagination.page - 1) * pagination.limit) + 1}</span> đến{' '}
                    <span className="font-medium">
                      {Math.min(pagination.page * pagination.limit, pagination.total)}
                    </span>{' '}
                    của <span className="font-medium">{pagination.total}</span> kết quả
                  </p>
                </div>
                <div>
                  <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                    <button
                      onClick={() => handlePageChange(pagination.page - 1)}
                      disabled={pagination.page <= 1}
                      className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    
                    {Array.from({ length: Math.min(5, pagination.pages) }, (_, i) => {
                      const pageNum = Math.max(1, Math.min(pagination.pages - 4, pagination.page - 2)) + i;
                      if (pageNum > pagination.pages) return null;
                      
                      return (
                        <button
                          key={pageNum}
                          onClick={() => handlePageChange(pageNum)}
                          className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                            pageNum === pagination.page
                              ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                              : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                    
                    <button
                      onClick={() => handlePageChange(pagination.page + 1)}
                      disabled={pagination.page >= pagination.pages}
                      className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Employers Table */}
      {activeTab === "employers" && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Thông tin
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Liên hệ
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    MST/CCCD
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Trạng thái
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Công việc đã đăng
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Hành động
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {loading ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center">
                      <Loader2 className="mx-auto h-8 w-8 animate-spin text-blue-500" />
                      <p className="mt-2 text-gray-500">Đang tải dữ liệu...</p>
                    </td>
                  </tr>
                ) : employers.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center">
                      <p className="text-gray-500">Không có dữ liệu</p>
                    </td>
                  </tr>
                ) : (
                  employers.map((employer) => (
                    <tr key={employer._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {employer.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            ID: #{employer._id.slice(-8)}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {employer.email}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {employer.phone}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(employer.status)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {new Date(employer.createdAt).toLocaleDateString('vi-VN')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          <ActionButton
                            icon={Eye}
                            label="Xem chi tiết"
                            color="text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                            onClick={() => {
                              // TODO: Implement view details modal
                            }}
                          />
                          {!employer.status && (
                            <>
                              <ActionButton
                                icon={Check}
                                label="Phê duyệt"
                                color="bg-green-500 hover:bg-green-600 text-white"
                                variant="button"
                                onClick={() => handleApproveAccount(employer._id, "employer")}
                              />
                              <ActionButton
                                icon={X}
                                label="Từ chối"
                                color="bg-red-500 hover:bg-red-600 text-white"
                                variant="button"
                                onClick={() => {
                                  setSelectedAccount({id: employer._id, userType: "employer"});
                                  setShowRejectModal(true);
                                }}
                              />
                            </>
                          )}
                          <ActionButton
                            icon={RotateCcw}
                            label="Reset mật khẩu"
                            color="text-gray-600 hover:text-yellow-600 hover:bg-yellow-50"
                            onClick={() => {
                              // TODO: Implement reset password
                            }}
                          />
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          
          {/* Pagination for Employers */}
          {activeTab === "employers" && pagination.pages > 1 && (
            <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
              <div className="flex-1 flex justify-between sm:hidden">
                <button
                  onClick={() => handlePageChange(pagination.page - 1)}
                  disabled={pagination.page <= 1}
                  className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                >
                  Trước
                </button>
                <button
                  onClick={() => handlePageChange(pagination.page + 1)}
                  disabled={pagination.page >= pagination.pages}
                  className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                >
                  Sau
                </button>
              </div>
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700">
                    Hiển thị <span className="font-medium">{((pagination.page - 1) * pagination.limit) + 1}</span> đến{' '}
                    <span className="font-medium">
                      {Math.min(pagination.page * pagination.limit, pagination.total)}
                    </span>{' '}
                    của <span className="font-medium">{pagination.total}</span> kết quả
                  </p>
                </div>
                <div>
                  <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                    <button
                      onClick={() => handlePageChange(pagination.page - 1)}
                      disabled={pagination.page <= 1}
                      className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    
                    {Array.from({ length: Math.min(5, pagination.pages) }, (_, i) => {
                      const pageNum = Math.max(1, Math.min(pagination.pages - 4, pagination.page - 2)) + i;
                      if (pageNum > pagination.pages) return null;
                      
                      return (
                        <button
                          key={pageNum}
                          onClick={() => handlePageChange(pageNum)}
                          className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                            pageNum === pagination.page
                              ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                              : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                    
                    <button
                      onClick={() => handlePageChange(pagination.page + 1)}
                      disabled={pagination.page >= pagination.pages}
                      className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Rejection Modal */}
      {showRejectModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Từ chối tài khoản</h3>
            <p className="text-gray-600 mb-4">
              Bạn có chắc chắn muốn từ chối tài khoản này?
            </p>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Lý do từ chối *
              </label>
              <textarea
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={3}
                placeholder="Nhập lý do từ chối..."
                required
              />
            </div>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => {
                  setShowRejectModal(false);
                  setRejectReason("");
                  setSelectedAccount(null);
                }}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Hủy
              </button>
              <button
                onClick={handleRejectAccount}
                disabled={!rejectReason.trim()}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50"
              >
                Từ chối
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
