import express from "express";
import { employerRoutes } from "./employer.routes.js";
import { nhaTuyenDungRoutes } from "./nhatuyendung.routes.js";
import { adminRoutes } from "./admin.routes.js";
import { publicRoutes } from "./public.routes.js";

const router = express.Router();

router.use("/employer", employerRoutes);
router.use("/nhatuyendung", nhaTuyenDungRoutes);
router.use("/admin", adminRoutes);
router.use("/public", publicRoutes);

export default router;
