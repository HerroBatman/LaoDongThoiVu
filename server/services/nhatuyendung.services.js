import { NhaTuyenDung } from "../models/nhatuyendung.model.js";

export const ntdService = {
    async findByEmail(email) {
        return NhaTuyenDung.findOne({ email });
    },
    async register({ email, password, name, phone, legalInfo }) {
        const existed = await this.findByEmail(email);
        if (existed) {
            const err = new Error("Email already registered");
            err.statusCode = 409;
            throw err;
        }
        const created = await NhaTuyenDung.create({ email, password, name, phone, legalInfo });
        const { password: _pw, ...safe } = created.toObject();
        return safe;
    },
    async authenticate({ email, password }) {
        const doc = await this.findByEmail(email);
        if (!doc) {
            const err = new Error("Email or password is incorrect");
            err.statusCode = 401;
            throw err;
        }
        const ok = await doc.matchPassword(password);
        if (!ok) {
            const err = new Error("Email or password is incorrect");
            err.statusCode = 401;
            throw err;
        }
        return doc;
    }
}


