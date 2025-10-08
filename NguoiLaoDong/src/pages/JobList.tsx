import { useEffect, useState } from "react";
import { Search, MapPin, Clock, DollarSign } from "lucide-react";
import { listOpenJobs, applyToJob } from "../lib/api";

const JobList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    category: "",
    area: "",
    time: "",
    salary: "",
  });

  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [applyingId, setApplyingId] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await listOpenJobs({ strictOnly: true });
        if (res.success) setJobs(res.data || []);
        else setError(res.message || 'Lỗi khi tải việc làm');
      } catch (e: any) {
        setError(e.message || 'Lỗi khi tải việc làm');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">
          Danh sách công việc
        </h1>
        <p className="text-gray-600">{jobs.length} việc làm phù hợp</p>
      </div>

      {loading && (
        <div className="text-gray-600">Đang tải việc làm...</div>
      )}
      {!!error && (
        <div className="text-red-600">{error}</div>
      )}

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Tìm kiếm việc làm..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <select
              value={filters.category}
              onChange={(e) =>
                setFilters({ ...filters, category: e.target.value })
              }
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Tất cả ngành nghề</option>
              <option value="service">Phục vụ</option>
              <option value="warehouse">Kho bãi</option>
              <option value="sales">Bán hàng</option>
              <option value="delivery">Giao hàng</option>
              <option value="cleaning">Vệ sinh</option>
            </select>

            <select
              value={filters.area}
              onChange={(e) => setFilters({ ...filters, area: e.target.value })}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Tất cả khu vực</option>
              <option value="q1">Quận 1</option>
              <option value="q3">Quận 3</option>
              <option value="q5">Quận 5</option>
              <option value="q7">Quận 7</option>
              <option value="q9">Quận 9</option>
            </select>

            <select
              value={filters.time}
              onChange={(e) => setFilters({ ...filters, time: e.target.value })}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Tất cả thời gian</option>
              <option value="morning">Ca sáng</option>
              <option value="afternoon">Ca chiều</option>
              <option value="evening">Ca tối</option>
            </select>

            <select
              value={filters.salary}
              onChange={(e) =>
                setFilters({ ...filters, salary: e.target.value })
              }
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Tất cả mức lương</option>
              <option value="100-150">100k - 150k</option>
              <option value="150-200">150k - 200k</option>
              <option value="200+">Trên 200k</option>
            </select>
          </div>
        </div>
      </div>

      {/* Job Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {jobs.map((job: any) => (
          <div
            key={job._id}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow relative"
          >
            {false && (
              <span className="absolute top-4 right-4 bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full font-medium">
                Gấp
              </span>
            )}

            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 text-lg mb-2">
                  {job.title}
                </h3>
                <div className="flex items-center space-x-2 mb-2">
                  <p className="text-gray-600 font-medium">{job.employer?.name || 'Nhà tuyển dụng'}</p>
                </div>
                <p className="text-sm text-gray-600">{job.description}</p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin size={16} className="mr-2 text-gray-400" />
                  {job.address || job.location}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Clock size={16} className="mr-2 text-gray-400" />
                  {job.startTime && job.endTime ? `${job.startTime} - ${job.endTime}` : ''}
                </div>
                <div className="flex items-center text-sm font-medium text-green-600">
                  <DollarSign size={16} className="mr-2" />
                  {job.salaryText || ''}
                </div>
              </div>

              <button
                onClick={async () => {
                  if (applyingId) return;
                  setApplyingId(job._id);
                  try {
                    const res = await applyToJob(job._id);
                    if (res.success) {
                      alert("Ứng tuyển thành công và đã thêm vào lịch làm việc");
                    }
                  } catch (e: any) {
                    alert(e?.message || "Ứng tuyển thất bại");
                  } finally {
                    setApplyingId(null);
                  }
                }}
                disabled={applyingId === job._id}
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-60"
              >
                {applyingId === job._id ? "Đang xử lý..." : "Ứng tuyển ngay"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Load More */}
      <div className="text-center">
        <button className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
          Xem thêm việc làm
        </button>
      </div>
    </div>
  );
};

export default JobList;
