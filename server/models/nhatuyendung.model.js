import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const nhaTuyenDungSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    phone: { type: String },
    legalInfo: { type: String },
    status: { type: Boolean, default: false }
})

nhaTuyenDungSchema.pre("save", async function(next) {
    if (!this.isModified("password")) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

nhaTuyenDungSchema.methods.matchPassword = function(enteredPassword) {
    return bcrypt.compare(enteredPassword, this.password);
}

export const NhaTuyenDung = mongoose.model("NhaTuyenDung", nhaTuyenDungSchema);


