import mongoose from "mongoose";

const workerCompetencySchema = new mongoose.Schema(
  {
    worker: { type: mongoose.Schema.Types.ObjectId, ref: "Employer", required: true },
    skill: { type: mongoose.Schema.Types.ObjectId, ref: "Skill", required: true },
    level: { type: String, enum: ["beginner", "intermediate", "advanced", "expert"], default: "beginner" },
    yearsOfExperience: { type: Number, default: 0, min: 0 },
    certifications: [{ type: String }],
    notes: { type: String, default: "" },
    status: { type: String, enum: ["active", "inactive"], default: "active" },
  },
  { timestamps: true }
);

workerCompetencySchema.index({ worker: 1, skill: 1 }, { unique: true });

export const WorkerCompetency = mongoose.model("WorkerCompetency", workerCompetencySchema);


