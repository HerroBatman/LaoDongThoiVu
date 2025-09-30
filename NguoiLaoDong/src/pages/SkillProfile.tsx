import React, { useEffect, useMemo, useState } from "react";
import { Plus, X, Upload, Lightbulb } from "lucide-react";
import { listPublicSkills, listMyCompetencies, saveMyCompetencies, getMyProfile, updateMyProfile, type CompetencyDto, type SkillLiteDto } from "../lib/api";

const SkillProfile = () => {
  const [skills, setSkills] = useState<SkillLiteDto[]>([]);
  const [competencies, setCompetencies] = useState<CompetencyDto[]>([]);
  const [selectedSkillId, setSelectedSkillId] = useState<string>("");
  const [level, setLevel] = useState<CompetencyDto["level"]>("beginner");
  const [years, setYears] = useState<number>(0);
  const [notes, setNotes] = useState<string>("");
  const [saving, setSaving] = useState(false);
  const [experience, setExperience] = useState<string>("");
  const [toast, setToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const showToast = (type: 'success' | 'error', message: string, duration = 2500) => {
    setToast({ type, message });
    window.setTimeout(() => setToast(null), duration);
  };
  const [timeSlots, setTimeSlots] = useState({
    morning: true,
    afternoon: true,
    evening: false,
    night: false,
  });

  const addCompetency = () => {
    if (!selectedSkillId) return;
    if (competencies.some(c => c.skill === selectedSkillId)) return;
    setCompetencies(prev => [
      { skill: selectedSkillId, level, yearsOfExperience: years, notes, status: 'active' },
      ...prev
    ]);
    setSelectedSkillId("");
    setLevel("beginner");
    setYears(0);
    setNotes("");
  };

  const removeCompetency = (skillId: string) => {
    setCompetencies(prev => prev.filter(c => c.skill !== skillId));
  };

  useEffect(() => {
    const load = async () => {
      try {
        const [skillRes, compRes, profileRes] = await Promise.all([
          listPublicSkills(),
          listMyCompetencies(),
          getMyProfile(),
        ]);
        if (skillRes.success) setSkills((skillRes.data as any) || []);
        if (compRes.success) {
          const raw = (compRes.data as any[]) || [];
          const normalized = raw.map((c: any) => ({
            ...c,
            skill: typeof c.skill === 'string' ? c.skill : c.skill?._id,
          }));
          setCompetencies(normalized as any);
        }
        if (profileRes.success) {
          const data: any = profileRes.data
          setExperience(data?.experienceDescription || "")
          if (data?.availability) {
            setTimeSlots({
              morning: !!data.availability.morning,
              afternoon: !!data.availability.afternoon,
              evening: !!data.availability.evening,
              night: !!data.availability.night,
            })
          }
        }
      } catch (e: any) {
        showToast('error', e?.message || 'Lỗi khi tải dữ liệu hồ sơ');
      }
    };
    load();
  }, []);

  const skillsById = useMemo(() => Object.fromEntries(skills.map(s => [s._id, s])), [skills]);

  const handleTimeSlotChange = (slot: string) => {
    setTimeSlots((prev) => ({
      ...prev,
      [slot]: !prev[slot as keyof typeof prev],
    }));
  };

  const timeSlotLabels = {
    morning: "Sáng (6:00 - 12:00)",
    afternoon: "Chiều (12:00 - 18:00)",
    evening: "Tối (18:00 - 23:00)",
    night: "Đêm (23:00 - 6:00)",
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Hồ sơ năng lực</h1>
      </div>

      {/* AI Suggestion Banner */}
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
        <div className="flex items-center space-x-3">
          <Lightbulb size={20} className="text-amber-600" />
          <div>
            <h3 className="font-medium text-amber-800">Gợi ý từ AI</h3>
            <p className="text-sm text-amber-700 mt-1">
              Bạn nên bổ sung kỹ năng "Làm việc nhóm" và "Giao tiếp khách hàng"
              để tăng khả năng nhận việc
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Skills Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Kỹ năng & Năng lực</h2>
            <p className="text-sm text-gray-600 mt-1">Chọn kỹ năng và khai báo mức độ, kinh nghiệm của bạn.</p>
          </div>
          <div className="p-6">
            <div className="flex flex-wrap gap-2 mb-4">
              {competencies.map((c, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                >
                  {skillsById[c.skill]?.name || c.skill}
                  <button
                    onClick={() => removeCompetency(c.skill)}
                    className="ml-2 text-blue-600 hover:text-blue-800"
                  >
                    <X size={14} />
                  </button>
                </span>
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
              <select value={selectedSkillId} onChange={e => setSelectedSkillId(e.target.value)} className="px-3 py-2 border rounded-lg">
                <option value="">Chọn kỹ năng...</option>
                {skills.map(s => (
                  <option key={s._id} value={s._id}>{s.name}</option>
                ))}
              </select>
              <select value={level} onChange={e => setLevel(e.target.value as any)} className="px-3 py-2 border rounded-lg">
                <option value="beginner">Mới bắt đầu</option>
                <option value="intermediate">Trung bình</option>
                <option value="advanced">Khá</option>
                <option value="expert">Chuyên gia</option>
              </select>
              <input type="number" min={0} value={years} onChange={e => setYears(parseInt(e.target.value || '0'))} className="px-3 py-2 border rounded-lg" placeholder="Số năm kinh nghiệm" />
              <input type="text" value={notes} onChange={e => setNotes(e.target.value)} className="px-3 py-2 border rounded-lg" placeholder="Ghi chú (tuỳ chọn)" />
            </div>
            <div className="mt-3">
              <button onClick={addCompetency} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <Plus size={16} className="inline mr-1" /> Thêm năng lực
              </button>
            </div>
          </div>
        </div>

        {/* Work Areas removed per requirement */}
      </div>

      {/* Experience Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            Kinh nghiệm làm việc
          </h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mô tả kinh nghiệm
              </label>
              <textarea
                rows={4}
                value={experience}
                onChange={e => setExperience(e.target.value)}
                placeholder="Ví dụ: Có 2 năm kinh nghiệm làm nhân viên phục vụ tại các quán cà phê, nhà hàng..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Certificates */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            Bằng cấp & Chứng chỉ
          </h2>
        </div>
        <div className="p-6">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
            <Upload className="mx-auto h-12 w-12 text-gray-400 mb-2" />
            <p className="text-sm text-gray-600">
              Tải lên bằng cấp, chứng chỉ của bạn
            </p>
            <p className="text-xs text-gray-500 mt-1">
              PNG, JPG, PDF (Max: 10MB)
            </p>
          </div>
        </div>
      </div>

      {/* Time Availability */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            Thời gian có thể làm việc
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            Chọn các khung giờ bạn có thể làm việc
          </p>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(timeSlotLabels).map(([key, label]) => (
              <label
                key={key}
                className="flex items-center space-x-3 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={timeSlots[key as keyof typeof timeSlots]}
                  onChange={() => handleTimeSlotChange(key)}
                  className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-gray-700">
                  {label}
                </span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={async () => {
            try {
              setSaving(true)
              const payload = competencies.map(c => ({
                skill: typeof c.skill === 'string' ? c.skill : (c as any).skill?._id,
                level: c.level,
                yearsOfExperience: c.yearsOfExperience || 0,
                certifications: c.certifications || [],
                notes: c.notes || '',
                status: c.status || 'active',
              }))
              await saveMyCompetencies(payload)
              await updateMyProfile({ experienceDescription: experience, availability: timeSlots })
              showToast('success', 'Đã lưu hồ sơ năng lực thành công')
            } catch (e: any) {
              showToast('error', e?.message || 'Lỗi khi lưu hồ sơ năng lực')
            } finally {
              setSaving(false)
            }
          }}
          disabled={saving}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
          {saving ? 'Đang lưu...' : 'Lưu hồ sơ năng lực'}
        </button>
      </div>

      {/* Toast */}
      {toast && (
        <div className={`fixed right-4 top-4 z-50 px-4 py-3 rounded-lg shadow ${toast.type === 'success' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`}>
          {toast.message}
        </div>
      )}
    </div>
  );
};

export default SkillProfile;
