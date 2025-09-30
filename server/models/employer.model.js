import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const employerSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    dateOfBirth: {
        type: Date,
    },
    identityCardNumber: {
        type: String,
        required: false,
    },
    gender: {
        type: String,
        required: true,
        enum: ["male", "female"],
    },

    phone: {
        type: String,
    },
    address: {
        type: String,
        required: false,
    },
  experienceDescription: {
    type: String,
    default: "",
  },
  availability: {
    morning: { type: Boolean, default: false },
    afternoon: { type: Boolean, default: false },
    evening: { type: Boolean, default: false },
    night: { type: Boolean, default: false },
  },
    trustScore: {
        type: Number,
        default: 0,
    },
    status: {
        type: Boolean,
        default: false,
    }
})

// Hash password before save
employerSchema.pre("save", async function(next) {
    if (!this.isModified("password")) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Compare entered password with hashed password
employerSchema.methods.matchPassword = function(enteredPassword) {
    return bcrypt.compare(enteredPassword, this.password);
}

export const Employer = mongoose.model("Employer", employerSchema);