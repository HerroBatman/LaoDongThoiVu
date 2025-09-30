import jwt from "jsonwebtoken";
import { ntdService } from "../services/nhatuyendung.services.js";

export const ntdController = {
    async register(req, res) {
        try {
            const { email, password, name, phone, legalInfo } = req.body;
            if (!email || !password || !name) {
                return res.status(400).json({ success: false, message: "email, password, name are required" });
            }
            const data = await ntdService.register({ email, password, name, phone, legalInfo });
            return res.status(201).json({ success: true, message: "Registered successfully", data });
        } catch (err) {
            return res.status(err.statusCode || 500).json({ success: false, message: err.message || "Server error" });
        }
    },
    async login(req, res) {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                return res.status(400).json({ success: false, message: "email and password are required" });
            }
            const doc = await ntdService.authenticate({ email, password });
            const token = jwt.sign({ userId: doc._id, role: "nhatuyendung" }, process.env.JWT_SECRET, { expiresIn: "7d" });
            const { password: _pw, ...safe } = doc.toObject();
            return res.status(200).json({ success: true, message: "Login success", token, data: safe });
        } catch (err) {
            return res.status(err.statusCode || 500).json({ success: false, message: err.message || "Server error" });
        }
    },
    async logout(req, res) {
        try {
            res.clearCookie("token", { httpOnly: true, sameSite: "lax" });
            return res.status(200).json({ success: true, message: "Logout success" });
        } catch (err) {
            return res.status(500).json({ success: false, message: err.message || "Server error" });
        }
    }
}


