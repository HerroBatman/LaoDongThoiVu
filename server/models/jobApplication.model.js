import mongoose from "mongoose";

const jobApplicationSchema = new mongoose.Schema(
  {
    worker: { type: mongoose.Schema.Types.ObjectId, ref: "Employer", required: true },
    job: { type: mongoose.Schema.Types.ObjectId, ref: "Job", required: true },
    status: {
      type: String,
      enum: ["applied", "accepted", "rejected", "cancelled"],
      default: "applied",
    },
    // Snapshot of scheduled times for quick conflict checks
    startDate: { type: Date },
    endDate: { type: Date },
    startTime: { type: String }, // e.g. "14:00"
    endTime: { type: String },   // e.g. "17:00"
  },
  { timestamps: true }
);

jobApplicationSchema.index({ worker: 1, job: 1 }, { unique: true });

// Optional attendance fields
jobApplicationSchema.add({
  checkInAt: { type: Date },
  checkOutAt: { type: Date },
});

export const JobApplication = mongoose.model("JobApplication", jobApplicationSchema);


