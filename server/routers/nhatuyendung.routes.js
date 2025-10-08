import express from "express";
import { ntdController } from "../controllers/nhatuyendung.controller.js";
import { requireNhaTuyenDung } from "../middleware/nhatuyendungAuth.js";
import { listSkills } from "../controllers/admin.controller.js";
import { createJob, listMyJobs, getMyJobDetail, updateMyJob, deleteMyJob, listMyJobsProgress, markApplicantAttendance } from "../controllers/employer.controller.js";

const router = express.Router();

// Auth routes for Nhà tuyển dụng
router.post("/register", ntdController.register);
router.post("/login", ntdController.login);
router.post("/logout", ntdController.logout);

// Protected example: current profile
router.get("/me", requireNhaTuyenDung, (req, res) => {
  const { password: _pw, ...safe } = req.nhatuyendung.toObject();
  return res.status(200).json({ success: true, data: safe });
});

// Public skills list for NTD app
router.get("/skills", listSkills);

// NTD job management (reuse employer job controllers, auth by NTD)
router.post("/jobs", requireNhaTuyenDung, createJob);
router.get("/jobs", requireNhaTuyenDung, listMyJobs);
router.get("/jobs/:id", requireNhaTuyenDung, getMyJobDetail);
router.put("/jobs/:id", requireNhaTuyenDung, updateMyJob);
router.delete("/jobs/:id", requireNhaTuyenDung, deleteMyJob);
// Progress view: open jobs with applicants (applied by default)
router.get("/jobs-progress", requireNhaTuyenDung, listMyJobsProgress);
// Attendance actions
router.post("/applications/:id/attendance", requireNhaTuyenDung, markApplicantAttendance);

export const nhaTuyenDungRoutes = router;


