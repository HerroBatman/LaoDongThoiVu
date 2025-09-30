import { useEffect, useMemo, useState } from "react";
import { Plus, Edit, Trash2, Search, X, Check } from "lucide-react";
import { listSkills as apiListSkills, createSkill as apiCreateSkill, updateSkill as apiUpdateSkill, deleteSkill as apiDeleteSkill } from "../../lib/api";

type Skill = {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  status: "active" | "inactive";
  createdAt?: string;
  updatedAt?: string;
};

export default function SkillManagement() {
  const [items, setItems] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<string>("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  // const [total, setTotal] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Skill | null>(null);
  const [form, setForm] = useState<{ name: string; slug: string; description: string; status: Skill["status"]; }>(
    { name: "", slug: "", description: "", status: "active" }
  );

  // Load from backend
  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await apiListSkills({ page, limit, search, status });
        if (res.success) {
          const list = (res.data as unknown as any[]) || [];
          setItems(list as Skill[]);
          // server returns pagination; but our client type for listSkills is list only.
          // Keep total as previous when missing.
        } else {
          setError(res.message || "Lỗi khi tải danh sách kỹ năng");
        }
      } catch (e: any) {
        setError(e.message || "Lỗi khi tải danh sách kỹ năng");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [page, limit, search, status]);

  const filtered = useMemo(() => {
    return items.filter(s => {
      const okSearch = search ? (
        s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.slug.toLowerCase().includes(search.toLowerCase()) ||
        (s.description || "").toLowerCase().includes(search.toLowerCase())
      ) : true;
      const okStatus = status ? s.status === status : true;
      return okSearch && okStatus;
    });
  }, [items, search, status]);

  const paged = useMemo(() => {
    const start = (page - 1) * limit;
    return filtered.slice(start, start + limit);
  }, [filtered, page, limit]);

  const openCreate = () => {
    setEditing(null);
    setForm({ name: "", slug: "", description: "", status: "active" });
    setShowModal(true);
  };

  const openEdit = (it: Skill) => {
    setEditing(it);
    setForm({ name: it.name, slug: it.slug, description: it.description || "", status: it.status });
    setShowModal(true);
  };

  const onSubmit = async () => {
    if (!form.name.trim() || !form.slug.trim()) {
      setError("Tên và slug là bắt buộc");
      return;
    }
    try {
      setLoading(true);
      if (editing) {
        const res = await apiUpdateSkill(editing._id, form);
        if (!res.success) throw new Error(res.message || 'Cập nhật thất bại');
      } else {
        const res = await apiCreateSkill(form);
        if (!res.success) throw new Error(res.message || 'Tạo thất bại');
      }
      setShowModal(false);
      setEditing(null);
      setError("");
      // reload
      const res = await apiListSkills({ page, limit, search, status });
      if (res.success) {
        const list = (res.data as unknown as any[]) || [];
        setItems(list as Skill[]);
      }
    } catch (e: any) {
      setError(e.message || 'Lỗi khi lưu dữ liệu');
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async (id: string) => {
    try {
      setLoading(true);
      const res = await apiDeleteSkill(id);
      if (!res.success) throw new Error(res.message || 'Xoá thất bại');
      const reload = await apiListSkills({ page, limit, search, status });
      if (reload.success) {
        const list = (reload.data as unknown as any[]) || [];
        setItems(list as Skill[]);
      }
    } catch (e: any) {
      setError(e.message || 'Lỗi khi xoá');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Quản lý danh mục kỹ năng</h1>
          <p className="text-sm text-gray-600 mt-1">Tạo, chỉnh sửa, vô hiệu hoá các kỹ năng</p>
        </div>
        <button
          onClick={openCreate}
          className="flex items-center space-x-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus size={16} />
          <span>Thêm kỹ năng</span>
        </button>
      </div>

      {/* Filters */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Tìm kiếm theo tên, slug, mô tả..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
            />
          </div>
          <select
            value={status}
            onChange={(e) => { setStatus(e.target.value); setPage(1); }}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Tất cả trạng thái</option>
            <option value="active">Hoạt động</option>
            <option value="inactive">Ngưng</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tên</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Slug</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mô tả</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trạng thái</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hành động</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center">Đang tải...</td>
                </tr>
              ) : paged.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500">Không có dữ liệu</td>
                </tr>
              ) : (
                paged.map((s) => (
                  <tr key={s._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{s.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{s.slug}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{s.description || ""}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {s.status === "active" ? (
                        <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">Hoạt động</span>
                      ) : (
                        <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">Ngưng</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => openEdit(s)}
                          className="px-3 py-1 rounded-lg text-sm font-medium bg-blue-50 text-blue-600 hover:bg-blue-100"
                        >
                          <Edit size={14} />
                        </button>
                        <button
                          onClick={() => onDelete(s._id)}
                          className="px-3 py-1 rounded-lg text-sm font-medium bg-red-50 text-red-600 hover:bg-red-100"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        {/* Pagination */}
        <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200">
          <div className="text-sm text-gray-700">
            Trang {page}
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >Trước</button>
            <button
              onClick={() => setPage(p => (paged.length < limit ? p : p + 1))}
              className="px-3 py-1 border rounded"
            >Sau</button>
            <select value={limit} onChange={(e) => { setLimit(parseInt(e.target.value)); setPage(1); }} className="px-2 py-1 border rounded">
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
            </select>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">{editing ? "Chỉnh sửa" : "Thêm"} kỹ năng</h3>
              <button onClick={() => { setShowModal(false); setEditing(null); }} className="text-gray-500 hover:text-gray-700"><X size={18} /></button>
            </div>
            {error && (
              <div className="mb-3 text-sm text-red-600">{error}</div>
            )}
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tên *</label>
                <input
                  value={form.name}
                  onChange={(e) => setForm(f => ({ ...f, name: e.target.value }))}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Ví dụ: Pha chế"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Slug *</label>
                <input
                  value={form.slug}
                  onChange={(e) => setForm(f => ({ ...f, slug: e.target.value }))}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="pha-che"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mô tả</label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm(f => ({ ...f, description: e.target.value }))}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={3}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Trạng thái</label>
                <select
                  value={form.status}
                  onChange={(e) => setForm(f => ({ ...f, status: e.target.value as Skill["status"] }))}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="active">Hoạt động</option>
                  <option value="inactive">Ngưng</option>
                </select>
              </div>
            </div>
            <div className="mt-5 flex justify-end space-x-3">
              <button onClick={() => { setShowModal(false); setEditing(null); }} className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50">Hủy</button>
              <button onClick={onSubmit} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2">
                <Check size={16} />
                <span>Lưu</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


