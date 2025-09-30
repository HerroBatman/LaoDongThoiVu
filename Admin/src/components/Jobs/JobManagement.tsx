import React, { useEffect, useState } from "react";
import {
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
  MapPin,
  Calendar,
  Users,
  DollarSign,
} from "lucide-react";
import { listAdminJobs, approveJob, rejectJob } from "../../lib/api";

export default function JobManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [approvingId, setApprovingId] = useState<string>("");
  const [toast, setToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [rejectingId, setRejectingId] = useState<string>("");
  const [rejectReason, setRejectReason] = useState<string>("");
  const [showReject, setShowReject] = useState<boolean>(false);

  const showToast = (type: 'success' | 'error', message: string, duration = 2500) => {
    setToast({ type, message });
    window.setTimeout(() => setToast(null), duration);
  };

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await listAdminJobs({ status: statusFilter !== 'all' ? statusFilter : '', search: searchTerm || '' });
      if (res.success) setJobs(res.data || []);
      else setError(res.message || 'Lỗi khi tải công việc');
    } catch (e: any) {
      setError(e.message || 'Lỗi khi tải công việc');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, [statusFilter, searchTerm]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "open":
        return (
          <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
            Đã duyệt
          </span>
        );
      case "draft":
        return (
          <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">
            Nháp
          </span>
        );
      case "closed":
        return (
          <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">
            Đã đóng
          </span>
        );
      case "recruiting":
        return (
          <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
            Đang tuyển
          </span>
        );
      case "full":
        return (
          <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
            Đủ người
          </span>
        );
      case "completed":
        return (
          <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">
            Hoàn thành
          </span>
        );
      case "violation":
        return (
          <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full">
            Vi phạm
          </span>
        );
      default:
        return null;
    }
  };

  const ActionButton = ({ icon: Icon, label, color, onClick }: any) => (
    <button
      onClick={onClick}
      className={`p-2 rounded-lg ${color} transition-colors`}
      title={label}
    >
      <Icon size={16} />
    </button>
  );

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Quản lý công việc</h1>
        <div></div>
      </div>

      {/* Filters */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-md">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={20}
          />
          <input
            type="text"
            placeholder="Tìm kiếm công việc..."
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
          <option value="recruiting">Đang tuyển</option>
          <option value="full">Đủ người</option>
          <option value="completed">Hoàn thành</option>
          <option value="violation">Vi phạm</option>
        </select>
        <select className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent">
          <option value="all">Tất cả ngành nghề</option>
          <option value="restaurant">Nhà hàng - Khách sạn</option>
          <option value="construction">Xây dựng</option>
          <option value="logistics">Logistics</option>
          <option value="event">Sự kiện</option>
        </select>
      </div>

      {/* Jobs Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {jobs.map((job: any) => (
          <div
            key={job._id}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {job.title}
                </h3>
                <p className="text-sm text-gray-600 mb-2">{job.employer?.name || ''}</p>
                {getStatusBadge(job.status)}
              </div>
              <div className="flex items-center space-x-1">
                <ActionButton
                  icon={Eye}
                  label="Xem chi tiết"
                  color="text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                />
                {job.status !== 'open' && (
                  <button
                    onClick={async () => {
                      try {
                        setApprovingId(job._id);
                        const res = await approveJob(job._id);
                        showToast('success', res?.message || 'Đã duyệt công việc');
                        await load();
                      } catch (e: any) {
                        showToast('error', e?.message || 'Lỗi khi duyệt công việc');
                      } finally {
                        setApprovingId("");
                      }
                    }}
                    disabled={approvingId === job._id}
                    className="px-3 py-1 rounded-lg text-sm font-medium bg-green-600 text-white hover:bg-green-700 disabled:opacity-50"
                    title="Duyệt công việc"
                  >{approvingId === job._id ? 'Đang duyệt...' : 'Duyệt'}</button>
                )}
                {job.status !== 'open' && (
                  <button
                    onClick={() => { setRejectingId(job._id); setShowReject(true); setRejectReason(""); }}
                    className="ml-2 px-3 py-1 rounded-lg text-sm font-medium bg-red-600 text-white hover:bg-red-700"
                    title="Từ chối công việc"
                  >Từ chối</button>
                )}
                {job.status === "violation" && (
                  <ActionButton
                    icon={Trash2}
                    label="Gỡ bỏ"
                    color="text-gray-600 hover:text-red-600 hover:bg-red-50"
                  />
                )}
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center text-sm text-gray-600">
                <MapPin size={16} className="mr-2" />
                {job.address || job.location}
              </div>

              <div className="flex items-center text-sm text-gray-600">
                <Calendar size={16} className="mr-2" />
                {job.startDate ? new Date(job.startDate).toLocaleDateString('vi-VN') : ''} - {job.endDate ? new Date(job.endDate).toLocaleDateString('vi-VN') : ''}
              </div>

              <div className="flex items-center text-sm text-gray-600">
                <Users size={16} className="mr-2" />
                {job.workersNeeded || 0} người
              </div>

              <div className="flex items-center text-sm text-gray-600">
                <DollarSign size={16} className="mr-2" />
                {job.salaryText || ''}
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">{job.category}</span>
                <div className="flex items-center space-x-2">
                  {job.status === "recruiting" && (
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                  )}
                  {job.status === "violation" && (
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-600">Đang tuyển</p>
              <p className="text-2xl font-bold text-blue-900">324</p>
            </div>
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
              <Users size={16} className="text-white" />
            </div>
          </div>
        </div>

        <div className="bg-green-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-600">Đủ người</p>
              <p className="text-2xl font-bold text-green-900">156</p>
            </div>
            <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
              <Users size={16} className="text-white" />
            </div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Hoàn thành</p>
              <p className="text-2xl font-bold text-gray-900">1,247</p>
            </div>
            <div className="w-8 h-8 bg-gray-500 rounded-lg flex items-center justify-center">
              <Users size={16} className="text-white" />
            </div>
          </div>
        </div>

        <div className="bg-red-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-red-600">Vi phạm</p>
              <p className="text-2xl font-bold text-red-900">23</p>
            </div>
            <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center">
              <Users size={16} className="text-white" />
            </div>
          </div>
        </div>
      </div>
      {toast && (
        <div className={`fixed right-4 top-4 z-50 px-4 py-3 rounded-lg shadow ${toast.type === 'success' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`}>
          {toast.message}
        </div>
      )}
      {showReject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-3">Lý do từ chối</h3>
            <textarea
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              rows={4}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Nhập lý do từ chối..."
            />
            <div className="mt-4 flex justify-end space-x-2">
              <button onClick={() => setShowReject(false)} className="px-4 py-2 border rounded-lg">Hủy</button>
              <button
                disabled={!rejectReason.trim()}
                onClick={async () => {
                  try {
                    if (!rejectingId) return;
                    const res = await rejectJob(rejectingId, rejectReason);
                    showToast('success', res?.message || 'Đã từ chối công việc');
                    setShowReject(false);
                    setRejectingId("");
                    setRejectReason("");
                    await load();
                  } catch (e: any) {
                    showToast('error', e?.message || 'Lỗi khi từ chối');
                  }
                }}
                className="px-4 py-2 bg-red-600 text-white rounded-lg disabled:opacity-50"
              >Từ chối</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
