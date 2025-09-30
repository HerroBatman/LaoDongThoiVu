import mongoose from "mongoose";

const jobInviteSchema = new mongoose.Schema(
  {
    job: { type: mongoose.Schema.Types.ObjectId, ref: "Job", required: true },
    worker: { type: mongoose.Schema.Types.ObjectId, ref: "Employer", required: true },
    matchedSkills: [{ type: mongoose.Schema.Types.ObjectId, ref: "Skill" }],
    status: { type: String, enum: ["pending", "sent", "viewed", "accepted", "declined"], default: "pending" },
    note: { type: String, default: "" },
  },
  { timestamps: true }
);

jobInviteSchema.index({ job: 1, worker: 1 }, { unique: true });

export const JobInvite = mongoose.model("JobInvite", jobInviteSchema);


