import { employerServices } from "../services/employer.services.js";
import jwt from "jsonwebtoken";
import { Employer } from "../models/employer.model.js";

const createEmployer = async (req, res) => {
    try {
        const { email, password, name, gender } = req.body;
        const employer = await employerServices.createEmployer({ 
            email, password, name, gender 
        });
        res.status(201).json({ 
            success: true,
            message: "Employer created successfully",
            data: employer 
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

export const employerController = { createEmployer };

// Register new employer (email, password, name, gender only)
const registerEmployer = async (req, res) => {
    try {
        console.log(req.body);
        const { email, password, name, gender } = req.body;
        if (!email || !password || !name || !gender) {
            return res.status(400).json({ success: false, message: "email, password, name, gender are required" });
        }

        const existed = await Employer.findOne({ email });
        if (existed) {
            return res.status(409).json({ success: false, message: "Email already registered" });
        }

        const employer = await employerServices.createEmployer({
            email, password, name, gender
        });

        const { password: _pw, ...safe } = employer.toObject();
        return res.status(201).json({ success: true, message: "Registered successfully", data: safe });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}

// Login employer
const loginEmployer = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ success: false, message: "email and password are required" });
        }

        const employer = await Employer.findOne({ email });
        if (!employer) {
            return res.status(401).json({ success: false, message: "Email or password is incorrect" });
        }

        const isMatch = await employer.matchPassword(password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: "Email or password is incorrect" });
        }

        const payload = { userId: employer._id, role: "employer" };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "7d" });

        const { password: _pw, ...safe } = employer.toObject();
        return res.status(200).json({ success: true, message: "Login success", token, data: safe });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}

export const employerAuthController = { registerEmployer, loginEmployer };

// Logout employer - clear token cookie if present
const logoutEmployer = async (req, res) => {
    try {
        res.clearCookie("token", { httpOnly: true, sameSite: "lax" });
        return res.status(200).json({ success: true, message: "Logout success" });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}

// extend exported auth controller
employerAuthController.logoutEmployer = logoutEmployer;

// ============ Employer self profile ============
export const getMyProfile = async (req, res) => {
    try {
        const me = await Employer.findById(req.user.userId).select('-password');
        if (!me) return res.status(404).json({ success: false, message: 'Not found' });
        return res.status(200).json({ success: true, data: me });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}

export const updateMyProfile = async (req, res) => {
    try {
        const { experienceDescription, availability } = req.body;
        const updated = await Employer.findByIdAndUpdate(
            req.user.userId,
            { experienceDescription, ...(availability ? { availability } : {}) },
            { new: true, runValidators: true }
        ).select('-password');
        if (!updated) return res.status(404).json({ success: false, message: 'Not found' });
        return res.status(200).json({ success: true, data: updated });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}

// ============ Job posting ============
export const createJob = async (req, res) => {
    try {
        const { Job } = await import('../models/job.model.js');
        const {
            title,
            description,
            location,
            address,
            requirements = [],
            skills = [],
            salaryMin,
            salaryMax,
            salaryUnit = 'day',
            salaryText,
            startDate,
            endDate,
            startTime,
            endTime,
            workersNeeded = 1,
            recruitmentMode = 'manual'
        } = req.body;

        if (!title || !location) {
            return res.status(400).json({ success: false, message: 'title và location là bắt buộc' });
        }

        const job = await Job.create({
            employer: req.user.userId,
            title,
            description,
            location,
            address,
            requirements,
            skills,
            salaryMin,
            salaryMax,
            salaryUnit,
            salaryText,
            startDate,
            endDate,
            startTime,
            endTime,
            workersNeeded,
            recruitmentMode,
            status: 'draft'
        });

        return res.status(201).json({ success: true, data: job });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}

export const listMyJobs = async (req, res) => {
    try {
        const { Job } = await import('../models/job.model.js');
        const { page = 1, limit = 10, status = '', search = '' } = req.query;
        const query = { employer: req.user.userId };
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
            Job.find(query).sort({ createdAt: -1 }).skip(skip).limit(parseInt(limit)),
            Job.countDocuments(query),
        ]);
        return res.status(200).json({ success: true, data: items, pagination: { page: parseInt(page), limit: parseInt(limit), total, pages: Math.ceil(total / parseInt(limit)) } });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}

export const getMyJobDetail = async (req, res) => {
    try {
        const { Job } = await import('../models/job.model.js');
        const job = await Job.findOne({ _id: req.params.id, employer: req.user.userId }).populate('skills', 'name slug');
        if (!job) return res.status(404).json({ success: false, message: 'Không tìm thấy công việc' });
        return res.status(200).json({ success: true, data: job });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}

// Update my job (status or basic fields)
export const updateMyJob = async (req, res) => {
    try {
        const { Job } = await import('../models/job.model.js');
        const { id } = req.params;
        const allowed = ['status', 'title', 'description', 'location', 'address', 'requirements', 'skills', 'salaryMin', 'salaryMax', 'salaryUnit', 'salaryText', 'startDate', 'endDate', 'startTime', 'endTime', 'workersNeeded', 'recruitmentMode'];
        const update = {};
        for (const key of allowed) {
            if (key in req.body) update[key] = req.body[key];
        }
        const job = await Job.findOneAndUpdate({ _id: id, employer: req.user.userId }, update, { new: true, runValidators: true });
        if (!job) return res.status(404).json({ success: false, message: 'Không tìm thấy công việc' });
        return res.status(200).json({ success: true, data: job });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}

// Delete my job
export const deleteMyJob = async (req, res) => {
    try {
        const { Job } = await import('../models/job.model.js');
        const { id } = req.params;
        const job = await Job.findOneAndDelete({ _id: id, employer: req.user.userId });
        if (!job) return res.status(404).json({ success: false, message: 'Không tìm thấy công việc' });
        return res.status(200).json({ success: true, message: 'Đã xoá công việc' });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}

// List jobs matched to current worker's skills
export const listMatchedJobs = async (req, res) => {
    try {
        const { WorkerCompetency } = await import('../models/workerCompetency.model.js');
        const { Job } = await import('../models/job.model.js');

        // Get worker's skills
        const comps = await WorkerCompetency.find({ worker: req.user.userId }).select('skill');
        const skillIds = comps.map(c => c.skill);
        if (skillIds.length === 0) {
            return res.status(200).json({ success: true, data: [], pagination: { page: 1, limit: 0, total: 0, pages: 0 } });
        }

        const { page = 1, limit = 10, search = '' } = req.query;
        const query = { status: 'open', skills: { $in: skillIds } };
        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } },
                { address: { $regex: search, $options: 'i' } },
            ];
        }
        const skip = (parseInt(page) - 1) * parseInt(limit);
        const [items, total] = await Promise.all([
            Job.find(query).sort({ createdAt: -1 }).skip(skip).limit(parseInt(limit)),
            Job.countDocuments(query),
        ]);
        return res.status(200).json({ success: true, data: items, pagination: { page: parseInt(page), limit: parseInt(limit), total, pages: Math.ceil(total / parseInt(limit)) } });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}

