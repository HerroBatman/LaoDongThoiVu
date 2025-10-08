import React, { useEffect, useState } from "react";
import {
  Users,
  Clock,
  CheckCircle,
  AlertCircle,
  MessageSquare,
  Star,
  MapPin,
  Calendar,
  BarChart3,
} from "lucide-react";
import { listJobsProgressApi, markApplicationAttendanceApi } from "../services/authApi";

const JobProgress: React.FC = () => {
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [toast, setToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await listJobsProgressApi();
        if (res.success) {
          setJobs(res.data || []);
          if (!selectedJobId && res.data && res.data.length) setSelectedJobId(res.data[0]._id);
        } else {
          setError(res.message || "Không tải được danh sách công việc");
        }
      } catch (e: any) {
        setError(e.message || "Không tải được danh sách công việc");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const currentJob = jobs.find((job) => job._id === selectedJobId) || jobs[0];

  // ---- Time helpers ----
  const toMinutes = (hhmm?: string) => {
    if (!hhmm || !/^\d{2}:\d{2}$/.test(hhmm)) return null;
    const [h, m] = hhmm.split(":").map((n: string) => parseInt(n, 10));
    return h * 60 + m;
  };
  const isSameDate = (iso?: string) => {
    if (!iso) return false;
    const d = new Date(iso);
    const now = new Date();
    return d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth() && d.getDate() === now.getDate();
  };
  const getJobTimeStatus = (job: any): 'upcoming' | 'in_progress' | 'ended' | 'unknown' => {
    if (!job) return 'unknown';
    const now = new Date();
    const nowMin = now.getHours() * 60 + now.getMinutes();
    const sameDay = isSameDate(job.startDate);
    const startMin = toMinutes(job.startTime);
    const endMin = toMinutes(job.endTime);
    if (!sameDay || startMin == null || endMin == null) return 'unknown';
    if (nowMin < startMin) return 'upcoming';
    if (nowMin >= startMin && nowMin < endMin) return 'in_progress';
    if (nowMin >= endMin) return 'ended';
    return 'unknown';
  };
  const jobStatus = getJobTimeStatus(currentJob);

  const onCheckIn = async (appId: string) => {
    try {
      await markApplicationAttendanceApi(appId, 'checkin');
      // refresh list
      const res = await listJobsProgressApi();
      if (res.success) setJobs(res.data || []);
      setToast({ type: 'success', message: 'Check-in thành công' });
      window.setTimeout(() => setToast(null), 2000);
    } catch {}
  };
  const onCheckOut = async (appId: string) => {
    try {
      await markApplicationAttendanceApi(appId, 'checkout');
      const res = await listJobsProgressApi();
      if (res.success) setJobs(res.data || []);
      setToast({ type: 'success', message: 'Check-out thành công' });
      window.setTimeout(() => setToast(null), 2000);
    } catch {}
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "checked-in":
        return "bg-green-100 text-green-800";
      case "checked-out":
        return "bg-blue-100 text-blue-800";
      case "not-arrived":
        return "bg-red-100 text-red-800";
      case "confirmed":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const completionRate = 0;
  const attendanceRate = 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Theo dõi tiến độ công việc</h1>
        <p className="text-gray-600 mt-2">Giám sát lao động và tiến độ thực hiện công việc</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Job List */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-4">Danh sách công việc</h3>
          {loading && <div className="text-gray-600">Đang tải...</div>}
          {error && <div className="text-red-600">{error}</div>}
          <div className="space-y-3">
            {jobs.map((job) => (
              <button
                key={job._id}
                onClick={() => setSelectedJobId(job._id)}
                className={`w-full text-left p-3 rounded-lg border transition-all ${
                  selectedJobId === job._id
                    ? "border-blue-500 bg-blue-50 text-blue-700"
                    : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                }`}
              >
                <div className="font-medium text-sm mb-1">{job.title}</div>
                <div className="text-xs text-gray-500 flex items-center">
                  <Calendar className="w-3 h-3 mr-1" />
                  {job.startDate ? new Date(job.startDate).toLocaleDateString("vi-VN") : "—"}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3 space-y-6">
          {/* Job Overview */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">{currentJob?.title || "—"}</h2>
                <div className="space-y-1 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    {currentJob?.startDate ? new Date(currentJob.startDate).toLocaleDateString("vi-VN") : "—"} • {currentJob?.startTime || "—"} - {currentJob?.endTime || "—"}
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-2" />
                    {currentJob?.address || currentJob?.location || "—"}
                  </div>
                  <div className="flex items-center">
                    <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${
                      jobStatus === 'in_progress' ? 'bg-green-100 text-green-700' : jobStatus === 'upcoming' ? 'bg-amber-100 text-amber-700' : jobStatus === 'ended' ? 'bg-gray-100 text-gray-700' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {jobStatus === 'in_progress' ? 'Đang diễn ra' : jobStatus === 'upcoming' ? 'Sắp diễn ra' : jobStatus === 'ended' ? 'Đã kết thúc' : 'Không xác định'}
                    </span>
                  </div>
                </div>
              </div>
              <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <MessageSquare className="w-4 h-4" />
                <span>Gửi thông báo</span>
              </button>
            </div>

            {/* Progress Stats (placeholder since no realtime) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-blue-600">Tỷ lệ hoàn thành</p>
                    <p className="text-2xl font-bold text-blue-700">{completionRate.toFixed(0)}%</p>
                  </div>
                  <BarChart3 className="w-8 h-8 text-blue-500" />
                </div>
              </div>

              <div className="bg-green-50 p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-green-600">Tỷ lệ có mặt</p>
                    <p className="text-2xl font-bold text-green-700">{attendanceRate.toFixed(0)}%</p>
                  </div>
                  <Users className="w-8 h-8 text-green-500" />
                </div>
              </div>

              <div className="bg-orange-50 p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-orange-600">Lao động</p>
                    <p className="text-2xl font-bold text-orange-700">{(currentJob?.applicants?.length || 0)}</p>
                  </div>
                  <Clock className="w-8 h-8 text-orange-500" />
                </div>
              </div>
            </div>
          </div>

          {/* Workers List */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Danh sách lao động</h3>
            <div className="space-y-4">
              {(!currentJob?.applicants || currentJob.applicants.length === 0) && (
                <div className="text-gray-600">Chưa có ai ứng tuyển</div>
              )}
              {(currentJob?.applicants || []).map((app: any) => (
                <div
                  key={app._id}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-600">
                      <Users className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{app.worker?.name || "—"}</h4>
                      <div className="text-sm text-gray-500">{app.worker?.email || ""}</div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <span className="inline-flex px-3 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800">
                      {app.status || "đã ứng tuyển"}
                    </span>
                    {jobStatus === 'in_progress' && !app.checkInAt && (
                      <button onClick={() => onCheckIn(app._id)} className="px-2 py-1 bg-green-600 text-white rounded text-xs hover:bg-green-700">Check-in</button>
                    )}
                    {app.checkInAt && (
                      <span className="text-xs text-green-700">Đã check-in {new Date(app.checkInAt).toLocaleTimeString('vi-VN')}</span>
                    )}
                    {jobStatus === 'ended' && !app.checkOutAt && (
                      <button onClick={() => onCheckOut(app._id)} className="px-2 py-1 bg-gray-700 text-white rounded text-xs hover:bg-gray-800">Check-out</button>
                    )}
                    {app.checkOutAt && (
                      <span className="text-xs text-gray-700">Đã check-out {new Date(app.checkOutAt).toLocaleTimeString('vi-VN')}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Timeline (static examples) */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Timeline hoạt động</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm text-gray-700">Thông báo sẽ hiển thị tại đây</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {toast && (
        <div className={`fixed right-4 bottom-4 z-50 px-4 py-3 rounded-lg shadow ${toast.type === 'success' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`}>
          {toast.message}
        </div>
      )}
    </div>
  );
};

export default JobProgress;
