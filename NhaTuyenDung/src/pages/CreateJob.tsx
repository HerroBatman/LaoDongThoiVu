import React, { useEffect, useState } from "react";
import {
  MapPin,
  Calendar,
  Clock,
  Users,
  DollarSign,
  Bot,
  Plus,
  Minus,
} from "lucide-react";
import { createJobApi, listEmployerSkillsApi } from "../services/authApi";

const CreateJob: React.FC = () => {
  const [jobType, setJobType] = useState("manual");
  const [requirements, setRequirements] = useState<string[]>([""]);
  const [skills, setSkills] = useState<any[]>([]);
  const [selectedSkillIds, setSelectedSkillIds] = useState<string[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [workersNeeded, setWorkersNeeded] = useState<number>(1);
  const [salaryText, setSalaryText] = useState("");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const showToast = (type: 'success' | 'error', message: string, duration = 2500) => {
    setToast({ type, message });
    window.setTimeout(() => setToast(null), duration);
  };

  useEffect(() => {
    const loadSkills = async () => {
      try {
        const res = await listEmployerSkillsApi();
        if (res.success) setSkills(res.data || []);
      } catch {}
    };
    loadSkills();
    // preset defaults matching placeholders
    setTitle("Phụ bếp nhà hàng - Ca tối");
    setDescription("Hỗ trợ bếp trưởng chuẩn bị món ăn, rửa chén bát, dọn dẹp bếp. Làm việc ca tối từ 17:00 - 23:00. Nhà hàng chuyên món Việt, môi trường làm việc thân thiện.");
    setAddress("123 Đường Nguyễn Thị Minh Khai, Q.1, TP.HCM");
    setStartDate("2024-12-25");
    setEndDate("2024-12-25");
    setStartTime("17:00");
    setEndTime("23:00");
    setWorkersNeeded(3);
    setSalaryText("150,000 VNĐ/ca");
  }, []);

  const addRequirement = () => {
    setRequirements([...requirements, ""]);
  };

  const removeRequirement = (index: number) => {
    if (requirements.length > 1) {
      setRequirements(requirements.filter((_, i) => i !== index));
    }
  };

  const updateRequirement = (index: number, value: string) => {
    const updated = [...requirements];
    updated[index] = value;
    setRequirements(updated);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Tạo tin tuyển dụng</h1>
        <p className="text-gray-600 mt-2">
          Đăng tin tuyển dụng lao động thời vụ
        </p>
      </div>

      {/* AI Assistant Suggestion */}
      <div className="bg-gradient-to-br from-blue-50 to-teal-50 border border-blue-200 p-6 rounded-xl">
        <div className="flex items-start space-x-3">
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
            <Bot className="w-4 h-4 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 mb-2">
              Gợi ý từ AI Assistant
            </h3>
            <p className="text-sm text-gray-700 mb-3">
              "Hồ sơ bạn nên yêu cầu tối thiểu kỹ năng giao tiếp và kinh nghiệm
              phục vụ để tăng chất lượng lao động cho vị trí này."
            </p>
            <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
              Xem thêm gợi ý →
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Form */}
        <div className="lg:col-span-2">
          <form className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 space-y-6" onSubmit={async (e) => {
            e.preventDefault();
            try {
              setLoading(true);
              const payload = {
                title,
                description,
                location: address,
                address,
                requirements: requirements.filter(r => r.trim()),
                skills: selectedSkillIds,
                salaryText,
                startDate: startDate || undefined,
                endDate: endDate || undefined,
                startTime: startTime || undefined,
                endTime: endTime || undefined,
                workersNeeded,
                recruitmentMode: jobType as any,
                status: 'open'
              };
              const res = await createJobApi(payload);
              if (res.success) showToast('success', 'Đăng tuyển thành công');
            } catch (err: any) {
              showToast('error', err?.message || 'Đăng tuyển thất bại');
            } finally {
              setLoading(false);
            }
          }}>
            {/* Job Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tiêu đề công việc <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={e => setTitle(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="VD: Phụ bếp nhà hàng - Ca tối"
              />
            </div>

            {/* Job Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mô tả chi tiết công việc <span className="text-red-500">*</span>
              </label>
              <textarea
                rows={5}
                value={description}
                onChange={e => setDescription(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Mô tả chi tiết về công việc, yêu cầu, điều kiện làm việc..."
              />
            </div>

            {/* Requirements */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Yêu cầu kỹ năng
              </label>
              <div className="mb-2">
                <label className="block text-xs font-medium text-gray-500 mb-2">Chọn kỹ năng từ hệ thống</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {skills.map((s: any) => {
                    const checked = selectedSkillIds.includes(s._id)
                    return (
                      <label key={s._id} className="flex items-center space-x-3 p-2 border rounded-lg hover:bg-gray-50">
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => {
                            setSelectedSkillIds(prev => checked ? prev.filter(id => id !== s._id) : [...prev, s._id])
                          }}
                          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-700">{s.name}</span>
                      </label>
                    )
                  })}
                </div>
              </div>
              {requirements.map((req, index) => (
                <div key={index} className="flex items-center space-x-2 mb-2">
                  <input
                    type="text"
                    value={req}
                    onChange={(e) => updateRequirement(index, e.target.value)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="VD: Có kinh nghiệm làm bếp"
                  />
                  <button
                    type="button"
                    onClick={() => removeRequirement(index)}
                    className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                    disabled={requirements.length === 1}
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addRequirement}
                className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium mt-2"
              >
                <Plus className="w-4 h-4" />
                <span>Thêm yêu cầu</span>
              </button>
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Địa điểm làm việc <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={address}
                  onChange={e => setAddress(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Nhập địa chỉ cụ thể"
                />
              </div>
              <button
                type="button"
                className="mt-2 text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                📍 Chọn trên bản đồ
              </button>
            </div>

            {/* Date & Time */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ngày bắt đầu <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="date"
                    value={startDate}
                    onChange={e => setStartDate(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ngày kết thúc
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="date"
                    value={endDate}
                    onChange={e => setEndDate(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Giờ bắt đầu <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="time"
                    value={startTime}
                    onChange={e => setStartTime(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Giờ kết thúc <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="time"
                    value={endTime}
                    onChange={e => setEndTime(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Workers & Salary */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Số lượng cần tuyển <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="number"
                    min="1"
                    value={workersNeeded}
                    onChange={e => setWorkersNeeded(parseInt(e.target.value || '1'))}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="VD: 3"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mức lương <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    value={salaryText}
                    onChange={e => setSalaryText(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="VD: 150,000 VNĐ/ca"
                  />
                </div>
              </div>
            </div>

            {/* Recruitment Mode */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Chế độ tuyển dụng
              </label>
              <div className="space-y-3">
                <label className="flex items-center space-x-3">
                  <input
                    type="radio"
                    name="recruitmentMode"
                    value="auto"
                    checked={jobType === "auto"}
                    onChange={(e) => setJobType(e.target.value)}
                    className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <div>
                    <div className="font-medium">Auto-match</div>
                    <div className="text-sm text-gray-500">
                      Hệ thống tự động ghép đôi với lao động phù hợp
                    </div>
                  </div>
                </label>
                <label className="flex items-center space-x-3">
                  <input
                    type="radio"
                    name="recruitmentMode"
                    value="manual"
                    checked={jobType === "manual"}
                    onChange={(e) => setJobType(e.target.value)}
                    className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <div>
                    <div className="font-medium">Duyệt thủ công</div>
                    <div className="text-sm text-gray-500">
                      Bạn sẽ xem xét và phê duyệt từng ứng viên
                    </div>
                  </div>
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex space-x-4 pt-4">
              <button
                type="button"
                className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Lưu nháp
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50"
              >
                {loading ? 'Đang đăng...' : 'Đăng tuyển ngay'}
              </button>
            </div>
          </form>
        </div>

        {/* Preview & Tips */}
        <div className="space-y-6">
          {/* Job Preview */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-4">
              Xem trước tin đăng
            </h3>
            <div className="space-y-3 text-sm">
              <div>
                <span className="font-medium text-gray-700">Công việc:</span>
                <p className="text-gray-600">Phụ bếp nhà hàng - Ca tối</p>
              </div>
              <div>
                <span className="font-medium text-gray-700">Thời gian:</span>
                <p className="text-gray-600">25/12/2024, 17:00 - 23:00</p>
              </div>
              <div>
                <span className="font-medium text-gray-700">Địa điểm:</span>
                <p className="text-gray-600">
                  123 Đường Nguyễn Thị Minh Khai, Q.1, TP.HCM
                </p>
              </div>
              <div>
                <span className="font-medium text-gray-700">Lương:</span>
                <p className="text-gray-600 font-semibold text-green-600">
                  150,000 VNĐ/ca
                </p>
              </div>
            </div>
          </div>

          {/* Tips */}
          <div className="bg-green-50 border border-green-200 p-6 rounded-xl">
            <h3 className="font-semibold text-green-900 mb-3">
              💡 Mẹo tuyển dụng hiệu quả
            </h3>
            <ul className="space-y-2 text-sm text-green-800">
              <li>• Viết tiêu đề rõ ràng, cụ thể</li>
              <li>• Mô tả chi tiết công việc và yêu cầu</li>
              <li>• Đưa ra mức lương cạnh tranh</li>
              <li>• Cung cấp địa chỉ chính xác</li>
              <li>• Sử dụng chế độ auto-match để tiết kiệm thời gian</li>
            </ul>
          </div>
        </div>
      </div>
    {toast && (
      <div className={`fixed right-4 top-4 z-50 px-4 py-3 rounded-lg shadow ${toast.type === 'success' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`}>
        {toast.message}
      </div>
    )}
    </div>
  );
};

export default CreateJob;
