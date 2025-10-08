import React, { useEffect, useState } from "react";
import {
  Search,
  Filter,
  Calendar,
  MapPin,
  User,
  AlertTriangle,
  CheckCircle,
  Clock,
  Send,
} from "lucide-react";
import { getWorkProgress } from "../../lib/api";

export default function ProgressManagement() {
  const [selectedDate, setSelectedDate] = useState("");
  const [locationFilter, setLocationFilter] = useState("all");
  const [employerFilter, setEmployerFilter] = useState("all");

  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await getWorkProgress(selectedDate || undefined, {});
        if (res.success) setJobs(res.data || []);
        else setError(res.message || "Không tải được tiến độ");
      } catch (e: any) {
        setError(e.message || "Không tải được tiến độ");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [selectedDate]);

  const getWorkerStatusBadge = (status: string) => {
    switch (status) {
      case "checked-in":
        return (
          <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
            <CheckCircle size={12} className="mr-1" />
            Đã check-in
          </span>
        );
      case "checked-out":
        return (
          <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
            <CheckCircle size={12} className="mr-1" />
            Đã check-out
          </span>
        );
      case "not-arrived":
        return (
          <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full">
            <AlertTriangle size={12} className="mr-1" />
            Chưa đến
          </span>
        );
      default:
        return null;
    }
  };

  const getShiftStatus = (hasApplicants: boolean, applicantsCount: number) => {
    if (!hasApplicants) {
      return { status: "warning", text: "Chưa có ai ứng tuyển", color: "text-red-600" };
    }
    return { status: "active", text: `${applicantsCount} ứng viên`, color: "text-blue-600" };
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Quản lý tiến độ lao động</h1>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm text-gray-600">Cập nhật real-time</span>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Ngày</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Khu vực</label>
            <select
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
            >
              <option value="all">Tất cả khu vực</option>
              <option value="q1">Quận 1</option>
              <option value="q7">Quận 7</option>
              <option value="q2">Quận 2</option>
              <option value="q3">Quận 3</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Nhà tuyển dụng</label>
            <select
              value={employerFilter}
              onChange={(e) => setEmployerFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
            >
              <option value="all">Tất cả NTD</option>
            </select>
          </div>

          <div className="flex items-end">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors w-full">Lọc kết quả</button>
          </div>
        </div>
      </div>

      {/* Work Shifts */}
      <div className="space-y-6">
        {loading && <div className="text-gray-600">Đang tải...</div>}
        {error && <div className="text-red-600">{error}</div>}
        {jobs.map((job) => {
          const shiftStatus = getShiftStatus(!!job.applicants?.length, job.applicants?.length || 0);

          return (
            <div key={job._id} className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
                    <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                      <div className="flex items-center">
                        <User size={16} className="mr-1" />
                        {job.employer?.name || "Nhà tuyển dụng"}
                      </div>
                      <div className="flex items-center">
                        <MapPin size={16} className="mr-1" />
                        {job.address || job.location}
                      </div>
                      <div className="flex items-center">
                        <Clock size={16} className="mr-1" />
                        {(job.startTime || "—") + " - " + (job.endTime || "—")}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-sm font-medium ${shiftStatus.color}`}>{shiftStatus.text}</p>
                    <p className="text-xs text-gray-500 mt-1">{job.applicants?.length || 0} lao động</p>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-2 text-sm font-medium text-gray-700">Lao động</th>
                        <th className="text-left py-2 text-sm font-medium text-gray-700">Trạng thái</th>
                        <th className="text-left py-2 text-sm font-medium text-gray-700">Check-in</th>
                        <th className="text-left py-2 text-sm font-medium text-gray-700">Check-out</th>
                        <th className="text-left py-2 text-sm font-medium text-gray-700">Hành động</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {(job.applicants || []).map((app: any) => (
                        <tr key={app._id} className="hover:bg-gray-50">
                          <td className="py-3">
                            <div className="text-sm font-medium text-gray-900">{app.worker?.name || "—"}</div>
                            <div className="text-xs text-gray-500">{app.worker?.email || ""}</div>
                          </td>
                          <td className="py-3">
                            <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">đã ứng tuyển</span>
                          </td>
                          <td className="py-3 text-sm text-gray-900">-</td>
                          <td className="py-3 text-sm text-gray-900">-</td>
                          <td className="py-3">
                            <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">Liên hệ</button>
                          </td>
                        </tr>
                      ))}
                      {(!job.applicants || job.applicants.length === 0) && (
                        <tr>
                          <td colSpan={5} className="py-4 text-center text-gray-600">Chưa có ai ứng tuyển</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200 flex items-center justify-between">
                  <div className="text-sm text-gray-600">Cập nhật lần cuối: {new Date().toLocaleTimeString("vi-VN")}</div>
                  <button className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors">
                    <Send size={16} className="mr-2" />
                    Can thiệp
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Summary Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-600">Đang làm việc</p>
              <p className="text-2xl font-bold text-blue-900">127</p>
            </div>
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
              <CheckCircle size={16} className="text-white" />
            </div>
          </div>
        </div>

        <div className="bg-green-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-600">Hoàn thành</p>
              <p className="text-2xl font-bold text-green-900">89</p>
            </div>
            <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
              <CheckCircle size={16} className="text-white" />
            </div>
          </div>
        </div>

        <div className="bg-red-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-red-600">Chưa đến</p>
              <p className="text-2xl font-bold text-red-900">8</p>
            </div>
            <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center">
              <AlertTriangle size={16} className="text-white" />
            </div>
          </div>
        </div>

        <div className="bg-yellow-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-yellow-600">Cần can thiệp</p>
              <p className="text-2xl font-bold text-yellow-900">3</p>
            </div>
            <div className="w-8 h-8 bg-yellow-500 rounded-lg flex items-center justify-center">
              <AlertTriangle size={16} className="text-white" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
