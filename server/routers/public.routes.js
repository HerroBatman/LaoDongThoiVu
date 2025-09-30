import express from "express";

const router = express.Router();

router.get("/jobs", async (req, res) => {
  try {
    const { Job } = await import("../models/job.model.js");
    const { page = 1, limit = 10, search = "" } = req.query;
    const query = { status: "open" };
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { address: { $regex: search, $options: "i" } },
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
    res.status(200).json({
      success: true,
      data: items,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit)),
      },
    });
  } catch (error) {
    console.error("public/jobs error:", error);
    res
      .status(500)
      .json({ success: false, message: "Lỗi khi lấy danh sách công việc" });
  }
});

export const publicRoutes = router;


