import jwt from "jsonwebtoken";
import { Admin } from "../models/admin.model.js";

// Admin Login
export const adminLogin = async (req, res) => {
    try {
        console.log(req.body);
        const { email, password } = req.body;
        
        // Validation
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email và mật khẩu là bắt buộc"
            });
        }

        // Find admin by email
        const admin = await Admin.findOne({ email: email.toLowerCase() });
        
        if (!admin) {
            return res.status(401).json({
                success: false,
                message: "Email hoặc mật khẩu không chính xác"
            });
        }

        // Check if account is locked
        if (admin.isLocked()) {
            return res.status(423).json({
                success: false,
                message: "Tài khoản đã bị khóa do đăng nhập sai quá nhiều lần. Vui lòng thử lại sau 2 giờ."
            });
        }

        // Check if account is active
        if (!admin.isActive) {
            return res.status(403).json({
                success: false,
                message: "Tài khoản đã bị vô hiệu hóa"
            });
        }

        // Verify password
        const isMatch = await admin.matchPassword(password);
        
        if (!isMatch) {
            // Increment login attempts
            await admin.incLoginAttempts();
            
            return res.status(401).json({
                success: false,
                message: "Email hoặc mật khẩu không chính xác"
            });
        }

        // Reset login attempts on successful login
        await admin.resetLoginAttempts();

        // Generate JWT token
        const payload = {
            userId: admin._id,
            role: "admin",
            permissions: admin.permissions
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "8h" // Admin tokens expire in 8 hours
        });

        // Return admin data without password
        const adminData = {
            _id: admin._id,
            email: admin.email,
            name: admin.name,
            role: admin.role,
            permissions: admin.permissions,
            lastLogin: admin.lastLogin
        };

        res.status(200).json({
            success: true,
            message: "Đăng nhập thành công",
            token,
            data: adminData
        });

    } catch (error) {
        console.error("Admin login error:", error);
        res.status(500).json({
            success: false,
            message: "Lỗi server. Vui lòng thử lại sau."
        });
    }
};

// Get current admin profile
export const getAdminProfile = async (req, res) => {
    try {
        const admin = await Admin.findById(req.user.userId).select("-password");
        
        if (!admin) {
            return res.status(404).json({
                success: false,
                message: "Không tìm thấy thông tin quản trị viên"
            });
        }

        res.status(200).json({
            success: true,
            data: admin
        });

    } catch (error) {
        console.error("Get admin profile error:", error);
        res.status(500).json({
            success: false,
            message: "Lỗi server. Vui lòng thử lại sau."
        });
    }
};

// Admin logout
export const adminLogout = async (req, res) => {
    try {
        // Since we're using JWT, logout is handled client-side
        // But we can log the logout event or perform cleanup here
        res.status(200).json({
            success: true,
            message: "Đăng xuất thành công"
        });
    } catch (error) {
        console.error("Admin logout error:", error);
        res.status(500).json({
            success: false,
            message: "Lỗi server. Vui lòng thử lại sau."
        });
    }
};

// Change password
export const changePassword = async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;
        
        if (!currentPassword || !newPassword) {
            return res.status(400).json({
                success: false,
                message: "Mật khẩu hiện tại và mật khẩu mới là bắt buộc"
            });
        }

        if (newPassword.length < 6) {
            return res.status(400).json({
                success: false,
                message: "Mật khẩu mới phải có ít nhất 6 ký tự"
            });
        }

        const admin = await Admin.findById(req.user.userId);
        
        if (!admin) {
            return res.status(404).json({
                success: false,
                message: "Không tìm thấy quản trị viên"
            });
        }

        // Verify current password
        const isMatch = await admin.matchPassword(currentPassword);
        
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Mật khẩu hiện tại không chính xác"
            });
        }

        // Update password
        admin.password = newPassword;
        await admin.save();

        res.status(200).json({
            success: true,
            message: "Đổi mật khẩu thành công"
        });

    } catch (error) {
        console.error("Change password error:", error);
        res.status(500).json({
            success: false,
            message: "Lỗi server. Vui lòng thử lại sau."
        });
    }
};

// ============ USER MANAGEMENT APIs ============

// Get all workers with pagination and filters
export const getWorkers = async (req, res) => {
    try {
        const { Employer } = await import("../models/employer.model.js");
        
        const { 
            page = 1, 
            limit = 10, 
            search = '', 
            status = '', 
            sortBy = 'createdAt',
            sortOrder = 'desc',
            gender = '',
            trustScoreMin = '',
            trustScoreMax = ''
        } = req.query;

        // Build query
        let query = {};
        
        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { email: { $regex: search, $options: 'i' } },
                { phone: { $regex: search, $options: 'i' } },
                { identityCardNumber: { $regex: search, $options: 'i' } }
            ];
        }
        
        if (status) {
            if (status === 'active') {
                query.status = true;
            } else if (status === 'pending') {
                query.status = false;
            }
        }

        if (gender) {
            query.gender = gender;
        }

        if (trustScoreMin || trustScoreMax) {
            query.trustScore = {};
            if (trustScoreMin) query.trustScore.$gte = parseFloat(trustScoreMin);
            if (trustScoreMax) query.trustScore.$lte = parseFloat(trustScoreMax);
        }

        // Pagination
        const skip = (parseInt(page) - 1) * parseInt(limit);
        
        // Sort options
        const sortOptions = {};
        sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1;
        
        const workers = await Employer.find(query)
            .select('-password')
            .sort(sortOptions)
            .skip(skip)
            .limit(parseInt(limit));

        const total = await Employer.countDocuments(query);

        // Get statistics
        const stats = await Employer.aggregate([
            {
                $group: {
                    _id: null,
                    total: { $sum: 1 },
                    active: { $sum: { $cond: ["$status", 1, 0] } },
                    pending: { $sum: { $cond: ["$status", 0, 1] } },
                    avgTrustScore: { $avg: "$trustScore" },
                    maxTrustScore: { $max: "$trustScore" },
                    minTrustScore: { $min: "$trustScore" }
                }
            }
        ]);

        res.status(200).json({
            success: true,
            data: workers,
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                total,
                pages: Math.ceil(total / parseInt(limit))
            },
            stats: stats[0] || {
                total: 0,
                active: 0,
                pending: 0,
                avgTrustScore: 0,
                maxTrustScore: 0,
                minTrustScore: 0
            }
        });

    } catch (error) {
        console.error("Get workers error:", error);
        res.status(500).json({
            success: false,
            message: "Lỗi khi lấy danh sách người lao động"
        });
    }
};

// Get all employers with pagination and filters
export const getEmployers = async (req, res) => {
    try {
        const { NhaTuyenDung } = await import("../models/nhatuyendung.model.js");
        
        const { 
            page = 1, 
            limit = 10, 
            search = '', 
            status = '', 
            sortBy = 'createdAt',
            sortOrder = 'desc'
        } = req.query;

        // Build query
        let query = {};
        
        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { email: { $regex: search, $options: 'i' } },
                { phone: { $regex: search, $options: 'i' } },
                { legalInfo: { $regex: search, $options: 'i' } }
            ];
        }
        
        if (status) {
            if (status === 'active') {
                query.status = true;
            } else if (status === 'pending') {
                query.status = false;
            }
        }

        // Pagination
        const skip = (parseInt(page) - 1) * parseInt(limit);
        
        // Sort options
        const sortOptions = {};
        sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1;
        
        const employers = await NhaTuyenDung.find(query)
            .select('-password')
            .sort(sortOptions)
            .skip(skip)
            .limit(parseInt(limit));

        const total = await NhaTuyenDung.countDocuments(query);

        // Get statistics
        const stats = await NhaTuyenDung.aggregate([
            {
                $group: {
                    _id: null,
                    total: { $sum: 1 },
                    active: { $sum: { $cond: ["$status", 1, 0] } },
                    pending: { $sum: { $cond: ["$status", 0, 1] } }
                }
            }
        ]);

        res.status(200).json({
            success: true,
            data: employers,
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                total,
                pages: Math.ceil(total / parseInt(limit))
            },
            stats: stats[0] || {
                total: 0,
                active: 0,
                pending: 0
            }
        });

    } catch (error) {
        console.error("Get employers error:", error);
        res.status(500).json({
            success: false,
            message: "Lỗi khi lấy danh sách nhà tuyển dụng"
        });
    }
};

// Approve user account
export const approveAccount = async (req, res) => {
    try {
        const { id, userType } = req.body;

        if (!id || !userType) {
            return res.status(400).json({
                success: false,
                message: "ID và userType là bắt buộc"
            });
        }

        if (!['worker', 'employer'].includes(userType)) {
            return res.status(400).json({
                success: false,
                message: "userType phải là 'worker' hoặc 'employer'"
            });
        }

        let user;
        if (userType === 'worker') {
            const { Employer } = await import("../models/employer.model.js");
            user = await Employer.findByIdAndUpdate(
                id, 
                { 
                    status: true,
                    approvedAt: new Date(),
                    approvedBy: req.user.userId,
                    approvalReason: 'Phê duyệt bởi admin'
                }, 
                { new: true }
            ).select('-password');
        } else {
            const { NhaTuyenDung } = await import("../models/nhatuyendung.model.js");
            user = await NhaTuyenDung.findByIdAndUpdate(
                id, 
                { 
                    status: true,
                    approvedAt: new Date(),
                    approvedBy: req.user.userId,
                    approvalReason: 'Phê duyệt bởi admin'
                }, 
                { new: true }
            ).select('-password');
        }

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Không tìm thấy tài khoản"
            });
        }

        res.status(200).json({
            success: true,
            message: "Phê duyệt tài khoản thành công",
            data: user
        });

    } catch (error) {
        console.error("Approve account error:", error);
        res.status(500).json({
            success: false,
            message: "Lỗi khi phê duyệt tài khoản"
        });
    }
};

// Reject user account
export const rejectAccount = async (req, res) => {
    try {
        const { id, userType, reason } = req.body;

        if (!id || !userType || !reason) {
            return res.status(400).json({
                success: false,
                message: "ID, userType và reason là bắt buộc"
            });
        }

        if (!['worker', 'employer'].includes(userType)) {
            return res.status(400).json({
                success: false,
                message: "userType phải là 'worker' hoặc 'employer'"
            });
        }

        let user;
        if (userType === 'worker') {
            const { Employer } = await import("../models/employer.model.js");
            user = await Employer.findByIdAndUpdate(
                id, 
                { 
                    rejectedAt: new Date(),
                    rejectedBy: req.user.userId,
                    rejectionReason: reason,
                    status: false // Keep as false but mark as rejected
                }, 
                { new: true }
            ).select('-password');
        } else {
            const { NhaTuyenDung } = await import("../models/nhatuyendung.model.js");
            user = await NhaTuyenDung.findByIdAndUpdate(
                id, 
                { 
                    rejectedAt: new Date(),
                    rejectedBy: req.user.userId,
                    rejectionReason: reason,
                    status: false // Keep as false but mark as rejected
                }, 
                { new: true }
            ).select('-password');
        }

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Không tìm thấy tài khoản"
            });
        }

        res.status(200).json({
            success: true,
            message: "Từ chối tài khoản thành công",
            data: user
        });

    } catch (error) {
        console.error("Reject account error:", error);
        res.status(500).json({
            success: false,
            message: "Lỗi khi từ chối tài khoản"
        });
    }
};

// Get user details by ID and type
export const getUserDetails = async (req, res) => {
    try {
        const { id, userType } = req.params;

        if (!['worker', 'employer'].includes(userType)) {
            return res.status(400).json({
                success: false,
                message: "userType phải là 'worker' hoặc 'employer'"
            });
        }

        let user;
        if (userType === 'worker') {
            const { Employer } = await import("../models/employer.model.js");
            user = await Employer.findById(id).select('-password');
        } else {
            const { NhaTuyenDung } = await import("../models/nhatuyendung.model.js");
            user = await NhaTuyenDung.findById(id).select('-password');
        }

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Không tìm thấy tài khoản"
            });
        }

        res.status(200).json({
            success: true,
            data: user
        });

    } catch (error) {
        console.error("Get user details error:", error);
        res.status(500).json({
            success: false,
            message: "Lỗi khi lấy thông tin tài khoản"
        });
    }
};

// Get user statistics
export const getUserStats = async (req, res) => {
    try {
        const { Employer } = await import("../models/employer.model.js");
        const { NhaTuyenDung } = await import("../models/nhatuyendung.model.js");

        const [workerStats, employerStats] = await Promise.all([
            // Worker stats
            Promise.all([
                Employer.countDocuments({ status: true }), // Active workers
                Employer.countDocuments({ status: false }), // Pending workers
                Employer.countDocuments(), // Total workers
                Employer.aggregate([
                    {
                        $group: {
                            _id: null,
                            avgTrustScore: { $avg: "$trustScore" },
                            maxTrustScore: { $max: "$trustScore" },
                            minTrustScore: { $min: "$trustScore" }
                        }
                    }
                ])
            ]),
            // Employer stats
            Promise.all([
                NhaTuyenDung.countDocuments({ status: true }), // Active employers
                NhaTuyenDung.countDocuments({ status: false }), // Pending employers
                NhaTuyenDung.countDocuments(), // Total employers
            ])
        ]);

        const [activeWorkers, pendingWorkers, totalWorkers, trustScoreStats] = workerStats;
        const [activeEmployers, pendingEmployers, totalEmployers] = employerStats;

        res.status(200).json({
            success: true,
            data: {
                workers: {
                    total: totalWorkers,
                    active: activeWorkers,
                    pending: pendingWorkers,
                    trustScore: trustScoreStats[0] || { avgTrustScore: 0, maxTrustScore: 0, minTrustScore: 0 }
                },
                employers: {
                    total: totalEmployers,
                    active: activeEmployers,
                    pending: pendingEmployers
                }
            }
        });

    } catch (error) {
        console.error("Get user stats error:", error);
        res.status(500).json({
            success: false,
            message: "Lỗi khi lấy thống kê người dùng"
        });
    }
};

// ============ SKILL MANAGEMENT ============
export const listSkills = async (req, res) => {
    try {
        const { Skill } = await import("../models/skill.model.js");
        const { page = 1, limit = 10, search = '', status = '' } = req.query;

        const query = {};
        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { slug: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } },
            ];
        }
        if (status) query.status = status;

        const skip = (parseInt(page) - 1) * parseInt(limit);
        const [items, total] = await Promise.all([
            Skill.find(query).sort({ createdAt: -1 }).skip(skip).limit(parseInt(limit)),
            Skill.countDocuments(query),
        ]);

        res.status(200).json({
            success: true,
            data: items,
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                total,
                pages: Math.ceil(total / parseInt(limit))
            }
        });
    } catch (error) {
        console.error('List skills error:', error);
        res.status(500).json({ success: false, message: 'Lỗi khi lấy danh sách kỹ năng' });
    }
};

export const createSkill = async (req, res) => {
    try {
        const { Skill } = await import("../models/skill.model.js");
        const { name, slug, description, status } = req.body;
        if (!name || !slug) return res.status(400).json({ success: false, message: 'name và slug là bắt buộc' });
        const exists = await Skill.findOne({ $or: [{ name }, { slug }] });
        if (exists) return res.status(409).json({ success: false, message: 'Kỹ năng đã tồn tại' });
        const item = await Skill.create({ name, slug, description, status });
        res.status(201).json({ success: true, data: item });
    } catch (error) {
        console.error('Create skill error:', error);
        res.status(500).json({ success: false, message: 'Lỗi khi tạo kỹ năng' });
    }
};

export const updateSkill = async (req, res) => {
    try {
        const { Skill } = await import("../models/skill.model.js");
        const { id } = req.params;
        const { name, slug, description, status } = req.body;
        const item = await Skill.findByIdAndUpdate(id, { name, slug, description, status }, { new: true, runValidators: true });
        if (!item) return res.status(404).json({ success: false, message: 'Không tìm thấy kỹ năng' });
        res.status(200).json({ success: true, data: item });
    } catch (error) {
        console.error('Update skill error:', error);
        res.status(500).json({ success: false, message: 'Lỗi khi cập nhật kỹ năng' });
    }
};

export const deleteSkill = async (req, res) => {
    try {
        const { Skill } = await import("../models/skill.model.js");
        const { id } = req.params;
        const item = await Skill.findByIdAndDelete(id);
        if (!item) return res.status(404).json({ success: false, message: 'Không tìm thấy kỹ năng' });
        res.status(200).json({ success: true, message: 'Đã xoá kỹ năng' });
    } catch (error) {
        console.error('Delete skill error:', error);
        res.status(500).json({ success: false, message: 'Lỗi khi xoá kỹ năng' });
    }
};

// ============ JOB APPROVAL ============
export const adminListJobs = async (req, res) => {
    try {
        const { Job } = await import('../models/job.model.js');
        const { page = 1, limit = 10, status = '', search = '' } = req.query;
        const query = {};
        if (status) query.status = status;
        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } },
                { address: { $regex: search, $options: 'i' } },
            ];
        }
        const skip = (parseInt(page) - 1) * parseInt(limit);
        const [items, total] = await Promise.all([
            Job.find(query)
              .sort({ createdAt: -1 })
              .skip(skip)
              .limit(parseInt(limit)),
            Job.countDocuments(query),
        ]);
        return res.status(200).json({ success: true, data: items, pagination: { page: parseInt(page), limit: parseInt(limit), total, pages: Math.ceil(total / parseInt(limit)) } });
    } catch (error) {
        console.error('adminListJobs error:', error);
        return res.status(500).json({ success: false, message: 'Lỗi khi lấy danh sách công việc: ' + (error?.message || '') });
    }
}

export const adminApproveJob = async (req, res) => {
    try {
        const { Job } = await import('../models/job.model.js');
        const { Employer } = await import('../models/employer.model.js');
        const { WorkerCompetency } = await import('../models/workerCompetency.model.js');
        const { JobInvite } = await import('../models/jobInvite.model.js');

        const job = await Job.findByIdAndUpdate(req.params.id, { status: 'open' }, { new: true });
        if (!job) return res.status(404).json({ success: false, message: 'Không tìm thấy công việc' });

        let invited = 0;
        if (Array.isArray(job.skills) && job.skills.length > 0) {
            // Find workers who have any matching skill via WorkerCompetency
            const comps = await WorkerCompetency.find({ skill: { $in: job.skills } })
                .select('worker skill');

            // Group matched skills by worker
            const workerToSkills = new Map();
            for (const c of comps) {
                const wid = String(c.worker);
                const arr = workerToSkills.get(wid) || [];
                arr.push(c.skill);
                workerToSkills.set(wid, arr);
            }

            // Keep only active workers
            const workerIds = Array.from(workerToSkills.keys());
            const activeWorkers = await Employer.find({ _id: { $in: workerIds }, status: true }).select('_id');
            const activeSet = new Set(activeWorkers.map(w => String(w._id)));

            const ops = [];
            for (const [wid, matched] of workerToSkills.entries()) {
                if (!activeSet.has(wid)) continue;
                ops.push(
                    JobInvite.updateOne(
                        { job: job._id, worker: wid },
                        { $setOnInsert: { matchedSkills: [...new Set(matched)], status: 'sent' } },
                        { upsert: true }
                    )
                );
            }
            if (ops.length) await Promise.all(ops);
            invited = ops.length;
        }

        return res.status(200).json({ success: true, message: 'Đã phê duyệt công việc', data: job, invited });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Lỗi khi phê duyệt công việc' });
    }
}

export const adminRejectJob = async (req, res) => {
    try {
        const { Job } = await import('../models/job.model.js');
        const { reason = 'Rejected by admin' } = req.body;
        const job = await Job.findByIdAndUpdate(req.params.id, { status: 'closed', rejectionReason: reason }, { new: true });
        if (!job) return res.status(404).json({ success: false, message: 'Không tìm thấy công việc' });
        return res.status(200).json({ success: true, message: 'Đã từ chối công việc', data: job });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Lỗi khi từ chối công việc' });
    }
}

// ============ JOB INVITES (ADMIN) ============
export const adminListJobInvites = async (req, res) => {
    try {
        const { JobInvite } = await import('../models/jobInvite.model.js');
        const { id } = req.params; // job id
        const { page = 1, limit = 10 } = req.query;
        const skip = (parseInt(page) - 1) * parseInt(limit);
        const [items, total] = await Promise.all([
            JobInvite.find({ job: id })
                .populate('worker', 'name email phone')
                .populate('matchedSkills', 'name')
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(parseInt(limit)),
            JobInvite.countDocuments({ job: id })
        ]);
        res.status(200).json({ success: true, data: items, pagination: { page: parseInt(page), limit: parseInt(limit), total, pages: Math.ceil(total / parseInt(limit)) } });
    } catch (error) {
        console.error('adminListJobInvites error:', error);
        res.status(500).json({ success: false, message: 'Lỗi khi lấy danh sách mời làm việc' });
    }
}
// ============ WORKER COMPETENCY MANAGEMENT ============
export const listWorkerCompetencies = async (req, res) => {
    try {
        const { WorkerCompetency } = await import("../models/workerCompetency.model.js");
        const { page = 1, limit = 10, workerId = '', search = '', status = '' } = req.query;

        const query = {};
        if (workerId) query.worker = workerId;
        if (status) query.status = status;
        if (search) {
            query.$or = [
                { notes: { $regex: search, $options: 'i' } },
            ];
        }

        const skip = (parseInt(page) - 1) * parseInt(limit);
        const [items, total] = await Promise.all([
            WorkerCompetency.find(query)
                .populate('worker', 'name email phone')
                .populate('skill', 'name slug')
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(parseInt(limit)),
            WorkerCompetency.countDocuments(query),
        ]);

        res.status(200).json({
            success: true,
            data: items,
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                total,
                pages: Math.ceil(total / parseInt(limit))
            }
        });
    } catch (error) {
        console.error('List worker competencies error:', error);
        res.status(500).json({ success: false, message: 'Lỗi khi lấy danh sách năng lực' });
    }
};

export const createWorkerCompetency = async (req, res) => {
    try {
        const { WorkerCompetency } = await import("../models/workerCompetency.model.js");
        const { worker, skill, level, yearsOfExperience, certifications, notes, status } = req.body;
        if (!worker || !skill) return res.status(400).json({ success: false, message: 'worker và skill là bắt buộc' });
        const item = await WorkerCompetency.create({ worker, skill, level, yearsOfExperience, certifications, notes, status });
        res.status(201).json({ success: true, data: item });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({ success: false, message: 'Năng lực cho kỹ năng này đã tồn tại' });
        }
        console.error('Create worker competency error:', error);
        res.status(500).json({ success: false, message: 'Lỗi khi tạo năng lực' });
    }
};

export const updateWorkerCompetency = async (req, res) => {
    try {
        const { WorkerCompetency } = await import("../models/workerCompetency.model.js");
        const { id } = req.params;
        const { level, yearsOfExperience, certifications, notes, status } = req.body;
        const item = await WorkerCompetency.findByIdAndUpdate(
            id,
            { level, yearsOfExperience, certifications, notes, status },
            { new: true, runValidators: true }
        );
        if (!item) return res.status(404).json({ success: false, message: 'Không tìm thấy năng lực' });
        res.status(200).json({ success: true, data: item });
    } catch (error) {
        console.error('Update worker competency error:', error);
        res.status(500).json({ success: false, message: 'Lỗi khi cập nhật năng lực' });
    }
};

export const deleteWorkerCompetency = async (req, res) => {
    try {
        const { WorkerCompetency } = await import("../models/workerCompetency.model.js");
        const { id } = req.params;
        const item = await WorkerCompetency.findByIdAndDelete(id);
        if (!item) return res.status(404).json({ success: false, message: 'Không tìm thấy năng lực' });
        res.status(200).json({ success: true, message: 'Đã xoá năng lực' });
    } catch (error) {
        console.error('Delete worker competency error:', error);
        res.status(500).json({ success: false, message: 'Lỗi khi xoá năng lực' });
    }
};
// Create default admin (for initial setup)
export const createDefaultAdmin = async (req, res) => {
    try {
        const { email, password, name } = req.body;
        
        // Check if admin already exists
        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) {
            return res.status(409).json({
                success: false,
                message: "Quản trị viên đã tồn tại"
            });
        }

        // Create new admin
        const admin = await Admin.create({
            email,
            password,
            name,
            role: "super_admin",
            permissions: [
                "manage_users",
                "manage_jobs",
                "manage_contracts", 
                "view_reports",
                "manage_complaints",
                "system_settings"
            ]
        });

        res.status(201).json({
            success: true,
            message: "Tạo quản trị viên thành công",
            data: {
                _id: admin._id,
                email: admin.email,
                name: admin.name,
                role: admin.role
            }
        });

    } catch (error) {
        console.error("Create admin error:", error);
        res.status(500).json({
            success: false,
            message: "Lỗi server. Vui lòng thử lại sau."
        });
    }
};
