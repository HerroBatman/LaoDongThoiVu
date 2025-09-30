import jwt from "jsonwebtoken";
import { Admin } from "../models/admin.model.js";

// Verify admin JWT token
export const requireAdmin = async (req, res, next) => {
    try {
        let token;

        // Get token from header
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Không có token xác thực"
            });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Check if admin exists and is active
        const admin = await Admin.findById(decoded.userId);
        
        if (!admin) {
            return res.status(401).json({
                success: false,
                message: "Token không hợp lệ"
            });
        }

        if (!admin.isActive) {
            return res.status(403).json({
                success: false,
                message: "Tài khoản đã bị vô hiệu hóa"
            });
        }

        if (admin.isLocked()) {
            return res.status(423).json({
                success: false,
                message: "Tài khoản đã bị khóa"
            });
        }

        // Add admin info to request
        req.user = {
            userId: admin._id,
            role: admin.role,
            permissions: admin.permissions
        };

        next();
    } catch (error) {
        console.error("Admin auth middleware error:", error);
        
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({
                success: false,
                message: "Token không hợp lệ"
            });
        }
        
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                success: false,
                message: "Token đã hết hạn"
            });
        }

        return res.status(500).json({
            success: false,
            message: "Lỗi xác thực"
        });
    }
};

// Check if admin has specific permission
export const requirePermission = (permission) => {
    return (req, res, next) => {
        if (!req.user || !req.user.permissions) {
            return res.status(403).json({
                success: false,
                message: "Không có quyền truy cập"
            });
        }

        // Super admin has all permissions
        if (req.user.role === 'super_admin') {
            return next();
        }

        // Check if admin has the required permission
        if (!req.user.permissions.includes(permission)) {
            return res.status(403).json({
                success: false,
                message: `Không có quyền ${permission}`
            });
        }

        next();
    };
};

// Check if admin has any of the specified permissions
export const requireAnyPermission = (permissions) => {
    return (req, res, next) => {
        if (!req.user || !req.user.permissions) {
            return res.status(403).json({
                success: false,
                message: "Không có quyền truy cập"
            });
        }

        // Super admin has all permissions
        if (req.user.role === 'super_admin') {
            return next();
        }

        // Check if admin has any of the required permissions
        const hasPermission = permissions.some(permission => 
            req.user.permissions.includes(permission)
        );

        if (!hasPermission) {
            return res.status(403).json({
                success: false,
                message: "Không có quyền truy cập"
            });
        }

        next();
    };
};
