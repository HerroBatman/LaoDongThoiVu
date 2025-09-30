import mongoose from "mongoose";
import { Employer } from "../models/employer.model.js";
import { NhaTuyenDung } from "../models/nhatuyendung.model.js";
import { Admin } from "../models/admin.model.js";

const loadData = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/laborhire");
        console.log("✅ Connected to MongoDB");

        // Clear existing data
        await Employer.deleteMany({});
        await NhaTuyenDung.deleteMany({});
        console.log("🗑️  Cleared existing data");

        // Create sample workers with more variety
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
            },
            {
                email: "tranthithu@email.com",
                password: "123456",
                name: "Trần Thị Thu",
                phone: "0956789012",
                dateOfBirth: new Date("1993-11-25"),
                identityCardNumber: "258369147",
                gender: "female",
                address: "987 Đường MNO, Quận 6, TP.HCM",
                trustScore: 2.5,
                status: false // Chờ duyệt
            },
            {
                email: "hoangvanlong@email.com",
                password: "123456",
                name: "Hoàng Văn Long",
                phone: "0967890123",
                dateOfBirth: new Date("1987-04-18"),
                identityCardNumber: "369147258",
                gender: "male",
                address: "147 Đường PQR, Quận 7, TP.HCM",
                trustScore: 4.8,
                status: true // Đã duyệt
            },
            {
                email: "vuthihang@email.com",
                password: "123456",
                name: "Vũ Thị Hằng",
                phone: "0978901234",
                dateOfBirth: new Date("1991-09-12"),
                identityCardNumber: "471582693",
                gender: "female",
                address: "258 Đường STU, Quận 8, TP.HCM",
                trustScore: 3.2,
                status: false // Chờ duyệt
            }
        ];

        // Create sample employers with more variety
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
            },
            {
                email: "contact@restaurant.com",
                password: "123456",
                name: "Nhà hàng MNO",
                phone: "0286789012",
                legalInfo: "Mã số thuế: 078912345, Địa chỉ: 987 Đường Nhà hàng, Quận 6, TP.HCM",
                status: false // Chờ duyệt
            },
            {
                email: "info@service.com",
                password: "123456",
                name: "Công ty Dịch vụ PQR",
                phone: "0287890123",
                legalInfo: "Mã số thuế: 089123456, Địa chỉ: 147 Đường Dịch vụ, Quận 7, TP.HCM",
                status: true // Đã duyệt
            },
            {
                email: "admin@tech.com",
                password: "123456",
                name: "Công ty Công nghệ STU",
                phone: "0288901234",
                legalInfo: "Mã số thuế: 090123456, Địa chỉ: 258 Đường Công nghệ, Quận 8, TP.HCM",
                status: false // Chờ duyệt
            }
        ];

        // Create workers
        console.log("👷 Creating workers...");
        for (const workerData of workers) {
            const worker = new Employer(workerData);
            await worker.save();
            console.log(`   ✓ ${worker.name} (${worker.status ? 'Approved' : 'Pending'})`);
        }

        // Create employers
        console.log("🏢 Creating employers...");
        for (const employerData of employers) {
            const employer = new NhaTuyenDung(employerData);
            await employer.save();
            console.log(`   ✓ ${employer.name} (${employer.status ? 'Approved' : 'Pending'})`);
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
            console.log("👑 Created default admin:", admin.email);
        } else {
            console.log("👑 Default admin already exists:", existingAdmin.email);
        }

        console.log("\n🎉 === Data Loaded Successfully ===");
        console.log("📊 Summary:");
        console.log("   Workers: 8 total (4 pending, 4 approved)");
        console.log("   Employers: 8 total (5 pending, 3 approved)");
        console.log("   Admin: admin@laborhire.com / admin123");
        console.log("\n🚀 Next steps:");
        console.log("   1. Start server: npm start");
        console.log("   2. Start admin frontend: cd Admin && npm run dev");
        console.log("   3. Login to admin panel and test account management");

    } catch (error) {
        console.error("❌ Error loading data:", error);
    } finally {
        await mongoose.disconnect();
        console.log("🔌 Disconnected from MongoDB");
        process.exit(0);
    }
};

loadData();
