import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    employer: { type: mongoose.Schema.Types.ObjectId, ref: "NhaTuyenDung", required: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, default: "" },
    location: { type: String, required: true },
    address: { type: String },
    skills: [{ type: mongoose.Schema.Types.ObjectId, ref: "Skill" }],
    requirements: [{ type: String }],
    salaryMin: { type: Number, default: 0 },
    salaryMax: { type: Number, default: 0 },
    salaryUnit: { type: String, enum: ["hour", "day", "month", "project"], default: "day" },
    startDate: { type: Date },
    endDate: { type: Date },
    startTime: { type: String },
    endTime: { type: String },
    workersNeeded: { type: Number, default: 1, min: 1 },
    salaryText: { type: String, default: "" },
    recruitmentMode: { type: String, enum: ["auto", "manual"], default: "manual" },
    status: { type: String, enum: ["draft", "open", "closed"], default: "open" },
  },
  { timestamps: true }
);

export const Job = mongoose.model("Job", jobSchema);


