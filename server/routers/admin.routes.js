import express from "express";
import { 
    adminLogin, 
    getAdminProfile, 
    adminLogout, 
    changePassword,
    createDefaultAdmin,
    getWorkers,
    getEmployers,
    approveAccount,
    rejectAccount,
    getUserDetails,
    getUserStats,
} from "../controllers/admin.controller.js";
import { requireAdmin, requirePermission } from "../middleware/adminAuth.js";
import { listSkills, createSkill, updateSkill, deleteSkill, listWorkerCompetencies, createWorkerCompetency, updateWorkerCompetency, deleteWorkerCompetency, adminListJobs, adminApproveJob, adminRejectJob, adminListJobInvites, adminListProgress } from "../controllers/admin.controller.js";

const router = express.Router();

// Public routes (no authentication required)
router.post("/login", adminLogin);
router.post("/setup", createDefaultAdmin); // For initial admin creation
router.post("/create-default", async (req, res) => {
    try {
        const { Admin } = await import("../models/admin.model.js");
        
        // Check if admin already exists
        const existingAdmin = await Admin.findOne({ email: "admin@laborhire.com" });
        
        if (existingAdmin) {
            return res.status(409).json({
                success: false,
                message: "Admin đã tồn tại với email: admin@laborhire.com"
            });
        }

        // Create default admin
        const admin = await Admin.create({
            email: "admin@laborhire.com",
            password: "admin123",
            name: "Super Admin",
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
            message: "Admin mặc định đã được tạo thành công",
            data: {
                email: admin.email,
                name: admin.name,
                role: admin.role,
                permissions: admin.permissions
            }
        });

    } catch (error) {
        console.error("Create default admin error:", error);
        res.status(500).json({
            success: false,
            message: "Lỗi khi tạo admin mặc định: " + error.message
        });
    }
});

// Protected routes (authentication required)
router.use(requireAdmin); // Apply admin auth middleware to all routes below

// Admin profile routes
router.get("/me", getAdminProfile);
router.post("/logout", adminLogout);
router.put("/change-password", changePassword);

// Dashboard routes
router.get("/dashboard/stats", requirePermission("view_reports"), async (req, res) => {
    try {
        // Mock dashboard stats - replace with actual data
        const stats = {
            totalWorkers: 12847,
            totalEmployers: 2156,
            pendingAccounts: 47,
            activeJobs: 324,
            monthlyRevenue: "2.4 tỷ VNĐ",
            pendingComplaints: 12,
            urgentComplaints: 3
        };
        
        res.json({
            success: true,
            data: stats
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Lỗi khi lấy thống kê dashboard"
        });
    }
});

// Progress overview for admin
router.get("/progress", adminListProgress);

router.get("/dashboard/activities", requirePermission("view_reports"), async (req, res) => {
    try {
        // Mock recent activities - replace with actual data
        const activities = [
            {
                id: 1,
                type: "job_completed",
                message: "Công việc 'Phụ bếp nhà hàng ABC' đã hoàn thành",
                timestamp: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
                severity: "success"
            },
            {
                id: 2,
                type: "account_approved",
                message: "Tài khoản NTD 'Công ty XYZ' đã được phê duyệt",
                timestamp: new Date(Date.now() - 15 * 60 * 1000), // 15 minutes ago
                severity: "info"
            },
            {
                id: 3,
                type: "complaint_received",
                message: "Khiếu nại mới từ NLĐ Nguyễn Văn A",
                timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
                severity: "warning"
            },
            {
                id: 4,
                type: "job_violation",
                message: "Công việc 'Bốc vác kho hàng' bị báo cáo vi phạm",
                timestamp: new Date(Date.now() - 60 * 60 * 1000), // 1 hour ago
                severity: "error"
            }
        ];
        
        res.json({
            success: true,
            data: activities
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Lỗi khi lấy hoạt động gần đây"
        });
    }
});

// ============ USER MANAGEMENT ROUTES ============

// Get all workers with filters and pagination
router.get("/workers", requirePermission("manage_users"), getWorkers);

// Get all employers with filters and pagination
router.get("/employers", requirePermission("manage_users"), getEmployers);

// Approve user account
router.post("/approve-account", requirePermission("manage_users"), approveAccount);

// Reject user account
router.post("/reject-account", requirePermission("manage_users"), rejectAccount);

// Get user details by ID and type
router.get("/users/:userType/:id", requirePermission("manage_users"), getUserDetails);

// Get user statistics
router.get("/users/stats", requirePermission("view_reports"), getUserStats);

// Skill management
router.get("/skills", requirePermission("system_settings"), listSkills);
router.post("/skills", requirePermission("system_settings"), createSkill);
router.put("/skills/:id", requirePermission("system_settings"), updateSkill);
router.delete("/skills/:id", requirePermission("system_settings"), deleteSkill);

// Worker competency management
router.get("/worker-competencies", requirePermission("manage_users"), listWorkerCompetencies);
router.post("/worker-competencies", requirePermission("manage_users"), createWorkerCompetency);
router.put("/worker-competencies/:id", requirePermission("manage_users"), updateWorkerCompetency);
router.delete("/worker-competencies/:id", requirePermission("manage_users"), deleteWorkerCompetency);

// Admin job approval
router.get("/jobs", requirePermission("manage_jobs"), adminListJobs);
router.post("/jobs/:id/approve", requirePermission("manage_jobs"), adminApproveJob);
router.post("/jobs/:id/reject", requirePermission("manage_jobs"), adminRejectJob);
router.get("/jobs/:id/invites", requirePermission("manage_jobs"), adminListJobInvites);

export const adminRoutes = router;
