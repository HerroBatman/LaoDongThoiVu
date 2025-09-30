// Script to create default admin - can be run directly
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

// Simple admin schema for this script
const adminSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    role: {
        type: String,
        default: "admin",
        enum: ["admin", "super_admin", "moderator"]
    },
    permissions: [{
        type: String,
        enum: [
            "manage_users",
            "manage_jobs", 
            "manage_contracts",
            "view_reports",
            "manage_complaints",
            "system_settings"
        ]
    }],
    isActive: {
        type: Boolean,
        default: true
    },
    lastLogin: {
        type: Date
    },
    loginAttempts: {
        type: Number,
        default: 0
    },
    lockUntil: {
        type: Date
    }
}, {
    timestamps: true
});

const Admin = mongoose.model("Admin", adminSchema);

async function createDefaultAdmin() {
    try {
        // Connect to MongoDB - using default local connection
        const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/laborhire';
        await mongoose.connect(mongoUri);
        console.log("✅ Connected to MongoDB");

        // Check if admin already exists
        const existingAdmin = await Admin.findOne({ email: "admin@laborhire.com" });
        
        if (existingAdmin) {
            console.log("⚠️  Admin already exists!");
            console.log("📧 Email: admin@laborhire.com");
            console.log("🔑 Password: admin123");
            console.log("👤 Name: Super Admin");
            console.log("🎭 Role: super_admin");
            return;
        }

        // Hash password
        const salt = await bcrypt.genSalt(12);
        const hashedPassword = await bcrypt.hash("admin123", salt);

        // Create default admin
        const admin = new Admin({
            email: "admin@laborhire.com",
            password: hashedPassword,
            name: "Super Admin",
            role: "super_admin",
            permissions: [
                "manage_users",
                "manage_jobs",
                "manage_contracts",
                "view_reports",
                "manage_complaints",
                "system_settings"
            ]
        });

        await admin.save();
        
        console.log("✅ Default admin created successfully!");
        console.log("📧 Email: admin@laborhire.com");
        console.log("🔑 Password: admin123");
        console.log("👤 Name: Super Admin");
        console.log("🎭 Role: super_admin");
        console.log("🔐 Permissions: All permissions granted");

    } catch (error) {
        console.error("❌ Error creating default admin:", error);
    } finally {
        // Close connection
        await mongoose.connection.close();
        console.log("🔌 Database connection closed");
        process.exit(0);
    }
}

// Run the script
createDefaultAdmin();
