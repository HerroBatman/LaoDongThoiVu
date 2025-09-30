import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: path.join(__dirname, "../.env") });

// Admin Schema (same as in admin.model.js)
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

// Hash password before save
adminSchema.pre("save", async function(next) {
    if (!this.isModified("password")) return next();
    
    try {
        const salt = await bcrypt.genSalt(12);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

const Admin = mongoose.model("Admin", adminSchema);

async function createDefaultAdmin() {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/laborhire');
        console.log("✅ Connected to MongoDB");

        // Check if admin already exists
        const existingAdmin = await Admin.findOne({ email: "admin@laborhire.com" });
        
        if (existingAdmin) {
            console.log("⚠️  Admin already exists with email: admin@laborhire.com");
            console.log("📧 Email: admin@laborhire.com");
            console.log("🔑 Password: admin123");
            console.log("👤 Name: Super Admin");
            console.log("🎭 Role: super_admin");
            return;
        }

        // Create default admin
        const admin = new Admin({
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
    }
}

// Run the script
createDefaultAdmin();
