import express from "express";
import { employerController, employerAuthController, getMyProfile, updateMyProfile, createJob, listMyJobs, getMyJobDetail, listMatchedJobs } from "../controllers/employer.controller.js";
import { requireEmployer } from "../middleware/employerAuth.js";

const router = express.Router();

// Test route
router.get("/", (req, res) => {
  res.json({ message: "Employer routes working!" });
});

// Auth routes for employer
router.post("/register", employerAuthController.registerEmployer);
router.post("/login", employerAuthController.loginEmployer);

// Self competency management
import { listSkills } from "../controllers/admin.controller.js";
import { selfListCompetencies, selfSaveCompetencies } from "../controllers/workerCompetencySelf.controller.js";

// Public list of skills for selection
router.get("/skills", listSkills);

// Employer (worker) self competencies
router.get("/me/competencies", requireEmployer, selfListCompetencies);
router.post("/me/competencies", requireEmployer, selfSaveCompetencies);

// Employer self profile experience
router.get("/me", requireEmployer, getMyProfile);
router.put("/me", requireEmployer, updateMyProfile);

// Create a job post
router.post("/jobs", requireEmployer, createJob);
router.get("/jobs", requireEmployer, listMyJobs);
router.get("/jobs/:id", requireEmployer, getMyJobDetail);
router.get("/matched-jobs", requireEmployer, listMatchedJobs);

export const employerRoutes = router;