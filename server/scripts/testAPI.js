import mongoose from "mongoose";
import { Employer } from "../models/employer.model.js";
import { NhaTuyenDung } from "../models/nhatuyendung.model.js";
import { Admin } from "../models/admin.model.js";

const testAPI = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/laborhire");
        console.log("Connected to MongoDB");

        // Clear existing data
        await Employer.deleteMany({});
        await NhaTuyenDung.deleteMany({});
        console.log("Cleared existing data");

        // Create sample workers
        const workers = [
            {
                email: "nguyenvanan@email.com",
                password: "123456",
                name: "Nguyễn Văn An",
                phone: "0901234567",
                dateOfBirth: new Date("1990-05-15"),
                identityCardNumber: "123456789",
                gender: "male",
                address: "123 Đường ABC, Quận 1, TP.HCM",
                trustScore: 4.5,
                status: false // Chờ duyệt
            },
            {
                email: "tranthibinh@email.com",
                password: "123456",
                name: "Trần Thị Bình",
                phone: "0912345678",
                dateOfBirth: new Date("1988-03-20"),
                identityCardNumber: "987654321",
                gender: "female",
                address: "456 Đường XYZ, Quận 2, TP.HCM",
                trustScore: 0,
                status: false // Chờ duyệt
            },
            {
                email: "levancuong@email.com",
                password: "123456",
                name: "Lê Văn Cường",
                phone: "0923456789",
                dateOfBirth: new Date("1992-08-10"),
                identityCardNumber: "456789123",
                gender: "male",
                address: "789 Đường DEF, Quận 3, TP.HCM",
                trustScore: 4.2,
                status: true // Đã duyệt
            },
            {
                email: "phamthihong@email.com",
                password: "123456",
                name: "Phạm Thị Hồng",
                phone: "0934567890",
                dateOfBirth: new Date("1995-12-05"),
                identityCardNumber: "789123456",
                gender: "female",
                address: "321 Đường GHI, Quận 4, TP.HCM",
                trustScore: 3.8,
                status: false // Chờ duyệt
            },
            {
                email: "nguyenvantam@email.com",
                password: "123456",
                name: "Nguyễn Văn Tâm",
                phone: "0945678901",
                dateOfBirth: new Date("1985-07-15"),
                identityCardNumber: "147258369",
                gender: "male",
                address: "654 Đường JKL, Quận 5, TP.HCM",
                trustScore: 5.0,
                status: true // Đã duyệt
            }
        ];

        // Create sample employers
        const employers = [
            {
                email: "hr@abc.com",
                password: "123456",
                name: "Công ty TNHH ABC",
                phone: "0281234567",
                legalInfo: "Mã số thuế: 0123456789, Địa chỉ: 123 Đường Công ty, Quận 1, TP.HCM",
                status: false // Chờ duyệt
            },
            {
                email: "contact@xyz.com",
                password: "123456",
                name: "Nhà hàng XYZ",
                phone: "0282345678",
                legalInfo: "Mã số thuế: 0987654321, Địa chỉ: 456 Đường Nhà hàng, Quận 2, TP.HCM",
                status: false // Chờ duyệt
            },
            {
                email: "info@hotel.com",
                password: "123456",
                name: "Khách sạn DEF",
                phone: "0283456789",
                legalInfo: "Mã số thuế: 045678912, Địa chỉ: 789 Đường Khách sạn, Quận 3, TP.HCM",
                status: true // Đã duyệt
            },
            {
                email: "admin@company.com",
                password: "123456",
                name: "Công ty TNHH GHI",
                phone: "0284567890",
                legalInfo: "Mã số thuế: 056789123, Địa chỉ: 321 Đường Công ty, Quận 4, TP.HCM",
                status: false // Chờ duyệt
            },
            {
                email: "hr@manufacturing.com",
                password: "123456",
                name: "Công ty Sản xuất JKL",
                phone: "0285678901",
                legalInfo: "Mã số thuế: 067891234, Địa chỉ: 654 Đường Sản xuất, Quận 5, TP.HCM",
                status: true // Đã duyệt
            }
        ];

        // Create workers
        const createdWorkers = [];
        for (const workerData of workers) {
            const worker = new Employer(workerData);
            await worker.save();
            createdWorkers.push(worker);
            console.log(`Created worker: ${worker.email} (Status: ${worker.status ? 'Approved' : 'Pending'})`);
        }

        // Create employers
        const createdEmployers = [];
        for (const employerData of employers) {
            const employer = new NhaTuyenDung(employerData);
            await employer.save();
            createdEmployers.push(employer);
            console.log(`Created employer: ${employer.email} (Status: ${employer.status ? 'Approved' : 'Pending'})`);
        }

        // Create default admin if not exists
        const existingAdmin = await Admin.findOne({ email: "admin@laborhire.com" });
        if (!existingAdmin) {
            const admin = await Admin.create({
                email: "admin@laborhire.com",
                password: "admin123",
                name: "Super Admin",
                role: "super_admin",
                permissions: [
                    "manage_users",
                    "manage_jobs",
                    "manage_contracts",
                    "view_reports",
                    "manage_complaints",
                    "system_settings"
                ],
                isActive: true
            });
            console.log("Created default admin:", admin.email);
        } else {
            console.log("Default admin already exists:", existingAdmin.email);
        }

        console.log("\n=== Test Data Created Successfully ===");
        console.log("Workers:");
        console.log("- Total: 5");
        console.log("- Pending approval: 3");
        console.log("- Approved: 2");
        console.log("\nEmployers:");
        console.log("- Total: 5");
        console.log("- Pending approval: 3");
        console.log("- Approved: 2");
        console.log("\nAdmin Login:");
        console.log("Email: admin@laborhire.com");
        console.log("Password: admin123");
        console.log("\n=== API Endpoints to Test ===");
        console.log("GET /admin/workers - Get all workers");
        console.log("GET /admin/employers - Get all employers");
        console.log("GET /admin/workers?status=pending - Get pending workers");
        console.log("GET /admin/employers?status=active - Get active employers");
        console.log("GET /admin/workers?search=Nguyễn - Search workers by name");
        console.log("GET /admin/users/stats - Get user statistics");
        console.log("POST /admin/approve-account - Approve account");
        console.log("POST /admin/reject-account - Reject account");

    } catch (error) {
        console.error("Error creating test data:", error);
    } finally {
        await mongoose.disconnect();
        console.log("Disconnected from MongoDB");
        process.exit(0);
    }
};

testAPI();
